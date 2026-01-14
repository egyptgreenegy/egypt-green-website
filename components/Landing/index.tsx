"use client"
import { useLocale, useTranslations } from "next-intl"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  Users,
  Globe,
  Award,
  Truck,
  Leaf,
  BarChart3,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Star,
} from "lucide-react"
import { Link } from "@/i18n/routing"

export default function EnhancedDistributorLandingPage() {
  const language = useLocale() as string
  const isRtl = language === "ar"
  const t = useTranslations("Landing")
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Icon mapping helper
  const iconMap = {
    BarChart3,
    Award,
    Users,
    Globe,
    Leaf,
    Truck,
    Star,
  }

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Award
  }
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div className={cn("min-h-screen bg-white", isRtl && "rtl font-arabic")}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image src="/Header-2.png" alt="Egypt Green Factory" fill className="object-fit" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-4 mt-20 relative z-10">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-amber-500/20 text-amber-100 border-amber-400/30 px-4 py-2">
                {t("hero.badge")}
              </Badge>

              <h1
                className={cn("text-5xl md:text-5xl lg:text-6xl font-bold text-white mb-4", isRtl && "leading-relaxed")}
              >
                {t("hero.title")}
              </h1>

              <h2
                className={cn(
                  "text-3xl md:text-5xl lg:text-6xl font-medium text-amber-400 mb-8",
                  isRtl && "leading-relaxed",
                )}
              >
                {t("hero.subtitle")}
              </h2>

              <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 max-w-2xl leading-relaxed">
                {t("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link
                href={'/agent'}
                  className={cn(buttonVariants({
                    size: "lg",
                  }),"bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-6 text-lg h-auto shadow-2xl")}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {language === "ar" ? "كن وكيل في بلدك" : language == 'en' ?'REGISTER NOW TO BECOME A COUNTRY AGENT' : "Soyez un agent dans votre pays"}
                  <ArrowRight className={cn("h-5 w-5", isRtl ? "mr-2" : "ml-2")} />
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 backdrop-blur-sm px-8 py-6 text-lg h-auto"
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {language === "ar" ? "استكشف المنتجات" : "View Products"}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Challenges Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn("text-4xl font-bold text-gray-800 mb-4", isRtl && "leading-relaxed")}>
              {t("challenges.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("challenges.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 3 }).map((_, index) => {
              const iconName = t(`challenges.items.${index}.icon`)
              const IconComponent = getIcon(iconName)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className={cn("text-xl font-bold text-gray-800 mb-4", isRtl && "leading-relaxed")}>
                    {t(`challenges.items.${index}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`challenges.items.${index}.description`)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Solution Section */}
      <section className="relative py-24 md:py-32 lg:py-40 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-65">
        <img
          src="/solutions.png"
          alt="Solutions background"
          className="w-full h-full object-fit object-center"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent",
              isRtl && "leading-relaxed",
            )}
          >
            {t("solution.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-green-50 leading-relaxed max-w-3xl mx-auto font-semibold"
          >
            {t("solution.subtitle")}
          </motion.p>

          {/* Optional CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8"
          >
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300/10 rounded-full blur-lg" />
    </section>

      {/* Enhanced Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn("text-4xl font-bold text-gray-800 mb-4", isRtl && "leading-relaxed")}>
              {t("products.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("products.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => {
              const iconName = t(`products.categories.${index}.icon`)
              const IconComponent = getIcon(iconName)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-8">
                      <div className="bg-green-100 group-hover:bg-green-200 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                        <IconComponent className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className={cn("text-xl font-bold text-gray-800 mb-4", isRtl && "leading-relaxed")}>
                        {t(`products.categories.${index}.title`)}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {t(`products.categories.${index}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn("text-4xl font-bold text-gray-800 mb-4", isRtl && "leading-relaxed")}>
              {t("benefits.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("benefits.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {Array.from({ length: 4 }).map((_, index) => {
              const iconName = t(`benefits.items.${index}.icon`)
              const IconComponent = getIcon(iconName)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 "
                >
                  <div className="flex items-start  space-x-5">
                    <div className="bg-green-100 p-4 rounded-full mr-6 flex-shrink-0">
                      <IconComponent className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className={cn("text-xl font-bold text-gray-800 mb-3", isRtl && "leading-relaxed")}>
                        {t(`benefits.items.${index}.title`)}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {t(`benefits.items.${index}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn("text-4xl font-bold text-gray-800 mb-4", isRtl && "leading-relaxed")}>
              {t("testimonials.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Array.from({ length: 2 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-green-50 rounded-xl p-8 border border-green-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{t(`testimonials.items.${index}.text`)}"
                </p>
                <div>
                  <div className="font-bold text-gray-800">{t(`testimonials.items.${index}.name`)}</div>
                  <div className="text-green-600">{t(`testimonials.items.${index}.company`)}</div>
                  <div className="text-gray-500 text-sm">{t(`testimonials.items.${index}.country`)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-green-800 via-green-900 to-emerald-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className={cn("text-4xl md:text-5xl font-bold mb-6", isRtl && "leading-relaxed")}>
              {t("cta.title")}
            </h2>
            <p className="text-xl text-white/90 mb-12">
              {t("cta.subtitle")}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <motion.a
                href={`mailto:${t("cta.email")}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-6 flex flex-col items-center transition-all duration-300 group"
              >
                <Mail className="h-8 w-8 mb-4 text-green-300 group-hover:text-green-200 transition-colors" />
                <p className="text-sm font-medium mb-2 text-white/80">Email</p>
                <p className="text-sm font-bold break-all">{t("cta.email")}</p>
              </motion.a>

              <motion.a
                href={`https://${t("cta.whatsapp")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-6 flex flex-col items-center transition-all duration-300 group"
              >
                <MessageCircle className="h-8 w-8 mb-4 text-green-300 group-hover:text-green-200 transition-colors" />
                <p className="text-sm font-medium mb-2 text-white/80">WhatsApp</p>
                <p className="text-sm font-bold">{t("cta.phone")}</p>
              </motion.a>

              <motion.a
                href={`tel:${t("cta.phone")}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-6 flex flex-col items-center transition-all duration-300 group"
              >
                <Phone className="h-8 w-8 mb-4 text-green-300 group-hover:text-green-200 transition-colors" />
                <p className="text-sm font-medium mb-2 text-white/80">{language === "ar" ? "هاتف" : "Phone"}</p>
                <p className="text-sm font-bold">{t("cta.phone")}</p>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 flex flex-col items-center group"
              >
                <MapPin className="h-8 w-8 mb-4 text-green-300 group-hover:text-green-200 transition-colors" />
                <p className="text-sm font-medium mb-2 text-white/80">{language === "ar" ? "العنوان" : "Address"}</p>
                <p className="text-sm font-bold">{t("cta.address")}</p>
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/agent"
                className={cn(buttonVariants({
                  size: "lg",
                }),"bg-green-500 hover:bg-green-600 text-white px-12 py-6 text-xl h-auto shadow-2xl")}
                onClick={() => (window.location.href = "/contact")}
              >
                {language === "ar" ? "ابدأ الشراكة الآن" : "Start Partnership Now"}
                <ArrowRight className={cn("h-6 w-6", isRtl ? "mr-3" : "ml-3")} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
