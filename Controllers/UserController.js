const { User } = require('../schemas/schemas')
const jwt = require('jsonwebtoken')

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

const DeleteUser = async (req, res) => {
    try {
        if (req.headers.authorization) {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            try {
                const decoded = jwt.verify(token, process.env.secret);
                const user = await User.findOneAndRemove(decoded.user[0]);
                console.log(user);
                res.send(user);
            } catch (error) {
                res.status(401).json({ message: "Invalid Authorization Header" });
            }
        } else {
            res.status(401).json({ message: "Missing Authorization Header" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const UpdateUser = async (req, res) => {
    try {
        if (req.headers.authorization) {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            try {
                const decoded = jwt.verify(token, process.env.secret);
                console.log(decoded.user)
                const user = User.findOneAndUpdate(decoded.user[0], req.body)
                res.send(user)
            } catch (error) {
                res.status(401).json({ message: "Invalid Authorization Header" });
            }
        } else {
            res.status(401).json({ message: "Missing Authorization Header" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    GetUsers,
    CreateUser,
    DeleteUser,
    UpdateUser
}