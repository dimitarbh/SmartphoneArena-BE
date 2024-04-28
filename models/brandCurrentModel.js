import mongoose from 'mongoose';

const brandModelsSchema = new mongoose.Schema({
    images: [{ type: String, required: true }],
    brand: {type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true},
    model: {type: String, required: true},
    price: { type: Number },
    releaseDate: { type: Date },
    displaySize: { type: String },
    RAM: { type: String },
    storage: { type: String },
    cameraResolution: { type: String },
    batteryCapacity: { type: String },
})

const brandCurrentModel = mongoose.model('Brand models', brandModelsSchema, 'BrandModels')

export default brandCurrentModel