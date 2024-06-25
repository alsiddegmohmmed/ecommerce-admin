// categoriesapi.js
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    if (method === 'GET') {
        res.json(await Category.find().populate('parent'));
    }

    if (method === 'POST') {
        const { name, parent } = req.body; // Adjusted
        const categoryDoc = await Category.create({ name, parent: parent || null }); // Adjusted
        res.json(categoryDoc);
    }

    if (method === 'PUT') {
        const { _id, name, parent } = req.body; // Adjusted
        const categoryDoc = await Category.updateOne({ _id }, { name, parent: parent || null }); // Adjusted
        res.json(categoryDoc);
    }

    if (method === 'DELETE') {
        const { _id } = req.query;
        await Category.deleteOne({ _id });
        res.json({ success: true });
    }
}
