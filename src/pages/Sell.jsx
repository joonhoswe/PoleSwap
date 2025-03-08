import { useState, useEffect } from 'react';
import supabase from '../utils/supabase';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../general/RoutePaths';
import ConfettiExplosion from 'react-confetti-explosion';
import TermsModal from '../components/TermsModal';
import PrivacyModal from '../components/PrivacyModal';

export const Sell = () => {
  const { isSignedIn, user } = useUser();
  let email = "";

  const [formData, setFormData] = useState({
    title: "",
    condition: "",
    price: "",
    brand: "",
    brandCustom: "",
    itemCategory: "",
    size: "",
    length: "",
    lengthFeet: "",
    lengthInches: "",
    weight: "",
    weightCustom: "",
    flex: "",
    description: "",
    images: [],
    owner: email,
    state: "",
    city: ""
  });
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

  useEffect(() => {
    if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      setFormData(prev => ({
        ...prev,
        owner: user.primaryEmailAddress.emailAddress
      }));
    }
  }, [isSignedIn, user]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [listingId, setListingId] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const MAX_DESCRIPTION_LENGTH = 500;
  const remainingChars = MAX_DESCRIPTION_LENGTH - formData.description.length;

  function capitalizeFirstLetter(val) {
    return val.split(" ").map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(" ");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      const regex = /^\d{0,7}(\.\d{0,2})?$/;
      if (!regex.test(value)) return;
    }

    if (name === 'lengthFeet' || name === 'lengthInches') {
      if (value <= 0) return;
    }

    if (name === 'weight' || name === 'weightCustom') {
      if (value <= 0) return;
    }

    if (name === 'city') {
      const regex = /^$|^[a-zA-Z]+$/;
      if (!regex.test(value)) return;
    }

    if (name === 'flex') {
        const regex = /^\d{0,2}(\.\d{0,2})?$/;
        if (!regex.test(value)) return;
      }

    if (name === 'description' && value.length > MAX_DESCRIPTION_LENGTH) return;

    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const {
        title,
        condition,
        price,
        brand,
        brandCustom,
        itemCategory,
        length,
        lengthFeet,
        lengthInches,
        weight,
        weightCustom,
        flex,
        description,
        state,
        city,
        size
      } = formData;
      if (
        !title ||
        !condition ||
        !price ||
        (!brand && !brandCustom) ||
        (!itemCategory) ||
        ((itemCategory === "spikes" || itemCategory === "clothes") && (!size)) ||
        ((itemCategory === "pole") && (!length && !lengthFeet && !lengthInches) && (!weight && !weightCustom) && (!flex)) ||
        !description || !state || !city
      ) {
        console.log(formData)
        setError("Please fill in all required fields.");
        return;
      }
      let finalBrand = brand !== "other" ? brand : brandCustom.trim();
      let parsedWeight, parsedLength, parsedFlex;

      const formattedState = capitalizeFirstLetter(state);
      const formattedCity = capitalizeFirstLetter(city);
      const parsedPrice = parseFloat(price);

      if (itemCategory === "pole") {
        let finalWeight = weight !== "other" ? weight : weightCustom.trim();
        let finalLength;
        
        if (length !== "other") {
          finalLength = length;
        } else {
          const feet = parseFloat(lengthFeet || "0");
          const inches = parseFloat(lengthInches || "0") / 12;
          finalLength = feet + inches;
        }
        
        parsedWeight = parseInt(finalWeight, 10);
        parsedLength = parseFloat(finalLength);
        parsedFlex = parseFloat(flex);
      }

      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("condition", condition);
      formDataToSend.append("price", parsedPrice);
      formDataToSend.append("brand", finalBrand);
      formDataToSend.append("description", description);
      formDataToSend.append("itemCategory", itemCategory);
      formDataToSend.append("size", size);
      formDataToSend.append("owner", formData.owner);
      formDataToSend.append("state", formattedState);
      formDataToSend.append("city", formattedCity);

      if (itemCategory === "pole") {
        formDataToSend.append("weight", parsedWeight);
        formDataToSend.append("flex", parsedFlex);
        formDataToSend.append("length", parsedLength);
      }

      for (const image of formData.images) {
        formDataToSend.append("images", image);
      }
      const response = await fetch(`${import.meta.env.VITE_DEPLOYED_BACKEND_URL}/api/post/`, {
        method: "POST",
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      const data = await response.json();
      setListingId(data.id);
      setPosted(true);

    } catch (err) {
      setError("Failed to create listing. Please try again.");
      
      if (err.response) {
        const errorMessage = await err.response.text();
        console.error('Server response:', errorMessage);
        setError(`Server error: ${errorMessage}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
  }, [posted, formData.itemCategory]);

  if (!isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="rounded-lg border p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Not signed in</h2>
          <p className="text-gray-600">Please sign in to list your pole.</p>
        </div>
      </div>
    );
  }

  return !posted ? (
    <div className="flex-1 w-full bg-white px-4 py-4">
      <div className="mx-auto w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-extrabold text-gray-800">Sell Your Pole</h1>
          <p className="text-gray-600">Please provide details and images of your pole</p>
        </div>
        {error && (
          <div className="mb-4 w-full rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Short, catchy title"
              className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ex: Atlanta"
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                Maximum price: $9,999,999.99
                </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Condition <span className="text-red-500">*</span>
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Item Category <span className="text-red-500">*</span>
            </label>
            <select
              name="itemCategory"
              value={formData.itemCategory}
              onChange={handleChange}
              className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value="">Select Item Category</option>
              <option value="pole">Pole</option>
              <option value="spikes">Spikes</option>
              <option value="clothes">Clothes</option>
              <option value="pit">Pit</option>
              <option value="standards">Standards</option>
              <option value="bar">Crossbar/Bungee</option>
              <option value="other">Other</option>
            </select>
          </div>
         
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Brand <span className="text-red-500">*</span>
            </label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value="">Select Brand</option>
              {formData.itemCategory === "pole" && (
                <>
                <option value="essx">ESSX</option>
                <option value="spirit">UCS Spirit</option>
                <option value="pacer">Pacer</option>
                <option value="skypole">Skypole</option>
                <option value="dynasty">Dynasty</option>
                <option value="nordic">Nordic</option>
                <option value="fibersport">Fibersport</option>
                <option value="other">Other</option>
                </>
              )}
              {(formData.itemCategory === "spikes" || formData.itemCategory === "clothes")&& (
                <>
                <option value="nike">Nike</option>
                <option value="puma">Puma</option>
                <option value="adidas">Adidas</option>
                <option value="other">Other</option>
                </>
              )}
              {(formData.itemCategory === "pit" || formData.itemCategory === "standards"  || formData.itemCategory === "bar") && (
                <>
                <option value="gill">Gill Athletics</option>
                <option value="richey">Richey Athletics</option>
                <option value="first place">First Place</option>
                <option value="other">Other</option>
                </>
              )}
            </select>
            {formData.brand === "other" && (
              <input
                type="text"
                name="brandCustom"
                value={formData.brandCustom}
                onChange={handleChange}
                placeholder="Enter custom brand"
                className="mt-2 w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            )}
          </div>
          {formData.itemCategory === "pole" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                Length (ft) <span className="text-red-500">*</span>
              </label>
              <select
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Length</option>
                {[...Array(23)].map((_, i) => {
                  const lengthVal = 6 + i * 0.5;
                  return (
                    <option key={lengthVal} value={lengthVal}>
                      {Math.floor(lengthVal)}
                      {lengthVal % 1 ? "'6\"" : "'0\""}
                    </option>
                  );
                })}
                <option value="other">Other</option>
              </select>
              {formData.length === "other" && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="number"
                    name="lengthFeet"
                    value={formData.lengthFeet}
                    onChange={handleChange}
                    placeholder="Feet"
                    className="w-full rounded border border-gray-300 px-2 py-2 focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="lengthInches"
                    value={formData.lengthInches}
                    onChange={handleChange}
                    placeholder="Inches"
                    className="w-full rounded border border-gray-300 px-2 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Weight (lbs) <span className="text-red-500">*</span>
              </label>
              <select
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Weight</option>
                {[...Array(39)].map((_, i) => {
                  const weightVal = 50 + i * 5;
                  return (
                    <option key={weightVal} value={weightVal}>
                      {weightVal}
                    </option>
                  );
                })}
                <option value="other">Other</option>
              </select>
              {formData.weight === "other" && (
                <input
                  type="number"
                  name="weightCustom"
                  value={formData.weightCustom}
                  onChange={handleChange}
                  placeholder="Custom weight"
                  className="mt-2 w-full rounded border border-gray-300 px-2 py-2 focus:border-blue-500 focus:outline-none"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Flex <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="flex"
                value={formData.flex}
                onChange={handleChange}
                placeholder="Enter flex"
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:outline-none"
              />
            </div> 
          </div>
          )}

          {(formData.itemCategory === "spikes" || formData.itemCategory === "clothes") && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Size <span className="text-red-500">*</span>
              </label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Size</option>
                  {formData.itemCategory === "spikes" && [...Array(30)].map((_, i) => {
                    const size = 3 + i * .5;
                    return (
                      <option key={size} value={size}>
                        Mens {size} / Womens {size + 1.5}
                      </option>
                    );
                  })}
                  {formData.itemCategory === "clothes" && (
                    <>
                    <option value="xxs"> XXS </option>
                    <option value="xs"> XS </option>
                    <option value="s"> S </option>
                    <option value="m"> M </option>
                    <option value="l"> L </option>
                    <option value="xl"> XL </option>
                    <option value="xxl"> XXL </option>
                    </>
                  )}
                <option value="other">Other</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a detailed description..."
              maxLength={MAX_DESCRIPTION_LENGTH}
              className="w-full h-32 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none resize-none"
            />
            <span className={`text-xs ${remainingChars < 50 ? 'text-orange-500' : 'text-gray-500'}`}>
                {remainingChars} characters remaining
            </span>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image(s) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full h-12 rounded-lg border border-gray-300 px-4 py-2 file:mr-4 file:py-2 file:px-4 
              file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 
              hover:file:bg-gray-200 focus:outline-none"
            />
          </div>
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I have read and agree to the{' '}
              <button
                type="button"
                onClick={() => setIsTermsOpen(true)}
                className="text-blue-500 hover:text-blue-600"
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(true)}
                className="text-blue-500 hover:text-blue-600"
              >
                Privacy Policy
              </button>
            </label>
          </div>
          <p className="text-gray-500 pb-6"><span className="text-red-500">*</span> indicates a required field</p>
          <button
            type="submit"
            disabled={isSubmitting || !acceptedTerms}
            className={`w-full h-12 rounded-lg font-semibold text-white transition
            ${isSubmitting || !acceptedTerms ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {isSubmitting ? "Creating Listing..." : "List Pole"}
          </button>
        </form>
      </div>
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
        <div className="relative mx-auto w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
            <div className="flex flex-col items-center space-y-6">
                <ConfettiExplosion 
                particleCount={200}
                duration={3000}
                />
                <h1 className="text-6xl">🎉</h1>
                <h2 className="text-2xl font-bold text-gray-800">Congratulations!</h2>
                <p className="text-gray-600 text-center">
                Your listing has been successfully posted.
                </p>
                <Link
                to={RoutePaths.CURRENT_LISTING.replace(':id', listingId)}
                className="px-6 py-2 text-white font-semibold bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                >
                View Listing
                </Link>
            </div>
        </div>
    </div>
  );
};

export default Sell;