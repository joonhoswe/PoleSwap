import { PoleCard } from "../components/PoleCard";

export const Home = () => {
    return (
        <div className="mt-10 flex w-full flex-col items-center px-4 text-black">
            {/* Hero Section */}
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">Find Your Perfect Pole</h1>
                <p className="text-gray-600">Browse through thousands of pole vaulting poles</p>
            </div>

            {/* Search Section */}
            <div className="w-full max-w-3xl">
                {/* Main Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search poles..."
                        className="w-full rounded-full border border-gray-300 px-6 py-3 shadow-sm focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {/* Filters */}
                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {/* Brand Filter */}
                    <select className="rounded-lg border border-gray-300 px-4 py-2">
                        <option value="">Brand</option>
                        <option value="essx">ESSX</option>
                        <option value="spirit">UCS Spirit</option>
                        <option value="pacer">Pacer</option>
                        <option value="nordic">Nordic</option>
                        <option value="altius">Altius</option>
                    </select>

                    {/* Weight Filter */}
                    <select className="rounded-lg border border-gray-300 px-4 py-2">
                        <option value="">Weight (lbs)</option>
                        {[...Array(39)].map((_, i) => (
                            <option key={50 + i * 5} value={50 + i * 5}>
                                {50 + i * 5}
                            </option>
                        ))}
                    </select>

                    {/* Length Filter */}
                    <select className="rounded-lg border border-gray-300 px-4 py-2">
                        <option value="">Length (ft)</option>
                        <option value="6">6'</option>
                        <option value="6.6">6' 6"</option>
                        <option value="7">7'</option>
                        <option value="7.6">7' 6"</option>
                        <option value="8">8'</option>
                        <option value="8.6">8' 6"</option>
                        <option value="9">9'</option>
                        <option value="9.6">9' 6"</option>
                        <option value="10">10'</option>
                        <option value="10.6">10' 6"</option>
                        <option value="11">11'</option>
                        <option value="11.6">11' 6"</option>
                        <option value="12">12'</option>
                        <option value="12.6">12' 6"</option>
                        <option value="13">13'</option>
                        <option value="13.6">13' 6"</option>
                        <option value="14">14'</option>
                        <option value="14.6">14' 6"</option>
                        <option value="15">15'</option>
                        <option value="15.6">15' 6"</option>
                        <option value="16">16'</option>
                        <option value="16.6">16' 6"</option>
                        <option value="17">17'</option>
                    </select>

                    {/* Condition Filter */}
                    <select className="rounded-lg border border-gray-300 px-4 py-2">
                        <option value="">Condition</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>

                {/* Results Section */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <PoleCard
                          brand="Nordic"
                          length="14"
                          weight={140}
                          condition="New"
                          price={599}
                          imageUrl="/placeholder.jpg"
                      />
                </div>
            </div>
        </div>
    );
};
