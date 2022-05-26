const Sauce = require("../models/Sauce");
const fs = require("fs");
const { parse } = require("path");

// Afficher toutes les sauces
exports.displayAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

// Afficher une sauce
exports.displayOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// ajouter une sauce
exports.addSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce ajoutée !" }))
    .catch((error) => res.status(500).json({ message: error }));
};

// modifier une sauce
exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
    if (sauceObject.userId !== req.auth.userId) {
      res.status(401).json({
        error: new Error("Unauthorized request!").message,
      });
    }
    else {Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "sauce modifiée" }))
    .catch((error) => res.status(500).json({ error }));}
};

// supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images/")[1];
      if (!sauce) {
        res.status(400).json({
          error: new Error("No such sauce!").message,
        });
      }
      else if (sauce.userId !== req.auth.userId) {
        res.status(401).json({
          error: new Error("Unauthorized request!").message,
        });
      }
      else { Sauce.deleteOne({ _id: req.params.id })
        .then(() => {
          fs.unlink(`images/${filename}`, (error) => {
            if (error) {
              res.status(500).json({message: error})
            }
            else {
              res.status(200).json({
              message: "Deleted!",
              });
            }    
          })
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
      }  
  });
};

// ajouter/enlever un like/dislike
exports.likeSauce = (req, res, next) => {
// si l'utilisateur clique sur le bouton like
  if (req.body.like === 1) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const indexLike = sauce.usersLiked.indexOf(req.body.userId);

        if (indexLike === -1) {
          sauce.usersLiked.push(req.body.userId);
          sauce.likes ++;
          saveSauce(sauce, 201, "like ajouté", res)
        } else {
          console.log("error");
        }
      })
      .catch((error) => res.status(500).json({ error }));
  // si l'utilisateur clique sur le bouton dislike
  } else if (req.body.like === -1) {

    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const indexDislike = sauce.usersDisliked.indexOf(req.body.userId);
       
        if (indexDislike === -1) {
          sauce.usersDisliked.push(req.body.userId);
          sauce.dislikes ++;
          saveSauce(sauce, 201, "dislike ajouté", res)

        } else {
          console.log("error");
        }
      })
      .catch((error) => res.status(500).json({ error }));
  // annule le like/dislike si l'utilisateur re-clique sur le bouton like/dislike
  } else if (req.body.like === 0) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const indexDislike = sauce.usersDisliked.indexOf(req.body.userId);
        const indexLike = sauce.usersLiked.indexOf(req.body.userId);

        if (indexDislike > -1) {
          sauce.usersDisliked.splice(indexDislike, 1);
          sauce.dislikes--;
          saveSauce(sauce, 204, "annulation", res)

        } else if (indexLike > -1) {
          sauce.usersLiked.splice(indexLike, 1);
          sauce.likes--;
          saveSauce(sauce, 204, "annulation",res)
        }
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    res.status(500).json({ error });
  }
};

function saveSauce (sauce, status, message, res) {
  sauce.save()
    .then(() => {res.status(status).json({ message });})
    .catch((error) => res.status(400).json({ error }))
}