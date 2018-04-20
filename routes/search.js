const express = require('express');
const router = express.Router();
const async = require('async');

const mongoose = require('mongoose');
const Widget = mongoose.model('Widget');
const Count = mongoose.model('Count');
const Util = require('../util/util');

const _btnTypeArr = ["All", "CheckBox", "Chronometer", "CompoundButton", "EditText", "ImageButton", "ProgressBar", "RadioButton", "RatingBar", "SeekBar", "Spinner", "Switch", "ToggleButton", "View"];
const _sortTypeDict = {
    appDownloads: "Descending Number of Application Downloads",
    appAlpbAsc: "Descending Alphabetical Order"
};
const _colArr = ["All", "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Cyan", "Black", "White", "Pink", "Gray", "Brown", "Magenta"];
const _catArr = ["All", "EDUCATION", "LIFESTYLE", "ENTERTAINMENT", "MUSIC_AND_AUDIO", "TOOLS", "PERSONALIZATION", "TRAVEL_AND_LOCAL", "NEWS_AND_MAGAZINES", "BOOKS_AND_REFERENCE", "BUSINESS", "FINANCE", "GAME_CASUAL", "SPORTS", "GAME_PUZZLE", "PRODUCTIVITY", "PHOTOGRAPHY", "HEALTH_AND_FITNESS", "TRANSPORTATION", "COMMUNICATION", "GAME_EDUCATIONAL", "SOCIAL", "MEDIA_AND_VIDEO", "SHOPPING", "GAME_ARCADE", "GAME_SIMULATION", "GAME_ACTION", "MEDICAL", "GAME_CARD", "WEATHER", "GAME_RACING", "GAME_BOARD", "GAME_SPORTS", "GAME_CASINO", "GAME_WORD", "GAME_TRIVIA", "GAME_ADVENTURE", "GAME_STRATEGY", "GAME_ROLE_PLAYING", "GAME_MUSIC", "LIBRARIES_AND_DEMO", "COMICS"];
const displayPerPage = 30;

/* GET search page. */
router.get('/', function (req, res, next) {
    if (!Util.isPositiveInteger(req.query.page) && req.query.page) {
        next(new Error('Page is not a positive integer'));
    } else if (!req.query.hasOwnProperty('sortType') || !req.query.hasOwnProperty('btnType')) {
        res.render('search', {
            title: 'Mobile UI Gallery - Search for widgets',
            url: req.originalUrl,
            btnTypeArr: _btnTypeArr,
            sortTypeDict: _sortTypeDict,
            colArr: _colArr,
            catArr: _catArr,
            query: req.query,
            widgets: {},
            pages: 0
        });
    } else {
        let findObj;
        if (req.query.btnType === 'All') {
            findObj = {};
        } else {
            findObj = {widget_class: req.query.btnType};
        }
        if (req.query.color !== 'All') {
            findObj.color = req.query.color;
        }
        if (req.query.category !== 'All') {
            findObj.category = req.query.category;
        }
        switch (req.query.sortType) {
            case 'appDownloads':
                _sortType = {downloads: 1};
                break;
            case 'appAlpbAsc':
                _sortType = {application_name: 1};
                break;
            default:
                break
        }

        let cQuery = function (callback) {
            Count.find(findObj)
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
            let max_pages = Math.ceil(results[0][0]['count'] / displayPerPage);
            if (err) {
                return next(err);
            } else if (req.query.page > max_pages) {
                res.render('search', {
                    title: 'Mobile UI Gallery - Search for widgets',
                    url: req.originalUrl,
                    btnTypeArr: _btnTypeArr,
                    sortTypeDict: _sortTypeDict,
                    colArr: _colArr,
                    catArr: _catArr,
                    query: req.query,
                    widgets: {},
                    pages: 0
                });
            } else {
                res.render('search', {
                    title: 'Mobile UI Gallery - Search for widgets',
                    url: req.originalUrl,
                    btnTypeArr: _btnTypeArr,
                    sortTypeDict: _sortTypeDict,
                    colArr: _colArr,
                    catArr: _catArr,
                    query: req.query,
                    widgets: results[1],
                    pages: max_pages
                });
            }
        });

    }

});

module.exports = router;
