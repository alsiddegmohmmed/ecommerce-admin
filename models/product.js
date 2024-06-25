import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    description: {
        type: String 
    },
    price: {
        type: Number, 
        required: true
    }, 
    images: {
        type: [{type:String}] // Array of strings to store image URLs
    },
    category: {type:mongoose.Types.ObjectId, ref:'Category'}

});

export const Product = models.Product || model('Product', ProductSchema);
