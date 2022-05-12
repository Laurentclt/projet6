const express = require('express');

const app = express();

app.post('/api/auth/signup', (req, res, next) => {
    console.log(req.body);
    res.status(200).json({message : "compte user créé !"})
})
app.post('/api/auth/login', (req, res, next) => {
    console.log(req.body);
    res.status(200).json({message : "user connecté !"})
})
app.get('/api/sauces', (req, res, next) => {
    res.status(200).json({message : "voila toutes les sauces !"})
})
app.get('/api/sauces/:id', (req, res, next) => {
    res.status(200).json({message : "voici la sauce demandée !"})
})
app.post('/api/sauces', (req, res, next) => {
    console.log(req.body)
    res.status(201).json({message : "la sauce a été ajoutée !"})
}) 
app.put('/api/sauces/:id', (req, res, next) => {
    console.log(req.body)
    res.status(200).json({message : "la sauce a été modifiée!"}) 
})
app.delete('/api/sauces/:id', (req, res, next) => {
    console.log(req.body)
    res.status(200).json({message : "la sauce a été supprimée!"}) 
})
app.post('/api/sauces/:id/like', (req, res, next) => {
    console.log(req.body)
    res.status(200).json({message : "like ajouté"})
})
    module.exports = app;