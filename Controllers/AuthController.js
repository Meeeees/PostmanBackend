const jwt = require('jsonwebtoken')
const { User } = require("../schemas/schemas")

const CreateToken = async (req, res) => {
    try {
        const user = await User.find(req.body)
        if (user.length !== 0) {
            const token = jwt.sign({ user: user }, process.env.secret, { expiresIn: 1000 * 60 * 60 })
            res.send({ "token": token })
        } else {
            res.send('Incorrect login')
        }
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

const RefreshToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1];


        jwt.verify(token, process.env.secret, function (err, decoded) {
            console.log(decoded)
            const token = jwt.sign({ user: decoded.user[0] }, process.env.secret, { expiresIn: 1000 * 60 * 60 })
            res.send({ "token": token })
        });
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


module.exports = {
    CreateToken,
    RefreshToken
}