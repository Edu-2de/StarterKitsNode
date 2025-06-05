"use client";
import { useRef, useState, useEffect } from "react";

const mockProducts = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

const visibleCountDesktop = 4;
const visibleCountTablet = 2;
const visibleCountMobile = 1;
const transitionTime = 400; // ms

function getVisibleCount(width: number) {
  if (width < 640) return visibleCountMobile;
  if (width < 1024) return visibleCountTablet;
  return visibleCountDesktop;
}

export default function Features() {
  // Responsividade
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [visibleCount, setVisibleCount] = useState(getVisibleCount(windowWidth));

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setVisibleCount(getVisibleCount(window.innerWidth));
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Carousel state
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  // Drag/touch state
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  // For infinite effect, clone first and last N items
  const total = mockProducts.length;
  const extendedProducts = [
    ...mockProducts.slice(-visibleCount),
    ...mockProducts,
    ...mockProducts.slice(0, visibleCount),
  ];
  const realIndex = index + visibleCount;

  // Card/gap config
  const cardWidth =
    windowWidth >= 1024
      ? 300
      : windowWidth >= 640
      ? 260
      : windowWidth - 48;
  const gap = windowWidth >= 1024 ? 32 : windowWidth >= 640 ? 24 : 16;
  const slideWidth = cardWidth + gap;

  // O containerWidth agora é só a soma dos cards + gaps (sem gap extra no fim)
  const containerWidth = visibleCount * cardWidth + (visibleCount - 1) * gap;

  // O segredo: paddingLeft = 0, translateX ajustado para mostrar só os 4 do meio
  // O valor de translateX é ajustado para alinhar o primeiro card perfeitamente à esquerda do container
  // Corrige bug de corte do primeiro card em todos os slides
  // O truque: soma o gap/2 para compensar o gap do flex (gap é aplicado entre os cards, não nas bordas)
  const gapOffset = windowWidth >= 1024 ? gap / 2 : windowWidth >= 640 ? gap / 2 : 0;
  const translate =
    -(realIndex * slideWidth - gapOffset) +
    (isDragging && dragStartX !== null ? dragDelta : 0);

  // Corrige bug visual ao pular para o início/fim: remove transição ao resetar index
  useEffect(() => {
    if (!isTransitioning) return;
    let timeout: NodeJS.Timeout | null = null;
    if (index < 0 || index >= total) {
      timeout = setTimeout(() => {
        setIsTransitioning(false);
        if (index < 0) setIndex(total - visibleCount);
        else if (index >= total) setIndex(0);
      }, transitionTime);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, [index, isTransitioning, total, visibleCount]);

  // Auto-slide (corrigido para não bugar ao resetar)
  useEffect(() => {
    if (isDragging) return;
    autoSlideRef.current = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setIndex((prev) => prev + 1);
      }
    }, 4000);
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [isTransitioning, isDragging]);

  function handleTransitionEnd() {
    if (index < 0) {
      setIsTransitioning(false);
      setIndex(total - visibleCount);
    } else if (index >= total) {
      setIsTransitioning(false);
      setIndex(0);
    } else {
      setIsTransitioning(false);
    }
  }

  function handleNext() {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  }

  function handlePrev() {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => prev - 1);
  }

  // Drag/Touch logic
  function handlePointerDown(e: React.PointerEvent) {
    if (isTransitioning) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging || dragStartX === null) return;
    setDragDelta(e.clientX - dragStartX);
  }
  function handlePointerUp(e: React.PointerEvent) {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragDelta) > 60) {
      if (dragDelta < 0) handleNext();
      else handlePrev();
    } else {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), transitionTime);
    }
    setDragStartX(null);
    setDragDelta(0);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-neutral-50 select-none">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-700 tracking-tight text-left">
            Novidades
          </h2>
          <div className="flex-1 border-b border-neutral-200 ml-4 sm:ml-6" />
        </div>
        <div className="relative">
          {/* Carousel Controls */}
          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-neutral-100 border border-neutral-200 shadow px-2.5 py-2.5 rounded-full transition"
            onClick={handlePrev}
            aria-label="Anterior"
            type="button"
            disabled={isTransitioning}
          >
            <svg width={24} height={24} fill="none" stroke="#888" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-neutral-100 border border-neutral-200 shadow px-2.5 py-2.5 rounded-full transition"
            onClick={handleNext}
            aria-label="Próximo"
            type="button"
            disabled={isTransitioning}
          >
            <svg width={24} height={24} fill="none" stroke="#888" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {/* Carousel */}
          <div
            className="overflow-hidden mx-auto"
            ref={listRef}
            style={{
              cursor: isDragging ? "grabbing" : "grab",
              width: containerWidth,
              maxWidth: "100%",
              boxSizing: "content-box",
              paddingLeft: 0,
            }}
          >
            <div
              className={`
                flex
                ${windowWidth >= 640 ? "gap-6" : "gap-4"}
                ${isTransitioning ? "transition-transform duration-400 ease-in-out" : ""}
                ${isDragging ? "select-none pointer-events-none" : ""}
              `}
              style={{
                minHeight: windowWidth < 640 ? 260 : 320,
                willChange: "transform",
                transform: `translateX(${translate}px)`,
              }}
              onTransitionEnd={handleTransitionEnd}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={isDragging ? handlePointerUp : undefined}
            >
              {extendedProducts.map((product, idx) => (
                <div
                  key={product.id + "-" + idx}
                  className={`
                    group relative flex flex-col items-center justify-between
                    rounded-2xl border border-neutral-200 bg-white shadow-lg
                    transition-all duration-300
                    cursor-pointer
                    ${windowWidth >= 1024
                      ? "min-w-[300px] max-w-[300px]"
                      : windowWidth >= 640
                      ? "min-w-[260px] max-w-[260px]"
                      : "min-w-[calc(100vw-48px)] max-w-[calc(100vw-48px)]"}
                    w-full
                    ${hovered === product.id ? "scale-[1.045] shadow-xl border-neutral-300" : ""}
                    ${selected === product.id ? "ring-2 ring-neutral-400" : ""}
                  `}
                  style={{
                    minHeight: windowWidth < 640 ? 220 : 320,
                    padding: windowWidth < 640
                      ? "1.2rem 0.7rem 1.1rem 0.7rem"
                      : "2.2rem 1.5rem 1.7rem 1.5rem",
                  }}
                  onMouseEnter={() => setHovered(product.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(product.id === selected ? null : product.id)}
                  tabIndex={0}
                  aria-label="Produto"
                  draggable={false}
                >
                  {/* Imagem mock */}
                  <div
                    className={`
                      w-full ${windowWidth < 640 ? "h-24" : "h-36"} rounded-xl mb-5 md:mb-7 bg-gradient-to-br
                      from-neutral-100 to-neutral-200
                      flex items-center justify-center
                      transition-all duration-300
                      ${hovered === product.id ? "shadow-md" : ""}
                    `}
                  >
                    <div className={`${windowWidth < 640 ? "w-12 h-12" : "w-20 h-20"} bg-neutral-200 rounded-lg`} />
                  </div>
                  {/* Nome e preço mock */}
                  <div className="w-full text-center">
                    <div className={`font-semibold text-neutral-700 ${windowWidth < 640 ? "text-base" : "text-lg"} mb-1`}>
                      Produto {product.id}
                    </div>
                    <div className={`text-neutral-400 font-medium ${windowWidth < 640 ? "text-sm" : "text-base"} mb-2`}>
                      R$ --
                    </div>
                    <button
                      className={`
                        mt-2 px-5 py-2 rounded-full font-semibold text-sm
                        bg-neutral-100 text-neutral-600 border border-neutral-200
                        transition-all duration-200
                        group-hover:bg-neutral-200 group-hover:text-neutral-800
                        focus:outline-none focus:ring-2 focus:ring-neutral-300
                      `}
                      tabIndex={-1}
                    >
                      Ver detalhes
                    </button>
                  </div>
                  {/* Badge de novo */}
                  <span className="absolute top-4 left-4 bg-neutral-200 text-neutral-500 text-xs font-bold px-3 py-1 rounded-full select-none">
                    Novo
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Dots removidos */}
      </div>
    </section>
  );
}