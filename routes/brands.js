import express from 'express'
import brandModels from '../models/brandModels.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const models = await brandModels.find()
        res.status(201).json({message: 'Model received', models})
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

// router.post

export default router