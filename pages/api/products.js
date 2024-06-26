// api/products.js
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handle(req, res) {
    const { method } = req;
    try {
        await mongooseConnect();
    } catch (error) {
        console.error('Error connecting to the database:', error);
        return res.status(500).json({ message: 'Database connection error' });
    }

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                const product = await Product.findOne({ _id: req.query.id });
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                res.json(product);
            } else {
                const products = await Product.find();
                res.json(products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Error fetching products' });
        }
    }

    if (method === 'POST') {
        const { title, description, price, images, category, properties } = req.body;
        console.log('Received POST Data:', req.body);
        if (!title || !description || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        try {
            const productDoc = await Product.create({ title, description, price ,images, category, properties});
            res.json(productDoc);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: 'Error creating product' });
        }
    }
    if (method === "PUT") {
        const { title, description, price,images, category, properties,_id, } = req.body;
       await Product.updateOne({_id}, {title:title, description:description, price:price , images:images, category: category, properties:properties});
        res.json(true)
    }


    if (method === 'DELETE') {
        if(req.query?.id) {
            await Product.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}
