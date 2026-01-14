'use client'
import React, { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote, ArrowRight, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import Header from '@/components/Header/page'
import Footer from '@/components/Footer/page'

export default function TestimonialsPage() {
  const language = useLocale() as string
  const t = useTranslations('Testimonials')
  const isRtl = language === 'ar'
  
  const [activeCategory, setActiveCategory] = useState('all')
  
  // Testimonial data
  const testimonialCategories = [
    { id: 'all', key: 'all' },
    { id: 'farmers', key: 'farmers' },
    { id: 'distributors', key: 'distributors' },
    { id: 'partners', key: 'partners' },
  ]
  
  const testimonials = [
    {
      id: 1,
      category: 'farmers',
      avatar: '/testimonials/farmer1.jpg',
      nameEn: 'Ahmed Hassan',
      nameAr: 'أحمد حسن',
      nameFr: 'Ahmed Hassan',
      locationEn: 'Cairo, Egypt',
      locationAr: 'القاهرة، مصر',
      locationFr: 'Le Caire, Égypte',
      testimonialEn: 'Since switching to Egypt Green\'s organic fertilizers, my crop yield has increased by 30% while reducing water usage. Their products have transformed my farm into a sustainable operation.',
      testimonialAr: 'منذ أن تحولت إلى الأسمدة العضوية من إيجيبت جرين، زاد محصولي بنسبة 30٪ مع تقليل استخدام المياه. لقد حولت منتجاتهم مزرعتي إلى عملية مستدامة.',
      testimonialFr: 'Depuis que j\'ai commencé à utiliser les engrais biologiques d\'Egypt Green, mon rendement a augmenté de 30% tout en réduisant la consommation d\'eau. Leurs produits ont transformé ma ferme en une exploitation durable.',
      rating: 5,
      date: '2023-05-15',
    },
    {
      id: 2,
      category: 'distributors',
      avatar: '/testimonials/distributor1.jpg',
      nameEn: 'Fatima El-Sayed',
      nameAr: 'فاطمة السيد',
      nameFr: 'Fatima El-Sayed',
      locationEn: 'Alexandria, Egypt',
      locationAr: 'الإسكندرية، مصر',
      locationFr: 'Alexandrie, Égypte',
      testimonialEn: 'As a distributor, I\'ve seen firsthand how Egypt Green products outperform competitors. Their commitment to quality and customer service is unmatched in the industry.',
      testimonialAr: 'بصفتي موزعًا، رأيت بنفسي كيف تتفوق منتجات إيجيبت جرين على المنافسين. التزامهم بالجودة وخدمة العملاء لا مثيل له في الصناعة.',
      testimonialFr: 'En tant que distributeur, j\'ai vu de première main comment les produits Egypt Green surpassent la concurrence. Leur engagement envers la qualité et le service client est inégalé dans l\'industrie.',
      rating: 5,
      date: '2023-06-22',
    },
    {
      id: 3,
      category: 'farmers',
      avatar: '/testimonials/farmer2.jpg',
      nameEn: 'Mohamed Ibrahim',
      nameAr: 'محمد إبراهيم',
      nameFr: 'Mohamed Ibrahim',
      locationEn: 'Aswan, Egypt',
      locationAr: 'أسوان، مصر',
      locationFr: 'Assouan, Égypte',
      testimonialEn: 'The soil enhancer from Egypt Green has completely revitalized my previously depleted farmland. The technical support team provided valuable guidance throughout the process.',
      testimonialAr: 'لقد أعاد محسن التربة من إيجيبت جرين إحياء أرضي الزراعية المستنفدة سابقًا بشكل كامل. قدم فريق الدعم الفني إرشادات قيمة طوال العملية.',
      testimonialFr: 'L\'améliorateur de sol d\'Egypt Green a complètement revitalisé mes terres agricoles auparavant épuisées. L\'équipe de support technique a fourni des conseils précieux tout au long du processus.',
      rating: 4,
      date: '2023-07-10',
    },
    {
      id: 4,
      category: 'partners',
      avatar: '/testimonials/partner1.jpg',
      nameEn: 'Dr. Laila Mahmoud',
      nameAr: 'د. ليلى محمود',
      nameFr: 'Dr. Laila Mahmoud',
      locationEn: 'Agricultural Research Center, Giza',
      locationAr: 'مركز البحوث الزراعية، الجيزة',
      locationFr: 'Centre de Recherche Agricole, Gizeh',
      testimonialEn: 'Our research partnership with Egypt Green has led to groundbreaking innovations in sustainable agriculture. Their commitment to science-based solutions is advancing the entire industry.',
      testimonialAr: 'أدت شراكتنا البحثية مع إيجيبت جرين إلى ابتكارات رائدة في الزراعة المستدامة. التزامهم بالحلول القائمة على العلم يدفع الصناعة بأكملها إلى الأمام.',
      testimonialFr: 'Notre partenariat de recherche avec Egypt Green a conduit à des innovations révolutionnaires dans l\'agriculture durable. Leur engagement envers des solutions basées sur la science fait progresser toute l\'industrie.',
      rating: 5,
      date: '2023-08-05',
    },
    {
      id: 5,
      category: 'distributors',
      avatar: '/testimonials/distributor2.jpg',
      nameEn: 'Karim Abdel-Rahman',
      nameAr: 'كريم عبد الرحمن',
      nameFr: 'Karim Abdel-Rahman',
      locationEn: 'Tanta, Egypt',
      locationAr: 'طنطا، مصر',
      locationFr: 'Tanta, Égypte',
      testimonialEn: 'The demand for Egypt Green products in my region has grown exponentially. Farmers are seeing real results, and word-of-mouth has become our best marketing tool.',
      testimonialAr: 'نما الطلب على منتجات إيجيبت جرين في منطقتي بشكل كبير. يرى المزارعون نتائج حقيقية، وأصبحت الكلمة المنقولة أفضل أداة تسويقية لدينا.',
      testimonialFr: 'La demande pour les produits Egypt Green dans ma région a augmenté de façon exponentielle. Les agriculteurs voient des résultats réels, et le bouche-à-oreille est devenu notre meilleur outil de marketing.',
      rating: 4,
      date: '2023-09-18',
    },
    {
      id: 6,
      category: 'farmers',
      avatar: '/testimonials/farmer3.jpg',
      nameEn: 'Aisha Nour',
      nameAr: 'عائشة نور',
      nameFr: 'Aisha Nour',
      locationEn: 'Luxor, Egypt',
      locationAr: 'الأقصر، مصر',
      locationFr: 'Louxor, Égypte',
      testimonialEn: 'As a small-scale farmer, I was skeptical about organic solutions, but Egypt Green\'s products have proven their worth. My crops are healthier, and I\'m spending less on inputs.',
      testimonialAr: 'كمزارعة صغيرة، كنت متشككة في الحلول العضوية، لكن منتجات إيجيبت جرين أثبتت قيمتها. محاصيلي أكثر صحة، وأنفق أقل على المدخلات.',
      testimonialFr: 'En tant que petite agricultrice, j\'étais sceptique quant aux solutions biologiques, mais les produits d\'Egypt Green ont prouvé leur valeur. Mes cultures sont plus saines et je dépense moins en intrants.',
      rating: 5,
      date: '2023-10-05',
    },
  ]
  
  // Filter testimonials based on active category
  const filteredTestimonials = testimonials.filter(
    testimonial => activeCategory === 'all' || testimonial.category === activeCategory
  )
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
        />
      ))
  }
  
  return (
    <>
      <Header />
      <div className={cn("min-h-screen", isRtl ? "font-arabic" : "")}>
        {/* Hero Section */}
        <section className="bg-green-800 text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
              <p className="text-lg text-green-100 mb-8">{t('subtitle')}</p>
              <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                <Button 
                  className="bg-white text-green-800 hover:bg-green-100"
                  onClick={() => document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('viewTestimonials')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => document.getElementById('share-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('shareYourStory')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials-section" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-center mb-8">{t('customerStories')}</h2>
              
              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {testimonialCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    className={activeCategory === category.id 
                      ? "bg-green-700 hover:bg-green-800" 
                      : "border-green-700 text-green-700 hover:bg-green-50"}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {t(`categories.${category.key}`)}
                  </Button>
                ))}
              </div>
            </motion.div>
            
            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start mb-4">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                          <Image
                            src={testimonial.avatar}
                            alt={language === 'en' ? testimonial.nameEn : language === 'ar' ? testimonial.nameAr : testimonial.nameFr}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {language === 'en' ? testimonial.nameEn : language === 'ar' ? testimonial.nameAr : testimonial.nameFr}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {language === 'en' ? testimonial.locationEn : language === 'ar' ? testimonial.locationAr : testimonial.locationFr}
                          </p>
                          <div className="flex mt-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 relative">
                        <Quote className="absolute text-green-100 h-8 w-8 -left-1 -top-1 z-0" />
                        <p className="text-gray-700 relative z-10 pl-2">
                          {language === 'en' ? testimonial.testimonialEn : language === 'ar' ? testimonial.testimonialAr : testimonial.testimonialFr}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                        {new Date(testimonial.date).toLocaleDateString(
                          language === 'en' ? 'en-US' : language === 'ar' ? 'ar-EG' : 'fr-FR',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Share Your Story Section */}
        <section id="share-section" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <MessageSquare className="h-12 w-12 text-green-700 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">{t('shareYourExperience')}</h2>
              <p className="text-gray-600 mb-8">{t('shareDescription')}</p>
              <Button className="bg-green-700 hover:bg-green-800">
                {t('submitTestimonial')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}