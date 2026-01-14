'use client'
import React, { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CustomBreadcrumb } from '@/components/breadCrump'
import { useSubmitContactFormMutation, validateContactForm, ContactFormData } from '@/redux/features/contactApi'
import { toast } from 'sonner';

export default function ContactPage() {
  const language = useLocale() as string
  const t = useTranslations('Contact')
  const isRtl = language === 'ar'
  
  // Redux mutation hook
  const [submitContactForm, { isLoading: isSubmitting }] = useSubmitContactFormMutation()
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({})
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form data
    const validation = validateContactForm(formData)
    
    if (!validation.isValid) {
      setFormErrors(validation.errors)
      return
    }
    
    try {
      // Submit form using Redux mutation
      const res = await submitContactForm(formData).unwrap()
      
      // Success handling
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      setFormErrors({})      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
      
    } catch (error) {
      // Error handling is done by the baseApi interceptor (toast notification)
      console.error('Contact form submission failed:', error)
    }
  }
  
  return (
    <>
      <div className={cn("min-h-screen mt-20", isRtl ? "font-arabic" : "")}>
        {/* Hero Section */}
        <section className="relative h-40 md:h-80 bg-green-700 flex items-center">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container px-4 mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='text-white mb-5'
              >
                <CustomBreadcrumb
                items={[
                  { label: language =='ar' ? 'الرئيسيه': language =='en' ?'Home' :'Home' , href: '/' },
                  { label:  language =='ar' ? 'تواصل معنا': language =='en' ?'Contact Us' :'Contact Us', href: '/contact' }
                ]}
                titleClassName='text-white text-4xl'
                className='text-white text-4xl'
                textColor='text-white/80'
                />
              </motion.div>
              <motion.p
                className="text-lg text-white/90 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t('subtitle')}
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Contact Info & Form Section */}
        <section className="py-14">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6">{t('contactInfo')}</h2>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4 ">
                          <div className="bg-green-100 p-3 rounded-full">
                            <Phone className="h-6 w-6 text-green-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{t('phone')}</h3>
                            <p dir='ltr' className="text-gray-600">+2 (011) 401 44 322</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4 ">
                          <div className="bg-green-100 p-3 rounded-full">
                            <Mail className="h-6 w-6 text-green-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{t('email')}</h3>
                            <p className="text-gray-600">info@egypt-green.com</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4 ">
                          <div className="bg-green-100 p-3 rounded-full">
                            <MapPin className="h-6 w-6 text-green-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{t('address')}</h3>
                            <p className="text-gray-600">{t('addressLine1')}</p>
                            <p className="text-gray-600">{t('addressLine2')}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6">{t('sendMessage')}</h2>
                  
                  <Card>
                    <CardContent className="p-6">
                      {submitSuccess ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                          {t('successMessage')}
                        </div>
                      ) : null}
                      
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              {t('nameLabel')} <span className="text-red-500">*</span>
                            </label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder={t('namePlaceholder')}
                              className={cn(
                                formErrors.name ? 'border-red-500 focus:border-red-500' : ''
                              )}
                            />
                            {formErrors.name && (
                              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              {t('emailLabel')} <span className="text-red-500">*</span>
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder={t('emailPlaceholder')}
                              className={cn(
                                formErrors.email ? 'border-red-500 focus:border-red-500' : ''
                              )}
                            />
                            {formErrors.email && (
                              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              {t('phoneLabel')}
                            </label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder={t('phonePlaceholder')}
                              className={cn(
                                formErrors.phone ? 'border-red-500 focus:border-red-500' : ''
                              )}
                            />
                            {formErrors.phone && (
                              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                              {t('subjectLabel')}
                            </label>
                            <Input
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              placeholder={t('subjectPlaceholder')}
                              className={cn(
                                formErrors.subject ? 'border-red-500 focus:border-red-500' : ''
                              )}
                            />
                            {formErrors.subject && (
                              <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('messageLabel')}
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            placeholder={t('messagePlaceholder')}
                            className={cn(
                              formErrors.message ? 'border-red-500 focus:border-red-500' : ''
                            )}
                          />
                          {formErrors.message && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                          )}
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-green-700 hover:bg-green-800"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? t('sending') : t('send')}
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-8 pb-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl font-bold mb-6">{t('findUs')}</h2>
            <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3483.193329412415!2d30.913171484904808!3d29.188434582201833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDExJzE4LjQiTiAzMMKwNTQnMzkuNSJF!5e0!3m2!1sar!2seg!4v1752060567951!5m2!1sar!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Egypt Green Location"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}