const express = require('express');
const router = express.Router();
const async = require('async');

const mongoose = require('mongoose');
const Widget = mongoose.model('Widget');
const Count = mongoose.model('Count');
const Util = require('../util/util');

let _btnTypeArr = ["All", "CheckBox", "Chronometer", "CompoundButton", "EditText", "ImageButton", "ProgressBar", "RadioButton", "RatingBar", "SeekBar", "Spinner", "Switch", "ToggleButton", "View"];
let _sortTypeDict = {
    appDownloads: "Descending Number of Application Downloads",
    appAlpbAsc: "Descending Alphabetical Order"
};
const displayPerPage = 30;

/* GET search page. */
router.get('/', function (req, res, next) {
    if (!Util.isPositiveInteger(req.query.page) && req.query.page) {
        next(new Error('Page is not a positive integer'));
    } else {

        let findObj;
        if (req.query.btnType === 'All') {
            findObj = {};
        } else {
            findObj = {widget_class: req.query.btnType};
        }

        switch (req.query.sortType) {
            case 'appDownloads':
                _sortType = {downloads: 1};
                break;
            case 'appAlpbAsc':
                _sortType = {application_name: 1};
                break;
        }

        let cQuery = function (callback) {
            Count.find({widget_class: req.query.btnType})
                .limit(1)
                .exec(function (err, doc) {
                    if (err) {
                        callback(err, null)
                    }
                    else {
                        callback(null, doc);
                    }
                });
        };

        let rQuery = function (callback) {
            Widget.find(findObj)
                .sort(_sortType)
                .skip((req.query.page - 1) * displayPerPage)
                .limit(displayPerPage)
                .exec(function (err, doc) {
                    if (err) {
                        callback(err, null)
                    }
                    else {
                        callback(null, doc);
                    }
                });
        };

        async.parallel([cQuery, rQuery], function (err, results) {
            console.log(results[0][0]['count']);
            if (err) {
                return next(err);
            }
            res.render('search', {
                title: 'Mobile UI Gallery - Search for widgets',
                url: req.originalUrl,
                btnTypeArr: _btnTypeArr,
                sortTypeDict: _sortTypeDict,
                query: req.query,
                widgets: results[1],
                pages: Math.ceil(results[0][0]['count'] / displayPerPage)
            });
        });

    }

});

module.exports = router;
