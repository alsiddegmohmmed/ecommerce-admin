// pages/products/[...id].js
import Layout from "@/components/Layout";
import ProductForm from "@/components/productForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const router = useRouter(); 
    const { id } = router.query;
    const [ProdcutInfo, setProductInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/api/products?id=' + id)
                .then(response => {
                    setProductInfo(response.data);
                })
                .catch(err => {
                    console.error('Error fetching product:', err);
                    setError('Error fetching product');
                });
        }
    }, [id]);

    if (error) {
        return <Layout><div>Error: {error}</div></Layout>;
    }

    if (!ProdcutInfo) {
        return <Layout>Loading...</Layout>;
    }

    return (
        <Layout>
            <h1>Edit Product</h1>
            <ProductForm {...ProdcutInfo} />
        </Layout>
    );
}
