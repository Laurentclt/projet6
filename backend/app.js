const express = require('express');

const app = express();
const sauceRoutes = require('./routes/sauce');
const userRoutes = require ('./routes/user')

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use((req, res, next)=> {
    console.log("server = on")
    res.status(200)
    next()
})
// app.get('/api/sauces', (req, res, next) => {
//     res.status(200).json({message : "voila toutes les sauces !"})
// })
// app.get('/api/sauces/:id', (req, res, next) => {
//     res.status(200).json({message : "voici la sauce demandée !"})
// })
// app.post('/api/sauces', (req, res, next) => {
//     console.log(req.body)
//     res.status(201).json({message : "la sauce a été ajoutée !"})
// }) 
// app.put('/api/sauces/:id', (req, res, next) => {
//     console.log(req.body)
//     res.status(200).json({message : "la sauce a été modifiée!"}) 
// })
// app.delete('/api/sauces/:id', (req, res, next) => {
//     console.log(req.body)
//     res.status(200).json({message : "la sauce a été supprimée!"}) 
// })
// app.post('/api/sauces/:id/like', (req, res, next) => {
//     console.log(req.body)
//     res.status(200).json({message : "like ajouté"})
// })


app.use('/api/sauces' , sauceRoutes);

app.use('/api/auth', userRoutes)

module.exports = app;