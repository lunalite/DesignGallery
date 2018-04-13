var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Widget = mongoose.model('Widget');

/* GET search page. */
router.get('/', function (req, res, next) {
    Widget.findWidgets(req.query.btnType, function (err, widgets) {
        if (err) {
            return next(err);
        }
        res.render('search', {title: 'Mobile UI Gallery - Search for widgets', query: req.query, widgets: widgets});
    });

});

module.exports = router;
