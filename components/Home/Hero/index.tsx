'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { translations } from '@/constants/constants'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function Hero() {
    const language = useLocale();
    const [showVideo, setShowVideo] = useState(false);
    useEffect(() => {
    const timeout = setTimeout(() => setShowVideo(true), 1000); // حمّل بعد ثانية
    return () => clearTimeout(timeout);
  }, []);
    return (
            <>
            <section   aria-label={translations.hero.title[language]} className="relative min-h-screen flex items-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-black/70 z-10"></div>
                    <div className="absolute inset-0 w-full h-full">
                      {showVideo ? (
                                <video
                                  src="/agriculture video.mov"
                                  poster="/fallback-image.png"
                                  autoPlay
                                  muted
                                  playsInline
                                  loop
                                  className="object-cover w-full h-full absolute inset-0"
                                  style={{ objectPosition: 'center' }}
                                />
                              ) : (
                                <Image
                                  src="/fallback-image.png"
                                  alt={translations.hero.title[language]}
                                  className="object-cover w-full h-full absolute inset-0"
                                  style={{ objectPosition: 'center' }}
                                  width={1920}
                                  height={1080}
                                  priority
                                />
                      )}
                    </div>
                    <div className="absolute inset-0 z-20 flex items-center">
                      <div className="container px-4 mx-auto">
                        <motion.div 
                          className="max-w-6xl mx-auto p-2"
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8 }}
                        >
        
                          <motion.h1
                            className={cn(
                              "text-2xl md:text-3xl lg:text-5xl font-extrabold mx-auto text-center text-white mb-6",
                              language === "ar" ? "leading-relaxed" : "leading-tight",
                            )}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            {translations.hero.title[language]}
                          </motion.h1>
        
                          <motion.p 
                            className="text-lg md:text-2xl mx-auto text-center text-white/90 mb-10 max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            {translations.hero.subtitle[language]}
                          </motion.p>
        
                          <motion.div 
                            className="flex flex-wrap items-center justify-center gap-4 md:gap-7"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Link href={'/about'} className={cn(buttonVariants({
                                variant: "default",
                                size: "lg",
                              }),"bg-green-700 hover:bg-green-800 text-white")}>
                                {translations.hero.cta1[language]}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Link
                                href={'/agent'}
                                className={cn(buttonVariants({
                                  variant: "outline",
                                  size: "lg",
                                }),"bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30")}
                              >
                                {translations.hero.cta2[language]}
                              </Link>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                </section>
                </>
    )
}

export default Hero
