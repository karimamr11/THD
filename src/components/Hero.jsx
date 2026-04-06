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
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
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

  // THD Wireframe Path Draw (progress 0.10 -> 0.25)
  const strokeDrawT = Math.min(Math.max((progress - 0.10) / 0.15, 0), 1)

  /* ==========================================================
     PHASE 2  (progress 0.25 → 0.55)
     - "THD" Stencil Mask reveals
     ========================================================== */
  const thdT = Math.min(Math.max((progress - 0.25) / 0.30, 0), 1)
  const thdE = easeOutCubic(thdT)
  const thdOpacity = thdE
  // Scale down from 1.3 to 1.0
  const thdScale = 1.2 - (0.2 * thdE)

  // PHASE 3: THD Drops down into clouds
  const dropT = Math.min(Math.max((progress - 0.70) / 0.30, 0), 1)
  // Text starts lower down (offset by +30%), rises to center (+0%), then drops to +40% at end
  const thdTextYPercent = 50 + (30 * (1 - thdE)) + (dropT * dropT * 40)

  // Base cloud fades in after scrolling (0.10 -> 0.40)
  const baseCloudOpacity = Math.min(Math.max((progress - 0.10) / 0.30, 0), 1)

  // Interior design subtitle starts slightly after THD is fully revealed
  const subT = Math.min(Math.max((progress - 0.45) / 0.25, 0), 1)
  const subE = easeOutCubic(subT)
  const subY = 50 * (1 - subE)
  const subOpacity = subE

  /* ==========================================================
     PHASE 3  (progress 0.80 → 1.0)
     - THD text transitions from outlined → solid white
     ========================================================== */
  const solidT = Math.min(Math.max((progress - 0.80) / 0.20, 0), 1)
  const solidE = easeInOutCubic(solidT)

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
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: 'min(110vw, 1400px)',
            transform: `translateX(-50%) translateY(${buildingY}%) scale(${buildingScale})`,
            transformOrigin: 'bottom center',
            zIndex: 2,
            transition: 'transform 0.06s linear',
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
              opacity: 0.5,
              transform: `translateX(${progress * 150}px)`, // Drifts less aggressively
              transition: 'transform 0.12s linear',
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
              opacity: 0.4,
              transform: `translateX(${progress * 100}px)`,
              transition: 'transform 0.12s linear',
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
              opacity: 0.5,
              transform: `translateX(${progress * -150}px) scaleX(-1)`, // flipped horizontally
              transition: 'transform 0.12s linear',
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
              opacity: 0.4,
              transform: `translateX(${progress * -100}px) scaleX(-1)`,
              transition: 'transform 0.12s linear',
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
            transition: 'transform 0.08s linear',
          }}
        >
          {/* ---- Main Headline — single line, split color effect ---- */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              marginBottom: '16px',
              whiteSpace: 'nowrap',
            }}
          >
            {/* "Design W" — semi-transparent, ghosted look (like reference) */}
            <span
              style={{
                color: 'rgba(26, 26, 24, 0.35)',
              }}
            >
              Design W
            </span>
            {/* "hat Moves You" — solid black, italic for "Moves You" like reference */}
            <span style={{ color: '#1A1A18' }}>hat </span>
            <span
              style={{
                color: '#1A1A18',
                fontStyle: 'italic',
                fontWeight: 700,
              }}
            >
              Moves You
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
            <span style={{ fontWeight: 600, color: '#1A1A18' }}>
              Expert spaces. Real craftsmanship.
            </span>{' '}
            <span style={{ color: '#8A8A80' }}>
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
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Explore Our Work{' '}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
        {/* Uses an isolated container that fades out exactly as the main mask bleeds in, leaving the rest of the flow completely untouched! */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 11,
            pointerEvents: 'none',
            transform: `scale(${thdScale})`,
            transformOrigin: 'center center',
            // Fade in right after scroll starts (progress > 0.05), and fade out when the main mask begins (thdOpacity > 0)
            opacity: Math.min(Math.max((progress - 0.05) / 0.05, 0), 1) * (1 - thdOpacity), 
            display: (1 - thdOpacity) > 0 && progress > 0.01 ? 'block' : 'none'
          }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <text 
              x="50%" 
              y={`${thdTextYPercent}%`} 
              textAnchor="middle" 
              dominantBaseline="central" 
              fill="none"
              stroke="rgba(255, 255, 255, 0.75)" 
              strokeWidth="3"
              pathLength="100" 
              strokeDasharray="100"
              strokeDashoffset={`${100 - (strokeDrawT * 100)}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(7rem, 20vw, 22rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em'
              }}
            >
              THD
            </text>
          </svg>
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
            opacity: thdOpacity,
            transform: `scale(${thdScale})`,
            transformOrigin: 'center center',
            transition: 'opacity 0.08s linear, transform 0.08s linear',
            display: thdOpacity > 0 ? 'block' : 'none'
          }}
        >
          {/* Svg window mask: Screen is solid #FAF9F7 except inside the letters where it's transparent */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="thd-stencil">
                <rect width="100%" height="100%" fill="white" />
                <text
                  x="50%"
                  y={`${thdTextYPercent}%`}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="black"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(7rem, 20vw, 22rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em'
                  }}
                >
                  THD
                </text>
              </mask>
            </defs>
            {/* The background image that covers the building/clouds outside the letters */}
            <image href="/hero-bg.png" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" mask="url(#thd-stencil)" />
          </svg>
        </div>

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
            bottom: '-35%', // Pushed way down below the building!
            left: '-15%',
            width: '130%',
            opacity: baseCloudOpacity, // appears after scrolling!
            transform: `translate3d(${-progress * 10}%, 0, 0)`, // Drifts left as you scroll
            pointerEvents: 'none',
          }}>
            <img
              src="/cloud-base.png"
              alt="Building cloud base"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>

        {/* "Interior Design" sits on top of everything */}
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '50%',
            transform: `translateX(-50%) translateY(${subY}px)`,
            textAlign: 'center',
            zIndex: 15,
            pointerEvents: 'none',
            opacity: subOpacity,
            display: subOpacity > 0 ? 'block' : 'none'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 3.5vw, 2.5rem)',
              fontWeight: 600,
              letterSpacing: '0.2em',
              margin: 0,
              color: '#1A1A18', // dark text to contrast on the #FAF9F7 background
            }}
          >
            Interior Design
          </p>
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
