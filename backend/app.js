const express = require('express');
const mongoose = require('mongoose')
const helmet = require("helmet");


const { dirname } = require('path');
const path = require('path')
const sauceRoutes = require('./routes/sauce');
const userRoutes = require ('./routes/user')

const app = express();

mongoose.connect('mongodb+srv://laurent:collet@hottakes.i0uha.mongodb.net/HotTakes?retryWrites=true&w=majority',
{    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connexion à MongoDB réussie'))
.catch(() => console.log('connexion à mongoDB échouée'))

app.use(express.json());
app.use(helmet());




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces' , sauceRoutes);

app.use('/api/auth', userRoutes)

module.exports = app;