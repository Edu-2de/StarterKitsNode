"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductPage() {
  // Mock de produto principal
  const product = {
    id: 1,
    name: "Produto Exemplo",
    price: "R$ 199,90",
    description: "Descrição breve do produto. Aqui você pode colocar detalhes, características e benefícios.",
    tags: ["Novo", "Frete grátis"],
    stock: 12,
    sku: "SKU123456",
    brand: "Marca Exemplo",
    paymentMethods: [
      "Pix",
      "Cartão de crédito",
      "Cartão de débito",
      "Boleto bancário",
      "2x sem juros",
    ],
    shipping: "Entrega para todo o Brasil",
    warranty: "Garantia de 12 meses",
    installments: "Até 6x de R$ 33,32 sem juros",
    deliveryTime: "Entrega em até 5 dias úteis",
    images: [
      "1", // só para simular, normalmente seria uma URL
      "2",
      "3",
    ],
  };

  // Mock de produtos relacionados
  const related = [
    { id: 2, name: "Produto Relacionado 1", price: "R$ 99,90" },
    { id: 3, name: "Produto Relacionado 2", price: "R$ 149,90" },
    { id: 4, name: "Produto Relacionado 3", price: "R$ 89,90" },
    { id: 5, name: "Produto Relacionado 4", price: "R$ 129,90" },
    { id: 6, name: "Produto Relacionado 5", price: "R$ 119,90" },
    { id: 7, name: "Produto Relacionado 6", price: "R$ 159,90" },
  ];

  // Mock de avaliações
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Usuário 1",
      rating: 5,
      text: "Produto muito bom! Recomendo para todos. Entrega rápida e qualidade excelente.",
    },
    {
      id: 2,
      user: "Usuário 2",
      rating: 4,
      text: "Gostei bastante, mas poderia ser um pouco mais barato.",
    },
  ]);

  // Comentários (mock)
  const [comments, setComments] = useState([
    { id: 1, user: "Cliente A", text: "Esse produto tem garantia?" },
    { id: 2, user: "Cliente B", text: "Chega rápido em SP?" },
  ]);
  const [commentInput, setCommentInput] = useState("");

  // Galeria de imagens
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // Controle de compra e avaliação
  const [hasBought, setHasBought] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewMsg, setReviewMsg] = useState("");

  // Controle da aba de descrição
  const [showDetails, setShowDetails] = useState(false);

  function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (commentInput.trim().length === 0) return;
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        user: "Você",
        text: commentInput,
      },
    ]);
    setCommentInput("");
  }

  function handleBuy() {
    setHasBought(true);
    setShowReviewForm(true);
    setTimeout(() => {
      setShowReviewForm(false);
    }, 10000); // fecha o formulário de avaliação após 10s
    alert("Produto adicionado ao carrinho!");
  }

  function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (reviewRating === 0 || reviewText.trim().length === 0) {
      setReviewMsg("Dê uma nota e escreva um comentário.");
      return;
    }
    setReviews([
      ...reviews,
      {
        id: reviews.length + 1,
        user: "Você",
        rating: reviewRating,
        text: reviewText,
      },
    ]);
    setReviewText("");
    setReviewRating(0);
    setReviewMsg("Avaliação enviada! Obrigado pela sua opinião.");
    setTimeout(() => setReviewMsg(""), 3000);
    setShowReviewForm(false);
  }

  // --- Carrossel de produtos relacionados (igual ao de novidades) ---
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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getVisibleCount(width: number) {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 4;
  }

  // Carousel state
  const [relIndex, setRelIndex] = useState(0);
  const [relIsTransitioning, setRelIsTransitioning] = useState(false);
  const [relHovered, setRelHovered] = useState<number | null>(null);
  const [relSelected, setRelSelected] = useState<number | null>(null);

  // Drag/touch state
  const [relDragStartX, setRelDragStartX] = useState<number | null>(null);
  const [relDragDelta, setRelDragDelta] = useState(0);
  const [relIsDragging, setRelIsDragging] = useState(false);

  const relListRef = useRef<HTMLDivElement>(null);
  const relAutoSlideRef = useRef<NodeJS.Timeout | null>(null);

  // For infinite effect, clone first and last N items
  const relTotal = related.length;
  const relExtended = [
    ...related.slice(-visibleCount),
    ...related,
    ...related.slice(0, visibleCount),
  ];
  const relRealIndex = relIndex + visibleCount;

  // Card/gap config
  const relCardWidth =
    windowWidth >= 1024
      ? 288
      : windowWidth >= 640
      ? 320
      : windowWidth - 48;
  const relGap = windowWidth >= 1024 ? 32 : windowWidth >= 640 ? 32 : 16;
  const relSlideWidth = relCardWidth + relGap;
  const relContainerWidth = visibleCount * relCardWidth + (visibleCount - 1) * relGap;
  const relTranslate =
    -relRealIndex * relSlideWidth +
    (relIsDragging && relDragStartX !== null ? relDragDelta : 0);

  // Auto-slide
  const handleRelNext = useCallback(() => {
    if (relIsTransitioning) return;
    setRelIsTransitioning(true);
    setRelIndex((prev) => prev + 1);
  }, [relIsTransitioning]);

  useEffect(() => {
    relAutoSlideRef.current = setInterval(() => {
      handleRelNext();
    }, 4000);
    return () => {
      if (relAutoSlideRef.current) {
        clearInterval(relAutoSlideRef.current);
      }
    };
  }, [handleRelNext]);

  // Handle transition end for infinite effect
  function handleRelTransitionEnd() {
    setRelIsTransitioning(false);
    if (relIndex < 0) {
      setRelIndex(relTotal - visibleCount);
    } else if (relIndex >= relTotal) {
      setRelIndex(0);
    }
  }

  function handleRelPrev() {
    if (relIsTransitioning) return;
    setRelIsTransitioning(true);
    setRelIndex((prev) => prev - 1);
  }

  // Drag/Touch logic
  function handleRelPointerDown(e: React.PointerEvent) {
    if (relIsTransitioning) return;
    setRelIsDragging(true);
    setRelDragStartX(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function handleRelPointerMove(e: React.PointerEvent) {
    if (!relIsDragging || relDragStartX === null) return;
    setRelDragDelta(e.clientX - relDragStartX);
  }
  function handleRelPointerUp(e: React.PointerEvent) {
    if (!relIsDragging) return;
    setRelIsDragging(false);
    if (Math.abs(relDragDelta) > 60) {
      if (relDragDelta < 0) handleRelNext();
      else handleRelPrev();
    } else {
      setRelIsTransitioning(true);
      setTimeout(() => setRelIsTransitioning(false), 400);
    }
    setRelDragStartX(null);
    setRelDragDelta(0);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }

  // --- Fim do carrossel de produtos relacionados ---

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 py-10 px-2">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-10 flex flex-col md:flex-row gap-10 border border-neutral-100">
          {/* Galeria de imagens */}
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto md:mx-0 gap-4">
            <div className="rounded-2xl w-[600px] aspect-[4/3] bg-neutral-100 flex items-center justify-center text-neutral-400 text-4xl font-bold select-none border border-neutral-200 mb-2 transition-all shadow-sm">
              IMG {selectedImage}
            </div>
            <div className="flex gap-3">
              {product.images.map((img) => (
                <button
                  key={img}
                  className={`w-16 h-16 rounded-lg border transition-all flex items-center justify-center text-neutral-400 font-bold text-base bg-neutral-100 ${
                    selectedImage === img
                      ? "border-neutral-700 ring-2 ring-neutral-300"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                  onClick={() => setSelectedImage(img)}
                  aria-label={`Selecionar imagem ${img}`}
                  type="button"
                >
                  IMG {img}
                </button>
              ))}
            </div>
          </div>
          {/* Info */}
          <div className="flex-1 flex flex-col gap-7 justify-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-800">{product.name}</h1>
              <div className="flex gap-2 flex-wrap">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-neutral-200 text-neutral-600 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-6 flex-wrap">
              <span className="text-3xl font-extrabold text-neutral-700">{product.price}</span>
              <span className="text-base text-neutral-500 font-medium">{product.installments}</span>
              <span className="text-xs text-green-700 font-semibold bg-green-50 px-2 py-1 rounded-full border border-green-100">
                {product.stock > 0 ? "Disponível" : "Indisponível"}
              </span>
            </div>
            <div className="text-neutral-500 text-base">{product.description}</div>
            {/* Aba de descrição */}
            <div className="mt-2">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 font-semibold transition mb-2"
                onClick={() => setShowDetails((v) => !v)}
                type="button"
                aria-expanded={showDetails}
              >
                <span>Descrição</span>
                <span className={`transition-transform ${showDetails ? "rotate-90" : ""}`}>{">"}</span>
              </button>
              {showDetails && (
                <div className="bg-neutral-50 border border-neutral-100 rounded-lg p-4 text-sm text-neutral-700 animate-fade-in-down">
                  <div className="flex flex-wrap gap-x-10 gap-y-2">
                    <div className="min-w-[120px]">
                      <span className="block text-neutral-500 text-xs mb-1">Marca</span>
                      <span className="font-medium text-neutral-700">{product.brand}</span>
                    </div>
                    <div className="min-w-[120px]">
                      <span className="block text-neutral-500 text-xs mb-1">SKU</span>
                      <span className="font-mono text-neutral-700">{product.sku}</span>
                    </div>
                    <div className="min-w-[120px]">
                      <span className="block text-neutral-500 text-xs mb-1">Garantia</span>
                      <span className="text-neutral-700">{product.warranty}</span>
                    </div>
                    <div className="min-w-[120px]">
                      <span className="block text-neutral-500 text-xs mb-1">Frete</span>
                      <span className="text-neutral-700">{product.shipping}</span>
                    </div>
                    <div className="min-w-[120px]">
                      <span className="block text-neutral-500 text-xs mb-1">Prazo</span>
                      <span className="text-neutral-700">{product.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <span className="block text-neutral-700 font-semibold mb-1">Métodos de pagamento:</span>
              <ul className="flex flex-wrap gap-2">
                {product.paymentMethods.map((method) => (
                  <li
                    key={method}
                    className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-medium"
                  >
                    {method}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="mt-2 px-8 py-3 rounded-full bg-neutral-800 text-white font-bold hover:bg-neutral-700 transition active:scale-95 text-lg shadow"
              onClick={handleBuy}
              disabled={hasBought}
            >
              {hasBought ? "Comprado" : "Comprar"}
            </button>
            {hasBought && (
              <div className="mt-2 text-green-600 text-sm font-semibold">
                Obrigado pela compra! Agora você pode avaliar o produto.
              </div>
            )}
            {/* Formulário de avaliação */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="mt-6 bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex flex-col gap-3 animate-fade-in-down"
              >
                <div className="font-semibold text-neutral-700">Avalie este produto:</div>
                <div className="flex gap-1 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={`text-2xl transition-colors ${
                        reviewRating >= star ? "text-yellow-400" : "text-neutral-300"
                      }`}
                      onClick={() => setReviewRating(star)}
                      tabIndex={0}
                      aria-label={`Nota ${star}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200 transition resize-none"
                  rows={3}
                  placeholder="Conte como foi sua experiência..."
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  maxLength={200}
                />
                <button
                  type="submit"
                  className="self-end px-6 py-2 rounded-full bg-neutral-800 text-white font-semibold hover:bg-neutral-700 transition active:scale-95"
                >
                  Enviar avaliação
                </button>
                {reviewMsg && (
                  <div className="text-sm text-green-600 font-medium mt-1">{reviewMsg}</div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Produtos relacionados - carrossel */}
        <section className="relative py-10 sm:py-14 md:py-16 bg-neutral-50 select-none">
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div className="flex items-center mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-700 tracking-tight text-left">
                Produtos relacionados
              </h2>
              <div className="flex-1 border-b border-neutral-200 ml-4 sm:ml-6" />
            </div>
            <div className="relative">
              {/* Carousel Controls */}
              <button
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-neutral-100 border border-neutral-200 shadow px-2.5 py-2.5 rounded-full transition"
                onClick={handleRelPrev}
                aria-label="Anterior"
                type="button"
                disabled={relIsTransitioning}
              >
                <svg width={24} height={24} fill="none" stroke="#888" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-neutral-100 border border-neutral-200 shadow px-2.5 py-2.5 rounded-full transition"
                onClick={handleRelNext}
                aria-label="Próximo"
                type="button"
                disabled={relIsTransitioning}
              >
                <svg width={24} height={24} fill="none" stroke="#888" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {/* Carousel */}
              <div
                className="overflow-hidden mx-auto"
                ref={relListRef}
                style={{
                  cursor: relIsDragging ? "grabbing" : "grab",
                  width: relContainerWidth,
                  maxWidth: "100%",
                  boxSizing: "content-box",
                }}
              >
                <div
                  className={`
                    flex
                    ${windowWidth >= 640 ? "gap-8" : "gap-4"}
                    ${relIsTransitioning ? "transition-transform duration-400 ease-in-out" : ""}
                    ${relIsDragging ? "select-none pointer-events-none" : ""}
                  `}
                  style={{
                    minHeight: windowWidth < 640 ? 260 : 340,
                    willChange: "transform",
                    transform: `translateX(${relTranslate}px)`,
                  }}
                  onTransitionEnd={handleRelTransitionEnd}
                  onPointerDown={handleRelPointerDown}
                  onPointerMove={handleRelPointerMove}
                  onPointerUp={handleRelPointerUp}
                  onPointerLeave={relIsDragging ? handleRelPointerUp : undefined}
                >
                  {relExtended.map((prod, idx) => (
                    <div
                      key={prod.id + "-" + idx}
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
                        ${relHovered === prod.id ? "scale-[1.045] shadow-xl border-neutral-300" : ""}
                        ${relSelected === prod.id ? "ring-2 ring-neutral-400" : ""}
                      `}
                      style={{
                        minHeight: windowWidth < 640 ? 220 : 340,
                        padding: windowWidth < 640
                          ? "1.2rem 0.7rem 1.1rem 0.7rem"
                          : "2.2rem 1.5rem 1.7rem 1.5rem",
                      }}
                      onMouseEnter={() => setRelHovered(prod.id)}
                      onMouseLeave={() => setRelHovered(null)}
                      onClick={() => setRelSelected(prod.id === relSelected ? null : prod.id)}
                      tabIndex={0}
                      aria-label="Produto relacionado"
                      draggable={false}
                    >
                      {/* Imagem mock */}
                      <div
                        className={`
                          w-full ${windowWidth < 640 ? "h-24" : "h-36"} rounded-xl mb-5 md:mb-7 bg-gradient-to-br
                          from-neutral-100 to-neutral-200
                          flex items-center justify-center
                          transition-all duration-300
                          ${relHovered === prod.id ? "shadow-md" : ""}
                        `}
                      >
                        <div className={`${windowWidth < 640 ? "w-12 h-12" : "w-20 h-20"} bg-neutral-200 rounded-lg`} />
                      </div>
                      {/* Nome e preço */}
                      <div className="w-full text-center">
                        <div className={`font-semibold text-neutral-700 ${windowWidth < 640 ? "text-base" : "text-lg"} mb-1`}>
                          {prod.name}
                        </div>
                        <div className={`text-neutral-400 font-medium ${windowWidth < 640 ? "text-sm" : "text-base"} mb-2`}>
                          {prod.price}
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
                          onClick={() => alert(`Ver detalhes de ${prod.name}`)}
                        >
                          Ver detalhes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Avaliações */}
        <section className="max-w-7xl mx-auto mt-14">
          <h2 className="text-xl font-bold text-neutral-700 mb-4">Avaliações</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-200" />
                  <span className="font-semibold text-neutral-700">{review.user}</span>
                  <span className="ml-2 text-yellow-400 font-bold select-none">
                    {"★".repeat(review.rating)}
                    <span className="text-neutral-300">{Array(5 - review.rating).fill("★").join("")}</span>
                  </span>
                </div>
                <div className="text-neutral-600 text-sm">{review.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Comentários */}
        <section className="max-w-7xl mx-auto mt-14 mb-20">
          <h2 className="text-xl font-bold text-neutral-700 mb-4">Comentários</h2>
          <form
            onSubmit={handleCommentSubmit}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            <input
              type="text"
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              placeholder="Escreva um comentário..."
              className="flex-1 px-4 py-2 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200 transition"
              maxLength={180}
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-neutral-800 text-white font-semibold hover:bg-neutral-700 transition active:scale-95"
              disabled={commentInput.trim().length === 0}
            >
              Comentar
            </button>
          </form>
          <div className="space-y-3">
            {comments.length === 0 && (
              <div className="text-neutral-400 text-center">Nenhum comentário ainda.</div>
            )}
            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-neutral-100 rounded-lg px-4 py-3 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-neutral-700">{c.user}</span>
                  <div className="text-neutral-600 text-sm">{c.text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}