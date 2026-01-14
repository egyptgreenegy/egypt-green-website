"use client"
import { useParams } from "next/navigation"
import { useGetProductByIdQuery } from "@/redux/features/productApi"
import { useLocale } from "next-intl"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight, Package, AlertCircle } from "lucide-react"
import { CustomBreadcrumb } from "@/components/breadCrump"

const ProductDetails = () => {
  const { id } = useParams()
  const locale = useLocale()
  const { data, isLoading, error } = useGetProductByIdQuery(id)

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  if (error || !data?.data) {
    return <ErrorState />
  }

  const product = data.data.product

  return (
    <div className="min-h-screen my-36">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-6">
        <CustomBreadcrumb
          items={[
            { label: "Products", href: "/products" },
            { label: product.name?.[locale] || "Product", href: `/products/${id}` },
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="aspect-square relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg?height=500&width=500"}
                    alt={product.name?.[locale] || "Product Image"}
                    fill
                    className="object-contain p-8 transition-transform duration-300 hover:scale-105"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Information Section */}
          <div className="space-y-6">
            {/* Category Badge */}
            {product.category?.name?.[locale] && (
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-slate-500" />
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors px-3 py-1 text-sm font-medium"
                >
                  {product.category.name[locale]}
                </Badge>
              </div>
            )}

            {/* Product Title */}
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">{product.name?.[locale]}</h1>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
            </div>

            {/* Product Description */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  Product Details
                </h2>
                <div
                  className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-ul:text-slate-700 prose-ol:text-slate-700 prose-li:text-slate-700"
                  dangerouslySetInnerHTML={{
                    __html: product.description?.[locale] || "<p>No description available.</p>",
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading Skeleton Component
const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 pt-6">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center space-x-2 mb-6">
          <Skeleton className="h-4 w-16" />
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Skeleton */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <Skeleton className="aspect-square w-full rounded-2xl" />
              </CardContent>
            </Card>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-slate-300" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-1 w-20 rounded-full" />
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-slate-300 rounded-full"></div>
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Error State Component
const ErrorState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm max-w-md mx-4">
        <CardContent className="p-8 text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
            <p className="text-slate-600">
              We couldn't find the product you're looking for. It may have been removed or doesn't exist.
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go Back
          </button>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductDetails
