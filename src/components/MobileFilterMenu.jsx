import React, { useState } from 'react';
import { X } from 'lucide-react';

const MobileFilterMenu = ({ filters, handleFilterChange, isOpen, onClose, states }) => {
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

          {/* Brand */}
          <div>
            <label className="block font-medium mb-1">Brand</label>
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
              <option value="fibersport">Fibersport</option>
            </select>
          </div>

          {/* Length */}
          <div>
            <label className="block font-medium mb-1">Length</label>
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

          {/* Weight */}
          <div>
            <label className="block font-medium mb-1">Weight (lbs)</label>
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

          {/* Flex Range */}
          <div>
            <label className="block font-medium mb-1">Flex Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="flexMin"
                placeholder="Min"
                value={filters.flexMin}
                onChange={handleFilterChange}
                className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                min={0}
              />
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
            <label className="block font-medium mb-1">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="priceMin"
                placeholder="Min"
                value={filters.priceMin}
                onChange={handleFilterChange}
                className="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
                min={0}
              />
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