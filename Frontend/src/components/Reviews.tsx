/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import axios from 'axios';

interface Review {
  _id: string;
  userId: string;
  displayName: string;
  heading: string;
  content: string;
  createdAt: string;
}

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data.slice(0, 8)); // Limit to 8 reviews
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err: any) {
        setError('Failed to fetch reviews');
      }
    };
    fetchReviews();
  }, []);

  // Handle review submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to submit a review');
      return;
    }
    if (!heading || !content) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get fresh Firebase ID token
      const token = await user.getIdToken();
      const response = await axios.post(
        'http://localhost:5000/api/reviews',
        {
          userId: user.uid,
          displayName: user.displayName || 'Anonymous',
          heading,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews((prev) => [response.data, ...prev].slice(0, 8)); // Add new review to top, limit to 8
      setHeading('');
      setContent('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-7xl font-bold text-black mb-4 text-center font-heading">
          What Our Community Say
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center font-body">
          Discover what our community thinks about their experience with us. Share your own feedback below!
        </p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 w-full">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              className="p-6 rounded-2xl shadow-lg border-2 border-black bg-white/90 backdrop-blur-sm transition-transform flex flex-col w-full hover:scale-110 hover:z-10 cursor-pointer"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <h3 className="text-xl font-bold text-black mb-5 font-heading text-left">{review.heading}</h3>
              <p className="text-gray-600 mb-4 font-body text-left text-sm">{review.content}</p>
              <p className="text-sm text-black font-bold font-body text-left mt-5 sketch-border3 ">
                ~ {review.displayName}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Review Input Section */}
        {user ? (
          <div className="max-w-2xl mx-auto ">
            <h3 className="text-5xl font-bold text-gray-900 mb-6 font-heading">Share Your Experience</h3>
            {error && <p className="text-red-500 mb-4 font-body">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-black mb-2 mt-5 font-body text-left">
                  Review Heading
                </label>
                <input
                  type="text"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 disabled:opacity-50 font-body"
                  placeholder="Enter your review heading"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2 font-body text-left">
                  Your Review
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 disabled:opacity-50 font-body"
                  placeholder="Share your experience..."
                  rows={4}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full button-55 py-5 hover:scale-105  transition-all font-bold text-xl  font-body"
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        ) : (
          <p className="text-center text-gray-600 font-body">
            Please <a href="/auth?mode=signin" className="text-indigo-600 hover:text-indigo-500">sign in</a> to submit a review.
          </p>
        )}
      </div>
    </div>
  );
}