const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Widget = mongoose.model('Widget');
const Util = require('../util/util');

let _btnTypeArr = ["CheckBox", "Chronometer", "CompoundButton", "EditText", "ImageButton", "ProgressBar", "RadioButton", "RatingBar", "SeekBar", "Spinner", "Switch", "ToggleButton", "View"];
let _sortTypeDict = {
    appDownloads: "Descending Number of Application Downloads",
    appAlpbAsc: "Descending Alphabetical Order"};

/* GET search page. */
router.get('/', function (req, res, next) {
    if (!Util.isPositiveInteger(req.query.page) && req.query.page) {
        next(new Error('Page is not a positive integer'));
    } else {
        Widget.findWidgets(req.query.btnType, req.query.page, req.query.sortType, function (err, widgets) {
            if (err) {
                return next(err);
            }
            res.render('search', {
                title: 'Mobile UI Gallery - Search for widgets',
                btnTypeArr: _btnTypeArr,
                sortTypeDict: _sortTypeDict,
                query: req.query, widgets: widgets
            });
        });
    }

});

module.exports = router;
