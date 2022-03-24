const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

router.post('/', 
  dbController.getMoreDay,
  (req, res) => {
    res.status(200).json(res.locals)
  }
)


module.exports = router;