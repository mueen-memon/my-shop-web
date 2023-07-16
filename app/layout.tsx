import Nav from './components/Nav'
import './globals.css'
import { Inter, Roboto } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Hydrate from './components/Hydrate'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto( { weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'My Shop',
  description: 'eCommerce website',
  author: 'mueen.memon',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={`${roboto.className} my-4 mx-16 lg:mx-32`}>
        <Hydrate >
          <Nav user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
      </body>
    </html>
  )
}
