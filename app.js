const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const { User, Product, Order, Payment } = require('./schemas/schemas');
const { GetUsers, CreateUser, DeleteUser, UpdateUser } = require('./Controllers/UserController');
const { CreateToken, RefreshToken } = require('./Controllers/AuthController');
const app = express();
const port = process.env.PORT

app.use(express.json());


mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Listening on port ${port}...`)))

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', GetUsers)
app.post('/users', CreateUser)
app.delete('/users', DeleteUser)
app.put('/users', UpdateUser)


app.post('/auth/login', CreateToken)
app.post('/auth/refresh', RefreshToken)

app.post('/admintoken', async (req, res) => {
    const userlist = await User.find()
    console.log(userlist[0])
    const token = jwt.sign({ user: userlist[0] }, process.env.secret)
    res.send({ "token": token })
})