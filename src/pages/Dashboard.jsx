import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { PoleCard } from "../components/PoleCard";
import { Inbox } from "lucide-react";

const ITEMS_PER_PAGE = 12;

export const Dashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("my-listings");
  const [myListings, setMyListings] = useState([]);
  const [savedListings, setSavedListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUserListings = async () => {
      // Make sure we have a user email
      const userEmail = user?.emailAddresses?.[0]?.emailAddress;
      if (!userEmail) return;

      try {
        setIsLoading(true);

        // 1) Fetch ALL listings
        const allResponse = await fetch("http://127.0.0.1:8000/api/get/");
        const allData = await allResponse.json();

        // 2) Filter to get "My Listings"
        const filteredMyListings = allData.filter(
          (listing) => listing.owner === userEmail
        );
        setMyListings(filteredMyListings);

        // 3) Fetch "Saved" listings (same as before)
        const savedListingsData = allData.filter(
            (listing) => listing.saved.includes(userEmail)
        )
        setSavedListings(savedListingsData);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserListings();
  }, [user]);

  // Pagination
  const getPaginatedListings = (listings) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return listings.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Switch tabs => reset page
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // A small grid for the listings
  const ListingsGrid = ({ listings }) => {
    const paginatedListings = getPaginatedListings(listings);
    const totalPages = Math.ceil(listings.length / ITEMS_PER_PAGE);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {paginatedListings.map((listing) => (
            <PoleCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              brand={listing.brand}
              length={listing.length}
              weight={listing.weight}
              condition={listing.condition}
              price={listing.price}
              imageUrls={listing.image_urls}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => handleTabChange("my-listings")}
            className={`pb-4 px-1 ${
              activeTab === "my-listings"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            My Listings
          </button>
          <button
            onClick={() => handleTabChange("saved")}
            className={`pb-4 px-1 ${
              activeTab === "saved"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Saved
          </button>
          <button
            onClick={() => handleTabChange("messages")}
            className={`pb-4 px-1 ${
              activeTab === "messages"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Messages
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="mt-6">
          {activeTab === "my-listings" && (
            <>
              {myListings.length > 0 ? (
                <ListingsGrid listings={myListings} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">You haven't posted any listings yet.</p>
                </div>
              )}
            </>
          )}

          {activeTab === "saved" && (
            <>
              {savedListings.length > 0 ? (
                <ListingsGrid listings={savedListings} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">You haven't saved any listings yet.</p>
                </div>
              )}
            </>
          )}

          {activeTab === "messages" && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Inbox className="w-12 h-12 text-gray-400" />
              <p className="text-gray-500">Messages coming soon!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;