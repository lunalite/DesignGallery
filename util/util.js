"use strict";

module.exports.isPositiveInteger = function (n) {
    return 0 === n % (!isNaN(parseFloat(n)) && 0 <= ~~n);
};

