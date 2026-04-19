import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useMemo } from 'react'

/* ───────────────────────────────────────────
   Project Data – each project now has `images[]`
   Only the first image shows in the grid card.
   ─────────────────────────────────────────── */
const projects = [
  {
    title: 'Villa Serenity',
    category: 'Residential',
    type: 'Architecture',
    year: '2025',
    description: 'A minimalist lakeside retreat blending natural stone with warm timber interiors.',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba4b5e5c6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    ],
  },
  {
    title: 'Noir Lounge',
    category: 'Commercial',
    type: 'Interior',
    year: '2024',
    description: 'A bold hospitality concept fusing dark aesthetics with gold-leaf accents.',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
    ],
  },
  {
    title: 'The Horizon Office',
    category: 'Workspace',
    type: 'Interior',
    year: '2024',
    description: 'An open-plan creative studio designed for collaboration and focus.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600494603473-a1f48605c6b0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop',
    ],
  },
  {
    title: 'Casa Lumière',
    category: 'Residential',
    type: 'Architecture',
    year: '2023',
    description: 'A Parisian-inspired apartment where light dictates every design decision.',
    images: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&h=600&fit=crop',
    ],
  },
]

/* ───────────────────────────────────────────
   Seeded pseudo-random for deterministic scatter.
   ─────────────────────────────────────────── */
function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

/* ───────────────────────────────────────────
   Deterministic scatter layout for the scrapbook.
   Background photos fan out around the center;
   active photo stays dead-center with subtle tilt.
   ─────────────────────────────────────────── */
function getScrapbookLayout(totalImages, activeIndex) {
  const rng = seededRandom(activeIndex * 1000 + totalImages * 7)
  const layouts = []

  let bgIdx = 0
  for (let i = 0; i < totalImages; i++) {
    const isActive = i === activeIndex
    if (isActive) {
      layouts.push({
        xPx: "0vw",
        yPx: "0vh",
        rotate: (rng() - 0.5) * 3,
        scale: 1,
        zIndex: 50,
        opacity: 1,
      })
    } else if (i < activeIndex) {
      // previously viewed photos stack behind responsively
      const angle = rng() * Math.PI * 2
      const dist = 8 + rng() * 14 // dist maps to vw (8vw to 22vw)
      bgIdx++
      layouts.push({
        xPx: `${Math.cos(angle) * dist}vw`,
        yPx: `${Math.sin(angle) * dist * 0.8}vh`, // vh for vertical scatter
        rotate: (rng() - 0.5) * 35,
        scale: 0.85 + rng() * 0.15,
        zIndex: 10 + i,
        opacity: 1,
      })
    } else {
      // Not yet viewed
      layouts.push({
        xPx: "0vw",
        yPx: "0vh",
        rotate: 0,
        scale: 0.8,
        zIndex: 0,
        opacity: 0,
      })
    }
  }
  return layouts
}

/* ───────────────────────────────────────────
   Scrapbook Overlay Component
   ─────────────────────────────────────────── */
function ScrapbookOverlay({ project, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = project.images.length

  const next = useCallback(() => setActiveIndex((p) => (p + 1) % total), [total])
  const prev = useCallback(() => setActiveIndex((p) => (p - 1 + total) % total), [total])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Memoize layouts so they recalculate per activeIndex
  const layouts = useMemo(
    () => getScrapbookLayout(total, activeIndex),
    [total, activeIndex]
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0D0D0C',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Top bar ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(12px, 2vw, 24px) clamp(16px, 4vw, 48px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '28px', height: '2px', background: 'var(--color-brand-yellow)' }} />
          <div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(10px, 1.2vw, 13px)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-yellow)',
              }}
            >
              {project.type}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(16px, 2.5vw, 28px)',
                fontWeight: 700,
                color: '#FFF',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: 'clamp(36px, 4vw, 48px)',
            height: 'clamp(36px, 4vw, 48px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            fontSize: 'clamp(16px, 2vw, 22px)',
            transition: 'all 0.3s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-brand-yellow)'
            e.currentTarget.style.color = '#111110'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            e.currentTarget.style.color = '#fff'
          }}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* ── Scrapbook Central Well ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(ellipse at center, rgba(226,255,0,0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Photo pile container – centered, photos scatter FROM center */}
        <div
          style={{
            position: 'relative',
            width: '1px',
            height: '1px',
          }}
        >
          <AnimatePresence mode="sync">
            {project.images.map((img, i) => {
              const l = layouts[i]
              const isActive = i === activeIndex
              return (
                <motion.div
                  key={`${project.title}-${i}`}
                  animate={{
                    opacity: l.opacity,
                    scale: l.scale,
                    x: l.xPx,
                    y: l.yPx,
                    rotate: l.rotate,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 20,
                    mass: 0.8,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!isActive) setActiveIndex(i)
                  }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    zIndex: l.zIndex,
                    cursor: isActive ? 'default' : 'pointer',
                    filter: isActive ? 'none' : 'brightness(0.55) sepia(0.1)',
                    transition: 'filter 0.4s ease',
                  }}
                >
                  {/* Polaroid-style photo frame inner centering wrapper */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: isActive ? 'clamp(320px, 60vw, 640px)' : 'clamp(280px, 50vw, 420px)',
                      transition: 'width 0.4s ease',
                    }}
                  >
                    <div
                      style={{
                        background: '#FAF9F7',
                        padding: isActive ? 'clamp(8px, 1.2vw, 16px)' : '8px',
                        paddingBottom: isActive ? 'clamp(32px, 4vw, 56px)' : '8px',
                        borderRadius: '2px',
                        boxShadow: isActive
                          ? '0 25px 80px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.4)'
                          : '0 8px 30px rgba(0,0,0,0.6)',
                        transition: 'padding 0.5s ease, box-shadow 0.5s ease',
                      }}
                    >
                      <img
                        src={img}
                        alt={`${project.title} – Photo ${i + 1}`}
                        style={{
                          width: '100%',
                          display: 'block',
                          aspectRatio: '4/3',
                          objectFit: 'cover',
                        }}
                        draggable={false}
                      />
                      {/* Caption on the active polaroid */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.25, duration: 0.4 }}
                          style={{
                            position: 'absolute',
                            bottom: 'clamp(6px, 1vw, 16px)',
                            left: 0,
                            right: 0,
                            textAlign: 'center',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'clamp(11px, 1.2vw, 14px)',
                              color: '#8A8A8A',
                              fontWeight: 500,
                              fontStyle: 'italic',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {project.title} — {project.year}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Yellow decorative sticky note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, x: 0, rotate: -3 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: 'clamp(30px, 6vh, 100px)',
            right: 'clamp(10px, 8vw, 15%)',
            width: 'clamp(160px, 30vw, 320px)',
            background: 'var(--color-brand-yellow)',
            padding: 'clamp(16px, 3vw, 24px)',
            borderRadius: '2px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            zIndex: 60, /* ensures it floats explicitly over things */
            transformOrigin: 'top center',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 'clamp(8px, 1.5vw, 16px)' }}>
            <span style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: '#111110' }}>✧</span>
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#111110',
              marginBottom: 'clamp(8px, 1.5vw, 16px)',
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            {project.title}
          </h4>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              color: '#111110',
              lineHeight: 1.5,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            {project.year} DESIGN.
          </p>
        </motion.div>
      </div>

      {/* ── Bottom Navigation Bar ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(12px, 3vw, 24px)',
          padding: 'clamp(16px, 3vh, 28px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
      >
        {/* Prev */}
        <button
          onClick={prev}
          style={{
            width: 'clamp(40px, 5vw, 52px)',
            height: 'clamp(40px, 5vw, 52px)',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.04)',
            color: '#fff',
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-brand-yellow)'
            e.currentTarget.style.color = 'var(--color-brand-yellow)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            e.currentTarget.style.color = '#fff'
          }}
          aria-label="Previous photo"
        >
          ‹
        </button>

        {/* Counter */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px, 1.4vw, 16px)',
            color: '#8A8A8A',
            fontWeight: 500,
            minWidth: '48px',
            textAlign: 'center',
          }}
        >
          <span style={{ color: '#fff', fontWeight: 700 }}>{activeIndex + 1}</span>
          {' / '}
          {total}
        </span>

        {/* Next */}
        <button
          onClick={next}
          style={{
            width: 'clamp(40px, 5vw, 52px)',
            height: 'clamp(40px, 5vw, 52px)',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--color-brand-yellow)',
            color: '#111110',
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
          aria-label="Next photo"
        >
          ›
        </button>
      </div>

      {/* ── Thumbnail dots ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          paddingBottom: 'clamp(12px, 2vh, 24px)',
          flexShrink: 0,
        }}
      >
        {project.images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? '28px' : '8px',
              height: '8px',
              borderRadius: '999px',
              border: 'none',
              background: i === activeIndex ? 'var(--color-brand-yellow)' : 'rgba(255,255,255,0.2)',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
            }}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ───────────────────────────────────────────
   Main Projects Section
   ─────────────────────────────────────────── */
export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [openProject, setOpenProject] = useState(null)

  const filteredProjects = projects.filter(
    (project) => filter === 'All' || project.type === filter
  )

  return (
    <>
      <section
        id="projects"
        style={{
          background: '#111110',
          padding: 'clamp(60px, 10vw, 120px) 0 clamp(80px, 12vw, 140px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 5vw',
            position: 'relative',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 'clamp(40px, 8vw, 80px)' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
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
                Selected Work
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 5vw, 72px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                Projects that{' '}
                <span style={{ color: 'var(--color-brand-yellow)' }}>define</span>
                <br />
                spaces & stories.
              </h2>

              {/* Toggle Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '0',
                  background: '#1A1A18',
                  padding: '5px',
                  borderRadius: '999px',
                  width: 'fit-content',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {['All', 'Architecture', 'Interior'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    style={{
                      padding: '10px clamp(14px, 3vw, 24px)',
                      borderRadius: '999px',
                      border: 'none',
                      background:
                        filter === tab ? 'var(--color-brand-yellow)' : 'transparent',
                      color: filter === tab ? '#111110' : '#A3A3A3',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(12px, 1.5vw, 14px)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (filter !== tab) e.currentTarget.style.color = '#FFFFFF'
                    }}
                    onMouseLeave={(e) => {
                      if (filter !== tab) e.currentTarget.style.color = '#A3A3A3'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '32px',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setOpenProject(project)}
                  style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#1A1A18',
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                    transition: 'border-color 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(226, 255, 0, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  }}
                >
                  {/* Image — shows only the FIRST photo */}
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '4/3',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                      }}
                    />

                    {/* Category pill */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: 'rgba(26,26,24,0.85)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '999px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--color-brand-yellow)',
                        fontFamily: 'var(--font-body)',
                        letterSpacing: '0.05em',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                      }}
                    >
                      <span>{project.type}</span>
                    </div>

                    {/* Photo count badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'rgba(26,26,24,0.85)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '999px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#fff',
                        fontFamily: 'var(--font-body)',
                        display: 'flex',
                        gap: '5px',
                        alignItems: 'center',
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      {project.images.length}
                    </div>

                    {/* "Click to explore" hover overlay */}
                    <div
                      className="card-explore-overlay"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, transparent 30%, rgba(13,13,12,0.85) 100%)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        padding: '24px',
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--color-brand-yellow)',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span>Explore Project</span>
                        <span style={{ fontSize: '18px' }}>→</span>
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '24px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          margin: 0,
                        }}
                      >
                        {project.title}
                      </h3>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          color: '#6B6B60',
                        }}
                      >
                        {project.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Scrapbook Overlay */}
      <AnimatePresence>
        {openProject && (
          <ScrapbookOverlay
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
