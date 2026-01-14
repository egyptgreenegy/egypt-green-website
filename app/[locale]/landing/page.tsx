import EnhancedDistributorLandingPage from '@/components/Landing'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import React from 'react'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata ({params}: Props): Promise<Metadata> {
  const {locale} = await params 
  const t = await getTranslations('Landing')
  
  const title = t('seo.title')
  const description = t('seo.description')
  const keywords = t('seo.keywords')
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://egyptgreen.com'
  const canonicalUrl = `${baseUrl}/${locale}/landing`
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ar': `${baseUrl}/ar/landing`,
        'en': `${baseUrl}/en/landing`,
        'fr': `${baseUrl}/fr/landing`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Egypt Green',
      images: [
        {
          url: `${baseUrl}/og-image-landing.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image-landing.jpg`],
      creator: '@egyptgreen',
      site: '@egyptgreen',
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
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
    other: {
      'og:image:alt': title,
      'og:image:type': 'image/jpeg',
      'article:publisher': 'https://facebook.com/egyptgreen',
      'article:author': 'Egypt Green Team',
    },
  }
}

const LandingPage = async ({ params}: Props) => {
  // Structured data for better SEO
  const {locale} = await params
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://egyptgreen.com/#organization",
        "name": "Egypt Green",
        "url": "https://egyptgreen.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://egyptgreen.com/logo.png",
          "width": 300,
          "height": 100
        },
        "description": "Leading provider of sustainable agricultural solutions for farmers across Africa and the Middle East",
        "sameAs": [
          "https://facebook.com/egyptgreen",
          "https://twitter.com/egyptgreen",
          "https://linkedin.com/company/egyptgreen",
          "https://instagram.com/egyptgreen"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+20-xxx-xxx-xxxx",
          "contactType": "customer service",
          "availableLanguage": ["Arabic", "English", "French"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://egyptgreen.com/#website",
        "url": "https://egyptgreen.com",
        "name": "Egypt Green",
        "description": "Sustainable agricultural solutions and fertilizers",
        "publisher": {
          "@id": "https://egyptgreen.com/#organization"
        },
        "inLanguage": ["ar", "en", "fr"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://egyptgreen.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `https://egyptgreen.com/${locale}/landing#webpage`,
        "url": `https://egyptgreen.com/${locale}/landing`,
        "name": locale === 'ar' ? "كن وكيلاً لشركة Egypt Green - فرصة استثمارية في الأسمدة الزراعية" : 
               locale === 'fr' ? "Devenez Agent Egypt Green - Opportunité d'investissement en engrais agricoles" :
               "Become Egypt Green Agent - Agricultural Fertilizer Investment Opportunity",
        "isPartOf": {
          "@id": "https://egyptgreen.com/#website"
        },
        "about": {
          "@id": "https://egyptgreen.com/#organization"
        },
        "description": locale === 'ar' ? "انضم إلى شبكة موزعي Egypt Green واحصل على فرصة استثمارية مميزة في مجال الأسمدة والمحسنات الزراعية" :
                      locale === 'fr' ? "Rejoignez le réseau de distributeurs Egypt Green et saisissez une opportunité d'investissement exceptionnelle dans les engrais agricoles" :
                      "Join Egypt Green distributor network and seize an exceptional investment opportunity in agricultural fertilizers",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": locale === 'ar' ? "الرئيسية" : locale === 'fr' ? "Accueil" : "Home",
              "item": `https://egyptgreen.com/${locale}`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": locale === 'ar' ? "كن وكيلاً" : locale === 'fr' ? "Devenez Agent" : "Become Agent",
              "item": `https://egyptgreen.com/${locale}/landing`
            }
          ]
        }
      },
      {
        "@type": "Service",
        "name": locale === 'ar' ? "برنامج الوكالة الزراعية" : locale === 'fr' ? "Programme d'agence agricole" : "Agricultural Agency Program",
        "description": locale === 'ar' ? "برنامج شراكة لتوزيع الأسمدة والمحسنات الزراعية عالية الجودة" :
                      locale === 'fr' ? "Programme de partenariat pour la distribution d'engrais et d'améliorants agricoles de haute qualité" :
                      "Partnership program for distributing high-quality fertilizers and agricultural enhancers",
        "provider": {
          "@id": "https://egyptgreen.com/#organization"
        },
        "areaServed": {
          "@type": "Place",
          "name": "Africa and Middle East"
        },
        "category": "Agricultural Services",
        "offers": {
          "@type": "Offer",
          "description": locale === 'ar' ? "فرصة توزيع حصرية للأسمدة الزراعية" :
                        locale === 'fr' ? "Opportunité de distribution exclusive d'engrais agricoles" :
                        "Exclusive distribution opportunity for agricultural fertilizers"
        }
      }
    ]
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Page Content */}
      <div>
        <EnhancedDistributorLandingPage/>
      </div>
    </>
  )
}

export default LandingPage
