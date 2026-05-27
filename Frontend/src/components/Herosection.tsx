import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import heroimg from '../assets/heroimg.png';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// ── Heading words with their CSS class ──────────────────────────────────────
const HEADING_WORDS = [
  { text: 'DESIGN.', cls: 'hero-word-design' },
  { text: 'BUILD.',  cls: 'hero-word-build'  },
  { text: 'SCALE.',  cls: 'hero-word-scale'  },
] as const;

const Herosection = () => {
  const heroRef           = useRef<HTMLDivElement>(null);
  const headingRef        = useRef<HTMLHeadingElement>(null);
  const paragraphRef      = useRef<HTMLParagraphElement>(null);
  const imageRef          = useRef<HTMLImageElement>(null);
  const carouselRef       = useRef<HTMLDivElement>(null);
  const containerRef      = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Per-word reveal state (0 = hidden, 1 = typing, 2 = done)
  const [wordState, setWordState] = useState<(0 | 1 | 2)[]>([0, 0, 0]);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError,  setImageError]  = useState(false);

  // Preload hero image
  useEffect(() => {
    const img = new Image();
    img.onload  = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = heroimg;
  }, []);

  useEffect(() => {
    const hero           = heroRef.current;
    const container      = containerRef.current;
    const imageContainer = imageContainerRef.current;

    if (
      !hero || !headingRef.current || !paragraphRef.current ||
      !imageRef.current || !carouselRef.current || !container || !imageContainer
    ) return;

    // ── scroll lock helpers ──────────────────────────────────────────────────
    const disableScroll = () => {
      document.body.style.overflow           = 'hidden';
      document.body.style.height             = '100vh';
      document.documentElement.style.overflow = 'hidden';
    };
    const enableScroll = () => {
      document.body.style.overflow           = '';
      document.body.style.height             = '';
      document.documentElement.style.overflow = '';
    };

    disableScroll();

    // ── typewriter for paragraph only ───────────────────────────────────────
    const paragraphText =
      'We engineer high-velocity growth for ambitious brands through experimental design and rigorous strategy protocols.';

    paragraphRef.current.textContent = '';

    const typeWriter = (element: HTMLElement, text: string, speed = 22): Promise<void> =>
      new Promise((resolve) => {
        let i = 0;
        element.textContent = '';
        const timer = setInterval(() => {
          if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            i++;
          } else {
            clearInterval(timer);
            resolve();
          }
        }, speed);
      });

    // ── word-by-word heading reveal (letter-by-letter per word) ─────────────
    const revealWord = (index: number, text: string, speed = 45): Promise<void> =>
      new Promise((resolve) => {
        setWordState((prev) => {
          const next = [...prev] as (0 | 1 | 2)[];
          next[index] = 1; // typing
          return next;
        });

        // We update via a temporary span we query from the DOM by data-index
        let i = 0;
        const timer = setInterval(() => {
          const span = document.querySelector<HTMLElement>(`[data-word-index="${index}"] .hero-word-inner`);
          if (span) span.textContent = text.substring(0, i + 1);
          i++;
          if (i >= text.length) {
            clearInterval(timer);
            setWordState((prev) => {
              const next = [...prev] as (0 | 1 | 2)[];
              next[index] = 2; // done
              return next;
            });
            resolve();
          }
        }, speed);
      });

    // ── main animation sequence (logic identical to original) ───────────────
    const animateSequence = async () => {
      const heroContent = headingRef.current!.parentElement!;

      const isMobile    = window.innerWidth <= 768;
      const customMobile = window.innerWidth >= 300 && window.innerWidth <= 600;

      gsap.set(heroContent,    { width: '100%', transition: 'none' });
      gsap.set(imageContainer, {
        opacity: 0,
        width: '0%',
        overflow: 'hidden',
        display: customMobile ? 'flex' : isMobile ? 'none' : 'flex',
      });

      // Reveal each heading word in sequence
      for (let i = 0; i < HEADING_WORDS.length; i++) {
        await revealWord(i, HEADING_WORDS[i].text, 60);
        await new Promise((r) => setTimeout(r, 120));
      }

      await new Promise((r) => setTimeout(r, 300));
      await typeWriter(paragraphRef.current!, paragraphText);
      await new Promise((r) => setTimeout(r, 500));

      // Layout slide animation
      const tl = gsap.timeline();

      if (!isMobile || customMobile) {
        const contentWidth = customMobile ? '100%' : '58%';
        const imageWidth   = customMobile ? '100%' : '42%';

        tl.to(heroContent,    { width: contentWidth, duration: 1.5, ease: 'power3.inOut' }, 0)
          .to(imageContainer, { width: imageWidth, opacity: 1, duration: 1.5, ease: 'power3.inOut' }, 0);
      } else {
        tl.to(heroContent, { width: '100%', duration: 1.5, ease: 'power3.inOut' }, 0);
      }

      await new Promise((r) => { tl.call(() => r(true), [], 1.5); });

      // Image fade-in (desktop only)
      if (!isMobile || customMobile) {
        await new Promise((r) => setTimeout(r, 200));

        if (imageLoaded && !imageError) {
          await new Promise((r) => {
            const imageScale   = customMobile ? 0.8 : 0.9;
            const imageDuration = customMobile ? 1.2 : 1.5;

            gsap.fromTo(
              imageRef.current,
              { opacity: 0, scale: imageScale, y: customMobile ? 20 : 30, rotationY: customMobile ? 10 : 15 },
              {
                opacity: 1, scale: 1, y: 0, rotationY: 0,
                duration: imageDuration, ease: 'power3.out',
                onComplete: () => r(true),
              }
            );
          });
        }
      }

      // Carousel setup (unchanged)
      const carousel = carouselRef.current;
      if (!carousel) return;

      await new Promise((r) => setTimeout(r, 100));

      const firstItem = carousel.querySelector('.carousel-item');
      if (!firstItem) return;

      const itemWidth  = firstItem.getBoundingClientRect().width;
      const totalItems = carousel.children.length / 2;
      const oneSetWidth = itemWidth * totalItems;

      gsap.set(carousel, { x: 0 });
      gsap.to(carousel, { x: -oneSetWidth, duration: 25, ease: 'none', repeat: -1, immediateRender: false });

      const svgs = carousel.querySelectorAll('.carousel-svg');
      gsap.to(svgs, { rotation: 360, duration: 6, ease: 'none', repeat: -1, transformOrigin: 'center center' });

      enableScroll();
    };

    animateSequence();

    return () => {
      enableScroll();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      // eslint-disable-next-line react-hooks/exhaustive-deps
      gsap.killTweensOf(carouselRef.current);
    };
  }, [imageLoaded, imageError]);

  const handleImageLoad  = () => { if (!imageLoaded) setImageLoaded(true); };
  const handleImageError = () => setImageError(true);

  const carouselItems  = Array(8).fill(null);
  const bars = [
    { cls: 'hero-bar hero-bar-h1' },
    { cls: 'hero-bar hero-bar-h2' },
    { cls: 'hero-bar hero-bar-h3' },
    { cls: 'hero-bar hero-bar-h4' },
    { cls: 'hero-bar hero-bar-h5' },
  ];
  const tickerMessages = ['SYSTEM NOMINAL', 'RAPID SCALING INITIATED', 'DATA SECURE'];

  return (
    <div
      ref={heroRef}
      className="hero-section hero-dark-wrap relative flex flex-col items-center justify-center min-h-[60vh] mt-28 2xl:mt-[16vh] sm:mt-32 md:mt-[15rem] lg:mt-[16vh]"
    >
      {/* ── Main content row ─────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-between w-full  mx-auto px-4 sm:px-6 lg:px-8 md:flex-row"
      >
        {/* ── LEFT ─────────────────────────────────────────────────── */}
        <div className=" text-left flex flex-col justify-center items-start  min-h-[200px]">

          {/* Status badge */}
          <div className="hero-status-badge">
            <span className="hero-status-dot" />
            SYSTEM ONLINE 
          </div>

          {/* ── Heading: three separately-coloured words ───────────── */}
          <motion.h1
            ref={headingRef}
            className="hero-display-heading font-bold"
            initial={{ opacity: 1 }}
          >
            {HEADING_WORDS.map((word, i) => (
              <span
                key={word.text}
                data-word-index={i}
                className={`${word.cls}${wordState[i] === 1 ? ' hero-word-typing' : ''}`}
                style={{ visibility: wordState[i] === 0 ? 'hidden' : 'visible' }}
              >
                {/* inner span is what typewriter writes into */}
                <span className="hero-word-inner" />
              </span>
            ))}
          </motion.h1>

          {/* Sub-paragraph */}
          <motion.p
            ref={paragraphRef}
            className="hero-subtext"
            initial={{ opacity: 1 }}
          />

          {/* CTA buttons */}
          <div className="hero-cta-group">
            <button className="hero-btn-primary">
              <span>Start Your Growth</span>
              <span>🚀</span>
            </button>
            <button className="hero-btn-secondary">
              View Packages
            </button>
          </div>
        </div>

        {/* ── RIGHT – image + stat cards ────────────────────────────── */}
        <div
          ref={imageContainerRef}
          className="justify-center mt-8 md:mt-0 will-change-[width,opacity] min-h-[200px] items-center hidden md:flex relative"
        >
          {imageError && (
            <div className="max-w-full 2xl:h-[40vh] lg:h-[70vh] xs:h-[40vh] bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-2 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
                <p>Image failed to load</p>
              </div>
            </div>
          )}

          {imageLoaded && !imageError && (
            <img
              ref={imageRef}
              src={heroimg}
              alt="Hero"
              className="max-w-full 2xl:h-[70vh] lg:h-[70vh] xs:h-[40vh] opacity-0"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}

          {/* Stat cards */}
          <div className="hero-cards-stack absolute right-10 top-20 -translate-y-1/2 -mr-4 xl:-mr-8">

            {/* Caution card */}
            <div className="hero-card hero-card-caution">
              <div className="hero-card-header">
                <span className="hero-card-caution-label">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  CAUTION
                </span>
                <span className="hero-card-err">ERR_402</span>
              </div>
              <p className="hero-card-caution-body">
                Warning: Our strategies may cause <strong>unexpected spikes</strong> in user acquisition and revenue.
              </p>
              <div className="hero-progress-bar">
                <div className="hero-progress-fill" />
              </div>
            </div>

            {/* Revenue card */}
            <div className="hero-card" style={{ position: 'relative', paddingTop: '32px' }}>
              <div className="hero-growth-badge">
                <div className="hero-growth-number">10x</div>
                <div className="hero-growth-label">GROWTH FACTOR</div>
              </div>
              <div className="hero-card-revenue-header">
                <span className="hero-card-label">REVENUE GENERATED</span>
                <span className="hero-live-dot" />
              </div>
              <div className="hero-revenue-number">
                $40M<span className="hero-revenue-plus">+</span>
              </div>
              <div className="hero-bars">
                {bars.map((b, i) => <div key={i} className={b.cls} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Carousel strip ───────────────────────────────────────────── */}
      <div className="w-full overflow-hidden
                      customwidth:mt-[9vh] xs:mt-[2vh] sm:mt-[10vh]
                      md:mt-[30vh] lg:mt-[10vh] xl:mt-[10vh]
                      2xl:mt-[8vh]  3xl:mt-[10vh]">
        <div ref={carouselRef} className="flex flex-nowrap items-center" style={{ width: 'fit-content' }}>
          {[`set1`, `set2`].flatMap((key) =>
            carouselItems.map((_, index) => (
              <div key={`${key}-${index}`} className="carousel-item flex items-center flex-shrink-0 px-4 sm:px-8">
                <span
                  className="carousel-text text-base sm:text-lg font-semibold text-white uppercase whitespace-nowrap mr-4 sm:mr-6"
                  style={{ fontFamily: 'var(--hero-font-body)' }}
                >
                  Let's Build Together
                </span>
                <svg
                  className="carousel-svg w-5 h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: 'var(--hero-red)' }}
                >
                  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
                </svg>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Bottom red ticker ────────────────────────────────────────── */}
      <div className="hero-ticker-wrapper">
        <div
          className="hero-ticker-track"
          ref={(el) => {
            if (!el) return;
            const totalW = el.scrollWidth / 2;
            gsap.to(el, { x: -totalW, duration: 18, ease: 'none', repeat: -1, immediateRender: false });
          }}
        >
          {[0, 1].flatMap((set) =>
            Array(3).fill(tickerMessages).flat().map((msg: string, i: number) => (
              <div key={`t${set}-${i}`} className="hero-ticker-item">
                <span>{msg}</span>
                <span className="hero-ticker-sep">///</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Herosection;