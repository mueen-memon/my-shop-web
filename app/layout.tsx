import Nav from './components/Nav'
import './globals.css'
import { Inter, Roboto, Lobster_Two } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Hydrate from './components/Hydrate'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' })
const lobster = Lobster_Two({ weight: "700" , subsets: ['latin'], variable: '--font-lobster'}, )

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
    <html className={`${roboto.variable} ${lobster.variable}`} lang="en" >
      <Hydrate >
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </Hydrate>
    </html>
  )
}
