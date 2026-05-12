'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, User, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/useAuth'
import VillaLogo from '@/components/VillaLogo'

const links = [
  { label: 'Experience', href: '/#experience' },
  { label: 'Rooms',      href: '/#rooms' },
  { label: 'About',      href: '/#about' },
  { label: 'Gallery',    href: '/#gallery' },
]

const HIDDEN_ON = ['/login', '/register', '/admin']

export function Navbar() {
  const pathname = usePathname()
  const router   = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { user } = useAuth()

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const hidden = HIDDEN_ON.some(p => pathname.startsWith(p))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (hidden) return null

  return (
    <header className={cn(
      'fixed top-0 inset-x-0 z-50 transition-all duration-700',
      scrolled
        ? 'bg-ivory/80 backdrop-blur-md shadow-sm border-b border-sand-100/60'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" aria-label="Villa Galle home">
          {scrolled ? (
            <VillaLogo color="#1A4480" textColor="#0F2340" subColor="#5B82B8" size={40} />
          ) : (
            <VillaLogo color="#FFFFFF" textColor="#FFFFFF" subColor="#ADBFDF" size={40} />
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'text-base font-bold tracking-[0.2em] uppercase relative pb-0.5',
                'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:transition-all after:duration-500',
                scrolled
                  ? 'text-stone-600 hover:text-stone-900 after:bg-sand-500'
                  : 'text-ivory/75 hover:text-ivory after:bg-sand-300',
                pathname === l.href && (scrolled ? 'text-stone-900 after:w-full' : 'text-ivory after:w-full')
              )}
            >
              {l.label}
            </Link>
          ))}

          <a
            href="/#contact"
            className={cn(
              'px-8 py-3 rounded-full text-base font-bold tracking-[0.2em] uppercase transition-all duration-500',
              scrolled
                ? 'bg-sand-600 text-ivory hover:bg-sand-700 shadow-sm hover:shadow-md'
                : 'border border-ivory/50 text-ivory hover:bg-ivory hover:text-stone-900'
            )}
          >
            Contact Us
          </a>

          {user ? (
            <button
              onClick={logout}
              aria-label="Sign out"
              className={cn(
                'transition-colors duration-300',
                scrolled ? 'text-stone-500 hover:text-red-400' : 'text-ivory/70 hover:text-ivory'
              )}
            >
              <LogOut size={15} />
            </button>
          ) : (
            <Link
              href="/login"
              className={cn(
                'flex items-center gap-1.5 text-base font-bold tracking-[0.2em] uppercase transition-colors duration-300',
                scrolled ? 'text-stone-500 hover:text-sand-600' : 'text-ivory/70 hover:text-ivory'
              )}
            >
              <User size={16} /> Login
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          className={cn('md:hidden p-2 transition-colors duration-300', scrolled ? 'text-stone-800' : 'text-ivory')}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        'md:hidden bg-ivory/95 backdrop-blur-md border-t border-sand-100 overflow-hidden transition-all duration-500',
        open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      )}>
        <nav className="flex flex-col px-8 py-8 gap-6">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-lg font-bold text-stone-700 tracking-[0.2em] uppercase hover:text-sand-600 transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => { setOpen(false); logout(); }}
              className="text-left text-red-400 tracking-[0.2em] uppercase text-lg font-bold hover:text-red-600 transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="text-stone-700 tracking-[0.2em] uppercase text-lg font-bold hover:text-sand-600 transition-colors">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
