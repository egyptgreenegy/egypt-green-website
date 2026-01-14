import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

interface ProductCardProps {
  id: number;
  name: Record<string, string>;
  price?: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const locale = useLocale();
  
  // Create structured data for each product
  const productJsonLd = {
    "@type": "Product",
    "name": name[locale],
    "category": category,
    "image": image,
    "url": `https://egypt-green.com/${locale}/products/${id}`,
    "manufacturer": {
      "@type": "Organization",
      "name": "Egypt Green"
    },
    "brand": {
      "@type": "Brand",
      "name": "Egypt Green"
    }
  };
  
  return (
    <article 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      itemScope 
      itemType="https://schema.org/Product"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      
      <div className="relative h-48 w-full">
        <Image 
          src={image} 
          alt={`${name[locale]} - ${category}`}
          fill
          className="object-contain"
          itemProp="image"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4 text-center">
        <h3 
          className="font-semibold text-lg mb-1 text-gray-900" 
          itemProp="name"
        >
          {name[locale]}
        </h3>
        <p 
          className="text-gray-600 text-sm mb-2" 
          itemProp="category"
        >
          {category}
        </p>
        <div className="flex justify-center items-center">
          <Link 
            href={`/products/${id}`} 
            className="px-20 py-1 bg-green-700 font-semibold text-white rounded-md text-sm hover:bg-green-800 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors duration-200"
            aria-label={`View details for ${name[locale]}`}
            itemProp="url"
          >
            {locale === 'ar' ? 'عرض' : locale === 'en' ? 'View' : 'Voir'}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;