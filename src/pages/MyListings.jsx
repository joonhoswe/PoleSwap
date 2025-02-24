import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import { PoleCard } from "../components/PoleCard";
import { useUser } from '@clerk/clerk-react'

export const MyListings = () => {
    const [listings, setListings] = useState([]);

    const { isSignedIn, user, isLoaded } = useUser();
    let email = "";
    if (isSignedIn) {
        email = user.primaryEmailAddress?.emailAddress;
    }

    useEffect(() => {
        const fetchListings = async () => {
            const { data } = await supabase.from('Listings').select()
            setListings(data.filter(listing => listing.owner === email)); 
        };
        fetchListings();
    }, []);

    if (isSignedIn) return (
        <div className="mt-10 flex w-full flex-col items-center px-4 text-black">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">My Listings</h1>
                <p className="text-gray-600">Manage your pole listings</p>
            </div>

            <div className="w-full max-w-3xl">
                <div className="p-4 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {listings.map(listing => (
                            <PoleCard
                                key={listing.id}
                                id={listing.id}
                                brand={listing.brand}
                                length={listing.length}
                                weight={listing.weight}
                                condition={listing.condition}
                                price={listing.price}
                                imageUrls={listing.image_urls}
                                state={listing.state}
                                city={listing.city}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) 

    return <div>Not signed in</div>
};