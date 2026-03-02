import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { Public_Sans } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saber.co"
const siteDescription =
  "Saber is your OpenClaw implementation partner, deploying operators in your own infrastructure for calls, chat, workflows, browser actions, and human approvals."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Saber | OpenClaw Implementation Partner",
    template: "%s | Saber",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Saber",
    title: "Saber | OpenClaw Implementation Partner",
    description: siteDescription,
    images: [
      {
        url: "/webrenew-icon-xl.png",
        width: 1200,
        height: 1200,
        alt: "Saber",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saber | OpenClaw Implementation Partner",
    description: siteDescription,
    images: ["/webrenew-icon-xl.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Saber",
    url: siteUrl,
    logo: `${siteUrl}/webrenew-icon-xl.png`,
    description: siteDescription,
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${publicSans.variable} ${spaceGrotesk.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
