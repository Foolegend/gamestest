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
var ChatBase = (function() {
    function ChatBase() {}
    var prop = ChatBase.prototype;
    var chatStartY, chatMoveY, chatBoxY;
    prop.chatListItemText = {
        0 : '快点吧，我等到花儿也谢了',
        1 : '我出去叫人',
        2 : '你的牌好靓哇',
        3 : '我当年横扫澳门九条街',
        4 : '算你牛逼',
        5 : '别吹牛逼，有本事干到底',
        6 : '输得裤衩都没了',
        7 : '我给你们送温暖了',
        8 : '谢谢老板',
        9 : '我来啦，让你们久等了',
        10 : '我出去一下，马上回来，等我哦',
        11 : '怎么断线了，网络太差了',
        12 : '搏一搏，单车变摩托'
    };
    prop.chatItem = function(name, text) {
        $.container('chatListItem' + name, {
            x: 0,
            y: (name * 31.68) + 6.72,
            width: 215.52,
            height: 26.88,
            backgroundColor: '0x4458ae',
            borderRadius: 20 * .48
        });
        $.text('chatText_' + name, text, {
            x: 10.56,
            y: 0,
            width: 215.52,
            height: 26.88,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 27 * .48,
                color: '0xe8b24c',
                lineHeight: 26.88
            }
        });
        var _this = this;
        $('chatText_' + name).off('pointertap');
        $('chatListItem' + name).on('pointertap',
            function() {
                var name = this.toString();
                var index = name.split('chatListItem')[1];
                var chat = _this.chatListItemText[index];
                _this.destroyChatPanel();
                send("sendmsg",{"content":index});
                //ws.send(index, 'chat');
            },
            'chatListItem' + name);
        $('chatListItem' + name).on('touchstart',
            function(e) {
                chatStartY = e.data.global.y;
                chatBoxY = $('chatListUl').y;
            });
        $('chatListItem' + name).on('mousedown',
            function(e) {
                this.dragging = true;
                chatStartY = e.data.global.y;
                chatBoxY = $('chatListUl').y;
            });
        $('chatListItem' + name).on('mousemove',
            function(e) {
                if (!this.dragging) return false;
                chatMoveY = e.data.global.y;
                var distance = chatBoxY + chatMoveY - chatStartY;
                if (distance > 6.72) {
                    distance = 6.72;
                }
                if (distance < $('chatListUlBg').height() - $('chatListUl').height()) {
                    distance = $('chatListUlBg').height() - $('chatListUl').height();
                }
                $('chatListUl').position(6.72, distance);
            });
        $('chatListItem' + name).on('mouseup',
            function(e) {
                this.dragging = false;
            });
        $('chatListItem' + name).on('mouseupoutside',
            function(e) {
                this.dragging = false;
            });
        $('chatListItem' + name).addChild('chatText_' + name);
        return 'chatListItem' + name;
    };
    prop.generalChatPanel = function() {
        $.container('chatListContainer', {
            x: 0,
            y: 0,
            width: $.width,
            height: $.height
        });
        $('chatListContainer').addChild($.graphics('chatListMask', {
            x: 0,
            y: 0,
            width: $.width,
            height: $.height,
            backgroundColor: '0x000000,0'
        }));
        $('chatListContainer').addChild($.container('chatListBox', {
            x: $.width - 239.08 - 40 * .48,
            y: $.height - 398.40 - 40 * .48,
            width: 230.40 + 40 * .48,
            height: 338.88 + 40 * .48,
            backgroundColor: '0x232a44',
            borderRadius: 40 * .48,
            borderWidth: .96,
            borderColor: '0x806635',
            borderAlpha: 1
        }));
        $('chatListBox').addChild($.container('chatList', {
            x: 20 * .48,
            y: 20 * .48,
            width: 230.40,
            height: 338.88,
            backgroundColor: '0xf3e7c7,0',
            borderRadius: 40 * .48,
        }));
        $('chatList').get().interactive = true;
        $('chatList').addChild($.graphics('chatListUlBg', {
            x: 6.72,
            y: 6.72,
            width: 216.96,
            height: 323.52,
            backgroundColor: '0x9b9584,0',
            borderRadius: 40 * .48
        }));
        $('chatList').addChild($.container('chatListUl', {
            x: 6.72,
            y: 6.72
        }));
        $('chatList').addChild($.graphics('chatOverflow', {
            x: 6.72,
            y: 6.72,
            width: 216.96,
            height: 323.52,
            backgroundColor: '0xa7aeb2',
            borderRadius: 9.6
        }));
        $('chatListUl').get().mask = $('chatOverflow').get();
        var chatItemArr = Object.keys(this.chatListItemText);
        for (var i = 0; i < chatItemArr.length; i++) {
            $('chatListUl').addChild(this.chatItem(i, this.chatListItemText[i]));
        }
        $('chatListUlBg').on('touchstart',
            function(e) {
                chatStartY = e.data.global.y;
                chatBoxY = $('chatListUl').y;
            });
        $('chatListUlBg').on('touchmove',
            function(e) {
                chatMoveY = e.data.global.y;
                var distance = chatBoxY + chatMoveY - chatStartY;
                if (distance > 6.72) {
                    distance = 6.72;
                }
                if (distance < $('chatListUlBg').height() - $('chatListUl').height()) {
                    distance = $('chatListUlBg').height() - $('chatListUl').height();
                }
                $('chatListUl').position(6.72, distance);
            });
        $('chatListUlBg').on('mousedown',
            function(e) {
                this.dragging = true;
                chatStartY = e.data.global.y;
                chatBoxY = $('chatListUl').y;
            });
        $('chatListUlBg').on('mousemove',
            function(e) {
                if (!this.dragging) return false;
                chatMoveY = e.data.global.y;
                var distance = chatBoxY + chatMoveY - chatStartY;
                if (distance > 6.72) {
                    distance = 6.72;
                }
                if (distance < $('chatListUlBg').height() - $('chatListUl').height()) {
                    distance = $('chatListUlBg').height() - $('chatListUl').height();
                }
                $('chatListUl').position(6.72, distance);
            });
        $('chatListUlBg').on('mouseup',
            function(e) {
                this.dragging = false;
            });
        $('chatListUlBg').on('mouseupoutside',
            function(e) {
                this.dragging = false;
            });
        return this;
    };
    prop.destroyChatPanel = function() {
        if ($('chatListContainer')) {
            $('chatListUl').off('touchstart',
                function(e) {});
            $('chatListUl').off('touchmove',
                function(e) {});
            $('chatListContainer').remove();
        }
    };
    prop.addChatPanelEventLisener = function() {
        var _this = this;
        $('chatListMask').on('pointerdown',
            function() {
                _this.destroyChatPanel();
            });
        return this;
    };
    return ChatBase;
})();

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
            img.setAttribute("crossOrigin", 'Anonymous');
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
            img.setAttribute("crossOrigin", 'Anonymous');
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
            img.setAttribute("crossOrigin", 'Anonymous');
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
            img.setAttribute("crossOrigin", 'Anonymous');
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
            img.setAttribute("crossOrigin", 'Anonymous');
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
            img.setAttribute("crossOrigin", 'Anonymous');
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
            img.setAttribute("crossOrigin", 'Anonymous');
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
            img.setAttribute("crossOrigin", 'Anonymous');
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
        location.href = '/portal/index/dasheng/skin/dasheng';
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
        location.href = '/portal/index/dasheng/skin/dasheng';
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
        location.href = '/portal/index/dasheng/skin/dasheng';
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
            img.setAttribute("crossOrigin", 'Anonymous');
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
                img.setAttribute("crossOrigin", 'Anonymous');
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
                img.setAttribute("crossOrigin", 'Anonymous');
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
        img.setAttribute("crossOrigin", 'Anonymous');
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
        img.setAttribute("crossOrigin", 'Anonymous');
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
        '1': 'niuniu',
        '2': 'jinhua',
        '3': 'shisanshui',
        '4': 'niuniuten',
        '5': 'texasholdem',
        '6': 'sangong',
        '7': 'tiandakeng',
        '8': 'bull6',
        '9': 'bull9',
        '10': 'bull12',
        '11': 'bull13',
        '12': 'sangongsix',
        '13': 'sangongnine',
        '14': 'pushBobbin',
        '15': 'fishPrawnCrab',
        '16': 'bidaxiao'
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
    };
    if (gameVersionJson[win.sign] == undefined || shareLinkJson[game_id] == undefined) {
        return 'https://cdn-1255620552.file.myqcloud.com/images/shareIcon/undefined-share-image.jpg';
    } else {
        return 'https://cdn-1255620552.file.myqcloud.com/images/shareIcon/' + 'v' + gameVersionJson[win.sign] + '/' + 'share-' + shareLinkJson[game_id] + '.jpg';
    }
}