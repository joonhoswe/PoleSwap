import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, MessageCircle, Heart, Pencil } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { EditButton } from "../components/EditListingDialog";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../general/RoutePaths";

export const CurrentListing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const navigate = useNavigate();

  const { user, isSignedIn } = useUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  const [showSignInModal, setShowSignInModal] = useState(false);

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

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-gray-500">No listing found</div>
      </div>
    );
  }

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

  const handleToggleSave = async () => {
    if (!isSignedIn || !userEmail) {
      setShowSignInModal(true);
      return;
    }

    const isSaved = listing.saved?.includes(userEmail);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/patch/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: listing.id,
          email: userEmail,
          remove: isSaved,
        }),
      });

      if (!response.ok) {
        throw new Error(isSaved ? "Failed to unsave listing." : "Failed to save listing.");
      }

      const data = await response.json();
      setListing((prev) => ({ ...prev, saved: data.saved }));
    } catch (err) {
      console.error("Error toggling save:", err);
      alert("Could not update the listing. Please try again.");
    }
  };

  const handleContact = () => {
    if (!isSignedIn || !userEmail) {
      setShowSignInModal(true);
      return;
    }
    alert("Please contact owner at: " + listing.owner);
  };

  const isUserSaved = listing.saved?.includes(userEmail);
  const isOwner = userEmail === listing.owner;

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="w-full min-h-screen px-4 py-8">
       <button
        onClick={() => navigate(RoutePaths.LISTINGS)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Listings</span>
      </button>
      <div className="bg-white rounded-xl shadow-md">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 p-6">
            <div className="relative">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 mb-4"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                {listing.image_urls && listing.image_urls.length > 0 ? (
                  <img
                    src={listing.image_urls[selectedImageIndex]}
                    alt={listing.title}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isZoomed ? "scale-110" : "scale-100"
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
                {listing.image_urls && listing.image_urls.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors duration-300 ease-in-out"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors duration-300 ease-in-out"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
              {listing.image_urls && listing.image_urls.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {listing.image_urls.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`flex-shrink-0 relative ${
                        selectedImageIndex === idx
                          ? "ring-2 ring-blue-500"
                          : "hover:opacity-75"
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

          <div className="lg:w-1/3 p-6 border-t lg:border-t-0 lg:border-l border-gray-100">
            <div className="sticky top-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {listing.title}
              </h1>
              <p className="text-3xl font-bold text-blue-600 mb-6">
                ${listing.price}
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-medium">{capitalizeFirstLetter(listing.condition)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Length</span>
                  <span className="font-medium">
                    {Math.floor(listing.length)}'
                    {Math.round((listing.length - Math.floor(listing.length)) * 12)}"
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-medium">{listing.weight} lbs</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Flex</span>
                  <span className="font-medium">{listing.flex}</span>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {listing.description || "No description available."}
                </p>
              </div>
              <div className="flex">
                {isOwner ? (
                  <EditButton 
                    listing={listing}
                    onListingUpdate={(updatedListing) => setListing(updatedListing)}
                  />
                ) : (
                  <>
                    <button
                      onClick={handleToggleSave}
                      className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-300 ease-in-out ${
                        isUserSaved
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                      }`}
                      title={isUserSaved ? "Unsave" : "Save"}
                    >
                      <Heart className="w-5 h-5" />
                      {isUserSaved ? "Unsave" : "Save"}
                    </button>
                    <button
                      onClick={handleContact}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-300 ease-in-out"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Contact
                    </button> 
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign-In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">
              You must be signed in to save this listing or contact the seller.
            </p>
            <button
              onClick={() => setShowSignInModal(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentListing;