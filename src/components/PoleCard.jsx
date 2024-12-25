import { Link } from "react-router-dom";
import { RoutePaths } from "../general/RoutePaths";
import Fallback from "../assets/Fallback.jpg";

export const PoleCard = ({ id, brand, length, weight, condition, price, imageUrls }) => {
    const feet = Math.floor(length);
    const inches = Math.round((length - feet) * 12);

    return (
        <Link to={`${RoutePaths.CURRENT_LISTING.replace(':id', id)}`} className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-lg transition-shadow bg-white">
            <div className="mb-2 h-40 bg-gray-100 overflow-hidden rounded-lg flex items-center justify-center">
                {imageUrls.length > 0 ? (
                    <img 
                        src={imageUrls[0]} 
                        alt={`${brand} ${length}' ${weight}lbs pole`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <img src={Fallback} alt="Fallback" className="w-full h-full object-cover" />
                )}
            </div>
            <h3 className="font-semibold text-lg">{`${brand} ${feet}' ${inches}" ${weight}lbs`}</h3>
            <p className="text-gray-600">{condition}</p>
            <p className="mt-2 font-bold text-blue-500">${price}</p>
        </Link>
    );
};