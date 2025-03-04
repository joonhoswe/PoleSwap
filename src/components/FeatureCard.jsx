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
      <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 max-w-sm mx-auto sm:mx-0">
        <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4 sm:mb-5">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icons[icon]}
          </svg>
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
      </div>
    );
};

export default FeatureCard;
