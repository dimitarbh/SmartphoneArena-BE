import express from 'express'
import brands from '../models/brands.js'

const router = express.Router()

router.get('/:brandId', async (req, res) => {
    const brandId = req.params.brandId;
    try {
        const brand = await brands.findById(brandId);
        if (!brand){
            return res.status(404).json({message: 'Brand not found'});
        }
        res.status(201).json({message: 'Brand received', brand});
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