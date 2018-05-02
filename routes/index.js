const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Widget = mongoose.model('Widget');
const _btnTypeArr = ["All", "CheckBox", "Chronometer", "CompoundButton", "EditText", "ImageButton", "ProgressBar", "RadioButton", "RatingBar", "SeekBar", "Spinner", "Switch", "ToggleButton", "View"];
const _sortTypeDict = {
    appDownloads: "Descending Number of Application Downloads",
    appAlpbAsc: "Descending Alphabetical Order"
};
const _colArr = ["All", "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Cyan", "Black", "White", "Pink", "Gray", "Brown", "Magenta"];
const _catArr = ["All", "EDUCATION", "LIFESTYLE", "ENTERTAINMENT", "MUSIC_AND_AUDIO", "TOOLS", "PERSONALIZATION", "TRAVEL_AND_LOCAL", "NEWS_AND_MAGAZINES", "BOOKS_AND_REFERENCE", "BUSINESS", "FINANCE", "GAME_CASUAL", "SPORTS", "GAME_PUZZLE", "PRODUCTIVITY", "PHOTOGRAPHY", "HEALTH_AND_FITNESS", "TRANSPORTATION", "COMMUNICATION", "GAME_EDUCATIONAL", "SOCIAL", "MEDIA_AND_VIDEO", "SHOPPING", "GAME_ARCADE", "GAME_SIMULATION", "GAME_ACTION", "MEDICAL", "GAME_CARD", "WEATHER", "GAME_RACING", "GAME_BOARD", "GAME_SPORTS", "GAME_CASINO", "GAME_WORD", "GAME_TRIVIA", "GAME_ADVENTURE", "GAME_STRATEGY", "GAME_ROLE_PLAYING", "GAME_MUSIC", "LIBRARIES_AND_DEMO", "COMICS"];
const id = {
    CheckBox: [10824, 7601, 13465, 13501, 5558, 4843, 23515, 12402, 12703, 4883],
    // EditText: [17487, 26761, 1077, 1068, 5361, 5471, 9109, 8896, 4836, 5691],
    ProgressBar: [28379, 17697, 18063, 16855, 22050, 20614, 15516, 15630, 22571, 22626],
    ToggleButton: [10201, 11041, 3185, 10300, 8698, 8700, 7150, 8700, 2457, 7150],
    Spinner: [10474, 5256, 22902, 13969, 4810, 1721, 4194, 9579, 14108, 22422]
};
const _chosenArr = ["CheckBox", "ProgressBar", "ToggleButton", "Spinner"];
//"EditText",
//rs-ds227199:PRIMARY> db.widgets.find({$or:[{name:"clipping-10824"}, {name:"clipping-7601"}]})
/* GET home page. */
router.get('/', function (req, res, next) {
    let findObj = {$or: []};
    for (let i = 0; i < id.CheckBox.length; i++) {
        findObj["$or"].push({name: 'clipping-' + id.CheckBox[i]});
        // findObj["$or"].push({name: 'clipping-' + id.EditText[i]});
        findObj["$or"].push({name: 'clipping-' + id.ProgressBar[i]});
        findObj["$or"].push({name: 'clipping-' + id.ToggleButton[i]});
        findObj["$or"].push({name: 'clipping-' + id.Spinner[i]});
    }
    Widget.find(findObj).exec(function (err, doc) {
        let _widgets = {
            CheckBox: [],
            // EditText: [],
            ProgressBar: [],
            ToggleButton: [],
            Spinner: []
        };
        for (let i = 0; i < doc.length; i++) {
            switch (doc[i].widget_class) {
                case 'CheckBox':
                    _widgets['CheckBox'].push(doc[i]);
                    break;
                // case 'EditText':
                //     _widgets['EditText'].push(doc[i]);
                //     break;
                case 'ProgressBar':
                    _widgets['ProgressBar'].push(doc[i]);
                    break;
                case 'ToggleButton':
                    _widgets['ToggleButton'].push(doc[i]);
                    break;
                case 'Spinner':
                    _widgets['Spinner'].push(doc[i]);
                    break;
            }

        }

        if (err) {
            return next(err);
        }
        res.render('index', {
            title: 'Mobile UI Gallery - Homepage',
            url: req.originalUrl,
            btnTypeArr: _btnTypeArr,
            sortTypeDict: _sortTypeDict,
            colArr: _colArr,
            catArr: _catArr,
            chosenArr: _chosenArr,
            widgets: _widgets,
        });
    });
});

module.exports = router;
