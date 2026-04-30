import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Services from './components/Services'
import About from './components/About'
import Footer from './components/Footer'

function App() {
  return (
    <div style={{ background: '#000000' }}>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Services />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App
