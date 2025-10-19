import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  LogOut
} from 'lucide-react';
import logo from '../assets/logoimg2.png'

export function Footer() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/dashboard');
  };

  return (
    <footer className="max-w-full 2xl:px-28 lg:px-40 md:px-40 sm:px-10 xs:px-5 justify-center bg-[#E6E1DD] text-white relative flex  rounded-3xl border-2 border-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/4 w-16 h-16 border border-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-white rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="2xl:px-0 lg:px-20 md:px-8 sm:px-8 xs:px-2 py-12 relative z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-3 mb-12">

          {/* Agency Info */}
          <div className="lg:col-span-1 w-full footerbackimg h-[20rem]">
            <div className="flex items-center gap-3 mb-6">
              <div className="2xl:w-32 lg:w-32 md:w-32 sm:w-24 xs:w-20  rounded-full md:relative md:-left-4 sm:relative xs:relative sm:-top-16 sm:-left-10 xs:-top-10 xs:-left-7">
                <img src={logo} alt="" />
              </div>
              <div>
                {/* <h3 className="nexa-forge text-[10rem] ">
                  Nexa Forge
                </h3> */}
               
              </div>
            </div>
            <p className="text-black 2xl:text-xl lg:text-md md:text-sm sm:text-xs xs:text-xs 2xl:mt-52 lg:mt-52 md:mt-48 sm:mt-52 xs:mt-52 font-body">
              We are a creative digital agency specializing in innovative solutions that drive business growth and user engagement.
            </p>
          </div>

        
         
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Copyright & Links */}
            <div className="text-center md:text-left">
              <p className="text-sm text-black mb-2">
                &copy; {new Date().getFullYear()} Nexa FORGE All rights reserved.
              </p>
              <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  Terms of Service
                </Link>
                <Link to="/contact" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  Contact Us
                </Link>
                <Link to="/portfolio" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  Portfolio
                </Link>
              </div>
            </div>

            {/* Authentication Section */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="relative group" aria-label="User menu">
                  {/* User Avatar */}
                  <div className="cursor-pointer">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border-2 border-gray-600 hover:border-blue-400 transition-all duration-200 hover:shadow-lg hover:shadow-blue-400/20"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium hover:from-blue-400 hover:to-purple-400 transition-all duration-200 hover:shadow-lg hover:shadow-blue-400/20">
                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 bottom-full mb-2 w-52 bg-[rgba(0,0,0,0.8)] rounded-xl shadow-xl border border-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 backdrop-blur-sm">
                    <div className="py-3">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-black">
                        <div className="font-medium text-white">{user.displayName || 'User'}</div>
                        <div className="text-gray-400 text-xs mt-1">{user.email}</div>
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs text-green-400">Online</span>
                        </div>
                      </div>
                      
                      {/* Logout Button */}
                      <div className="border-t border-gray-700 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors flex items-center gap-3"
                          aria-label="Sign out"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/auth?mode=signin"
                    className="text-black button-55  text-sm font-medium transition-colors px-4 py-2 rounded-lg "
                    aria-label="Sign in"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    className="button-55 text-black px-3 py-2"
                    aria-label="Sign up"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info & Social Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8 pt-6 border-t border-gray-700">
            {/* Contact Info */}
            <div className="flex flex-col md:flex-row gap-6 2xl:text-sm lg:text-sm md:text-xs text-black">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@techcraft.agency" className="hover:scale-110 transition-all">
                  nexaforgelabs@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+1234567890" className="hover:scale-110 transition-all">
                  +91 7638038626
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Jorhat, Assam</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="#twitter" 
                className="2xl:w-10 2xl:h-10 lg:w-10 lg:h-10 md:w-6 md:h-6 bg-white hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg group" 
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5 text-black group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#linkedin" 
                className="2xl:w-10 2xl:h-10 lg:w-10 lg:h-10 md:w-6 md:h-6 bg-white hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg group" 
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-black group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#instagram" 
                className="2xl:w-10 2xl:h-10 lg:w-10 lg:h-10 md:w-6 md:h-6 bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg group" 
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5 text-black group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#github" 
                className="2xl:w-10 2xl:h-10 lg:w-10 lg:h-10 md:w-6 md:h-6 bg-white hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg group" 
                aria-label="Follow us on GitHub"
              >
                <Github className="w-5 h-5 text-black group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div 
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse" 
          style={{ animationDelay: '1s' }}
        ></div>
        <div 
          className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" 
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/2 w-1 h-1 bg-pink-400 rounded-full animate-pulse" 
          style={{ animationDelay: '1.5s' }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" 
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div 
          className="absolute top-16 right-16 w-4 h-4 border border-blue-400 rotate-45 animate-spin" 
          style={{ animationDuration: '20s' }}
        ></div>
        <div 
          className="absolute bottom-32 left-16 w-6 h-6 border border-purple-400 rounded-full animate-bounce" 
          style={{ animationDuration: '3s' }}
        ></div>
        <div 
          className="absolute top-1/3 left-1/3 w-3 h-3 bg-green-400 rotate-45 animate-ping" 
          style={{ animationDuration: '4s' }}
        ></div>
      </div>
    </footer>
  );
}