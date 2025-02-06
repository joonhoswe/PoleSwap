import { useState, useEffect, useMemo, useCallback } from "react";
import { PoleCard } from "../components/PoleCard";
import supabase from "../utils/supabase";
import MobileFilterMenu from "../components/MobileFilterMenu";

const ITEMS_PER_PAGE = 12;

export const Listings = () => {
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [viewMode, setViewMode] = useState("grid");
    const [sortOption, setSortOption] = useState("recent");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        state: '',
        city: '',
        brand: '',
        length: '',
        weight: '',
        priceMin: '',
        priceMax: '',
        conditionNew: false,
        conditionUsed: false,
    });
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
        "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
        "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
        "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
        "Wisconsin", "Wyoming"
    ];

    function capitalizeFirstLetter(val) {
        return val.split(" ").map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(" ");
    }

    // Memoized fetch function
    const fetchListings = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data } = await supabase.from('Listings').select()
            setListings(data);
            setFilteredListings(data);
        } catch (error) {
            console.error('Error fetching listings:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    // Memoized filter function
    const applyFilters = useMemo(() => {
        let filtered = [...listings];
        
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
        if (filters.state) {
           filtered = filtered.filter(listing => listing.state === filters.state);
        }
        if (filters.city) {
           filtered = filtered.filter(listing => listing.city === capitalizeFirstLetter(filters.city));
        }

        // Apply sorting
        switch (sortOption) {
            case "recent":
                filtered.sort((a, b) => new Date(b.date_time_posted) - new Date(a.date_time_posted));
                break;
            case "price_low":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price_high":
                filtered.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        return filtered;
    }, [filters, listings, sortOption]);

    // Update filtered listings when filters change
    useEffect(() => {
        setFilteredListings(applyFilters);
        setCurrentPage(1); // Reset to first page when filters change
    }, [applyFilters]);

    // Memoized pagination calculation
    const paginatedListings = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredListings.slice(startIndex, endIndex);
    }, [filteredListings, currentPage]);

    const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);

    // Memoized filter change handler
    const handleFilterChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }, []);

    // Pagination controls
    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-5rem)]">
            {/* Left Sidebar - Filters */}
            <div className="w-full hidden md:block md:w-72 border-r border-gray-200 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6">Browse</h2>
                <div className="space-y-6">
                    {/* State Filter */}
                    <div className="space-y-2">
                        <label className="font-medium">State</label>
                        <select 
                            name="state" 
                            onChange={handleFilterChange} 
                            value={filters.state}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        >
                            <option value="">Nationwide</option>
                            {states.map(state => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                            ))}
                        </select>
                    </div>

                    {/* City Filter */}
                    <div className="space-y-2">
                        <label className="font-medium">City</label>
                        <input 
                            type="text"
                            name="city" 
                            placeholder="Statewide"
                            onChange={handleFilterChange} 
                            value={filters.city}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        >
                        </input>
                    </div>

                    {/* Brand Filter */}
                    <div className="space-y-2">
                        <label className="font-medium">Brand</label>
                        <select 
                            name="brand" 
                            onChange={handleFilterChange}
                            value={filters.brand}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        >
                            <option value="">All Brands</option>
                            <option value="essx">ESSX</option>
                            <option value="spirit">UCS Spirit</option>
                            <option value="pacer">Pacer</option>
                            <option value="skypole">Skypole</option>
                            <option value="dynasty">Dynasty</option>
                            <option value="nordic">Nordic</option>
                            <option value="altius">Altius</option>
                        </select>
                    </div>

                    {/* Length Filter */}
                    <div className="space-y-2">
                        <label className="font-medium">Length</label>
                        <select 
                            name="length" 
                            onChange={handleFilterChange}
                            value={filters.length}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        >
                            <option value="">All Lengths</option>
                            {[...Array(23)].map((_, i) => {
                                const length = 6 + i * 0.5;
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
                        <select 
                            name="weight" 
                            onChange={handleFilterChange}
                            value={filters.weight}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        >
                            <option value="">All Weights</option>
                            {[...Array(39)].map((_, i) => {
                                const weight = 50 + i * 5;
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
                        onChange={(e) => setSortOption(e.target.value)} 
                        className="rounded-lg border border-gray-300 px-4 py-2"
                    >
                        <option value="recent">Most Recent</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                    </select>

                    <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="md:hidden px-4 py-2 border rounded-lg"
                    >
                    Filters
                    </button>

                    {/* <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-50 text-blue-500" : "text-gray-500"}`}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                    </div> */}
                </div>

                {/* Loader */}
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Grid View */}
                        <div className="p-4 overflow-y-auto h-[calc(100vh-10rem)]">
                            {paginatedListings.length > 0 ? (
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
                                            state={listing.state}
                                            city={listing.city}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500 text-lg">No listings match your search criteria</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination Controls */}
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
                    </>
                )}
            </div>

<MobileFilterMenu
  filters={filters}
  handleFilterChange={handleFilterChange}
  isOpen={isMobileFilterOpen}
  onClose={() => setIsMobileFilterOpen(false)}
  states={states}
/>
        </div>
    );
};
