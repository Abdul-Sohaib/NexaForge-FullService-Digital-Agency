import { useEffect, useRef, useState } from 'react'; // Add useState
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import Herosection from './Herosection';
import Serviceprovide from './Serviceprovide';
import Socialcard from './Socialcard';
import Developers from './Devlopers';
import SketchLine from './SketchLine';
import Reviews from './Reviews';
import { Contact } from './Contact'; // Import Contact component

gsap.registerPlugin(ScrollTrigger);

export function Dashboard() {
  const socialCardRef = useRef<HTMLDivElement>(null);
  const lineStartRef = useRef<HTMLDivElement>(null);
  const lineEndRef = useRef<HTMLDivElement>(null);
  const developersRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const footerTriggerRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false); // Add state for Contact modal

  useEffect(() => {
    // Clean up any existing ScrollTriggers on mount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Function to toggle Contact modal
  const handleContactOpen = () => {
    setIsContactOpen(true);
  };

  // Function to close Contact modal
  const handleContactClose = () => {
    setIsContactOpen(false);
  };

  return (
    <div className="flex flex-col justify-between bg-transparent min-h-screen overflow-x-hidden w-full relative">
      {/* SketchLine positioned to cover the entire page */}
      <SketchLine startRef={lineStartRef} endRef={lineEndRef} />
      
      <div className="flex">
        <Navbar onContactOpen={handleContactOpen} /> {/* Pass the correct handler */}
      </div>
      
      <div className="flex-grow relative z-10">
        <Herosection />
        <Serviceprovide ref={lineStartRef} />
        
        {/* Socialcard section */}
        <div ref={socialCardRef} className='mt-[50rem]'>
          <div ref={lineEndRef}>
            <Socialcard />
          </div>
        </div>
        
        {/* Developers section - removed extra spacing */}
        <div ref={developersRef} className="">
          <Developers />
        </div>
        
        {/* Reviews section - adjusted positioning to handle developers space removal */}
        <div ref={reviewsRef} className='relative z-30'>
          <Reviews/>
        </div>

        {/* Footer - adjusted spacing */}
        <div ref={footerTriggerRef} className="mt-16">
          <Footer />
        </div>
      </div>

      {/* Render Contact component */}
      <Contact isOpen={isContactOpen} onClose={handleContactClose} />
    </div>
  );
}