import { useState, useEffect } from 'react'

const BUILDING_IMAGE = '/building.png'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section
      id="hero"
      style={{ 
        height: '100dvh', 
        position: 'relative', 
        overflow: 'hidden', 
        background: '#000000',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        padding: '0 5vw clamp(40px, 10vw, 80px) 5vw'
      }}
    >
      {/* Background Image & Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}>
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80" 
          alt="Luxury Architecture"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 100%)',
        }} />
      </div>

      {/* ==============================================================
          HERO HEADLINE (Option A)
          ============================================================== */}
      <div
        style={{
          textAlign: 'left',
          zIndex: 4,
          width: '95%',
          maxWidth: '1200px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.035em',
            marginBottom: '16px',
          }}
        >
          <span style={{ display: 'inline-block' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Designing </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>the </span>
          </span>
          {' '}
          <span
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              color: 'var(--color-brand-yellow)',
              fontWeight: 900,
            }}
          >
            Future
          </span>
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px, 3vw, 17px)',
            lineHeight: 1.65,
            maxWidth: '480px',
            marginBottom: '24px',
          }}
        >
          <span style={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.95)' }}>
            Expert spaces. Real craftsmanship.
          </span>{' '}
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
            A clear path to find what's next.
          </span>
        </p>

        <a
          href="#projects"
          id="hero-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 22px',
            borderRadius: '999px',
            background: '#1A1A18',
            color: '#FFFFFF',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            letterSpacing: '0.02em',
            boxShadow: '0 0 16px rgba(226, 255, 0, 0.45)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 0 24px rgba(226, 255, 0, 0.7)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 0 16px rgba(226, 255, 0, 0.45)'
          }}
        >
          Explore Our Work{' '}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-brand-yellow)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
