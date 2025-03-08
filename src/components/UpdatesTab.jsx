import React from 'react';

const UpdatesTab = () => {
  const updates = [
    {
      version: "v1.1.0",
      date: "Expected End of March 2025",
      features: [
        "Sell pole vault pits, spikes, and other vaulting equipment",
        "Direct 1-on-1 messaging with sellers",
        "Filter listings within 10, 25, or 50 miles of your zip code"
      ],
      isUpcoming: true
    },
    {
        version: "v1.0.1",
        date: "March 8th 2025",
        features: [
          "Added filtering by flex",
          "Added FiberSport brand",
          "Filter listings by a range of length and weights",
        ]
    },
    {
      version: "v1.0.0",
      date: "March 6th 2025",
      features: [
        "Integrated filter functionality",
        "Added user profiles",
      ]
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Updates & Changelog</h1>
      <p className="text-center mb-8">PoleSwapper is still in beta. Here are the latest updates and changes to the platform. As always, please leave any suggestions or feedback through the Contact Us page.</p>
      
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        {updates.map((update, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-lg border shadow-sm ${
              update.isUpcoming 
                ? 'border-blue-200 bg-blue-50' 
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xl text-gray-800 flex items-center">
                {update.version}
                {update.isUpcoming && (
                  <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    Coming Soon
                  </span>
                )}
              </h3>
              <span className="text-sm text-gray-500">{update.date}</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {update.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="pl-2">{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdatesTab; 