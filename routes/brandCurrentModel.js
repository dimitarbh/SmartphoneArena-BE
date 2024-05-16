import express from 'express'
import brandCurrentModel from '../models/brandCurrentModel.js'
import Brand from '../models/Brand.js'

const router = express.Router()

router.get('/:modelId', async (req, res) => {
    try {
        const currentModel = await brandCurrentModel.findById(req.params.modelId);
        res.status(201).json({message: 'Model ID received', currentModel})
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

router.post('/', async (req, res) => {
    const { images, brand, model, price, releaseDate, displaySize, RAM, storage, cameraResolution, batteryCapacity } = req.body;
    if (!mongoose.Types.ObjectId.isValid(brand)) {
        return res.status(400).json({ message: 'Invalid brand ObjectId' });
    }

    try {
        const brandExists = await Brand.findById(brand);
        if (!brandExists) {
        return res.status(400).json({ message: 'Brand not found' });
        }
        const newModel = new brandCurrentModel({
            images,
            brand,
            model,
            price,
            releaseDate,
            displaySize,
            RAM,
            storage,
            cameraResolution,
            batteryCapacity
        });
        
        await newModel.save();
        
        res.status(201).json({ message: 'Model created successfully', model: newModel });
    } catch (error) {
        console.error('Error creating model:', error.message);
        if(error.code === 11000) {
            res.status(400).json({ message: 'Duplicate key error', details: error.keyValue });
        } else {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
});

router.post('/:id/specifications', async (req, res) => {
    const { specifications } = req.body;
    const { id } = req.params;

    try {
        const existingModel = await brandCurrentModel.findById(id);
        if (!existingModel) {
            return res.status(404).json({ message: 'Model not found' });
        }

        existingModel.specifications = specifications;

        await existingModel.save();

        res.status(200).json({ message: 'Specifications updated successfully', model: existingModel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router
