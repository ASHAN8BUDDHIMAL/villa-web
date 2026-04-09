'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Rooms',   href: '/rooms' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const HIDDEN_ON = ['/login', '/register', '/admin']

export function Navbar() {
  const pathname  = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  const hidden = HIDDEN_ON.some(p => pathname.startsWith(p))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (hidden) return null

  return (
    <header className={cn(
      'fixed top-0 inset-x-0 z-50 transition-all duration-500',
      scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-sand-100' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className={cn('font-display text-2xl tracking-wide transition-colors duration-300', scrolled ? 'text-stone-900' : 'text-ivory')}>
            Villa Galle
          </span>
          <span className={cn('font-mono text-[10px] tracking-[0.25em] uppercase transition-colors duration-300', scrolled ? 'text-sand-500' : 'text-sand-200')}>
            Southern Coast · Sri Lanka
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'text-sm tracking-widest uppercase relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-sand-400 after:transition-all after:duration-300 hover:after:w-full transition-colors duration-300',
                scrolled ? 'text-stone-700 hover:text-sand-700' : 'text-ivory/80 hover:text-ivory'
              )}
            >
              {l.label}
            </Link>
          ))}

          {/* Login icon */}
          <Link
            href="/login"
            aria-label="Sign in"
            className={cn('transition-colors duration-300', scrolled ? 'text-stone-600 hover:text-sand-700' : 'text-ivory/80 hover:text-ivory')}
          >
            <User size={18} />
          </Link>

          <Link
            href="/book"
            className={cn(
              'ml-2 px-6 py-2.5 text-xs tracking-widest uppercase font-medium border transition-all duration-300',
              scrolled
                ? 'border-sand-600 text-sand-700 hover:bg-sand-600 hover:text-ivory'
                : 'border-ivory/60 text-ivory hover:bg-ivory hover:text-stone-900'
            )}
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          className={cn('md:hidden p-2 transition-colors', scrolled ? 'text-stone-800' : 'text-ivory')}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        'md:hidden bg-ivory border-t border-sand-100 overflow-hidden transition-all duration-500',
        open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      )}>
        <nav className="flex flex-col px-6 py-6 gap-5">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-stone-700 tracking-widest uppercase text-sm hover:text-sand-600 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="text-stone-700 tracking-widest uppercase text-sm hover:text-sand-600 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="text-stone-700 tracking-widest uppercase text-sm hover:text-sand-600 transition-colors"
          >
            Register
          </Link>
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="mt-2 text-center px-6 py-3 bg-sand-600 text-ivory text-xs tracking-widest uppercase font-medium hover:bg-sand-700 transition-colors"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  )
}
