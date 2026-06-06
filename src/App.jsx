import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedPartners from './components/TrustedPartners'
import About from './components/About'
import Modules from './components/Modules'
import Features from './components/Features'
import DashboardPreview from './components/DashboardPreview'
import VideoDemo from './components/VideoDemo'
import DemoForm from './components/DemoForm'
import Login from './components/Login'
import Signup from './components/Signup'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'

function HomePage() {
  return (
    <>
      <Hero />
      <TrustedPartners />
      <About />
      <Modules />
      <Features />
      <DashboardPreview />
      <VideoDemo />
      <Testimonials />
      <FAQ />
      <WhatsAppWidget />
    </>
  );
}

function DemoPage() {
  return (
    <div className="pt-24 min-h-screen">
      <DemoForm />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  )
}
