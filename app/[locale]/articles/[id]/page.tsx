"use client"
import { useParams } from "next/navigation"
import { useGetArticleQuery } from "@/redux/features/articlesApi"
import { useLocale } from "next-intl"
import Image from "next/image"
import { CustomBreadcrumb } from "@/components/breadCrump"
import { Calendar, User, Tag, Clock, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentUrl } from "@/hooks/use-current-url"
import { SharePopup } from "@/components/Article/share-popup"

const SingleArticlePage = () => {
  const { id } = useParams()
  const locale = useLocale()
  const { data, isLoading, error } = useGetArticleQuery(String(id))
  const currentUrl = useCurrentUrl()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-44 max-w-4xl">
        <div className="space-y-6">
          <Skeleton className="h-4 w-64" />
          <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-8 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data?.data) {
    return (
      <div className="container mx-auto px-4 py-44 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Article Not Found</h2>
          <p className="text-gray-600">The article you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const article = data.data.article
  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString(locale === "ar" ? "ar-EG" : locale === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-44 max-w-4xl">
        <CustomBreadcrumb
          items={[
            {
              label: locale === "ar" ? "المقالات" : locale === "fr" ? "Articles" : "Articles",
              href: "/articles",
            },
            {
              label: article.title?.[locale] || "Article",
              href: `/articles/${id}`,
            },
          ]}
        />

        <article className="bg-white rounded-2xl shadow-sm border overflow-hidden mt-6">
          {/* Hero Image */}
          {article.imageUrl && (
            <div className="relative h-80 md:h-96 w-full">
              <Image
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title?.[locale] || "Article Image"}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Article Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                {article.title?.[locale]}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                {article.category?.[locale] && (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                    <Tag className="w-3 h-3 mr-1" />
                    {article.category[locale]}
                  </Badge>
                )}

                {article.author?.[locale] && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">
                      {locale === "ar" ? "بواسطة" : locale === "fr" ? "Par" : "By"} {article.author[locale]}
                    </span>
                  </div>
                )}

                {formattedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formattedDate}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{locale === "ar" ? "5 دقائق قراءة" : locale === "fr" ? "5 min de lecture" : "5 min read"}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <SharePopup
                  url={currentUrl}
                  title={article.title?.[locale] || ""}
                  description={article.content?.[locale]?.replace(/<[^>]*>/g, "").substring(0, 160) || ""}
                  locale={locale}
                />
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Bookmark className="w-4 h-4" />
                  {locale === "ar" ? "حفظ" : locale === "fr" ? "Sauvegarder" : "Save"}
                </Button>
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
              dangerouslySetInnerHTML={{ __html: article.content?.[locale] || "" }}
            />
          </div>
        </article>

        {/* Related Articles Section Placeholder */}
        {/* <div className="mt-12 bg-white rounded-2xl shadow-sm border p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {locale === "ar" ? "مقالات ذات صلة" : locale === "fr" ? "Articles connexes" : "Related Articles"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>
                <h4 className="font-medium text-gray-900 mb-2">Sample Related Article {i}</h4>
                <p className="text-sm text-gray-600">Brief description of the related article...</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default SingleArticlePage
