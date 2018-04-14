const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('contact', {title: 'Mobile UI Gallery - Contact us'});
});

module.exports = router;
