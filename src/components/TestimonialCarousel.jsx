import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      content: "PoleSwapper helped me find the perfect pole for my height and weight. The seller was just 30 minutes away, and I saved over $300 compared to buying new!",
      author: "Michael T.",
      role: "High School Vaulter",
      rating: 5
    },
    {
      id: 2,
      content: "I had three old poles sitting in my garage for years. Listed them on PoleSwapper and sold all three within a week. The process couldn't have been easier.",
      author: "Sarah K.",
      role: "College Coach",
      rating: 5
    },
    {
      id: 3,
      content: "The direct messaging feature made it easy to ask detailed questions about the pole's condition before making the drive to see it. Exactly as described!",
      author: "Alex R.",
      role: "College Vaulter",
      rating: 5
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const intervalRef = useRef(null);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left, go to next
      nextTestimonial();
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right, go to previous
      prevTestimonial();
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="w-full mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">What Vaulters Are Saying</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">Hear from the community about their experiences with PoleSwap.</p>
        </div>
        
        <div className="relative max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-8 sm:px-10">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <div 
              className={`flex transition-transform duration-500 ease-in-out ${isAnimating ? 'opacity-80' : 'opacity-100'}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-white p-4 sm:p-5 md:p-6">
                    <div className="flex mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm mr-3">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">{testimonial.author}</h4>
                        <p className="text-gray-500 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevTestimonial} 
            className="absolute left-0 sm:left-0 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 sm:right-0 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
          
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAnimating(true);
                  setCurrentIndex(i);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel; 