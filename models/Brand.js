import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    image: { type: String, required: true },
    brand: {type: String, required: true, unique: true}
})

const Brand = mongoose.model('Brand', BrandSchema, 'Brand')

export default Brand;