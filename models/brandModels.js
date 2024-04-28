import mongoose from 'mongoose';

const brandModelSchema = new mongoose.Schema({
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const BrandModel = mongoose.model('BrandModel', brandModelSchema);

export default BrandModel;
