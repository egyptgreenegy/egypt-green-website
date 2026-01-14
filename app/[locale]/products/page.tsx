import Products from '@/components/Products/page'
import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Products' })
  
  const title = t('seo.title')
  const description = t('seo.description')
  const keywords = t('seo.keywords')

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_EG' : locale === 'fr' ? 'fr_FR' : 'en_US',
      url: `https://egypt-green.com/${locale}/products`,
      siteName: 'Egypt Green',
      images: [
        {
          url: '/egypt-logo.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/egypt-logo.png'],
    },
    alternates: {
      canonical: `https://egypt-green.com/${locale}/products`,
      languages: {
        'en': 'https://egypt-green.com/en/products',
        'ar': 'https://egypt-green.com/ar/products',
        'fr': 'https://egypt-green.com/fr/products',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

const Page = async ({ params }: Props) => {
  const { locale } = await params
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Agricultural Products & Fertilizers',
    description: 'Comprehensive range of agricultural fertilizers and soil enhancers by Egypt Green',
    url: `https://egypt-green.com/${locale}/products`,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Egypt Green',
      url: 'https://egypt-green.com',
    },
    about: {
      '@type': 'Organization',
      name: 'Egypt Green',
      description: 'Leading manufacturer of agricultural fertilizers and soil enhancers',
      url: 'https://egypt-green.com',
      sameAs: [
        'https://www.facebook.com/egyptgreen',
        'https://www.linkedin.com/company/egypt-green',
        'https://www.instagram.com/egyptgreen',
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Agricultural Products',
      description: 'Complete range of fertilizers and agricultural solutions',
      numberOfItems: '25+',
      itemListElement: [
        {
          '@type': 'Product',
          name: 'NPK Compound Fertilizers',
          description: 'Complete nutrition solutions for all crop types',
          category: 'Fertilizers',
        },
        {
          '@type': 'Product',
          name: 'Water-Soluble Fertilizers',
          description: '100% soluble for fertigation and foliar application',
          category: 'Fertilizers',
        },
        {
          '@type': 'Product',
          name: 'Soil Conditioners',
          description: 'Humic, fulvic acids and amino acid complexes',
          category: 'Soil Enhancers',
        },
        {
          '@type': 'Product',
          name: 'Micronutrients',
          description: 'Essential trace elements for optimal plant health',
          category: 'Nutrients',
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Products />
      </main>
    </>
  )
}

export default Page
