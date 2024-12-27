import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { PoleCard } from "../components/PoleCard";
import { Inbox } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ITEMS_PER_PAGE = 12;

export const Dashboard = () => {
    const { user } = useUser();
    const [myListings, setMyListings] = useState([]);
    const [savedListings, setSavedListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch user's listings and saved listings
    useEffect(() => {
        const fetchUserListings = async () => {
            if (!user?.emailAddresses[0]?.emailAddress) return;
            
            try {
                setIsLoading(true);
                // Fetch listings where owner email matches user's email
                const myListingsResponse = await fetch(`http://127.0.0.1:8000/api/listings/user/${user.emailAddresses[0].emailAddress}`);
                const myListingsData = await myListingsResponse.json();
                setMyListings(myListingsData);

                // Fetch listings where user's email is in the saved array
                const savedListingsResponse = await fetch(`http://127.0.0.1:8000/api/listings/saved/${user.emailAddresses[0].emailAddress}`);
                const savedListingsData = await savedListingsResponse.json();
                setSavedListings(savedListingsData);
            } catch (error) {
                console.error('Error fetching listings:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserListings();
    }, [user]);

    // Pagination logic
    const getPaginatedListings = (listings) => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return listings.slice(startIndex, endIndex);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Render listings grid
    const ListingsGrid = ({ listings }) => {
        const paginatedListings = getPaginatedListings(listings);
        const totalPages = Math.ceil(listings.length / ITEMS_PER_PAGE);

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {paginatedListings.map(listing => (
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
            
            <Tabs defaultValue="my-listings" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="my-listings">My Listings</TabsTrigger>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>

                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        <TabsContent value="my-listings">
                            {myListings.length > 0 ? (
                                <ListingsGrid listings={myListings} />
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">You haven't posted any listings yet.</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="saved">
                            {savedListings.length > 0 ? (
                                <ListingsGrid listings={savedListings} />
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">You haven't saved any listings yet.</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="messages">
                            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                <Inbox className="w-12 h-12 text-gray-400" />
                                <p className="text-gray-500">Messages coming soon!</p>
                            </div>
                        </TabsContent>
                    </>
                )}
            </Tabs>
        </div>
    );
};

export default Dashboard;