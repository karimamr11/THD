import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useMemo } from 'react'
import Masonry from './Masonry'

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
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', description: 'Detailed view 1 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', description: 'Detailed view 2 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop', description: 'Detailed view 3 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop', description: 'Detailed view 4 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop', description: 'Detailed view 5 showcasing the unique architectural elements and design choices of this space.' }
    ],
  },
  {
    title: 'Noir Lounge',
    category: 'Commercial',
    type: 'Interior',
    year: '2024',
    description: 'A bold hospitality concept fusing dark aesthetics with gold-leaf accents.',
    images: [
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop', description: 'Detailed view 1 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=600&fit=crop', description: 'Detailed view 2 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop', description: 'Detailed view 3 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop', description: 'Detailed view 4 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop', description: 'Detailed view 5 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', description: 'Detailed view 6 showcasing the unique architectural elements and design choices of this space.' }
    ],
  },
  {
    title: 'The Horizon Office',
    category: 'Workspace',
    type: 'Interior',
    year: '2024',
    description: 'An open-plan creative studio designed for collaboration and focus.',
    images: [
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', description: 'Detailed view 1 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', description: 'Detailed view 2 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop', description: 'Detailed view 3 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&h=600&fit=crop', description: 'Detailed view 4 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1560067174-c5a3a8f37060?w=800&h=600&fit=crop', description: 'Detailed view 5 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop', description: 'Detailed view 6 showcasing the unique architectural elements and design choices of this space.' }
    ],
  },
  {
    title: 'Casa Lumière',
    category: 'Residential',
    type: 'Architecture',
    year: '2023',
    description: 'A Parisian-inspired apartment where light dictates every design decision.',
    images: [
      { url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop', description: 'Detailed view 1 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop', description: 'Detailed view 2 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop', description: 'Detailed view 3 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&h=600&fit=crop', description: 'Detailed view 4 showcasing the unique architectural elements and design choices of this space.' }
    ],
  },
  {
    title: 'The Blueprint',
    category: 'Commercial',
    type: 'Execution',
    year: '2025',
    description: 'Flawless execution of a complex commercial space, blending speed and precision.',
    images: [
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', description: 'Detailed view 1 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop', description: 'Detailed view 2 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop', description: 'Detailed view 3 showcasing the unique architectural elements and design choices of this space.' }
    ],
  },
  {
    title: 'Oasis Spa',
    category: 'Commercial',
    type: 'Interior',
    year: '2023',
    description: 'A sanctuary of wellness using natural light, raw stone, and tranquil water features.',
    images: [
      { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop', description: 'Detailed view 1 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop', description: 'Detailed view 2 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1560067174-c5a3a8f37060?w=800&h=600&fit=crop', description: 'Detailed view 3 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop', description: 'Detailed view 4 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', description: 'Detailed view 5 showcasing the unique architectural elements and design choices of this space.' }
    ],
  },
  {
    title: 'Urban Loft',
    category: 'Residential',
    type: 'Interior',
    year: '2022',
    description: 'Industrial concrete meets warm walnut finishes in this downtown penthouse.',
    images: [
      { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop', description: 'Detailed view 1 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', description: 'Detailed view 2 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&h=600&fit=crop', description: 'Detailed view 3 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&h=600&fit=crop', description: 'Detailed view 4 showcasing the unique architectural elements and design choices of this space.' }
    ],
  },
  {
    title: 'The Glass Pavilion',
    category: 'Residential',
    type: 'Architecture',
    year: '2024',
    description: 'Seamless indoor-outdoor living surrounded by dense forest.',
    images: [
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', description: 'Detailed view 1 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop', description: 'Detailed view 2 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop', description: 'Detailed view 3 showcasing the unique architectural elements and design choices of this space.' }
    ],
  },
  {
    title: 'Aura Boutique',
    category: 'Commercial',
    type: 'Execution',
    year: '2023',
    description: 'A high-end retail space meticulously crafted to highlight luxury garments.',
    images: [
      { url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop', description: 'Detailed view 1 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop', description: 'Detailed view 2 showcasing the unique architectural elements and design choices of this space.' },
      { url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop', description: 'Detailed view 3 showcasing the unique architectural elements and design choices of this space.' }
    ],
  },
]

/* ───────────────────────────────────────────
   Seeded pseudo-random for deterministic scatter.
   ─────────────────────────────────────────── */
function ProjectCardOverlay({ project, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = project.images.length

  const next = useCallback(() => setActiveIndex((p) => (p + 1) % total), [total])
  const prev = useCallback(() => setActiveIndex((p) => (p - 1 + total) % total), [total])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev, onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const currentImage = project.images[activeIndex]

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
        background: 'rgba(13, 13, 12, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 4vw, 40px)',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 'clamp(20px, 4vw, 40px)',
          right: 'clamp(20px, 4vw, 40px)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          width: 'clamp(40px, 4vw, 56px)',
          height: 'clamp(40px, 4vw, 56px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#fff',
          fontSize: 'clamp(18px, 2vw, 24px)',
          transition: 'all 0.3s',
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-brand-yellow)'
          e.currentTarget.style.color = '#111110'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
          e.currentTarget.style.color = '#fff'
        }}
      >
        ✕
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: '90vh',
          maxHeight: '900px',
          background: '#1A1A18',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#000' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={currentImage.url}
              alt={project.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </AnimatePresence>

          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 20px',
            pointerEvents: 'none',
          }}>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{
                pointerEvents: 'auto',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                color: '#fff',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-yellow)'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.color = '#fff'; }}
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                pointerEvents: 'auto',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                color: '#fff',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-yellow)'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.color = '#fff'; }}
            >
              ›
            </button>
          </div>
        </div>

        <div style={{
          padding: 'clamp(24px, 4vw, 40px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '20px', height: '2px', background: 'var(--color-brand-yellow)' }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-yellow)',
              }}>
                {project.category} / {project.year}
              </span>
            </div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#8A8A8A',
              fontWeight: 500,
            }}>
              <span style={{ color: '#fff' }}>{activeIndex + 1}</span> / {total}
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 700,
            color: '#FFF',
            margin: 0,
            lineHeight: 1.2,
          }}>
            {project.title}
          </h3>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: '#A3A3A3',
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: 0,
          }}>
            {currentImage.description}
          </p>
        </div>
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
          background: '#000000',
          padding: '120px 0 140px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >

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
            style={{ marginBottom: '80px' }}
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
                {['All', 'Architecture', 'Interior', 'Execution'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '999px',
                      border: 'none',
                      background:
                        filter === tab ? 'var(--color-brand-yellow)' : 'transparent',
                      color: filter === tab ? '#111110' : '#A3A3A3',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
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
          <div style={{ minHeight: '600px', width: '100%', position: 'relative' }}>
            <Masonry
              items={filteredProjects.map((project, index) => ({
                id: project.title,
                img: project.images[0].url,
                url: "#",
                height: 350 + (index % 3) * 100, // Varied heights for masonry effect
                onClick: () => setOpenProject(project)
              }))}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={false}
            />
          </div>
        </div>
      </section>

      {/* Scrapbook Overlay */}
      <AnimatePresence>
        {openProject && (
          <ProjectCardOverlay
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
