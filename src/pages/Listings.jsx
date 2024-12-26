import { useState, useEffect } from "react";
import { PoleCard } from "../components/PoleCard";

export const Listings = () => {
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [viewMode, setViewMode] = useState("grid");
    const [sortOption, setSortOption] = useState("recent");
    const [filters, setFilters] = useState({
        zipCode: '',
        distance: '',
        brand: '',
        length: '',
        weight: '',
        priceMin: '',
        priceMax: '',
        conditionNew: false,
        conditionUsed: false,
    });

    useEffect(() => {
        const fetchListings = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/get/');
            const data = await response.json();
            setListings(data);
            setFilteredListings(data); // Initialize filtered listings
        };
        fetchListings();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, listings, sortOption]);

    const applyFilters = () => {
        // 1) Copy listings into a new array so we don't mutate state directly
        let filtered = [...listings];
      
        // 2) Filtering
        if (filters.brand) {
          filtered = filtered.filter(listing => listing.brand === filters.brand);
        }
        if (filters.length) {
          filtered = filtered.filter(listing => listing.length === filters.length);
        }
        if (filters.weight) {
          filtered = filtered.filter(listing => listing.weight === filters.weight);
        }
        if (filters.priceMin) {
          filtered = filtered.filter(listing => listing.price >= filters.priceMin);
        }
        if (filters.priceMax) {
          filtered = filtered.filter(listing => listing.price <= filters.priceMax);
        }
        if (filters.conditionNew) {
          filtered = filtered.filter(listing => listing.condition === 'new');
        }
        if (filters.conditionUsed) {
          filtered = filtered.filter(listing => listing.condition === 'used');
        }
        if (filters.distance) {
          // distance filtering logic here
        }
      
        // 3) Sorting on the *copied* array
        if (sortOption === "recent") {
          filtered.sort((a, b) => new Date(b.date_time_posted) - new Date(a.date_time_posted));
        } else if (sortOption === "price_low") {
          filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price_high") {
          filtered.sort((a, b) => b.price - a.price);
        }
      
        // 4) Set the new filtered list
        setFilteredListings(filtered);
      };

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-5rem)]">
            {/* Left Sidebar - Filters */}
            <div className="w-full md:w-72 border-r border-gray-200 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6">Browse</h2>
                <div className="space-y-6">
                    {/* Zip Code */}
                    <div className="space-y-2">
                        <label className="font-medium">Zip Code</label>
                        <input
                            type="text"
                            name="zipCode"
                            placeholder="Enter zip code"
                            value={filters.zipCode}
                            onChange={handleFilterChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />
                    </div>
                    {/* Distance Filter */}
                    <div className="space-y-2">
                        <label className="font-medium">Distance</label>
                        <select name="distance" onChange={handleFilterChange} className="w-full rounded-lg border border-gray-300 px-4 py-2">
                            <option value="">Nationwide</option>
                            <option value="10">Within 10 miles</option>
                            <option value="25">Within 25 miles</option>
                            <option value="50">Within 50 miles</option>
                            <option value="100">Within 100 miles</option>
                        </select>
                    </div>
                    {/* Brand Filter */}
                    <div className="space-y-2">
                        <label className="font-medium">Brand</label>
                        <select name="brand" onChange={handleFilterChange} className="w-full rounded-lg border border-gray-300 px-4 py-2">
                            <option value="">All Brands</option>
                            <option value="essx">ESSX</option>
                            <option value="spirit">UCS Spirit</option>
                            <option value="pacer">Pacer</option>
                            <option value="nordic">Nordic</option>
                            <option value="altius">Altius</option>
                        </select>
                    </div>
                    {/* Length Filter */}
                    <div className="space-y-2">
                        <label className="font-medium">Length</label>
                        <select name="length" onChange={handleFilterChange} className="w-full rounded-lg border border-gray-300 px-4 py-2">
                            <option value="">All Lengths</option>
                            {[...Array(23)].map((_, i) => {
                                const length = 6 + i * 0.5; // 6'0" up to ~17'0"
                                return (
                                    <option key={length} value={length}>
                                        {`${Math.floor(length)}' ${length % 1 ? '6"' : '0"'}`}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {/* Weight Filter */}
                    <div className="space-y-2">
                        <label className="font-medium">Weight (lbs)</label>
                        <select name="weight" onChange={handleFilterChange} className="w-full rounded-lg border border-gray-300 px-4 py-2">
                            <option value="">All Weights</option>
                            {[...Array(39)].map((_, i) => {
                                const weight = 50 + i * 5; // 50, 55, 60, ... up to ~245
                                return (
                                    <option key={weight} value={weight}>
                                        {weight}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {/* Price Range */}
                    <div className="space-y-2">
                        <label className="font-medium">Price Range</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                name="priceMin"
                                placeholder="Min"
                                value={filters.priceMin}
                                onChange={handleFilterChange}
                                className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                            />
                            <input
                                type="number"
                                name="priceMax"
                                placeholder="Max"
                                value={filters.priceMax}
                                onChange={handleFilterChange}
                                className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                            />
                        </div>
                    </div>
                    {/* Condition (Checkboxes) */}
                    <div className="space-y-2">
                        <label className="font-medium">Condition</label>
                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="conditionNew"
                                    className="form-checkbox text-blue-500"
                                    checked={filters.conditionNew}
                                    onChange={handleFilterChange}
                                />
                                <span className="ml-2">New</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="conditionUsed"
                                    className="form-checkbox text-blue-500"
                                    checked={filters.conditionUsed}
                                    onChange={handleFilterChange}
                                />
                                <span className="ml-2">Used</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                {/* Top Bar */}
                <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                    <select 
                        value={sortOption} 
                        onChange={(e) => {
                            setSortOption(e.target.value);
                        }} 
                        className="rounded-lg border border-gray-300 px-4 py-2"
                    >
                        <option value="recent">Most Recent</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                    </select>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-50 text-blue-500" : "text-gray-500"}`}
                        >
                            {/* Grid Icon */}
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Grid View */}
                <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {filteredListings.map(listing => (
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
                </div>
            </div>
        </div>
    );
};