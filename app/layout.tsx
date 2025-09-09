import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { AIChatbot } from "@/components/ai-chatbot"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "FoodieAI - Smart Food Delivery",
  description: "AI-powered food delivery platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <CartProvider>
            {children}
            <AIChatbot />
          </CartProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
