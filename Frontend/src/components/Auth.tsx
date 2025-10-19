/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, easeInOut } from 'framer-motion';
import { Loading } from './Loading';
import loginimg from '../assets/logingif.gif';
import signupimg from '../assets/signupgif.gif';
import axios from 'axios';

export function Auth() {
  const { user, login, loginWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Set initial auth mode based on URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    setIsSignUp(mode === 'signup');
  }, [location.search]);

  // Redirect to dashboard when user is logged in
  useEffect(() => {
    if (user) {
      user.getIdToken().then((token) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      });
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  // Don't render anything if user is logged in (will be redirected)
  if (user) {
    return <Loading />;
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, displayName);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);
    try {
      await login();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for Framer Motion (form card)
  const cardVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeInOut } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3, ease: easeInOut } },
  };

  // Animation variants for image transition
  const imageVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeInOut } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3, ease: easeInOut } },
  };

  return (
    <div className="h-screen w-full relative  items-center bg-transparent  flex flex-col justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-transparent blur-3xl"></div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 rounded-full bg-transparent blur-3xl"></div>
      </div>

     
     

      <div className="relative h-[90vh] flex w-[70vw] justify-center items-center  backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border-2 border-black">
       {/* Back to Dashboard Button */}
       <div className="absolute top-4 left-4 z-10">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center px-4 py-2 text-sm font-body text-black bg-gradient-to-tr from-[#ffffff] via-[#fdfcf7] to-[#f9f5ec] backdrop-blur-sm hover:bg-white/90 rounded-full shadow-sm border border-black hover:border-black/80 transition-all duration-200 group"
        >
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative">
          <div className="max-w-sm w-full flex flex-col items-center">
            {/* Illustration Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute top-10 left-20 w-16 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg transform rotate-12 opacity-60 -z-10"></div>
              <div className="absolute top-32 right-16 w-12 h-16 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-lg transform -rotate-12 opacity-60 -z-10"></div>
              {/* Floating elements behind the image */}
              <div className="absolute inset-0 z-0">
                <div className="absolute -top-4 left-8 w-6 h-6 bg-blue-200 rounded-full animate-float-1"></div>
                <div className="absolute top-8 -right-4 w-4 h-4 bg-indigo-200 rounded-full animate-float-2"></div>
                <div className="absolute -bottom-2 left-16 w-5 h-5 bg-purple-200 rounded-full animate-float-3"></div>
                <div className="absolute top-16 left-4 w-3 h-3 bg-pink-200 rounded-full animate-float-4"></div>
                <div className="absolute bottom-8 right-8 w-4 h-4 bg-cyan-200 rounded-full animate-float-5"></div>
                <div className="absolute top-24 right-24 w-2 h-2 bg-yellow-200 rounded-full animate-float-6"></div>
              </div>
              {/* Animated Image */}
              <motion.div
                key={isSignUp ? 'signup-img' : 'login-img'}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <img 
                  src={isSignUp ? signupimg : loginimg} 
                  alt={isSignUp ? 'Signup Illustration' : 'Login Illustration'} 
                  className="2xl:max-w-2xl lg:max-w-xl h-full object-contain z-10 relative top-10"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-6">
          <motion.div
            className="max-w-md w-full font-body"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <form onSubmit={handleEmailAuth} className="space-y-6">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-left font-body">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={loading}
                    className="w-full font-body px-4 py-2.5 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 disabled:opacity-50 placeholder:text-xs"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left font-body">
                  {isSignUp ? 'Email' : 'Username Or Email'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full font-body px-4 py-2.5 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 disabled:opacity-50 placeholder:text-xs"
                  placeholder={isSignUp ? "Enter your email" : "Enter your email or username"}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left font-body">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full font-body px-4 py-2.5 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 disabled:opacity-50 placeholder:text-xs"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-left font-body">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    className="w-full font-body px-4 py-2.5 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 disabled:opacity-50 placeholder:text-xs"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-600">Remember Me</span>
                  </label>
                  <button
                    type="button"
                    className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full button-55 px-5 py-3 text-lg font-bold font-body"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Please wait...
                  </div>
                ) : (
                  isSignUp ? 'Sign Up' : 'Login'
                )}
              </button>

              <div className="text-center">
                <span className="text-gray-600 text-sm">
                  {isSignUp ? "Already Have An Account? " : "Don't Have An Account? "}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setDisplayName('');
                    navigate(`/auth?mode=${!isSignUp ? 'signup' : 'signin'}`, { replace: true });
                  }}
                  className="text-black/70 hover:text-black font-semibold text-sm transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Click Here'}
                </button>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="w-full px-5 py-2 text-sm font-semibold font-body flex items-center justify-center gap-3 bg-transparent rounded-lg shadow-md border border-black hover:shadow-lg transition"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Sign In with Google</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}