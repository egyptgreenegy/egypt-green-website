"use client"

import type React from "react"
import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, TrendingUp, Award, Send, CheckCircle, DollarSign, MapPin, Briefcase, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { CustomBreadcrumb } from "@/components/breadCrump"

export default function BeAgentPage() {
  const language = useLocale() as string
  const t = useTranslations()
  const isRtl = language === "ar"

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    companyName: "",
    country: "",
    website: "",
    experience: "",
    hasDistributionExperience: "",
    message: "",
    agreeTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        whatsapp: "",
        companyName: "",
        country: "",
        website: "",
        experience: "",
        hasDistributionExperience: "",
        message: "",
        agreeTerms: false,
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  const benefits = [
    {
      icon: DollarSign,
      title: t("BeAgent.benefits.products.title"),
      description: t("BeAgent.benefits.products.description"),
    },
    {
      icon: TrendingUp,
      title: t("BeAgent.benefits.experience.title"),
      description: t("BeAgent.benefits.experience.description"),
    },
    {
      icon: Users,
      title: t("BeAgent.benefits.contacts.title"),
      description: t("BeAgent.benefits.contacts.description"),
    },
    {
      icon: Award,
      title: t("BeAgent.benefits.marketing.title"),
      description: t("BeAgent.benefits.marketing.description"),
    },
  ]

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
                className="text-white mb-5"
              >
                <CustomBreadcrumb
                  items={[
                    { label: t("Header.nav.home"), href: "/" },
                    { label: t("Header.nav.beAgent"), href: "/agent" },
                  ]}
                  titleClassName="text-white text-4xl"
                  className="text-white text-4xl"
                  textColor="text-white/80"
                />
              </motion.div>
              <motion.p
                className="text-lg text-white/90 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t("BeAgent.subtitle1")}
              </motion.p>
              <motion.p
                className="text-lg text-white/90 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t("BeAgent.subtitle2")}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-14 bg-gray-50">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                {t("BeAgent.whyChoose")}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t("BeAgent.whyChooseDescription")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                        <benefit.icon className="h-8 w-8 text-green-700" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-14">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Requirements */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6">
                    {t("BeAgent.requirements.title")}
                  </h2>

                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-green-100 p-3 rounded-full">
                            <Briefcase className="h-6 w-6 text-green-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">
                              {t("BeAgent.requirements.experience.title")}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {t("BeAgent.requirements.experience.description")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-green-100 p-3 rounded-full">
                            <Star className="h-6 w-6 text-green-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{t("BeAgent.requirements.skills.title")}</h3>
                            <p className="text-gray-600 text-sm">
                              {t("BeAgent.requirements.skills.description")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-green-100 p-3 rounded-full">
                            <MapPin className="h-6 w-6 text-green-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{t("BeAgent.requirements.location.title")}</h3>
                            <p className="text-gray-600 text-sm">
                              {t("BeAgent.requirements.location.description")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>

              {/* Application Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6">{t("BeAgent.form.title")}</h2>

                  <Card>
                    <CardContent className="p-6">
                      {submitSuccess ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          {t("BeAgent.form.successMessage")}
                        </div>
                      ) : null}

                      <form onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="mb-4">
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("BeAgent.form.fullName.label")}
                          </label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder={t("BeAgent.form.fullName.placeholder")}
                          />
                        </div>

                        {/* Email and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              {t("BeAgent.form.email.label")}
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder={t("BeAgent.form.email.placeholder")}
                            />
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              {t("BeAgent.form.phone.label")}
                            </label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              placeholder={t("BeAgent.form.phone.placeholder")}
                            />
                          </div>
                        </div>

                        {/* WhatsApp and Company Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                              {t("BeAgent.form.whatsapp.label")}
                            </label>
                            <Input
                              id="whatsapp"
                              name="whatsapp"
                              value={formData.whatsapp}
                              onChange={handleChange}
                              placeholder={t("BeAgent.form.whatsapp.placeholder")}
                            />
                          </div>

                          <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                              {t("BeAgent.form.companyName.label")}
                            </label>
                            <Input
                              id="companyName"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                              placeholder={t("BeAgent.form.companyName.placeholder")}
                            />
                          </div>
                        </div>

                        {/* Country */}
                        <div className="mb-4">
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("BeAgent.form.country.label")}
                          </label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t("BeAgent.form.country.placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="egypt">مصر / Egypt</SelectItem>
                              <SelectItem value="saudi">السعودية / Saudi Arabia</SelectItem>
                              <SelectItem value="uae">الإمارات / UAE</SelectItem>
                              <SelectItem value="jordan">الأردن / Jordan</SelectItem>
                              <SelectItem value="lebanon">لبنان / Lebanon</SelectItem>
                              <SelectItem value="morocco">المغرب / Morocco</SelectItem>
                              <SelectItem value="tunisia">تونس / Tunisia</SelectItem>
                              <SelectItem value="algeria">الجزائر / Algeria</SelectItem>
                              <SelectItem value="other">أخرى / Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Website */}
                        <div className="mb-4">
                          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("BeAgent.form.website.label")}
                          </label>
                          <Input
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder={t("BeAgent.form.website.placeholder")}
                          />
                        </div>

                        {/* Experience */}
                        <div className="mb-4">
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("BeAgent.form.experience.label")}
                          </label>
                          <Select
                            value={formData.experience}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t("BeAgent.form.experience.placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">{t("BeAgent.form.experience.options.none")}</SelectItem>
                              <SelectItem value="1-2">{t("BeAgent.form.experience.options.1-2")}</SelectItem>
                              <SelectItem value="3-5">{t("BeAgent.form.experience.options.3-5")}</SelectItem>
                              <SelectItem value="6-10">{t("BeAgent.form.experience.options.6-10")}</SelectItem>
                              <SelectItem value="10plus">{t("BeAgent.form.experience.options.10plus")}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Distribution Experience */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            {t("BeAgent.form.hasDistributionExperience.label")}
                          </label>
                          <div className="flex gap-6">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="hasDistributionYes"
                                name="hasDistributionExperience"
                                value="yes"
                                checked={formData.hasDistributionExperience === "yes"}
                                onChange={handleChange}
                                className="text-green-700 focus:ring-green-700"
                              />
                              <label htmlFor="hasDistributionYes" className="text-sm text-gray-700">
                                {t("BeAgent.form.hasDistributionExperience.yes")}
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="hasDistributionNo"
                                name="hasDistributionExperience"
                                value="no"
                                checked={formData.hasDistributionExperience === "no"}
                                onChange={handleChange}
                                className="text-green-700 focus:ring-green-700"
                              />
                              <label htmlFor="hasDistributionNo" className="text-sm text-gray-700">
                                {t("BeAgent.form.hasDistributionExperience.no")}
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        <div className="mb-4">
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("BeAgent.form.message.label")}
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            placeholder={t("BeAgent.form.message.placeholder")}
                          />
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="agreeTerms"
                              name="agreeTerms"
                              checked={formData.agreeTerms}
                              onCheckedChange={(checked) =>
                                setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                              }
                              required
                            />
                            <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                              {t("BeAgent.form.agreeTerms")}
                            </label>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-green-700 hover:bg-green-800"
                          disabled={isSubmitting || !formData.agreeTerms}
                        >
                          {isSubmitting
                            ? t("BeAgent.form.submitting")
                            : t("BeAgent.form.submit")}
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

        {/* Statistics Section */}
        <section className="py-14 bg-green-700 text-white">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-green-100">{t("BeAgent.stats.activeAgents")}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-green-100">{t("BeAgent.stats.salesCompleted")}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-green-100">{t("BeAgent.stats.clientSatisfaction")}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-green-100">{t("BeAgent.stats.yearsExperience")}</div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
