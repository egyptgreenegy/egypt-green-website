"use client"

import { motion } from "framer-motion"
import { Leaf, Sprout, Droplets, Sun } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLocale } from "next-intl"
import { translations } from "@/constants/constants"

// Mock translations object for demo
export default function Features() {
  const language = useLocale();

  const features = [
    { icon: <Leaf className="h-6 w-6" />, feature: "organic", gradient: "from-emerald-500 to-green-600" },
    { icon: <Sprout className="h-6 w-6" />, feature: "quality", gradient: "from-yellow-400 to-yellow-600"  },
    { icon: <Droplets className="h-6 w-6" />, feature: "support", gradient: "from-blue-500 to-cyan-600" },
    { icon: <Sun className="h-6 w-6" />, feature: "sustainable", gradient: "from-yellow-500 to-orange-600" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl p-2 md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            {translations.features.title[language]}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((item, index) => (
            <motion.div
              key={item.feature}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              className="group"
            >
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg`}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 },
                    }}
                  >
                    {item.icon}
                  </motion.div>

                  <div className="flex-1 flex flex-col justify-center">
                    <h3
                      className={`text-xl font-bold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors ${
                        language === "ar" ? "text-right" : "text-center"
                      }`}
                    >
                      {translations.features[item.feature].title[language]}
                    </h3>

                    <p
                      className={`text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors ${
                        language === "ar" ? "text-right" : "text-center"
                      }`}
                    >
                      {translations.features[item.feature].description[language]}
                    </p>
                  </div>

                  <motion.div
                    className="mt-6 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </div>
    </section>
  )
}
