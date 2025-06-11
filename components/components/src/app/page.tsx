import Image from "next/image";
import Content from "@/components/content";
import Header1 from "@/components/headers/header1";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 main-bg">
      <Header1 />
      <main>
        <Content />
      </main>
    </div>
  );
}
