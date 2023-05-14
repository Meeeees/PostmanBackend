const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const { User, Product, Order, Payment } = require('./schemas/schemas');
const { GetUsers, CreateUser } = require('./Controllers/UserController');
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

app.post('/auth/login', CreateToken)
app.post('/auth/refresh', RefreshToken)
