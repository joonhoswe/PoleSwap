import { Link } from "react-router-dom";
import Fallback from "../assets/Fallback.jpg";

export const PoleCard = ({ id, brand, length, weight, condition, price, imageUrl }) => {
    return (
        <Link to={`/listings/${id}`} className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-lg transition-shadow bg-white">
            <div className="mb-2 h-40 bg-gray-100 overflow-hidden rounded-lg flex items-center justify-center">
                <img 
                    src={imageUrl || Fallback} 
                    alt={`${brand} ${length}' ${weight}lbs pole`}
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className="font-semibold text-lg">{`${brand} ${length}' ${weight}lbs`}</h3>
            <p className="text-gray-600">{condition}</p>
            <p className="mt-2 font-bold text-blue-500">${price}</p>
        </Link>
    );
};