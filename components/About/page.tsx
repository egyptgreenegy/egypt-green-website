'use client'
import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Award, Users, Target, Leaf, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from '@/i18n/routing'
const About = () => {
    const language = useLocale() as string
    const t = useTranslations('About')
    const isRtl = language === 'ar'

    
    const values = [
      {
        icon: <Leaf className="h-8 w-8 text-green-700" />,
        title: 'sustainability',
        description: 'sustainabilityDesc'
      },
      {
        icon: <Award className="h-8 w-8 text-green-700" />,
        title: 'quality',
        description: 'qualityDesc'
      },
      {
        icon: <Users className="h-8 w-8 text-green-700" />,
        title: 'community',
        description: 'communityDesc'
      },
      {
        icon: <Target className="h-8 w-8 text-green-700" />,
        title: 'innovation',
        description: 'innovationDesc'
      }
    ]
    
    return (
      <>
        <main className={cn("pt-0", isRtl ? "font-arabic" : "")}>
          {/* Hero Section */}
          <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/about.png"
                alt={t('heroAlt')}
                fill
                priority
                className="object-fit"
              />
              <div className="absolute inset-0  bg-gradient-to-l from-black/50 to-black/50"></div>
            </div>
            
            <div className="container relative z-10 px-4 mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t('title')}</h1>
                <p className="text-xl text-white/90 mb-8">{t('subtitle')}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white "
                    onClick={() => {
                      const element = document.getElementById('our-story');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {t('ourStory')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white/10"
                    onClick={() => {
                      const element = document.getElementById('contact-section');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {t('contactButton')}
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/30 to-transparent"></div>
          </section>
          
          {/* Our Story Section */}
          <section id="our-story" className="py-20 bg-white">
            <div className="container px-4 mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-green-800">{t('ourStory')}</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">{t('storyPara1')}</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">{t('storyPara2')}</p>
                  <p className="text-gray-700 mb-8 leading-relaxed">{t('storyPara3')}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">{t('established')}</span>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">{t('countries')}</span>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">{t('farmers')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
                >
                  <Image
                    src="/egypt-green-about.jpg"
                    alt={t('storyImageAlt')}
                    fill
                    className="object-fill"
                  />
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Mission & Vision Section */}
          <section className="py-20 bg-green-50">
            <div className="container px-4 mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-4 text-green-800">{t('missionVision')}</h2>
                <p className="text-gray-600">{t('missionVisionSubtitle')}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-8 shadow-lg"
                >
                  <h3 className="text-2xl font-bold mb-4 text-green-700">{t('ourMission')}</h3>
                  <p className="text-gray-700 mb-6">{t('missionText')}</p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{t('missionPoint1')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{t('missionPoint2')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{t('missionPoint3')}</span>
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-8 shadow-lg"
                >
                  <h3 className="text-2xl font-bold mb-4 text-green-700">{t('ourVision')}</h3>
                  <p className="text-gray-700 mb-6">{t('visionText')}</p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{t('visionPoint1')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{t('visionPoint2')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{t('visionPoint3')}</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Our Values Section */}
          <section className="py-20 bg-white">
            <div className="container px-4 mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-4 text-green-800">{t('ourValues')}</h2>
                <p className="text-gray-600">{t('valuesSubtitle')}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-green-50 rounded-xl p-6 border border-green-100 hover:shadow-md transition-shadow"
                  >
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-green-700">
                      {t(`values.${value.title}`)}
                    </h3>
                    <p className="text-gray-600">
                      {t(`values.${value.description}`)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Team Section */}
          {/* <section className="py-20 bg-green-50">
            <div className="container px-4 mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-4 text-green-800">{t('ourTeam')}</h2>
                <p className="text-gray-600">{t('teamSubtitle')}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg"
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={member.image}
                        alt={member.name[language as keyof typeof member.name]}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1 text-green-800">
                        {member.name[language as keyof typeof member.name]}
                      </h3>
                      <p className="text-green-600 font-medium mb-4">
                        {member.role[language as keyof typeof member.role]}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {member.bio[language as keyof typeof member.bio]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section> */}
          
          {/* CTA Section */}
          <section id="contact-section" className="py-20 bg-green-800 text-white">
            <div className="container px-4 mx-auto">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">{t('joinUs')}</h2>
                <p className="text-xl text-white/80 mb-8">{t('joinUsText')}</p>
                <Button 
                  size="lg" 
                  asChild
                  className="bg-white text-green-800 hover:bg-green-100"
                >
                  <Link href="/contact">
                    {t('contactButton')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </>
    )
}

export default About
