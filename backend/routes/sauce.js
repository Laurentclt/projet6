const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const multer = require('../middleware/multer-config.js');
const sauceCtrl = require('../controllers/sauce')

router.get('/',auth, sauceCtrl.displayAllSauces)
router.get('/:id',auth, sauceCtrl.displayOneSauce)
router.post('/',auth, multer, sauceCtrl.addSauce)
router.put('/:id',auth, multer, sauceCtrl.updateSauce)
router.delete('/:id',auth, sauceCtrl.deleteSauce)
router.post('/:id/like',auth, sauceCtrl.likeSauce)

module.exports = router;