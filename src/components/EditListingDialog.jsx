import React, { useState } from 'react';
import { Pencil, Trash2, X, Save, AlertTriangle } from 'lucide-react';

export const EditButton = ({ listing, onListingUpdate }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowEditDialog(true)}
        className="w-full px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-300 ease-in-out"
      >
        <Pencil className="w-5 h-5" />
        Edit
      </button>

      {showEditDialog && (
        <EditListingDialog
          listing={listing}
          onClose={() => setShowEditDialog(false)}
          onUpdate={onListingUpdate}
        />
      )}
    </>
  );
};

const EditListingDialog = ({ listing, onClose, onUpdate }) => {
  const MAX_DESCRIPTION_LENGTH = 500;

  // Pre-fill from existing listing
  // We store brandCustom, lengthFeet, lengthInches, weightCustom, in case the user chooses "other."
  const [formData, setFormData] = useState({
    title: listing.title || "",
    price: listing.price?.toString() || "",
    condition: listing.condition || "",
    // For brand, we show either brand or "other" + brandCustom
    brand: listing.brand && !["essx","spirit","pacer","skypole","dynasty","nordic","altius"].includes(listing.brand)
      ? "other"
      : listing.brand || "",
    brandCustom: listing.brand && !["essx","spirit","pacer","skypole","dynasty","nordic","altius"].includes(listing.brand)
      ? listing.brand
      : "",
    // For length, if listing.length not in the 6 -> 17.5 increments, we do "other"
    length: "",
    lengthFeet: "",
    lengthInches: "",
    // For weight, if listing.weight not in [50..245 step 5], we do "other"
    weight: "",
    weightCustom: "",
    flex: listing.flex?.toString() || "",
    description: listing.description || ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [error, setError] = useState("");

  // Once at mount, decide if listing.length is in the standard dropdown or "other"
  // Same for weight.
  React.useEffect(() => {
    // Build the standard arrays from Sell.jsx:
    const lengthOptions = Array.from({ length: 23 }, (_, i) => 6 + i * 0.5);
    const weightOptions = Array.from({ length: 39 }, (_, i) => 50 + i * 5);

    // If listing.length is a standard, select it; otherwise "other"
    if (lengthOptions.includes(listing.length)) {
      setFormData(prev => ({ ...prev, length: listing.length.toString() }));
    } else {
      // Convert listing.length to something like feet/inches
      if (listing.length && listing.length > 0) {
        const feet = Math.floor(listing.length);
        const inches = Math.round((listing.length - feet) * 12);
        setFormData(prev => ({
          ...prev,
          length: "other",
          lengthFeet: feet.toString(),
          lengthInches: inches.toString()
        }));
      }
    }
    // If listing.weight is standard, select it; else "other"
    if (weightOptions.includes(listing.weight)) {
      setFormData(prev => ({ ...prev, weight: listing.weight.toString() }));
    } else {
      if (listing.weight && listing.weight > 0) {
        setFormData(prev => ({
          ...prev,
          weight: "other",
          weightCustom: listing.weight.toString()
        }));
      }
    }
  }, [listing.length, listing.weight]);

  // FRONTEND VALIDATIONS (matching Sell.jsx)
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Price: up to 7 digits plus optional 2-decimal precision
    if (name === "price") {
      const priceRegex = /^\d{0,7}(\.\d{0,2})?$/;
      if (!priceRegex.test(value)) return; 
    }

    // For lengthFeet / lengthInches, must be > 0
    if (name === "lengthFeet" || name === "lengthInches") {
      if (value < 1) return;
    }

    // For weight / weightCustom, must be > 0
    if (name === "weight" || name === "weightCustom") {
      if (value < 1) return;
    }

    // Flex: up to 2 digits + optional 2-decimal
    if (name === "flex") {
      const flexRegex = /^\d{0,2}(\.\d{0,2})?$/;
      if (!flexRegex.test(value)) return; 
    }

    // Description: limit 500 chars
    if (name === "description" && value.length > MAX_DESCRIPTION_LENGTH) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const {
        title,
        price,
        condition,
        brand,
        brandCustom,
        length,
        lengthFeet,
        lengthInches,
        weight,
        weightCustom,
        flex,
        description,
      } = formData;

      // Basic required-fields check
      if (
        !title ||
        !price ||
        !condition ||
        (!brand && !brandCustom) ||
        (!length && !lengthFeet && !lengthInches) ||
        (!weight && !weightCustom) ||
        !flex ||
        !description
      ) {
        setError("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      // Compute final brand
      let finalBrand = brand !== "other" ? brand : brandCustom.trim();

      // Compute final weight
      let finalWeight;
      if (weight !== "other") {
        finalWeight = weight;
      } else {
        finalWeight = weightCustom;
      }

      // Compute final length
      let finalLength;
      if (length !== "other") {
        finalLength = parseFloat(length);
      } else {
        const feetNum = parseFloat(lengthFeet || "0");
        const inchesNum = parseFloat(lengthInches || "0");
        finalLength = feetNum + inchesNum / 12;
      }

      // Now build the updated fields to patch
      const bodyToSend = {
        title,
        price,    // string -> server side can parse float
        condition,
        brand: finalBrand,
        weight: finalWeight, // also string -> server side parse int
        flex,    // string -> parse float server side
        length: finalLength,
        description
      };

      // Send PATCH request to your API
      const response = await fetch(
        `${import.meta.env.VITE_DEPLOYED_BACKEND_URL}/api/update/${listing.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyToSend),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update listing");
      }

      const updatedListing = await response.json();
      onUpdate(updatedListing);
      onClose();
    } catch (err) {
      setError("Failed to update listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DEPLOYED_BACKEND_URL}/api/delete/${listing.id}/`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete listing");
      window.location.href = "/listings";
    } catch (err) {
      setError("Failed to delete listing. Please try again.");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const remainingChars = MAX_DESCRIPTION_LENGTH - formData.description.length;

  // Standard brand, length, weight arrays
  const brandOptions = [
    "Essx",
    "UCS Spirit",
    "Pacer",
    "Skypole",
    "Dynasty",
    "Nordic",
    "Altius",
    "Other",
  ];
  const lengthOptions = Array.from({ length: 23 }, (_, i) => 6 + i * 0.5);
  const weightOptions = Array.from({ length: 39 }, (_, i) => 50 + i * 5);

  return (
    <>
      {/* Edit Modal */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Listing</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" // text to allow regex-based validation
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter price"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum price: $9,999,999.99
                </p>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select condition</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
              </div>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand <span className="text-red-500">*</span>
              </label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Brand</option>
                {brandOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "other" ? "Other" : opt}
                  </option>
                ))}
              </select>
              {formData.brand === "other" && (
                <input
                  type="text"
                  name="brandCustom"
                  value={formData.brandCustom}
                  onChange={handleInputChange}
                  placeholder="Enter custom brand"
                  className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>

            {/* Length, Weight, Flex */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Length (ft) <span className="text-red-500">*</span>
                </label>
                <select
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Length</option>
                  {lengthOptions.map((val) => (
                    <option key={val} value={val}>
                      {Math.floor(val)}
                      {val % 1 ? "'6\"" : "'0\""}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
                {formData.length === "other" && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="number"
                      name="lengthFeet"
                      value={formData.lengthFeet}
                      onChange={handleInputChange}
                      placeholder="Feet"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="number"
                      name="lengthInches"
                      value={formData.lengthInches}
                      onChange={handleInputChange}
                      placeholder="Inches"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (lbs) <span className="text-red-500">*</span>
                </label>
                <select
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Weight</option>
                  {weightOptions.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
                {formData.weight === "other" && (
                  <input
                    type="number"
                    name="weightCustom"
                    value={formData.weightCustom}
                    onChange={handleInputChange}
                    placeholder="Custom weight"
                    className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>

              {/* Flex */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Flex <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="flex"
                  value={formData.flex}
                  onChange={handleInputChange}
                  placeholder="Enter flex"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                {MAX_DESCRIPTION_LENGTH - formData.description.length} characters remaining
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowDeleteDialog(true)}
                className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete Listing
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteDialog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDeleteDialog(false);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Delete Listing</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this listing? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditButton;