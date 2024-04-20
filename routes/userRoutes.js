import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js'

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    try {
        if (!emailRegex.test(email)) {
            console.log('Invalid email address:', email);
            return res.status(400).json({ message: 'Invalid email address' });
        }
        if (!passwordRegex.test(password)) {
            console.log('Invalid password:', password);
            return res.status(400).json({ message: 'Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            console.log('Email already exists:', email);
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    try {
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
        }

        const existingEmail = await User.findOne({ email });
        if (!existingEmail) {
            console.log('Email already exists:', email);
            return res.status(400).json({ message: 'Email does not exist' });
        }

        const isMatch = await bcrypt.compare(password, existingEmail.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const userData = {
            email: email,
        }
        res.status(200).json({ message: 'Login successful', user: userData });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' })
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
