export const PoleCard = ({ brand, length, weight, condition, price, imageUrl }) => {
    return (
        <div className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-2 h-40 bg-gray-100 overflow-hidden rounded-lg">
                <img 
                    src={imageUrl} 
                    alt={`${brand} ${length}' ${weight}lbs pole`}
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className="font-semibold">{`${brand} ${length}' ${weight}lbs`}</h3>
            <p className="text-gray-600">{condition} Condition</p>
            <p className="mt-2 font-bold text-blue-500">${price}</p>
        </div>
    );
};