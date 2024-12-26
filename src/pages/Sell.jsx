import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { RoutePaths } from "../general/RoutePaths";
import ConfettiExplosion from "react-confetti-explosion";

export const Sell = () => {
  const { isSignedIn, user } = useUser();
  let email = "";
  if (isSignedIn) {
    email = user?.primaryEmailAddress?.emailAddress ?? "";
  }
  const [formData, setFormData] = useState({
    title: "",
    condition: "",
    price: "",
    brand: "",
    brandCustom: "",
    length: "",
    lengthFeet: "",
    lengthInches: "",
    weight: "",
    weightCustom: "",
    description: "",
    images: [],
    owner: email,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [listingId, setListingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        length,
        lengthFeet,
        lengthInches,
        weight,
        weightCustom,
        description,
      } = formData;
      if (
        !title ||
        !condition ||
        !price ||
        (!brand && !brandCustom) ||
        (!length && !lengthFeet && !lengthInches) ||
        (!weight && !weightCustom) ||
        !description
      ) {
        setError("Please fill in all required fields.");
        return;
      }
      let finalBrand = brand !== "other" ? brand : brandCustom.trim();
      let finalWeight = weight !== "other" ? weight : weightCustom.trim();
      let finalLength;
      if (length !== "other") {
        const lengthParts = length.split("'").map(part => part.trim());
        const feet = parseFloat(lengthParts[0]) || 0;
        const inches = parseFloat(lengthParts[1]) || 0;
        finalLength = feet + inches / 12;
      } else {
        const feet = parseFloat(lengthFeet || "0");
        const inches = parseFloat(lengthInches || "0") / 12;
        finalLength = feet + inches;
      }
      const parsedPrice = parseFloat(price);
      const parsedWeight = parseInt(finalWeight, 10);
      const parsedLength = parseFloat(finalLength);
      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("condition", condition);
      formDataToSend.append("price", parsedPrice);
      formDataToSend.append("brand", finalBrand);
      formDataToSend.append("weight", parsedWeight);
      formDataToSend.append("length", parsedLength);
      formDataToSend.append("description", description);
      formDataToSend.append("owner", formData.owner);
      for (const image of formData.images) {
        formDataToSend.append("images", image);
      }
      const response = await fetch("http://127.0.0.1:8000/api/post/", {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
  }, [posted]);

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
    <div className="h-screen w-full bg-white px-4 py-4">
      <div className="mx-auto w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-extrabold text-gray-800">Sell Your Pole</h1>
          <p className="text-gray-600">Provide details and images of your pole</p>
        </div>
        {error && (
          <div className="mb-4 w-full rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Condition <span className="text-red-500">*</span>
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
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
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Brand <span className="text-red-500">*</span>
            </label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Brand</option>
              <option value="essx">ESSX</option>
              <option value="spirit">UCS Spirit</option>
              <option value="pacer">Pacer</option>
              <option value="nordic">Nordic</option>
              <option value="altius">Altius</option>
              <option value="other">Other</option>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Length (ft) <span className="text-red-500">*</span>
              </label>
              <select
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
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
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
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
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a detailed description..."
              className="w-full h-28 resize-none rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
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
              className="w-full rounded border border-gray-300 px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200 focus:outline-none"
            />
          </div>
          <p className="text-gray-500 pb-6"><span className="text-red-500">*</span> indicates a required field</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-2 w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white transition ${
              isSubmitting ? "cursor-not-allowed bg-blue-300" : "hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Creating Listing..." : "List Pole"}
          </button>
        </form>
      </div>
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