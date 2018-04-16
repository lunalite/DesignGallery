const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Widget = mongoose.model('Widget');
const _btnTypeArr = ["All", "CheckBox", "Chronometer", "CompoundButton", "EditText", "ImageButton", "ProgressBar", "RadioButton", "RatingBar", "SeekBar", "Spinner", "Switch", "ToggleButton", "View"];
const _sortTypeDict = {
    appDownloads: "Descending Number of Application Downloads",
    appAlpbAsc: "Descending Alphabetical Order"
};

/* GET home page. */
router.get('/', function (req, res, next) {

    Widget.aggregate([{
        $sample: {size: 30}
    }]).exec(function (err, doc) {
        if (err) {
            return next(err);
        }
        res.render('index', {
            title: 'Mobile UI Gallery - Homepage',
            url: req.originalUrl,
            btnTypeArr: _btnTypeArr,
            sortTypeDict: _sortTypeDict,
            widgets: doc,
        });
    });
});

module.exports = router;
