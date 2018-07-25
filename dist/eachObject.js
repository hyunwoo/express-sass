"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by hyunwoo on 2018. 7. 16..
 */
var Point = function Point() {
    _classCallCheck(this, Point);

    this.x = 0;
    this.y = 0;
    this.z = 0;
};

var A = function A() {
    _classCallCheck(this, A);

    _.apply(this, new Point());

    // this.apply(this, new Point());
};