const Sauce = require('../models/Sauce')
const fs = require('fs')

exports.displayAllSauces =  (req, res, next) => {
   Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}

exports.displayOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }))
}

exports.addSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce ajoutée !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
      Sauce.updateOne({ _id: req.params.id}, {...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json( { message: 'Objet modifié'}))
      .catch(error => res.status(400).json({ error})) 
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
      (sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
        if (!sauce) {
          res.status(404).json({
            error: new Error('No such sauce!')
          });
        }
        if (sauce.userId !== req.auth.userId) {
          res.status(400).json({
            error: new Error('Unauthorized request!')
          });
        }
        Sauce.deleteOne({ _id: req.params.id }).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        )
        })
      }
    )
  }

exports.likeSauce =  (req, res, next) => {
    console.log(req.body)
    res.status(200).json({message : "like ajouté"})
}