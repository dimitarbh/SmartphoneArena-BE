import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { secretKey } from '../src/config.js';

const router = express.Router();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token) return res.status(401).send('Access denied');

    jwt.verify(token, secretKey, (err, user) => {
        if(err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
};

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
        const token = jwt.sign({ email}, secretKey, { expiresIn: '1h'});
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', token, user: userData});
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
        const token = jwt.sign({ email}, secretKey, { expiresIn: '1h'});
        res.status(200).json({ message: 'Login successful', token, user: userData });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' })
    }
})


router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email});
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

export default router
