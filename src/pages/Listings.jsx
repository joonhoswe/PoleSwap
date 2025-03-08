import { useState, useEffect, useMemo, useCallback } from "react";
import { PoleCard } from "../components/PoleCard";
import supabase from "../utils/supabase";
import MobileFilterMenu from "../components/MobileFilterMenu";

const ITEMS_PER_PAGE = 12;

// Define brandOptions outside the component to prevent it from being recreated on every render
const brandOptions = [
    { value: 'essx', label: 'ESSX', filterKey: 'brandEssx' },
    { value: 'spirit', label: 'UCS Spirit', filterKey: 'brandSpirit' },
    { value: 'pacer', label: 'Pacer', filterKey: 'brandPacer' },
    { value: 'skypole', label: 'Skypole', filterKey: 'brandSkypole' },
    { value: 'dynasty', label: 'Dynasty', filterKey: 'brandDynasty' },
    { value: 'nordic', label: 'Nordic', filterKey: 'brandNordic' },
    { value: 'altius', label: 'Altius', filterKey: 'brandAltius' },
    { value: 'fibersport', label: 'Fibersport', filterKey: 'brandFibersport' },
];

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
        brandEssx: true,
        brandSpirit: true,
        brandPacer: true,
        brandSkypole: true,
        brandDynasty: true,
        brandNordic: true,
        brandAltius: true,
        brandFibersport: true,
        length: '',
        weight: '',
        useLengthRange: false,
        lengthMin: '',
        lengthMax: '',
        useWeightRange: false,
        weightMin: '',
        weightMax: '',
        flexMin: '',
        flexMax: '',
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
            setListings(data || []);
            setFilteredListings(data || []);
        } catch (error) {
            console.error('Error fetching listings:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    // Apply filters directly in useEffect instead of using useMemo + another useEffect
    useEffect(() => {
        if (!listings.length) return;
        
        let filtered = [...listings];
        
        // Check if any brand filters are active
        const anyBrandSelected = brandOptions.some(brand => 
            filters[brand.filterKey] === true
        );

        // Apply brand filters if any selected
        if (anyBrandSelected) {
            filtered = filtered.filter(listing => 
                brandOptions.some(brand => 
                    filters[brand.filterKey] && listing.brand === brand.value
                )
            );
        }
        
        // Apply length filter based on selection mode
        if (filters.useLengthRange) {
            // Use range for length filtering
            if (filters.lengthMin) {
                filtered = filtered.filter(listing => parseFloat(listing.length) >= parseFloat(filters.lengthMin));
            }
            if (filters.lengthMax) {
                filtered = filtered.filter(listing => parseFloat(listing.length) <= parseFloat(filters.lengthMax));
            }
        } else if (filters.length) {
            // Use single value for length filtering
            filtered = filtered.filter(listing => listing.length === filters.length);
        }
        
        // Apply weight filter based on selection mode
        if (filters.useWeightRange) {
            // Use range for weight filtering
            if (filters.weightMin) {
                filtered = filtered.filter(listing => parseFloat(listing.weight) >= parseFloat(filters.weightMin));
            }
            if (filters.weightMax) {
                filtered = filtered.filter(listing => parseFloat(listing.weight) <= parseFloat(filters.weightMax));
            }
        } else if (filters.weight) {
            // Use single value for weight filtering
            filtered = filtered.filter(listing => listing.weight === filters.weight);
        }
        
        // Apply existing filters
        if (filters.priceMin) {
            filtered = filtered.filter(listing => listing.price >= filters.priceMin);
        }
        if (filters.priceMax) {
            filtered = filtered.filter(listing => listing.price <= filters.priceMax);
        }
        if (filters.flexMin) {
            filtered = filtered.filter(listing => listing.flex >= filters.flexMin);
        }
        if (filters.flexMax) {
            filtered = filtered.filter(listing => listing.flex <= filters.flexMax);
        }
        if (filters.conditionNew && !filters.conditionUsed) {
            filtered = filtered.filter(listing => listing.condition === 'new');
        }
        if (filters.conditionUsed && !filters.conditionNew) {
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

        setFilteredListings(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [filters, listings, sortOption]); // Removed brandOptions since it's now defined outside

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

                    {/* Brand Filter (Checkbox) */}
                    <div className="space-y-2">
                        <label className="font-medium block mb-2">Brand</label>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                            {brandOptions.map(brand => (
                                <label key={brand.value} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        name={brand.filterKey}
                                        className="form-checkbox text-blue-500 rounded mr-1.5"
                                        checked={filters[brand.filterKey]}
                                        onChange={handleFilterChange}
                                    />
                                    <span className="text-sm">{brand.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Length Filter */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="font-medium">Length</label>
                            <label className="inline-flex items-center text-sm">
                                <input
                                    type="checkbox"
                                    name="useLengthRange"
                                    className="form-checkbox text-blue-500 rounded mr-1.5"
                                    checked={filters.useLengthRange}
                                    onChange={handleFilterChange}
                                />
                                <span>Use range</span>
                            </label>
                        </div>
                        
                        {!filters.useLengthRange ? (
                            // Single Length Dropdown
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
                        ) : (
                            // Length Range Inputs
                            <div className="flex gap-2 items-center">
                                <input
                                    type="number"
                                    name="lengthMin"
                                    placeholder="Min"
                                    value={filters.lengthMin}
                                    onChange={handleFilterChange}
                                    className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                                    min={6}
                                    max={17}
                                    step={0.5}
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                    type="number"
                                    name="lengthMax"
                                    placeholder="Max"
                                    value={filters.lengthMax}
                                    onChange={handleFilterChange}
                                    className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                                    min={6}
                                    max={17}
                                    step={0.5}
                                />
                            </div>
                        )}
                    </div>

                    {/* Weight Filter */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="font-medium">Weight (lbs)</label>
                            <label className="inline-flex items-center text-sm">
                                <input
                                    type="checkbox"
                                    name="useWeightRange"
                                    className="form-checkbox text-blue-500 rounded mr-1.5"
                                    checked={filters.useWeightRange}
                                    onChange={handleFilterChange}
                                />
                                <span>Use range</span>
                            </label>
                        </div>
                        
                        {!filters.useWeightRange ? (
                            // Single Weight Dropdown
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
                                            {weight} lbs
                                        </option>
                                    );
                                })}
                            </select>
                        ) : (
                            // Weight Range Inputs
                            <div className="flex gap-2 items-center">
                                <input
                                    type="number"
                                    name="weightMin"
                                    placeholder="Min"
                                    value={filters.weightMin}
                                    onChange={handleFilterChange}
                                    className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                                    min={50}
                                    max={240}
                                    step={5}
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                    type="number"
                                    name="weightMax"
                                    placeholder="Max"
                                    value={filters.weightMax}
                                    onChange={handleFilterChange}
                                    className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                                    min={50}
                                    max={240}
                                    step={5}
                                />
                            </div>
                        )}
                    </div>

                    {/* Flex Filter */}
                    <div className="space-y-2">
                        <label className="font-medium">Flex Range</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                name="flexMin"
                                placeholder="Min"
                                value={filters.flexMin}
                                onChange={handleFilterChange}
                                className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                                min={0}
                                max={100}
                            />
                            <span className="text-gray-500">to</span>
                            <input
                                type="number"
                                name="flexMax"
                                placeholder="Max"
                                value={filters.flexMax}
                                onChange={handleFilterChange}
                                className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                                min={0}
                                max={100}
                            />
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-2">
                        <label className="font-medium">Price Range ($)</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                name="priceMin"
                                placeholder="Min"
                                value={filters.priceMin}
                                onChange={handleFilterChange}
                                className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                                min={0}
                            />
                            <span className="text-gray-500">to</span>
                            <input
                                type="number"
                                name="priceMax"
                                placeholder="Max"
                                value={filters.priceMax}
                                onChange={handleFilterChange}
                                className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                                min={0}
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
                                    className="form-checkbox text-blue-500 rounded"
                                    checked={filters.conditionNew}
                                    onChange={handleFilterChange}
                                />
                                <span className="ml-2">New</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="conditionUsed"
                                    className="form-checkbox text-blue-500 rounded"
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
                brandOptions={brandOptions}
            />
        </div>
    );
};
