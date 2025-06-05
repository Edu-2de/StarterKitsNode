import Banner from "@/components/Banner";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <>
      <Banner />
      <MainContent>
        <section className="products-grid">
          {[...Array(8)].map((_, i) => (
            <div className="product-card" key={i}>
              <div className="product-image" />
              <div className="product-info">
                <div className="product-title" />
                <div className="product-price" />
              </div>
            </div>
          ))}
        </section>
      </MainContent>
    </>
  );
}