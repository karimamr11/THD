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
  {
    number: '03',
    title: 'Execution',
    description: 'Flawless on-site execution and project management. We turn designs into reality with meticulous attention to detail.',
    features: ['Project Management', 'Quality Control', 'Turnkey Solutions', 'Contracting'],
  },
]

export default function Services() {
  return (
    <section
      id="services"
      style={{
        background: '#000000',
        padding: '120px 0 140px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glow */}
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          right: '-200px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(226,255,0,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
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
          background: 'radial-gradient(circle, rgba(226,255,0,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5vw', position: 'relative' }}>
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
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
                border: '1px solid transparent',
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: '24px',
                background: '#080808',
                boxShadow: '0 0 16px rgba(226, 255, 0, 0.45)',
              }}
              className="services-row"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(226,255,0,0.5)'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(226, 255, 0, 0.7)'
                e.currentTarget.style.transform = 'translateY(-6px)'
                const num = e.currentTarget.querySelector('.service-num')
                if (num) num.style.color = 'var(--color-brand-yellow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.boxShadow = '0 0 16px rgba(226, 255, 0, 0.45)'
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
