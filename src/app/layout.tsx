import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { NavigationStateProvider } from "@/providers/navigation-provider";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { layoutConfig } from "@/config/layout";
import { LazyChatbot } from "@/components/chat/LazyChatbot";
import { LeadModals } from "@/components/layout/LeadModals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cortexitsolution.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F17" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cortex IT Solution | Enterprise Engineering Partner",
    template: "%s | Cortex IT Solution",
  },
  description: "Enterprise software engineering, AI solutions, cloud architecture, and full-lifecycle digital transformation partner for global enterprises.",
  keywords: [
    "Enterprise Software",
    "AI Transformation",
    "Cloud Architecture",
    "Full-Stack Development",
    "DevOps",
    "Digital Transformation",
    "Cortex IT Solution"
  ],
  authors: [{ name: "Cortex IT Solution Engineering Team", url: siteUrl }],
  creator: "Cortex IT Solution",
  publisher: "Cortex IT Solution",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cortex IT Solution | Enterprise Engineering Partner",
    description: "Enterprise software engineering, AI solutions, cloud architecture, and digital transformation.",
    url: siteUrl,
    siteName: "Cortex IT Solution",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cortex IT Solution - Enterprise Engineering Partner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cortex IT Solution | Enterprise Engineering Partner",
    description: "Enterprise software engineering, AI solutions, cloud architecture, and digital transformation.",
    images: ["/og-image.jpg"],
    creator: "@cortexitsolution",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <NavigationStateProvider>
              {layoutConfig.showAnnouncementBar && (
                <div className="w-full bg-primary text-primary-foreground text-center text-sm py-2">
                  Announcement Slot
                </div>
              )}
              <Header />
              <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none">{children}</main>
              <Footer />
              <LazyChatbot />
              <LeadModals />
            </NavigationStateProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

