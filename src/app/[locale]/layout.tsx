import type { Metadata } from 'next'
import '../globals.css'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { AuthProvider } from '../context/authContext'
import { RecipesProvider } from '../context/recipesContext'

export const metadata: Metadata = {
  title: 'Sa nostra cuina',
  description: 'Recipes of a Mallorquin family'
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <AuthProvider>
            <RecipesProvider>{children}</RecipesProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
