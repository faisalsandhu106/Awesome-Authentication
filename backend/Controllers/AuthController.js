const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("../Models/UserSchema");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists, Please Login', success: false })
        }

        const UserModel = new userModel({ name, email, password })
        UserModel.password = await bcrypt.hash(password, 10)
        const jwtToken = jwt.sign(
            { email: UserModel.email, _id: UserModel._id },
            process.env.JWT_TOKEN,
            { expiresIn: '24h' },
        )
        res.status(201).json({
            message: 'User registered successfully',
            success: true,      
            jwtToken,
            email,
            name: UserModel.name
        })  

        await UserModel.save();

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false })
    }
};

const login = async (req, res) => {
    try {
        const error = 'Auth failed email or password incorrect';
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: error, success: false })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: error, success: false })
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_TOKEN,
            { expiresIn: '24h' },
        )

        res.status(200).json({
            message: 'User Login successfully',
            success: true,
            jwtToken,
            email,
            name: user.name
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false })
    }
};

module.exports = {
    signup,
    login
}