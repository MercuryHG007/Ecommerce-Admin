import type { Metadata } from 'next'
import { Oxygen } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'

import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'

const forum = Oxygen({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Mercury CMS Dashboard',
  description: 'A CMS Dashboard by Mercury',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={forum.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
          >
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
