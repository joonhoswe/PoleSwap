export const Sell = () => {
    return (
        <div className="mt-10 flex w-full flex-col items-center px-4 text-black">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">Sell Your Pole</h1>
                <p className="text-gray-600">List your pole vaulting pole for sale</p>
            </div>

            <form className="w-full max-w-xl space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Brand</label>
                    <select className="w-full rounded-lg border border-gray-300 px-4 py-2">
                        <option value="">Select Brand</option>
                        <option value="essx">ESSX</option>
                        <option value="spirit">UCS Spirit</option>
                        <option value="pacer">Pacer</option>
                        <option value="nordic">Nordic</option>
                        <option value="altius">Altius</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Length (ft)</label>
                    <select className="w-full rounded-lg border border-gray-300 px-4 py-2">
                        <option value="">Select Length</option>
                        {[...Array(23)].map((_, i) => {
                            const length = 6 + i * 0.5;
                            return (
                                <option key={length} value={length}>
                                    {Math.floor(length)}'{length % 1 ? '6"' : ''}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Weight (lbs)</label>
                    <select className="w-full rounded-lg border border-gray-300 px-4 py-2">
                        <option value="">Select Weight</option>
                        {[...Array(39)].map((_, i) => (
                            <option key={50 + i * 5} value={50 + i * 5}>
                                {50 + i * 5}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Condition</label>
                    <select className="w-full rounded-lg border border-gray-300 px-4 py-2">
                        <option value="">Select Condition</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Price ($)</label>
                    <input
                        type="number"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Enter price"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    List Pole
                </button>
            </form>
        </div>
    );
};