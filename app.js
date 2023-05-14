const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const { User, Product, Order, Payment } = require('./schemas/schemas');
const app = express();
const port = process.env.PORT

app.use(express.json());


mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Listening on port ${port}...`)))

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(result => {
        res.send(result)
    })

})


