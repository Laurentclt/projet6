const User = require('../models/User')

exports.signUp = (req, res, next) => {
    console.log('hello');
    res.status(200).json({message : "compte user créé !"})
}
exports.login = (req, res, next) => {
    console.log('hello');
    res.status(200).json({message : "user connecté !"})
}