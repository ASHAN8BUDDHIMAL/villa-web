import { headers } from 'next/headers'
import Footer from '@/components/Footer'

const HIDDEN_ON = ['/login', '/register', '/admin']

export default async function FooterServer() {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? headersList.get('x-invoke-path') ?? ''
  if (HIDDEN_ON.some(p => pathname.startsWith(p))) return null
  return <Footer />
}
