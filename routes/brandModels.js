import express from 'express'
import brands from '../models/Brand.js'

const router = express.Router()

router.get('/:brandId/models', async (req, res) => {
    try {
        const brandId = req.params.brandId;
        const brand = await brands.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json({ message: 'Models retrieved successfully', models: brand.models });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router
