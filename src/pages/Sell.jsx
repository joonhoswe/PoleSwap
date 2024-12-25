import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'

export const Sell = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    let email = "";
    if (isSignedIn) {
        email = user.primaryEmailAddress?.emailAddress;
    }

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        brand: '',
        length: '',
        weight: '',
        condition: '',
        price: '',
        description: '',
        images: [],
        owner: email
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Store selected files in our state
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: files
        }));
    };

    // Submit the form data (including images) to Django
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            // Basic validation
            if (!formData.brand || !formData.length || !formData.weight || 
                !formData.condition || !formData.price || !formData.description) {
                setError('Please fill in all required fields');
                return;
            }

            // Build a FormData with text fields + all images
            const formDataToSend = new FormData();
            formDataToSend.append('brand', formData.brand);
            formDataToSend.append('length', formData.length);
            formDataToSend.append('weight', formData.weight);
            formDataToSend.append('condition', formData.condition);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('description, formData.description')

            for (const image of formData.images) {
                formDataToSend.append('images', image);
            }

            formDataToSend.append('owner', formData.owner);

            // POST to Django
            const response = await fetch('http://127.0.0.1:8000/api/post/', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Failed to create listing');
            }
            
            console.log("Successfully uploaded image.")
            // On success, navigate somewhere (e.g. /listings)
            // navigate('/listings');
        } catch (err) {
            setError('Failed to create listing. Please try again.');
            console.error('Error creating listing:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSignedIn) return (
        <div className="mt-10 flex w-full flex-col items-center px-4 text-black">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">Sell Your Pole</h1>
                <p className="text-gray-600">List your pole vaulting pole for sale</p>
            </div>

            {error && (
                <div className="mb-4 w-full max-w-xl rounded-lg bg-red-50 p-4 text-red-500">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
                {/* BRAND */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Brand</label>
                    <select 
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                    >
                        <option value="">Select Brand</option>
                        <option value="essx">ESSX</option>
                        <option value="spirit">UCS Spirit</option>
                        <option value="pacer">Pacer</option>
                        <option value="nordic">Nordic</option>
                        <option value="altius">Altius</option>
                    </select>
                </div>

                {/* LENGTH */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Length (ft)</label>
                    <select 
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                    >
                        <option value="">Select Length</option>
                        {[...Array(23)].map((_, i) => {
                            const lengthVal = 6 + i * 0.5;
                            return (
                                <option key={lengthVal} value={lengthVal}>
                                    {Math.floor(lengthVal)}'
                                    {lengthVal % 1 ? '6"' : ''}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* WEIGHT */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Weight (lbs)</label>
                    <select 
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
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
                    </select>
                </div>

                {/* CONDITION */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Condition</label>
                    <select 
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                    >
                        <option value="">Select Condition</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>

                {/* PRICE */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Enter price"
                    />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Description</label>
                    <input
                        type="string"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full h-48 rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Describe your pole"
                    />
                </div>

                {/* IMAGES */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                    />
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {isSubmitting ? 'Creating Listing...' : 'List Pole'}
                </button>
            </form>
        </div>
    );

    return <div> not signed in </div>
};