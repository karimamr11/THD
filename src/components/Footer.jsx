export default function Footer() {
  return (
    <footer style={{
      background: '#1A1A18',
      padding: '36px 0 32px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      position: 'relative',
    }}>
      {/* Subtle top accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '5vw',
        right: '5vw',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(226,255,0,0.2), transparent)',
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 5vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: '#FFFFFF',
          fontWeight: 300,
          letterSpacing: '0.03em',
          textAlign: 'center'
        }}>
          <span>
            Powered by{' '}
            <span style={{ color: '#60A5FA', fontWeight: 600 }}>Nilebyte</span>
          </span>
          
          <span style={{ 
            width: '1px', 
            height: '14px', 
            background: 'rgba(255,255,255,0.12)',
            display: 'inline-block'
          }} className="hidden sm:block" />

          <span style={{ color: '#6B6B60' }}>All rights reserved © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
