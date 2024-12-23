import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
});

export const Sell = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        brand: '',
        length: '',
        weight: '',
        condition: '',
        price: '',
        images: []
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: files
        }));
    };

    const uploadImagesToS3 = async () => {
        const imageUrls = [];
        for (const file of formData.images) {
            const fileName = `${uuidv4()}-${file.name}`;
            const command = new PutObjectCommand({
                Bucket: "poleswapperimages",
                Key: fileName,
                Body: file,
                ContentType: file.type,
            });
            await s3Client.send(command);
            const url = `https://poleswapperimages.s3.amazonaws.com/${fileName}`;
            imageUrls.push(url);
        }
        return imageUrls;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            // Basic validation
            if (!formData.brand || !formData.length || !formData.weight || 
                !formData.condition || !formData.price) {
                setError('Please fill in all required fields');
                return;
            }

            const formDataToSend = new FormData();
            formDataToSend.append('brand', formData.brand);
            formDataToSend.append('length', formData.length);
            formDataToSend.append('weight', formData.weight);
            formDataToSend.append('condition', formData.condition);
            formDataToSend.append('price', formData.price);
            
            for (const image of formData.images) {
                formDataToSend.append('images', image);
            }

            const response = await fetch('http://127.0.0.1:8000/api/listings/', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Failed to create listing');
            }

            navigate('/listings');
        } catch (err) {
            setError('Failed to create listing. Please try again.');
            console.error('Error creating listing:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
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
                    <select 
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                    >
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
};