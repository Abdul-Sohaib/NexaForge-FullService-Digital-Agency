import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logo from '../assets/logoimg2.png';
import whatwedoimg from '../assets/whatwedoimg.png';
import whoweareimg from '../assets/whoweareimg.png';
import showcaseimg from '../assets/showcaseimg.png';
// import logobackimg from '../assets/logobackimg.png';

interface NavbarProps {
  onContactOpen: () => void;
}

// Define navigation links for reusability
const navLinks = [
  { id: 0, name: 'Dashboard', path: '/dashboard', scrollTarget: null },
  { id: 1, name: 'What We Do', path: '/dashboard', scrollTarget: 'serviceprovide' },
  { id: 2, name: 'Showcase', path: '/dashboard', scrollTarget: 'socialcard' },
  { id: 3, name: 'Who We Are', path: '/dashboard', scrollTarget: 'developers' },
];

export function Navbar({ onContactOpen }: NavbarProps) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    const nav = navRef.current;
    if (!navbar || !nav) return;

    // Set initial state to max-w-5xl
    gsap.set(navbar, {
      maxWidth: '1280px', // max-w-5xl
      marginLeft: 'auto',
      marginRight: 'auto',
    });

    // Set initial gap for navigation links
    gsap.set(nav, {
      gap: '6rem', // equivalent to gap-24
    });

    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Animate navbar width
        gsap.to(navbar, {
          maxWidth: '1024px', // max-w-4xl
          marginLeft: 'auto',
          marginRight: 'auto',
          duration: 1,
          ease: 'power2.out',
        });
        
        // Animate navigation gap reduction
        gsap.to(nav, {
          gap: '3rem', // equivalent to gap-12
          duration: 1,
          ease: 'power2.out',
        });
      } else {
        // Animate navbar width back
        gsap.to(navbar, {
          maxWidth: '1280px', // max-w-5xl
          marginLeft: 'auto',
          marginRight: 'auto',
          duration: 1,
          ease: 'power2.out',
        });
        
        // Animate navigation gap back to original
        gsap.to(nav, {
          gap: '6rem', // equivalent to gap-24
          duration: 1,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle smooth scrolling to components
  const handleNavClick = (e: React.MouseEvent, scrollTarget: string | null) => {
    if (!scrollTarget) return;

    e.preventDefault();

    // Find the target element by data attribute or class
    let targetElement: Element | null = null;

    switch (scrollTarget) {
      case 'serviceprovide':
        targetElement = document.querySelector('[data-component="serviceprovide"]') || 
                      document.querySelector('.service-provide-section');
        break;
      case 'socialcard':
        targetElement = document.querySelector('[data-component="socialcard"]') || 
                      document.querySelector('.w-full.min-h-screen.bg-transparent.relative.z-20');
        break;
      case 'developers':
        targetElement = document.querySelector('[data-component="developers"]') || 
                      document.querySelector('.w-full.relative.z-20');
        break;
    }

    if (targetElement) {
      // Get the element's position
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      // Account for navbar height (approximately 100px including margin)
      const offset = 100;
      
      // Smooth scroll to the target
      window.scrollTo({
        top: targetPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      ref={navbarRef}
      className="fixed top-0 left-0 mt-6 right-0 z-50 bg-gradient-to-tr from-[#ffffff] via-[#fdfcf7] to-[#f9f5ec] rounded-xl overflow-visible py-3 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)]"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <img src={logo} alt="MyApp Logo" className="w-24 h-auto cursor-pointer" />
            {/* <img src={logobackimg} alt="MyApp Logo" className="w-10 h-auto rotate-12 absolute top-0 right-0 translate-y-1 -translate-x-1" /> */}
          </div>

          {/* Navigation Links */}
          <nav 
            ref={navRef}
            className="hidden md:flex justify-between lg:space-x-4"
          >
            {navLinks.map((link) => (
              <div key={link.id} className="nav-item">
                {link.scrollTarget ? (
                  <button
                    onClick={(e) => handleNavClick(e, link.scrollTarget)}
                    className="text-black/70 hover:text-black rounded-xl text-[0.9rem] font-extrabold uppercase transition-colors font-heading bg-transparent border-none cursor-pointer"
                    aria-label={`Navigate to ${link.name}`}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="text-black/70 hover:text-black rounded-xl text-[0.9rem] font-extrabold uppercase transition-colors font-heading"
                    aria-label={`Navigate to ${link.name}`}
                  >
                    {link.name}
                  </Link>
                )}
                
                {/* hover-image */}
                {link.id === 1 && (
                  <img 
                    src={whatwedoimg}
                    alt="What We Do"
                    className="hover-image"
                  />
                )}
                {link.id === 3 && (
                  <img 
                    src={whoweareimg}
                    alt="Who We Are"
                    className="hover-image"
                  />
                )}
                {link.id === 2 && (
                  <img 
                    src={showcaseimg}
                    alt="Showcase"
                    className="hover-image"
                  />
                )}
              </div>
            ))}
          </nav>
          
          <div>
            <button 
              className="button-56 hover:scale-110"
              onClick={onContactOpen}
            >
              <span className="text-white hover:text-black  uppercase px-3 py-1 font-heading font-bold text-[0.8rem]">Let's Create</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}