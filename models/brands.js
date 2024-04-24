import mongoose from 'mongoose';

const brandsSchema = new mongoose.Schema({
    image: { type: String, required: true },
    brand: {type: String, required: true, unique: true}
})

const brands = mongoose.model('Brands', brandsSchema, 'Brands')

export default brands