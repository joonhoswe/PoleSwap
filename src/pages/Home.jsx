import { Link } from 'react-router-dom';
import { RoutePaths } from '../general/RoutePaths';

export const Home = () => {
  return (
    <div className="flex flex-col flex-1 py-8">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 text-center mb-2 md:mb-6">
          Gear Up For Your Next <span className="text-blue-500">PR</span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl text-center mb-12 md:mb-8">
          The first marketplace made for poles.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link 
            to={RoutePaths.LISTINGS} 
            className="flex justify-center items-center w-full sm:w-auto text-center px-6 py-3 text-sm md:text-base font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          >
            Browse Poles
          </Link>
          <Link 
            to={RoutePaths.SELL} 
            className="flex justify-center items-center w-full sm:w-auto text-center px-6 py-3 text-sm md:text-base font-semibold text-blue-500 border-2 border-blue-500 rounded-full hover:bg-blue-50 transition-colors"
          >
            Sell Poles
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12">
            <FeatureCard 
              icon="location"
              title="Local First"
              description="Find poles in your area"
            />
            <FeatureCard 
              icon="verify"
              title="Live Listings"
              description="View poles actively for sale"
            />
            <FeatureCard 
              icon="chat"
              title="Direct Contact"
              description="Connect directly with sellers"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  const icons = {
    location: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    ),
    verify: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    chat: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    )
  };

  return (
    <div className="text-center p-6 bg-white rounded-lg">
      <div className="mb-4 text-blue-500">
        <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icons[icon]}
        </svg>
      </div>
      <h3 className="md:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm md:text-base text-gray-600">{description}</p>
    </div>
  );
};

export default Home;