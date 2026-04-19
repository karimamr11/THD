import { motion } from 'framer-motion'

const services = [
  {
    number: '01',
    title: 'Interior Design',
    description: 'Full-scope residential and commercial interior design — from concept to completion. We craft spaces that reflect your identity.',
    features: ['Space Planning', 'Material Selection', '3D Visualization', 'Mood Boards'],
  },
  {
    number: '02',
    title: 'Architecture',
    description: 'Architectural design that pushes boundaries. Structures that stand as statements of innovation and precision.',
    features: ['Conceptual Design', 'Technical Drawings', 'Building Permits', 'Site Supervision'],
  },
]

export default function Services() {
  return (
    <section
      id="services"
      style={{
        position: 'relative',
        padding: 'clamp(60px, 10vw, 120px) 0 clamp(80px, 12vw, 140px)',
        overflow: 'hidden',
      }}
    >
      {/* Background image — same as hero */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      {/* Dark overlay for modern moody look */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(17,17,16,0.55) 0%, rgba(28,28,26,0.65) 50%, rgba(17,17,16,0.70) 100%)',
          zIndex: 1,
        }}
      />

      {/* Decorative glow */}
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          right: '-200px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(226,255,0,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(226,255,0,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw', position: 'relative', zIndex: 3 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '80px' }}
        >
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
              What We Do
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              margin: 0,
              maxWidth: '700px',
            }}
          >
            Services built for{' '}
            <span style={{ color: 'var(--color-brand-yellow)' }}>vision</span>.
          </h2>
        </motion.div>

        {/* Services List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '32px',
        }}>
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: '1px solid rgba(255,255,255,0.06)',
                padding: 'clamp(24px, 4vw, 48px) clamp(20px, 3vw, 40px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: '24px',
                background: 'rgba(255,255,255,0.015)',
              }}
              className="services-row"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor = 'rgba(226,255,0,0.25)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)'
                e.currentTarget.style.transform = 'translateY(-6px)'
                const num = e.currentTarget.querySelector('.service-num')
                if (num) num.style.color = 'var(--color-brand-yellow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.015)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
                const num = e.currentTarget.querySelector('.service-num')
                if (num) num.style.color = '#3A3A35'
              }}
            >
              {/* Number */}
              <span
                className="service-num"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '56px',
                  fontWeight: 800,
                  color: '#3A3A35',
                  lineHeight: 1,
                  transition: 'color 0.4s ease',
                  marginBottom: '16px',
                }}
              >
                {service.number}
              </span>

              {/* Content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 3.5vw, 40px)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    margin: '0 0 16px 0',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    lineHeight: 1.7,
                    color: '#9A9A97',
                    margin: '0 0 32px 0',
                  }}
                >
                  {service.description}
                </p>

                {/* Feature tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#E0E0D8',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '999px',
                        padding: '8px 16px',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
