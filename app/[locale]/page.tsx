import Features from "@/components/Home/Featrues/page";
import Hero from "@/components/Home/Hero";
import HomeProducts from "@/components/Home/HomeProducts";
import { getProducts } from "@/data/products";
import { getLocale } from "next-intl/server";
import { translations } from "@/constants/constants";

// ✅ Generate dynamic metadata
export async function generateMetadata() {
  const language = await getLocale();

  return {
    title: translations.hero.title[language],
    description: translations.hero.subtitle[language],
    openGraph: {
      title: translations.hero.title[language],
      description: translations.hero.subtitle[language],
      images: [
        {
          url: '/seo-cover.jpg',
          width: 1200,
          height: 630,
          alt: 'Egypt Green',
        },
      ],
    },
  };
}

export default async function Page() {
  const products = await getProducts({ page: 1, limit: 3 });

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div>
        <Hero />
        <Features />
        <HomeProducts />
      </div>
    </section>
  );
}
