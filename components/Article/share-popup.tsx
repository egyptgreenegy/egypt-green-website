"use client"
import { useState } from "react"
import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Share2, Twitter, Facebook, Linkedin, Link, Check, Copy } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface SharePopupProps {
  url: string
  title: string
  description?: string
  trigger?: React.ReactNode
  locale?: string
}

export function SharePopup({ url, title, description = "", trigger, locale = "en" }: SharePopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareData = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: locale === "ar" ? "تم النسخ!" : locale === "fr" ? "Copié!" : "Copied!",
        description:
          locale === "ar"
            ? "تم نسخ الرابط إلى الحافظة"
            : locale === "fr"
              ? "Lien copié dans le presse-papiers"
              : "Link copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: locale === "ar" ? "خطأ" : locale === "fr" ? "Erreur" : "Error",
        description:
          locale === "ar" ? "فشل في نسخ الرابط" : locale === "fr" ? "Échec de la copie du lien" : "Failed to copy link",
        variant: "destructive",
      })
    }
  }

  const handleSocialShare = (platform: string) => {
    window.open(shareData[platform as keyof typeof shareData], "_blank", "width=600,height=400")
    setIsOpen(false)
  }

  const getLocalizedText = (key: string) => {
    const texts = {
      shareArticle: {
        ar: "مشاركة المقال",
        fr: "Partager l'article",
        en: "Share Article",
      },
      shareOn: {
        ar: "مشاركة على",
        fr: "Partager sur",
        en: "Share on",
      },
      copyLink: {
        ar: "نسخ الرابط",
        fr: "Copier le lien",
        en: "Copy Link",
      },
      linkCopied: {
        ar: "تم النسخ",
        fr: "Copié",
        en: "Copied",
      },
    }
    return (
      texts[key as keyof typeof texts][locale as keyof typeof texts.shareArticle] || texts[key as keyof typeof texts].en
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            {getLocalizedText("shareArticle")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            {getLocalizedText("shareArticle")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Social Media Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 hover:bg-blue-50 hover:border-blue-200 transition-colors bg-transparent"
              onClick={() => handleSocialShare("twitter")}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Twitter className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="font-medium">{getLocalizedText("shareOn")} Twitter</span>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 hover:bg-blue-50 hover:border-blue-200 transition-colors bg-transparent"
              onClick={() => handleSocialShare("facebook")}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Facebook className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="font-medium">{getLocalizedText("shareOn")} Facebook</span>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 hover:bg-blue-50 hover:border-blue-200 transition-colors bg-transparent"
              onClick={() => handleSocialShare("linkedin")}
            >
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                <Linkedin className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="font-medium">{getLocalizedText("shareOn")} LinkedIn</span>
            </Button>
          </div>

          {/* Copy Link Section */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Link className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
              />
              <Button
                size="sm"
                variant={copied ? "default" : "outline"}
                onClick={handleCopyToClipboard}
                className="flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    {getLocalizedText("linkCopied")}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    {getLocalizedText("copyLink")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
