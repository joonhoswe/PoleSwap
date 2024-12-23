import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CurrentListing = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/get/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch listing');
                }
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="flex flex-col items-center p-4">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex">
                    <div className="w-1/2 p-4">
                        <img 
                            src={listing.image_urls} 
                            alt={`${listing.brand} ${listing.length}' ${listing.weight}lbs pole`} 
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                    <div className="w-1/2 p-4">
                        <h1 className="text-3xl font-bold">{`${listing.brand} ${listing.length}'`}</h1>
                        <p className="text-lg text-gray-600">{`${listing.weight} lbs - ${listing.condition}`}</p>
                        <p className="mt-4 text-2xl font-bold text-blue-500">${listing.price}</p>
                        <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                            Contact Seller
                        </button>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                    <h2 className="text-xl font-semibold">Description</h2>
                    <p className="mt-2 text-gray-700">{listing.description || 'No description available.'}</p>
                </div>
            </div>
        </div>
    );
};
