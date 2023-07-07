import './globals.css'
import type { Metadata } from 'next'
import { Oxygen } from 'next/font/google'

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
    <html lang="en">
      <body className={forum.className}>{children}</body>
    </html>
  )
}
