import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logoimg2.png';
import whatwedoimg from '../assets/whatwedoimg.png';
import whoweareimg from '../assets/whoweareimg.png';
import showcaseimg from '../assets/showcaseimg.png';

interface NavbarProps {
  onContactOpen: () => void;
}

const navLinks = [
  { id: 0, name: 'Dashboard', path: '/dashboard', scrollTarget: null },
  { id: 1, name: 'What We Do', path: '/dashboard', scrollTarget: 'serviceprovide' },
  { id: 2, name: 'Showcase', path: '/dashboard', scrollTarget: 'socialcard' },
  { id: 3, name: 'Who We Are', path: '/dashboard', scrollTarget: 'developers' },
];

export function Navbar({ onContactOpen }: NavbarProps) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const navbar = navbarRef.current;
    const nav = navRef.current;
    if (!navbar || !nav) return;

    // Initial setup - only apply width animations on screens > 768px
    if (window.innerWidth > 768) {
      gsap.set(navbar, {
        maxWidth: '1180px',
        marginLeft: 'auto',
        marginRight: 'auto',
      });
    }

    if(window.innerWidth > 768){
      gsap.set(nav, {
        gap: '5rem',
      });
    } else {
      gsap.set(nav, {
        gap: '1.5rem',
      });
    }

    const handleScroll = () => {
      // Only apply width animations on screens > 768px
      if (window.innerWidth > 768) {
        if (window.scrollY > 50) {
          // Scrolled down - reduce width
          gsap.to(navbar, {
            maxWidth: window.innerWidth >= 1024 ? '1024px' : '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
            duration: 1,
            ease: 'power2.out',
          });

          gsap.to(nav, {
            gap: window.innerWidth >= 1024 ? '3rem' : '2rem',
            duration: 1,
            ease: 'power2.out',
          });
        } else {
          // Scrolled up - return to original width (1180px)
          gsap.to(navbar, {
            maxWidth: '1180px',
            marginLeft: 'auto',
            marginRight: 'auto',
            duration: 1,
            ease: 'power2.out',
          });

          gsap.to(nav, {
            gap: '5rem',
            duration: 1,
            ease: 'power2.out',
          });
        }
      } else {
        // For mobile screens, only animate the gap, not the width
        if (window.scrollY > 50) {
          gsap.to(nav, {
            gap: '1rem',
            duration: 1.2,
            ease: 'power2.inOut',
          });
        } else {
          gsap.to(nav, {
            gap: '1.5rem',
            duration: 1.2,
            ease: 'power2.inOut',
          });
        }
      }
    };

    const handleResize = () => {
      // Reset navbar width when screen size changes
      if (window.innerWidth <= 768) {
        gsap.set(navbar, {
          maxWidth: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
        });
      } else {
        // Reset to original width on desktop
        gsap.set(navbar, {
          maxWidth: '1180px',
          marginLeft: 'auto',
          marginRight: 'auto',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, scrollTarget: string | null) => {
    if (!scrollTarget) return;

    e.preventDefault();
    setIsMobileMenuOpen(false);

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
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offset = window.innerWidth < 768 ? 80 : 100;

      window.scrollTo({
        top: targetPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-tr from-[#ffffff] via-[#fdfcf7] to-[#f9f5ec] rounded-xl overflow-visible shadow-[0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)] mt-2 sm:mt-4 md:mt-6 xs:mt-6 mx-2 sm:mx-4 xs:mx-3  "
    >
      <div className="2xl:px-10 xs:px-6 sm:px-4  lg:px-8 2xl:p-3 lg:p-3 md:px-2 sm:p-0 xs:p-0">
        <div className="flex items-center justify-center 2xl:gap-[6rem] lg:gap-[4rem] md:gap-[4rem] sm:gap-[4rem] xs:gap-[6rem] h-12 xs:h-14 sm:h-16 w-full">
          {/* Logo */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <img src={logo} alt="MyApp Logo" className="2xl:w-20 lg:w-16 md:w-16 sm:w-16 xs:w-20  h-auto cursor-pointer" />
          </div>

          {/* Navigation Links */}
          <nav 
            ref={navRef}
            className={`${
              isMobileMenuOpen ? 'flex' : 'hidden'
            } md:flex flex-col md:flex-row absolute md:static top-[5rem] left-0 right-0  bg-gradient-to-tr from-[#ffffff] via-[#fdfcf7] to-[#f9f5ec] md:bg-transparent rounded-xl md:rounded-none shadow-md md:shadow-none py-4 md:py-0 px-4 md:px-0 z-40 justify-between lg:space-x-1`}
          >
            {navLinks.map((link) => (
              <div key={link.id} className="nav-item  flex relative py-2 md:py-0">
                {link.scrollTarget ? (
                  <button
                    onClick={(e) => handleNavClick(e, link.scrollTarget)}
                    className="text-black/70 hover:text-black rounded-xl 2xl:text-sm lg:text-sm xs:text-sm sm:text-[0.9rem] font-extrabold uppercase transition-colors font-heading bg-transparent border-none cursor-pointer md:text-[0.7rem] "
                    aria-label={`Navigate to ${link.name}`}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="text-black/70 hover:text-black rounded-xl 2xl:text-sm lg:text-sm md:text-[0.7rem] xs:text-sm sm:text-[0.9rem] font-extrabold uppercase transition-colors font-heading"
                    aria-label={`Navigate to ${link.name}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
                
                {/* hover-image */}
                {link.id === 1 && (
                  <img 
                    src={whatwedoimg}
                    alt="What We Do"
                    className="hover-image hidden md:block w-16 sm:w-20 lg:w-24 "
                  />
                )}
                {link.id === 3 && (
                  <img 
                    src={whoweareimg}
                    alt="Who We Are"
                    className="hover-image hidden md:block w-16 sm:w-20 lg:w-24"
                  />
                )}
                {link.id === 2 && (
                  <img 
                    src={showcaseimg}
                    alt="Showcase"
                    className="hover-image hidden md:block w-16 sm:w-20 lg:w-24"
                  />
                )}
              </div>
            ))}
          </nav>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              className="button-56 hover:scale-110 2xl:text-sm lg:text-sm md:text-[0.6rem] sm:text-[0.6rem] xs:text-[0.7rem] 2xl:px-2 lg:px-2 md:px-6 xs:px-3 sm:px-4 py-1"
              onClick={onContactOpen}
            >
              <span className="text-white hover:text-black uppercase font-heading font-bold">Let's Create</span>
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-black  focus:outline-none "
                aria-label="Toggle mobile menu"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="h-5 xs:h-6 w-5 xs:w-6" />
                ) : (
                  <FaBars className="h-5 xs:h-6 w-5 xs:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}