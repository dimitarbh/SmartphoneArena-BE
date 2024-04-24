import express from 'express'
import brands from '../models/brands'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const brand = await brands.find()
        res.status(201).json({message: 'Brand received', brand})
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

router.post('/', async (req, res) => {
    const {image, brand} = req.body;
    try {
        const newBrand = new brands({
            image, 
            brand
        })
        await newBrand.save()
        res.status(201).json({message: 'Brand created successfully'})
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

export default router