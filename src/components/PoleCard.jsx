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
  imageUrls,
  state,
  city,
  itemCategory,
  size
}) => {
  // Only calculate feet/inches for poles
  const feet = itemCategory === 'pole' && length ? Math.floor(length) : null;
  const inches = itemCategory === 'pole' && length ? Math.round((length - feet) * 12) : null;

  // Condition-specific color styling
  const conditionStyles =
    condition?.toLowerCase() === "new"
      ? "bg-green-100 text-green-600"
      : "bg-yellow-100 text-yellow-600";

  // Category-specific color
  const getCategoryColor = (category) => {
    const colors = {
      'pole': 'bg-blue-100 text-blue-600',
      'spikes': 'bg-purple-100 text-purple-600',
      'clothes': 'bg-pink-100 text-pink-600',
      'pit': 'bg-amber-100 text-amber-600',
      'standards': 'bg-teal-100 text-teal-600',
      'bar': 'bg-indigo-100 text-indigo-600',
      'other': 'bg-gray-100 text-gray-600'
    };
    return colors[category] || colors.other;
  };

  return (
    <Link
      to={RoutePaths.CURRENT_LISTING.replace(":id", id)}
      className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-lg transition-shadow bg-white"
    >
      <div className="mb-2 h-40 bg-gray-100 overflow-hidden rounded-lg flex items-center justify-center">
        {imageUrls?.length > 0 ? (
          <img
            src={imageUrls[0]}
            alt={title}
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
        <span
          className={`inline-block rounded-full text-xs font-semibold px-2 py-1 ${conditionStyles}`}
        >
          {condition?.toLowerCase() === "new" ? "New" : "Used"}
        </span>
        
        {/* Category tag */}
        <span className={`inline-block rounded-full text-xs font-semibold px-2 py-1 ${getCategoryColor(itemCategory)}`}>
          {itemCategory ? itemCategory.charAt(0).toUpperCase() + itemCategory.slice(1) : 'Unknown'}
        </span>
        
        {/* Brand tag */}
        <span className="inline-block rounded-full bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1">
          {brand || 'Unknown'}
        </span>
        
        {/* Item-specific tags */}
        {itemCategory === 'pole' && (
          <>
            <span className="inline-block rounded-full bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1">
              {feet}'{inches}"
            </span>
            <span className="inline-block rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold px-2 py-1">
              {weight} lbs
            </span>
          </>
        )}
        
        {(itemCategory === 'spikes' || itemCategory === 'clothes') && size && (
          <span className="inline-block rounded-full bg-lime-100 text-lime-600 text-xs font-semibold px-2 py-1">
            Size: {size}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        
      {/* Price */}
      <p className="font-bold text-blue-500">${price}</p>

      {/* Location */}
      <p className="text-gray-500 text-sm">{city}, {state}</p>
    </Link>
  );
};