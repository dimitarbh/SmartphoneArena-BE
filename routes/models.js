import express from 'express'
import brandModels from '../models/brandModels'

const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const models = await brandModels.find()
        res.json(models)
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const currentModel = await brandModels.findById(req.params.id)
        res.json(book)
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

router.post('/', async (req, res) => {
    const {images, brand, price, releaseDate, specifications, displaySize, RAM, storage, cameraResolution, batteryCapacity} = req.body;
    try {
        const newModel = new brandModels({
            images, 
            brand, 
            price, 
            releaseDate, 
            specifications, 
            displaySize, 
            RAM, 
            storage, 
            cameraResolution, 
            batteryCapacity
        })
        await newModel.save()
        res.status(201).json({message: 'Model created successfully'})
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

export default router