import mongoose from 'mongoose';

const brandModelsSchema = new mongoose.Schema({
    images: [{ type: String, required: true }],
    brand: {type: String, required: true, unique: true},
    price: { type: Number },
    releaseDate: { type: Date },
    specifications: modelSpecificationsSchema,
    displaySize: { type: String },
    RAM: { type: String },
    storage: { type: String },
    cameraResolution: { type: String },
    batteryCapacity: { type: String },
})

const brandModels = mongoose.model('Brand models', brandModelsSchema, 'BrandModels')

export default brandModels