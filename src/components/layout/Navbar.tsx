'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Jogos', href: '/#jogos' },
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Por que usar', href: '/#por-que-usar' },
]

function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith('/#')) {
    e.preventDefault()
    const id = href.slice(2)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  function handleMobileClick(href: string) {
    setMobileOpen(false)
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 200)
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            onClick={(e) => {
              const isHome = window.location.pathname === '/'
              if (isHome) {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl font-bold text-zinc-100">
              Casa de <span className="text-violet-400">Jogos</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/fridsonfirmino/games-hub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" /></svg>
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-zinc-400 transition-colors hover:text-zinc-100 md:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </Container>

      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-zinc-950/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col items-center gap-6 py-12">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleMobileClick(item.href)}
                className="text-lg font-medium text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/fridsonfirmino/games-hub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-400 transition-colors hover:text-zinc-100"
              onClick={() => setMobileOpen(false)}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" /></svg>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
