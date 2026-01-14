"use client";
import React from "react";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/routing";

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItemType[];
  homeHref?: string;
  showHomeIcon?: boolean;
  separator?: React.ReactNode;
  className?: string;
  lastItemAsTitle?: boolean;
  customTitle?: string;
  titleClassName?: string;
  textColor?: string; // New prop for text color
}

export function CustomBreadcrumb({
  items,
  homeHref = "/",
  showHomeIcon = true,
  separator = <ChevronLeft className="h-4 w-4" />,
  className,
  lastItemAsTitle = false,
  customTitle,
  titleClassName = "text-3xl font-semibold mt-2",
  textColor = "text-gray-600", // Default color
}: BreadcrumbsProps) {
  // Create a copy of items to avoid modifying the original array
  const breadcrumbItems = [...items];
  const lastItem =
    breadcrumbItems.length > 0
      ? breadcrumbItems[breadcrumbItems.length - 1]
      : null;

  // If lastItemAsTitle is true and there's no customTitle, remove the last item from breadcrumbs
  if (lastItemAsTitle && !customTitle && lastItem) {
    breadcrumbItems.pop();
  }

  return (
    <div>
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {showHomeIcon && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={homeHref} className={textColor}>
                    <Home className={`h-4 w-4 ${textColor}`} />
                    <span className="sr-only">Home</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <span className={textColor}>{separator}</span>
              </BreadcrumbSeparator>
            </>
          )}

          {breadcrumbItems.map((item, index) => {
            const isLastItem = index === breadcrumbItems.length - 1;

            return (
              <React.Fragment key={item.label}>
                <BreadcrumbItem>
                  {isLastItem ? (
                    <BreadcrumbPage className={`text-xl ${textColor}`}>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link className={`text-xl ${textColor}`} href={item.href || "#"}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {!isLastItem && (
                  <BreadcrumbSeparator>
                    <span className={textColor}>{separator}</span>
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Display title if lastItemAsTitle is true or customTitle is provided */}
      {((lastItemAsTitle && lastItem) || customTitle) && (
        <h1 className={titleClassName}>{customTitle || lastItem?.label}</h1>
      )}
    </div>
  );
}
