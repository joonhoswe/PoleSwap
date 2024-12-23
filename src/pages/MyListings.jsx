import { PoleCard } from "../components/PoleCard";

export const MyListings = () => {
    return (
        <div className="mt-10 flex w-full flex-col items-center px-4 text-black">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">My Listings</h1>
                {/* <p className="text-gray-600">Manage your pole listings</p> */}
            </div>

            <div className="w-full max-w-3xl">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <PoleCard
                        brand="Nordic"
                        length="14"
                        weight={140}
                        condition="New"
                        price={599}
                        imageUrl="/placeholder.jpg"
                    />
                </div>
            </div>
        </div>
    );
};