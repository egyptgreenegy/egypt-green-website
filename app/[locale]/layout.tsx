import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Rubik } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import { Suspense } from "react";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import ReduxProvider from "@/providers/redux-provider";
import { Toaster } from "sonner";

const ibm = IBM_Plex_Sans_Arabic({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Egypt Green | Sustainable Agriculture & Fertilizers",
  description:
    "Egypt Green is a leading provider of agricultural solutions, specializing in sustainable farming, advanced irrigation systems, and eco-friendly fertilizers. Empowering farmers with innovation and expertise across Egypt and beyond.",
  keywords: [
    "Egypt Green",
    "Green Egypt",
    "Fertilizers",
    "ZED",
    "Agriculture",
    "Sustainable Farming",
    "Fertilizers",
    "Eco-friendly farming",
    "Smart Irrigation",
    "ايجبت جرين",
    "زراعة مستدامة",
    "تسميد",
    "الري الحديث",
  ],
  icons: {
    icon: "/logo-trans.png",
    apple: "/logo-trans.png",
  },
  openGraph: {
    title: "Egypt Green | Sustainable Agriculture & Fertilizers",
    description:
      "Explore Egypt Green's eco-friendly solutions for farming. From fertilizers to irrigation systems, we drive agricultural innovation in Egypt.",
    images: ["/og-image.jpg"],
    url: "https://www.egypt-green.com", // Replace with your actual domain
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Egypt Green",
    description:
      "Empowering sustainable agriculture in Egypt with innovative solutions and eco-friendly products.",
    images: ["/og-image.jpg"],
  },
  other:{
    "google-site-verification": "PSZWEdx72ILMCXN9hThn_BILgPWcAOXDIWhJ-jGJ8wY",
  }
};

export default async function RootLayout({
  children,
  params,
}: {
  params: Promise<{
    locale: Locale;
  }>;
  children: React.ReactNode;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      data-theme="light"
      className="min-h-full"
    >
      <body className={`${ibm.className} antialiased`}>
        {/* Google Ads (Google Tag Manager) */}
        <script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=AW-10803911582"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-10803911582');
            `,
          }}
        />
        
        <ReduxProvider>
          <Suspense>
            <NextIntlClientProvider messages={messages}>
              <Header />
              {children}
              <Footer />
              {/* Floating WhatsApp Button */}
              <a
                href="https://wa.me/201206533393" // TODO: Replace with actual WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                style={{
                  position: 'fixed',
                  right: '1.5rem',
                  bottom: '1.5rem',
                  zIndex: 1000,
                  borderRadius: '50%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  background: 'linear-gradient(135deg, #25D366 60%, #128C7E 100%)',
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'box-shadow 0.2s',
                }}
                className="hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {/* WhatsApp SVG Icon */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="none" />
                  <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.1 2.36 7.1L4 29l7.18-2.32C13.1 27.13 14.52 27.5 16 27.5c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.33 0-2.62-.26-3.8-.76l-.27-.12-4.27 1.38 1.4-4.13-.18-.28C7.26 18.6 7 17.32 7 16c0-5.06 4.13-9.18 9.18-9.18 5.06 0 9.18 4.13 9.18 9.18 0 5.06-4.13 9.18-9.18 9.18zm5.13-6.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3 0 1.35.99 2.66 1.13 2.85.14.18 1.95 2.98 4.74 4.06.66.23 1.18.37 1.58.47.66.16 1.26.14 1.74.08.53-.06 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" fill="#fff"/>
                </svg>
              </a>
            </NextIntlClientProvider>
          </Suspense>
        </ReduxProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
