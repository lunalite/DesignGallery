var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var widgetSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true, max: 100},
    // clickable: Boolean,
    color: {type: String, max: 50},
    // "content-desc": {type: String, max: 200},
    coordinates: {
        from: [Number],
        to: [Number]
    },
    dimensions: {
        height: Number,
        width: Number
    },
    // focusable: Boolean,
    // leaf: Boolean,
    package_name: {type: String, required: true, max: 100},
    text: {type: String, max: 200},
    widget_class: {type: String, required: true},
    application_name: {type: String, required: true, max: 100},
    downloads: String,
    url: String,
    src: {type: String, required: true}
});

widgetSchema.statics.findWidgets = function (_btnType, _page, _sortType, cb) {
    const displayPerPage = 30;
    _page = typeof _page !== 'undefined' ? (_page - 1) * displayPerPage : 0;
    switch(_sortType) {
        case 'appDownloads':
            _sortType = {downloads : 1};
            break;
        case 'appAlpbAsc':
            _sortType = {application_name: 1};
            break;
    }
    console.log(_sortType);
    return this.model('Widget').find({widget_class: _btnType}, cb).sort(_sortType).limit(displayPerPage).skip(_page);
};

module.exports = mongoose.model('Widget', widgetSchema);
