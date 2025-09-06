import { useEffect, useRef, useState } from 'react';
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
import { Contact } from './Contact';

gsap.registerPlugin(ScrollTrigger);

export function Dashboard() {
  const socialCardRef = useRef<HTMLDivElement>(null);
  const lineStartRef = useRef<HTMLDivElement>(null);
  const lineEndRef = useRef<HTMLDivElement>(null);
  const developersRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const footerTriggerRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

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
      {/* Navbar - Highest z-index for always on top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar onContactOpen={handleContactOpen} />
      </div>
      
      {/* SketchLine positioned to cover the entire page - Lower z-index */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-5">
        <SketchLine startRef={lineStartRef} endRef={lineEndRef} />
      </div>
      
      {/* Main content container with proper spacing and z-index management */}
      <div className="flex-grow relative ">
        
        {/* Hero section - z-index 10 */}
        <div className="relative z-10">
          <Herosection />
        </div>
        
        {/* Service provide section - z-index 15 */}
        <div ref={lineStartRef} className="relative z-15">
          <Serviceprovide />
        </div>
        
        {/* Socialcard section - z-index 20 (highest for pinning) - Increased spacing */}
        <div ref={socialCardRef} className="relative z-20 2xl:mt-[25rem] lg:mt-[70rem] md:mt-[80rem] sm:mt-[80rem] xs:mt-[15rem] "> {/* Increased from 10rem to 15rem */}
          <div ref={lineEndRef}>
            <Socialcard />
          </div>
        </div>
        
        {/* Developers section - z-index 25 - Added extra spacing to prevent background color overlap */}
        <div ref={developersRef} className="relative z-25 2xl:mt-[10rem] lg:mt-[10rem] md:mt-[60rem]"> {/* Added significant margin */}
          <Developers />
        </div>
        
        {/* Reviews section - z-index 30 - Increased spacing */}
        <div ref={reviewsRef} className="relative z-30 2xl:mt-[0rem] lg:mt-[0rem] md:mt-[0rem] sm:mt-[0rem] xs:-mt-[0rem] "> {/* Increased from 16 to 20rem */}
          <Reviews />
        </div>

        {/* Footer - z-index 35 */}
        <div ref={footerTriggerRef} className="relative z-35 mt-20">
          <Footer />
        </div>
      </div>

      {/* Contact modal - Highest z-index for overlay */}
      <Contact isOpen={isContactOpen} onClose={handleContactClose} />
    </div>
  );
}