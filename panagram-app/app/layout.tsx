// app/layout.tsx
import { Providers } from '../lib/providers'
import './globals.css'

export const metadata = {
  title: 'Panagram App',
  description: 'Zero-knowledge proof panagram game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}