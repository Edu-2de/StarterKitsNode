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

export default function PopularProductsCarousel() {
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

  // For infinite effect, clone first and last N items
  const total = mockProducts.length;
  const extendedProducts = [
    ...mockProducts.slice(-visibleCount),
    ...mockProducts,
    ...mockProducts.slice(0, visibleCount),
  ];
  const realIndex = index + visibleCount;

  // Card/gap config igual Features
  const cardWidth =
    windowWidth >= 1024
      ? 288
      : windowWidth >= 640
      ? 320
      : windowWidth - 48;
  const gap = windowWidth >= 1024 ? 32 : windowWidth >= 640 ? 32 : 16;
  const slideWidth = cardWidth + gap;
  const containerWidth = visibleCount * cardWidth + (visibleCount - 1) * gap;

  // O translateX deve alinhar o primeiro card exatamente à esquerda do container
  const translate =
    -realIndex * slideWidth +
    (isDragging && dragStartX !== null ? dragDelta : 0);

  // Handle transition end for infinite effect
  function handleTransitionEnd() {
    setIsTransitioning(false);
    if (index < 0) {
      setIndex(total - visibleCount);
    } else if (index >= total) {
      setIndex(0);
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
            Populares
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
            }}
          >
            <div
              className={`
                flex
                ${windowWidth >= 640 ? "gap-8" : "gap-4"}
                ${isTransitioning ? "transition-transform duration-400 ease-in-out" : ""}
                ${isDragging ? "select-none pointer-events-none" : ""}
              `}
              style={{
                minHeight: windowWidth < 640 ? 260 : 340,
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
                      ? "min-w-[288px] max-w-[288px]"
                      : windowWidth >= 640
                      ? "min-w-[320px] max-w-[320px]"
                      : "min-w-[calc(100vw-48px)] max-w-[calc(100vw-48px)]"}
                    w-full
                    ${hovered === product.id ? "scale-[1.045] shadow-xl border-neutral-300" : ""}
                    ${selected === product.id ? "ring-2 ring-neutral-400" : ""}
                  `}
                  style={{
                    minHeight: windowWidth < 640 ? 220 : 340,
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
                      Produto Popular {product.id}
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
                  {/* Sem badge "Novo" */}
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