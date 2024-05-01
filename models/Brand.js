import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    image: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }
})

const Brand = mongoose.model('Brand', BrandSchema, 'Brand')

export default Brand;
