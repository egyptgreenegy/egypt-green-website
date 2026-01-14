'use client'
import React, { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, ArrowRight, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CustomBreadcrumb } from '../breadCrump'
import { Link } from '@/i18n/routing'
import { Input } from '@/components/ui/input'
import { useGetAllArticlesQuery } from '@/redux/features/articlesApi'

interface Article {
  id: string;
  title: Record<string, string>;
  content: Record<string, string>;
  image: string;
  category?: Record<string, string>;
  author?: Record<string, string>;
  publishDate: string;
  readTime: number;
  featured: boolean;
  excerpt: Record<string, string>;
}

const Articles = () => {
  const locale = useLocale() as 'ar' | 'en' | 'fr'
  const t = useTranslations('Articles')
  const isRtl = locale === 'ar'
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Fetch articles from backend
  const { data, isLoading, error } = useGetAllArticlesQuery()
  const articles: any[] = data?.data.articles || []

  // Map backend schema to expected fields
  const mappedArticles: Article[] = articles.map((article: any): Article => ({
    id: article._id,
    title: article.title,
    content: article.content,
    category:article.category,
    image: article.imageUrl,
    publishDate: article.createdAt || '',
    readTime: article.readTime || 5,
    featured: article.featured || false,
    excerpt: article.excerpt || {
      ar: article.content?.ar?.slice(0, 100) + '...',
      en: article.content?.en?.slice(0, 100) + '...',
      fr: article.content?.fr?.slice(0, 100) + '...'
    }
  }))

  // Get unique categories (if category exists)
  const categories: string[] = Array.from(
    new Set(
      mappedArticles
        .map((article: Article) => article.category?.[locale])
        .filter((cat): cat is string => Boolean(cat))
    )
  )

  // Filter articles based on search and category
  const filteredArticles: Article[] = mappedArticles.filter((article: Article) => {
    const matchesSearch = article.title?.[locale]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        article.excerpt?.[locale]?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || article.category?.[locale] === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Separate featured and regular articles
  const featuredArticles: Article[] = filteredArticles.filter((article: Article) => article.featured)
  const regularArticles: Article[] = filteredArticles.filter((article: Article) => !article.featured)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : locale === 'fr' ? 'fr-FR' : 'en-US')
  }

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[300px]">Loading...</div>
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-[300px] text-red-500">Failed to load articles.</div>
  }

  return (
    <>
      <main dir={isRtl ? 'rtl':'ltr' } className={cn("pt-8", isRtl ? "font-arabic" : "")}>
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/background.jpg"
              alt="Articles Background"
              fill
              priority
              className="object-fit"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
          </div>

          <div className="container relative z-10 px-4 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {locale === 'ar' ? 'مقالاتنا' : locale === 'en' ? 'Our Articles' : 'Nos Articles'}
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {locale === 'ar' 
                  ? 'اكتشف أحدث المقالات والأبحاث في مجال الزراعة المستدامة'
                  : locale === 'en'
                  ? 'Discover the latest articles and research in sustainable agriculture'
                  : 'Découvrez les derniers articles et recherches en agriculture durable'
                }
              </p>
            </motion.div>
          </div>
        </section>

        {/* Breadcrumb and Search Section */}
        <section className="py-8 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className={cn("mb-6", isRtl ? "text-left" : "text-right")}>
              <CustomBreadcrumb
                items={[
                  {
                    label: locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Accueil',
                    href: '/'
                  },
                  {
                    label: locale === 'ar' ? 'المقالات' : locale === 'en' ? 'Articles' : 'Articles',
                    href: '/articles'
                  }
                ]}
              />
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder={locale === 'ar' ? 'البحث في المقالات...' : locale === 'en' ? 'Search articles...' : 'Rechercher des articles...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  size="sm"
                >
                  {locale === 'ar' ? 'الكل' : locale === 'en' ? 'All' : 'Tout'}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container px-4 mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-green-800">
                {locale === 'ar' ? 'المقالات المميزة' : locale === 'en' ? 'Featured Articles' : 'Articles en vedette'}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                      <div className="relative h-64 w-full">
                        <Image
                          src={article.image}
                          alt={article.title[locale]}
                          fill
                          className="object-contain"
                        />
                        <Badge className="absolute top-4 left-4 bg-green-600">
                          {article?.category?.[locale]}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl line-clamp-2">
                          {article.title[locale]}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {article.excerpt[locale]}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{article.author?.[locale]}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(article.publishDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {article.readTime} {locale === 'ar' ? 'دقائق' : locale === 'en' ? 'min read' : 'min de lecture'}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/articles/${article.id}`}>
                            {locale === 'ar' ? 'قراءة المقال' : locale === 'en' ? 'Read Article' : 'Lire l\'article'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular Articles */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-green-800">
              {locale === 'ar' ? 'جميع المقالات' : locale === 'en' ? 'All Articles' : 'Tous les articles'}
            </h2>
            
            {regularArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                      <div className="relative h-48 w-full">
                        <Image
                          src={article.image}
                          alt={article.title[locale]}
                          fill
                          className="object-cover"
                        />
                        <Badge className="absolute top-4 left-4 bg-green-600">
                          {article.category?.[locale]}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg line-clamp-2">
                          {article.title[locale]}
                        </CardTitle>
                        <CardDescription   dangerouslySetInnerHTML={{ __html: article.content?.[locale].slice(0, 20) + '...' || "" }} className="line-clamp-2">
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{article.author?.[locale]}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(article.publishDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              {article.readTime} {locale === 'ar' ? 'د' : 'min'}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/articles/${article.id}`}>
                            {locale === 'ar' ? 'قراءة المزيد' : locale === 'en' ? 'Read More' : 'Lire plus'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {locale === 'ar' 
                    ? 'لا توجد مقالات متاحة حالياً'
                    : locale === 'en'
                    ? 'No articles available at the moment'
                    : 'Aucun article disponible pour le moment'
                  }
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default Articles