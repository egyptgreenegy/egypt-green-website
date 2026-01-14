"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button, buttonVariants } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Phone, MapPin, Menu, X, Globe, Facebook, Instagram, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/routing'
import { usePathname } from "next/navigation"
import LangDropdown from "../LangDropdown"

export default function Header() {
  const t = useTranslations('Header')
  const locale = useLocale() as string
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isRtl = locale === 'ar'
  
  // Check if current page is home or about-us
  const isTransparentPage = pathname === '/' || 
                           pathname === '/about' || 
                           pathname === `/${locale}` || 
                           pathname === `/${locale}/about`||
                           pathname === `/${locale}/landing`


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "products", href: "/products" },
    { key: "articles", href: "/articles" },
    {key:'beAgent' , href:'/agent'},
    { key: "contact", href: "/contact" },
  ]

  const changeLanguage = (newLocale: string) => {
    // Extract the path without the locale prefix
    // The pathname from next/navigation includes the locale prefix if using i18n
    let path = pathname || '/'
    
    // If the path includes the current locale, remove it to get the raw path
    if (path.startsWith(`/${locale}/`)) {
      path = path.substring(`/${locale}/`.length) || '/'
    } else if (path === `/${locale}`) {
      path = '/'
    }
    
    router.replace(path, { locale: newLocale })
  }

  return (
    <header>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/95 backdrop-blur-sm shadow-md py-2" 
            : isTransparentPage 
              ? "bg-transparent py-2" 
              : "bg-white py-2 shadow-md"
        )}
      >
        {/* Top bar with contact info and social media */}
        <div className={cn(
          "hidden lg:block border-b transition-all text-sm",
          isScrolled ? "border-gray-200" : 
          isTransparentPage ? "border-white/20" : "border-gray-200"
        )}>
          {!isScrolled && (
            <div className="container mx-auto px-4">
            <div className="flex justify-between items-center pb-0 min-h-[28px]">
              <div className="flex items-center space-x-5 ">
                <div className="flex items-center space-x-1 ">
                  <Phone className={cn("h-4 w-4", 
                    isScrolled ? "text-gray-600" : 
                    isTransparentPage ? "text-white" : "text-gray-600"
                  )} />
                  <span dir="ltr" className={cn("text-sm", 
                    isScrolled ? "text-gray-600" : 
                    isTransparentPage ? "text-white" : "text-gray-600"
                  )}>2 (011) 401 44 322</span>
                </div>
                <div className="flex items-center space-x-1 ">
                  <MapPin className={cn("h-4 w-4", 
                    isScrolled ? "text-gray-600" : 
                    isTransparentPage ? "text-white" : "text-gray-600"
                  )} />
                  <span className={cn("text-sm", 
                    isScrolled ? "text-gray-600" : 
                    isTransparentPage ? "text-white" : "text-gray-600"
                  )}>{t('address')}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link target="_blank" href="https://www.facebook.com/EGgreen.Agriculture" aria-label="Facebook">
                  <Facebook className={cn("h-4 w-4", 
                    isScrolled ? "text-gray-600 hover:text-green-700" : 
                    isTransparentPage ? "text-white hover:text-green-400" : "text-gray-600 hover:text-green-700"
                  )} />
                </Link>
                <Link href="https://www.instagram.com/egyptgreen.fert/#" target="_blank" aria-label="Instagram">
                  <Instagram className={cn("h-4 w-4", 
                    isScrolled ? "text-gray-600 hover:text-green-700" : 
                    isTransparentPage ? "text-white hover:text-green-400" : "text-gray-600 hover:text-green-700"
                  )} />
                </Link>
                <Link href="https://x.com/EgyptGreen_fert" aria-label="Twitter">
                  <Twitter className={cn("h-4 w-4", 
                    isScrolled ? "text-gray-600 hover:text-green-700" : 
                    isTransparentPage ? "text-white hover:text-green-400" : "text-gray-600 hover:text-green-700"
                  )} />
                </Link>
              </div>
            </div>
          </div>
          )}
        </div>

        {/* Main navigation */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 ">
              <div className="relative h-10 w-10 sm:h-8 sm:w-14 md:h-14 md:w-16 transition-all duration-300">
                <Image
                  loading="lazy" 
                  src="/egypt-logo.png" 
                  alt={t('logoAlt')} 
                  fill 
                  className="object-contain mt-1"
                />
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-5 ">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "font-medium text-sm lg:text-lg transition-colors py-1",
                    isRtl ? "font-arabic" : "",
                    pathname === item.href || pathname === `/${locale}${item.href}` || (item.href === "/" && pathname === `/${locale}`)
                      ? isScrolled ? "text-green-700" : 
                        isTransparentPage ? "text-green-400" : "text-green-700"
                      : isScrolled ? "text-gray-800 hover:text-green-700" : 
                        isTransparentPage ? "text-white hover:text-green-400" : "text-gray-800 hover:text-green-700"
                  )}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </div>

            {/* Language selector and CTA button */}
            <div className="hidden md:flex items-center space-x-2 ">
            <LangDropdown/>

              <a
              
                href="/English%20Egypt%20Green%20FINAL.pdf"
                download="Egypt Green Brochure.pdf"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  isScrolled
                    ? "bg-green-700 hover:bg-green-800 text-white"
                    : isTransparentPage
                      ? "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30"
                      : "bg-green-700 hover:bg-green-800 text-white"
                )}
              >
                {t('downloadBrochure')}
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={isScrolled ? "text-gray-800 p-1" : 
                          isTransparentPage ? "text-white p-1" : "text-gray-800 p-1"}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg text-sm">
            <div className="container mx-auto px-4 py-2">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "font-medium text-sm py-1 transition-colors",
                      isRtl ? "font-arabic" : "",
                      pathname === item.href || pathname === `/${locale}${item.href}` || (item.href === "/" && pathname === `/${locale}`)
                        ? "text-green-700"
                        : "text-gray-800 hover:text-green-700"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                ))}
                
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <LangDropdown/>
                    
                    <Link
                      href="/English%20Egypt%20Green%20FINAL.pdf"
                      download={"Egypt Green Brochure"} 
                      className={cn(buttonVariants({
                        variant: "default",
                        size: "sm"
                      }),"bg-green-700 hover:bg-green-800 text-white cursor-pointer")}
                    >
                      {t('downloadBrochure')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
