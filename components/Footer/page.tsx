"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function Footer() {
  const t = useTranslations('Footer')
  const locale = useLocale() as string
  const isRtl = locale === 'ar'
  const [email, setEmail] = useState("")

  const footerLinks = [
    {
      title: 'quickLinks',
      links: [
        { key: "home", href: "/" },
        { key: "about", href: "/about" },
        { key: "products", href: "/products" },
        { key: "blog", href: "/articles" },
        { key: "contact", href: "/contact" },
      ]
    },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement newsletter subscription logic here
    console.log("Subscribe email:", email)
    setEmail("")
    // Show success message or handle errors
  }

  return (
    <footer dir={locale == 'ar' ? 'rtl' : 'ltr'} className="bg-[#0d3f10] text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <Image src="/logo.png" alt={t('logoAlt')} width={60} height={60} className="h-12 w-auto" />
              <span className={cn("font-bold text-xl", isRtl ? "font-arabic" : "")}>
                {t('companyName')}
              </span>
            </div>
            <p className={cn("text-gray-300 mb-4", isRtl ? "font-arabic" : "")}>
              {t('companyDescription')}
            </p>
            <div className="flex space-x-4">
              <Link target="_blank" href="https://www.facebook.com/EGgreen.Agriculture" aria-label="Facebook" className="hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link target="_blank" href="https://www.instagram.com/egyptgreen.egy" aria-label="Instagram" className="hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/EgyptGreen_fert" target="_blank" aria-label="Twitter" className="hover:text-green-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://www.youtube.com/channel/UCtoKDFHeg9aD3sBMTd-nVDg" target="_blank" aria-label="Twitter" className="hover:text-green-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className={cn("font-bold text-lg mb-4", isRtl ? "font-arabic" : "")}>
                {t(`sections.${section.title}`)}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.key}>
                    <Link 
                      href={link.href} 
                      className={cn(
                        "text-gray-300 hover:text-green-400 transition-colors",
                        isRtl ? "font-arabic" : ""
                      )}
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className={cn("font-bold text-lg mb-4", isRtl ? "font-arabic" : "")}>
              {t('newsletter.title')}
            </h3>
            <p className={cn("text-gray-300 mb-4", isRtl ? "font-arabic" : "")}>
              {t('newsletter.description')}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#1b5e20] border-[#2e7d32] text-white placeholder:text-gray-400"
              />
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {t('newsletter.subscribe')}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact info bar */}
      <div className="bg-[#072508] py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex flex-wrap items-center space-x-6 ">
              <div className="flex items-center space-x-2 ">
                <Phone className="h-4 w-4 text-green-400" />
                <span dir="ltr" className="text-sm">+2 (011) 401 44 322</span>
              </div>
              <div className="flex items-center space-x-2 ">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-sm">info@egypt-green.com</span>
              </div>
              <div className="flex items-center space-x-2 ">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-sm">{t('address')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
       <div className="w-full py-2 bg-[#072508]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          {/* Main powered by paragraph */}
          <p className="text-slate-300 text-sm flex items-center gap-2 flex-wrap justify-center">
            © 2025 Egypt Green. powered by{" "}
            <Image
              src="/white-logo.png"
              alt="Zed Agency Logo"
              width={50}
              height={50}
              className="object-contain mx-1"
            />
            {locale === "en" ? "All rights reserved." : "كل الحقوق محفوظة."}
          </p>

          {/* Additional branding */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-slate-400 text-xs">
              {locale === "en" ? "Crafted with excellence by" : "صُنع بإتقان من قبل"}{" "}
              <a href="https://ze-dev.com" target="_blank" className="text-orange-300 hover:text-orange-400 transition-colors font-medium">
                ze-dev.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </footer>
  )
}
