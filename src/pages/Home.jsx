import { Link } from 'react-router-dom';
import { RoutePaths } from '../general/RoutePaths';
import { ArrowRight, Users, Star, ShoppingBag, Award } from 'lucide-react';
import TestimonialCarousel from '../components/TestimonialCarousel';  
import FeatureCard from '../components/FeatureCard';
import mondo from '../assets/mondo.jpg';
import Slider from 'react-infinite-logo-slider';
import essx from '../assets/essx.png';
import ucs from '../assets/ucs.png';
import pacer from '../assets/pacer.png';
import nordic from '../assets/nordic.png';

export const Home = () => {
  return (
    <div className="flex flex-col flex-1 overflow-x-hidden w-full">
      {/* Hero Section - Enhanced with background gradient and image */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="w-full mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          <div className="py-10 sm:py-16 md:py-20 lg:py-24 flex flex-col md:flex-row items-center relative z-10">
            <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0 relative z-10 text-center md:text-left">
              <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                Find the perfect pole for your next <span className="text-blue-600 relative">
                  PR
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-100 -z-10 transform -rotate-1"></span>
                </span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8">
                The first online marketplace made specifically for vaulters. 
                Connect with sellers, find great deals, and vault higher.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 relative z-10 max-w-xs sm:max-w-md mx-auto md:mx-0">
                <Link 
                  to={RoutePaths.LISTINGS} 
                  className="flex justify-center items-center gap-2 w-full text-center px-5 py-3 text-sm sm:text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md relative z-10"
                >
                  Browse Poles
                  <ArrowRight size={16} className="sm:hidden" />
                  <ArrowRight size={18} className="hidden sm:block" />
                </Link>
                <Link 
                  to={RoutePaths.SELL} 
                  className="flex justify-center items-center w-full text-center px-5 py-3 text-sm sm:text-base font-semibold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors relative z-10"
                >
                  Sell Poles
                </Link>
              </div>
              {/* <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-${i*100} flex items-center justify-center text-white text-xs font-bold`}>
                      {i}
                    </div>
                  ))}
                </div>
                <p className="ml-4 text-sm text-gray-600">Trusted by <span className="font-semibold">hundreds</span> of vaulters nationwide</p>
              </div> */}
            </div>
            <div className="w-full md:w-1/2 relative px-4 sm:px-0 mt-8 md:mt-0">
              <div className="relative rounded-xl overflow-hidden shadow-xl pointer-events-none max-w-md mx-auto md:max-w-none">
                <img 
                  src={mondo}
                  alt="Pole vaulter in action" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Brand Slider */}
      <div className="bg-white py-12 sm:py-16 md:py-20 w-full overflow-hidden">
        <div className="w-full mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8">Featuring brands such as:</h2>
          <div className="w-full overflow-hidden max-w-[calc(100vw-40px)] mx-auto">
            <Slider
              duration={30}
              blurBorders={false}
              blurBorderColor={'#fff'}
              className="max-w-full"
            >
              <Slider.Slide>
                <img src={essx} alt="Essx Logo" className="w-24 sm:w-28 md:w-36 h-auto mx-2 sm:mx-4" />
              </Slider.Slide>
              <Slider.Slide>
                <img src={ucs} alt="UCS Spirit Logo" className="w-24 sm:w-28 md:w-36 h-auto mx-2 sm:mx-4" />
              </Slider.Slide>
              <Slider.Slide>
                <img src={pacer} alt="Pacer Logo" className="w-24 sm:w-28 md:w-36 h-auto mx-2 sm:mx-4" />
              </Slider.Slide>
              <Slider.Slide>
                <img src={nordic} alt="Nordic Logo" className="w-24 sm:w-28 md:w-36 h-auto mx-2 sm:mx-4" />
              </Slider.Slide>
            </Slider>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <Users size={32} className="text-blue-600 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600 text-center">Active Vaulters</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <ShoppingBag size={32} className="text-blue-600 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">1,200+</h3>
              <p className="text-gray-600 text-center">Poles Listed</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <Award size={32} className="text-blue-600 mb-3" />
              <h3 className="text-3xl font-bold text-gray-900">98%</h3>
              <p className="text-gray-600 text-center">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Features Section - Enhanced with better styling */}
      <div className="bg-white py-16 sm:py-20 md:py-24">
        <div className="w-full mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-4">Why Choose PoleSwapper?</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">We've built the perfect platform for vaulters to find and sell poles with ease.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-md sm:max-w-none mx-auto">
            <FeatureCard 
              icon="location"
              title="Local First"
              description="Find poles in your area to save on shipping costs and inspect before buying."
            />
            <FeatureCard 
              icon="verify"
              title="Live Listings"
              description="Browse poles that are actually available, with real-time updates on status."
            />
            <FeatureCard 
              icon="chat"
              title="Direct Contact"
              description="Connect directly with sellers to ask questions and negotiate the best deal."
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16 sm:py-20 md:py-24">
        <div className="w-full mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-4">How It Works</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">Getting your next pole or selling your current one is simple with PoleSwap.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-md sm:max-w-none mx-auto">
            <div className="relative px-3">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg sm:text-xl">1</div>
              <div className="pt-14 sm:pt-16 px-4 sm:px-6 pb-6 sm:pb-8 bg-white rounded-lg shadow-sm text-center">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Create an Account</h3>
                <p className="text-sm text-gray-600">Sign up for free and set up your profile to start browsing or selling poles.</p>
              </div>
            </div>
            <div className="relative px-3">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg sm:text-xl">2</div>
              <div className="pt-14 sm:pt-16 px-4 sm:px-6 pb-6 sm:pb-8 bg-white rounded-lg shadow-sm text-center">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Browse or List</h3>
                <p className="text-sm text-gray-600">Search for poles that match your needs or list your pole for sale.</p>
              </div>
            </div>
            <div className="relative px-3 sm:col-span-2 md:col-span-1 sm:mx-auto md:mx-0 sm:max-w-sm md:max-w-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg sm:text-xl">3</div>
              <div className="pt-14 sm:pt-16 px-4 sm:px-6 pb-6 sm:pb-8 bg-white rounded-lg shadow-sm text-center">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Connect & Complete</h3>
                <p className="text-sm text-gray-600">Message sellers, arrange meetups, and finalize your transaction safely.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Carousel */}
      <TestimonialCarousel />

      {/* CTA Section */}
      <div className="bg-gray-900 py-16 sm:py-20 w-full overflow-hidden">
        <div className="w-full mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-5">Ready to find your perfect pole?</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">Join hundreds of vaulters who have already found their ideal equipment through PoleSwap.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xs sm:max-w-md mx-auto">
            <Link 
              to={RoutePaths.LISTINGS} 
              className="px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-md w-full"
            >
              Browse Poles
            </Link>
            <Link 
              to={RoutePaths.SELL} 
              className="px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md w-full"
            >
              Sell Your Pole
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;