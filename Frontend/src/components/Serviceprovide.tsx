import { useEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import wedobento1 from '../assets/webuildbento1.png';
import wedobento1o1 from '../assets/webuildbento1o1.png';
import wedobento2 from '../assets/webuildbento2.png';
import wedobento3 from '../assets/webuildbento3.png';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Serviceprovide = forwardRef<HTMLDivElement>((_props, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const grid1Ref = useRef<HTMLDivElement>(null);
  const grid2Ref = useRef<HTMLDivElement>(null);
  const grid3Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const subtext2Ref = useRef<HTMLParagraphElement>(null);
  const subtext3Ref = useRef<HTMLParagraphElement>(null);
  const span1Ref = useRef<HTMLSpanElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);
  const span3Ref = useRef<HTMLSpanElement>(null);
  const span4Ref = useRef<HTMLSpanElement>(null);
  const lineStartRef = useRef<HTMLDivElement>(null);

  // Combine the forwarded ref with the internal lineStartRef
  const setRefs = (element: HTMLDivElement | null) => {
    lineStartRef.current = element;
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const gridContainer = gridContainerRef.current;
    const grid1 = grid1Ref.current;
    const grid2 = grid2Ref.current;
    const grid3 = grid3Ref.current;
    const subtext = subtextRef.current;
    const subtext2 = subtext2Ref.current;
    const subtext3 = subtext3Ref.current;

    if (!section || !title || !gridContainer || !grid1 || !grid2 || !grid3 || !subtext || !subtext2 || !subtext3) return;

    // Initialize title and grid container as hidden
    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set(gridContainer, { opacity: 0, display: 'none' });
    gsap.set(grid1, { opacity: 0, x: -150 });
    gsap.set([grid2, grid3], { opacity: 0, x: 150 });

    // Array of dynamic subtext
    const subtexts = ["Website Building", "App Building"];
    const subtexts2 = ["UI Design", "Logo Design", "Graphic Design"];
    const subtexts3 = ["Content Creation", "Brand Strategy"];
    let currentIndex = 0;
    let subtextTimeline: gsap.core.Timeline | null = null;
    let subtext2Timeline: gsap.core.Timeline | null = null;
    let subtext3Timeline: gsap.core.Timeline | null = null;

    // Animation timeline triggered when scrolling down
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'top 10%',
        toggleActions: 'play none none restart',
        onLeaveBack: () => {
          // Remove completion flag
          section.removeAttribute('data-animations-complete');

          if (subtextTimeline) {
            subtextTimeline.kill();
            subtextTimeline = null;
          }
          if (subtext2Timeline) {
            subtext2Timeline.kill();
            subtext2Timeline = null;
          }
          if (subtext3Timeline) {
            subtext3Timeline.kill();
            subtext3Timeline = null;
          }

          gsap.set(title, { opacity: 0, y: 50 });
          gsap.set(gridContainer, { opacity: 0, display: 'none' });
          gsap.set(grid1, { opacity: 0, x: -150 });
          gsap.set([grid2, grid3], { opacity: 0, x: 150 });
          currentIndex = 0;
          subtext.textContent = subtexts[currentIndex];
          subtext2.textContent = subtexts2[currentIndex];
          subtext3.textContent = subtexts3[currentIndex];
          gsap.set(subtext, { opacity: 0, y: 0, scale: 1 });
          gsap.set(subtext2, { opacity: 0, y: 0, scale: 1 });
          gsap.set(subtext3, { opacity: 0, y: 0, scale: 1 });
        },
      },
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    })
      .to(title, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.in',
        delay: 0.5,
      })
      .set(gridContainer, { opacity: 1, display: 'grid' })
      .to(
        grid1,
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power4.out',
        },
        '-=0.5'
      )
      .to(
        grid2,
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power4.out',
        },
        '-=1.3'
      )
      .to(
        grid3,
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power4.out',
          onComplete: () => {
            // Mark animations as complete after the last grid animation
            section.setAttribute('data-animations-complete', 'true');
          }
        },
        '-=1.1'
      );

    const createSubtextAnimation = () => {
      if (subtextTimeline) {
        subtextTimeline.kill();
      }

      subtextTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0,
        defaults: { ease: "power3.inOut" },
      });

      subtexts.forEach((text, index) => {
        const isFirst = index === 0;

        subtextTimeline!
          .set(subtext, { textContent: text }, isFirst ? 0 : ">")
          .fromTo(
            subtext,
            { opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power3.out",
            },
            isFirst ? 0 : ">"
          )
          .to(subtext, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2.5,
            ease: "none",
          })
          .to(subtext, {
            opacity: 0,
            y: -30,
            scale: 0.95,
            filter: "blur(4px)",
            duration: 1.2,
            ease: "power3.in",
          });
      });
    };

    const createSubtext2Animation = () => {
      if (subtext2Timeline) {
        subtext2Timeline.kill();
      }

      subtext2Timeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0,
        defaults: { ease: "power3.inOut" },
      });

      subtexts2.forEach((text, index) => {
        const isFirst = index === 0;

        subtext2Timeline!
          .set(subtext2, { textContent: text }, isFirst ? 0 : ">")
          .fromTo(
            subtext2,
            { opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power3.out",
            },
            isFirst ? 0 : ">"
          )
          .to(subtext2, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2.5,
            ease: "none",
          })
          .to(subtext2, {
            opacity: 0,
            y: -30,
            scale: 0.95,
            filter: "blur(4px)",
            duration: 1.2,
            ease: "power3.in",
          });
      });
    };

    const createSubtext3Animation = () => {
      if (subtext3Timeline) {
        subtext3Timeline.kill();
      }

      subtext3Timeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0,
        defaults: { ease: "power3.inOut" },
      });

      subtexts3.forEach((text, index) => {
        const isFirst = index === 0;

        subtext3Timeline!
          .set(subtext3, { textContent: text }, isFirst ? 0 : ">")
          .fromTo(
            subtext3,
            { opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power3.out",
            },
            isFirst ? 0 : ">"
          )
          .to(subtext3, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2.5,
            ease: "none",
          })
          .to(subtext3, {
            opacity: 0,
            y: -30,
            scale: 0.95,
            filter: "blur(4px)",
            duration: 1.2,
            ease: "power3.in",
          });
      });
    };

    tl.add(() => {
      subtext.textContent = subtexts[0];
      subtext2.textContent = subtexts2[0];
      subtext3.textContent = subtexts3[0];
      gsap.set(subtext, { opacity: 0, y: 20, scale: 0.95, filter: 'blur(3px)' });
      gsap.set(subtext2, { opacity: 0, y: 20, scale: 0.95, filter: 'blur(3px)' });
      gsap.set(subtext3, { opacity: 0, y: 20, scale: 0.95, filter: 'blur(3px)' });
      
      createSubtextAnimation();
      createSubtext2Animation();
      createSubtext3Animation();
    }, '-=0.5');

    return () => {
      if (subtextTimeline) {
        subtextTimeline.kill();
      }
      if (subtext2Timeline) {
        subtext2Timeline.kill();
      }
      if (subtext3Timeline) {
        subtext3Timeline.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([title, gridContainer, grid1, grid2, grid3, subtext, subtext2, subtext3]);
    };
  }, []);

  return (
    <div ref={sectionRef} className="service-provide-section py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black text-center font-heading w-full uppercase"
          initial={{ opacity: 0 }}
        >
          What We Do
        </motion.h2>
        <div ref={gridContainerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <motion.div
            ref={grid1Ref}
            className="bento-grid backdrop-blur-xl bg-transparent border-2 border-white shadow-lg p-6 rounded-2xl flex flex-col items-center justify-between relative bento1 overflow-visible"
            initial={{ opacity: 0 }}
          >
            <div className="relative w-full flex justify-center gap-5">
              <img
                src={wedobento1}
                alt="We Do Creative"
                className="w-44 h-40 sm:w-52 sm:h-48 md:w-52 md:h-60 lg:w-60 lg:h-72 2xl:w-72 2xl:h-80 rounded-xl drop-shadow-lg relative top-12 lg:top-20 -z-10 -rotate-12"
              />
              <img
                src={wedobento1o1}
                alt="We Do Creative"
                className="w-44 h-40 sm:w-48 sm:h-40 md:w-72 md:h-60 lg:w-60 lg:h-72 2xl:w-72 2xl:h-80 rounded-xl drop-shadow-lg -mt-8"
              />
            </div>
            <div className="text-center flex flex-col w-fit h-full">
              <div className="grid grid-cols-1 w-full items-center h-fit text-right gap-6">
                <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl xs:text-6xl font-bold text-black mb-2 font-heading">We Do Creative</h3>
                <p
                  ref={subtextRef}
                  className="text-[#4A44DE] text-2xl md:text-3xl font-bold font-heading min-h-[32px] flex items-center justify-center tracking-wide sketch-border"
                  style={{
                    textShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    backfaceVisibility: "hidden",
                    perspective: "1200px",
                    willChange: "transform, opacity",
                  }}
                >
                </p>
              </div>
              <div className="flex flex-col gap-2 text-sm text-black font-bold font-body mt-6 text-left">
                <motion.span
                  ref={span1Ref}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  -- We craft stunning websites and powerful apps that bring your ideas to life.
                </motion.span>
                <motion.span
                  ref={span2Ref}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                >
                  -- Our goal is to make digital solutions simple, effective, and built just for you.
                </motion.span>
              </div>
            </div>
          </motion.div>
          <div className="flex flex-col gap-4 md:gap-6">
            <motion.div
              ref={grid2Ref}
              className="bento-grid backdrop-blur-xl bg-transparent border-2 border-white shadow-lg p-6 rounded-2xl flex items-center justify-center relative bento2"
              initial={{ opacity: 0 }}
            >
              <div className="text-center flex flex-col w-full justify-evenly h-full">
                <div className="grid grid-cols-1 w-full items-center h-fit text-right gap-6">
                  <h3 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl 2xl:text-7xl xs:text-5xl font-bold text-black mb-2 font-heading">We craft stunning</h3>
                  <p
                    ref={subtext2Ref}
                    className="text-[#CDFE64] text-2xl sm:text-3xl lg:text-4xl md:text-3xl 2xl:text-5xl font-bold font-heading min-h-[32px] flex items-center justify-center tracking-wide sketch-border"
                    style={{
                      textShadow: "0 2px 6px rgba(0,0,0,0.08)",
                      backfaceVisibility: "hidden",
                      perspective: "1200px",
                      willChange: "transform, opacity",
                    }}
                  >
                  </p>
                </div>
                <div className="absolute -top-3 -left-12 sm:-left-8 md:top-1 md:left-1 -z-10">
                  <img src={wedobento2} alt="Fuel Your Hustle" className="flex w-44 h-40 sm:w-52 sm:h-44 md:w-60 md:h-52 lg:w-52 lg:h-56 2xl:w-52 2xl:h-56 rounded-xl" />
                </div>
                <div className="flex flex-col gap-2 text-sm text-black font-bold font-body mt-4 text-left">
                  <motion.span
                    ref={span3Ref}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    UI and Graphics that bring your ideas to life.
                  </motion.span>
                </div>
              </div>
            </motion.div>
            <motion.div
              ref={grid3Ref}
              className="bento-grid backdrop-blur-xl bg-transparent border-2 border-white shadow-lg p-6 rounded-2xl flex items-center justify-center relative bento3"
              initial={{ opacity: 0 }}
            >
              <div className="text-center flex flex-col w-full justify-evenly h-full">
                <div className="grid grid-cols-1 w-full items-center h-fit text-right gap-6">
                  <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xs:text-6xl font-bold text-black mb-2 font-heading">We Do Creative</h3>
                  <p
                    ref={subtext3Ref}
                    className="text-[#530304] text-2xl md:text-3xl font-bold font-heading min-h-[32px] flex items-center justify-center tracking-wide sketch-border"
                    style={{
                      textShadow: "0 2px 6px rgba(0,0,0,0.08)",
                      backfaceVisibility: "hidden",
                      perspective: "1200px",
                      willChange: "transform, opacity",
                    }}
                  >
                  </p>
                </div>
                <div className="absolute -top-5 -left-12 sm:-left-10 md:top-1 md:left-1 -z-10">
                  <img src={wedobento3} alt="Sound of the Streets" className="flex w-40 h-40 md:w-52 md:h-52 lg:w-48 lg:h-48 2xl:w-56 2xl:h-56 rounded-xl" />
                </div>
                <div className="flex flex-col gap-2 text-sm text-black font-bold font-body mt-8 sm:mt-10 md:mt-20 lg:mt-5 text-left">
                  <motion.span
                    ref={span4Ref}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    We design smart, creative strategies that boost your online presence and grow your brand with ease.
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div ref={setRefs} className="h-0 w-full mt-4" />
      </div>
    </div>
  );
});

export default Serviceprovide;