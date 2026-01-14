"use client"
import React from "react"
import { useLocale } from "next-intl"
import { useTranslations } from "use-intl"
import { cn } from "@/lib/utils"
import ProductCard from "./ProductCard"
import { CustomBreadcrumb } from "../breadCrump"
import { useGetProductsQuery } from "@/redux/features/productApi"
import { useGetCategoriesQuery } from "@/redux/features/categoryApi"

const Products = () => {
  const locale = useLocale()
  const t = useTranslations("Products")
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null)
  const [currentPage, setCurrentPage] = React.useState<number>(1)

  // 👇 Clean query object, causes automatic re-fetching on param change
  let queryArgs = {
    params: {
      page: currentPage,
      limit:10,
    ...(selectedCategory?._id ? { category: selectedCategory._id } : {}),
    },
  }


  const { data: products, isLoading: isProductsLoading} = useGetProductsQuery(queryArgs)
  const { data: categories } = useGetCategoriesQuery()

  // Sync local state with API response
  React.useEffect(() => {
    if (products?.data?.pagination?.currentPage && products.data.pagination.currentPage !== currentPage) {
      setCurrentPage(products.data.pagination.currentPage)
    }
  }, [products?.data?.pagination?.currentPage, currentPage])

  const changeSelectedCategory = (category: any) => {
    if (selectedCategory?._id === category._id) return
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderPaginationButtons = () => {
    if (!products?.data?.pagination) return null

    const { currentPage: apiCurrentPage, totalPages } = products.data.pagination
    const pageNumbers = []

    pageNumbers.push(1)
    let startPage = Math.max(2, apiCurrentPage - 1)
    let endPage = Math.min(totalPages - 1, apiCurrentPage + 1)

    if (startPage > 2) pageNumbers.push("...")
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i)
    if (endPage < totalPages - 1) pageNumbers.push("...")
    if (totalPages > 1) pageNumbers.push(totalPages)

    return pageNumbers.map((page, index) =>
      page === "..." ? (
        <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
      ) : (
        <button
          key={`page-${page}`}
          onClick={() => handlePageChange(Number(page))}
          className={cn(
            "px-3 py-1 rounded border",
            apiCurrentPage === page
              ? "bg-green-700 text-white border-green-700"
              : "border-gray-300 hover:bg-gray-100"
          )}
        >
          {page}
        </button>
      )
    )
  }

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="mt-[120px] sm:mt-[150px] md:mt-[180px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-52"
    >
      <div className="w-full">
        <CustomBreadcrumb
          items={[
            { label: locale === "ar" ? "الرئيسيه" : "Home", href: "/" },
            { label: locale === "ar" ? "المنتجات" : "Products", href: "/products" },
          ]}
        />

        {/* Enhanced Page Header with SEO */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl my-3 font-semibold text-gray-900">
            {t("pageTitle")}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {t("pageSubtitle")}
          </p>
          {products?.data?.products && (
            <p className="text-sm text-gray-500">
              {products.data.products.length} {t("productsCount")}
            </p>
          )}
        </header>

        <div className="flex flex-col lg:flex-row my-5 md:my-8 lg:my-10 gap-4 md:gap-6">
          {/* Enhanced Sidebar with proper semantic HTML */}
          <aside className="w-full lg:w-1/4 bg-slate-50 p-3 sm:p-4 md:p-5 border border-slate-300 rounded-md" role="complementary" aria-label="Product filters">
            <nav aria-label="Product categories">
              <h2 className="font-semibold text-lg mb-4">{t("categories")}</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => {
                    setSelectedCategory(null)
                    setCurrentPage(1)
                  }}
                  className={cn(
                    "px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors",
                    !selectedCategory ? "bg-green-700 text-white" : ""
                  )}
                  aria-pressed={!selectedCategory}
                >
                  {t("allCategories")}
                </button>

                {categories?.data?.categories.map((item: any) => (
                  <button
                    key={item._id}
                    onClick={() => changeSelectedCategory(item)}
                    className={cn(
                      "px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border border-slate-300 bg-white hover:bg-slate-50 hover:text-gray-700 transition-colors",
                      selectedCategory?._id === item._id ? "bg-green-700 text-white" : ""
                    )}
                    aria-pressed={selectedCategory?._id === item._id}
                  >
                    {item.name[locale]}
                  </button>
                ))}
              </div>
            </nav>
          </aside>

          {/* Enhanced Product Grid with proper semantic HTML */}
          <main className="w-full lg:w-3/4 bg-white h-full p-2 sm:p-3 md:p-4 rounded-md" role="main" aria-label="Product catalog">
            {isProductsLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">{t("loadingText")}</p>
              </div>
            ) : (
              <>
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-7" aria-label="Products grid">
                  {products?.data?.products?.map((product: any) => (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      name={product.name}
                      image={product.image}
                      category={product.category.name[locale]}
                    />
                  ))}

                  {products?.data?.products?.length === 0 && (
                    <div className="col-span-full text-center py-6 sm:py-8 md:py-10">
                      <p className="text-gray-500 text-base md:text-lg">
                        {t("noProductsFound")}
                      </p>
                    </div>
                  )}
                </section>

                {/* Enhanced Pagination with accessibility */}
                {products?.data?.pagination && products.data.pagination.totalPages > 0 && (
                  <nav aria-label="Products pagination" className="flex justify-center items-center mt-8 gap-2">
                    <button
                      onClick={() => handlePageChange(Math.max(1, products.data.pagination.currentPage - 1))}
                      disabled={products.data.pagination.currentPage === 1}
                      className={cn(
                        "px-3 py-1 rounded border border-gray-300",
                        products.data.pagination.currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                      )}
                      aria-label="Go to previous page"
                    >
                      {locale === "ar" ? "السابق" : locale === "fr" ? "Précédent" : "Previous"}
                    </button>

                    <div className="flex gap-1" role="group" aria-label="Page numbers">
                      {renderPaginationButtons()}
                    </div>

                    <button
                      onClick={() =>
                        handlePageChange(Math.min(products.data.pagination.totalPages, products.data.pagination.currentPage + 1))
                      }
                      disabled={products.data.pagination.currentPage === products.data.pagination.totalPages}
                      className={cn(
                        "px-3 py-1 rounded border border-gray-300",
                        products.data.pagination.currentPage === products.data.pagination.totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      )}
                      aria-label="Go to next page"
                    >
                      {locale === "ar" ? "التالي" : locale === "fr" ? "Suivant" : "Next"}
                    </button>
                  </nav>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Products
