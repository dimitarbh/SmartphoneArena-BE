import express from 'express';
import bcrypt from 'bcrypt';
const User = import '../models/user'

const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const existingUser = await User.findOne({username});
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }
        const existingEmail = await User.findOne({email});
        if(existingEmail) {
            return res.status(400).json({message: 'Email already exists'});
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        })
        await newUser.save()
        const userData = {
            email: email,
            username: username
        }
        res.status(201).json({message: 'User created successfully', user:  userData})
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }

})

router.post('/login', async (req, res) => {

    const {email, password} = req.body;
    try {
        const existingEmail = await User.findOne({email});
        if(!existingEmail) {
            return res.status(400).json({message: 'Email does not exists'});
        }

        const isMatch = await bcrypt.compare(password, existingEmail.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const userData = {
            email: email,
        }
        res.status(200).json({message: 'Login successful', user:  userData})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

router.get('/profile', async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email});
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

export default router
