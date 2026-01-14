'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { translations } from '@/constants/constants'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useGetProductsQuery } from '@/redux/features/productApi'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const HomeProducts = () => {
    const {data , isLoading} = useGetProductsQuery({params: { page: 1, limit: 3 }});
    const language = useLocale();
  return (
    <section className="py-20">
            <motion.div  
            className="container px-4 mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            >
            <div className="flex justify-between items-center mb-12">
                <motion.h2 
                className="text-3xl font-bold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                >
                {translations.products.title[language]}
                </motion.h2>
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                >
                <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white">
                  <Link className='flex justify-between items-center gap-2'  href="/products">
                    {translations.products.viewAll[language]} {language === "en" ? <ArrowRight className="h-4 w-4" /> : language === "ar" ? <ArrowRight className="h-4 w-4 rotate-180" /> : <ArrowRight className="h-4 w-4" />}
                  </Link>
                </Button>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.data?.products.map((product, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    viewport={{ once: true }}
                >
                    <Card className="overflow-hidden py-7 hover:shadow-lg transition-shadow">
                    <div className="relative h-64">
                        <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name[language] }
                        fill
                        className="object-contain"
                        />
                    </div>
                    <CardContent className="p-6">
                        <h3 className="text-xl text-center font-semibold mb-2">
                        {product.name[language]}
                        </h3>
                        <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex items-center justify-center'
                        >
                        <Link href={`/products/${product._id}`}  className={cn(buttonVariants({
                            variant: "default",
                            size: "lg",
                        }),"w-1/2 mx-auto text-center bg-green-700 hover:bg-green-800")}>
                            {language === "en" ? "Learn More" : language === "ar" ? "اعرف المزيد" : "En Savoir Plus"}
                        </Link>
                        </motion.div>
                    </CardContent>
                    </Card>
                </motion.div>
                ))}
            </div>
            </motion.div>
        </section>
  )
}

export default HomeProducts
