import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, MessageCircle, Heart } from "lucide-react";

export const CurrentListing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get/${id}/`);
        if (!response.ok) throw new Error("Failed to fetch listing");
        const data = await response.json();
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
  
  if (error) return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>
    </div>
  );
  
  if (!listing) return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-gray-500">No listing found</div>
    </div>
  );

  const feet = Math.floor(listing.length);
  const inches = Math.round((listing.length - feet) * 12);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? listing.image_urls.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === listing.image_urls.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full min-h-screen px-4 py-8">
      <div className="bg-white rounded-xl shadow-md">
        <div className="flex flex-col lg:flex-row">
          {/* Image Gallery Section */}
          <div className="lg:w-2/3 p-6">
            <div className="relative">
              {/* Main Image */}
              <div 
                className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 mb-4"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                {listing.image_urls && listing.image_urls.length > 0 ? (
                  <img
                    src={listing.image_urls[selectedImageIndex]}
                    alt={`${listing.title}`}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isZoomed ? 'scale-110' : 'scale-100'
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
                
                {/* Navigation Arrows */}
                {listing.image_urls && listing.image_urls.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {listing.image_urls && listing.image_urls.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {listing.image_urls.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`flex-shrink-0 relative ${
                        selectedImageIndex === idx 
                          ? 'ring-2 ring-blue-500' 
                          : 'hover:opacity-75'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`thumbnail-${idx + 1}`}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/3 p-6 border-t lg:border-t-0 lg:border-l border-gray-100">
            <div className="sticky top-6">
              {/* Tags */}
              {/* <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  listing.condition?.toLowerCase() === "new"
                    ? "bg-green-50 text-green-600"
                    : "bg-amber-50 text-amber-600"
                }`}>
                  {listing.condition}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                  {listing.brand}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-medium">
                  {feet}'{inches}"
                </span>
              </div> */}

              {/* Title & Price */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {listing.title}
              </h1>
              <p className="text-3xl font-bold text-blue-600 mb-6">
                ${listing.price}
              </p>

              {/* Specs */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-medium">{listing.weight} lbs</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Length</span>
                  <span className="font-medium">{feet}' {inches}"</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-medium">{listing.condition}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {listing.description || "No description available."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  Contact Seller
                </button>
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                  <Heart className="w-5 h-5" />
                  Save to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentListing;