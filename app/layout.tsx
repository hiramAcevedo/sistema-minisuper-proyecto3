import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Chat from '@/components/ui/Chat'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MiniSuper - Tu tienda de confianza',
  description: 'Tienda en línea con amplia variedad de productos a precios accesibles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
        <div className="flex flex-col min-h-screen">
          <Navbar />
              <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <Chat />
        </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
} 