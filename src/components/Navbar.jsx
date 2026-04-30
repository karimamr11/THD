import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 40)

      // Hide navbar when scrolling down, show when scrolling up
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-[100] transition-all duration-500"
        style={{
          background: 'transparent',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          borderBottom: 'none',
          transform: hidden && !mobileOpen ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div
          className="w-full flex items-center justify-between"
          style={{ padding: '0 clamp(16px, 6vw, 48px)', height: 'clamp(70px, 12vw, 100px)' }}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center justify-start no-underline"
          >
            <img
              src="/thd-logo-hg.png"
              alt="THD Studio"
              style={{
                height: 'clamp(100px, 25vw, 200px)',
                width: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
              draggable={false}
            />
          </a>

          <ul
            className="hidden md:flex items-center list-none m-0 p-0"
            style={{ gap: '6vw' }}
          >
            {navLinks.map((link) => (
              <li key={link.label} className="list-none">
                <a
                  href={link.href}
                  className="group relative no-underline text-[19px] font-medium tracking-wide transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#FFFFFF'
                  }}
                >
                  {link.label}
                  <span 
                    className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 h-[2px] transition-all duration-300 w-0 group-hover:w-full"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, var(--color-brand-yellow) 50%, transparent 100%)' }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger — mobile */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col items-center justify-center p-2 bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
            style={{
              width: '44px',
              height: '44px',
              position: 'relative',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: '#FFFFFF',
                borderRadius: '1px',
                position: 'absolute',
                left: '50%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center center',
                willChange: 'transform',
                transform: mobileOpen
                  ? 'translate(-50%, 0) rotate(45deg)'
                  : 'translate(-50%, -7px) rotate(0deg)',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: '#FFFFFF',
                borderRadius: '1px',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: '#FFFFFF',
                borderRadius: '1px',
                position: 'absolute',
                left: '50%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center center',
                willChange: 'transform',
                transform: mobileOpen
                  ? 'translate(-50%, 0) rotate(-45deg)'
                  : 'translate(-50%, 7px) rotate(0deg)',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-overlay"
          >
            <ul className="flex flex-col items-center gap-8 list-none">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group relative no-underline text-[28px] font-light tracking-wide transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-inv)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-inv)' }}
                  >
                    {link.label}
                    <span 
                      className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-10 h-[2px] transition-all duration-300 group-hover:w-full"
                      style={{ background: 'linear-gradient(90deg, transparent 0%, var(--color-brand-yellow) 50%, transparent 100%)' }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
