import React from 'react';
import { X } from 'lucide-react';

const MobileFilterMenu = ({ filters, handleFilterChange, isOpen, onClose, states, brandOptions }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Slide-up panel */}
      <div className={`
        fixed bottom-0 left-0 right-0 bg-white rounded-t-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* State */}
          <div>
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

          {/* City */}
          <div>
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

          {/* Brand (Checkboxes) */}
          <div>
            <label className="block font-medium mb-2">Brand</label>
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
          <div>
            <div className="flex justify-between items-center mb-1">
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
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-medium">Weight</label>
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

          {/* Flex Range */}
          <div>
            <label className="block font-medium mb-1">Flex Range</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="flexMin"
                placeholder="Min"
                value={filters.flexMin}
                onChange={handleFilterChange}
                className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                min={0}
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
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block font-medium mb-1">Price Range ($)</label>
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

          {/* Condition */}
          <div>
            <label className="block font-medium mb-1">Condition</label>
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

        {/* Apply Button */}
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileFilterMenu;