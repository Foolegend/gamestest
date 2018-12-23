var storage = {
    get: function(key) {
        var data = false;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                data = this.item(arr[0]);
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        return data;
    },
    set: function(key, value) {
        if (value === undefined) return false;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        _dt = data;
                        data = data[arr[i]];
                    } else {
                        if (i == arr.length - 1) {
                            data[arr[i]] = '';
                            _dt = data;
                            data = data[arr[i]];
                        } else return false
                    }
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        data = value;
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
        }
        return true;
    },
    inset: function(key, value) {
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof(data) != 'object') return false;
        data.push(value);
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
            data = datas;
        }
        return data;
    },
    outset: function(key, value) {
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof(data) != 'object') return false;
        var _data = [];
        for (var i in data) {
            if (data[i] !== value) _data.push(data[i]);
        }
        data = _data;
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
            data = datas;
        }
        return data;
    },
    pop: function(key, way) {
        var way = way || 1;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (way == 1) var rs = data.pop();
        else var rs = data.shift();
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
        }
        return rs;
    },
    shift: function(key) {
        return this.pop(key, -1);
    },
    incr: function(key, value) {
        if (typeof(value) != 'number') value = 1;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof(data) == 'number') {
            data += value;
        } else {
            return false;
        }
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
        }
        return data;
    },
    decr: function(key, value) {
        if (typeof(value) != 'number') value = 1;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof(data) == 'number') {
            data -= value;
        } else {
            return false;
        }
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
        }
        return data;
    },
    rm: function(key) {
        if (key.indexOf('.') > 0) {
            var data = [];
            var datas = null;
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) {
                            delete data[arr[i]];
                        } else data = data[arr[i]];
                    } else return false;
                }
                this.item(arr[0], datas);
                return datas;
            } else {
                return false;
            }
        } else {
            this.item(key, null);
            return true;
        }
    },
    each: function(key, fn) {
        if (typeof(fn) != 'function') return false;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        _dt = data;
                        data = data[arr[i]];
                    } else return false
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof(data) != 'object') return false;
        for (var i in data) {
            var rs = fn(data[i], i);
            if (rs !== undefined) {
                data[i] = rs;
            }
        }
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
        }
        return true;
    },
    item: function(key, value) {
        if (window.localStorage) {
            if (value === undefined) {
                return this.decode(localStorage.getItem(key)) || false;
            } else if (value === null) return localStorage.removeItem(key);
            else return localStorage.setItem(key, this.encode(value));
        } else {
            if (value === undefined) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)) return this.decode(arr[2]);
                else return false;
            } else if (value === null) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                document.cookie = name + "=" + this.encode(value) + ";expires=" + exp.toGMTString();
                return true;
            } else {
                var Days = 30;
                var exp = new Date();
                exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                document.cookie = name + "=" + this.encode(value) + ";expires=" + exp.toGMTString();
                return true;
            }
        }
    },
    encode: function(obj) {
        var str = '';
        try {
            str = JSON.stringify(obj);
        } catch(e) {
            str = decodeURI(obj);
        }
        return str;
    },
    decode: function(str) {
        var obj = '';
        try {
            obj = JSON.parse(str);
        } catch(e) {
            obj = encodeURI(str);
        }
        return obj;
    }
};
$.alert = function(msg, fn, style, sec) {
    style = style || 'success';
    if (typeof(fn) == 'string') {
        style = fn;
    }
    if (!sec) {
        if (style == 'error' || style == 'puncherror') {
            sec = 9;
        } else {
            sec = 0;
        }
    }
    var box = $('<div>').addClass('resourceBox ' + style).attr('id', 'alertBox');
    box.html('<div class="context">' + msg + '</div>');
    box.appendTo('body');
    var h = win.width / 360 * 100;
    box.css({
        'opacity': 1,
        'margin-top': -1 * (box.height() + h) / 2
    });
    if (sec >= 9) {
        var alertBoxLay = $('<div>').addClass('alertBoxLay').appendTo('body');
        $('<a>').attr('href', 'javascript:void(0);').addClass('closed').appendTo(box).text('我知道了');
        $('#alertBox a.closed, .alertBoxLay').click(function() {
            box.css({
                'opacity': 0,
                'margin-top': -1 * (box.height() + h)
            });
            alertBoxLay.css('opacity', 0);
            setTimeout(function() {
                    box.remove();
                    alertBoxLay.remove();
                    if (typeof(fn) == 'function') fn();
                },
                500);
        });
    } else {
        setTimeout(function() {
                box.css({
                    'opacity': 0,
                    'margin-top': -1 * (box.height() + h)
                });
                setTimeout(function() {
                        box.remove();
                        if (typeof(fn) == 'function') fn();
                    },
                    500);
            },
            1000 + sec * 1000);
    }
};
$.dialog = function(msg, fn, is_lock, classname) {
    is_lock = is_lock || true;
    if (typeof(fn) != 'function') return;
    classname = classname || '';
    var box = $('<div>').addClass('resourceBox  ' + classname).attr('id', 'dialogBox');
    var sb = $('<div>').addClass('sbox').appendTo(box);
    sb.html('<div class="context">' + msg + '</div>');
    box.appendTo('body');
    var h = win.width / 360 * 100;
    box.css({
        'opacity': 1,
        'margin-top': -1 * (box.height() + h) / 2
    });
    if (is_lock) {
        var dialogBoxLay = $('<div>').addClass('dialogBoxLay').appendTo('body');
    }
    var btns = $('<div>').addClass('btns').appendTo(sb);
    $('<button>').addClass('closeBtn').appendTo(btns).text('否');
    var agree = $('<button>').addClass('agree').appendTo(btns).text('是');
    agree.click(function() {
        if (fn() !== false) {
            box.css({
                'opacity': 0,
                'margin-top': -1 * (box.height() + h)
            });
            if (is_lock) dialogBoxLay.css('opacity', 0);
            setTimeout(function() {
                    box.remove();
                    if (is_lock) dialogBoxLay.remove();
                },
                500);
        }
    });
    $('#dialogBox button.closeBtn, .dialogBoxLay, .clearpsd, .noticeid').click(function() {
        box.css({
            'opacity': 0,
            'margin-top': -1 * (box.height() + h)
        });
        dialogBoxLay.css('opacity', 0);
        setTimeout(function() {
                box.remove();
                dialogBoxLay.remove();
            },
            500);
    });
};
$.fn.touch = function(callback) {
    this.each(function() {
        if (typeof(callback) == 'function') {
            if (navigator.userAgent.indexOf('QQBrowser') > 0) {
                $(this).on('click', callback);
            } else {
                var time = 0;
                this.fn = callback;
                $(this).on('touchstart',
                    function() {
                        time = (new Date()).getTime();
                    });
                $(this).on('touchend',
                    function() {
                        if ((new Date()).getTime() - time <= 300) {
                            this.fn(this);
                        }
                    });
            }
        } else {
            if (navigator.userAgent.indexOf('QQBrowser') > 0) {
                $(this).click();
            } else {
                this.fn(this);
            }
        }
    });
};
function ajax(path, data, fn, type) {
    if (!IS_SSL) var url = 'http://' + API_DOMAIN + '/';
    else var url = 'https://' + API_DOMAIN + '/';
    var async = type === false ? false: true;
    if (typeof(data) == 'function') {
        fn = data;
        data = {};
    }
    var arr = location.href.substr(url.length).split('/');
    https = [arr[0] ? arr[0] : 'home', arr[1] ? arr[1] : 'index', arr[2] ? arr[2] : 'index'];
    var arr = path.split('/');
    switch (arr.length) {
        case 3:
            https[2] = arr[2];
        case 2:
            https[1] = arr[1];
        case 1:
            https[0] = arr[0];
    }
    url += https.join('/') + '.html';
    if (win.token != null) {
        url += "?token=" + win.token + "&v=" + win.version;
        var postdata = {};
        var getdata = [];
        if (data) {
            if (data.get) {
                if (data.post) postdata = data.post;
                for (i in data.get) {
                    getdata.push(i + '=' + encodeURIComponent(data.get[i]));
                }
                url += '&' + getdata.join('&');
            } else {
                postdata = data;
            }
        }
        var arr = [];
        for (var i in postdata) {
            if (postdata[i] instanceof Array) {
                for (var j in postdata[i]) {
                    arr.push(i + '[]=' + encodeURIComponent(postdata[i][j]));
                }
            } else if (typeof(postdata[i]) == 'number' || typeof(postdata[i]) == 'string') {
                arr.push(i + '=' + encodeURIComponent(postdata[i]));
            }
        }
        postdata = arr.join('&');
        var xmlHttp = new XMLHttpRequest();
        if (xmlHttp != null) {
            xmlHttp.open("POST", url, true);
            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
            xmlHttp.send(postdata);
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4) {
                    if (xmlHttp.status == 200) {
                        var data = '';
                        try {
                            data = JSON.parse(xmlHttp.responseText);
                        } catch(e) {
                            data = xmlHttp.responseText;
                        }
                        if (typeof(fn) == 'function') fn(data);
                    }
                }
            };
        } else {
            alert("Your browser does not support XMLHTTP.");
        }
    }
}
String.prototype.decodeURL = function() {
    var url = this.toString();
    if (url.indexOf('?') > 0) {
        url = url.split('?')[1];
    }
    var arr = url.split('&');
    var params = {};
    for (var i in arr) {
        var a = arr[i].split('=');
        if (a.length == 2) {
            params[a[0]] = a[1];
        }
    }
    return params;
};
String.prototype.timeFormat = function(format) {
    var time = this.toString();
    if (/^\d+$/.test(time)) {
        var myDate = new Date(time * 1000);
    } else {
        time = time.replace(/\-/g, '/');
        var myDate = new Date(time);
    }
    var _date = {};
    _date.Y = myDate.getFullYear();
    _date.m = (myDate.getMonth() + 1).toString();
    if (_date.m.length == 1) _date.m = '0' + _date.m;
    _date.d = myDate.getDate().toString();
    if (_date.d.length == 1) _date.d = '0' + _date.d;
    _date.H = myDate.getHours();
    if (_date.H.length == 1) _date.H = '0' + _date.H;
    _date.i = myDate.getMinutes().toString();
    if (_date.i.length == 1) _date.i = '0' + _date.i;
    _date.s = myDate.getSeconds().toString();
    if (_date.s.length == 1) _date.s = '0' + _date.s;
    _date.w = myDate.getDay().toString();
    weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    _date.W = weekday[myDate.getDay()];
    for (var i in _date) {
        format = format.replace(i, _date[i]);
    }
    return format;
};
function share(title, desc, link, imgUrl, fun) {
    imgUrl = getShareIconLink(win.gameId);
    wx.onMenuShareTimeline({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(res) {
            if (typeof(fun) == 'function') fun(res);
        }
    });
    wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(res) {
            if (typeof(fun) == 'function') fun(res);
        }
    });
    wx.onMenuShareQQ({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(res) {
            if (typeof(fun) == 'function') fun(res);
        }
    });
    wx.onMenuShareWeibo({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(res) {
            if (typeof(fun) == 'function') fun(res);
        }
    });
    wx.onMenuShareQZone({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(res) {
            if (typeof(fun) == 'function') fun(res);
        }
    });
}
function setTitle(title) {
    if (win.app > 0) {
        app_command('settitle', {
            title: title
        });
    } else {
        document.title = title;
        if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
            var i = document.createElement('iframe');
            i.src = '/favicon.ico';
            i.style.display = 'none';
            i.onload = function() {
                setTimeout(function() {
                        i.remove();
                    },
                    9)
            };
            document.body.appendChild(i);
        }
    }
}
function isIOS() {
    return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}
function createCode(len) {
    var char = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('');
    var code = '';
    for (var i = 0; i < len; i++) {
        code += char[Math.floor(Math.random() * 62)];
    }
    return code;
}
function oClone(obj) {
    var _obj = {};
    for (var i in obj) {
        if (typeof(obj[i]) == 'object' && !(obj[i] instanceof Array)) {
            _obj[i] = oClone(obj[i]);
        } else {
            _obj[i] = obj[i];
        }
    }
    return _obj;
}
function cacl(arr, callback) {
    var ret;
    for (var i = 0; i < arr.length; i++) {
        ret = callback(arr[i], ret);
    }
    return ret;
}
function array_max(array) {
    return cacl(array,
        function(item, max) {
            if (! (max > item)) {
                return item;
            } else {
                return max;
            }
        });
}
function array_min(array) {
    return cacl(array,
        function(item, min) {
            if (! (min < item)) {
                return item;
            } else {
                return min;
            }
        });
}
function array_sum(array) {
    return cacl(array,
        function(item, sum) {
            if (typeof(sum) == 'undefined') {
                return item;
            } else {
                return sum += item;
            }
        });
}
function array_avg(array) {
    if (array.length == 0) {
        return 0;
    }
    return array_sum(array) / array.length;
}
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/ = ]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
};
var win = {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    version: '1.0.0',
    ws: {},
    status: 0,
    readed: 0,
    gameId: 0,
    reset: function(fn) {
        this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        document.getElementsByTagName('html')[0].setAttribute('style', 'font-size:' + 100 * (this.width / 360) + 'px !important');
        if (typeof(fn) == 'function') fn();
    },
    loading: function() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
        this.overlay = $('<div>').css({
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'background': 'rgba(255,255,255,0.7)',
            'z-index': 110000
        }).appendTo('body');
        if (this.loadingLay) {
            this.loadingLay.remove();
            this.loadingLay = null;
        }
        var code = '<div class="spinner">';
        code += ' <div class="spinner-container container1">';
        code += ' <div class="circle1"></div>';
        code += ' <div class="circle2"></div>';
        code += ' <div class="circle3"></div>';
        code += ' <div class="circle4"></div>';
        code += ' </div>';
        code += ' <div class="spinner-container container2">';
        code += ' <div class="circle1"></div>';
        code += ' <div class="circle2"></div>';
        code += ' <div class="circle3"></div>';
        code += ' <div class="circle4"></div>';
        code += ' </div>';
        code += ' <div class="spinner-container container3">';
        code += ' <div class="circle1"></div>';
        code += ' <div class="circle2"></div>';
        code += ' <div class="circle3"></div>';
        code += ' <div class="circle4"></div>';
        code += ' </div>';
        code += '</div>';
        document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", code);
    },
    close_loading: function() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
        if (this.loadingLay) {
            this.loadingLay.remove();
            this.loadingLay = null;
        }
    },
    closeLoading: function() {
        document.getElementById('loadings').style.opacity = 0;
        setTimeout(function() {
                document.getElementById('loadings').style.display = 'none';
            },
            500);
    },
    load: function() {
        this.reset();
        if (typeof(Page) == 'object' && typeof(Page.load) == 'function') Page.load();
    },
    ready: function() {
        this.reset();
        if (typeof(Page) == 'object' && typeof(Page.ready) == 'function') Page.ready();
    },
    readyJoin: function(code, func) {
        ajax('home/index/readyJoin', {
                code: code
            },
            function(d) {
                win.gameId = d.game;
                var user_list = d.room_users;
                if (typeof(d.info) != 'undefined') {
                    if (d.info == 0) {
                        alert2('加入房间失败',
                            function() {
                                wx.closeWindow();
                            });
                    } else if (d.info == -1) {
                        alert2('房间号错误',
                            function() {
                                wx.closeWindow();
                            });
                    } else if (d.info == 1) {
                        document.body.style.background = '#000000';
                        document.body.minHeight = 'initial';
                        if (document.getElementsByClassName('body')[0]) {
                            document.body.removeChild(document.getElementsByClassName('body')[0]);
                        }
                        if (document.getElementsByTagName('canvas')[0]) {
                            document.body.removeChild(document.getElementsByTagName('canvas')[0]);
                        }
                        ajax('home/index/result', {
                                code: Page.code
                            },
                            function(data) {
                                if (data == 'error') {
                                    Page.init();
                                    return;
                                }
                                if (win.sign == 'xinjia') {
                                    createRankingV2(data,
                                        function(d) {
                                            var img = new Image();
                                            if (parseInt(data.users.length) > 6) {
                                                img.className = 'room-gameover-ten  ranking-img';
                                            } else {
                                                img.className = 'room-gameover  ranking-img';
                                            }
                                            img.src = d;
                                            img.onload = function() {
                                                if (document.getElementsByClassName('body')[0]) {
                                                    document.body.removeChild(document.getElementsByClassName('body')[0]);
                                                }
                                                document.body.style.backgroundColor = '#000000';
                                                document.body.style.minHeight = 'initial';
                                                document.body.appendChild(img);
                                                var div = document.createElement('div');
                                                div.className = 'search-number-box';
                                                document.body.appendChild(div);
                                                var detailedBtn = '<a class="search-number-box-btn" href="pkdetailed.html?code=' + Page.code + (win.app > 0 ? '&app=' + win.app: '') + '" style="position: absolute;"></a>';
                                                div.insertAdjacentHTML("beforeend", detailedBtn);
                                                win.closeLoading();
                                                getRankingSix();
                                            };
                                        });
                                } else if (parseInt(data.game_id) === 3) {
                                    if (win.version == '1.0.0') {
                                        Page.createRanking(data,
                                            function(data) {
                                                var img = document.createElement('img');
                                                img.className = 'room-gameover';
                                                img.src = data;
                                                img.onload = function() {
                                                    document.body.appendChild(img);
                                                    win.closeLoading();
                                                };
                                            });
                                    } else if (win.version == '2.0.0') {
                                        Page.createRanking(data,
                                            function(d) {
                                                var img = new Image();
                                                img.className = 'room-gameover ranking-img';
                                                img.src = d;
                                                img.onload = function() {
                                                    if (document.getElementsByClassName('body')[0]) {
                                                        document.body.removeChild(document.getElementsByClassName('body')[0]);
                                                    }
                                                    document.body.style.backgroundColor = '#000000';
                                                    document.body.style.minHeight = 'initial';
                                                    document.body.appendChild(img);
                                                    var div = document.createElement('div');
                                                    div.className = 'search-number-box';
                                                    document.body.appendChild(div);
                                                    var detailedBtn = '<a class="search-number-box-btn" href="pkdetailed.html?code=' + Page.code + (win.app > 0 ? '&app=' + win.app: '') + '" style="position: absolute;"></a>';
                                                    div.insertAdjacentHTML("beforeend", detailedBtn);
                                                    win.closeLoading();
                                                    getRankingSix();
                                                };
                                                if (win.app > 0) {
                                                    appShareEnd(data);
                                                }
                                            });
                                    }
                                } else if (parseInt(data.game_id) === 7) {
                                    if (win.version == '1.0.0') {
                                        Page.createRanking(data,
                                            function(data) {
                                                var img = document.createElement('img');
                                                img.className = 'room-gameover';
                                                img.src = data;
                                                img.onload = function() {
                                                    document.body.appendChild(img);
                                                    win.closeLoading();
                                                };
                                            });
                                    } else if (win.version == '2.0.0') {
                                        Page.createRanking(data,
                                            function(d) {
                                                var img = new Image();
                                                img.className = 'room-gameover ranking-img';
                                                img.src = d;
                                                img.onload = function() {
                                                    document.body.style.backgroundColor = '#000000';
                                                    document.body.style.minHeight = 'initial';
                                                    document.body.appendChild(img);
                                                    var div = document.createElement('div');
                                                    div.className = 'search-number-box';
                                                    document.body.appendChild(div);
                                                    var detailedBtn = '<a class="search-number-box-btn" href="pkdetailed.html?code=' + Page.code + (win.app > 0 ? '&app=' + win.app: '') + '" style="position: absolute;"></a>';
                                                    div.insertAdjacentHTML("beforeend", detailedBtn);
                                                    getRankingSix();
                                                    win.closeLoading();
                                                };
                                                if (win.app > 0) {
                                                    appShareEnd(data);
                                                }
                                            });
                                    }
                                } else if (parseInt(data.game_id) === 8 || parseInt(data.game_id) === 9) {
                                    canvasRanking(data,
                                        function(d) {
                                            var img = document.createElement('img');
                                            img.className = 'room-gameover ranking-img';
                                            img.setAttribute('src', d);
                                            img.onload = function() {
                                                document.body.appendChild(img);
                                                var div = document.createElement('div');
                                                div.className = 'search-number-box';
                                                document.body.appendChild(div);
                                                win.closeLoading();
                                                var detailedBtn = '<a class="search-number-box-btn" href="pkdetailed.html?code=' + Page.code + (win.app > 0 ? '&app=' + win.app: '') + '" style="position: absolute;"></a>';
                                                div.insertAdjacentHTML("beforeend", detailedBtn);
                                                $('.body').remove();
                                                $('body').css({
                                                    'background': '#000000',
                                                    'min-height': 'initial'
                                                });
                                                getRankingSix();
                                            };
                                            if (win.app > 0) {
                                                appShareEnd(data);
                                            }
                                        });
                                } else if (parseInt(data.game_id) === 14 || parseInt(data.game_id) === 15 || parseInt(data.game_id) === 16) {
                                    createRankingV2(data,
                                        function(d) {
                                            var img = new Image();
                                            if (parseInt(data.users.length) > 6) {
                                                img.className = 'room-gameover-ten  ranking-img';
                                            } else {
                                                img.className = 'room-gameover  ranking-img';
                                            }
                                            img.src = d;
                                            img.onload = function() {
                                                if (document.getElementsByClassName('body')[0]) {
                                                    document.body.removeChild(document.getElementsByClassName('body')[0]);
                                                }
                                                document.body.style.backgroundColor = '#000000';
                                                document.body.style.minHeight = 'initial';
                                                document.body.appendChild(img);
                                                var div = document.createElement('div');
                                                div.className = 'search-number-box';
                                                document.body.appendChild(div);
                                                var detailedBtn = '<a class="search-number-box-btn" href="pkdetailed.html?code=' + Page.code + (win.app > 0 ? '&app=' + win.app: '') + '" style="position: absolute;"></a>';
                                                div.insertAdjacentHTML("beforeend", detailedBtn);
                                                win.closeLoading();
                                                getRankingSix();
                                            };
                                        });
                                } else {
                                    if (win.version == '1.0.0') {
                                        createRanking(data,
                                            function(d) {
                                                var img = new Image();
                                                img.src = d;
                                                if (parseInt(data.users.length) > 6) {
                                                    img.className = 'room-gameover-ten';
                                                } else {
                                                    img.className = 'room-gameover';
                                                }
                                                img.onload = function() {
                                                    document.body.appendChild(img);
                                                    win.closeLoading();
                                                    if (document.getElementsByClassName('body')[0]) {
                                                        document.body.removeChild(document.getElementsByClassName('body')[0]);
                                                    }
                                                    document.body.style.backgroundColor = '#000000';
                                                    document.body.style.minHeight = 'initial';
                                                    if (typeof(jQuery) != 'undefined') $(document.body).off('touchmove');
                                                };
                                            });
                                    } else if (win.version == '2.0.0') {
                                        liuliuCreateRanking(data,
                                            function(d) {
                                                var img = document.createElement('img');
                                                if (parseInt(data.users.length) > 6) {
                                                    img.className = 'room-gameover-ten ranking-img';
                                                } else {
                                                    img.className = 'room-gameover ranking-img';
                                                }
                                                img.src = d;
                                                img.onload = function() {
                                                    if (document.getElementsByClassName('body')[0]) {
                                                        document.body.removeChild(document.getElementsByClassName('body')[0]);
                                                    }
                                                    document.body.style.backgroundColor = '#000000';
                                                    document.body.style.minHeight = 'initial';
                                                    document.body.appendChild(img);
                                                    var div = document.createElement('div');
                                                    div.className = 'search-number-box';
                                                    document.body.appendChild(div);
                                                    var detailedBtn = '<a class="search-number-box-btn" href="pkdetailed.html?code=' + Page.code + (win.app > 0 ? '&app=' + win.app: '') + '" style="position: absolute;"></a>';
                                                    div.insertAdjacentHTML("beforeend", detailedBtn);
                                                    win.closeLoading();
                                                    if (typeof(jQuery) != 'undefined') $(document.body).off('touchmove');
                                                    getRankingSix();
                                                };
                                                if (win.app > 0) {
                                                    appShareEnd(data);
                                                }
                                            });
                                    }
                                }
                            });
                    } else if (d.info == 2) {
                        alert2('该房间人数已满',
                            function() {
                                wx.closeWindow();
                            })
                    }
                } else if (typeof(d.member) != 'undefined') {
                    if (d.member == 1) {
                        var code = '<div class="request-member-mask">';
                        code += '<div class="requst-member">';
                        code += '<div class="text">你不是该房主的好友,无法加入房间；</div>';
                        code += '<div class="room-user flex-cont">';
                        code += '<div class="room-user-path"><img id="roomUserPath" src="' + d.room_owner.path + '"></div>';
                        code += '<div class="room-user-name" id="roomUserName">' + d.room_owner.nickname + '</div>';
                        code += '</div>';
                        code += '<div class="text">是否申请成为好友？</div>';
                        code += '<div class="button" id="button">';
                        code += '<div class="request-btn" id="requestBtn">确定</div>';
                        code += '</div>';
                        code += '</div>';
                        code += '</div>';
                        document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", code);
                        win.closeLoading();
                        document.getElementById('requestBtn').onclick = function() {
                            document.getElementById('button').innerHTML = '<div class="request-btn request-btn2">申请中</div>';
                            ajax('home/user/applyForFriend', {
                                    user_id: d.room_owner.id
                                },
                                function(d) {
                                    if (d.status == 1) {} else {}
                                })
                        }
                    } else if (d.member == 2) {
                        var code = '<div class="request-member-mask">';
                        code += '<div class="requst-member">';
                        code += '<div class="text">你不是该房主的好友,无法加入房间；</div>';
                        code += '<div class="room-user flex-cont">';
                        code += '<div class="room-user-path"><img id="roomUserPath" src="' + d.room_owner.path + '" ></div>';
                        code += '<div class="room-user-name" id="roomUserName">' + d.room_owner.nickname + '</div>';
                        code += '</div>';
                        code += '<div class="text">是否申请成为好友？</div>';
                        code += '<div class="button" id="button">';
                        code += '<div class="request-btn request-btn2">申请中</div>';
                        code += '</div>';
                        code += '</div>';
                        code += '</div>';
                        document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", code);
                    } else if (d.member == 3) {
                        var code = '<div class="request-member-mask">';
                        code += '<div class="requst-member">';
                        code += '<div class="text2">你已被房主屏蔽，无法进入该房间，请联系房主！</div>';
                        code += '<div class="button" id="button">';
                        code += '<div class="request-btn" id="requestBtn">确定</div>';
                        code += '</div>';
                        code += '</div>';
                        code += '</div>';
                        document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", code);
                        document.getElementById('requestBtn').onclick = function() {
                            wx.closeWindow();
                        }
                    }
                } else {
                    if (d.first_join || d.first_join == 1) {
                        if (win.version == '1.0.0') {
                            var joinUser = '<div class="join-user" id="joinUser">';
                            joinUser += '<div class="join-info">';
                            if (user_list.length > 5) {
                                joinUser += '<div class="user-text2">';
                                joinUser += '<div class="gameuser-list" id="gameuser-list">';
                                for (var n in user_list) {
                                    var code = '<div class="join-user-info">';
                                    code += '<img src="' + user_list[n].path + '" alt=""><span>' + user_list[n].nickname + '</span>';
                                    code += '</div>';
                                    joinUser += code;
                                }
                            } else {
                                joinUser += '<div class="user-text">';
                                joinUser += '<div class="gameuser-list" id="gameuser-list">';
                                for (var n in user_list) {
                                    var code = '<div class="join-user-info">';
                                    code += '<img src="' + user_list[n].path + '" alt=""><span>' + user_list[n].nickname + '</span>';
                                    code += '</div>';
                                    joinUser += code;
                                }
                            }
                            joinUser += '</div>';
                            joinUser += '</div>';
                            joinUser += '<div class="join-user-bottom">';
                            joinUser += '<button class="return-index" onclick="location.href=\'index.html\'">返回首页</button>';
                            joinUser += '<button class="join-game" id="joinGame">加入房间</button>';
                            joinUser += '</div>';
                            joinUser += '</div>';
                            joinUser += '</div>';
                        } else if (win.version == '2.0.0') {
                            var joinUser = '<div class="window-masks user-join" id="joinUser">';
                            joinUser += '<div class="border-opacity">';
                            joinUser += '<div class="container">';
                            joinUser += '<i class="mask-icon mask-top"></i><i class="mask-icon mask-right"></i><i class="mask-icon mask-bottom"></i><i class="mask-icon mask-left"></i>';
                            joinUser += '<div class="user-id">ID：' + (parseInt(user.id) + 100000) + '</div>';
                            joinUser += '<div class="main">';
                            joinUser += '<div class="rules">';
                            if (parseInt(d.game) === 1 || parseInt(d.game) === 4 || parseInt(d.game) === 8 || parseInt(d.game) === 9 || parseInt(d.game) === 10 || parseInt(d.game) === 11) {
                                var zhuangTypeText = '',
                                    cardRule = d.rule.card_rule,
                                    cardRuleText = '',
                                    handPatterns = d.rule.hand_patterns,
                                    handPatternsText = '',
                                    maxMatchesText = '';
                                if (parseInt(d.zhuang_type) === 1) {
                                    zhuangTypeText = '明牌抢庄';
                                } else if (parseInt(d.zhuang_type) === 2) {
                                    zhuangTypeText = '通比牛.牛';
                                } else if (parseInt(d.zhuang_type) === 3) {
                                    zhuangTypeText = '自由抢庄';
                                } else if (parseInt(d.zhuang_type) === 4) {
                                    zhuangTypeText = '牛.牛上庄';
                                } else if (parseInt(d.zhuang_type) === 5) {
                                    zhuangTypeText = '固定庄家';
                                }
                                if (parseInt(cardRule) === 1) {
                                    cardRuleText = '牛.牛×3 牛九×2 牛八×2';
                                } else if (parseInt(cardRule) === 2) {
                                    cardRuleText = '牛.牛×4 牛九×3 牛八×2 牛七×2';
                                }
                                for (var handp in handPatterns) {
                                    if (parseInt(handPatterns[handp]) === 1) {
                                        handPatternsText += '五花牛（5倍）';
                                    } else if (parseInt(handPatterns[handp]) === 2) {
                                        handPatternsText += '炸弹牛（6倍）';
                                    } else if (parseInt(handPatterns[handp]) === 3) {
                                        handPatternsText += '五小牛（8倍）';
                                    }
                                }
                                if (parseInt(d.max_matches) === 10) {
                                    maxMatchesText = '10局×1房卡 ';
                                } else if (parseInt(d.max_matches) === 12) {
                                    maxMatchesText = '12局×2房卡 ';
                                } else if (parseInt(d.max_matches) === 20) {
                                    maxMatchesText = '20局×2房卡 ';
                                } else if (parseInt(d.max_matches) === 24) {
                                    maxMatchesText = '24局×4房卡 ';
                                }
                                if (parseInt(win.gameId) === 10 || parseInt(win.gameId) === 11) {
                                    if (parseInt(d.max_matches) === 12) {
                                        maxMatchesText = '12局×3房卡 ';
                                    } else if (parseInt(d.max_matches) === 24) {
                                        maxMatchesText = '24局×6房卡 ';
                                    }
                                }
                                joinUser += '<p>模式：' + zhuangTypeText + '</p>';
                                joinUser += '<p>底分：' + d.rule.end_points + '分</p>';
                                joinUser += '<p>规则：' + cardRuleText + '</p>';
                                if (handPatterns) {
                                    joinUser += '<p>牌型：' + handPatternsText + '</p>';
                                }
                                joinUser += '<p>局数：' + maxMatchesText + '</p>';
                            } else if (parseInt(d.game) === 2) {
                                var goldChipRule = '',
                                    goldMatchesText = '',
                                    goldLimit = '';
                                if (parseInt(d.rule.chip_rule) === 1) {
                                    goldChipRule = '2/4，4/8，8/16，10/20';
                                } else if (parseInt(d.rule.chip_rule) === 2) {
                                    goldChipRule = '2/4，5/10，10/20，20/40';
                                }
                                if (parseInt(d.max_matches) === 10) {
                                    goldMatchesText = '10局×1房卡 ';
                                } else if (parseInt(d.max_matches) === 20) {
                                    goldMatchesText = '20局×2房卡 ';
                                }
                                if (win.sign == 'dashengzhongyu' || win.sign == 'shouquandating' || win.sign == 'lianyundating' || win.sign == 'liuliuxianyue') {
                                    if (parseInt(d.max_matches) === 12) {
                                        goldMatchesText = '12局×3房卡 ';
                                    } else if (parseInt(d.max_matches) === 24) {
                                        goldMatchesText = '24局×6房卡 ';
                                    }
                                }
                                if (parseInt(d.rule.upper_limit) === 0) {
                                    goldLimit = '无';
                                } else if (parseInt(d.rule.upper_limit) === 500) {
                                    goldLimit = '500 ';
                                } else if (parseInt(d.rule.upper_limit) === 1000) {
                                    goldLimit = '1000 ';
                                } else if (parseInt(d.rule.upper_limit) === 2000) {
                                    goldLimit = '2000 ';
                                }
                                joinUser += '<p>底分：' + d.rule.end_points + '分</p>';
                                joinUser += '<p>分数：' + goldChipRule + '</p>';
                                joinUser += '<p>局数：' + goldMatchesText + '</p>';
                                joinUser += '<p>上限：' + goldLimit + '</p>';
                            } else if (parseInt(d.game) === 3) {
                                var playType = '',
                                    shuiMatches = '';
                                if (parseInt(d.rule.play_type) === 1) {
                                    playType = '经典';
                                }
                                if (parseInt(d.max_matches) === 5) {
                                    shuiMatches = '5局×1房卡 ';
                                } else if (parseInt(d.max_matches) === 10) {
                                    shuiMatches = '10局×2房卡 ';
                                } else if (parseInt(d.max_matches) === 20) {
                                    shuiMatches = '20局×4房卡 ';
                                }
                                joinUser += '<p>底分：' + d.rule.end_points + '分</p>';
                                joinUser += '<p>玩法：' + playType + '</p>';
                                joinUser += '<p>局数：' + shuiMatches + '</p>';
                            } else if (parseInt(d.game) === 5) {
                                var texaPoints = '',
                                    texaMatches = '',
                                    texaPointsRule = '';
                                if (parseInt(d.rule.end_points) === 1) {
                                    texaPoints = '1/2';
                                } else if (parseInt(d.rule.end_points) === 2) {
                                    texaPoints = '2/4';
                                }
                                if (parseInt(d.max_matches) === 10) {
                                    texaMatches = '10局×2房卡 ';
                                } else if (parseInt(d.max_matches) === 20) {
                                    texaMatches = '20局×4房卡 ';
                                }
                                if (win.sign == 'dashengzhongyu' || win.sign == 'shouquandating' || win.sign == 'lianyundating' || win.sign == 'liuliuxianyue') {
                                    if (parseInt(d.max_matches) === 12) {
                                        texaMatches = '12局×3房卡 ';
                                    } else if (parseInt(d.max_matches) === 24) {
                                        texaMatches = '24局×6房卡 ';
                                    }
                                }
                                if (parseInt(d.rule.end_points_rule) === 0) {
                                    texaPointsRule = '无';
                                } else if (parseInt(d.rule.end_points_rule) === 1) {
                                    texaPointsRule = '1倍小盲';
                                } else if (parseInt(d.rule.end_points_rule) === 2) {
                                    texaPointsRule = '2倍小盲';
                                }
                                joinUser += '<p>小盲/大盲：' + texaPoints + '</p>';
                                joinUser += '<p>局数：' + texaMatches + '</p>';
                                joinUser += '<p>前注：' + texaPointsRule + '</p>';
                                joinUser += '<p>初始分数：' + d.rule.init_points + '</p>';
                            } else if (parseInt(d.game) === 6 || parseInt(d.game) === 12 || parseInt(d.game) === 13) {
                                var sanMatches = '',
                                    sanZhuangType = '';
                                if (parseInt(d.zhuang_type) === 1) {
                                    sanZhuangType = '抢庄模式';
                                } else if (parseInt(d.zhuang_type) === 2) {
                                    sanZhuangType = '通比模式';
                                } else if (parseInt(d.zhuang_type) === 3) {
                                    sanZhuangType = '三公当庄';
                                }
                                if (parseInt(d.max_matches) === 10) {
                                    sanMatches = '10局×1房卡 ';
                                } else if (parseInt(d.max_matches) === 12) {
                                    sanMatches = '12局×2房卡 ';
                                } else if (parseInt(d.max_matches) === 20) {
                                    sanMatches = '20局×2房卡 ';
                                } else if (parseInt(d.max_matches) === 24) {
                                    sanMatches = '24局×4房卡 ';
                                }
                                if (win.sign == 'dashengzhongyu' || win.sign == 'shouquandating' || win.sign == 'lianyundating' || win.sign == 'liuliuxianyue') {
                                    if (parseInt(d.max_matches) === 12) {
                                        sanMatches = '12局×3房卡 ';
                                    } else if (parseInt(d.max_matches) === 24) {
                                        sanMatches = '24局×6房卡 ';
                                    }
                                }
                                joinUser += '<p>模式：' + sanZhuangType + '</p>';
                                joinUser += '<p>底分：' + d.rule.end_points + '分</p>';
                                if (parseInt(d.rule.card_rule) === 2) {
                                    cardRuleText = '暴玖×9';
                                    joinUser += '<p>规则：' + cardRuleText + '</p>';
                                }
                                joinUser += '<p>局数：' + sanMatches + '</p>';
                            } else if (parseInt(d.game) === 7) {
                                var str = '';
                                if (parseInt(d.rule.games_mode) === 1) {
                                    str = '半坑（满5人10起）';
                                } else if (parseInt(d.rule.games_mode) === 2) {
                                    str = '半坑（满5人9起）';
                                } else if (parseInt(d.rule.games_mode) === 3) {
                                    str = '半坑（满4人J起）';
                                } else if (parseInt(d.rule.games_mode) === 4) {
                                    str = '全坑（2-A）';
                                }
                                joinUser += '<p>模式：' + str + '</p>';
                                joinUser += '<p>底注：' + d.rule.end_points + '分</p>';
                                joinUser += '<p>喜分：' + d.rule.happy_points + '分</p>';
                                var rule = '';
                                if (d.rule.play_type && parseInt(d.rule.play_type.split(',').length) === 2) {
                                    rule += '带王  王中炮  ';
                                } else if (d.rule.play_type && parseInt(d.rule.play_type.split(',').length) === 1 && parseInt(d.rule.play_type.split(',')[0]) === 1) {
                                    rule += '带王  ';
                                }
                                if (parseInt(d.rule.sorce_type) === 1) {
                                    rule += '烂锅翻倍';
                                }
                                if (rule != '') {
                                    joinUser += '<p>规则：' + rule + '</p>';
                                }
                                var sanMatches = '';
                                if (parseInt(d.max_matches) === 10) {
                                    sanMatches = '10局×1房卡 ';
                                } else if (parseInt(d.max_matches) === 20) {
                                    sanMatches = '20局×2房卡 ';
                                }
                                joinUser += '<p>局数：' + sanMatches + '</p>';
                            } else if (parseInt(d.game) === 14) {
                                var pushZhuangType = '',
                                    rule = '';
                                if (parseInt(d.zhuang_type) === 1) {
                                    pushZhuangType = '自由抢庄';
                                    joinUser += '<p>模式：' + pushZhuangType + '</p>';
                                    joinUser += '<p>筹码：' + d.rule.chip.join('，') + '</p>';
                                } else if (parseInt(d.zhuang_type) === 2) {
                                    pushZhuangType = '超级庄家';
                                    joinUser += '<p>模式：' + pushZhuangType + '</p>';
                                    joinUser += '<p>上庄：' + d.rule.zhuang_value + '</p>';
                                }
                                joinUser += '<p>下注上限：' + d.rule.max_point + '</p>';
                                var pushMatches = '';
                                if (parseInt(d.max_matches) === 10) {
                                    pushMatches = '10局×1房卡 ';
                                } else if (parseInt(d.max_matches) === 20) {
                                    pushMatches = '20局×2房卡 ';
                                }
                                if (win.sign == 'dashengzhongyu' || win.sign == 'shouquandating' || win.sign == 'lianyundating' || win.sign == 'liuliuxianyue') {
                                    if (parseInt(d.max_matches) === 12) {
                                        pushMatches = '12局×3房卡 ';
                                    } else if (parseInt(d.max_matches) === 24) {
                                        pushMatches = '24局×6房卡 ';
                                    }
                                }
                                joinUser += '<p>局数：' + pushMatches + '</p>';
                            } else if (parseInt(d.game) === 15) {
                                var fishZhuangType = '';
                                if (parseInt(d.zhuang_type) === 1) {
                                    fishZhuangType = '超级庄家';
                                    joinUser += '<p>模式：' + fishZhuangType + '</p>';
                                    joinUser += '<p>限注：' + d.rule.chip_value + '</p>';
                                    joinUser += '<p>上庄：' + d.rule.zhuang_value + '</p>';
                                }
                                var pushMatches = '';
                                if (parseInt(d.max_matches) === 12) {
                                    pushMatches = '12局×3房卡 ';
                                } else if (parseInt(d.max_matches) === 24) {
                                    pushMatches = '24局×6房卡 ';
                                }
                                joinUser += '<p>局数：' + pushMatches + '</p>';
                            }
                            joinUser += '</div>';
                            if (user_list.length > 10) {
                                joinUser += '<div class="user-list user-list2">';
                            } else {
                                joinUser += '<div class="user-list">';
                            }
                            for (var n in user_list) {
                                var code = '<div class="join-user-info">';
                                code += '<img src="' + user_list[n].path + '" alt="" ><span>' + user_list[n].nickname + '</span>';
                                code += '</div>';
                                joinUser += code;
                            }
                            joinUser += '</div>';
                            joinUser += '</div>';
                            joinUser += '<div class="button">';
                            joinUser += '<div class="return" onclick="location.href=\'index.html\'">创建房间</div>';
                            joinUser += '<div class="join-game" id="joinGame">加入游戏</div>';
                            joinUser += '</div>';
                            joinUser += '</div>';
                            joinUser += '</div>';
                            joinUser += '</div>';
                        }
                        document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", joinUser);
                        document.getElementById('joinGame').onclick = function() {
                            win.status = 1;
                            document.getElementsByTagName('body')[0].removeChild(document.getElementById('joinUser'));
                            if (typeof(func) == 'function') func();
                        }
                    } else {
                        if (user_list.length == 0) win.status = 1;
                        if (typeof(func) == 'function') func();
                    }
                }
            });
    },
    reload: function() {
        if (/[\?\&]q=[0-9\.]+/.test(location.href)) location.href = location.href.replace(/([\?\&]q=)[0-9\.]+/, '$1' + Math.random());
        else location.href = location.href + (location.href.indexOf('?') > 0 ? '&': '?') + 'q=' + Math.random();
    }
};
var user = null;
var ws = {};
window.onresize = function() {
    win.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    win.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    win.reset(getRankingSix());
};
function alert2(msg, fn, style, sec) {
    style = style || 'success';
    if (typeof(fn) == 'string') {
        style = fn;
    }
    if (!sec) {
        if (style == 'error' || style == 'puncherror') {
            sec = 9;
        } else {
            sec = 0;
        }
    }
    var box = document.createElement('div');
    box.className = 'resourceBox ' + style;
    box.id = 'alertBox';
    box.innerHTML = '<div class="context">' + msg + '</div>';
    document.getElementsByTagName('body')[0].appendChild(box);
    var h = win.width / 360 * 100;
    box.style.opacity = 1;
    box.style.marginTop = -1 * (box.offsetHeight + h) / 2 + 'px';
    if (sec >= 9) {
        var alertBoxLay = document.createElement('div');
        alertBoxLay.className = 'alertBoxLay';
        document.getElementsByTagName('body')[0].appendChild(alertBoxLay);
        var BtnA = document.createElement('a');
        BtnA.innerText = '我知道了';
        BtnA.setAttribute('href', 'javascript:void(0);');
        BtnA.className = 'closed';
        box.appendChild(BtnA);
        alertBoxLay.addEventListener('click',
            function() {
                box.style.opacity = 0;
                box.style.marginTop = -1 * (box.offsetHeight + h) + 'px';
                this.style.opacity = 0;
                setTimeout(function() {
                        document.getElementsByTagName('body')[0].removeChild(box);
                        document.getElementsByTagName('body')[0].removeChild(alertBoxLay);
                        if (typeof(fn) == 'function') fn();
                    },
                    500);
            })
    } else {
        setTimeout(function() {
                box.style.opacity = 0;
                box.style.marginTop = -1 * (box.offsetHeight + h) + 'px';
                setTimeout(function() {
                        document.getElementsByTagName('body')[0].removeChild(box);
                        if (typeof(fn) == 'function') fn();
                    },
                    500);
            },
            1000 + sec * 1000);
    }
}
function getRankingSix() {
    if (document.getElementsByClassName('ranking-img')[0] && document.getElementsByClassName('search-number-box')[0]) {
        var div = document.getElementsByClassName('search-number-box')[0];
        var imag = document.getElementsByClassName('ranking-img')[0];
        var aBtn = document.getElementsByClassName('search-number-box-btn')[0];
        var a = getNaturalSize(imag).width;
        var b = getNaturalSize(imag).height;
        var c = imag.offsetWidth;
        var d = imag.offsetHeight;
        var index = (parseInt(a) / parseInt(b)) / (parseInt(c) / parseInt(d));
        if (parseInt(win.gameId) === 3) {
            changePosition(236, 74, 455, 110);
        } else if (parseInt(win.gameId) === 7) {
            changePosition(236, 74, 441, 150);
        } else if (parseInt(win.gameId) === 14 || parseInt(win.gameId) === 15 || parseInt(win.gameId) === 16) {
            changePosition(217, 73, 400, 167);
        } else {
            changePosition(236, 74, 419, 110);
        }
        function changePosition(btnWidth, btnHeight, btnLeft, btnBottom) {
            if (index > 1) {
                var width = c;
                var height = b / a * c;
                div.style.top = (d - b / a * c) / 2 + 'px';
                div.style.left = '0px';
            } else if (index < 1) {
                var width = a / b * d;
                var height = d;
                div.style.top = '0px';
                div.style.left = (c - a / b * d) / 2 + 'px';
            } else {
                var width = c;
                var height = d;
                div.style.top = '0px';
                div.style.left = '0px';
            }
            aBtn.style.width = width * (btnWidth / a) + 'px';
            aBtn.style.height = height * (btnHeight / b) + 'px';
            aBtn.style.left = width * (btnLeft / a) + 'px';
            aBtn.style.top = height * ((b - btnBottom) / b) + 'px';
        }
        function getNaturalSize(Domlement) {
            var natureSize = {};
            if (window.naturalWidth && window.naturalHeight) {
                natureSize.width = Domlement.naturalWidth;
                natureSize.height = Domlement.naturalHeight;
            } else {
                var img = new Image();
                img.src = Domlement.src;
                natureSize.width = img.width;
                natureSize.height = img.height;
            }
            return natureSize;
        }
    }
}
function usersRand(users, user_id) {
    var count = Math.round(Math.random() * users.length) + users.length * 3;
    var x = users.indexOf(user_id);
    var n = (count - x - 1) % users.length;
    var i = 0; (function xxx() {
        $('.user-info').removeClass('choosed');
        $('.user-info[data-id="' + users[n] + '"]').addClass('choosed');
        n++;
        i++;
        if (i == count) return;
        if (n >= users.length) n = 0;
        setTimeout(xxx, (1000 + (users.length * 500)) / count);
    })();
}
function usersRand2(users, user_id) {
    var usersLength = users.length;
    var count = usersLength + 10;
    var x = users.indexOf(user_id);
    var n = (count - x - 1) % usersLength;
    var i = 0;
    var time = 1000 + (usersLength * 500); (function xxx() {
        $('.user-info').removeClass('choosed');
        $('.user-info[data-id="' + users[n] + '"]').addClass('choosed');
        n++;
        i++;
        if (i == count) return;
        if (n >= usersLength) n = 0;
        setTimeout(xxx, (parseInt(time) / count));
    })();
}
function Gold(source, target) {
    if (source == "" || target == "") {
        return;
    }
    var id_bol;
    if (Object.prototype.toString.call(source) == '[object Array]') {
        id_bol = true;
    } else {
        id_bol = false;
    }
    var count = 15;
    var gold_w = 12;
    var gold_h = 12;
    var obj = [];
    var str = [];
    var str1 = [];
    var bol = false;
    var index = 39;
    var _index = 0;
    var index1_num = 0;
    var music_bol = true;
    var $canvas = $('<canvas width="' + $("body").width() + '" height="' + $("body").height() + ' "class="canvas_gold"></canvas>').appendTo('body');
    var can = $canvas.get(0).getContext("2d");
    if (id_bol) {
        var $target = $('.user-info[data-id="' + target + '"]');
        for (var z = 0; z < source.length; z++) {
            var $source = $('.user-info[data-id="' + source[z] + '"]');
            var coins = [];
            var _str_a = [];
            var _str_b = [];
            for (var i = 0; i < count; i++) {
                var coin = new jinbi(gold_w, gold_h);
                coin.x = $source.position().left + Math.round(Math.random() * ($source.width() * 0.62));
                coin.y = $source.position().top + Math.round(Math.random() * ($source.width() * 0.62));
                coins.push(coin);
                _str_a.push({
                    "x": coin.x,
                    "y": coin.y
                });
                _str_b.push({
                    "x": $target.position().left + Math.round(Math.random() * ($target.width() * 0.62)),
                    "y": $target.position().top + Math.round(Math.random() * ($target.width() * 0.62))
                });
            }
            obj.push(coins);
            str.push(_str_a);
            str1.push(_str_b);
        }
    } else {
        var $source = $('.user-info[data-id="' + source + '"]');
        for (var z = 0; z < target.length; z++) {
            var $target = $('.user-info[data-id="' + target[z] + '"]');
            var coins = [];
            var _str_a = [];
            var _str_b = [];
            for (var i = 0; i < count; i++) {
                var coin = new jinbi(gold_w, gold_h);
                coin.x = $source.position().left + Math.round(Math.random() * ($source.width() * 0.62));
                coin.y = $source.position().top + Math.round(Math.random() * ($source.width() * 0.62));
                coins.push(coin);
                _str_a.push({
                    "x": coin.x,
                    "y": coin.y
                });
                _str_b.push({
                    "x": $target.position().left + Math.round(Math.random() * ($target.width() * 0.62)),
                    "y": $target.position().top + Math.round(Math.random() * ($target.width() * 0.62))
                });
            }
            obj.push(coins);
            str.push(_str_a);
            str1.push(_str_b);
        }
    }
    var img = new Image();
    img.src = "http://img.lfzgame.com/images/niuniu/gold.png";
    img.onload = function() {
        move();
    };
    function move() {
        can.clearRect(0, 0, $canvas.width(), $canvas.height());
        if (_index % 2 == 0 && index1_num < count) {
            index1_num++;
        }
        for (var j = 0; j < obj.length; j++) {
            for (var k = 0; k < index1_num; k++) {
                obj[j][k].index++;
                if (obj[j][k].index <= index) {
                    obj[j][k].x += (str1[j][k]["x"] - str[j][k]["x"]) / index;
                    obj[j][k].y += (str1[j][k]["y"] - str[j][k]["y"]) / index;
                    obj[j][k].draw();
                }
                if (obj[j][0].index == index / 3) {
                    if (music_bol) {
                        sound.play('gold');
                        music_bol = false;
                    }
                }
            }
        }
        if (obj[0][0].index == index) {
            if (id_bol) {
                $('.user-info[data-id="' + target + '"]').addClass('flash');
            } else {
                for (var i = 0; i < target.length; i++) {
                    $('.user-info[data-id="' + target[i] + '"]').addClass('flash');
                }
            }
        } else if (obj[0][count - 1].index == index) {
            if (id_bol) {
                $('.user-info[data-id="' + target + '"]').removeClass('flash');
            } else {
                for (var i = 0; i < target.length; i++) {
                    $('.user-info[data-id="' + target[i] + '"]').removeClass('flash');
                }
            }
        }
        _index++;
        if (obj[0][count - 1].index > index) {
            bol = true;
            setTimeout(function() {
                    $canvas.remove();
                },
                500)
        }
        if (!bol) {
            setTimeout(move, 15)
        }
    }
    function jinbi(w, h) {
        var img = new Image();
        img.src = "http://img.lfzgame.com/images/niuniu/gold.png";
        this.play = img;
        this.x = 0;
        this.y = 0;
        this.index = 0;
        this.width1 = w;
        this.height1 = h;
        this.draw = function() {
            can.drawImage(this.play, 0, 0, this.play.width, this.play.height, this.x, this.y, this.width1, this.height1);
        }
    }
}
function Gold13(source, target) {
    if (source == "" || target == "") {
        return;
    }
    var id_bol;
    if (Object.prototype.toString.call(source) == '[object Array]') {
        id_bol = true;
    } else {
        id_bol = false;
    }
    var count = 8;
    var gold_w = 12;
    var gold_h = 12;
    var obj = [];
    var str = [];
    var str1 = [];
    var bol = false;
    var index = 39;
    var _index = 0;
    var index1_num = 0;
    var music_bol = true;
    var $canvas = $('<canvas width="' + $("body").width() + '" height="' + $("body").height() + ' "class="canvas_gold"></canvas>').appendTo('body');
    var can = $canvas.get(0).getContext("2d");
    if (id_bol) {
        var $target = $('.user-info[data-id="' + target + '"]');
        for (var z = 0; z < source.length; z++) {
            var $source = $('.user-info[data-id="' + source[z] + '"]');
            var coins = [];
            var _str_a = [];
            var _str_b = [];
            for (var i = 0; i < count; i++) {
                var coin = new jinbi(gold_w, gold_h);
                coin.x = $source.position().left + Math.round(Math.random() * ($source.children('.user-img').width() * 0.62));
                coin.y = $source.position().top + Math.round(Math.random() * ($source.children('.user-img').width() * 0.62));
                coins.push(coin);
                _str_a.push({
                    "x": coin.x,
                    "y": coin.y
                });
                _str_b.push({
                    "x": $target.position().left + Math.round(Math.random() * ($target.children('.user-img').width() * 0.62)),
                    "y": $target.position().top + Math.round(Math.random() * ($target.children('.user-img').width() * 0.62))
                });
            }
            obj.push(coins);
            str.push(_str_a);
            str1.push(_str_b);
        }
    } else {
        var $source = $('.user-info[data-id="' + source + '"]');
        for (var z = 0; z < target.length; z++) {
            var $target = $('.user-info[data-id="' + target[z] + '"]');
            var coins = [];
            var _str_a = [];
            var _str_b = [];
            for (var i = 0; i < count; i++) {
                var coin = new jinbi(gold_w, gold_h);
                coin.x = $source.position().left + Math.round(Math.random() * ($source.children('.user-img').width() * 0.62));
                coin.y = $source.position().top + Math.round(Math.random() * ($source.children('.user-img').width() * 0.62));
                coins.push(coin);
                _str_a.push({
                    "x": coin.x,
                    "y": coin.y
                });
                _str_b.push({
                    "x": $target.position().left + Math.round(Math.random() * ($target.children('.user-img').width() * 0.62)),
                    "y": $target.position().top + Math.round(Math.random() * ($target.children('.user-img').width() * 0.62))
                });
            }
            obj.push(coins);
            str.push(_str_a);
            str1.push(_str_b);
        }
    }
    var img = new Image();
    img.src = "http://img.lfzgame.com/images/niuniu/gold.png";
    img.onload = function() {
        move();
    };
    function move() {
        can.clearRect(0, 0, $canvas.width(), $canvas.height());
        if (_index % 2 == 0 && index1_num < count) {
            index1_num++;
        }
        for (var j = 0; j < obj.length; j++) {
            for (var k = 0; k < index1_num; k++) {
                obj[j][k].index++;
                if (obj[j][k].index <= index) {
                    obj[j][k].x += (str1[j][k]["x"] - str[j][k]["x"]) / index;
                    obj[j][k].y += (str1[j][k]["y"] - str[j][k]["y"]) / index;
                    obj[j][k].draw();
                }
                if (obj[j][0].index == index / 3) {
                    if (music_bol) {
                        sound.play('gold');
                        music_bol = false;
                    }
                }
            }
        }
        if (obj[0][0].index == index) {
            if (id_bol) {
                $('.user-info[data-id="' + target + '"]').addClass('flash');
            } else {
                for (var i = 0; i < target.length; i++) {
                    $('.user-info[data-id="' + target[i] + '"]').addClass('flash');
                }
            }
        } else if (obj[0][count - 1].index == index) {
            if (id_bol) {
                $('.user-info[data-id="' + target + '"]').removeClass('flash');
            } else {
                for (var i = 0; i < target.length; i++) {
                    $('.user-info[data-id="' + target[i] + '"]').removeClass('flash');
                }
            }
        }
        _index++;
        if (obj[0][count - 1].index > index) {
            bol = true;
            setTimeout(function() {
                    $canvas.remove();
                },
                500)
        }
        if (!bol) {
            setTimeout(move, 15)
        }
    }
    function jinbi(w, h) {
        var img = new Image();
        img.src = "http://img.lfzgame.com/images/niuniu/gold.png";
        this.play = img;
        this.x = 0;
        this.y = 0;
        this.index = 0;
        this.width1 = w;
        this.height1 = h;
        this.draw = function() {
            can.drawImage(this.play, 0, 0, this.play.width, this.play.height, this.x, this.y, this.width1, this.height1);
        }
    }
}
$.fn.overscroll = function() {
    this.on('touchstart',
        function(event) {
            $(document.body).off('touchmove');
        });
    this.on('touchend',
        function(event) {
            $(document.body).on('touchmove',
                function(evt) {
                    evt.preventDefault();
                });
        });
};
var sound = {
    audioContext: null,
    audioBuffers: [],
    isloaded: false,
    isBgm: false,
    o: {},
    source: [],
    initModule: function() {
        this.audioBuffers = [];
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        this.audioContext = new window.AudioContext();
    },
    stopSound: function(name) {
        var buffer = this.audioBuffers[name];
        if (buffer) {
            if (buffer.source) {
                buffer.source.stop(0);
                buffer.source = null;
            }
        }
    },
    playSound: function(name, isLoop) {
        var buffer = this.audioBuffers[name];
        if (buffer) {
            if (win.app > 0) {
                buffer.source = null;
                buffer.source = sound.audioContext.createBufferSource();
                buffer.source.buffer = buffer.buffer;
                buffer.source.loop = false;
                var gainNode = sound.audioContext.createGain();
                if (isLoop == true) {
                    buffer.source.loop = true;
                    gainNode.gain.value = 0.7;
                } else {
                    gainNode.gain.value = 1.0;
                }
                buffer.source.connect(gainNode);
                gainNode.connect(sound.audioContext.destination);
                buffer.source.start(0);
            } else {
                WeixinJSBridge.invoke('getNetworkType', {},
                    function(e) {
                        buffer.source = null;
                        buffer.source = sound.audioContext.createBufferSource();
                        buffer.source.buffer = buffer.buffer;
                        buffer.source.loop = false;
                        var gainNode = sound.audioContext.createGain();
                        if (isLoop == true) {
                            buffer.source.loop = true;
                            gainNode.gain.value = 0.7;
                        } else {
                            gainNode.gain.value = 1.0;
                        }
                        buffer.source.connect(gainNode);
                        gainNode.connect(sound.audioContext.destination);
                        buffer.source.start(0);
                    });
            }
        }
    },
    initSound: function(arrayBuffer, name) {
        this.audioContext.decodeAudioData(arrayBuffer,
            function(buffer) {
                sound.audioBuffers[name] = {
                    "name": name,
                    "buffer": buffer,
                    "source": null
                };
                if (name == "bgm") {
                    sound.isloaded = true;
                    sound.playSound(name, true);
                }
            },
            function(e) {
                console.warn('Error decoding file');
            });
    },
    loadAudioFile: function(url, name) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function(e) {
            sound.initSound(xhr.response, name);
        };
        xhr.send();
    },
    load: function() {
        if (this.isloaded) return;
        for (var i in this.source) {
            this.loadAudioFile(this.source[i], i);
        }
    },
    play: function(num, sex) {
        if (!storage.get('pausemusic')) {
            if (sex) {
                var name = 'sound_';
                if (sex == 1) name += '1';
                else name += '2';
                if (/^\d+$/.test(num)) name += '_' + num;
                else name += num;
                this.playSound(name);
            } else {
                if (num) this.playSound(num);
            }
        }
    }
};
sound.initModule();
document.addEventListener("visibilitychange",
    function() {
        if (!document.hidden) {
            if (!storage.get('pausemusic')) sound.playSound('bgm', true);
        } else {
            if (!storage.get('pausemusic')) sound.stopSound('bgm');
        }
    });
function createRanking(data, func) {
    win.gameId = data.game_id;
    var users = data.users;
    var game_id = data.game_id;
    var room_number = data.room_number;
    var num = data.num;
    var sum = data.sum;
    var datetime = data.datetime;
    var width = 750;
    var height = 1216;
    var pics = ['https://cdn-1255620552.file.myqcloud.com/images/ranking_' + game_id + '_bg.jpg', 'https://cdn-1255620552.file.myqcloud.com/images/people_bg.png', 'https://cdn-1255620552.file.myqcloud.com/images/ranking_icon.png'];
    if (users.length > 6) {
        pics.push('https://cdn-1255620552.file.myqcloud.com/images/people_bg2.jpg');
        pics.push('https://cdn-1255620552.file.myqcloud.com/images/people_bg3.jpg');
        height += 102 * (users.length - 6);
    }
    for (var i in users) {
        if (/\/+[064]{1,2}$/.test(users[i].path)) pics.push('https://cdn-1255620552.file.myqcloud.com/images/default_head.png');
        else pics.push(users[i].path.replace(/\/0$/, '/64').replace('https://wx.qlogo.cn/', 'http://113.96.232.104/'));
    }
    var count = 0,
        imgs = [];
    for (var i in pics) {
        if (XMLHttpRequest) var xhr = new XMLHttpRequest();
        else var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        xhr._index = i;
        xhr.open("get", pics[i], true);
        xhr.responseType = "blob";
        xhr.onload = function() {
            var img = document.createElement("img");
            if (this.status == 200) {
                img.src = window.URL.createObjectURL(this.response);
            } else {
                this.src = 'https://cdn-1255620552.file.myqcloud.com/images/default_head.png';
            }
            imgs[this._index] = img;
            img.onload = function(e) {
                count++;
                if (count >= pics.length) draw();
            };
        };
        xhr.onerror = function() {
            var img = document.createElement("img");
            img.src = 'https://cdn-1255620552.file.myqcloud.com/images/default_head.png';
            imgs[this._index] = img;
            img.onload = function(e) {
                count++;
                if (count >= pics.length) draw();
            };
        };
        xhr.send();
    }
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    function draw() {
        context.drawImage(imgs[0], 0, 0, width, width / 750 * 1216);
        var text = '房间号：' + room_number + '                     ' + datetime + '   ' + num + '/' + sum + '局';
        context.font = "19px 微软雅黑";
        context.textAlign = 'center';
        context.fillStyle = "#a28080";
        context.fillText(text, 375, 412);
        for (var i in users) {
            if (i >= 6) context.drawImage(imgs[3], 0, 430 + i * 102, 750, 102);
            var n = parseInt(i) + parseInt(users.length > 6 ? 5 : 3);
            context.drawImage(imgs[n], 170, 446 + i * 102, 59, 59);
            context.drawImage(imgs[1], 129, 430 + i * 102, 490, 90);
            var textwidth = 250;
            context.font = "24px 微软雅黑";
            context.textAlign = 'start';
            context.fillStyle = "#666666";
            var arr = users[i].nickname.split('');
            var txt = '',
                row = [];
            for (var j in arr) {
                if (context.measureText(txt).width >= textwidth) {
                    row.push(txt);
                    txt = '';
                }
                txt += arr[j];
            }
            if (txt != '') row.push(txt);
            if (row.length == 1) {
                context.fillText(row[0], 240, 482 + 102 * i);
            } else {
                context.fillText(row[0], 240, 470 + 102 * i);
                context.fillText(row[1], 240, 498 + 102 * i);
            }
            context.font = "36px 微软雅黑";
            context.textAlign = 'center';
            if (users[i]['value'] > 0) {
                context.fillStyle = "#cd5908";
                context.fillText('+' + users[i]['value'], 560, 490 + 102 * i);
            } else if (users[i]['value'] < 0) {
                context.fillStyle = "#32b16c";
                context.fillText(users[i]['value'], 560, 490 + 102 * i);
            } else {
                context.fillStyle = "#989898";
                context.fillText('0', 560, 490 + 102 * i);
            }
            if (users[i]['value'] == users[0]['value']) {
                context.drawImage(imgs[2], 108, 430 + i * 102, 51, 84);
            }
        }
        if (i >= 6) context.drawImage(imgs[4], 0, 430 + (++i) * 102, 750, 175);
        if (typeof(func) == 'function') func(canvas.toDataURL("image/png"));
    }
}
function liuliuCreateRanking(data, func) {
    win.gameId = data.game_id;
    var users = data.users;
    var game_id = data.game_id;
    var room_number = data.room_number;
    var num = data.num;
    var sum = data.sum;
    var datetime = data.datetime;
    var width = 750;
    var height = 1216;
    var pics = ['https://cdn-1255620552.file.myqcloud.com/images/common/ranking_' + game_id + '_bg.jpg', 'https://cdn-1255620552.file.myqcloud.com/images/people_bg.png', 'https://cdn-1255620552.file.myqcloud.com/images/ranking_icon.png'];
    if (users.length > 6) {
        pics.push('https://cdn-1255620552.file.myqcloud.com/images/common/people_bg2.jpg');
        pics.push('https://cdn-1255620552.file.myqcloud.com/images/common/people_bg3.jpg');
        height += 102 * (users.length - 6);
    }
    for (var i in users) {
        if (/\/+[064]{1,2}$/.test(users[i].path)) pics.push('https://cdn-1255620552.file.myqcloud.com/images/default_head.png');
        else pics.push(users[i].path.replace(/\/0$/, '/64').replace('https://wx.qlogo.cn/', 'http://113.96.232.104/'));
    }
    var count = 0,
        imgs = [];
    for (var i in pics) {
        if (XMLHttpRequest) var xhr = new XMLHttpRequest();
        else var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        xhr._index = i;
        xhr.open("get", pics[i], true);
        xhr.responseType = "blob";
        xhr.onload = function() {
            var img = document.createElement("img");
            if (this.status == 200) {
                img.src = window.URL.createObjectURL(this.response);
            } else {
                this.src = 'https://cdn-1255620552.file.myqcloud.com/images/default_head.png';
            }
            imgs[this._index] = img;
            img.onload = function(e) {
                count++;
                if (count >= pics.length) {
                    draw();
                }
            };
        };
        xhr.onerror = function() {
            var img = document.createElement("img");
            img.src = 'https://cdn-1255620552.file.myqcloud.com/images/default_head.png';
            imgs[this._index] = img;
            img.onload = function(e) {
                count++;
                if (count >= pics.length) {
                    draw();
                }
            };
        };
        xhr.send();
    }
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    function draw() {
        context.drawImage(imgs[0], 0, 0, width, width / 750 * 1216);
        var text = '房间号：' + room_number + '                     ' + datetime + '   ' + num + '/' + sum + '局';
        context.font = "19px 微软雅黑";
        context.textAlign = 'center';
        context.fillStyle = "#a28080";
        context.fillText(text, 375, 412);
        for (var i in users) {
            if (i >= 6) context.drawImage(imgs[3], 0, 430 + i * 102, 750, 102);
            var n = parseInt(i) + parseInt(users.length > 6 ? 5 : 3);
            context.drawImage(imgs[n], 170, 446 + i * 102, 59, 59);
            context.drawImage(imgs[1], 129, 430 + i * 102, 490, 90);
            var textwidth = 250;
            context.font = "24px 微软雅黑";
            context.textAlign = 'start';
            context.fillStyle = "#666666";
            var arr = users[i].nickname.split('');
            var txt = '',
                row = [];
            for (var j in arr) {
                if (context.measureText(txt).width >= textwidth) {
                    row.push(txt);
                    txt = '';
                }
                txt += arr[j];
            }
            if (txt != '') row.push(txt);
            if (row.length == 1) {
                context.fillText(row[0], 240, 482 + 102 * i);
            } else {
                context.fillText(row[0], 240, 470 + 102 * i);
                context.fillText(row[1], 240, 498 + 102 * i);
            }
            context.font = "36px 微软雅黑";
            context.textAlign = 'center';
            if (users[i]['value'] > 0) {
                context.fillStyle = "#cd5908";
                context.fillText('+' + users[i]['value'], 560, 490 + 102 * i);
            } else if (users[i]['value'] < 0) {
                context.fillStyle = "#32b16c";
                context.fillText(users[i]['value'], 560, 490 + 102 * i);
            } else {
                context.fillStyle = "#989898";
                context.fillText('0', 560, 490 + 102 * i);
            }
            if (users[i]['value'] == users[0]['value']) {
                context.drawImage(imgs[2], 108, 430 + i * 102, 51, 84);
            }
        }
        if (i >= 6) context.drawImage(imgs[4], 0, 430 + (++i) * 102, 750, 175);
        if (typeof(func) == 'function') func(canvas.toDataURL("image/png"));
    }
}
function createRankingV2(data, func) {
    win.gameId = data.game_id;
    var users = data.users;
    var room_number = data.room_number;
    var num = data.num;
    var sum = data.sum;
    var datetime = data.datetime;
    var width = 750;
    var height = 1216;
    var pics = ['https://cdn-1255620552.file.myqcloud.com/images/decIndex/ranking_bg.jpg', 'https://cdn-1255620552.file.myqcloud.com/images/decIndex/people_bg.png?v=1', 'https://cdn-1255620552.file.myqcloud.com/images/decIndex/ranking_icon.png'];
    if (users.length > 6) {
        pics.push('https://cdn-1255620552.file.myqcloud.com/images/decIndex/people_bg2.jpg');
        pics.push('https://cdn-1255620552.file.myqcloud.com/images/decIndex/people_bg3.jpg');
        height += 102 * (users.length - 6);
    }
    for (var i in users) {
        if (/\/\/[064]{1,2}$/.test(users[i].path)) pics.push('https://cdn-1255620552.file.myqcloud.com/images/default_head.png');
        else pics.push(users[i].path.replace(/\/0$/, '/64').replace('https://wx.qlogo.cn/', 'http://113.96.232.104/'));
    }
    var count = 0,
        imgs = [];
    for (var i in pics) {
        if (XMLHttpRequest) var xhr = new XMLHttpRequest();
        else var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        xhr._index = i;
        xhr.open("get", pics[i], true);
        xhr.responseType = "blob";
        xhr.onload = function() {
            var img = document.createElement("img");
            if (this.status == 200) {
                img.src = window.URL.createObjectURL(this.response);
            } else {
                this.src = 'https://cdn-1255620552.file.myqcloud.com/images/default_head.png';
            }
            imgs[this._index] = img;
            img.onload = function(e) {
                count++;
                if (count >= pics.length) draw();
            };
        };
        xhr.onerror = function() {
            var img = document.createElement("img");
            img.src = 'https://cdn-1255620552.file.myqcloud.com/images/default_head.png';
            imgs[this._index] = img;
            img.onload = function(e) {
                count++;
                if (count >= pics.length) draw();
            };
        };
        xhr.send();
    }
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    function draw() {
        context.drawImage(imgs[0], 0, 0, width, width / 750 * 1216);
        var text = '房间号：' + room_number + '  ' + datetime + '   ' + num + '/' + sum + '局';
        context.font = "24px 微软雅黑";
        context.textAlign = 'center';
        context.fillStyle = "#494949";
        context.fillText(text, 375, 350);
        for (var i in users) {
            if (i >= 6) context.drawImage(imgs[3], 0, 394 + i * 96, 750, 96);
            var n = parseInt(i) + parseInt(users.length > 6 ? 5 : 3);
            context.drawImage(imgs[n], 113, 403 + i * 96, 59, 59);
            context.drawImage(imgs[1], 101, 394 + i * 96, 552, 78);
            var textwidth = 220;
            context.font = "24px 微软雅黑";
            context.textAlign = 'start';
            context.fillStyle = "#494949";
            var arr = users[i].nickname.split('');
            var txt = '',
                row = [];
            var textWidthObj = 0;
            for (var j in arr) {
                if (context.measureText(txt).width >= textwidth) {
                    row.push(txt);
                    txt = '';
                }
                txt += arr[j];
            }
            if (txt != '') row.push(txt);
            if (row.length == 1) {
                context.fillText(row[0], 184, 445 + 96 * i);
            } else {
                context.fillText(row[0], 184, 425 + 96 * i);
                context.fillText(row[1], 184, 455 + 96 * i);
            }
            if (row[0] && row[1]) {
                textWidthObj = (context.measureText(row[0]).width > context.measureText(row[1]).width ? context.measureText(row[0]).width: context.measureText(row[1]).width);
            } else {
                textWidthObj = context.measureText(row[0]).width;
            }
            context.font = "36px 微软雅黑";
            context.textAlign = 'center';
            if (users[i]['value'] > 0) {
                context.fillStyle = "#cd5908";
                context.fillText('+' + users[i]['value'], 580, 445 + 96 * i);
            } else if (users[i]['value'] < 0) {
                context.fillStyle = "#32b16c";
                context.fillText(users[i]['value'], 580, 445 + 96 * i);
            } else {
                context.fillStyle = "#989898";
                context.fillText('0', 580, 445 + 96 * i);
            }
            if (users[i]['value'] == users[0]['value']) {
                var playerNameLength = parseInt((users[i].nickname.split('').length || 0));
                playerNameLength = textWidthObj + 48 + 200;
                if (playerNameLength > 415) {
                    playerNameLength = 415;
                }
                context.drawImage(imgs[2], playerNameLength, 404 + i * 96, 102, 59);
            }
        }
        if (i >= 6) context.drawImage(imgs[4], 0, 394 + (++i) * 96, 750, 246);
        if (typeof(func) == 'function') func(canvas.toDataURL("image/png"));
    }
}
function isChinese(val) {
    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    if (reg.test(val)) {
        return true;
    } else {
        return false;
    }
}
function canvasRanking(data, func) {
    win.gameId = data.game_id;
    var $canvas = $('<canvas id="canvas" width="' + 750 * 2 + '" height="' + 1216 * 2 + ' "></canvas>').appendTo('body').hide();
    var can = $canvas.get(0).getContext("2d");
    var str = ["https://cdn-1255620552.file.myqcloud.com/images/bull/rank_bg.jpg", "https://cdn-1255620552.file.myqcloud.com/images/bull/rank_frame62.png", 'https://cdn-1255620552.file.myqcloud.com/images/bull/scoresRank3.png', 'https://cdn-1255620552.file.myqcloud.com/images/bull/rank_bigwinner2.png', 'https://cdn-1255620552.file.myqcloud.com/images/bull/score_search1.png'];
    var index = 0,
        arr = [];
    for (var i in str) {
        if (XMLHttpRequest) var xhr = new XMLHttpRequest();
        else var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        xhr._index = i;
        xhr.open("get", str[i], true);
        xhr.responseType = "blob";
        xhr.onload = function() {
            var img = document.createElement("img");
            if (this.status == 200) {
                img.src = window.URL.createObjectURL(this.response);
            } else {
                this.src = 'https://cdn-1255620552.file.myqcloud.com/images/default_head.png';
            }
            arr[this._index] = img;
            img.onload = function(e) {
                index++;
                if (index >= str.length) {
                    if (data.users) {
                        if (data.users.length > 6) {
                            canvasStart9()
                        } else {
                            canvasStart()
                        }
                    }
                }
            };
        };
        xhr.onerror = function() {
            var img = document.createElement("img");
            img.src = 'https://cdn-1255620552.file.myqcloud.com/images/default_head.png';
            arr[this._index] = img;
            img.onload = function(e) {
                index++;
                if (index >= str.length) {
                    if (data.users) {
                        if (data.users.length > 6) {
                            canvasStart9()
                        } else {
                            canvasStart()
                        }
                    }
                }
            };
        };
        xhr.send();
    }
    function canvasStart() {
        can.drawImage(arr[0], 0, 0, 750 * 2, 1216 * 2);
        can.drawImage(arr[1], 115 * 2, 41 * 2, 520 * 2, 611 * 520 / 360 * 2);
        can.drawImage(arr[2], 100 * 2, (41 + 611 * 520 / 360 + 68) * 2, 228 * 2, 66 * 2);
        can.drawImage(arr[4], 420 * 2, (41 + 611 * 520 / 360 + 68) * 2, 228 * 2, 66 * 2);
        can.lineWidth = 1;
        can.strokeStyle = "#ffffff";
        can.fillStyle = '#554A2A';
        roundRect(140 * 2, 243 * 2, 475 * 2, 35 * 2, 30).stroke();
        can.fill();
        can.font = 20 * 2 + "px 微软雅黑";
        can.fillStyle = '#ffcd06';
        can.textBaseline = 'bottom';
        can.fillText('房间号:' + data.room_number, 150 * 2, 270 * 2);
        can.fillText(data.datetime, 335 * 2, 270 * 2);
        can.fillText(data.num + '局', 550 * 2, 270 * 2);
        if (data.users.length > 0) {
            for (var i in data.users) {
                var textwidth = 500;
                can.fillStyle = '#000000';
                can.fillRect(134 * 2, 303 * 2 + (5 + 75 * 160 / 130) * 2 * i, 482 * 2, 88 * 2);
                can.font = 29 * 2 + "px 微软雅黑";
                can.textBaseline = 'middle';
                if (parseInt(data.users[i].value) > 0) {
                    var value = '+' + data.users[i].value;
                    can.fillStyle = '#FFBB00';
                    var nameArr = data.users[i].nickname.split('');
                    var txt = '',
                        row = [];
                    for (var j in nameArr) {
                        if (can.measureText(txt).width >= textwidth) {
                            row.push(txt);
                            txt = '';
                        }
                        txt += nameArr[j];
                    }
                    if (txt != '') row.push(txt);
                    if (row.length == 1) {
                        can.fillText(row[0], 209 * 2, 347 * 2 + (5 + 75 * 160 / 130) * 2 * i);
                    } else {
                        can.fillText(row[0], 209 * 2, 347 * 2 + ((5 + 75 * 160 / 130) * 2 * i) - 37);
                        can.fillText(row[1], 209 * 2, 347 * 2 + ((5 + 75 * 160 / 130) * 2 * i) + 33);
                    }
                    can.fillText(value, 510 * 2, 347 * 2 + (5 + 75 * 160 / 130) * 2 * i);
                } else {
                    can.fillStyle = '#B3B2AD';
                    var nameArr = data.users[i].nickname.split('');
                    var txt = '',
                        row = [];
                    for (var j in nameArr) {
                        if (can.measureText(txt).width >= textwidth) {
                            row.push(txt);
                            txt = '';
                        }
                        txt += nameArr[j];
                    }
                    if (txt != '') row.push(txt);
                    if (row.length == 1) {
                        can.fillText(row[0], 209 * 2, 347 * 2 + (5 + 75 * 160 / 130) * 2 * i);
                    } else {
                        can.fillText(row[0], 209 * 2, 347 * 2 + ((5 + 75 * 160 / 130) * 2 * i) - 37);
                        can.fillText(row[1], 209 * 2, 347 * 2 + ((5 + 75 * 160 / 130) * 2 * i) + 33);
                    }
                    can.fillText(data.users[i].value, 510 * 2, 347 * 2 + (5 + 75 * 160 / 130) * 2 * i);
                }
            }
            var maxArr = [];
            var max = parseInt(data.users[0].value);
            for (var j = 1; j < data.users.length; j++) {
                if (max < parseInt(data.users[j].value)) {
                    max = parseInt(data.users[j].value);
                }
            }
            for (var k in data.users) {
                if (max == parseInt(data.users[k].value)) {
                    maxArr.push(k);
                }
            }
            for (var m in maxArr) {
                can.drawImage(arr[3], 134 * 2, 293 * 2 + (5 + 75 * 160 / 130) * 2 * maxArr[m], 75 * 2, 75 * 160 / 130 * 2);
            }
        }
        function roundRect(x, y, w, h, r) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            can.beginPath();
            can.moveTo(x + r, y);
            can.arcTo(x + w, y, x + w, y + h, r);
            can.arcTo(x + w, y + h, x, y + h, r);
            can.arcTo(x, y + h, x, y, r);
            can.arcTo(x, y, x + w, y, r);
            can.closePath();
            return can;
        }
        if (typeof(func) == 'function') {
            func(canvas.toDataURL("image/png"));
            $('#canvas').remove();
        }
    }
    function canvasStart9() {
        can.drawImage(arr[0], 0, 0, 750 * 2, 1216 * 2);
        can.drawImage(arr[1], 115 * 2, 41 * 2, 520 * 2, 611 * 520 / 360 * 2);
        can.drawImage(arr[2], 100 * 2, (41 + 611 * 520 / 360 + 68) * 2, 228 * 2, 66 * 2);
        can.drawImage(arr[4], 420 * 2, (41 + 611 * 520 / 360 + 68) * 2, 228 * 2, 66 * 2);
        can.lineWidth = 1;
        can.strokeStyle = "#ffffff";
        can.fillStyle = '#554A2A';
        roundRect(140 * 2, 243 * 2, 475 * 2, 35 * 2, 30).stroke();
        can.fill();
        can.font = 20 * 2 + "px 微软雅黑";
        can.fillStyle = '#ffcd06';
        can.textBaseline = 'bottom';
        can.fillText('房间号:' + data.room_number, 150 * 2, 270 * 2);
        can.fillText(data.datetime, 335 * 2, 270 * 2);
        can.fillText(data.num + '局', 550 * 2, 270 * 2);
        if (data.users.length > 0) {
            for (var i in data.users) {
                var textwidth = 500;
                can.fillStyle = '#000000';
                can.fillRect(134 * 2, 303 * 2 + (5 + 49 * 160 / 130) * 2 * i, 482 * 2, 58 * 2);
                can.font = 29 * 2 + "px 微软雅黑";
                can.textBaseline = 'middle';
                if (parseInt(data.users[i].value) > 0) {
                    var value = '+' + data.users[i].value;
                    can.fillStyle = '#FFBB00';
                    can.fillText(value, 510 * 2, 332 * 2 + (5 + 49 * 160 / 130) * 2 * i);
                    var nameArr = data.users[i].nickname.split('');
                    var txt = '',
                        row = [];
                    for (var j in nameArr) {
                        if (can.measureText(txt).width >= textwidth) {
                            row.push(txt);
                            txt = '';
                        }
                        txt += nameArr[j];
                    }
                    if (txt != '') row.push(txt);
                    if (row.length == 1) {
                        can.fillText(row[0], 209 * 2, 332 * 2 + (5 + 49 * 160 / 130) * 2 * i);
                    } else {
                        can.font = 24 * 2 + "px 微软雅黑";
                        can.fillText(row[0], 209 * 2, 332 * 2 + ((5 + 49 * 160 / 130) * 2 * i) - 32);
                        can.fillText(row[1], 209 * 2, 332 * 2 + ((5 + 49 * 160 / 130) * 2 * i) + 25);
                    }
                } else {
                    can.fillStyle = '#B3B2AD';
                    can.fillText(data.users[i].value, 510 * 2, 332 * 2 + (5 + 49 * 160 / 130) * 2 * i);
                    var nameArr = data.users[i].nickname.split('');
                    var txt = '',
                        row = [];
                    for (var j in nameArr) {
                        if (can.measureText(txt).width >= textwidth) {
                            row.push(txt);
                            txt = '';
                        }
                        txt += nameArr[j];
                    }
                    if (txt != '') row.push(txt);
                    if (row.length == 1) {
                        can.fillText(row[0], 209 * 2, 332 * 2 + (5 + 49 * 160 / 130) * 2 * i);
                    } else {
                        can.font = 24 * 2 + "px 微软雅黑";
                        can.fillText(row[0], 209 * 2, 332 * 2 + ((5 + 49 * 160 / 130) * 2 * i) - 32);
                        can.fillText(row[1], 209 * 2, 332 * 2 + ((5 + 49 * 160 / 130) * 2 * i) + 25);
                    }
                }
            }
            var maxArr = [];
            var max = parseInt(data.users[0].value);
            for (var j = 1; j < data.users.length; j++) {
                if (max < parseInt(data.users[j].value)) {
                    max = parseInt(data.users[j].value);
                }
            }
            for (var k in data.users) {
                if (max == parseInt(data.users[k].value)) {
                    maxArr.push(k);
                }
            }
            for (var m in maxArr) {
                can.drawImage(arr[3], 134 * 2, 293 * 2 + (5 + 49 * 160 / 130) * 2 * maxArr[m], 49 * 2, 49 * 160 / 130 * 2);
            }
        }
        function roundRect(x, y, w, h, r) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            can.beginPath();
            can.moveTo(x + r, y);
            can.arcTo(x + w, y, x + w, y + h, r);
            can.arcTo(x + w, y + h, x, y + h, r);
            can.arcTo(x, y + h, x, y, r);
            can.arcTo(x, y, x + w, y, r);
            can.closePath();
            return can;
        }
        if (typeof(func) == 'function') {
            func(canvas.toDataURL("image/png"));
            $('#canvas').remove();
        }
    }
}
function Agreement() {
    var code = '<div class="window-masks agreement" id="agreement">';
    code += '<div class="border-opacity">';
    code += '    </div>';
    code += '</div>';
    document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", code);
    document.getElementById('agreement').onclick = function() {
        if (document.getElementById('agreement')) {
            document.body.removeChild(document.getElementById('agreement'));
        }
    };
}
function AgreementV2() {
    var code = '<div class="window-masks agreement" id="agreement">';
    code += '<div class="border-opacity-v2">';
    code += '    </div>';
    code += '</div>';
    document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", code);
    document.getElementById('agreement').onclick = function() {
        if (document.getElementById('agreement')) {
            document.body.removeChild(document.getElementById('agreement'));
        }
    };
}
function AgreementThirteen() {
    var code = '<div class="window-masks agreement" id="agreement">';
    code += '<div class="border-opacity-thirteen">';
    code += '    </div>';
    code += '</div>';
    document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", code);
    document.getElementById('agreement').onclick = function() {
        if (document.getElementById('agreement')) {
            document.body.removeChild(document.getElementById('agreement'));
        }
    };
}
function returnIndex(text) {
    var text = text || '确认返回主页？';
    var code = '<div class="window-masks return-index" id="returnIndex">';
    code += '<div class="border-opacity">';
    code += '<div class="container">';
    code += '<i class="mask-icon mask-top"></i><i class="mask-icon mask-right"></i><i class="mask-icon mask-bottom"></i><i class="mask-icon mask-left"></i>';
    code += '<div class="main">' + text + '</div>';
    code += '<div class="button">';
    code += '<div class="sure" id="returnIndexBtn">返回首页</div>';
    code += '<div class="cancel" id="cancelBtn">取消</div>';
    code += '</div>';
    code += '</div>';
    code += '</div>';
    code += '</div>';
    document.body.insertAdjacentHTML("beforeend", code);
    document.getElementById('returnIndexBtn').onclick = function() {
        location.href = 'index.html';
    };
    document.getElementById('cancelBtn').onclick = function() {
        document.body.removeChild(document.getElementById('returnIndex'));
    };
    document.getElementById('returnIndex').onclick = function() {
        if (document.getElementById('returnIndex')) {
            document.body.removeChild(document.getElementById('returnIndex'));
        }
    };
}
function returnIndexV2(text) {
    var text = text || '确认返回主页？';
    var code = '<div class="window-masks return-index" id="returnIndex">';
    code += '<div class="border-opacity-v2">';
    code += '<div class="container">';
    code += '<div class="main">' + text + '</div>';
    code += '<div class="button">';
    code += '<div class="sure" id="returnIndexBtn"></div>';
    code += '<div class="cancel" id="cancelBtn"></div>';
    code += '</div>';
    code += '</div>';
    code += '</div>';
    code += '</div>';
    document.body.insertAdjacentHTML("beforeend", code);
    document.getElementById('returnIndexBtn').onclick = function() {
        location.href = 'index.html';
    };
    document.getElementById('cancelBtn').onclick = function() {
        document.body.removeChild(document.getElementById('returnIndex'));
    };
    document.getElementById('returnIndex').onclick = function() {
        if (document.getElementById('returnIndex')) {
            document.body.removeChild(document.getElementById('returnIndex'));
        }
    };
}
function returnIndexThirteen(text) {
    var text = text || '确认返回主页？';
    var code = '<div class="window-masks return-index" id="returnIndex">';
    code += '<div class="border-opacity-thirteen">';
    code += '<div class="container">';
    code += '<div class="main">' + text + '</div>';
    code += '<div class="button">';
    code += '<div class="sure" id="returnIndexBtn"></div>';
    code += '<div class="cancel" id="cancelBtn"></div>';
    code += '</div>';
    code += '</div>';
    code += '</div>';
    code += '</div>';
    document.body.insertAdjacentHTML("beforeend", code);
    document.getElementById('returnIndexBtn').onclick = function() {
        location.href = 'index.html';
    };
    document.getElementById('cancelBtn').onclick = function() {
        document.body.removeChild(document.getElementById('returnIndex'));
    };
    document.getElementById('returnIndex').onclick = function() {
        if (document.getElementById('returnIndex')) {
            document.body.removeChild(document.getElementById('returnIndex'));
        }
    };
}
function getRuleScaleY(game_data) {
    var count = 0;
    for (var d in game_data) {
        if (game_data[d] != '' && game_data[d] != undefined && d != 'number') {
            count++;
        }
    }
    return (count - 5) * 30;
}
function generalRule(game_id, game_data, parent) {
    var data = game_data;
    var startPointY = 135;
    var startPointX = 33;
    var startValuePointX = 87;
    var spaceY = 30;
    var ruleJson = {
        '1': {
            'zhuang_type': {
                'text': '模式 :',
                'value': {
                    '1': '明牌抢庄',
                    '2': '通比牛.牛',
                    '3': '自由抢庄',
                    '4': '牛.牛上庄',
                    '5': '固定庄家'
                }
            },
            'end_points': {
                'text': '底分 :',
                'value': {
                    '1': '1分',
                    '2': '2分',
                    '3': '3分',
                    '4': '4分',
                    '5': '5分',
                    '10': '10分',
                    '20': '20分'
                }
            },
            'card_rule': {
                'text': '规则 :',
                'value': {
                    '1': '牛.牛×3 牛九×2 牛八×2',
                    '2': '牛.牛×4 牛九×3 牛八×2 牛七×2'
                }
            },
            'hand_patterns': {
                'text': '牌型 :',
                'value': ['五花牛（5倍） ', '炸弹牛（6倍） ', '五小牛（8倍） ']
            },
            'max_matches': {
                'text': '局数 :',
                'value': {
                    '10': '10局房卡X1',
                    '20': '20局房卡X2'
                }
            },
            'zhuang_value': {
                'text': '上庄 :',
                'value': {
                    '0': '无',
                    '100': '100',
                    '300': '300',
                    '500': '500'
                }
            }
        },
        '2': {
            'end_points': {
                'text': '底分 :',
                'value': {
                    '2': '2分',
                    '4': '4分',
                    '8': '8分'
                }
            },
            'chip_rule': {
                'text': '分数 :',
                'value': {
                    '1': '2/4，4/8，8/16，10/20',
                    '2': '2/4，5/10，10/20，20/40'
                }
            },
            'max_matches': {
                'text': '局数 :',
                'value': {
                    '10': '10局房卡X1',
                    '20': '20局房卡X2'
                }
            },
            'upper_limit': {
                'text': '上限 :',
                'value': {
                    '0': '无',
                    '500': '500',
                    '1000': '1000',
                    '2000': '2000'
                }
            }
        },
        '3': {
            'end_points': {
                'text': '底分 :',
                'value': {
                    '1': '1分',
                    '3': '3分',
                    '5': '5分'
                }
            },
            'play_type': {
                'text': '玩法 :',
                'value': ['经典 ']
            },
            'max_matches': {
                'text': '局数 :',
                'value': {
                    '5': '5局房卡X1',
                    '10': '10局房卡X2',
                    '20': '20局房卡X4'
                }
            },
        },
        '4': {
            'zhuang_type': {
                'text': '模式 :',
                'value': {
                    '1': '明牌抢庄',
                    '2': '通比牛.牛',
                    '3': '自由抢庄',
                    '4': '牛.牛上庄',
                    '5': '固定庄家'
                }
            },
            'end_points': {
                'text': '底分 :',
                'value': {
                    '1': '1分',
                    '2': '2分',
                    '3': '3分',
                    '4': '4分',
                    '5': '5分',
                    '10': '10分',
                    '20': '20分'
                }
            },
            'card_rule': {
                'text': '规则 :',
                'value': {
                    '1': '牛.牛×3 牛九×2 牛八×2',
                    '2': '牛.牛×4 牛九×3 牛八×2 牛七×2'
                }
            },
            'hand_patterns': {
                'text': '牌型 :',
                'value': ['五花牛（5倍） ', '炸弹牛（6倍） ', '五小牛（8倍） ']
            },
            'max_matches': {
                'text': '局数 :',
                'value': {
                    '12': '12局房卡X2',
                    '24': '24局房卡X4'
                }
            },
            'zhuang_value': {
                'text': '上庄 :',
                'value': {
                    '0': '无',
                    '100': '100',
                    '300': '300',
                    '500': '500'
                }
            }
        },
        '5': {
            'end_points': {
                'text': '小盲/大盲 :',
                'value': {
                    '1': '        1/2',
                    '2': '        2/4'
                }
            },
            'max_matches': {
                'text': '局数 :',
                'value': {
                    '10': '10局房卡X2',
                    '20': '20局房卡X4'
                }
            },
            'end_points_rule': {
                'text': '前注 :',
                'value': {
                    '0': '无',
                    '1': '1倍小盲',
                    '2': '2倍小盲'
                }
            },
            'init_points': {
                'text': '初始分数 :',
                'value': {
                    '500': '       500',
                    '1000': '       1000',
                    '1500': '       1500',
                    '2000': '       2000'
                }
            }
        },
        '6': {
            'zhuang_type': {
                'text': '模式 :',
                'value': {
                    '1': '抢庄模式',
                    '2': '通比模式',
                    '3': '三公当庄',
                }
            },
            'end_points': {
                'text': '底分 :',
                'value': {
                    '1': '1分',
                    '2': '2分',
                    '3': '3分',
                    '4': '4分',
                    '5': '5分',
                    '10': '10分',
                    '20': '20分'
                }
            },
            'card_rule': {
                'text': '规则 :',
                'value': {
                    '2': '暴玖×9'
                }
            },
            'max_matches': {
                'text': '局数 :',
                'value': {
                    '12': '12局房卡X2',
                    '24': '24局房卡X4'
                }
            },
        },
        '8': {
            'zhuang_type': {
                'text': '模式 :',
                'value': {
                    '1': '明牌抢庄',
                    '2': '通比牛.牛',
                    '3': '自由抢庄',
                    '4': '牛.牛上庄',
                    '5': '固定庄家'
                }
            },
            'end_points': {
                'text': '底分 :',
                'value': {
                    '1': '1分',
                    '2': '2分',
                    '3': '3分',
                    '4': '4分',
                    '5': '5分',
                    '10': '10分',
                    '20': '20分'
                }
            },
            'card_rule': {
                'text': '规则 :',
                'value': {
                    '1': '牛.牛×3 牛九×2 牛八×2',
                    '2': '牛.牛×4 牛九×3 牛八×2 牛七×2'
                }
            },
            'hand_patterns': {
                'text': '牌型 :',
                'value': ['五花牛（5倍） ', '炸弹牛（6倍） ', '五小牛（8倍） ']
            },
            'max_matches': {
                'text': '局数 :',
                'value': {
                    '10': '10局房卡X1',
                    '20': '20局房卡X2'
                }
            },
            'zhuang_value': {
                'text': '上庄 :',
                'value': {
                    '0': '无',
                    '100': '100',
                    '300': '300',
                    '500': '500'
                }
            }
        },
        '9': {
            'zhuang_type': {
                'text': '模式 :',
                'value': {
                    '1': '明牌抢庄',
                    '2': '通比牛.牛',
                    '3': '自由抢庄',
                    '4': '牛.牛上庄',
                    '5': '固定庄家'
                }
            },
            'end_points': {
                'text': '底分 :',
                'value': {
                    '1': '1分',
                    '2': '2分',
                    '3': '3分',
                    '4': '4分',
                    '5': '5分',
                    '10': '10分',
                    '20': '20分'
                }
            },
            'card_rule': {
                'text': '规则 :',
                'value': {
                    '1': '牛.牛×3 牛九×2 牛八×2',
                    '2': '牛.牛×4 牛九×3 牛八×2 牛七×2'
                }
            },
            'hand_patterns': {
                'text': '牌型 :',
                'value': ['五花牛（5倍） ', '炸弹牛（6倍） ', '五小牛（8倍） ']
            },
            'max_matches': {
                'text': '局数 :',
                'value': {
                    '12': '12局房卡X2',
                    '24': '24局房卡X4'
                }
            },
            'zhuang_value': {
                'text': '上庄 :',
                'value': {
                    '0': '无',
                    '100': '100',
                    '300': '300',
                    '500': '500'
                }
            }
        },
    };
    var config = ruleJson[game_id];
    var count = 1;
    for (var item in config) {
        if (data[item] && data[item] != '') {
            parent.font = "18px 微软雅黑";
            parent.textAlign = 'left';
            parent.fillStyle = "#dcdcdc";
            parent.fillText(config[item]['text'], startPointX, startPointY + count * spaceY);
            var valueArray = typeof config[item]['value'] === 'string';
            if (typeof config[item]['value'] === 'object' && !isNaN(config[item]['value'].length)) {
                var tempStr = '';
                var dataArray = data[item].split(',');
                for (var j = 0; j < dataArray.length; j++) {
                    var index = parseInt(dataArray[j] - 1);
                    tempStr += config[item]['value'][index];
                }
                parent.font = "18px 微软雅黑";
                parent.textAlign = 'left';
                parent.fillStyle = "#dcdcdc";
                parent.fillText(tempStr, startValuePointX, startPointY + count * spaceY);
            } else {
                parent.font = "18px 微软雅黑";
                parent.textAlign = 'left';
                parent.fillStyle = "#dcdcdc";
                parent.fillText(config[item]['value'][data[item]], startValuePointX, startPointY + count * spaceY);
            }
            count++;
        }
    }
}
function generalQrcodeData(d) {
    var data = {};
    if (d.count_matchs) {
        data['max_matches'] = d.count_matchs
    }
    if (d.type && d.type != undefined && d.type != null && d.type != '') {
        data['zhuang_type'] = d.type
    }
    if (d.number) {
        data.number = d.number
    }
    for (var i in d.room_rule) {
        if (d.game == '1' || d.game == '4' || d.game == '8' || d.game == '9') {
            if (d.type != '5' && i == 'zhuang_value') {
                continue
            }
        }
        data[i] = d.room_rule[i];
    }
    return data;
}
function qrcodeCreate(url, game_id, data) {
    var qr = qrcode(8, 'H');
    qr.addData(url);
    qr.make();
    var size = 300;
    var cellsize = parseInt(size / qr.getModuleCount());
    var margin = parseInt((size - qr.getModuleCount() * cellsize) / 2);
    var codeUrl = qr.createImgTag(cellsize, margin, 300);
    var gameName = '';
    var width = 507;
    var height = 826;
    var pics = [codeUrl];
    if (parseInt(game_id) === 1) {
        gameName = '牛.牛';
    } else if (parseInt(game_id) === 2) {
        gameName = '金花';
    } else if (parseInt(game_id) === 3) {
        gameName = '十三张';
    } else if (parseInt(game_id) === 4) {
        gameName = '十人牛.牛';
    } else if (parseInt(game_id) === 5) {
        gameName = '德州';
    } else if (parseInt(game_id) === 6) {
        gameName = '三公';
    } else if (parseInt(game_id) === 8) {
        gameName = '六人牛.牛';
    } else if (parseInt(game_id) === 9) {
        gameName = '九人牛.牛';
    } else if (parseInt(game_id) === 11) {
        gameName = '十三人牛.牛';
    } else if (parseInt(game_id) === 14) {
        gameName = '二八杠';
    } else if (parseInt(game_id) === 15) {
        gameName = '鱼虾蟹';
    }
    pics.push(getShareIconLink(game_id));
    var index = 0;
    var imgs = [];
    for (var i = 0; i < pics.length; i++) {
        if (pics[i].indexOf('data:image/gif') != -1 || pics[i].indexOf('data:image/jpg') != -1 || pics[i].indexOf('data:image/jpeg') != -1 || pics[i].indexOf('data:image/png') != -1) {
            var img = document.createElement("img");
            img.src = pics[i];
            imgs[i] = img;
            img.onload = function(e) {
                index++;
                if (index >= pics.length) {
                    canvasStart();
                }
            }
        } else {
            if (XMLHttpRequest) var xhr = new XMLHttpRequest();
            else var xhr = new ActiveXObject('Microsoft.XMLHTTP');
            xhr._index = i;
            xhr.open("get", pics[i], true);
            xhr.responseType = "blob";
            xhr.onload = function() {
                var img = document.createElement("img");
                if (this.status == 200) {
                    img.src = window.URL.createObjectURL(this.response);
                } else {
                    this.src = 'https://cdn-1255620552.file.myqcloud.com/images/default_head.png';
                }
                imgs[this._index] = img;
                img.onload = function(e) {
                    index++;
                    if (index >= pics.length) {
                        canvasStart();
                    }
                }
            };
            xhr.onerror = function() {
                var img = document.createElement("img");
                img.src = 'https://cdn-1255620552.file.myqcloud.com/images/default_head.png';
                imgs[this._index] = img;
                img.onload = function(e) {
                    index++;
                    if (index >= pics.length) canvasStart();
                };
            };
            xhr.send();
        }
    }
    var canvas = document.createElement('canvas');
    var scaleY = getRuleScaleY(data);
    canvas.width = width;
    canvas.height = height + scaleY;
    var context = canvas.getContext("2d");
    function canvasStart() {
        context.fillStyle = "#333333";
        context.fillRect(0, 0, width, height + scaleY);
        context.strokeStyle = "#525252";
        context.beginPath();
        context.lineCap = "butt";
        context.lineWidth = 1;
        context.moveTo(9, 133);
        context.lineTo(489, 133);
        context.stroke();
        context.drawImage(imgs[1], 33, 28, 86, 86);
        generalRule(game_id, data, context);
        context.font = "24px 微软雅黑";
        context.textAlign = 'left';
        context.fillStyle = "#ffffff";
        context.fillText(gameName, 130, 48);
        context.font = "18px 微软雅黑";
        context.textAlign = 'left';
        context.fillStyle = "#dcdcdc";
        context.fillText('房间号:' + data.number, 130, 100);
        context.strokeRect(10, 310 + scaleY, 487, 506);
        context.fillStyle = "#f7f7f7";
        context.fillRect(48, 332 + scaleY, 413, 413);
        context.drawImage(imgs[0], 76, 359 + scaleY, 359, 359);
        context.font = "18px 微软雅黑";
        context.textAlign = 'left';
        context.fillStyle = "#999999";
        context.fillText("长按二维码扫描进入房间", 155, 788 + scaleY);
        var img = new Image();
        var imgData = canvas.toDataURL("image/png");
        img.src = imgData;
        img.onload = function() {
            var qrCode = '<div class="qr-code"><div class="container"><img src="' + img.src + '"><div class="close-qr-code"></div></div></div>';
            document.body.insertAdjacentHTML("beforeend", qrCode);
            $('.qr-code .container .close-qr-code').click(function() {
                $('.qr-code').remove();
            })
        }
    }
}
function canvasQRCodeCreate(data, codeUrl) {
    var game_id = data;
    var gameName = '';
    var width = 507;
    var height = 826;
    var pics = [];
    if (parseInt(game_id) === 1) {
        pics.push("https://cdn-1255620552.file.myqcloud.com/images/game-niuniu.jpg");
        gameName = '牛.牛';
    } else if (parseInt(game_id) === 2) {
        pics.push("https://cdn-1255620552.file.myqcloud.com/images/game-jinhua.jpg");
        gameName = '金花';
    } else if (parseInt(game_id) === 3) {
        pics.push('https://cdn-1255620552.file.myqcloud.com/images/thirteencards/game_logo.png');
        gameName = '十三张';
    } else if (parseInt(game_id) === 4) {
        pics.push('https://cdn-1255620552.file.myqcloud.com/images/niuniuten/share-niuniuten.jpg');
        gameName = '十人牛.牛';
    } else if (parseInt(game_id) === 5) {
        pics.push('https://cdn-1255620552.file.myqcloud.com/images/texasholdem/game-texasholdem.jpg');
        gameName = '德州';
    } else if (parseInt(game_id) === 6) {
        pics.push('https://cdn-1255620552.file.myqcloud.com/images/sangong/share-sangong.jpg');
        gameName = '三公';
    } else if (parseInt(game_id) === 8) {
        pics.push('https://cdn-1255620552.file.myqcloud.com/images/liuliuxianyue/bull6-share.jpg');
        gameName = '六人牛.牛';
    } else if (parseInt(game_id) === 8) {
        pics.push('https://cdn-1255620552.file.myqcloud.com/images/liuliuxianyue/bull9-share.jpg');
        gameName = '九人牛.牛';
    }
    var index = 0;
    var imgs = [];
    for (var i = 0; i < pics.length; i++) {
        var img = new Image();
        img.src = pics[i];
        imgs.push(img);
        img.onload = function() {
            index++;
            if (index >= pics.length) {
                canvasStart();
            }
        }
    }
    var canvas = $('<canvas id="canvas" width="' + width + '" height="' + height + '" style="z-index:999;left: 0;top: 0;"></canvas>').appendTo('body');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.get(0).getContext("2d");
    function canvasStart() {
        context.fillStyle = "#333333";
        context.fillRect(0, 0, width, height);
        context.strokeStyle = "#525252";
        context.beginPath();
        context.lineCap = "butt";
        context.lineWidth = 1;
        context.moveTo(9, 133);
        context.lineTo(489, 133);
        context.stroke();
        context.drawImage(imgs[0], 33, 28, 86, 86);
        context.font = "24px 微软雅黑";
        context.textAlign = 'left';
        context.fillStyle = "#ffffff";
        context.fillText(gameName, 130, 48);
        context.font = "18px 微软雅黑";
        context.textAlign = 'left';
        context.fillStyle = "#dcdcdc";
        context.fillText('房间号:1234567', 130, 100);
        context.strokeRect(10, 310, 487, 506);
    }
}
function getShareIconLink(game_id) {
    var shareLinkJson = {
        '10001': 'niuniu',
        '10022': 'jinhua',
        '10033': 'shisanshui',
        '15': 'niuniuten',
        '10054': 'texasholdem',
        '10065': 'sangong',
        '1007': 'tiandakeng',
        '1008': 'bull6',
        '1009': 'bull9',
        '1000': 'bull12',
        '30': 'bull13',
        '1002': 'sangongsix',
        '1003': 'sangongnine',
        '31': 'pushBobbin',
        '1005': 'fishPrawnCrab',
        '1006': 'bidaxiao'
    };
    var gameVersionJson = {
        'bailexiuxian': '2',
        'chaowenzhongyu': '2',
        'dahonghuaqipai': '2',
        'dashengzhongyu': '2',
        'fuchenghuyu': '1',
        'haichaoyouxi': '2',
        'hongtaohuyu': '1',
        'jingongmenhuyu': '2',
        'laopengyouqipai': '1',
        'lekuyoule': '2',
        'leyueguibinting': '2',
        'lianyundating': '3',
        'liuliulexiang': '3',
        'liuliuxianyue': '3',
        'shouquandating': '2',
        'wuyibahuyu': '1',
        'xianshihuyu': '1',
        'yingduoduo': '1',
        'huangguanhuyu': '2',
        'test': '2',
        'ceshi': '2',
        'xinjia': '4',
        'sansanzhongyu': '2',
        'yinghuazhongyu': '2',
        'shenhuazhongting': '2',
        'jinniuleyuan': '2',
    };
    if (gameVersionJson[win.sign] == undefined || shareLinkJson[game_id] == undefined) {
        return 'https://cdn-1255620552.file.myqcloud.com/images/shareIcon/undefined-share-image.jpg';
    } else {
        return 'https://cdn-1255620552.file.myqcloud.com/images/shareIcon/' + 'v' + gameVersionJson[win.sign] + '/' + 'share-' + shareLinkJson[game_id] + '.jpg';
    }
}
var notice = {
    data: '',
    play: function(data) {
        if (data.length > 0) {
            var gonggao = document.getElementById("gongao");
            if (!gonggao) {
                var aa = '<div id="gongao" class="all-gonggao">';
                aa += '<div class="gonggao-icon"></div>';
                aa += '<div class="scroll_div" style="" id="scroll_div">';
                aa += '<div id="scroll_begin" class="scroll_begin" style="">➤ ' + data.join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;➤ ') + '</div>';
                aa += '<div id="scroll_end" class="scroll_end" style=""></div>';
                aa += '</div>';
                aa += '</div>';
                document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", aa);
                var speed = 20;
                var scroll_begin = document.getElementById("scroll_begin");
                var scroll_div = document.getElementById("scroll_div");
                var left_begin = scroll_div.offsetWidth;
                scroll_begin.style.left = left_begin + 'px';
                function Marquee() {
                    if (left_begin <= -scroll_begin.offsetWidth) {
                        var gonggao = document.getElementById("gongao");
                        if (gonggao) {
                            gonggao.parentNode.removeChild(gonggao);
                        }
                        clearInterval(MyMar);
                        return;
                    }
                    left_begin--;
                    scroll_begin.style.left = left_begin + 'px';
                }
                var MyMar = setInterval(Marquee, speed);
            }
        }
    },
    start: function() {
        var that = this;
        var datas = [];
        try {
            datas = JSON.parse(Base64.decode(this.data));
        } catch(e) {
            return;
        }
        setInterval(function() {
                var data = [];
                var time = Math.round(new Date().getTime() / 1000).toString();
                for (var i in datas) {
                    if ((datas[i].play_time <= time && datas[i].end_time >= time) || (datas[i].play_time <= time && datas[i].end_time == 0)) {
                        data.push(datas[i].contents);
                    }
                }
                that.play(data);
            },
            10000);
    }
};
function setupWebViewJavascriptBridge(callback) {
    if (win.app == 1) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady',
                function() {
                    callback(WebViewJavascriptBridge);
                },
                false);
        }
    } else {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() {
                document.documentElement.removeChild(WVJBIframe)
            },
            0);
    }
}
function app_command(act, data, fun) {
    setupWebViewJavascriptBridge(function(bridge) {
        if (typeof(data) == 'function') {
            if (win.app == 1) {
                bridge.init();
            }
            bridge.registerHandler(act,
                function(_data, responseCallback) {
                    if (win.app == 1) console.log(_data);
                    var rs = data(_data);
                    if (typeof(rs) != 'undefined') responseCallback(rs);
                });
        } else {
            data = data || {};
            bridge.callHandler(act, data,
                function(response) {
                    if (typeof(fun) == 'function') fun(response);
                });
        }
    });
}
var Page = {
    winScrollSock: true,
    load: function() {
        $('.top .return').touch(function() {
            location.href = '/portal/index/dasheng/skin/dasheng';
        });
        $('#loadings').fadeOut('fast',
            function() {
                $(this).remove();
            });
        $('.tab-item[data-item="1"]').on('click',
            function() {
                $(this).siblings().removeClass('on');
                $(this).addClass('on');
                $('.pk-list2').hide();
                $('.pk-list').show();
            });
        $('.tab-item[data-item="2"]').on('click',
            function() {
                $(this).siblings().removeClass('on');
                $(this).addClass('on');
                $('.pk-list').hide();
                $('.pk-list2').show();
                if (parseInt($('.pk-list2').children().length) === 0) {
                    Page.pkquery2(1);
                    $('.pk-list2').on('scroll',
                        function() {
                            if ($(this).scrollTop() + $(this).height() > $(this).get(0).scrollHeight - 10 && !Page.winScrollSock) {
                                Page.winScrollSock = true;
                                Page.pkquery2(Math.ceil($('.pk-item').length / 10 + 1));
                            }
                        });
                }
            });
        $('.pk-list').on('scroll',
            function() {
                if ($(this).scrollTop() + $(this).height() > $(this).get(0).scrollHeight - 10 && !Page.winScrollSock) {
                    Page.winScrollSock = true;
                    Page.pkquery(Math.ceil($('.pk-item').length / 10 + 1));
                }
            });
        Page.pkquery(1);
    },
    pkquery: function(p) {
        $.get('/portal/dasheng/gamerecord', {
                page: p
            },
            function(d) {
                if (parseInt(d.status) === 1) {
                    for (var i in d.info) {
                        var code = '';
                        var shareLink = getShareIconLink(d.info[i].type);
                        if (d.info[i].type == 1000) { // 六人牛牛
                            code += '<div class="pk-item bull6" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1005) { // 炸金花
                            code += '<div class="pk-item goldflower" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1003) {// 十三水
                            code += '<div class="pk-item thirteencard" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 15) {
                            code += '<div class="pk-item bull10" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1005) {// 德州扑克
                            code += '<div class="pk-item texaspoker" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1006) {// 三公
                            code += '<div class="pk-item sangong" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1007) {// 填大坑
                            code += '<div class="pk-item fillingpit" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1008) {// 六人牛牛
                            code += '<div class="pk-item niuniuSix" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1009) { // 九人牛牛
                            code += '<div class="pk-item niuniuNine" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1000) {//
                            code += '<div class="pk-item twelveoxenV2" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 30) {// 十三人牛牛
                            code += '<div class="pk-item niuniuThirteen" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1002) {//
                            code += '<div class="pk-item threeOpens6" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1003) {//
                            code += '<div class="pk-item threeOpens9" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 31) {// 二八杠
                            code += '<div class="pk-item pushBobbin" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1005) { // 鱼虾蟹
                            code += '<div class="pk-item fishPrawnCrab" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1006) {//
                            code += '<div class="pk-item biDaXiao" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else {
                            code += '<div class="pk-item ">';
                        }
                        code += '    <div class="game-path">';
                        code += '    <div class="game-img"><img src="' + shareLink + '" ></div>';
                        code += '    </div>';
                        code += '    <div class="room-number">房间号：' + d.info[i].room + '</div>';
                        code += '<div class="time">' + d.info[i].datetime + '</div>';
                        if (parseInt(d.info[i].jifen) >= 0) {
                            code += '<div class="score">' + parseInt(d.info[i].jifen) + '</div>';
                        } else {
                            code += '<div class="score lost">' + parseInt(d.info[i].jifen) + '</div>';
                        }
                        code += '    </div>';
                        $('.pk-list').append(code);
                    }
                } else {
                    $('.pk-list').off('scroll');
                    if ($('.pk-item').length > 0) {
                        $('<div class="pk-list-bottom">').html('<span>对局已完全加载</span>').appendTo('.pk-list');
                    } else {
                        $('<div class="pk-list-bottom">').html('<span>还没有参加过游戏，请前往游戏大厅开始游戏</span>').appendTo('.pk-list');
                    }
                }
                Page.winScrollSock = false;
                $('.loader-mask').fadeOut('fast',
                    function() {
                        $('.loader-mask').remove();
                    });
            }, "json");
        var code = '<div class="loader-mask">';
        code += '       <div class="pkquery-load">';
        code += '           <div class="cube1"></div>';
        code += '           <div class="cube2"></div>';
        code += '       </div>';
        code += '    </div>';
        $(code).appendTo('.wrap').fadeIn(3000);
    },
    pkquery2: function(p) {
        $.get('/portal/dasheng/mygamerecord', {
                page: p
            },
            function(d) {
                if (parseInt(d.status) === 1) {
                    for (var i in d.info) {
                        var code = '';
                        var shareLink = getShareIconLink(d.info[i].type);
                        if (d.info[i].type == 1000) { // 六人牛牛
                            code += '<div class="pk-item bull6" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1005) { // 炸金花
                            code += '<div class="pk-item goldflower" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1003) {// 十三水
                            code += '<div class="pk-item thirteencard" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 15) {
                            code += '<div class="pk-item bull10" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1005) {// 德州扑克
                            code += '<div class="pk-item texaspoker" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1006) {// 三公
                            code += '<div class="pk-item sangong" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1007) {// 填大坑
                            code += '<div class="pk-item fillingpit" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1008) {// 六人牛牛
                            code += '<div class="pk-item niuniuSix" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1009) { // 九人牛牛
                            code += '<div class="pk-item niuniuNine" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1000) {//
                            code += '<div class="pk-item twelveoxenV2" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 30) {// 十三人牛牛
                            code += '<div class="pk-item niuniuThirteen" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1002) {//
                            code += '<div class="pk-item threeOpens6" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1003) {//
                            code += '<div class="pk-item threeOpens9" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 31) {// 二八杠
                            code += '<div class="pk-item pushBobbin" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1005) { // 鱼虾蟹
                            code += '<div class="pk-item fishPrawnCrab" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else if (d.info[i].type == 1006) {//
                            code += '<div class="pk-item biDaXiao" onclick="location.href=\'/portal/dasheng/xiangqing?id=' + d.info[i].room + (win.app > 0 ? '&app=' + win.app: '') + '\'">';
                        } else {
                            code += '<div class="pk-item ">';
                        }
                        code += '    <div class="game-path">';
                        code += '    <div class="game-img"><img src="' + shareLink + '"></div>';
                        code += '    </div>';
                        code += '    <div class="room-number">房间号：' + d.info[i].room + '</div>';
                        code += '<div class="time">' + d.info[i].datetime + '</div>';
                        if (parseInt(d.info[i].jifen) >= 0) {
                            code += '<div class="score">' + parseInt(d.info[i].jifen) + '</div>';
                        } else {
                            code += '<div class="score lost">' + parseInt(d.info[i].jifen) + '</div>';
                        }
                        code += '    </div>';
                        $('.pk-list2').append(code);
                    }
                } else {
                    $('.pk-list2').off('scroll');
                    if ($('.pk-item').length > 0) {
                        $('<div class="pk-list-bottom">').html('<span>对局已完全加载</span>').appendTo('.pk-list2');
                    } else {
                        $('<div class="pk-list-bottom">').html('<span>还没有参加过游戏，请前往游戏大厅开始游戏</span>').appendTo('.pk-list2');
                    }
                }
                Page.winScrollSock = false;
                $('.loader-mask').fadeOut('fast',
                    function() {
                        $('.loader-mask').remove();
                    });
            }, "json");
        var code = '<div class="loader-mask">';
        code += '       <div class="pkquery-load">';
        code += '           <div class="cube1"></div>';
        code += '           <div class="cube2"></div>';
        code += '       </div>';
        code += '    </div>';
        $(code).appendTo('.wrap').fadeIn(3000);
    }
};