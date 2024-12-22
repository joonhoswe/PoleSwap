import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="flex flex-row justify-between items-center h-20 w-full px-8">
            {/* Logo Section */}
            <div className="flex items-center">
                <Link to = "/">
                    <span className="text-blue-500 text-2xl font-bold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 5.28c-1.23-.37-2.22-1.17-2.8-2.18l-1-1.6c-.41-.65-1.11-1-1.84-1-.78 0-1.59.5-1.78 1.44L7 23h2.1l2.1-11 2.1 2v9h2v-9.5l-2.1-2 .6-3c1 1.15 2.41 2.01 4 2.34V23h2V9h-2v1.78z"/>
                        </svg>
                        PoleSwapper
                    </span>
                </Link>    
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                </button>

                {/* My Listings Button */}
                <button className="">
                    My Listings
                </button>

                {/* Sell Button */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                    Sell
                </button>
            </div>
        </div>
    );
}