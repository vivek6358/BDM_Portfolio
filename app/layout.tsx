import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { PERSONAL_INFO } from "@/data/portfolioData";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050706",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vivekbandari.com"),
  title: "Vivek Bandari | Business Development Manager | Outsourcing & Strategic Partnerships",
  description:
    "Vivek Bandari is a Business Development Manager at Alboriss, focused on outsourcing, strategic partnerships and connecting businesses with technology and operational capabilities.",
  keywords: [
    "Vivek Bandari",
    "Business Development Manager",
    "Outsourcing",
    "Strategic Partnerships",
    "Alboriss Pvt Ltd",
    "Hyderabad",
    "IT Outsourcing",
    "Healthcare BPO",
    "Banking Operations",
    "AI Data Annotation",
    "Digitalization",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: PERSONAL_INFO.personalLinkedin }],
  creator: PERSONAL_INFO.name,
  publisher: "Alboriss Pvt. Ltd.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vivekbandari.com",
    siteName: "Vivek Bandari Portfolio",
    title: "Vivek Bandari | Business Development Manager | Outsourcing & Strategic Partnerships",
    description:
      "Turning Business Requirements Into Scalable Outsourcing Solutions. BDM at Alboriss Pvt. Ltd.",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Vivek Bandari - Business Development Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Bandari | Business Development Manager | Outsourcing & Strategic Partnerships",
    description:
      "Turning Business Requirements Into Scalable Outsourcing Solutions. BDM at Alboriss Pvt. Ltd.",
    images: ["/og-preview.png"],
  },
  alternates: {
    canonical: "https://vivekbandari.com",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://vivekbandari.com/#person",
        name: PERSONAL_INFO.name,
        jobTitle: "Business Development Manager",
        worksFor: {
          "@type": "Organization",
          name: PERSONAL_INFO.company,
          url: PERSONAL_INFO.companyWebsite,
          address: {
            "@type": "PostalAddress",
            streetAddress: PERSONAL_INFO.officeAddress,
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            postalCode: "500032",
            addressCountry: "IN",
          },
        },
        email: PERSONAL_INFO.email,
        telephone: PERSONAL_INFO.phone,
        url: "https://vivekbandari.com",
        sameAs: [
          PERSONAL_INFO.personalLinkedin,
          PERSONAL_INFO.companyLinkedin,
        ],
        description:
          "Business Development Manager at Alboriss, helping organizations discover the right technology, operational and outsourcing capabilities for their business requirements.",
      },
      {
        "@type": "WebSite",
        "@id": "https://vivekbandari.com/#website",
        url: "https://vivekbandari.com",
        name: "Vivek Bandari Portfolio",
        publisher: {
          "@id": "https://vivekbandari.com/#person",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#050706] text-[#F4F7F5] font-sans antialiased selection:bg-[#00C878]/25 selection:text-[#F4F7F5]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
