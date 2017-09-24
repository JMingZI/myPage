'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import "babel-polyfill"
var Index = function () {
    function Index() {
        _classCallCheck(this, Index);
    }

    _createClass(Index, [{
        key: 'init',
        value: function init() {
            this.getBg();
            this.bind();
        }
    }, {
        key: 'getBg',
        value: function getBg() {
            var _this = this;

            var key = 'bg';
            var local = localStorage.getItem(key);
            var _getAsync = function _getAsync() {
                var script = document.createElement('script');
                script.src = 'https://bing.ioliu.cn/v1?callback=cb';
                document.body.appendChild(script);

                window.cb = function (res) {
                    if (res.status.code === 200) {
                        localStorage.setItem(key, JSON.stringify({ time: new Date().getTime(), url: res.data.url }));
                        _this.setBg(res.data.url);
                    } else {
                        console.error('接口服务异常' + res);
                    }
                };
            };

            if (!local) {
                _getAsync();
            } else {
                // check time is current day
                local = JSON.parse(local);
                if (new Date(local.time).getDate() !== new Date().getDate()) {
                    _getAsync();
                } else {
                    this.setBg(local.url);
                }
            }
        }
    }, {
        key: 'setBg',
        value: function setBg(url) {
            document.body.style.backgroundImage = 'url("' + url + '")';
        }
    }, {
        key: 'el',
        value: function el(selector) {
            var name = selector.replace(/\./, '');
            var cache = this[name];

            if (!cache) {
                this[name] = document.querySelector(selector);
                cache = this[name];
            }
            return cache;
        }
    }, {
        key: 'bind',
        value: function bind() {
            var el = this.el.bind(this);

            // word-wrap
            el('.s-people').addEventListener('click', function () {
                el('.mask').classList.remove('display-n', 'opacity-0');

                Promise.resolve().then(function () {
                    el('.mask').classList.add('fadeIn');
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve();
                        }, 950);
                    });
                }).then(function () {
                    el('.text-wrap').classList.remove('display-n');
                    el('.text-wrap').classList.add('changeWidth');

                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve();
                        }, 950);
                    });
                }).then(function () {
                    el('.text').classList.remove('display-n');
                    el('.text').classList.add('fadeIn');
                });
            });

            el('.close').addEventListener('click', function () {
                Promise.resolve().then(function () {
                    el('.text').classList.remove('fadeIn');
                    el('.text').classList.add('fadeOut');

                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve();
                        }, 950);
                    });
                }).then(function () {
                    el('.text').classList.add('display-n');
                    el('.text').classList.remove('fadeOut');

                    el('.text-wrap').classList.remove('changeWidth');
                    el('.text-wrap').classList.add('changeWidthInverse');
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve();
                        }, 950);
                    });
                }).then(function () {
                    el('.text-wrap').classList.add('display-n');
                    el('.text-wrap').classList.remove('changeWidthInverse');
                    el('.mask').classList.remove('fadeIn');
                    el('.mask').classList.add('fadeOut');
                    setTimeout(function () {
                        el('.mask').classList.add('display-n', 'opacity-0');
                        el('.mask').classList.remove('fadeOut');
                    }, 950);
                });
            });
        }
    }]);

    return Index;
}();

var index = new Index();
index.init();