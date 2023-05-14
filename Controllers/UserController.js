const { User } = require('../schemas/schemas')

const GetUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err);
    }
}

const CreateUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            res.status(400).json({ message: 'Email already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};



module.exports = {
    GetUsers,
    CreateUser
}