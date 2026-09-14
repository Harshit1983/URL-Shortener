const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide name, email, and password' })
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'A user with this email already exists' })
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        const payload = {
            id: newUser._id
        }

        const token = (payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.cookie('token', token)


        res.status(201).json({
            success: true,
            message: 'user register successfully',
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        })
    }
    catch (error) {
        console.log('Registration Error:', error)
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' })
        }
        const user = await User.findOne({ email }).select('+password');


        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({
                message: "invalid credentials"
            })
        }
        // genrate token
        const payload = {
            user: {
                id: user._id
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.cookie("token", token);

        res.status(200).json({ success: true, token: token, message: 'login successfully' })
    }
    catch (error) {
        next(error)
    }


}

module.exports = { registerUser, loginUser }