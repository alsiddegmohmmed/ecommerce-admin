// lib/mongoose.js
import mongoose from 'mongoose';

export async function mongooseConnect() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
}
