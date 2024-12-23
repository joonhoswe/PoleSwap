import { useState } from "react";
import { PoleCard } from "../components/PoleCard";

export const Listings = () => {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'map'
  // State for checkboxes
  const [conditionNew, setConditionNew] = useState(false);
  const [conditionUsed, setConditionUsed] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-5rem)]">
      {/* Left Sidebar - Filters */}
      <div className="w-full md:w-72 border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">Browse</h2>
        <div className="space-y-6">
          {/* Location */}
          <div className="space-y-2">
            <label className="font-medium">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2 mt-2">
              <option value="">Distance</option>
              <option value="10">Within 10 miles</option>
              <option value="25">Within 25 miles</option>
              <option value="50">Within 50 miles</option>
              <option value="100">Within 100 miles</option>
            </select>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2">
            <label className="font-medium">Brand</label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2">
              <option value="">All Brands</option>
              <option value="essx">ESSX</option>
              <option value="spirit">UCS Spirit</option>
              <option value="pacer">Pacer</option>
              <option value="nordic">Nordic</option>
              <option value="altius">Altius</option>
            </select>
          </div>

          {/* Length Filter (Single Dropdown) */}
          <div className="space-y-2">
            <label className="font-medium">Length</label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2">
              <option value="">All Lengths</option>
              {[...Array(23)].map((_, i) => {
                const length = 6 + i * 0.5; // 6'0" up to ~17'0"
                const label = `${Math.floor(length)}${length % 1 ? "'6\"" : "'0\""}`;
                return (
                  <option key={length} value={length}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Weight Filter (Single Dropdown) */}
          <div className="space-y-2">
            <label className="font-medium">Weight (lbs)</label>
            <select className="w-full rounded-lg border border-gray-300 px-4 py-2">
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
                placeholder="Min"
                className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
              />
              <input
                type="number"
                placeholder="Max"
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
                  className="form-checkbox text-blue-500"
                  checked={conditionNew}
                  onChange={() => setConditionNew(!conditionNew)}
                />
                <span className="ml-2">New</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  checked={conditionUsed}
                  onChange={() => setConditionUsed(!conditionUsed)}
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
          <select className="rounded-lg border border-gray-300 px-4 py-2">
            <option value="recent">Most Recent</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="distance">Distance</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid" ? "bg-blue-50 text-blue-500" : "text-gray-500"
              }`}
            >
              {/* Grid Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 
                   2v2a2 2 0 01-2 2H6a2 2 0 
                   01-2-2V6zM14 6a2 2 0 
                   012-2h2a2 2 0 012 
                   2v2a2 2 0 01-2 2h-2a2 2 0 
                   01-2-2V6zM4 16a2 2 0 
                   012-2h2a2 2 0 012 
                   2v2a2 2 0 01-2 2H6a2 2 0 
                   01-2-2v-2zM14 16a2 2 0 
                   012-2h2a2 2 0 012 2v2a2 2 0 
                   01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`p-2 rounded-lg ${
                viewMode === "map" ? "bg-blue-50 text-blue-500" : "text-gray-500"
              }`}
            >
              {/* Map Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 
                     1 0 013 16.382V5.618a1 1 0 
                     011.447-.894L9 7m0 13l6-3m-6 
                     3V7m6 10l4.553 2.276A1 1 0 
                     0021 18.382V7.618a1 1 0 
                     00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid View */}
        <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            <PoleCard
              brand="Nordic"
              length="14"
              weight={140}
              condition="New"
              price={599}
              imageUrl="/placeholder.jpg"
            />
            {/* Add more PoleCards here */}
          </div>
        </div>
      </div>
    </div>
  );
};