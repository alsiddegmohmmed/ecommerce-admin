import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function ProductForm({_id, title: existingTitle, description: existingDescription, price: existingPrice}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [error, setError] = useState(null);
    const router = useRouter();  // Call useRouter() as a function

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, description, price };

        try { 
            if (_id) {
                await axios.put('/api/products', { ...data, _id });
            } else {
                await axios.post('/api/products', data);
            }
            router.push('/products'); // Redirect to products page upon successful creation

        } catch (err) {
            console.error(err);
            setError('An error occurred while creating the product. Please try again.');
        }
    }

    return (
        <form onSubmit={saveProduct}>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <label>
                Product Name
            </label>
            <input 
                type="text" 
                placeholder="Product name" 
                value={title} 
                onChange={ev => setTitle(ev.target.value)} 
            />
            <label>
                Description
            </label>
            <textarea
                placeholder="Description" 
                value={description}
                onChange={ev => setDescription(ev.target.value)}
            />
            <label>
                Price 
            </label>
            <input 
                type="number" 
                placeholder="Price"
                value={price}
                onChange={ev => setPrice(ev.target.value)}
            />
            <button type="submit" className="btn-primary">Save</button>
        </form>
    );
}
