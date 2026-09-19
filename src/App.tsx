import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Services } from '@/components/Services';
import { Work } from '@/components/Work';
import { Process } from '@/components/Process';
import { Quote } from '@/components/Quote';
import { Shop } from '@/components/Shop';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

function App() {
  return (
    <div className="relative min-h-screen bg-ivory font-body text-ink">
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/images/seen_lady.jpeg')" }}
      />
      <div aria-hidden="true" className="fixed inset-0 z-0 bg-[#050817]/45" />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Process />
        <Shop />
        <Work />
        <Quote />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
