import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import contactimg  from '../assets/contactimg.png'

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Contact({ isOpen, onClose }: ContactProps) {
  const contactRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const contact = contactRef.current;
    const overlay = overlayRef.current;
    if (!contact || !overlay) return;

    if (isOpen) {
      contact.style.display = 'block';
      overlay.style.display = 'block';
      
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }
      );

      gsap.fromTo(
        contact,
        { 
          x: '100%', 
          opacity: 0,
          scale: 0.95 
        },
        {
          x: '0%',
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });

      gsap.to(contact, {
        x: '100%',
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          contact.style.display = 'none';
          overlay.style.display = 'none';
          setStatus('idle'); // Reset status when closing
          setErrorMessage('');
        },
      });
    }
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      // const response = await fetch('https://nexaforge-fullservice-digital-agency-1.onrender.com/api/contact', {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      form.reset();
      setTimeout(() => {
        onClose(); // Close modal after 2 seconds
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send your message. Please try again later.');
    }
  };

  return (
    <>
      {/* Background overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
        style={{ display: 'none' }}
        onClick={onClose}
      />

      {/* Contact Modal */}
      <motion.div
        ref={contactRef}
        className="fixed 2xl:top-2 lg:top-4 md:top-4 sm:top-8 xs:top-2 right-3 2xl:h-[45rem] lg:h-[42rem] md:[38rem] sm:[20rem] w-full md:w-[500px] sm:w-[400px] xs:w-[350px] bg-[#EEE8DA] shadow-2xl z-50 overflow-y-auto rounded-2xl"
        style={{ display: 'none' }}
      >
        <div className="p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center 2xl:mb-8 lg:mb-2 border-b border-black pb-6">
            <div className=''>
              <h2 className="2xl:text-5xl lg:text-3xl md:text-3xl sm:text-2xl xs:text-2xl font-bold text-black font-heading">Let's Create</h2>
              <p className="text-black mt-2 font-body text-left 2xl:text-xl lg:text-md md:text-md sm:text-sm xs:text-xs font-semibold">Get in touch with us</p>
            </div>
            <button
              onClick={onClose}
              className="text-black  text-xl rounded-full relative -top-10 -right-3"
              aria-label="Close contact form"
            >
              <X className="text-xl" />
            </button>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-6 sm:mt-3 xs:mt-3">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-black mb-2 font-heading text-left">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border-2 border-black rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all duration-200 font-body xs:text-sm"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-black mb-2 font-heading text-left">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="w-full border-2 border-black rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all duration-200 font-body resize-none xs:text-sm"
                placeholder="Tell us about your project requirements..."
                rows={4}
              ></textarea>
            </div>

            {/* Status Messages */}
            {status === 'sending' && (
              <p className="text-black font-body">Sending your message...</p>
            )}
            {status === 'success' && (
              <p className="text-green-600 font-body">Message sent successfully! We'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 font-body">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full button-55 py-4 gap-4 font-bold font-body disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>

          {/* Additional Info */}
          <div className=" pt-6 border-t border-gray-200 flex 2xl:flex-col  items-center justify-center">
            <img src={contactimg} alt="Contact Us" className='2xl:w-52 lg:w-40 md:w-40 sm:w-20 xs:w-28' />
            <p className="text-sm text-gray-600 text-center font-body">
              We typically respond within 24 hours
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        
        <div className="absolute bottom-40 right-12 w-16 h-16 bg-purple-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-4 w-12 h-12 bg-green-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </motion.div>
    </>
  );
}