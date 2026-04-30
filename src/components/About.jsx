import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

function Counter({ from = 0, to }) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: 'easeOut' })
      return controls.stop
    }
  }, [inView, count, to])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

const stats = [
  { number: '200+', label: 'Projects Completed' },
  { number: '15+', label: 'Years Experience' },
  { number: '50+', label: 'Trusted Partners' },
]

const socials = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/thdstudio.eg/',
    color: '#E1306C',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/thdstudio/',
    color: '#0077B5',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100064107966174',
    color: '#1877F2',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

const contacts = [
  {
    title: 'Location',
    line1: 'New Cairo',
    line2: 'Cairo, Egypt',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  },
  {
    title: 'Phone',
    line1: '010 06224062',
    line2: 'Mon-Fri, 9am - 6pm',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  },
  {
    title: 'Email',
    line1: 'Hello@THDstudio.net',
    line2: '',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  }
]

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return width
}

export default function About() {
  const width = useWindowWidth()
  const isMobile = width < 768
  const isTablet = width < 1024

  return (
    <section
      id="about"
      style={{
        background: '#000000',
        padding: isMobile ? '80px 0 100px' : '120px 0 140px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-300px',
          left: '-200px',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(226,255,0,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw', position: 'relative' }}>
        {/* Section Header — Text + Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginBottom: isMobile ? '60px' : '100px',
            display: 'flex',
            flexDirection: isTablet ? 'column' : 'row',
            alignItems: isTablet ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: isMobile ? '40px' : '80px',
          }}
        >
          {/* Left Side: Text */}
          <div style={{ flex: '1', minWidth: 0, maxWidth: isTablet ? '100%' : '850px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '40px',
                  height: '2px',
                  background: 'var(--color-brand-yellow)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brand-yellow)',
                }}
              >
                About Us
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: isMobile ? 'clamp(24px, 7vw, 36px)' : 'clamp(32px, 4.5vw, 64px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: '#FFFFFF',
                margin: '0 0 24px 0',
                wordBreak: 'break-word',
              }}
            >
              We don't just design spaces.
              <br />
              We craft{' '}
              <span style={{ color: 'var(--color-brand-yellow)' }}>experiences</span>.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: isMobile ? '15px' : 'clamp(16px, 1.2vw, 20px)',
                lineHeight: 1.6,
                color: '#9A9A97',
                margin: 0,
                fontWeight: 400,
              }}
            >
              THD Studio is a full-service interior design and architecture firm.
              We transform environments into stories — spaces that move people,
              inspire action, and stand the test of time.
            </p>
          </div>

          {/* Right Side: Logo */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: '0 0 auto',
              width: isMobile ? '80%' : isTablet ? '50%' : 'clamp(240px, 24vw, 380px)',
              margin: '0 auto',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src="/THD Studio LOGO-Light.jpg"
                alt="THD Studio Logo"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  filter: 'drop-shadow(0 0 30px rgba(226, 255, 0, 0.1))',
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)',
            gap: isMobile ? '40px' : '24px',
            marginBottom: isMobile ? '60px' : '100px',
            padding: isMobile ? '40px 24px' : '48px 40px',
            borderRadius: '20px',
          }}
        >
          {stats.map((stat, index) => (
            <div key={stat.label} style={{ position: 'relative' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: isMobile ? 'clamp(36px, 10vw, 48px)' : 'clamp(40px, 5vw, 64px)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1,
                    marginBottom: '12px',
                    letterSpacing: '-0.03em',
                  }}
                >
                  <Counter from={0} to={parseInt(stat.number.replace('+', ''))} />
                  {stat.number.includes('+') && <span style={{ color: 'var(--color-brand-yellow)' }}>+</span>}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>

              {/* Vertical divider line for desktop */}
              {!isMobile && index < stats.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '10%',
                  bottom: '10%',
                  right: '-12px', /* center of 24px gap */
                  width: '1px',
                  background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)'
                }} />
              )}
              {/* Horizontal divider line for mobile */}
              {isMobile && index < stats.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: '20%',
                  right: '20%',
                  bottom: '-20px', /* center of 40px gap */
                  height: '1px',
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)'
                }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Contact Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: isMobile ? '60px' : '100px' }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 'clamp(20px, 6vw, 28px)' : 'clamp(24px, 3vw, 36px)',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: isMobile ? '32px' : '48px',
              letterSpacing: '-0.02em',
              textAlign: 'center',
            }}
          >
            Contact Us
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '16px' : '32px',
            }}
          >
            {contacts.map((contact, i) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: isMobile ? '24px' : '40px 32px',
                  background: '#080808',
                  border: '1px solid transparent',
                  borderRadius: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  boxShadow: '0 0 16px rgba(226, 255, 0, 0.45)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(226,255,0,0.5)'
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(226, 255, 0, 0.7)'
                  const iconwrap = e.currentTarget.querySelector('.contact-icon')
                  if (iconwrap) iconwrap.style.color = 'var(--color-brand-yellow)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(226, 255, 0, 0.45)'
                  const iconwrap = e.currentTarget.querySelector('.contact-icon')
                  if (iconwrap) iconwrap.style.color = '#FFFFFF'
                }}
              >
                <div
                  className="contact-icon"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    marginBottom: '24px',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {contact.icon}
                </div>

                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', letterSpacing: '0.01em' }}>
                  {contact.title}
                </h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#9A9A97', lineHeight: 1.6, margin: 0 }}>
                  <span style={{ color: '#E0E0D8' }}>{contact.line1}</span><br />
                  {contact.line2}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center' }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 'clamp(20px, 6vw, 28px)' : 'clamp(24px, 3vw, 36px)',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: isMobile ? '32px' : '48px',
              letterSpacing: '-0.02em',
            }}
          >
            Follow Us on Social Media
          </h3>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: isMobile ? '16px' : '24px',
              flexWrap: 'wrap',
            }}
          >
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: isMobile ? '16px 24px' : '20px 32px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  color: '#9A9A97',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  minWidth: isMobile ? 'auto' : '180px',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = social.color
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = '#FFFFFF'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 8px 30px ${social.color}33`
                  const iconSpan = e.currentTarget.querySelector('.social-icon')
                  if (iconSpan) iconSpan.style.color = social.color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.color = '#9A9A97'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  const iconSpan = e.currentTarget.querySelector('.social-icon')
                  if (iconSpan) iconSpan.style.color = 'inherit'
                }}
              >
                <span className="social-icon" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, transition: 'color 0.4s ease' }}>
                  {social.icon}
                </span>
                <span>{social.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
