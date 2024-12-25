import { Link } from "react-router-dom";
import { RoutePaths } from "../general/RoutePaths";
import Fallback from "../assets/Fallback.jpg";

export const PoleCard = ({ 
  id, 
  title, 
  brand, 
  length, 
  weight, 
  condition, 
  price, 
  imageUrls 
}) => {
  const feet = Math.floor(length);
  const inches = Math.round((length - feet) * 12);

  // Condition-specific color styling
  const conditionStyles =
    condition.toLowerCase() === "new"
      ? "bg-green-100 text-green-600"
      : "bg-yellow-100 text-yellow-600";

  return (
    <Link
      to={RoutePaths.CURRENT_LISTING.replace(":id", id)}
      className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-lg transition-shadow bg-white"
    >
      <div className="mb-2 h-40 bg-gray-100 overflow-hidden rounded-lg flex items-center justify-center">
        {imageUrls.length > 0 ? (
          <img
            src={imageUrls[0]}
            alt={`${brand} ${length}' ${weight}lbs pole`}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={Fallback}
            alt="Fallback"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {/* Tags */}
      <div className="mb-2 flex flex-wrap gap-2">
        <span className="inline-block rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold px-2 py-1">
          {brand}
        </span>
        <span className="inline-block rounded-full bg-green-100 text-green-600 text-xs font-semibold px-2 py-1">
          {feet}'{inches}"
        </span>
        <span className="inline-block rounded-full bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1">
          {weight} lbs
        </span>
        <span
          className={`inline-block rounded-full text-xs font-semibold px-2 py-1 ${conditionStyles}`}
        >
          {condition.toLowerCase() === "new" ? "New" : "Used"}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
        
      {/* Price */}
      <p className="font-bold text-blue-500">${price}</p>
    </Link>
  );
};