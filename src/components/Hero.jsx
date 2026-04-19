import { useRef, useState, useEffect, useCallback } from 'react'

/* ---- Easing helpers ---- */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const BUILDING_IMAGE = '/building.png'

export default function Hero() {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  /* ---- Scroll listener → local progress 0‑1 ---- */
  const onScroll = useCallback(() => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const sectionH = sectionRef.current.offsetHeight
    const vh = window.innerHeight
    const scrolled = Math.max(0, -rect.top)
    setProgress(Math.min(scrolled / (sectionH - vh), 1))
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [onScroll])

  /* ==========================================================
     PHASE 1  (progress 0 → 1.0)
     - Building rises from bottom continuously throughout the entire scroll
     ========================================================== */
  const buildingT = progress // Moves for the entire duration of the hero scroll
  const buildingE = easeOutCubic(buildingT)
  // Pushed much lower to sit below the explore button initially
  const buildingY = 80 - buildingE * 80
  const buildingScale = 1 + buildingE * 0.45

  // Headline translates down and scales down as expected
  const headlineT = Math.min(progress / 0.40, 1)
  const headlineY = 10 * headlineT
  const headlineScale = 1 - (0.05 * headlineT)

  // Opacity stays solidly at 1.0 until the building reaches it 
  // then quickly fades to 0 to completely hide the words once they are behind the building.
  const vanishStart = 0.12 // Trigger vanish sooner as building overlaps
  const headlineVanishT = Math.min(Math.max((progress - vanishStart) / 0.10, 0), 1)
  const headlineOpacity = 1 - headlineVanishT

  /* ==========================================================
     PHASE 2  (progress 0.10 → 0.35)
     - "THD" appears FROM THE BACK (scale 0.15 → 1.0), fixed at center
     - Starts just before the headline fades behind the building
     ========================================================== */
  const thdT = Math.min(Math.max((progress - 0.10) / 0.25, 0), 1)
  const thdE = easeOutCubic(thdT)
  // Scale UP from 0.15 to 1.0 (dramatic back-to-front zoom effect)
  const thdScale = 0.15 + (0.85 * thdE)

  // THD Wireframe Path Draw (progress 0.10 -> 0.25)
  // Gives it plenty of time to draw completely while it zooms in
  const strokeDrawT = Math.min(Math.max((progress - 0.10) / 0.15, 0), 1)

  // THD solid fill only fades in AFTER wireframe finishes (progress 0.25 -> 0.35)
  const maskFillT = Math.min(Math.max((progress - 0.25) / 0.10, 0), 1)
  const thdOpacity = easeOutCubic(maskFillT)

  // THD stays fixed at exact center — no vertical movement
  const thdTextYPercent = 50

  // PHASE 3: THD Drops down into clouds (later in scroll)
  const dropT = Math.min(Math.max((progress - 0.70) / 0.30, 0), 1)
  const thdTextYPercentFinal = thdTextYPercent + (dropT * dropT * 40)

  /* ==========================================================
     PHASE 2.5 (progress 0.35 → 0.65)
     - Base Cloud reveal: unseen until THD is fully appeared,
     - Then it rises from bottom to up and fades in.
     ========================================================== */
  const cloudRevealT = Math.min(Math.max((progress - 0.35) / 0.30, 0), 1)
  const cloudRevealE = easeOutCubic(cloudRevealT)

  const cloudOpacityMultiplier = cloudRevealE
  const cloudYOffset = 200 * (1 - cloudRevealE) // rises from 200px below

  // Side clouds appear from the very beginning of the scroll (0.00 -> 0.15)
  const sideCloudOpacity = Math.min(progress / 0.15, 1)

  /* ==========================================================
     PHASE 3  (progress 0.80 → 1.0)
     - THD text transitions from outlined → solid white
     ========================================================== */
  // const solidT = Math.min(Math.max((progress - 0.80) / 0.20, 0), 1)
  // const solidE = easeInOutCubic(solidT)

  // Modern Glow — ramps up once the solid text is fully visible
  const glowIntensity = Math.min(Math.max((progress - 0.35) / 0.30, 0), 1)

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ height: '300vh', position: 'relative' }}
    >
      {/* ===== STICKY VIEWPORT ===== */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: 'url(/hero-bg.png) center/cover no-repeat',
        }}
      >
        {/* ---- BUILDING IMAGE ---- */}
        {/* Key difference vs before: MUCH larger, takes up bottom 65% of viewport,
            using a linear gradient mask on sides for soft cloud-wrap edges */}
        <div
          className="bottom-[15%] md:bottom-0"
          style={{
            position: 'absolute',
            left: '50%',
            width: 'min(110vw, 1400px)',
            transform: `translateX(-50%) translateY(${buildingY}%) scale(${buildingScale})`,
            transformOrigin: 'bottom center',
            zIndex: 2,
            willChange: 'transform',
          }}
        >
          <img
            src={BUILDING_IMAGE}
            alt="Luxury architectural building"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
            draggable={false}
          />
        </div>

        {/* ---- WISPY CLOUD PATCHES ---- */}
        {/* Large, obvious moving cloud banks on the edges */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          {/* ---- WISPY CLOUDS ---- */}
          {/* Replaced CSS gradients with the newly uploaded wispy cloud image! */}

          <img
            src="/cloud-wispy.png"
            alt="Cloud wisp"
            style={{
              position: 'absolute',
              top: '60%', // Pushed down out of the center to preserve THD contrast
              left: '-25%',
              width: '55vw',
              opacity: 0.5 * sideCloudOpacity,
              transform: `translate3d(${progress * -400}px, 0, 0)`, // Drifts noticeably to the left (outward)
              willChange: 'transform, opacity',
            }}
          />

          <img
            src="/cloud-wispy.png"
            alt="Cloud wisp"
            style={{
              position: 'absolute',
              top: '80%', // Pushed way down
              left: '-10%',
              width: '45vw',
              opacity: 0.4 * sideCloudOpacity,
              transform: `translate3d(${progress * -250}px, 0, 0)`,
              willChange: 'transform, opacity',
            }}
          />

          <img
            src="/cloud-wispy.png"
            alt="Cloud wisp"
            style={{
              position: 'absolute',
              top: '65%', // Pushed down out of the center
              right: '-25%',
              width: '55vw',
              opacity: 0.5 * sideCloudOpacity,
              transform: `translate3d(${progress * 400}px, 0, 0) scaleX(-1)`, // Drifts noticeably to the right (outward)
              willChange: 'transform, opacity',
            }}
          />

          <img
            src="/cloud-wispy.png"
            alt="Cloud wisp"
            style={{
              position: 'absolute',
              top: '85%', // Pushed way down
              right: '-5%',
              width: '50vw',
              opacity: 0.4 * sideCloudOpacity,
              transform: `translate3d(${progress * 250}px, 0, 0) scaleX(-1)`,
              willChange: 'transform, opacity',
            }}
          />
        </div>

        {/* ==============================================================
            PHASE 1 — INITIAL HERO HEADLINE
            Key changes vs before:
            • Positioned at ~32% from top (was 12%) — sits JUST above building
            • All on ONE line (no line break) — "Design What Defines You"
            • "Design W" uses subtle gray/silver transparency (not raw building)
            • "hat Moves You" is solid black
            • CTA is smaller and more minimal
            ============================================================== */}
        <div
          style={{
            position: 'absolute',
            top: '28%',
            left: '50%',
            transform: `translate3d(-50%, ${headlineY}%, 0) scale(${headlineScale})`,
            textAlign: 'center',
            zIndex: 1,
            opacity: headlineOpacity,
            width: '95%',
            maxWidth: '1200px',
            pointerEvents: headlineOpacity > 0 ? 'auto' : 'none',
            willChange: 'transform, opacity',
          }}
        >
          {/* ---- Main Headline — single line, split color effect ---- */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 6.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              marginBottom: '16px',
            }}
          >
            {/* Group words so "Design What" and "Moves You" wrap nicely on mobile */}
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
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

          {/* ---- Subtitle ---- */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              lineHeight: 1.65,
              maxWidth: '480px',
              margin: '0 auto 24px',
            }}
          >
            <span style={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.95)' }}>
              Expert spaces. Real craftsmanship.
            </span>{' '}
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
              A clear path to find what's next.
            </span>
          </p>

          {/* ---- CTA Button — smaller, pill-shaped, like reference ---- */}
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

        {/* ==============================================================
            PHASE 2 & 3 — "THD" STENCIL CLIPPING MASK
            ============================================================== */}

        {/* Step 1: Glassy white stroke wireframe that draws itself BEFORE the mask fills in */}
        {/* Uses an isolated container that fades out exactly as the main mask bleeds in */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 11,
            pointerEvents: 'none',
            // Fade in right after scroll starts (progress > 0.05), and fade out when the main mask begins (thdOpacity > 0)
            opacity: Math.min(Math.max((progress - 0.05) / 0.05, 0), 1) * (1 - thdOpacity),
            display: (1 - thdOpacity) > 0 && progress > 0.01 ? 'block' : 'none'
          }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <g style={{
              transform: `scale(${thdScale})`,
              transformOrigin: '50% 50%',
            }}>
              <text
                x="50%"
                y={`${thdTextYPercentFinal - 8}%`}
                textAnchor="middle"
                dominantBaseline="central"
                fill="none"
                stroke="rgba(255, 255, 255, 0.75)"
                strokeWidth={3 / thdScale}
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={`${100 - (strokeDrawT * 100)}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(7rem, 20vw, 22rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                }}
              >
                THD
              </text>
              <text
                x="50%"
                y={`${thdTextYPercentFinal + (isMobile ? 3 : 20)}%`}
                textAnchor="middle"
                dominantBaseline="central"
                fill="none"
                stroke="rgba(255, 255, 255, 0.75)"
                strokeWidth={1.5 / thdScale}
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={`${100 - (strokeDrawT * 100)}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(4rem, 10vw, 9rem)',
                  fontWeight: 600,
                }}
              >
                Studio
              </text>
            </g>
          </svg>
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
            opacity: thdOpacity,
            transition: 'opacity 0.08s linear',
            display: thdOpacity > 0 ? 'block' : 'none'
          }}
        >
          {/* Svg window mask: Screen is solid #FAF9F7 except inside the letters where it's transparent */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="thd-stencil">
                <rect width="100%" height="100%" fill="white" />
                <g style={{
                  transform: `scale(${thdScale})`,
                  transformOrigin: '50% 50%',
                }}>
                  <text
                    x="50%"
                    y={`${thdTextYPercentFinal - 8}%`}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="black"
                    opacity={1 - dropT}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(7rem, 20vw, 22rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    THD
                  </text>
                  <text
                    x="50%"
                    y={`${thdTextYPercentFinal + (isMobile ? 3 : 20)}%`}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="black"
                    opacity={1 - dropT}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(4rem, 10vw, 9rem)',
                      fontWeight: 600,
                    }}
                  >
                    Studio
                  </text>
                </g>
              </mask>
            </defs>
            {/* The background image that covers the building/clouds outside the letters */}
            <image href="/hero-bg.png" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" mask="url(#thd-stencil)" />

            {/* PHASE 3 Solid fill text */}
            <g style={{
              transform: `scale(${thdScale})`,
              transformOrigin: '50% 50%',
              opacity: 1 - dropT, // Full color immediately, fades out as it drops into clouds
            }}>
              <text
                x="50%"
                y={`${thdTextYPercentFinal - 8}%`}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#FFFFFF"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(7rem, 20vw, 22rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                }}
              >
                THD
              </text>
              <text
                x="50%"
                y={`${thdTextYPercentFinal + (isMobile ? 3 : 20)}%`}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--color-brand-yellow)"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(4rem, 10vw, 9rem)',
                  fontWeight: 600,
                }}
              >
                Studio
              </text>
            </g>
          </svg>
        </div>

        {/* ---- MODERN GLOW OVERLAY (HTML text-shadow, not SVG) ---- */}
        {glowIntensity > 0 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              pointerEvents: 'none',
              opacity: (1 - dropT) * thdOpacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                transform: `scale(${thdScale}) translateY(${(thdTextYPercentFinal - 50) * 1.8}%)`,
                transformOrigin: 'center center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(7rem, 20vw, 22rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.85,
                  color: 'transparent',
                  textShadow: `
                    0 0 ${12 * glowIntensity}px rgba(255, 255, 255, ${0.3 * glowIntensity}),
                    0 0 ${40 * glowIntensity}px rgba(255, 255, 255, ${0.18 * glowIntensity}),
                    0 0 ${80 * glowIntensity}px rgba(255, 255, 255, ${0.08 * glowIntensity})
                  `,
                  WebkitTextStroke: '0px transparent',
                }}
              >
                THD
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(4rem, 10vw, 9rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  marginTop: isMobile ? '-0.1em' : '0.05em',
                  color: 'transparent',
                  textShadow: `
                    0 0 ${20 * glowIntensity}px rgba(226, 255, 0, ${0.7 * glowIntensity}),
                    0 0 ${60 * glowIntensity}px rgba(226, 255, 0, ${0.45 * glowIntensity}),
                    0 0 ${120 * glowIntensity}px rgba(226, 255, 0, ${0.25 * glowIntensity}),
                    0 0 ${200 * glowIntensity}px rgba(226, 255, 0, ${0.12 * glowIntensity})
                  `,
                  WebkitTextStroke: '0px transparent',
                }}
              >
                Studio
              </div>
            </div>
          </div>
        )}

        {/* ---- FOREGROUND BASE CLOUD ALIGNED TO BUILDING ---- */}
        {/* Rendered ON TOP of the stencil mask (zIndex>10) so THD text physically sinks into the cloud! */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: 'min(110vw, 1400px)',
            transform: `translateX(-50%) translateY(${buildingY}%) scale(${buildingScale})`,
            transformOrigin: 'bottom center',
            zIndex: 12,
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: '-35%',
            left: '-15%',
            width: '130%',
            opacity: cloudOpacityMultiplier,
            transform: `translate3d(${-progress * 10}%, ${cloudYOffset}px, 0)`,
            pointerEvents: 'none',
            willChange: 'transform, opacity',
          }}>
            <img
              src="/cloud-base.png"
              alt="Building cloud base"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>



        {/* ---- Scroll indicator ---- */}
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            opacity: Math.max(0, 1 - progress * 5),
            transition: 'opacity 0.2s ease',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '40px',
              borderRadius: '12px',
              border: '2px solid rgba(26, 26, 24, 0.2)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '6px',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '8px',
                borderRadius: '2px',
                background: 'rgba(26, 26, 24, 0.3)',
                animation: 'scrollBounce 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
