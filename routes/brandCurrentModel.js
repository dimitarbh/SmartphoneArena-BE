import express from 'express'
import brandCurrentModel from '../models/brandCurrentModel.js'

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
    
    try {
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
        console.error(error);
        res.status(500).json({ message: 'Server error' });
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
