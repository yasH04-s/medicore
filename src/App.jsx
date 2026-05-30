import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedPartners from './components/TrustedPartners'
import About from './components/About'
import Modules from './components/Modules'
import Features from './components/Features'
import DashboardPreview from './components/DashboardPreview'
import VideoDemo from './components/VideoDemo'
import DemoForm from './components/DemoForm'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustedPartners />
      <About />
      <Modules />
      <Features />
      <DashboardPreview />
      <VideoDemo />
      <DemoForm />
      <Testimonials />
      <FAQ />
      <Footer />
      <WhatsAppWidget />
    </div>
  )
}

