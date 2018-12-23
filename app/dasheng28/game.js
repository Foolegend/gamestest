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
    load: function(fn) {
        this.reset();
        if (typeof(Page) == 'object' && typeof(Page.load) == 'function') Page.load(fn);
    },
    ready: function() {
        this.reset();
        if (typeof(Page) == 'object' && typeof(Page.ready) == 'function') Page.ready();
    },
    readyJoin: function(code, func) {
        var d = {"status":"1","info":{"code":"jFgGMuh1fc9hOYge","number":"852898","game":"14","type":"1","count_matchs":"12","room_rule":{"card_rule":"1","chip":["1","5","10","30"],"zhuang_value":"0","max_point":"30","chip_type":"1"}}};
        win.gameId = d.game;
        //d.info = 1;
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
                                            if (typeof(jQuery) != 'undefined');$(document.body).off('touchmove');
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
                                            if (typeof(jQuery) != 'undefined');$(document.body).off('touchmove');
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
                    joinUser += '<button class="return-index" onclick="location.href=\'/portal/index/dasheng/skin/dasheng\'">返回首页</button>';
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
                    joinUser += '<div class="return" onclick="location.href=\'/portal/index/dasheng/skin/dasheng\'">创建房间</div>';
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
(function(ws) {
    ws.link = null;
    var func = null,
        connect_num = 0,
        close_func = null,
        url = null;
    var status = 0;
    var codes = [];
    ws.callback = {};
    ws._datas = [];
    var noActs = ['timer', 'userTime', 'playerjoin', 'gameRunning', 'playerleave', 'ready', 'chat', 'roomGameOver'];
    ws.send = function(data, act, _data) {
        if (ws == null) {
            console.warn('Websocket没有连接，无法进行操作！');
        } else {
            if (ws.link == null) {
                /*
                setTimeout(function() {
                        ws.send(data, act);
                    },
                    200);*/
            } else {
                if (act) {
                    var d = {};
                    d['data'] = data || '';
                    d['act'] = act;
                    d = JSON.stringify(d);
                    ws.link.send(d);
                    if (_data && typeof(ws.callback[act]) == 'function') {
                        ws._datas.push(JSON.stringify({
                            act: act,
                            data: _data
                        }));
                        ws.callback[act](_data);
                    }
                } else {
                    ws.link.send(data);
                }
            }
        }
    };
    ws.connect = function(uri, fn) {
        var uri = uri || url;
        var fn = fn || func;
        if (uri == null) return;
        url = uri;
        if (fn) func = fn;
        if (ws.link != null) {
            ws.link.close();
        }
        ws.link = new WebSocket((IS_SSL ? 'wss': 'ws') + '://' + WS_DOMAIN + '/' + uri + '.html?token=' + win.token + '&code=' + location.href.split('code=')[1].split('&')[0]);
        ws.link.onopen = function(d) {
            console.info('Websocket 已连接!');
            document.getElementById('networkReconnect').style.display = 'none';
            connect_num = 0;
            status = 1;
            ws.heartbeat.start();
            if (win.status == 1) {
                ws.send('join');
            } else if (win.status == 0) {
                win.status = 2;
                ws.send('init');
                ws.send('connect_success');
            } else ws.send('connect_success');
            if (typeof(fn) == 'function') fn();
        };
        ws.link.onerror = function(evt) {
            console.log(evt);
        };
        ws.link.onmessage = function(d) {
            ws.heartbeat.reply();
            if (d.data == 'pong') return;
            if (d.data == 'ping') {
                this.send('pong');
                return;
            }
            if (d.data == 'join_success') {
                win.status = 2;
                ws.send('init');
                ws.send('connect_success');
                return;
            }
            if (d.data == 'getout') {
                win.reload();
                return;
            }
            if (d.data == 'close') {
                if (ws.link == this) {
                    document.getElementById('networkReconnect').innerText = '您已在其他设备登录！';
                    document.getElementById('networkReconnect').style.display = 'block';
                    ws.close();
                } else {
                    this.close();
                }
                return;
            }
            try {
                var dt = JSON.parse(d.data);
                var act = dt.act;
                var data = dt.data;
                var i = ws._datas.indexOf(JSON.stringify({
                    act: act,
                    data: data
                }));
                if (i > -1) {
                    ws._datas.splice(i, 1);
                    return;
                }
                if (act == 'notice') {
                    notice.play(data);
                    return;
                }
                if (typeof(ws.callback[act]) == 'function') ws.callback[act](data);
            } catch(ev) {
                console.warn(ev);
            }
        };
        ws.link.onclose = function() {
            console.info('Websocket 已断开!');
            if (ws.link != this) return;
            if (typeof(close_func) == 'function') close_func();
            if (ws.link === null) return;
            ws.link = null;
            if (status == 3) {
                ws.heartbeat.status = 0;
                return;
            }
            setTimeout(function() {
                    connect_num++;
                    console.warn('系统正在进行第 ' + connect_num + ' 次重连...');
                    ws.connect();
                },
                1500);
            status = 2;
            ws.heartbeat.status = 2;
        };
    };
    ws.close = function(func) {
        status = 3;
        ws.heartbeat.status = 0;
        ws.link.close();
        close_func = function() {
            close_func = null;
            ws.link = null;
            connect_num = 0;
            if (typeof(func) == 'function') setTimeout(func, 500);
        }
    };
    ws.heartbeat = {
        ltime: 0,
        status: 0,
        speed: 5,
        num: 0,
        failcount: 0,
        start: function() {
            this.num = 0;
            this.failcount = 0;
            this.ltime = (new Date()).getTime();
            document.getElementById('networkReconnect').style.display = 'none';
            if (this.status == 0) this.jump();
        },
        jump: function() {
            if (this.status == 0) this.status = 1;
            var that = this;
            setTimeout(function() {
                    that.num++;
                    if (that.num >= that.speed) {
                        if ((new Date()).getTime() - that.ltime >= 1500) {
                            that.failcount++;
                            if (that.failcount > 3) {
                                document.getElementById('networkReconnect').innerText = '您的网络已断开，我们正在尝试重连...';
                                document.getElementById('networkReconnect').style.display = 'block';
                                that.status = 2;
                                status = 2;
                                if (ws.link != null && status == 1) ws.link.close();
                            }
                            if (ws.link != null && status == 1) ws.link.send('ping');
                        }
                    }
                    if (that.status > 0) that.jump();
                },
                1000);
        },
        reply: function() {
            document.getElementById('networkReconnect').style.display = 'none';
            this.ltime = (new Date()).getTime();
            this.num = 0;
            this.failcount = 0;
        }
    };
    setInterval(function() {
            var time = (new Date()).getTime();
            var _codes = [];
            for (var i in codes) {
                if (time - codes[i].time < 5000) {
                    _codes.push(codes[i]);
                }
            }
            codes = _codes;
        },
        1000);
})(ws);
var win_bei = 2;
var win_width = win_bei * win.width;
var win_height = win_width / 750 * 1216;
const App = new PIXI.Application({
    width: win_width,
    height: win_height,
    backgroundColor: 0xffffff,
    antialias: true,
    forceCanvas: true
});
document.body.appendChild(App.view);
function px2rem(num) {
    return 360 / win_width * parseInt(num);
}
function rem2px(num, isHeight) {
    if (/^[0-9\.-]+$/.test(num)) return win_width / 360 * parseFloat(num);
    else if (/^[0-9\.-]+%$/.test(num)) {
        var width = isHeight ? win_height: win_width;
        if (isHeight && isHeight != 1) width = isHeight;
        return width * parseFloat(num.substring(0, num.length - 1)) / 100;
    }
    return false;
}
var $;
(function() {
    var containers = {},
        graphicses = {},
        sprites = {},
        texts = {},
        textures = {},
        fps = 0;
    (function() {
        var ticker = new PIXI.ticker.Ticker();
        var t = (new Date()).getTime();
        var ts = [];
        ticker.add(function() {
            var _t = (new Date()).getTime();
            ts.push(_t - t);
            t = _t;
            if (ts.length > 10) ts.shift();
            fps = 1000 / array_avg(ts);
        });
        ticker.start();
    })();
    $ = function(name, type) {
        var em = null;
        switch (type) {
            case "graphics":
                em = graphicses[name];
                break;
            case "container":
                em = containers[name];
                break;
            case "sprite":
                em = sprites[name];
            case "text":
                em = texts[name];
            default:
                if (typeof(graphicses[name]) != 'undefined') {
                    em = graphicses[name];
                    type = 'graphics';
                } else if (typeof(containers[name]) != 'undefined') {
                    em = containers[name];
                    type = 'container';
                } else if (typeof(sprites[name]) != 'undefined') {
                    em = sprites[name];
                    type = 'sprite';
                } else if (typeof(texts[name]) != 'undefined') {
                    em = texts[name];
                    type = 'text';
                } else {
                    return false;
                }
        }
        if (!em.transform) {
            switch (type) {
                case 'graphics':
                    delete graphicses[name];
                    break;
                case 'container':
                    delete containers[name];
                    break;
                case 'sprite':
                    delete sprites[name];
                    break;
                case 'text':
                    delete texts[name];
                    break;
            }
            return false;
        }
        return {
            x:
                px2rem(em.x),
            y: px2rem(em.y),
            get: function() {
                return em;
            },
            position: function(x, y) {
                em.x = rem2px(x);
                this.x = em.x;
                em.y = rem2px(y);
                this.y = em.y;
                return this;
            },
            width: function(w) {
                if (w == undefined) return px2rem(em.width);
                em.width = rem2px(w);
                return this;
            },
            height: function(h) {
                if (h == undefined) return px2rem(em.height);
                em.height = rem2px(h);
                return this;
            },
            alpha: function(num) {
                if (num == undefined) return em.alpha;
                em.alpha = num;
                return this;
            },
            show: function() {
                em.visible = true;
            },
            hide: function() {
                em.visible = false;
            },
            scale: function(x, y) {
                if (x) em.scale.x = x;
                if (y) em.scale.y = y;
                return this;
            },
            rotation: function(r) {
                if (r == undefined) return em.rotation;
                em.rotation = r;
                return this;
            },
            setpoint: function(x, y) {
                em.pivot.set(x, y);
                return this;
            },
            animation: function(opt, speed, func) {
                var ticker = new PIXI.ticker.Ticker();
                var speed = speed || 1500;
                var frame_sum = speed * fps / 1000;
                if (!opt) return false;
                var count = 0,
                    finish = 0;
                for (var i in opt) {
                    if (['width', 'height', 'x', 'y', 'alpha', 'scaleX', 'scaleY', 'pivotX', 'pivotY', 'rotation'].indexOf(i) > -1) {
                        if (typeof(opt[i]) == 'number') {
                            if (['width', 'height', 'x', 'y', 'pivotX', 'pivotY', 'rotation'].indexOf(i) > -1) opt[i] = rem2px(opt[i]);
                            count++;
                            var _em = em;
                            var n = i;
                            var arr = i.match(/([a-z]+?)([A-Z]+)/);
                            if (arr) {
                                _em = em[arr[1]];
                                n = arr[2].toLowerCase();
                            }
                            var avg = (opt[i] - _em[n]) / frame_sum;
                            ticker.add((function() {
                                var _n = n;
                                var c = 0;
                                var __em = _em;
                                var _i = i;
                                var _avg = avg;
                                var moving = true;
                                return function() {
                                    if (!moving) return;
                                    c++;
                                    __em[_n] += _avg;
                                    if (c >= frame_sum) {
                                        __em[_n] = opt[_i];
                                        finish++;
                                        moving = false;
                                    }
                                };
                            })());
                            continue;
                        }
                    }
                    console.error('动画参数设置有误！');
                    return;
                }
                ticker.add(function() {
                    if (finish >= count) {
                        if (typeof(func) == 'function') func();
                        ticker.destroy();
                    }
                });
                ticker.start();
            },
            on: function(evt, func, _this) {
                em.interactive = true;
                em.on(evt, func, _this);
            },
            off: function(evt, func) {
                em.interactive = false;
                em.off(evt, func);
            },
            addChild: function(name) {
                if (typeof(name) == 'string' && $(name)) {
                    em.addChild($(name).get());
                } else if (typeof(name) == 'object') {
                    em.addChild(name);
                }
                return this;
            },
            setChildIndex: function(name, zIndex) {
                if (typeof(name) == 'string' && $(name)) {
                    em.parent.setChildIndex($(name).get(), zIndex);
                } else if (typeof(name) == 'object') {
                    em.parent.setChildIndex(name, zIndex);
                }
                return this;
            },
            addChildBefore: function(name) {
                if (typeof(name) == 'string' && $(name)) {
                    em.addChildAt($(name).get(), 0);
                } else if (typeof(name) == 'object') {
                    em.addChildAt(name, 0);
                }
                return this;
            },
            addChildAt: function(name, index) {
                if (typeof(name) == 'string' && $(name)) {
                    em.addChildAt($(name).get(), index);
                } else if (typeof(name) == 'object') {
                    em.addChildAt(name, index);
                }
                return this;
            },
            removeChild: function(name) {
                if (typeof(name) == 'string' && $(name)) {
                    em.removeChild($(name).get());
                    delete $(name);
                } else {
                    console.warn('传入参数应为字符串，删除对象失败！');
                }
                return this;
            },
            addChildToLast: function(name) {
                if (typeof(name) == 'string' && $(name)) {
                    $(name).get().zIndex = 10;
                    em.addChild($(name).get());
                } else if (typeof(name) == 'object') {
                    name.zIndex = 10;
                    em.addChild(name);
                }
                return this;
            },
            addChildTo: function(name) {
                if (typeof(name) == 'string' && $(name)) {
                    $(name).get().addChild(em);
                } else if (typeof(name) == 'object') {
                    name.addChild(em);
                }
                return this;
            },
            remove: function(deleteChildren) {
                var deleteChildren = deleteChildren || false;
                this.get().destroy(deleteChildren, true, true);
                switch (type) {
                    case 'graphics':
                        delete graphicses[name];
                        break;
                    case 'container':
                        delete containers[name];
                        break;
                    case 'sprite':
                        delete sprites[name];
                        break;
                    case 'text':
                        delete texts[name];
                        break;
                }
                delete this;
            }
        }
    };
    $.width = px2rem(win_width);
    $.height = px2rem(win_height);
    $.container = function(name, opt, spritesheet_url) {
        if (!name) {
            console.warn('必须提供盒子名!');
        }
        var container = new PIXI.Container();
        var width, height, borderWidth = 0,
            borderColor = '0x000000',
            borderAlpha = 1;
        if (opt) {
            if (opt.width) width = rem2px(opt.width);
            else width = rem2px('100%');
            container._width = width;
            if (opt.height) height = rem2px(opt.height, 1);
            else height = rem2px('100%', 1);
            container._height = height;
            if (typeof(opt.x) != 'undefined') container.x = rem2px(opt.x);
            if (typeof(opt.y) != 'undefined') container.y = rem2px(opt.y, 1);
            if (typeof(opt.alpha) != 'undefined') container.alpha = opt.alpha;
            if (typeof(opt.borderWidth) != 'undefined') borderWidth = rem2px(opt.borderWidth);
            if (typeof(opt.borderColor) == 'string' && borderWidth > 0) {
                var borderArr = opt.borderColor.split(',');
                if (/^0x\w{6}(,[.\d]+){0,1}$/.test(borderArr[0])) {
                    borderColor = borderArr[0];
                    borderAlpha = borderArr[1];
                }
            }
            if (typeof(opt.background) == 'string') {
                var array = opt.background.split(' / ');
                var arr = array[0].split(' ');
                if (arr.length == 0) {
                    console.warn('背景图片地址没有设置！');
                    return false;
                }
                var url = '',
                    repeat = 'no-repeat',
                    x = 0,
                    y = 0,
                    borderWidth = 0,
                    borderType = 'solid',
                    borderColor = '0x000000';
                for (var i in arr) {
                    var rs = [];
                    if ((rs = arr[i].match(/url\([\'\"]{0,1}(.+?)[\'\"]{0,1}\)/i)) !== null) {
                        url = rs[1];
                    } else if (['no-repeat', 'repeat', 'repeat-x', 'repeat-y'].indexOf(arr[i]) > -1) {
                        repeat = arr[i];
                    } else if (/^[\d%]+$/.test(arr[i])) {
                        if (!x) x = arr[i];
                        else y = arr[i];
                    }
                }
                if (!url || url == '') {
                    console.warn('背景图片地址没有设置！');
                    return false;
                }
                var width = 'auto',
                    height = 'auto';
                if (typeof(array[1]) != 'undefined') {
                    var arr = array[1].split(' ');
                    width = arr[0];
                    if (typeof(arr[1]) != 'undefined') height = arr[1];
                }
                if (spritesheet_url && spritesheet_url != '') {
                    var sprite = new PIXI.Sprite(resourceController.getInstance().getSpriteSheetObject(spritesheet_url, url));
                } else {
                    for (var i in textures) {
                        if (i == url || textures[i].url == url) {
                            var sprite = new PIXI.Sprite(textures[i].em);
                        }
                    }
                }
                if (!sprite) {
                    var sprite = PIXI.Sprite.fromImage(url.replace(/^(http|https)\:\/\/wx\.qlogo\.cn\//, 'http://113.96.232.104/'));
                }
                if (width != 'auto') sprite.width = rem2px(width, container._width);
                if (height != 'auto') sprite.height = rem2px(height, container._height);
                sprite.x = x;
                sprite.y = y;
                sprites[name + '-sprite'] = sprite;
                container.addChild(sprite);
            }
            if (typeof(opt.backgroundColor) == 'string' && /^0x\w{6}(,[.\d]+){0,1}$/.test(opt.backgroundColor)) {
                var graphics = new PIXI.Graphics();
                var arr = opt.backgroundColor.split(',');
                graphics.lineStyle(borderWidth, borderColor, borderAlpha);
                if (arr.length == 2) graphics.beginFill(arr[0], arr[1]);
                else graphics.beginFill(arr[0]);
                if (typeof(opt.borderRadius) == 'number') {
                    graphics.drawRoundedRect(0, 0, container._width, container._height, opt.borderRadius);
                } else if (opt.radius == 'circle') {
                    graphics.drawCircle(container._width / 2, container._width / 2, container._width / 2);
                } else {
                    graphics.drawRect(0, 0, container._width, container._height);
                }
                graphics.endFill();
                graphicses[name + '-graphics'] = graphics;
                container.addChild(graphics);
            }
            if (typeof(opt.radius) == 'number') {
                if (sprite && graphics) sprite.mask = graphics;
                else if (sprite) {
                    var graphics = new PIXI.Graphics();
                    graphics.lineStyle(borderWidth, borderColor, borderAlpha);
                    graphics.beginFill(0xFFFFFF);
                    graphics.drawRoundedRect(0, 0, container._width, container._height, opt.radius);
                    graphics.endFill();
                    container.addChild(graphics);
                    sprite.mask = graphics;
                }
            }
            if (typeof(opt.radius) == 'string' && opt.radius == 'circle') {
                if (sprite && graphics) sprite.mask = graphics;
                else if (sprite) {
                    var graphics = new PIXI.Graphics();
                    graphics.lineStyle(borderWidth, borderColor, borderAlpha);
                    graphics.beginFill(0xFFFFFF);
                    graphics.drawCircle(container._width / 2, container._width / 2, container._width / 2);
                    graphics.endFill();
                    container.addChild(graphics);
                    sprite.mask = graphics;
                }
            }
            if (typeof(opt.visible) == 'boolean') {
                if (opt.visible) {
                    container.visible = true;
                } else {
                    container.visible = false;
                }
            }
            if (typeof(opt.blur) == 'number' && opt.blur) {
                container.filters = [new PIXI.filters.BlurFilter(opt.blur)];
            }
        }
        containers[name] = container;
        App.stage.addChild(container);
        return container;
    };
    $.graphics = function(name, opt) {
        if (!name) {
            console.warn('必须提供盒子名!');
        }
        var graphics = new PIXI.Graphics();
        var width, height, borderColor, borderWidth, borderAlpha;
        if (opt) {
            if (opt.width) width = rem2px(opt.width);
            else width = rem2px('100%');
            if (opt.height) height = rem2px(opt.height, 1);
            else height = rem2px('100%', 1);
            if (opt.borderColor) borderColor = opt.borderColor;
            else borderColor = 0x000000;
            if (opt.borderWidth) borderWidth = rem2px(opt.borderWidth);
            else borderWidth = 0;
            if (opt.borderAlpha) borderAlpha = opt.borderAlpha;
            else borderAlpha = 1;
            if (typeof(opt.x) != 'undefined') graphics.x = rem2px(opt.x);
            if (typeof(opt.y) != 'undefined') graphics.y = rem2px(opt.y, 1);
            if (typeof(opt.alpha) != 'undefined') graphics.alpha = opt.alpha;
            if (typeof(opt.backgroundColor) == 'string' && /^0x\w{6}(,[.\d]+){0,1}$/.test(opt.backgroundColor)) {
                var arr = opt.backgroundColor.split(',');
                if (arr.length == 2) graphics.beginFill(arr[0], arr[1]);
                else graphics.beginFill(arr[0]);
                if (borderWidth > 0) {
                    graphics.lineStyle(borderWidth, borderColor, borderAlpha);
                }
                if (typeof(opt.borderRadius) == 'number') {
                    graphics.drawRoundedRect(0, 0, width, height, opt.borderRadius);
                } else if (typeof(opt.borderRadius) == 'string' && opt.borderRadius == 'circle' && width == height) {
                    graphics.drawCircle(width / 2, width / 2, width / 2);
                } else {
                    graphics.drawRect(0, 0, width, height);
                }
                graphics.endFill();
            }
            if (typeof(opt.blur) == 'number' && opt.blur) {
                graphics.filters = [new PIXI.filters.BlurFilter(opt.blur)];
            }
        }
        graphicses[name] = graphics;
        App.stage.addChild(graphics);
        return graphics;
    };
    $.text = function(name, txt, opt) {
        if (!name || txt === null) {
            console.warn('必须提供盒子名或文字内容!');
        }
        var width = rem2px('100%'),
            height = rem2px('100%', 1),
            x = 0,
            y = 0,
            alpha = 1;
        var _style = {
            fontSize: rem2px(12),
            fontFamily: '微软雅黑',
            fill: 0x000000,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0,
            fill: 0x000000,
            stroke: 0x000000,
            strokeThickness: 0,
            dropShadow: false,
            dropShadowColor: 0x000000,
            dropShadowBlur: 0,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 0,
            breakWords: false,
            wordWrap: false,
            align: 'left',
            lineHeight: rem2px(16)
        };
        if (opt) {
            if (opt.width) width = rem2px(opt.width);
            _style.wordWrapWidth = width;
            if (opt.height) height = rem2px(opt.height, 1);
            if (opt.x) x = rem2px(opt.x);
            if (opt.y) y = rem2px(opt.y, 1);
            if (typeof(opt.alpha) != 'undefined') alpha = opt.alpha;
            if (typeof(opt.style) == 'object') {
                if (opt.style.fontSize) _style.fontSize = rem2px(opt.style.fontSize);
                if (opt.style.fontFamily) _style.fontFamily = opt.style.fontFamily;
                if (opt.style.color) _style.fill = opt.style.color;
                if (opt.style.fontWeight) _style.fontWeight = opt.style.fontWeight;
                if (opt.style.fontStyle) _style.fontStyle = opt.style.fontStyle;
                if (opt.style.letterSpacing) _style.letterSpacing = rem2px(opt.style.letterSpacing);
                if (opt.style.lineHeight) _style.lineHeight = rem2px(opt.style.lineHeight);
                if (opt.style.boxShadow) {
                    var arr = opt.style.boxShadow.split(' ');
                    _style.dropShadow = true;
                    _style.dropShadowAngle = Math.PI / arr[0];
                    _style.dropShadowDistance = rem2px(arr[1]);
                    _style.dropShadowBlur = rem2px(arr[2]);
                    _style.dropShadowColor = arr[3];
                }
                if (opt.style.borderWidth) _style.strokeThickness = rem2px(opt.style.borderWidth);
                if (opt.style.borderColor) _style.stroke = opt.style.borderColor;
                if (opt.style.wrap) {
                    _style.breakWords = true;
                    _style.wordWrap = true;
                }
                if (opt.style.align) _style.align = opt.style.align;
            }
            var _text = new PIXI.Text(txt, new PIXI.TextStyle(_style));
            if (_text.height < _style.lineHeight * 2) {
                if (opt.style.align) {
                    if (_style.align == 'center') x += (width - _text.width) / 2;
                    else if (_style.align == 'right') x += width - _text.width;
                }
                if (opt.style.lineHeight) {
                    y += (_style.lineHeight - _style.fontSize) / 2;
                }
            }
            _text.x = x;
            _text.y = y;
            _text.alpha = alpha;
            texts[name] = _text;
            if (typeof(opt.style.blur) == 'number' && opt.style.blur) {
                _text.filters = [new PIXI.filters.BlurFilter(opt.style.blur)];
            }
            App.stage.addChild(_text);
            return _text;
        }
    };
    $.sprite = function(name, url, opt, spritesheet_url) {
        if (!name) {
            console.warn('必须提供盒子名!');
        }
        if (url) {
            if (spritesheet_url && spritesheet_url != '') {
                var sprite = new PIXI.Sprite(resourceController.getInstance().getSpriteSheetObject(spritesheet_url, url));
            } else {
                for (var i in textures) {
                    if (i == url || textures[i].url == url) {
                        var sprite = new PIXI.Sprite(textures[i].em);
                    }
                }
            }
            if (!sprite) {
                var sprite = PIXI.Sprite.fromImage(url);
            }
        } else {
            console.warn('创建精灵必须提供URL');
            return false;
        }
        var width, height;
        if (opt) {
            if (opt.width) width = rem2px(opt.width);
            else width = rem2px('100%');
            sprite.width = width;
            if (opt.height) height = rem2px(opt.height, 1);
            else height = rem2px('100%', 1);
            sprite.height = height;
            if (typeof(opt.x) != 'undefined') sprite.x = rem2px(opt.x);
            if (typeof(opt.y) != 'undefined') sprite.y = rem2px(opt.y, 1);
            if (typeof(opt.alpha) != 'undefined') sprite.alpha = opt.alpha;
            if (typeof(opt.blur) == 'number' && opt.blur) {
                sprite.filters = [new PIXI.filters.BlurFilter(opt.blur)];
            }
        }
        if (typeof(sprites[name]) !== 'undefined') {
            delete sprites[name];
        }
        sprites[name] = sprite;
        App.stage.addChild(sprite);
        return sprite;
    };
    $.texture = function(name, url) {
        if (typeof(name) == 'object') {
            for (var i in name) {
                $.texture(i, name[i]);
            }
        } else if (typeof(name) == 'string' && typeof(url) == 'string') {
            if (url.indexOf('http') !== 0) url = 'https://cdn-1255620552.file.myqcloud.com/' + url;
            else url = url.replace(/\/0/, '/64').replace(/^(http|https)\:\/\/wx\.qlogo\.cn\//, 'http://113.96.232.104/');
            textures[name] = {};
            textures[name].url = url;
            textures[name].em = PIXI.Texture.fromImage(url);
            return textures[name];
        } else {
            console.warn('材质创建失败！');
            return false;
        }
    };
    $.class = function(Sub, Super) {
        if (typeof(Super) == 'function' && typeof(Sub) == 'function') {
            var F = function() {};
            F.prototype = Super.prototype;
            var proto = new F();
            proto.constructor = Sub;
            Sub.prototype = proto;
        } else {
            console.warn('参数错误,继承失败！');
        }
    };
    $.userJoin = function(data) {
        $.container('joinRoomPage', {
            width: $.width,
            height: $.height,
            backgroundColor: '0x000000'
        });
        if (data.length > 5) {
            $('joinRoomPage').addChild($.container('joinRoomBox', {
                x: ($.width - 622 * .48) / 2,
                y: ($.height - 578 * .48) / 2,
                width: 622 * .48,
                height: 578 * .48,
                background: 'url(images/niuniu/user-text-bg4.png) 0 0 / 100% 100%',
            }));
            var a = parseInt(data.length / 2);
            var b = data.length - a;
            var x1 = (622 - 100 * a) / 2 * .48;
            var x2 = (622 - 100 * b) / 2 * .48;
            var y1 = 108 * .48;
            var y2 = 108 * .48 + 120 * .48;
            for (var i in data) {
                if (i < a) {
                    var box = peopleBox(data[i]);
                    $('joinRoomBox').addChild(box);
                    $(box).position(x1 + 100 * .48 * i, y1);
                } else {
                    var box = peopleBox(data[i]);
                    $('joinRoomBox').addChild(box);
                    $(box).position(x2 + 100 * .48 * (i - a), y2);
                }
            }
            $('joinRoomBox').addChild($.container('returnIndexBtn', {
                x: 44 * .48,
                y: 483 * .48,
                width: 258 * .48,
                height: 89 * .48,
                background: 'url(images/niuniu/return-index1.png) 0 0 / 100% 100%',
            }));
            $('joinRoomBox').addChild($.container('joinRoomBtn', {
                x: 320 * .48,
                y: 483 * .48,
                width: 258 * .48,
                height: 89 * .48,
                background: 'url(images/niuniu/join-game1.png) 0 0 / 100% 100%',
            }));
        } else {
            $('joinRoomPage').addChild($.container('joinRoomBox', {
                x: ($.width - 622 * .48) / 2,
                y: ($.height - 519 * .48) / 2,
                width: 622 * .48,
                height: 519 * .48,
                background: 'url(images/niuniu/user-text-bg3.png) 0 0 / 100% 100%',
            }));
            var x = (622 - 100 * data.length) / 2 * .48;
            var y = 124 * .48;
            for (var i in data) {
                var box = peopleBox(data[i]);
                $('joinRoomBox').addChild(box);
                $(box).position(x + 100 * .48 * i, y);
            }
            $('joinRoomBox').addChild($.container('returnIndexBtn', {
                x: 44 * .48,
                y: 423 * .48,
                width: 258 * .48,
                height: 89 * .48,
                background: 'url(images/niuniu/return-index1.png) 0 0 / 100% 100%',
            }));
            $('joinRoomBox').addChild($.container('joinRoomBtn', {
                x: 320 * .48,
                y: 423 * .48,
                width: 258 * .48,
                height: 89 * .48,
                background: 'url(images/niuniu/join-game1.png) 0 0 / 100% 100%',
            }));
        }
        $('returnIndexBtn').on('pointerdown',
            function() {
                location.href = '/portal/index/dasheng/skin/dasheng';
            });
        $('joinRoomBtn').on('pointerdown',
            function() {
                Page.join();
                if ($('joinRoomPage')) {
                    $('joinRoomPage').remove();
                }
            });
        function peopleBox(data) {
            $.container('peopleBox' + data.user_id, {});
            $('peopleBox' + data.user_id).addChild($.sprite('headImg' + data.user_id, data.path, {
                width: 92 * .48,
                height: 92 * .48,
                borderRadius: 15 * .48
            }));
            $('peopleBox' + data.user_id).addChild($.text('name' + data.user_id, data.nickname, {
                y: 95 * .48,
                width: 92 * .48,
                style: {
                    fontSize: 18 * .48,
                    color: '0x844830',
                    align: 'center',
                    lineHeight: 18 * .48,
                    wrap: true
                }
            }));
            $('peopleBox' + data.user_id).addChild($.graphics('name_mask' + data.user_id, {
                y: 95 * .48,
                width: 92 * .48,
                height: 18 * .48,
                borderRadius: 15 * .48,
                backgroundColor: '0x000000'
            }));
            $('name' + data.user_id).get().mask = $('name_mask' + data.user_id).get();
            return 'peopleBox' + data.user_id;
        }
    };
    $.alert = function(msg, callback, fn, style, sec) {
        var alertTimeOut;
        style = style || 'success';
        if (typeof(callback) == 'string') {
            fn = callback;
        }
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
        if (alertTimeOut != null) {
            $('alertBoxContainer').remove();
            window.clearTimeout(alertTimeOut);
            alertTimeOut = null;
        }
        setTimeout(function() {
                $.container('alertBoxContainer', {
                    x: 0,
                    y: 0,
                    width: $.width,
                    height: $.height
                });
                $('alertBoxContainer').addChild($.graphics('chatListMask', {
                    x: 0,
                    y: 0,
                    width: $.width,
                    height: $.height,
                    backgroundColor: '0x000000,.5'
                }));
                $('alertBoxContainer').get().interactive = true;
                $('alertBoxContainer').addChild($.container('alertBox', {
                    width: $.width / 1.7,
                    height: $.height / 4,
                    x: $.width / 2.4 * GAME_SCALE,
                    y: $.height * GAME_SCALE,
                    backgroundColor: '0xffffff',
                    borderRadius: 16,
                    alpha: 0
                }));
                var alertImg = sec == 9 ? 'images/alertBox_error.png': 'images/alertBox_success.png';
                $('alertBox').addChild($.sprite('tipsImg', alertImg, {
                    width: 80 * GAME_SCALE,
                    height: 80 * GAME_SCALE,
                    x: $('alertBox').width() / 1.15 * GAME_SCALE,
                    y: $('alertBox').height() / 2 * GAME_SCALE
                }));
                $('alertBox').addChild($.text('tipsText', msg, {
                    width: $('alertBox').width() - 10,
                    x: 5,
                    y: 200 * GAME_SCALE,
                    style: {
                        fontFamily: '微软雅黑',
                        fontSize: 15,
                        color: '0x808080',
                        align: 'center',
                        wordWrap: true,
                        breakWords: false,
                        wrap: true
                    }
                }));
                $('alertBox').animation({
                        y: $.height / 1.3 * GAME_SCALE,
                        alpha: 1
                    },
                    250)
            },
            500);
        alertTimeOut = setTimeout(function() {
                $('alertBox').animation({
                        y: $.height / 2.6 * GAME_SCALE,
                        alpha: 0
                    },
                    250,
                    function() {
                        $('alertBoxContainer').remove();
                        window.clearTimeout(alertTimeOut);
                        alertTimeOut = null;
                        if (callback && typeof(callback) == 'function') {
                            callback();
                        }
                    })
            },
            1500 + sec * 1000)
    };
    $.alert2 = function(msg, fn, style, sec) {
        var alertTimeOut;
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
        if (alertTimeOut != null) {
            if ($('alertBoxContainer')) {
                $('alertBoxContainer').remove();
            }
            window.clearTimeout(alertTimeOut);
            alertTimeOut = null;
        }
        if (sec >= 9) {
            setTimeout(function() {
                    if ($('alertBox')) {
                        $('alertBox').addChild($.container('alertBoxContainer', {
                            x: 0,
                            y: 0,
                            width: $.width,
                            height: $.height,
                            backgroundColor: '0x000000,.5'
                        }));
                    } else {
                        $.container('alertBoxContainer', {
                            x: 0,
                            y: 0,
                            width: $.width,
                            height: $.height,
                            backgroundColor: '0x000000,.5'
                        });
                    }
                    $('alertBoxContainer').get().interactive = true;
                    $.text('tipsText', msg, {
                        x: 5,
                        y: 200 * GAME_SCALE,
                        width: $.width / 1.7 - 10,
                        style: {
                            fontFamily: '微软雅黑',
                            fontSize: 15,
                            lineHeight: 18,
                            color: '0x808080',
                            align: 'center',
                            wordWrap: true,
                            breakWords: false,
                            wrap: true
                        }
                    });
                    $('alertBoxContainer').addChild($.container('alertLittleBox', {
                        x: ($.width - $.width / 1.7) / 2,
                        y: ($.height - px2rem($('tipsText').get().height) - 200 * GAME_SCALE - 60 * GAME_SCALE) / 1.5,
                        width: $.width / 1.7,
                        height: px2rem($('tipsText').get().height) + 200 * GAME_SCALE + 60 * GAME_SCALE + 40,
                        backgroundColor: '0xffffff',
                        borderRadius: 16,
                        alpha: 0
                    }));
                    $('alertLittleBox').addChild($.sprite('tipsImg', 'images/alertBox_error.png', {
                        x: ($.width / 1.7 - 80 * GAME_SCALE) / 2,
                        y: (200 - 80) / 2 * GAME_SCALE,
                        width: 80 * GAME_SCALE,
                        height: 80 * GAME_SCALE
                    }));
                    $('alertLittleBox').addChild($.container('tipsBtn', {
                        y: px2rem($('tipsText').get().height) + 200 * GAME_SCALE + 60 * GAME_SCALE,
                        width: $.width / 1.7,
                        height: 40
                    }));
                    var border = new PIXI.Graphics();
                    border.lineStyle(.48, 0xb39851);
                    border.moveTo(0, 0);
                    border.lineTo(win_width / 1.7, 0);
                    $('tipsBtn').addChild(border);
                    $('tipsBtn').addChild($.text('tipsBtnText', '我知道了', {
                        width: $.width / 1.7,
                        style: {
                            fontFamily: '微软雅黑',
                            fontSize: 15,
                            lineHeight: 40,
                            color: '0xb39851',
                            align: 'center'
                        }
                    }));
                    $('alertLittleBox').addChild('tipsText');
                    $('tipsBtn').on('pointertap',
                        function() {
                            $('alertLittleBox').animation({
                                    y: ($.height - $('alertLittleBox').height()) / 2.5,
                                    alpha: 0
                                },
                                250,
                                function() {
                                    $('alertBoxContainer').remove();
                                    window.clearTimeout(alertTimeOut);
                                    alertTimeOut = null;
                                    if (fn && typeof(fn) == 'function') {
                                        fn();
                                    }
                                })
                        });
                    $('alertLittleBox').animation({
                            y: ($.height - $('alertLittleBox').height()) / 2,
                            alpha: 1
                        },
                        250)
                },
                500);
        } else {
            setTimeout(function() {
                    if ($('alertBox')) {
                        $('alertBox').addChild($.container('alertBoxContainer', {
                            x: 0,
                            y: 0,
                            width: $.width,
                            height: $.height,
                            backgroundColor: '0x000000,.5'
                        }));
                    } else {
                        $.container('alertBoxContainer', {
                            x: 0,
                            y: 0,
                            width: $.width,
                            height: $.height,
                            backgroundColor: '0x000000,.5'
                        });
                    }
                    $('alertBoxContainer').get().interactive = true;
                    $.text('tipsText', msg, {
                        x: 5,
                        y: 200 * GAME_SCALE,
                        width: $.width / 1.7 - 10,
                        style: {
                            fontFamily: '微软雅黑',
                            fontSize: 15,
                            lineHeight: 18,
                            color: '0x808080',
                            align: 'center',
                            wordWrap: true,
                            breakWords: false,
                            wrap: true
                        }
                    });
                    $('alertBoxContainer').addChild($.container('alertLittleBox', {
                        x: ($.width - $.width / 1.7) / 2,
                        y: ($.height - px2rem($('tipsText').get().height) - 200 * GAME_SCALE - 60 * GAME_SCALE) / 1.5,
                        width: $.width / 1.7,
                        height: px2rem($('tipsText').get().height) + 200 * GAME_SCALE + 60 * GAME_SCALE,
                        backgroundColor: '0xffffff',
                        borderRadius: 16,
                        alpha: 0
                    }));
                    $('alertLittleBox').addChild($.sprite('tipsImg', 'images/alertBox_success.png', {
                        x: ($.width / 1.7 - 80 * GAME_SCALE) / 2,
                        y: (200 - 80) / 2 * GAME_SCALE,
                        width: 80 * GAME_SCALE,
                        height: 80 * GAME_SCALE
                    }));
                    $('alertLittleBox').addChild('tipsText');
                    $('alertLittleBox').animation({
                            y: ($.height - $('alertLittleBox').height()) / 2,
                            alpha: 1
                        },
                        250)
                },
                500);
            alertTimeOut = setTimeout(function() {
                    $('alertLittleBox').animation({
                            y: ($.height - $('alertLittleBox').height()) / 2.5,
                            alpha: 0
                        },
                        250,
                        function() {
                            if ($('alertBoxContainer')) {
                                $('alertBoxContainer').remove();
                            }
                            window.clearTimeout(alertTimeOut);
                            alertTimeOut = null;
                            if (fn && typeof(fn) == 'function') {
                                fn();
                            }
                        })
                },
                2000 + sec * 1000)
        }
    };
    $.dialog = function(msg, fn) {
        var alertTimeOut;
        if (typeof(fn) != 'function') return;
        if (alertTimeOut != null) {
            if ($('alertBoxContainer')) {
                $('alertBoxContainer').remove();
            }
            window.clearTimeout(alertTimeOut);
            alertTimeOut = null;
        }
        if ($('alertBoxContainer')) {
            $('alertBoxContainer').remove();
        }
        alertTimeOut = setTimeout(function() {
                if ($('alertBox')) {
                    $('alertBox').addChild($.container('alertBoxContainer', {
                        x: 0,
                        y: 0,
                        width: $.width,
                        height: $.height,
                        backgroundColor: '0x000000,.5'
                    }));
                } else {
                    $.container('alertBoxContainer', {
                        x: 0,
                        y: 0,
                        width: $.width,
                        height: $.height,
                        backgroundColor: '0x000000,.5'
                    });
                }
                $('alertBoxContainer').get().interactive = true;
                $.text('tipsText', msg, {
                    x: 5,
                    y: 200 * GAME_SCALE,
                    width: $.width / 1.7 - 10,
                    style: {
                        fontFamily: '微软雅黑',
                        fontSize: 15,
                        lineHeight: 18,
                        color: '0x808080',
                        align: 'center',
                        wordWrap: true,
                        breakWords: false,
                        wrap: true
                    }
                });
                $('alertBoxContainer').addChild($.container('alertLittleBox', {
                    x: ($.width - $.width / 1.7) / 2,
                    y: ($.height - px2rem($('tipsText').get().height) + 200 * GAME_SCALE + 60 * GAME_SCALE) / 1.5,
                    width: $.width / 1.7,
                    height: px2rem($('tipsText').get().height) + 200 * GAME_SCALE + 60 * GAME_SCALE + 40,
                    backgroundColor: '0xffffff',
                    borderRadius: 16,
                    alpha: 0
                }));
                $('alertLittleBox').addChild($.sprite('tipsImg', 'images/dialog_icon.png', {
                    x: ($.width / 1.7 - 80 * GAME_SCALE) / 2,
                    y: (200 - 80) / 2 * GAME_SCALE,
                    width: 80 * GAME_SCALE,
                    height: 80 * GAME_SCALE
                }));
                $('alertLittleBox').addChild($.container('tipsBtn', {
                    y: px2rem($('tipsText').get().height) + 200 * GAME_SCALE + 60 * GAME_SCALE,
                    width: $.width / 1.7,
                    height: 40
                }));
                var border = new PIXI.Graphics();
                border.lineStyle(.48, 0xb39851);
                border.moveTo(0, 0);
                border.lineTo(win_width / 1.7, 0);
                $('tipsBtn').addChild(border);
                var border2 = new PIXI.Graphics();
                border2.lineStyle(.48, 0xb39851);
                border2.moveTo(win_width / 1.7 / 2, 0);
                border2.lineTo(win_width / 1.7 / 2, 40 / $.width * win_width);
                $('tipsBtn').addChild(border2);
                $('tipsBtn').addChild($.container('tipsBtn1', {
                    width: $.width / 1.7 / 2,
                    height: 40,
                    backgroundColor: '0x000000,0'
                }));
                $('tipsBtn').addChild($.container('tipsBtn2', {
                    x: $.width / 1.7 / 2,
                    width: $.width / 1.7 / 2,
                    height: 40,
                    backgroundColor: '0x000000,0'
                }));
                $('tipsBtn1').addChild($.text('tipsBtn1Text', '否', {
                    width: $.width / 1.7 / 2,
                    style: {
                        fontFamily: '微软雅黑',
                        fontSize: 15,
                        lineHeight: 40,
                        color: '0xb39851',
                        align: 'center'
                    }
                }));
                $('tipsBtn2').addChild($.text('tipsBtn2Text', '是', {
                    width: $.width / 1.7 / 2,
                    style: {
                        fontFamily: '微软雅黑',
                        fontSize: 15,
                        lineHeight: 40,
                        color: '0xb39851',
                        align: 'center'
                    }
                }));
                $('alertLittleBox').addChild('tipsText');
                $('tipsBtn1').on('pointertap',
                    function() {
                        $('alertLittleBox').animation({
                                y: ($.height - $('alertLittleBox').height()) / 2.5,
                                alpha: 0
                            },
                            250,
                            function() {
                                if ($('alertBoxContainer')) {
                                    $('alertBoxContainer').remove();
                                }
                                window.clearTimeout(alertTimeOut);
                                alertTimeOut = null;
                            })
                    });
                $('tipsBtn2').on('pointertap',
                    function() {
                        window.clearTimeout(alertTimeOut);
                        alertTimeOut = null;
                        if (fn && typeof(fn) == 'function') {
                            fn();
                        }
                    });
                $('alertLittleBox').animation({
                        y: ($.height - $('alertLittleBox').height()) / 2,
                        alpha: 1
                    },
                    250)
            },
            500);
    };
    $.checkIosOrAndroid = function(parent) {
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            return 'iphone';
        } else if (/android/.test(ua)) {
            return 'android';
        }
    };
    $.agreement = function(parent) {
        if ($('agreementMask')) {
            $('agreementMask').remove();
        }
        if (typeof(parent) == 'object') {
            parent.addChild($.container('agreementMask', {
                width: $.width,
                height: $.height,
                backgroundColor: '0x000000,.8'
            }));
        } else if (typeof(parent) == 'string') {
            $(parent).addChild($.container('agreementMask', {
                width: $.width,
                height: $.height,
                backgroundColor: '0x000000,.8'
            }));
        } else {
            $.container('agreementMask', {
                width: $.width,
                height: $.height,
                backgroundColor: '0x000000,.8'
            });
        }
        $('agreementMask').get().interactive = true;
        $('agreementMask').addChild($.container('agreementBg', {
            x: ($.width - 662 * .48) / 2,
            y: ($.height - 700 * .48) / 2,
            width: 662 * .48,
            height: 700 * .48,
            background: 'url(https://cdn-1255620552.file.myqcloud.com/images/common/agreementV2.png) 0 0 / 100% 100%'
        }));
        $('agreementBg').addChild($.container('agreementBtn', {
            x: (662 * .48 - 274 * .48) / 2,
            y: 580 * .48,
            width: 274 * .48,
            height: 85 * .48,
            backgroundColor: '0xffffff,0'
        }));
        $('agreementBtn').on('pointertap',
            function() {
                if ($('agreementMask')) {
                    $('agreementMask').remove();
                }
            })
    };
    $.homePage = function(parent) {
        if ($('homePage')) {
            $('homePage').remove();
        }
        if (typeof(parent) == 'object') {
            parent.addChild($.container('homePage', {
                width: $.width,
                height: $.height,
                backgroundColor: '0x000000,.8'
            }));
        } else if (typeof(parent) == 'string') {
            $(parent).addChild($.container('homePage', {
                width: $.width,
                height: $.height,
                backgroundColor: '0x000000,.8'
            }));
        } else {
            $.container('homePage', {
                width: $.width,
                height: $.height,
                backgroundColor: '0x000000,.8'
            });
        }
        $('homePage').get().interactive = true;
        $('homePage').addChild($.graphics('homePageMaskTap', {
            width: $.width,
            height: $.height,
            backgroundColor: "0x000000,0"
        }));
        $('homePage').addChild($.container('backToHome', {
            x: ($.width - 662 * .48) / 2,
            y: ($.height - 459 * .48) / 2,
            width: 662 * .48,
            height: 459 * .48,
            background: 'url(https://cdn-1255620552.file.myqcloud.com/images/common/backToHomeV2.png) 0 0 / 100% 100%'
        }));
        $('backToHome').addChild($.text('backToHomeTxt', '确认返回主页？', {
            y: 48 * .48,
            width: 662 * .48,
            style: {
                fontSize: 48 * .48,
                color: '0xe8b24c',
                lineHeight: 252 * .48,
                align: 'center',
                wrap: true
            }
        }));
        $('backToHome').addChild($.container('backToHomeBtn1', {
            x: 104 * .48,
            y: 342 * .48,
            width: 214 * .48,
            height: 77 * .48,
            background: 'url(https://cdn-1255620552.file.myqcloud.com/images/decIndex/button1.png) 0 0 / 100% 100%'
        }));
        $('backToHome').addChild($.container('backToHomeBtn2', {
            x: 354 * .48,
            y: 342 * .48,
            width: 214 * .48,
            height: 77 * .48,
            background: 'url(https://cdn-1255620552.file.myqcloud.com/images/decIndex/button2.png) 0 0 / 100% 100%'
        }));
        $('backToHomeBtn1').on('pointertap',
            function() {
                location.href = '/portal/index/dasheng/skin/dasheng';
            });
        $('backToHomeBtn2').on('pointertap',
            function() {
                if ($('homePage')) {
                    $('homePage').remove();
                }
            });
    };
})();
var resourceController = function() {
    this.instance = null;
};
resourceController.prototype.loadResource = function(resoures, callback) {
    if (resoures && typeof(resoures) == 'object') {
        for (var key in resoures) {
            PIXI.loader.add(key, resoures[key]);
        }
        if (typeof(callback) == 'function') {
            PIXI.loader.load(callback);
        } else {
            console.log('loadResource第二参数必须为function.......')
        }
    } else {
        console.warn('loadResource参数一错误.......');
    }
}
resourceController.prototype.getSpriteSheetObject = function(json_name, texture_name) {
    var id;
    if (typeof(json_name) == 'string') {
        id = PIXI.loader.resources[json_name].textures;
    } else if (typeof(json_name) == 'object') {
        id = json_name;
    }
    return id[texture_name];
}
resourceController.getInstance = function() {
    if (!this.instance) {
        this.instance = new resourceController();
    }
    return this.instance;
};
var GAME_SCALE = 0.48;
var PlayerBase = (function() {
    function PlayerBase(data) {
        this.user_id = data.user_id;
        this.nick_name = data.nickname;
        this.path = data.path;
        this.position = data.position;
        if (!this.user_id || !this.nick_name) {
            console.warn('缺少有效数据，构建对象失败！');
            return;
        }
        this.end_point = data.value || 0;
        this.online = 1;
        this.is_join = 0;
        this.player_prefix = 'player' + this.user_id;
    }
    var prop = PlayerBase.prototype;
    prop.getUserId = function() {
        return this.user_id;
    }
    prop.getPlayerPrefix = function() {
        return this.player_prefix;
    }
    prop.getPos = function() {
        return this.pos;
    }
    prop.getBackGroundPosition = function() {
        return this.position;
    }
    prop.getOnline = function() {
        return this.online;
    }
    prop.setOnline = function(onlineState) {
        if (onlineState == 0) {
            this.online = 0;
            this.generalLeaveSprite();
        } else {
            this.online = 1;
            this.removeLeaveSPrite();
        }
        this.online = onlineState;
    }
    prop.generalLeaveSprite = function() {
        if ($(this.getPlayerPrefix() + 'LeaveMask')) {
            $(this.getPlayerPrefix() + 'LeaveMask').remove();
        }
        if ($(this.getPlayerPrefix() + 'LeaveSprite')) {
            $(this.getPlayerPrefix() + 'LeaveSprite').remove();
        }
        if ($(this.getPlayerPrefix())) {
            $(this.getPlayerPrefix()).addChild($.container(this.getPlayerPrefix() + 'LeaveMask', {
                x: 0,
                y: 0,
                backgroundColor: '0x000000,.5',
                width: 88 * GAME_SCALE,
                height: 88 * GAME_SCALE,
                borderRadius: 10,
            }));
            $(this.getPlayerPrefix()).addChild($.sprite(this.getPlayerPrefix() + 'LeaveSprite', 'userLeave', {
                x: 4,
                y: 8,
                width: 70 * GAME_SCALE,
                height: 44 * GAME_SCALE
            }))
        }
    }
    prop.removeLeaveSPrite = function() {
        if ($(this.getPlayerPrefix() + 'LeaveMask')) {
            $(this.getPlayerPrefix() + 'LeaveMask').remove();
        }
        if ($(this.getPlayerPrefix() + 'LeaveSprite')) {
            $(this.getPlayerPrefix() + 'LeaveSprite').remove();
        }
    }
    prop.getIsJoin = function() {
        return this.is_join;
    }
    prop.setIsJoin = function(isJoinState) {
        this.is_join = isJoinState;
    }
    prop.DestroySayPanel = function() {
        if ($(this.getPlayerPrefix() + 'SayContainer')) {
            $(this.getPlayerPrefix() + 'SayContainer').remove()
        }
    }
    prop.sayTimeOut = null;
    prop.playContainerStyle = 0;
    prop.say = function(value, parent) {
        var _this = this;
        if (this.sayTimeOut != null) {
            this.DestroySayPanel();
            window.clearTimeout(this.sayTimeOut);
            this.sayTimeOut = null;
        }
        var position = playersConfig.getInstance().getPositionByPos(this.getPos());
        var widthScale = 19.57142;
        var textLength = value.toString().split('').length;
        var moveX = (position.x + (widthScale * textLength) * GAME_SCALE) > $.width ? ((position.x - (widthScale * textLength) * GAME_SCALE) + 50) : position.x;
        var graphicsMoveX = (position.x + (widthScale * textLength) * GAME_SCALE) > $.width ? ((widthScale * textLength) * GAME_SCALE) : 0;
        var manCardBorder = new PIXI.Graphics();
        manCardBorder.lineStyle(0);
        manCardBorder.beginFill(0x000000, .85);
        manCardBorder.moveTo(39 + graphicsMoveX, 25 - 5);
        manCardBorder.lineTo((200 / 10 + 39 + graphicsMoveX), 25 - 5);
        manCardBorder.lineTo((100 / 10 + 39 + graphicsMoveX), (173 / 10 + 25 - 5));
        manCardBorder.moveTo(39 + graphicsMoveX, 25 - 5);
        manCardBorder.moveTo((100 / 10 + 39 + graphicsMoveX), (173 / 10 + 25 - 5));
        manCardBorder.endFill();
        if (parent) {
            if (typeof(parent) == 'object') {
                parent.addChild($.container(this.getPlayerPrefix() + 'SayContainer', {
                    x: (moveX),
                    y: (position.y - 20),
                    width: (widthScale * textLength) * GAME_SCALE,
                    height: 28 * GAME_SCALE,
                    borderRadius: 26 * GAME_SCALE,
                    backgroundColor: "0x000000,.85"
                }))
            } else if (typeof(parent) == 'string') {
                $(parent).addChild($.container(this.getPlayerPrefix() + 'SayContainer', {
                    x: (moveX),
                    y: (position.y - 20),
                    width: (widthScale * textLength) * GAME_SCALE,
                    height: 28 * GAME_SCALE,
                    borderRadius: 26 * GAME_SCALE,
                    backgroundColor: "0x000000,.85"
                }))
            }
        } else {
            $.container(this.getPlayerPrefix() + 'SayContainer', {
                x: (moveX),
                y: (position.y - 20),
                width: (widthScale * textLength) * GAME_SCALE,
                height: 28 * GAME_SCALE,
                borderRadius: 26 * GAME_SCALE,
                backgroundColor: "0x000000,.85"
            })
        }
        $(this.getPlayerPrefix() + 'SayContainer').addChild(manCardBorder);
        $(this.getPlayerPrefix() + 'SayContainer').addChild($.text(this.player_prefix + 'SayText', value, {
            y: 2,
            width: (widthScale * textLength) * GAME_SCALE,
            height: 28 * GAME_SCALE,
            style: {
                fontFamily: "微软雅黑",
                fontSize: 18 * GAME_SCALE,
                color: '0xffffff',
                align: 'center'
            }
        }));
        this.sayTimeOut = setTimeout(function() {
                if (_this.sayTimeOut) {
                    window.clearTimeout(_this.sayTimeOut);
                    _this.sayTimeOut = null;
                }
                _this.DestroySayPanel();
            },
            2000);
        Game.maxZindex();
    }
    prop.getPosition = function() {
        var returnJson = {}
        var x = $(this.getPlayerPrefix()).x;
        var y = $(this.getPlayerPrefix()).y;
        returnJson.x = x;
        returnJson.y = y;
        return returnJson;
    }
    prop.addStyle1PlayerToStage = function(playPos, parent) {
        this.playContainerStyle = 1;
        this.pos = playPos;
        var position = playersConfig.getInstance().getPositionByPos(playPos);
        if (parent) {
            if (typeof(parent) == 'object') {
                parent.addChild($.container(this.player_prefix, {
                    x: position.x,
                    y: position.y
                }))
            } else if (typeof(parent) == 'string') {
                $(parent).addChild($.container(this.player_prefix, {
                    x: position.x,
                    y: position.y
                }))
            }
        } else {
            $.container(this.player_prefix, {
                x: position.x,
                y: position.y
            })
        }
        $(this.player_prefix).addChild($.container(this.player_prefix + 'Headpic', {
            width: 87 * GAME_SCALE,
            height: 87 * GAME_SCALE,
            background: "url('" + (this.path || 'defaultHead') + "') 0 0 / 100% 100%",
            radius: 10
        }));
        $(this.player_prefix).addChild($.container(this.player_prefix + 'PlayerContainer', {
            y: 46,
            width: 87 * GAME_SCALE,
            height: 46 * GAME_SCALE,
            borderRadius: 40 * GAME_SCALE,
            backgroundColor: "0x000000,0"
        }));
        $(this.player_prefix + 'PlayerContainer').addChild($.text(this.player_prefix + 'NickName', this.nick_name, {
            y: 0,
            width: 87 * GAME_SCALE,
            height: 20 * GAME_SCALE,
            style: {
                fontFamily: "微软雅黑",
                fontSize: 20.83 * GAME_SCALE,
                color: '0xffffff',
                align: 'center',
                lineHeight: 16 * GAME_SCALE,
                wrap: true,
            }
        }));
        $(this.player_prefix + 'PlayerContainer').addChild($.graphics(this.player_prefix + 'NickNameMask', {
            width: 87 * GAME_SCALE,
            height: 20 * GAME_SCALE,
            backgroundColor: '0x000000'
        }));
        $(this.player_prefix + 'NickName').get().mask = $(this.player_prefix + 'NickNameMask').get();
        $(this.player_prefix + 'PlayerContainer').addChild($.text(this.player_prefix + 'EndPoint', this.end_point, {
            y: 19 * GAME_SCALE,
            width: 87 * GAME_SCALE,
            height: 20 * GAME_SCALE,
            style: {
                fontFamily: "微软雅黑",
                fontSize: 25 * GAME_SCALE,
                color: '0xff9000',
                align: 'center',
            }
        }));
        return this;
    }
    prop.addStyle2PlayerToStage = function(playPos, parent) {
        this.playContainerStyle = 2;
        this.pos = playPos
        var position = playersConfig.getInstance().getPositionByPos(playPos);
        if (parent) {
            if (typeof(parent) == 'object') {
                parent.addChild($.container(this.player_prefix, {
                    x: position.x,
                    y: position.y
                }))
            } else if (typeof(parent) == 'string') {
                $(parent).addChild($.container(this.player_prefix, {
                    x: position.x,
                    y: position.y
                }))
            }
        } else {
            $.container(this.player_prefix, {
                x: position.x,
                y: position.y
            })
        }
        $(this.player_prefix).addChild($.container(this.player_prefix + 'Headpic', {
            width: 96 * GAME_SCALE,
            height: 94 * GAME_SCALE,
            background: "url('" + (this.path || 'defaultHead') + "') 0 0 / 100% 100%",
            radius: 'circle'
        }));
        $(this.player_prefix).addChild($.container(this.player_prefix + 'PlayerContainer', {
            x: -16 * GAME_SCALE,
            y: 106 * GAME_SCALE,
            width: 122 * GAME_SCALE,
            height: 47 * GAME_SCALE,
            borderRadius: 32 * GAME_SCALE,
            backgroundColor: "0x000000,0.47"
        }));
        $(this.player_prefix + 'PlayerContainer').addChild($.text(this.player_prefix + 'NickName', this.nick_name, {
            y: 3 * GAME_SCALE,
            width: 122 * GAME_SCALE,
            height: 16 * GAME_SCALE,
            style: {
                fontFamily: "微软雅黑",
                fontSize: 16 * GAME_SCALE,
                color: '0xffffff',
                align: 'center',
                wrap: true,
            }
        }));
        $(this.player_prefix + 'PlayerContainer').addChild($.graphics(this.player_prefix + 'NickNameMask', {
            width: 122 * GAME_SCALE,
            height: 19 * GAME_SCALE,
            backgroundColor: '0x000000'
        }));
        $(this.player_prefix + 'NickName').get().mask = $(this.player_prefix + 'NickNameMask').get();
        $(this.player_prefix + 'PlayerContainer').addChild($.text(this.player_prefix + 'EndPoint', this.end_point, {
            y: 24 * GAME_SCALE,
            width: 122 * GAME_SCALE,
            height: 18 * GAME_SCALE,
            style: {
                fontFamily: "微软雅黑",
                fontSize: 18 * GAME_SCALE,
                color: '0xd8eb8d',
                align: 'center',
            }
        }));
        return this;
    }
    prop.customToAddPlayerToStage = function(playPos, viewData, parent) {
        this.pos = playPos;
        var position = playersConfig().getInstance().getPositionByPos(playPos);
        if (parent) {
            if (typeof(parent) == 'object') {
                parent.addChild($.container(this.player_prefix, {
                    x: position.x,
                    y: position.y
                }))
            } else if (typeof(parent) == 'string') {
                $(parent).addChild($.container(this.player_prefix, {
                    x: position.x,
                    y: position.y
                }))
            }
        } else {
            $.container(this.player_prefix, {
                x: position.x,
                y: position.y
            })
        }
        $(this.player_prefix).addChild($.container(this.player_prefix + viewData.playerHead.name, viewData.playerHead.playerHeadViewData));
        $(this.player_prefix).addChild($.container(this.player_prefix + viewData.playerContainer.name, viewData.playerContainer.playContainerViewData));
        $(this.player_prefix + viewData.playerContainer.name).addChild($.text(player_prefix + viewData.nickName.name, nick_name.text, viewData.nickName.nickNameViewData));
    }
    prop.getPlayerEndPoint = function() {
        return $(this.player_prefix + 'EndPoint').get().text;
    }
    prop.setPlayerEndPoint = function(endPoint) {
        if ($(this.player_prefix + 'EndPoint')) {
            $(this.player_prefix + 'EndPoint').remove();
        }
        endPoint = endPoint || 0;
        this.end_point = endPoint;
        if (this.playContainerStyle == 1) {
            if ($(this.player_prefix + 'PlayerContainer')) {
                $(this.player_prefix + 'PlayerContainer').addChild($.text(this.player_prefix + 'EndPoint', endPoint, {
                    y: 19 * GAME_SCALE,
                    width: 87 * GAME_SCALE,
                    height: 20 * GAME_SCALE,
                    style: {
                        fontFamily: "微软雅黑",
                        fontSize: 25 * GAME_SCALE,
                        color: '0xff9000',
                        align: 'center',
                    }
                }));
            }
        } else if (this.playContainerStyle == 2) {
            if ($(this.player_prefix + 'PlayerContainer')) {
                $(this.player_prefix + 'PlayerContainer').addChild($.text(this.player_prefix + 'EndPoint', endPoint, {
                    y: 24 * GAME_SCALE,
                    width: 122 * GAME_SCALE,
                    height: 18 * GAME_SCALE,
                    style: {
                        fontFamily: "微软雅黑",
                        fontSize: 18 * GAME_SCALE,
                        color: '0xd8eb8d',
                        align: 'center',
                    }
                }));
            }
        }
        return this;
    }
    prop.addStyleForPlayer = function(sub, parent) {
        if (typeof(sub) == 'object' && typeof(parent) == 'string') {
            var prefix = parent == this.player_prefix ? this.player_prefix: this.player_prefix + parent;
            $(prefix).addChild(sub);
        } else {
            console.warn('参数错误，添加玩家新样式失败！')
        }
        return this;
    }
    prop.addStyleForPlayerBefore = function(sub, parent) {
        if (typeof(sub) == 'object' && typeof(parent) == 'string') {
            var prefix = parent == this.player_prefix ? this.player_prefix: this.player_prefix + parent;
            $(prefix).addChildBefore(sub, 0);
        } else {
            console.warn('参数错误，添加玩家新样式失败！')
        }
        return this;
    }
    prop.remove = function() {
        $(this.getPlayerPrefix()).remove();
    }
    prop.EditStyleForPlayer = function(editObject) {}
    return PlayerBase;
})();
var Majong = (function() {
    function Majong() {}
    var prop = Majong.prototype;
    prop.mcObject = null;
    prop.playMajongMC = function(value) {
        var frames = [];
        for (var i = 0; i < 5; i++) {
            if (i < 4) {
                frames.push(PIXI.Texture.fromFrame('majiang-' + i));
            } else {
                frames.push(PIXI.Texture.fromFrame('majiang-' + i + '-' + value));
            }
        }
        var anim = new PIXI.extras.AnimatedSprite(frames);
        this.mcObject = anim;
        anim.x = 0;
        anim.y = 0;
        anim.width = $(this.majong_prefix).width;
        anim.height = $(this.majong_prefix).height;
        anim.animationSpeed = .29;
        anim.loop = false;
        anim.play();
        $(this.majong_prefix).get().addChild(this.mcObject);
    }
    prop.clearMajong = function() {
        if (this.mcObject != null) {
            $(this.majong_prefix).get().removeChild(this.mcObject);
            this.mcObject = null;
        }
        $(this.majong_prefix).remove();
    }
    prop.generalMajong = function(column, majongPos, mWidth, startPosition, parent) {
        var _this = this;
        if (majongPos == null || mWidth == null || startPosition == null) {
            console.warn('参数出错，构建麻将视图失败！');
            return;
        }
        this.majongWidth = mWidth;
        this.majongHeight = 71;
        this.pos = majongPos;
        this.majong_prefix = 'column' + column + 'Majong' + majongPos;
        if (parent) {
            if (typeof(parent) == 'object') {
                parent.addChild($.container(this.majong_prefix, {
                    width: ((this.majongWidth / 48) * 48) * GAME_SCALE,
                    height: ((this.majongWidth / 48) * 71) * GAME_SCALE,
                }))
            } else if (typeof(parent) == 'string') {
                $(parent).addChild($.container(this.majong_prefix, {
                    width: ((this.majongWidth / 48) * 48) * GAME_SCALE,
                    height: ((this.majongWidth / 48) * 71) * GAME_SCALE,
                }))
            }
        } else {
            $.container(this.majong_prefix, {
                width: ((this.majongWidth / 48) * 48) * GAME_SCALE,
                height: ((this.majongWidth / 48) * 71) * GAME_SCALE,
            })
        }
        $(this.majong_prefix).addChild($.container(this.majong_prefix + 'MajongContainer', {
                x: 0,
                y: 0,
                width: ((this.majongWidth / 48) * 48) * GAME_SCALE,
                height: ((this.majongWidth / 48) * 71) * GAME_SCALE,
                background: "url('majiang-0') 0 0 / 100% 100%",
            },
            'majiangSpritesheetJson'));
        $(this.majong_prefix).position(startPosition.x, startPosition.y - majongPos * 4);
    }
    prop.resetMajong = function(value) {
        if ($(this.majong_prefix + 'MajongContainer')) {
            $(this.majong_prefix + 'MajongContainer').remove();
        }
        $(this.majong_prefix).addChild($.container(this.majong_prefix + 'MajongContainer', {
                x: 0,
                y: 0,
                width: ((this.majongWidth / 48) * 48) * GAME_SCALE,
                height: ((this.majongWidth / 48) * 71) * GAME_SCALE,
                background: "url('majiang-4-" + value + "') 0 0 / 100% 100%",
            },
            'majiangSpritesheetJson'));
    }
    prop.getPos = function() {
        return this.pos;
    }
    prop.animationMajong = function(opts) {
        $(this.majong_prefix).animation(opts.paramOpts, opts.time,
            function() {
                if (opts.callback && typeof(opts.callback) == 'function') {
                    opts.callback();
                }
            })
    }
    prop.setWidthHeight = function(width, height) {
        $(this.majong_prefix).width(width * GAME_SCALE);
        $(this.majong_prefix).height(height * GAME_SCALE);
    }
    prop.getMajongPosition = function() {
        var x = $(this.majong_prefix).x;
        var y = $(this.majong_prefix).y;
        return {
            x: x,
            y: y
        };
    }
    prop.setPosition = function(x, y) {
        $(this.majong_prefix).position(x, y);
    }
    prop.changeMC = function() {}
    return Majong;
})();
var ExceptionController = (function() {
    function ExceptionController() {};
    ExceptionController.checkDataForDebug = {
        'init': function(d) {
            var user_list = d.room_users;
            if (!d.cur_match || d.cur_match > 20) {
                $.alert('joinRoom接口cur_match后台传输错误', 'error');
                return false;
            }
            return true;
        },
        'autoAnte': function(data) {
            if (!data) {
                $.alert('autoAnte接口data后台传输错误', 'error');
                return false;
            }
            if (data.xianjia_user_ids == null || data.xianjia_user_ids.length == 0) {
                $.alert('autoAnte接口xianjia_user_ids后台传输错误', 'error');
                return false;
            }
            return true;
        },
        'playerjoin': function(data) {
            if (!data.user_id) {
                $.alert('playerJosin接口user_id后台传输错误', 'error');
                return false;
            }
            if (data.user_id == user.id) {
                $.alert('进去房间玩家与该玩家user_id相同', 'error');
                return false;
            }
            if (!data.nickname) {
                $.alert('playerJosin接口nickname后台传输错误', 'error');
                return false;
            }
            if (data.position == null) {
                $.alert('playerJosin接口position后台传输错误', 'error');
                return false;
            }
            if (data.position == '0') {
                $.alert('playerJosin接口position不应该为0 user_id =' + data.user_id, 'error');
                return false;
            }
            if (!data.path) {
                $.alert('playerJosin接口path后台传输错误', 'error');
                return false;
            }
            return true;
        },
        'playerleave': function(data) {
            if (data.is_exist == null) {
                $.alert('playerleave接口is_exist后台传输错误', 'error');
                return false;
            }
            if (data.user_id == null || data.user_id == user.id) {
                $.alert('playerleave接口user_id后台传输错误', 'error');
                return false;
            }
            return true;
        },
        'grabZhuang': function(data) {
            if (data.user_id == null || data.sex == null) {
                $.alert('grabZhuang接口后台传输错误', 'error');
                return false;
            }
            return true;
        },
        'initCards': function(data) {
            if (data == null) {
                $.alert('initCards接口data后台传输错误', 'error');
                return false;
            }
            return true;
        },
        'start': function(data) {
            if (data.cur_match == null || data.cur_match == '0' || parseInt(data.cur_match) > parseInt(Page.max_matches)) {
                $.alert('start接口cur_match后台传输错误', 'error');
                return false;
            }
            return true;
        },
        'setAnte': function(data) {
            if (data.all_value == null || data.all_value <= 0) {
                $.alert('setAnte接口all_value后台传输错误', 'error');
                return false;
            }
            if (data.block == null) {
                $.alert('setAnte接口block后台传输错误', 'error');
                return false;
            }
            if (data.current_value == null) {
                $.alert('setAnte接口current_value后台传输错误', 'error');
                return false;
            }
            if (data.sex == null) {
                $.alert('setAnte接口sex后台传输错误', 'error');
                return false;
            }
            if (data.size == null) {
                $.alert('setAnte接口size后台传输错误', 'error');
                return false;
            }
            if (data.user_id == null) {
                $.alert('setAnte接口user_id后台传输错误', 'error');
                return false;
            }
            if (data.value == null || data.value <= 0) {
                $.alert('setAnte接口value后台传输错误', 'error');
                return false;
            }
            return true;
        },
        'dealCards': function(data) {
            if (!data) {
                $.alert('dealCards接口data后台数据错误', 'error');
                return false;
            }
            if (data.dices == null) {
                $.alert('dealCards接口dices后台数据错误', 'error');
                return false;
            }
            return true;
        },
        'clickDealsCards': function(data) {
            if (!data) {
                $.alert('clickDealsCards接口data后台数据错误', 'error');
                return false;
            }
            if (data.master_id == null) {
                $.alert('clickDealsCards接口master_id后台数据错误', 'error');
                return false;
            }
            return true;
        },
        'ready': function(data) {
            if (!data) {
                $.alert('ready接口data参数后台传输错误', 'error');
                return false;
            }
            return true;
        },
        'selectedMaster': function(data) {
            if (!data) {
                $.alert('selectedMaster接口data参数后台传输错误', 'error');
                return false;
            }
            if (data.master_userid == null) {
                $.alert('selectedMaster接口master_userid参数后台传输错误', 'error');
                return false;
            }
            if (data.random_users == null) {
                $.alert('selectedMaster接口random_users参数后台传输错误', 'error');
                return false;
            }
            return true;
        },
        'showdownOver': function(data) {
            if (!data) {
                $.alert('showdownOver接口data参数后台传输错误', 'error');
                return false;
            }
            if (data.card_code == null) {
                $.alert('showdownOver接口card_code参数后台传输错误', 'error');
                return false;
            }
            if (data.cards == null) {
                $.alert('showdownOver接口cards参数后台传输错误', 'error');
                return false;
            }
            return true;
        },
        'settlement': function(data) {
            if (!data || data.length == 0) {
                $.alert('settlement接口data后台数据错误', 'error');
                return false;
            }
            return true;
        }
    }
    ExceptionController.ExpectedResultData = {}
    ExceptionController.checkCallBackData = function(act, data) {
        return this.checkDataForDebug[act](data);
    }
    ExceptionController.CheckExpectedResult = function(userTimeData) {
        if (userTimeData.s <= 5) {
            if (userTimeData.user_id == user.id) {}
        }
    }
    ExceptionController.setExpectedResultData = function(act, data) {
        this.ExpectedResultData[act] = data;
    }
    return ExceptionController;
})();

var GamePanel = (function() {
    function GamePanel() {}
    var prop = GamePanel.prototype;
    var gamePanelPrefix = 'gamePanel';
    var goldArr = [];
    prop.getGamePanelPrefix = function() {
        return gamePanelPrefix;
    }
    prop.addToStage = function() {
        if (!$(gamePanelPrefix)) {
            $.container(gamePanelPrefix, {});
        }
    }
    prop.pushGoldArr = function(goldObject) {
        goldArr.push(goldObject);
    }
    prop.getGoldArr = function() {
        return goldArr;
    }
    prop.clearGoldArr = function() {
        for (var i = 0; i < goldArr.length; i++) {
            if ($(goldArr[i])) {
                $(goldArr[i]).remove();
            }
        }
        goldArr.splice(0, goldArr.length);
        if ($('gameGold')) {
            App.stage.removeChild($('gameGold').get());
        }
    }
    prop.resetGamePanel = function() {
        if ($(gamePanelPrefix)) {
            $(gamePanelPrefix).remove();
            $.container(gamePanelPrefix, {});
        }
    }
    prop.addChild = function(object) {
        $(gamePanelPrefix).addChild(object);
    }
    return GamePanel;
})();
var ChipInPanel = (function() {
    function ChipInPanel() {};
    var prop = ChipInPanel.prototype;
    var chipInPanelRrefix = 'chipInPanel';
    var _this;
    prop.addToStage = function() {
        _this = this;
        $(Game.gamePanel.getGamePanelPrefix()).addChild($.container(chipInPanelRrefix + 'Container', {
                width: 500 * GAME_SCALE,
                height: 410 * GAME_SCALE,
                x: 126 * GAME_SCALE,
                y: 350 * GAME_SCALE,
                background: 'url(chipIn-panel) 0 0 / 100% 100%'
            },
            'gameSpritesheetJson'));
        $(chipInPanelRrefix + 'Container').addChild($.container(chipInPanelRrefix + '-zhuang-card', {
            width: 503 * GAME_SCALE,
            height: 117 * GAME_SCALE,
            x: 0,
            y: 0,
            backgroundColor: '0x000000,0'
        }));
        $(chipInPanelRrefix + '-zhuang-card').get().curtomPosition = {
            x: 340 * GAME_SCALE,
            y: 356 * GAME_SCALE
        };
        $(chipInPanelRrefix + 'Container').addChild($.container(chipInPanelRrefix + '-shun', {
            width: 168 * GAME_SCALE,
            height: 481 * GAME_SCALE,
            x: 0,
            y: 105 * GAME_SCALE,
        }));
        $(chipInPanelRrefix + '-shun').addChild($.container(chipInPanelRrefix + '-shun-card', {
            width: 168 * GAME_SCALE,
            height: 145 * GAME_SCALE,
            x: 0,
            y: 0,
        }));
        $(chipInPanelRrefix + '-shun-card').get().curtomPosition = {
            x: 182 * GAME_SCALE,
            y: 516 * GAME_SCALE
        }
        $(chipInPanelRrefix + '-shun').addChild($.container(chipInPanelRrefix + '-shun-chipin-big', {
            width: 168 * GAME_SCALE,
            height: 161 * GAME_SCALE,
            x: 0,
            y: 146 * GAME_SCALE,
            backgroundColor: '0x000000,0'
        }));
        $(chipInPanelRrefix + '-shun-chipin-big').addChild($.container(chipInPanelRrefix + '-shun-chipin-big-border', {
            width: 168 * GAME_SCALE,
            height: 161 * GAME_SCALE,
            x: 0,
            y: 0,
            borderWidth: 3 * GAME_SCALE,
            borderColor: '0x00ff81',
            backgroundColor: '0x000000,0'
        }));
        $(chipInPanelRrefix + '-shun-chipin-big-border').alpha(0);
        $(chipInPanelRrefix + '-shun-chipin-big').get().className = chipInPanelRrefix + '-shun-chipin-big';
        $(chipInPanelRrefix + '-shun-chipin-big').get().sendChipInJson = {
            'block': 's',
            'size': '1',
            'canClick': false
        };
        $(chipInPanelRrefix + '-shun-chipin-big').get().interactive = true;
        $(chipInPanelRrefix + '-shun-chipin-big').on('pointerdown',
            function(e) {
                if (Page.running == '7' && this.sendChipInJson.canClick) {
                    $(chipInPanelRrefix + '-shun-chipin-big-border').alpha(1);
                    xianxz({
                        "value" : (localStorage.chooseValue ? localStorage.chooseValue: '1'),
                        "block" : this.sendChipInJson.block,
                        "size" : this.sendChipInJson.size
                    });
                    /*
                    ws.send({
                            'value': (localStorage.chooseValue ? localStorage.chooseValue: '1'),
                            'block': this.sendChipInJson.block,
                            'size': this.sendChipInJson.size
                        },
                        'setAnte');*/
                }
            });
        $(chipInPanelRrefix + '-shun-chipin-big').on('pointerup',
            function(e) {
                $(chipInPanelRrefix + '-shun-chipin-big-border').alpha(0);
            });
        $(chipInPanelRrefix + '-shun-chipin-big').on('pointerupoutside',
            function(e) {
                $(chipInPanelRrefix + '-shun-chipin-big-border').alpha(0);
            });
        $(chipInPanelRrefix + 'Container').addChild($.container(chipInPanelRrefix + '-tian', {
            width: 168 * GAME_SCALE,
            height: 481 * GAME_SCALE,
            x: 168 * GAME_SCALE,
            y: 105 * GAME_SCALE,
        }));
        $(chipInPanelRrefix + '-tian').addChild($.container(chipInPanelRrefix + '-tian-card', {
            width: 168 * GAME_SCALE,
            height: 145 * GAME_SCALE,
            x: 0,
            y: 0,
        }));
        $(chipInPanelRrefix + '-tian-card').get().curtomPosition = {
            x: 350 * GAME_SCALE,
            y: 516 * GAME_SCALE
        }
        $(chipInPanelRrefix + '-tian').addChild($.container(chipInPanelRrefix + '-tian-chipin-big', {
            width: 168 * GAME_SCALE,
            height: 161 * GAME_SCALE,
            x: 0,
            y: 146 * GAME_SCALE,
            backgroundColor: '0x000000,0'
        }));
        $(chipInPanelRrefix + '-tian-chipin-big').addChild($.container(chipInPanelRrefix + '-tian-chipin-big-border', {
            width: 168 * GAME_SCALE,
            height: 161 * GAME_SCALE,
            x: 0,
            y: 0,
            borderWidth: 3 * GAME_SCALE,
            borderColor: '0x00ff81',
            backgroundColor: '0x000000,0'
        }));
        $(chipInPanelRrefix + '-tian-chipin-big-border').alpha(0);
        $(chipInPanelRrefix + '-tian-chipin-big').get().className = chipInPanelRrefix + '-tian-chipin-big';
        $(chipInPanelRrefix + '-tian-chipin-big').get().sendChipInJson = {
            'block': 't',
            'size': '1',
            'canClick': false
        };
        $(chipInPanelRrefix + '-tian-chipin-big').get().interactive = true;
        $(chipInPanelRrefix + '-tian-chipin-big').on('pointerdown',
            function(e) {
                if (Page.running == '7' && this.sendChipInJson.canClick) {
                    $(chipInPanelRrefix + '-tian-chipin-big-border').alpha(1);
                    xianxz({
                        "value" : (localStorage.chooseValue ? localStorage.chooseValue: '1'),
                        "block" : this.sendChipInJson.block,
                        "size" : this.sendChipInJson.size
                    });
                    /*
                    ws.send({
                            'value': (localStorage.chooseValue ? localStorage.chooseValue: '1'),
                            'block': this.sendChipInJson.block,
                            'size': this.sendChipInJson.size
                        },
                        'setAnte');*/
                }
            });
        $(chipInPanelRrefix + '-tian-chipin-big').on('pointerup',
            function(e) {
                $(chipInPanelRrefix + '-tian-chipin-big-border').alpha(0);
            });
        $(chipInPanelRrefix + '-tian-chipin-big').on('pointerupoutside',
            function(e) {
                $(chipInPanelRrefix + '-tian-chipin-big-border').alpha(0);
            });
        $(chipInPanelRrefix + 'Container').addChild($.container(chipInPanelRrefix + '-di', {
            width: 168 * GAME_SCALE,
            height: 481 * GAME_SCALE,
            x: 336 * GAME_SCALE,
            y: 105 * GAME_SCALE,
        }));
        $(chipInPanelRrefix + '-di').addChild($.container(chipInPanelRrefix + '-di-card', {
            width: 168 * GAME_SCALE,
            height: 145 * GAME_SCALE,
            x: 0,
            y: 0,
        }));
        $(chipInPanelRrefix + '-di-card').get().curtomPosition = {
            x: 510 * GAME_SCALE,
            y: 516 * GAME_SCALE
        }
        $(chipInPanelRrefix + '-di').addChild($.container(chipInPanelRrefix + '-di-chipin-big', {
            width: 168 * GAME_SCALE,
            height: 161 * GAME_SCALE,
            x: 0,
            y: 146 * GAME_SCALE,
            backgroundColor: '0x000000,0'
        }));
        $(chipInPanelRrefix + '-di-chipin-big').addChild($.container(chipInPanelRrefix + '-di-chipin-big-border', {
            width: 168 * GAME_SCALE,
            height: 161 * GAME_SCALE,
            x: 0,
            y: 0,
            borderWidth: 3 * GAME_SCALE,
            borderColor: '0x00ff81',
            backgroundColor: '0x000000,0'
        }));
        $(chipInPanelRrefix + '-di-chipin-big-border').alpha(0);
        $(chipInPanelRrefix + '-di-chipin-big').get().className = chipInPanelRrefix + '-di-chipin-big';
        $(chipInPanelRrefix + '-di-chipin-big').get().sendChipInJson = {
            'block': 'd',
            'size': '1',
            'canClick': false
        };
        $(chipInPanelRrefix + '-di-chipin-big').get().interactive = true;
        $(chipInPanelRrefix + '-di-chipin-big').on('pointerdown',
            function(e) {
                if (Page.running == '7' && this.sendChipInJson.canClick) {
                    $(chipInPanelRrefix + '-di-chipin-big-border').alpha(1);
                    xianxz({
                        "value" : (localStorage.chooseValue ? localStorage.chooseValue: '1'),
                        "block" : this.sendChipInJson.block,
                        "size" : this.sendChipInJson.size
                    });
                    /*
                    ws.send({
                            'value': (localStorage.chooseValue ? localStorage.chooseValue: '1'),
                            'block': this.sendChipInJson.block,
                            'size': this.sendChipInJson.size
                        },
                        'setAnte');*/
                }
            });
        $(chipInPanelRrefix + '-di-chipin-big').on('pointerup',
            function(e) {
                $(chipInPanelRrefix + '-di-chipin-big-border').alpha(0);
            });
        $(chipInPanelRrefix + '-di-chipin-big').on('pointerupoutside',
            function(e) {
                $(chipInPanelRrefix + '-di-chipin-big-border').alpha(0);
            });
    }
    prop.initBlockClickState = function(canClick) {
        $(chipInPanelRrefix + '-shun-chipin-big').get().sendChipInJson.canClick = canClick;
        $(chipInPanelRrefix + '-tian-chipin-big').get().sendChipInJson.canClick = canClick;
        $(chipInPanelRrefix + '-di-chipin-big').get().sendChipInJson.canClick = canClick;
    }
    prop.initBlockClickStateForOne = function(className, canClick) {
        $(className).get().sendChipInJson.canClick = canClick;
    }
    prop.getChipInPanelPrefix = function() {
        return chipInPanelRrefix;
    }
    prop.blockControlArr = [];
    prop.playersChipInCount = 0;
    prop.dealMajong = function(animation) {
        var startX = 150 * GAME_SCALE;
        var startY = 52 * GAME_SCALE;
        for (var i = 0; i < 10; i++) {
            var position = {
                x: startX,
                y: startY
            }
            this.generalMajong(i, position, 2, 31, Game.gamePanel.getGamePanelPrefix(), animation);
            startX += 13.7;
        }
    }
    prop.parseResponseToClassNameArr = function(block) {
        var covertBlockInformationJson = {
            's': 'shun',
            't': 'tian',
            'd': 'di'
        };
        var covertBlockSizeJson = {
            '0': 'small',
            '1': 'big'
        };
        var classNameArr = [];
        for (var i in covertBlockSizeJson) {
            classNameArr.push(chipInPanelRrefix + '-' + covertBlockInformationJson[block] + '-chipin-' + covertBlockSizeJson[i])
        }
        return classNameArr;
    }
    prop.parseResponseToClassName = function(block, size) {
        var covertBlockInformationJson = {
            's': 'shun',
            't': 'tian',
            'd': 'di'
        };
        var covertBlockSizeJson = {
            '0': 'small',
            '1': 'big'
        };
        return chipInPanelRrefix + '-' + covertBlockInformationJson[block] + '-chipin-' + covertBlockSizeJson[size];
    }
    prop.parseResponseToBlockName = function(value) {
        var covertBlockInformationJson = {
            's': 'shun',
            't': 'tian',
            'd': 'di',
            'z': 'zhuang'
        };
        return covertBlockInformationJson[value];
    }
    prop.parseResponseToSizeName = function(value) {
        var covertBlockSizeJson = {
            '0': 'small',
            '1': 'big'
        };
        return covertBlockSizeJson[value];
    }
    prop.generalMajong = function(column, position, count, mJongWidth, parent, animation) {
        if (!count && !parent) {
            console.warn('缺少参数一和二,构造失败！');
            return;
        }
        if (animation) {
            var blockArr = [];
            for (var i = 0; i < count; i++) {
                var maJong = new Majong();
                blockArr.push(maJong);
                maJong.generalMajong(column, i, mJongWidth, {
                        x: position.x,
                        y: position.y - 20
                    },
                    Game.gamePanel.getGamePanelPrefix())
            }
            this.blockControlArr.push(blockArr);
            setTimeout(function() {
                    sound.play('sound_4_2');
                    for (var j = 0; j < blockArr.length; j++) {
                        blockArr[j].animationMajong({
                            time: 60,
                            paramOpts: {
                                y: blockArr[j].getMajongPosition().y + 20
                            },
                            callback: function() {}
                        })
                    }
                },
                column * 50);
        } else {
            var blockArr = [];
            for (var i = 0; i < count; i++) {
                var maJong = new Majong();
                blockArr.push(maJong);
                maJong.generalMajong(column, i, mJongWidth, {
                        x: position.x,
                        y: position.y
                    },
                    Game.gamePanel.getGamePanelPrefix())
            }
            this.blockControlArr.push(blockArr);
        }
    }
    prop.getMajongCardBlockFullName = function(blockName) {
        return chipInPanelRrefix + '-' + blockName + '-card';
    }
    prop.NumberToStringForPointJson = {
        '0': '0',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
        '7': '七',
        '8': '八',
        '9': '九'
    }
    prop.getPointTips = function(value, _code) {
        var code = parseInt(_code);
        var returnString = '';
        if (code == 11) {
            returnString = '对子';
        } else if (code == 10) {
            returnString = '二八杠';
        } else if (code == 12) {
            returnString = '对白板';
        } else if (code == 0) {
            returnString = '0点';
        } else {
            var numberArr = value.split('.');
            returnString = this.NumberToStringForPointJson[numberArr[0]] + '点' + (numberArr[1] && numberArr[1] != '' ? '半': '');
        }
        return returnString;
    }
    prop.getMusicTips = function(value, _code) {
        var code = parseInt(_code);
        var returnString = '';
        if (code == 11) {
            returnString = '11';
        } else if (code == 10) {
            returnString = '10';
        } else if (code == 12) {
            returnString = '12';
        } else if (code == 0) {
            returnString = '0';
        } else {
            var numberArr = value.split('.');
            returnString = numberArr[0] + (numberArr[1] && numberArr[1] != '' ? '_0': '');
        }
        return 'sound_3_' + returnString;
    }
    prop.dealMajongToBlock = function(data, animation) {
        var _this = this;
        var blockControlArr = this.blockControlArr;
        var dealCount = 0;
        var blockNameArr = [];
        var cards = data.cards;
        for (var i in cards) {
            var blockName = this.parseResponseToBlockName(i);
            blockNameArr.push(blockName);
        }
        if (animation) {
            for (var i = 0; i < 4; i++) { (function(index) {
                setTimeout(function() {
                        for (var j = 0; j < blockControlArr[index].length; j++) {
                            var cardBlockObject = $(_this.getMajongCardBlockFullName(blockNameArr[index]));
                            var majongObject = blockControlArr[index][j];
                            var width = blockNameArr[index] == 'zhuang' ? 64 : 48;
                            var height = blockNameArr[index] == 'zhuang' ? 94 : 71;
                            majongObject.animationMajong({
                                time: 500,
                                callback: function() {
                                    dealCount++;
                                    if (dealCount == 8) {
                                        _this.showDownMojong(data, true);
                                    }
                                },
                                paramOpts: {
                                    x: cardBlockObject.get().curtomPosition.x,
                                    y: cardBlockObject.get().curtomPosition.y - majongObject.getPos() * 4,
                                    width: width * GAME_SCALE,
                                    height: height * GAME_SCALE,
                                }
                            })
                        }
                        sound.play('sound_4_3');
                    },
                    index * 500)
            })(i)
            }
        } else {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < blockControlArr[i].length; j++) {
                    var cardBlockObject = $(_this.getMajongCardBlockFullName(blockNameArr[i]));
                    var majongObject = blockControlArr[i][j];
                    var width = blockNameArr[i] == 'zhuang' ? 64 : 48;
                    var height = blockNameArr[i] == 'zhuang' ? 94 : 71;
                    majongObject.setWidthHeight(width, height);
                    majongObject.setPosition(cardBlockObject.get().curtomPosition.x, cardBlockObject.get().curtomPosition.y - majongObject.getPos() * 4);
                }
            }
        }
    }
    prop.resetMajong = function(data) {
        var count = 0;
        var blockControlArr = this.blockControlArr;
        for (var n in data.cards) { (function(index, blockName) {
            var majong1Value = data.cards[blockName][0].value;
            var majongObject1 = blockControlArr[index][0];
            var majong2Value = data.cards[blockName][1].value;
            var majongObject2 = blockControlArr[index][1];
            var majongTip = _this.getPointTips(data.card_code[blockName].point, data.card_code[blockName].code);
            majongObject1.resetMajong(majong1Value);
            majongObject2.resetMajong(majong2Value);
            _this.generalBlockTips(_this.parseResponseToBlockName(blockName), majongTip);
        })(count, n);
            count++;
        }
    }
    prop.showDownMojong = function(data, animation) {
        var blockControlArr = this.blockControlArr;
        var blockNameArr = [];
        var cards = data.cards;
        for (var i in cards) {
            var blockName = this.parseResponseToBlockName(i);
            blockNameArr.push(blockName);
        }
        if (animation) {
            for (var i = 0; i < 4; i++) {
                if (blockNameArr[i] == "zhuang") {
                    var majongObjectLeft = blockControlArr[i][1];
                    var majongObjectRight = blockControlArr[i][0];
                    majongObjectLeft.animationMajong({
                        time: 150,
                        paramOpts: {
                            x: majongObjectLeft.getMajongPosition().x - 28,
                            y: majongObjectRight.getMajongPosition().y + .5
                        },
                        callback: function() {}
                    })
                } else {
                    var majongObjectLeft = blockControlArr[i][0];
                    var majongObjectRight = blockControlArr[i][1];
                    majongObjectLeft.animationMajong({
                        time: 150,
                        paramOpts: {
                            x: majongObjectLeft.getMajongPosition().x - 10.5
                        },
                        callback: function() {}
                    });
                    majongObjectRight.animationMajong({
                        time: 150,
                        paramOpts: {
                            x: majongObjectRight.getMajongPosition().x + 10.5,
                            y: majongObjectLeft.getMajongPosition().y + .5
                        },
                        callback: function() {}
                    })
                }
            }
        } else {
            for (var i = 0; i < 4; i++) {
                if (blockNameArr[i] == "zhuang") {
                    var majongObjectLeft = blockControlArr[i][1];
                    var majongObjectRight = blockControlArr[i][0];
                    majongObjectLeft.setPosition(majongObjectLeft.getMajongPosition().x - 28, majongObjectRight.getMajongPosition().y + .5);
                } else {
                    var majongObjectLeft = blockControlArr[i][0];
                    var majongObjectRight = blockControlArr[i][1];
                    majongObjectLeft.setPosition(majongObjectLeft.getMajongPosition().x - 10.5, majongObjectLeft.getMajongPosition().y);
                    majongObjectRight.setPosition(majongObjectRight.getMajongPosition().x + 10.5, majongObjectLeft.getMajongPosition().y + .5);
                }
            }
        }
    }
    prop.clearBlockTips = function(blockName) {
        var blockFullName = chipInPanelRrefix + '-' + blockName + '-card';
        if ($(blockFullName + 'ScoreTipsText')) {
            $(blockFullName + 'ScoreTipsText').remove();
        }
        if ($(blockFullName + 'ScoreTips')) {
            $(blockFullName + 'ScoreTips').remove();
        }
    }
    prop.generalBlockTips = function(blockName, value, isAnimation) {
        var blockFullName = chipInPanelRrefix + '-' + blockName + '-card';
        if (blockName == 'zhuang') {
            $(blockFullName).addChild($.container(blockFullName + 'ScoreTips', {
                    width: 139 * GAME_SCALE,
                    height: 62 * GAME_SCALE,
                    x: 271 * GAME_SCALE,
                    y: 21 * GAME_SCALE,
                    background: 'url(mask) 0 0 / 99% 100%'
                },
                'gameSpritesheetJson'));
            $(blockFullName + 'ScoreTips').addChild($.text(blockFullName + 'ScoreTipsText', value, {
                width: 139 * GAME_SCALE,
                style: {
                    fontFamily: "微软雅黑",
                    fontSize: 38.22 * GAME_SCALE,
                    color: ['0xffffff', '0xf8da2e', '0xf8da2e'],
                    align: 'center',
                    lineHeight: 55 * GAME_SCALE,
                    fontWeight: 'bold'
                }
            }))
        } else {
            $(blockFullName).addChild($.container(blockFullName + 'ScoreTips', {
                    width: 95 * GAME_SCALE,
                    height: 40 * GAME_SCALE,
                    x: 37 * GAME_SCALE,
                    y: 10 * GAME_SCALE,
                    background: 'url(mask-small) 0 0 / 99% 100%'
                },
                'gameSpritesheetJson'));
            $(blockFullName + 'ScoreTips').addChild($.text(blockFullName + 'ScoreTipsText', value, {
                width: 95 * GAME_SCALE,
                style: {
                    fontFamily: "微软雅黑",
                    fontSize: 24 * GAME_SCALE,
                    color: ['0xffffff', '0xf8da2e', '0xf8da2e'],
                    align: 'center',
                    lineHeight: 31 * GAME_SCALE,
                    fontWeight: 'bold'
                }
            }))
        }
    }
    prop.updateChipInScoreCount = function(block_name, bigOrSmall, value) {
        var scoreY = bigOrSmall == 'big' ? 59.5 : 69;
        if ($(chipInPanelRrefix + '-' + block_name + '-chipin-' + bigOrSmall + '-scoreCountText')) {
            $(chipInPanelRrefix + '-' + block_name + '-chipin-' + bigOrSmall + '-scoreCountText').remove();
        }
        $(chipInPanelRrefix + '-' + block_name + '-chipin-' + bigOrSmall).addChild($.text(chipInPanelRrefix + '-' + block_name + '-chipin-' + bigOrSmall + '-scoreCountText', value, {
            x: 8 * GAME_SCALE,
            y: scoreY,
            width: 78 * GAME_SCALE,
            style: {
                fontFamily: "微软雅黑",
                fontSize: 24 * GAME_SCALE,
                color: '0xe8fff4',
                align: 'center',
            }
        }))
    }
    prop.updateChipInScore = function(block_name, bigOrSmall, value) {
        var scoreY = bigOrSmall == 'big' ? 59.5 : 69;
        if ($(chipInPanelRrefix + '-' + block_name + '-chipin-' + bigOrSmall + '-playerScoreText')) {
            $(chipInPanelRrefix + '-' + block_name + '-chipin-' + bigOrSmall + '-playerScoreText').remove();
        }
        $(chipInPanelRrefix + '-' + block_name + '-chipin-' + bigOrSmall).addChild($.text(chipInPanelRrefix + '-' + block_name + '-chipin-' + bigOrSmall + '-playerScoreText', value, {
            x: 75 * GAME_SCALE,
            y: scoreY,
            width: 78 * GAME_SCALE,
            style: {
                fontFamily: "微软雅黑",
                fontSize: 24 * GAME_SCALE,
                color: '0xffb219',
                align: 'center',
            }
        }))
    }
    prop.generalBlockRandomPosition = function(block_name) {
        var blockObject = $(block_name);
        var blockObjectX = $(block_name).x;
        var blockObjectY = $(block_name).y;
        var chipInPanelContainerObject = $('chipInPanelContainer');
        var chipInPanelContainerX = Math.ceil(chipInPanelContainerObject.x);
        var chipInPanelContainerY = Math.ceil(chipInPanelContainerObject.y);
        var startX = Math.ceil(Number($(chipInPanelRrefix + '-' + $(block_name).get().className.split('-')[1]).x));
        var startY = Math.ceil(Number($(chipInPanelRrefix + '-' + $(block_name).get().className.split('-')[1]).y));
        var startPoint = 0;
        var countX = chipInPanelContainerX + startX + blockObjectX;
        var countY = chipInPanelContainerY + startY + blockObjectY;
        var blockWidth = Math.ceil(blockObject.width()) - 10;
        var blockHeight = Math.ceil(blockObject.height()) - 20;
        var blockWidthRandom = parseInt(Math.random() * (blockWidth - startPoint)) + startPoint;
        var blockHeightRandom = parseInt(Math.random() * (blockHeight - startPoint)) + startPoint;
        blockWidth = blockWidthRandom > blockWidth - 17.5 ? blockWidth - 17.5 : blockWidthRandom;
        blockHeight = blockHeightRandom > blockHeight - 17.5 ? blockHeight - 17.5 : blockHeightRandom;
        var returnX = countX + blockWidth;
        var returnY = countY + blockHeight;
        return {
            x: returnX,
            y: returnY
        };
    }
    return ChipInPanel;
})();
var UserPanel = (function() {
    function UserPanel() {}
    var prop = UserPanel.prototype;
    var userPanelPrefix = 'userPanel';
    prop.getUserPanelPrefix = function() {
        return userPanelPrefix;
    }
    prop.addToStage = function() {
        $.container(userPanelPrefix, {});
    }
    prop.addChild = function(object) {
        $(userPanelPrefix).addChild(object);
    }
    return UserPanel;
})();
var BackGroundPanel = (function() {
    function BackGroundPanel() {}
    var prop = BackGroundPanel.prototype;
    var backgroundRrefix = 'backGround';
    var _this;
    var startY = 0;
    var itemsY = 0;
    var moveY = 0;
    var currentMatch = 0;
    var historyData = null;
    var settlementState = false;
    prop.addToStage = function() {
        _this = this;
        $.container(backgroundRrefix + 'Container', {});
        $(backgroundRrefix + 'Container').addChild($.sprite(backgroundRrefix + 'BackgroundImg', 'background', {
            width: '100%',
            height: '100%'
        }));
        $(backgroundRrefix + 'Container').addChild($.container(backgroundRrefix + 'btnMask', {
                x: $.width - (280 * GAME_SCALE),
                y: 35 * GAME_SCALE,
                width: 279 * GAME_SCALE,
                height: 71 * GAME_SCALE,
                background: "url('btn-mask') 0 0 / 100% 100%",
            },
            'gameSpritesheetJson'));
        $(backgroundRrefix + 'btnMask').addChild($.sprite(backgroundRrefix + 'IndexBtn', 'texash-index', {
                width: 62 * GAME_SCALE,
                height: 62 * GAME_SCALE,
                x: 35 * GAME_SCALE,
                y: 6 * GAME_SCALE
            },
            'gameSpritesheetJson'));
        $(backgroundRrefix + 'btnMask').addChild($.sprite(backgroundRrefix + 'RuleBtn', 'texash-rule', {
                width: 62 * GAME_SCALE,
                height: 62 * GAME_SCALE,
                x: 116 * GAME_SCALE,
                y: 6 * GAME_SCALE
            },
            'gameSpritesheetJson'));
        $(backgroundRrefix + 'btnMask').addChild($.sprite(backgroundRrefix + 'TipsBtn', 'texash-tips', {
                width: 62 * GAME_SCALE,
                height: 62 * GAME_SCALE,
                x: 197 * GAME_SCALE,
                y: 6 * GAME_SCALE
            },
            'gameSpritesheetJson'));
        $(backgroundRrefix + 'IndexBtn').on('pointerdown',
            function() {
                $.homePage();
            });
        $(backgroundRrefix + 'RuleBtn').on('pointerdown',
            function() {
                _this.generalRulePanel();
            });
        $(backgroundRrefix + 'TipsBtn').on('pointerdown',
            function() {
                $.agreement();
            });
        $(backgroundRrefix + 'Container').addChild($.sprite(backgroundRrefix + 'ChatBtn', 'game-chat1', {
                width: 80 * GAME_SCALE,
                height: 80 * GAME_SCALE,
                x: $.width - (95 * GAME_SCALE),
                y: $.height - (114 * GAME_SCALE)
            },
            'gameSpritesheetJson'));
        $(backgroundRrefix + 'Container').addChild($.sprite(backgroundRrefix + 'HistoryBtn', 'history', {
                width: 80 * GAME_SCALE,
                height: 80 * GAME_SCALE,
                x: $.width - (90 * GAME_SCALE),
                y: $.height - (315 * GAME_SCALE)
            },
            'gameSpritesheetJson'));
        return this;
    }
    prop.generalHistoryScore = function(scoreJson) {
        if ($(backgroundRrefix + 'HistoryPanelContent')) {
            $(backgroundRrefix + 'HistoryPanelContent').addChild($.text('historyShunZhuangText', '庄', {
                width: 35 * GAME_SCALE,
                x: 35 * GAME_SCALE,
                y: 49 * GAME_SCALE,
                style: {
                    fontFamily: '微软雅黑',
                    fontSize: 30 * GAME_SCALE,
                    color: '0xffc83d',
                    align: 'center'
                }
            }));
            $(backgroundRrefix + 'HistoryPanelContent').addChild($.text('historyShunXianText', '闲', {
                width: 35 * GAME_SCALE,
                x: 35 * GAME_SCALE,
                y: 80 * GAME_SCALE,
                style: {
                    fontFamily: '微软雅黑',
                    fontSize: 30 * GAME_SCALE,
                    color: '0xffc83d',
                    align: 'center'
                }
            }));
            $(backgroundRrefix + 'HistoryPanelContent').addChild($.text('historyShunZhuangCount', scoreJson['s']['z'], {
                width: 35 * GAME_SCALE,
                x: 80 * GAME_SCALE,
                y: 50 * GAME_SCALE,
                style: {
                    fontFamily: '微软雅黑',
                    fontSize: 30 * GAME_SCALE,
                    color: '0xffc83d',
                    align: 'center'
                }
            }));
            $(backgroundRrefix + 'HistoryPanelContent').addChild($.text('historyShunXianCount', scoreJson['s']['x'], {
                width: 35 * GAME_SCALE,
                x: 80 * GAME_SCALE,
                y: 81 * GAME_SCALE,
                style: {
                    fontFamily: '微软雅黑',
                    fontSize: 30 * GAME_SCALE,
                    color: '0xffc83d',
                    align: 'center'
                }
            }));$(backgroundRrefix + 'HistoryPanelContent').addChild($.text('historyTianZhuangCount', scoreJson['t']['z'], {
                width: 35 * GAME_SCALE,
                x: 149 * GAME_SCALE,
                y: 50 * GAME_SCALE,
                style: {
                    fontFamily: '微软雅黑',
                    fontSize: 30 * GAME_SCALE,
                    color: '0xffc83d',
                    align: 'center'
                }
            }));
            $(backgroundRrefix + 'HistoryPanelContent').addChild($.text('historyTianZhuangCount', scoreJson['t']['x'], {
                width: 35 * GAME_SCALE,
                x: 149 * GAME_SCALE,
                y: 81 * GAME_SCALE,
                style: {
                    fontFamily: '微软雅黑',
                    fontSize: 30 * GAME_SCALE,
                    color: '0xffc83d',
                    align: 'center'
                }
            }));
            $(backgroundRrefix + 'HistoryPanelContent').addChild($.text('historyDiZhuangCount', scoreJson['d']['z'], {
                width: 35 * GAME_SCALE,
                x: 217 * GAME_SCALE,
                y: 50 * GAME_SCALE,
                style: {
                    fontFamily: '微软雅黑',
                    fontSize: 30 * GAME_SCALE,
                    color: '0xffc83d',
                    align: 'center'
                }
            }));
            $(backgroundRrefix + 'HistoryPanelContent').addChild($.text('historyDiZhuangCount', scoreJson['d']['x'], {
                width: 35 * GAME_SCALE,
                x: 217 * GAME_SCALE,
                y: 81 * GAME_SCALE,
                style: {
                    fontFamily: '微软雅黑',
                    fontSize: 30 * GAME_SCALE,
                    color: '0xffc83d',
                    align: 'center'
                }
            }))
        }
    }
    prop.generalHistoryItem = function(index, cardsData, curMatch) {
        var cardsArr = [];
        var curMatchArr = curMatch.toString().split('');
        var matchX = (curMatchArr.length >= 2 ? 0 : 10);
        $(backgroundRrefix + 'HistoryListItems').addChild($.container(backgroundRrefix + 'HistoryItem' + index, {
            y: index * 50 * GAME_SCALE,
            width: 225 * GAME_SCALE,
            height: 48 * GAME_SCALE,
            backgroundColor: '0xffffff,0'
        }));
        $(backgroundRrefix + 'HistoryItem' + index).addChild($.text(backgroundRrefix + 'HistoryColText' + index, curMatch, {
            x: matchX * GAME_SCALE,
            y: 5 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 30 * GAME_SCALE,
                color: '0xffffff',
            }
        }));
        $(backgroundRrefix + 'HistoryItem' + index).addChild($.container(backgroundRrefix + 'HistoryItem' + index + 'Line', {
            x: 40 * GAME_SCALE,
            y: 49 * GAME_SCALE,
            width: 175 * GAME_SCALE,
            height: 1 * GAME_SCALE,
            backgroundColor: '0x1b2c77'
        }));
        for (var i in cardsData) {
            cardsArr.push(cardsData[i]);
        }
        var firstData = cardsArr[0];
        $(backgroundRrefix + 'HistoryItem' + index).addChild($.container(backgroundRrefix + 'HistoryCol' + index + '-1', {
            x: 11 * GAME_SCALE,
            y: 0 * GAME_SCALE,
            width: 91 * GAME_SCALE,
            height: 101 * GAME_SCALE,
        }));
        $(backgroundRrefix + 'HistoryCol' + index + '-1').addChild($.text(backgroundRrefix + 'HistoryCol' + index + '-1-Value', (firstData.is_win == '1' ? '闲': '庄'), {
            x: 31 * GAME_SCALE,
            y: 4 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 30 * GAME_SCALE,
                color: '0xffffff',
            }
        }));
        var secondData = cardsArr[1];
        $(backgroundRrefix + 'HistoryItem' + index).addChild($.container(backgroundRrefix + 'HistoryCol' + index + '-2', {
            x: 78 * GAME_SCALE,
            y: 0 * GAME_SCALE,
            width: 91 * GAME_SCALE,
            height: 101 * GAME_SCALE,
        }));
        $(backgroundRrefix + 'HistoryCol' + index + '-2').addChild($.text(backgroundRrefix + 'HistoryCol' + index + '-2-Value', (secondData.is_win == '1' ? '闲': '庄'), {
            x: 31 * GAME_SCALE,
            y: 4 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 30 * GAME_SCALE,
                color: '0xffffff',
            }
        }));
        var threeData = cardsArr[2];
        $(backgroundRrefix + 'HistoryItem' + index).addChild($.container(backgroundRrefix + 'HistoryCol' + index + '-3', {
            x: 145 * GAME_SCALE,
            y: 0 * GAME_SCALE,
            width: 91 * GAME_SCALE,
            height: 101 * GAME_SCALE,
        }));
        $(backgroundRrefix + 'HistoryCol' + index + '-3').addChild($.text(backgroundRrefix + 'HistoryCol' + index + '-3-Value', (threeData.is_win == '1' ? '闲': '庄'), {
            x: 31 * GAME_SCALE,
            y: 4 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 30 * GAME_SCALE,
                color: '0xffffff',
            }
        }))
    }
    prop.generalHistoryPanel = function() {
        if ($(backgroundRrefix + 'HistoryPanel')) {
            $(backgroundRrefix + 'HistoryPanel').remove();
        }
        $.container(backgroundRrefix + 'HistoryPanel', {
            x: 0,
            y: 0,
            width: $.width,
            height: $.height
        });
        $(backgroundRrefix + 'HistoryPanel').get().interactive = true;
        $(backgroundRrefix + 'HistoryPanel').addChild($.container(backgroundRrefix + 'HistoryPanelMask', {
            x: 0,
            y: 0,
            width: $.width,
            height: $.height,
            backgroundColor: '0x000000,0'
        }));
        $(backgroundRrefix + 'HistoryPanelMask').on('pointerdown',
            function() {
                $(backgroundRrefix + 'HistoryPanelMask').off('pointerdown');
                if ($(backgroundRrefix + 'HistoryListItems')) {
                    $(backgroundRrefix + 'HistoryListItems').off('pointerdown');
                    $(backgroundRrefix + 'HistoryListItems').off('pointerdown');
                    $(backgroundRrefix + 'HistoryListItems').off('pointerup');
                    $(backgroundRrefix + 'HistoryListItems').off('pointeroutside');
                }
                $(backgroundRrefix + 'HistoryPanel').remove();
            });
        $(backgroundRrefix + 'HistoryPanel').addChild($.container(backgroundRrefix + 'HistoryPanelContainer', {
            width: 324 * GAME_SCALE,
            height: 694 * GAME_SCALE,
            x: $(backgroundRrefix + 'HistoryBtn').x - 250 * GAME_SCALE,
            y: $(backgroundRrefix + 'HistoryBtn').y - 754 * GAME_SCALE
        }));
        $(backgroundRrefix + 'HistoryPanelContainer').addChild($.container(backgroundRrefix + 'HistoryPanelContent', {
            width: 324 * GAME_SCALE,
            height: 694 * GAME_SCALE,
            x: 0 * GAME_SCALE,
            y: 52 * GAME_SCALE,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '0x806635',
            backgroundColor: '0x232a44,.85'
        }));
        $(backgroundRrefix + 'HistoryPanelContent').addChild($.text(backgroundRrefix + 'HistoryText', '历史记录', {
            x: 0,
            y: 9 * GAME_SCALE,
            width: 324 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 36 * GAME_SCALE,
                color: '0xffc83d',
                align: 'center',
                letterSpacing: '.5',
            }
        }));
        $(backgroundRrefix + 'HistoryPanelContent').addChild($.container(backgroundRrefix + 'HistoryPanelContentOuter', {
            x: 29 * GAME_SCALE,
            y: 120 * GAME_SCALE,
            width: 267 * GAME_SCALE,
            height: 562 * GAME_SCALE,
            borderRadius: 15,
            backgroundColor: '0x4458ae'
        }));
        $(backgroundRrefix + 'HistoryPanelContentOuter').addChild($.container(backgroundRrefix + 'HistoryListTitle', {
            width: 175 * GAME_SCALE,
            height: 47 * GAME_SCALE,
            x: 50 * GAME_SCALE,
            y: 11 * GAME_SCALE,
        }));
        $(backgroundRrefix + 'HistoryListTitle').addChild($.text('historyShun', '顺', {
            x: 0,
            y: -2,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 36 * GAME_SCALE,
                color: '0xffc83d',
            }
        }));
        $(backgroundRrefix + 'HistoryListTitle').addChild($.text('historyTian', '天', {
            x: 68 * GAME_SCALE,
            y: -2,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 36 * GAME_SCALE,
                color: '0xffc83d',
            }
        }));
        $(backgroundRrefix + 'HistoryListTitle').addChild($.text('historyDi', '地', {
            x: 136 * GAME_SCALE,
            y: -2,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 36 * GAME_SCALE,
                color: '0xffc83d',
            }
        }));
        $(backgroundRrefix + 'HistoryListTitle').addChild($.container(backgroundRrefix + 'HistoryTitleLine', {
            x: 0 * GAME_SCALE,
            y: 49 * GAME_SCALE,
            width: 175 * GAME_SCALE,
            height: 1 * GAME_SCALE,
            backgroundColor: '0x1b2c77'
        }));
        $(backgroundRrefix + 'HistoryPanelContentOuter').addChild($.container(backgroundRrefix + 'HistoryListItems', {
            x: 11 * GAME_SCALE,
            y: 60 * GAME_SCALE,
            width: 245 * GAME_SCALE,
            height: 490 * GAME_SCALE,
            backgroundColor: '0xffffff,0'
        }));
        $(backgroundRrefix + 'HistoryPanelContentOuter').addChild($.graphics(backgroundRrefix + 'HistoryMask', {
            x: 11 * GAME_SCALE,
            y: 60 * GAME_SCALE,
            width: 245 * GAME_SCALE,
            height: 490 * GAME_SCALE,
            backgroundColor: '0xa7aeb2',
        }));
        $(backgroundRrefix + 'HistoryListItems').get().mask = $(backgroundRrefix + 'HistoryMask').get();
        $(backgroundRrefix + 'HistoryListItems').on('pointerdown',
            function(e) {
                this.dragging = true;
                startY = e.data.global.y;
                itemsY = $(backgroundRrefix + 'HistoryListItems').y;
            });
        $(backgroundRrefix + 'HistoryListItems').on('pointermove',
            function(e) {
                if (!this.dragging) return false;
                moveY = e.data.global.y;
                var distanceY = itemsY + moveY - startY;
                if (distanceY < 270 - $(backgroundRrefix + 'HistoryListItems').height()) {
                    distanceY = 270 - $(backgroundRrefix + 'HistoryListItems').height();
                }
                if (distanceY > 30) {
                    distanceY = 30;
                }
                $(backgroundRrefix + 'HistoryListItems').position(5, distanceY);
            });
        $(backgroundRrefix + 'HistoryListItems').on('pointerup',
            function(e) {
                this.dragging = false;
            });
        $(backgroundRrefix + 'HistoryListItems').on('pointeroutside',
            function(e) {
                this.dragging = false;
            });
        return this;
    }
    prop.generalRulePanel = function() {
        if ($(backgroundRrefix + 'RulePanel')) {
            $(backgroundRrefix + 'RulePanel').remove();
        }
        var zhuang_type = (Page.zhuang_type == '1' ? '自由抢庄': '超级庄家');
        var modeText = (Page.zhuang_type == '1' ? '筹码:': '上庄:');
        var modeValue = (Page.modeValue.toString());
        var matches = (Page.max_matches == '12' ? '12局X3': '24局X6');
        $.container(backgroundRrefix + 'RulePanel', {
            x: 0,
            y: 0,
            width: $.width,
            height: $.height
        });
        $(backgroundRrefix + 'RulePanel').get().interactive = true;
        $(backgroundRrefix + 'RulePanel').addChild($.container(backgroundRrefix + 'RulePanelMask', {
            x: 0,
            y: 0,
            width: $.width,
            height: $.height,
            backgroundColor: '0x000000,.8'
        }));
        $(backgroundRrefix + 'RulePanel').addChild($.container(backgroundRrefix + 'RulePanelContainer', {
            width: 686 * GAME_SCALE,
            height: 450 * GAME_SCALE,
            x: 45 * GAME_SCALE,
            y: 300 * GAME_SCALE
        }));
        $(backgroundRrefix + 'RulePanelContainer').addChild($.container(backgroundRrefix + 'RulePanelContent', {
            width: 658 * GAME_SCALE,
            height: 400 * GAME_SCALE,
            x: 0 * GAME_SCALE,
            y: 52 * GAME_SCALE,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '0x806635',
            backgroundColor: '0x232a44,.65'
        }));
        $(backgroundRrefix + 'RulePanelContent').addChild($.container(backgroundRrefix + 'RulePanelContentOuter', {
            x: 29 * GAME_SCALE,
            y: 30 * GAME_SCALE,
            width: 600 * GAME_SCALE,
            height: 335 * GAME_SCALE,
            borderRadius: 15,
            backgroundColor: '0x4458ae'
        }));
        $(backgroundRrefix + 'RulePanelContentOuter').addChild($.container(backgroundRrefix + 'Rule1', {
            width: 535 * GAME_SCALE,
            height: 89 * GAME_SCALE,
            y: 0 * GAME_SCALE,
            x: 30 * GAME_SCALE
        }));
        $(backgroundRrefix + 'Rule1').addChild($.text('Rule1Text', '模式:', {
            x: 0,
            y: 27 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 30 * GAME_SCALE,
                color: '0xe8b24c',
            }
        }));
        $(backgroundRrefix + 'Rule1').addChild($.text('Rule1Value', zhuang_type, {
            x: 90 * GAME_SCALE,
            y: 30 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 26 * GAME_SCALE,
                color: '0xffd380',
            }
        }));
        $(backgroundRrefix + 'Rule1').addChild($.graphics(backgroundRrefix + 'Rule1Line', {
            x: 0 * GAME_SCALE,
            y: 88 * GAME_SCALE,
            width: 535 * GAME_SCALE,
            height: 1 * GAME_SCALE,
            backgroundColor: '0x29397f'
        }));
        $(backgroundRrefix + 'RulePanelContentOuter').addChild($.container(backgroundRrefix + 'Rule2', {
            width: 535 * GAME_SCALE,
            height: 80 * GAME_SCALE,
            y: 89 * GAME_SCALE,
            x: 30 * GAME_SCALE
        }));
        $(backgroundRrefix + 'Rule2').addChild($.text('Rule2Text', modeText, {
            x: 0,
            y: 23 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 30 * GAME_SCALE,
                color: '0xe8b24c',
            }
        }));
        $(backgroundRrefix + 'Rule2').addChild($.text('Rule2Value', modeValue, {
            x: 90 * GAME_SCALE,
            y: 26 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 26 * GAME_SCALE,
                color: '0xffd380',
            }
        }));
        $(backgroundRrefix + 'Rule2').addChild($.graphics(backgroundRrefix + 'Rule2Line', {
            x: 0 * GAME_SCALE,
            y: 79 * GAME_SCALE,
            width: 535 * GAME_SCALE,
            height: 1 * GAME_SCALE,
            backgroundColor: '0x29397f'
        }));
        $(backgroundRrefix + 'RulePanelContentOuter').addChild($.container(backgroundRrefix + 'Rule3', {
            width: 535 * GAME_SCALE,
            height: 80 * GAME_SCALE,
            y: 169 * GAME_SCALE,
            x: 30 * GAME_SCALE
        }));
        $(backgroundRrefix + 'Rule3').addChild($.text('Rule3Text', '下注上限:', {
            x: 0,
            y: 23 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 30 * GAME_SCALE,
                color: '0xe8b24c',
            }
        }));
        $(backgroundRrefix + 'Rule3').addChild($.text('Rule3Value', Page.max_point, {
            x: 145 * GAME_SCALE,
            y: 26 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 26 * GAME_SCALE,
                color: '0xffd380',
            }
        }));
        $(backgroundRrefix + 'Rule3').addChild($.graphics(backgroundRrefix + 'Rule3Line', {
            x: 0 * GAME_SCALE,
            y: 79 * GAME_SCALE,
            width: 535 * GAME_SCALE,
            height: 1 * GAME_SCALE,
            backgroundColor: '0x29397f'
        }));
        $(backgroundRrefix + 'RulePanelContentOuter').addChild($.container(backgroundRrefix + 'Rule4', {
            width: 535 * GAME_SCALE,
            height: 80 * GAME_SCALE,
            y: 249 * GAME_SCALE,
            x: 30 * GAME_SCALE
        }));
        $(backgroundRrefix + 'Rule4').addChild($.text('Rule4Text', '局数:', {
            x: 0,
            y: 23 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 30 * GAME_SCALE,
                color: '0xe8b24c',
            }
        }));$(backgroundRrefix + 'Rule4').addChild($.text('Rule4Value', matches, {
            x: 90 * GAME_SCALE,
            y: 26 * GAME_SCALE,
            style: {
                fontFamily: '微软雅黑',
                fontSize: 26 * GAME_SCALE,
                color: '0xffd380',
            }
        }));$(backgroundRrefix + 'RulePanelContainer').addChild($.sprite(backgroundRrefix + 'RuleCloseBtn', 'game-close', {
                x: 290 * GAME_SCALE,
                y: 470 * GAME_SCALE,
                width: 68 * GAME_SCALE,
                height: 76 * GAME_SCALE
            },
            'gameSpritesheetJson'));
        $(backgroundRrefix + 'RuleCloseBtn').off('pointerdown');
        $(backgroundRrefix + 'RuleCloseBtn').on('pointerdown',
            function() {
                $(backgroundRrefix + 'RulePanel').remove();
            });
    }
    prop.ToggleMusicBtn = function(toggleValue) {
        var _this = this;
        var musicSpriteName = toggleValue == 1 ? 'game-music': 'game-music2';
        if ($(backgroundRrefix + 'MusicToggleBtn')) {
            $(this.getMusicToggleBtnPrefix()).off('pointerdown');
            $(backgroundRrefix + 'MusicToggleBtn').remove();
        }
        if ($(backgroundRrefix + 'Container')) {
            $(backgroundRrefix + 'Container').addChild($.sprite(backgroundRrefix + 'MusicToggleBtn', musicSpriteName, {
                    width: 83 * GAME_SCALE,
                    height: 85 * GAME_SCALE,
                    x: $.width - (95 * GAME_SCALE),
                    y: $.height - (217 * GAME_SCALE)
                },
                'gameSpritesheetJson'));
        }
        $(this.getMusicToggleBtnPrefix()).on('pointerdown',
            function() {
                if (!storage.get('pausemusic')) {
                    storage.set('pausemusic', 1);
                    sound.stopSound('bgm');
                    _this.ToggleMusicBtn(0);
                } else {
                    storage.rm('pausemusic');
                    if (!sound.isloaded) {
                        sound.load();
                    }
                    sound.playSound('bgm', true);
                    _this.ToggleMusicBtn(1);
                }
            });
    }
    prop.getMusicToggleBtnPrefix = function() {
        return backgroundRrefix + 'MusicToggleBtn';
    }
    prop.getBackGroundPrefix = function() {
        return backgroundRrefix + 'Container';
    }
    prop.addRuleTouchEvent = function(callback) {
        if ($(backgroundRrefix + 'RuleBtn')) {
            $(backgroundRrefix + 'RuleBtn').off('touchstart',
                function() {});
            $(backgroundRrefix + 'RuleBtn').on('touchstart',
                function() {
                    callback();
                });
        }
    }
    prop.addMusicToggleEvent = function(callback) {
        if ($(backgroundRrefix + 'MusicToggleBtn')) {
            $(backgroundRrefix + 'MusicToggleBtn').off('touchstart',
                function() {});
            $(backgroundRrefix + 'MusicToggleBtn').on('touchstart',
                function() {
                    callback();
                })
        }
    }
    prop.addHistoryEvent = function(callback) {
        if ($(backgroundRrefix + 'HistoryBtn')) {
            $(backgroundRrefix + 'HistoryBtn').off('pointertap',
                function() {});
            $(backgroundRrefix + 'HistoryBtn').on('pointertap',
                function() {
                    callback();
                })
        }
    }
    prop.addChatEvent = function(callback) {
        if ($(backgroundRrefix + 'ChatBtn')) {
            $(backgroundRrefix + 'ChatBtn').off('pointertap',
                function() {});
            $(backgroundRrefix + 'ChatBtn').on('pointertap',
                function() {
                    callback();
                })
        }
        return this;
    }
    prop.setSettlementState = function(_settlementState) {
        settlementState = _settlementState;
    }
    prop.getSettlementState = function() {
        return settlementState;
    }
    prop.setCurrentMatch = function(_currentmatch) {
        currentMatch = _currentmatch;
    }
    prop.getCurrentMatch = function() {
        return currentMatch;
    }
    prop.setHistoryData = function(data) {
        historyData = data;
    }
    prop.getHistoryData = function() {
        return historyData;
    }
    return BackGroundPanel;
})();
var ChipEntity = (function() {
    function ChipEntity() {};
    var prop = ChipEntity.prototype;
    prop.generalChip = function(playerPos, chipPos, value, startPosition, parent, callback) {
        if (playerPos == null || chipPos == null) {
            console.warn('参数出错，构建卡牌视图失败！');
            return;
        }
        this.chipValue = value;
        this.pos = chipPos;
        this.playerPos = playerPos;
        this.chip_prefix = 'player' + playerPos + 'Pos' + this.pos + 'Chip' + this.chipValue + (Math.random());
        if (parent) {
            if (typeof(parent) == 'object') {
                parent.addChild($.sprite(this.chip_prefix, 'chouma-' + this.chipValue, {
                        width: 35 * GAME_SCALE,
                        height: 35 * GAME_SCALE,
                        x: startPosition.x,
                        y: startPosition.y
                    },
                    'gameSpritesheetJson'))
            } else if ((typeof parent) == 'string') {
                $(parent).addChild($.sprite(this.chip_prefix, 'chouma-' + this.chipValue, {
                        width: 35 * GAME_SCALE,
                        height: 35 * GAME_SCALE,
                        x: startPosition.x,
                        y: startPosition.y
                    },
                    'gameSpritesheetJson'))
            }
        } else {
            $.sprite(this.chip_prefix, 'chouma-' + this.chipValue, {
                    width: 35 * GAME_SCALE,
                    height: 35 * GAME_SCALE,
                    x: startPosition.x,
                    y: startPosition.y
                },
                'gameSpritesheetJson')
        }
        if (typeof(callback) == 'function') {
            callback();
        }
        return this;
    }
    prop.getChipPos = function() {
        return this.pos;
    }
    prop.remove = function() {
        if ($(this.chip_prefix)) {
            $(this.chip_prefix).remove();
        }
    }
    prop.showChipAnimation = function(endPosition, time, callback) {
        var _this = this;
        $(this.chip_prefix).animation({
                x: endPosition.x,
                y: endPosition.y
            },
            time,
            function() {
                if (typeof(callback) == 'function') {
                    setTimeout(function() {
                            callback(_this);
                        },
                        100)
                }
            })
    }
    return ChipEntity;
})();
var PlayerEntity = (function(playerBase) {
    function PlayerEntity(data) {
        playerBase.call(this, data);
    }
    $.class(PlayerEntity, playerBase);
    var prop = PlayerEntity.prototype;
    var _this;
    prop.editPlayerStyle = function() {
        this.addStyleForPlayerBefore($.container(this.getPlayerPrefix() + 'userInfoBg', {
            width: 100 * GAME_SCALE,
            height: 152 * GAME_SCALE,
            backgroundColor: "0x000000,.45",
            borderRadius: 24 * GAME_SCALE,
            x: -3,
            y: -3
        }), this.getPlayerPrefix());
        return this;
    }
    prop.chipIn = function(value, parent, position, isAnimation) {
        this.generalChipInPanel(value, parent, position, isAnimation);
    }
    prop.removeChipInEntity = function() {
        if (this.chipArr) {
            for (var j = 0; j < this.chipArr.length; j++) {
                this.chipArr[j].remove()
            }
            this.chipArr.splice(0, this.chipArr.length);
        }
    }
    prop.removeChipInPanel = function() {
        if ($(this.getPlayerPrefix() + 'ChipInContainer')) {
            $(this.getPlayerPrefix() + 'ChipInContainer').remove();
        }
    }
    prop.generalChipInPanel = function(_value, parent, position, isAnimation) {
        var value = parseInt(_value);
        this.showChipEntity(value, parent, position, isAnimation);
    }
    prop.showChipEntity = function(value, parent, position, isAnimation, callback) {
        var _this = this;
        if (!this.chipArr) {
            this.chipArr = new Array();
        }
        var chipEntity = new ChipEntity();
        if (!isAnimation) {
            chipEntity.generalChip(_this.getPos(), _this.chipArr.length, value, ({
                x: position.x,
                y: position.y
            }), parent, callback);
        } else {
            chipEntity.generalChip(_this.getPos(), _this.chipArr.length, value, ({
                x: (playersConfig.getInstance().getPositionByPos(_this.getPos())).x + 3,
                y: (playersConfig.getInstance().getPositionByPos(_this.getPos())).y
            }), parent).showChipAnimation({
                    x: position.x,
                    y: position.y
                },
                200);
        }
        if (chipEntity != null) {
            _this.chipArr.push(chipEntity);
        }
    }
    prop.showStateTips = function(parent) {}
    prop.generalPrepareButton = function(parent) {
        this.removePrepareButton();
        var _this = this;
        if (this.getPos() == 0) {
            if (parent) {
                if (typeof(parent) == 'object') {
                    parent.addChild($.sprite(this.getPlayerPrefix() + 'prepareButton', 'prepare-btn', {
                            x: 284 * GAME_SCALE,
                            y: $.height - 346 * GAME_SCALE,
                            width: 187 * GAME_SCALE,
                            height: 82 * GAME_SCALE
                        },
                        'gameSpritesheetJson'));
                } else if (typeof(parent) == 'string') {
                    $(parent).addChild($.sprite(this.getPlayerPrefix() + 'prepareButton', 'prepare-btn', {
                            x: 284 * GAME_SCALE,
                            y: $.height - 346 * GAME_SCALE,
                            width: 187 * GAME_SCALE,
                            height: 82 * GAME_SCALE
                        },
                        'gameSpritesheetJson'));
                }
            } else {
                $.sprite(this.getPlayerPrefix() + 'prepareButton', 'prepare-btn', {
                        x: 284 * GAME_SCALE,
                        y: $.height - 346 * GAME_SCALE,
                        width: 187 * GAME_SCALE,
                        height: 82 * GAME_SCALE
                    },
                    'gameSpritesheetJson');
            }
        }
        $(this.getPlayerPrefix() + 'prepareButton').off('pointerdown');
        $(this.getPlayerPrefix() + 'prepareButton').on('pointerdown',
            function() {
                zhunbei();
                //ws.send('', 'ready', _this.getUserId());
            });
    }
    prop.removePrepareButton = function() {
        if (this.getUserId() == user.id) {
            if ($(this.getPlayerPrefix() + 'prepareButton')) {
                $(this.getPlayerPrefix() + 'prepareButton').off('pointerdown');
                $(this.getPlayerPrefix() + 'prepareButton').remove();
            }
        }
    }
    prop.removePrepareText = function() {
        if ($(this.getPlayerPrefix() + 'PrepareText')) {
            $(this.getPlayerPrefix() + 'PrepareText').off('pointerdown');
            $(this.getPlayerPrefix() + 'PrepareText').remove();
        }
    }
    prop.generalPlayerPrepareText = function(parent) {
        this.removePrepareText();
        var prepareTextwidth = this.getUserId() == user.id ? 76 : 47;
        var prepareFontSize = this.getUserId() == user.id ? 38.22 : 24;
        if (parent) {
            if (typeof(parent) == 'object') {
                parent.addChild($.text(this.getPlayerPrefix() + 'PrepareText', '准备', {
                    width: prepareTextwidth * GAME_SCALE,
                    x: playersConfig.getInstance().getPrepareTextPosition(this.getPos()).x,
                    y: playersConfig.getInstance().getPrepareTextPosition(this.getPos()).y,
                    style: {
                        fontFamily: "微软雅黑",
                        fontSize: prepareFontSize * GAME_SCALE,
                        color: ['0xffffff', '0xf8da2e', '0xf8da2e'],
                        align: 'center',
                    }
                }));
            } else if (typeof(parent) == 'string') {
                $(parent).addChild($.text(this.getPlayerPrefix() + 'PrepareText', '准备', {
                    width: prepareTextwidth * GAME_SCALE,
                    x: playersConfig.getInstance().getPrepareTextPosition(this.getPos()).x,
                    y: playersConfig.getInstance().getPrepareTextPosition(this.getPos()).y,
                    style: {
                        fontFamily: "微软雅黑",
                        fontSize: prepareFontSize * GAME_SCALE,
                        color: ['0xffffff', '0xf8da2e', '0xf8da2e'],
                        align: 'center',
                    }
                }));
            }
        } else {
            $.text(this.getPlayerPrefix() + 'PrepareText', '准备', {
                width: prepareTextwidth * GAME_SCALE,
                x: playersConfig.getInstance().getPrepareTextPosition(this.getPos()).x,
                y: playersConfig.getInstance().getPrepareTextPosition(this.getPos()).y,
                style: {
                    fontFamily: "微软雅黑",
                    fontSize: prepareFontSize * GAME_SCALE,
                    color: ['0xffffff', '0xf8da2e', '0xf8da2e'],
                    align: 'center',
                }
            })
        }
    }
    prop.clearPlayerScore = function() {
        if ($(this.getPlayerPrefix() + 'playerScore')) {
            $(this.getPlayerPrefix() + 'playerScore').remove();
        }
    }
    prop.generalPlayerScore = function(value, parent) {
        var container = $(this.getPlayerPrefix());
        var textX = 0;
        var textY = 40;
        var symbol = parseInt(value) > 0 ? '+': '';
        var textColor = parseInt(value) > 0 ? '0xf5b52e': '0xd3d3d3';
        $(parent).addChild($.text(this.getPlayerPrefix() + 'playerScore', symbol + value, {
            x: container.x + textX,
            y: container.y + textY,
            width: '41.7',
            style: {
                fontFamily: "微软雅黑",
                fontSize: 30 * GAME_SCALE,
                color: textColor,
                align: 'center',
                boxShadow: '2 1 5 0xdddddd',
            },
            alpha: 0
        }));
        $(this.getPlayerPrefix() + 'playerScore').animation({
                y: container.y - 20,
                alpha: 1
            },
            200);
    }
    prop.removeTips = function() {
        if ($(this.getPlayerPrefix() + 'CardTypeText')) {
            $(this.getPlayerPrefix() + 'CardTypeText').remove();
        }
    }
    prop.removeXianTips = function() {
        if ($(this.getPlayerPrefix() + 'XianjiaCardTypeText')) {
            $(this.getPlayerPrefix() + 'XianjiaCardTypeText').remove();
        }
    }
    prop.clearDealCardTips = function() {
        if ($(this.getPlayerPrefix() + 'DealCardText')) {
            $(this.getPlayerPrefix() + 'DealCardText').remove();
        }
    }
    prop.showDealCardTips = function(parent) {
        var isCurrentUser = this.getUserId() == user.id ? true: false;
        var x = isCurrentUser ? 163 : playersConfig.getInstance().getPositionByPos(this.getPos()).x + 4;
        var y = isCurrentUser ? $.height - (255 * GAME_SCALE) : playersConfig.getInstance().getPositionByPos(this.getPos()).y - 20;
        var cardTypeText = isCurrentUser ? '请庄家发牌': '庄家发牌中';
        var cardTypeFontSize = isCurrentUser ? 38.22 : 20;
        var cardTypeColor = isCurrentUser ? ['0xffffff', '0xf8da2e', '0xf8da2e'] : '0xdcab30';
        this.removeTips();
        if (parent) {
            if (typeof(parent) == 'object') {
                parent.addChild($.text(this.getPlayerPrefix() + 'DealCardText', cardTypeText, {
                    x: x,
                    y: y,
                    width: 75 * GAME_SCALE,
                    height: 24 * GAME_SCALE,
                    style: {
                        fontFamily: "微软雅黑",
                        fontSize: cardTypeFontSize * GAME_SCALE,
                        color: cardTypeColor,
                        align: 'center',
                        fontWeight: 'bold'
                    }
                }));
            } else if (typeof(parent) == 'string') {
                $(parent).addChild($.text(this.getPlayerPrefix() + 'DealCardText', cardTypeText, {
                    x: x,
                    y: y,
                    width: 75 * GAME_SCALE,
                    height: 24 * GAME_SCALE,
                    style: {
                        fontFamily: "微软雅黑",
                        fontSize: cardTypeFontSize * GAME_SCALE,
                        color: cardTypeColor,
                        align: 'center',
                        fontWeight: 'bold'
                    }
                }));
            }
        } else {
            $.text(this.getPlayerPrefix() + 'DealCardText', cardTypeText, {
                x: x,
                y: y,
                width: 75 * GAME_SCALE,
                height: 24 * GAME_SCALE,
                style: {
                    fontFamily: "微软雅黑",
                    fontSize: cardTypeFontSize * GAME_SCALE,
                    color: cardTypeColor,
                    align: 'center',
                    fontWeight: 'bold'
                }
            });
        }
    }
    prop.showXianTips = function(parent) {
        if (this.getUserId() != user.id) {
            return;
        }
        var x = 150;
        var y = $.height - (410 * GAME_SCALE);
        this.removeXianTips();
        if (parent) {
            if (typeof(parent) == 'object') {
                parent.addChild($.text(this.getPlayerPrefix() + 'XianjiaCardTypeText', '闲家下注中', {
                    x: x,
                    y: y,
                    width: 140 * GAME_SCALE,
                    height: 31 * GAME_SCALE,
                    style: {
                        fontFamily: "微软雅黑",
                        fontSize: 28 * GAME_SCALE,
                        color: '0xdcab30',
                        align: 'center',
                    }
                }));
            } else if (typeof(parent) == 'string') {
                $(parent).addChild($.text(this.getPlayerPrefix() + 'XianjiaCardTypeText', '闲家下注中', {
                    x: x,
                    y: y,
                    width: 140 * GAME_SCALE,
                    height: 31 * GAME_SCALE,
                    style: {
                        fontFamily: "微软雅黑",
                        fontSize: 28 * GAME_SCALE,
                        color: '0xdcab30',
                        align: 'center',
                    }
                }));
            }
        } else {
            $.text(this.getPlayerPrefix() + 'XianjiaCardTypeText', '闲家下注中', {
                x: x,
                y: y,
                width: 140 * GAME_SCALE,
                height: 31 * GAME_SCALE,
                style: {
                    fontFamily: "微软雅黑",
                    fontSize: 28 * GAME_SCALE,
                    color: '0xdcab30',
                    align: 'center',
                }
            });
        }
    }
    prop.showTips = function(parent) {
        if (this.getUserId() != user.id) {
            return;
        }
        var x = 163;
        var y = $.height - (255 * GAME_SCALE);
        var cardTypeText = '请下注';
        var cardTypeFontSize = 38.22;
        var cardTypeColor = ['0xffffff', '0xf8da2e', '0xf8da2e'];
        this.removeTips();
        if (parent) {
            if (typeof(parent) == 'object') {
                parent.addChild($.text(this.getPlayerPrefix() + 'CardTypeText', cardTypeText, {
                    x: x,
                    y: y,
                    width: 75 * GAME_SCALE,
                    height: 24 * GAME_SCALE,
                    style: {
                        fontFamily: "微软雅黑",
                        fontSize: cardTypeFontSize * GAME_SCALE,
                        color: cardTypeColor,
                        align: 'center',
                        fontWeight: 'bold'
                    }
                }));
            } else if (typeof(parent) == 'string') {
                $(parent).addChild($.text(this.getPlayerPrefix() + 'CardTypeText', cardTypeText, {
                    x: x,
                    y: y,
                    width: 75 * GAME_SCALE,
                    height: 24 * GAME_SCALE,
                    style: {
                        fontFamily: "微软雅黑",
                        fontSize: cardTypeFontSize * GAME_SCALE,
                        color: cardTypeColor,
                        align: 'center',
                        fontWeight: 'bold'
                    }
                }));
            }
        } else {
            $.text(this.getPlayerPrefix() + 'CardTypeText', cardTypeText, {
                x: x,
                y: y,
                width: 75 * GAME_SCALE,
                height: 24 * GAME_SCALE,
                style: {
                    fontFamily: "微软雅黑",
                    fontSize: cardTypeFontSize * GAME_SCALE,
                    color: cardTypeColor,
                    align: 'center',
                    fontWeight: 'bold'
                }
            });
        }
    }
    prop.showQiangZhuangTips = function(value, parent) {
        var isCurrentUser = this.getUserId() == user.id ? true: false;
        var x = isCurrentUser ? 163 : playersConfig.getInstance().getPositionByPos(this.getPos()).x + 4;
        var y = isCurrentUser ? $.height - (255 * GAME_SCALE) : playersConfig.getInstance().getPositionByPos(this.getPos()).y - 20;
        var cardTypeText = value == '0' ? '不抢': '抢庄';
        var cardTypeFontSize = isCurrentUser ? 58.22 : 30;
        var cardTypeColor = isCurrentUser ? ['0xffffff', '0xf8da2e', '0xf8da2e'] : '0xdcab30';
        this.removeTips();
        if (parent) {
            if (typeof(parent) == 'object') {
                parent.addChild($.text(this.getPlayerPrefix() + 'QiangZhuangText', cardTypeText, {
                    x: x,
                    y: y,
                    width: 75 * GAME_SCALE,
                    height: 24 * GAME_SCALE,
                    style: {
                        fontFamily: "微软雅黑",
                        fontSize: cardTypeFontSize * GAME_SCALE,
                        color: cardTypeColor,
                        align: 'center',
                        fontWeight: 'bold'
                    }
                }));
            } else if (typeof(parent) == 'string') {
                $(parent).addChild($.text(this.getPlayerPrefix() + 'QiangZhuangText', cardTypeText, {
                    x: x,
                    y: y,
                    width: 75 * GAME_SCALE,
                    height: 24 * GAME_SCALE,
                    style: {
                        fontFamily: "微软雅黑",
                        fontSize: cardTypeFontSize * GAME_SCALE,
                        color: cardTypeColor,
                        align: 'center',
                        fontWeight: 'bold'
                    }
                }));
            }
        } else {
            $.text(this.getPlayerPrefix() + 'QiangZhuangText', cardTypeText, {
                x: x,
                y: y,
                width: 75 * GAME_SCALE,
                height: 24 * GAME_SCALE,
                style: {
                    fontFamily: "微软雅黑",
                    fontSize: cardTypeFontSize * GAME_SCALE,
                    color: cardTypeColor,
                    align: 'center',
                    fontWeight: 'bold'
                }
            });
        }
    }
    prop.clearQiangZhuangTips = function() {
        if ($(this.getPlayerPrefix() + 'QiangZhuangText')) {
            $(this.getPlayerPrefix() + 'QiangZhuangText').remove();
        }
    }
    prop.playerChipInSound = function(chip_value, sex) {
        var playSoundName = 0;
        switch (chip_value) {
            case 2:
                playSoundName = 101;
                break;
            case 6:
                playSoundName = 99;
                break;
            case 7:
                playSoundName = 98;
                break;
            case 9:
                playSoundName = 102;
                break;
        }
        sound.play(playSoundName, sex);
        if (playSoundName == 101 || playSoundName == 99 || playSoundName == 98) {
            sound.play('sound_101');
        }
    }
    prop.removePlayActionPanel = function() {}
    prop.generalPlayerContainer = function() {}
    prop.generalZhuangBtn = function(parent) {
        $(parent).addChild($.sprite(this.getPlayerPrefix() + 'ZhuangBtn', 'qj_btn', {
                width: 130 * GAME_SCALE,
                height: 60 * GAME_SCALE,
                x: 205 * GAME_SCALE,
                y: $.height - (293 * GAME_SCALE)
            },
            'gameSpritesheetJson'));
        $(this.getPlayerPrefix() + 'ZhuangBtn').off('pointerdown');
        $(this.getPlayerPrefix() + 'ZhuangBtn').on('pointerdown',
            function() {
                qbank(1);
                //ws.send(1, 'grabZhuang');
            });
        $(parent).addChild($.sprite(this.getPlayerPrefix() + 'NoZhuangBtn', 'no_qj_btn', {
                width: 130 * GAME_SCALE,
                height: 60 * GAME_SCALE,
                x: 390 * GAME_SCALE,
                y: $.height - (293 * GAME_SCALE)
            },
            'gameSpritesheetJson'));$(this.getPlayerPrefix() + 'NoZhuangBtn').off('pointerdown');
        $(this.getPlayerPrefix() + 'NoZhuangBtn').on('pointerdown',
            function() {
                qbank(0);
                //ws.send(0, 'grabZhuang');
            })
    }
    prop.clearZhuangBtn = function() {
        if ($(this.getPlayerPrefix() + 'ZhuangBtn')) {
            $(this.getPlayerPrefix() + 'ZhuangBtn').off('pointerdown');
            $(this.getPlayerPrefix() + 'ZhuangBtn').remove();
        }
        if ($(this.getPlayerPrefix() + 'NoZhuangBtn')) {
            $(this.getPlayerPrefix() + 'NoZhuangBtn').off('pointerdown');
            $(this.getPlayerPrefix() + 'NoZhuangBtn').remove();
        }
    }
    prop.removeDealCardBtn = function() {
        if ($(this.getPlayerPrefix() + 'DealCardBtn')) {
            $(this.getPlayerPrefix() + 'DealCardBtn').off('pointerdown');
            $(this.getPlayerPrefix() + 'DealCardBtn').remove()
        };
    }
    prop.generalDealCardBtn = function(parent) {
        if (parent) {
            if (typeof(parent) == 'object') {
                $(parent).addChild($.sprite(this.getPlayerPrefix() + 'DealCardBtn', 'fapai-btn', {
                        width: 102 * GAME_SCALE,
                        height: 52 * GAME_SCALE,
                        x: 324 * GAME_SCALE,
                        y: $.height - (190 * GAME_SCALE)
                    },
                    'gameSpritesheetJson'));
            } else if (typeof(parent) == 'string') {
                $(parent).addChild($.sprite(this.getPlayerPrefix() + 'DealCardBtn', 'fapai-btn', {
                        width: 102 * GAME_SCALE,
                        height: 52 * GAME_SCALE,
                        x: 324 * GAME_SCALE,
                        y: $.height - (190 * GAME_SCALE)
                    },
                    'gameSpritesheetJson'));
            }
        } else {
            $.sprite(this.getPlayerPrefix() + 'DealCardBtn', 'fapai-btn', {
                    width: 102 * GAME_SCALE,
                    height: 52 * GAME_SCALE,
                    x: 324 * GAME_SCALE,
                    y: $.height - (190 * GAME_SCALE)
                },
                'gameSpritesheetJson');
        }
        $(this.getPlayerPrefix() + 'DealCardBtn').off('pointerdown');
        $(this.getPlayerPrefix() + 'DealCardBtn').on('pointerdown',
            function() {
                sendfp();
                //ws.send('', 'clickDealsCards');
            });
    }
    prop.generalChooseDealCardBtn = function(value) {
        var valueArr = value.toString().split('');
        var width = (valueArr.length >= 2) ? 40 : 19;
        var textX = (valueArr.length >= 2) ? 12 : 17;
        var btnX = $(this.getPlayerPrefix() + 'chipIn-' + value).x;
        if ($(this.getPlayerPrefix() + 'PlayActionPanel')) {
            if ($(this.getPlayerPrefix() + 'choose-chipIn-btn')) $(this.getPlayerPrefix() + 'choose-chipIn-btn').remove();
            $(this.getPlayerPrefix() + 'PlayActionPanel').addChild($.container(this.getPlayerPrefix() + 'choose-chipIn-btn', {
                    x: btnX,
                    y: $.height - (86 * GAME_SCALE),
                    width: 90 * GAME_SCALE,
                    height: 50 * GAME_SCALE,
                    background: 'url(chouma-choose-btn) 0 0 / 100% 100%',
                },
                'gameSpritesheetJson'));
            $(this.getPlayerPrefix() + 'choose-chipIn-btn').get().interactive = false;
            $(this.getPlayerPrefix() + 'choose-chipIn-btn').addChild($.sprite(this.getPlayerPrefix() + 'chipIn-text', 'text-choose-' + value, {
                    width: width * GAME_SCALE,
                    height: 30 * GAME_SCALE,
                    x: textX,
                    y: 5
                },
                'gameSpritesheetJson'));
        }
        $(this.getPlayerPrefix() + 'choose-chipIn-btn').on('pointerdown',
            function() {
                return;
            })
    }
    prop.removePlayerActionPanel = function() {
        if ($(this.getPlayerPrefix() + 'chipIn-1-text')) {
            $(this.getPlayerPrefix() + 'chipIn-1-text').remove();
        }
        if ($(this.getPlayerPrefix() + 'chipIn-1')) {
            $(this.getPlayerPrefix() + 'chipIn-1').remove();
        }
        if ($(this.getPlayerPrefix() + 'chipIn-5-text')) {
            $(this.getPlayerPrefix() + 'chipIn-5-text').remove();
        }
        if ($(this.getPlayerPrefix() + 'chipIn-5')) {
            $(this.getPlayerPrefix() + 'chipIn-5').remove();
        }
        if ($(this.getPlayerPrefix() + 'chipIn-10-text')) {
            $(this.getPlayerPrefix() + 'chipIn-10-text').remove();
        }
        if ($(this.getPlayerPrefix() + 'chipIn-10')) {
            $(this.getPlayerPrefix() + 'chipIn-10').remove();
        }
        if ($(this.getPlayerPrefix() + 'chipIn-30-text')) {
            $(this.getPlayerPrefix() + 'chipIn-30-text').remove();
        }
        if ($(this.getPlayerPrefix() + 'chipIn-30')) {
            $(this.getPlayerPrefix() + 'chipIn-30').remove();
        }
        if ($(this.getPlayerPrefix() + 'PlayActionPanel')) {
            $(this.getPlayerPrefix() + 'PlayActionPanel').remove();
        }
    }
    prop.generalPlayActionPanel = function(parent) {
        _this = this;
        if (this.getUserId() == user.id) {
            if (parent) {
                if (typeof(parent) == 'object') {
                    parent.addChild($.container(this.getPlayerPrefix() + 'PlayActionPanel', {}))
                } else if (typeof(parent) == 'string') {
                    $(parent).addChild($.container(this.getPlayerPrefix() + 'PlayActionPanel', {}))
                }
            } else {
                $.container(this.getPlayerPrefix() + 'PlayActionPanel', {})
            }
            $(this.getPlayerPrefix() + 'PlayActionPanel').get().chooseChipInName = this.getPlayerPrefix() + 'chipIn-1';
            $(this.getPlayerPrefix() + 'PlayActionPanel').addChild($.container(this.getPlayerPrefix() + 'chipIn-1', {
                    x: 242 * GAME_SCALE,
                    y: $.height - (86 * GAME_SCALE),
                    width: 90 * GAME_SCALE,
                    height: 50 * GAME_SCALE,
                    background: 'url(chouma-btn) 0 0 / 100% 100%',
                },
                'gameSpritesheetJson'));
            $(this.getPlayerPrefix() + 'chipIn-1').off('pointerdown');
            $(this.getPlayerPrefix() + 'chipIn-1').on('pointerdown',
                function() {
                    localStorage.chooseValue = '1';
                    _this.generalChooseDealCardBtn(localStorage.chooseValue);
                });
            $(this.getPlayerPrefix() + 'chipIn-1').addChild($.sprite(this.getPlayerPrefix() + 'chipIn-1-text', 'text-1', {
                    width: 19 * GAME_SCALE,
                    height: 29 * GAME_SCALE,
                    x: 36 * GAME_SCALE,
                    y: 5
                },
                'gameSpritesheetJson'));
            $(this.getPlayerPrefix() + 'PlayActionPanel').addChild($.container(this.getPlayerPrefix() + 'chipIn-5', {
                    x: 339 * GAME_SCALE,
                    y: $.height - (86 * GAME_SCALE),
                    width: 90 * GAME_SCALE,
                    height: 50 * GAME_SCALE,
                    background: 'url(chouma-btn) 0 0 / 100% 100%',
                },
                'gameSpritesheetJson'));
            $(this.getPlayerPrefix() + 'chipIn-5').off('pointerdown');
            $(this.getPlayerPrefix() + 'chipIn-5').on('pointerdown',
                function() {
                    localStorage.chooseValue = '5';
                    _this.generalChooseDealCardBtn(localStorage.chooseValue);
                });
            $(this.getPlayerPrefix() + 'chipIn-5').addChild($.sprite(this.getPlayerPrefix() + 'chipIn-5-text', 'text-5', {
                    width: 18 * GAME_SCALE,
                    height: 30 * GAME_SCALE,
                    x: 36 * GAME_SCALE,
                    y: 5
                },
                'gameSpritesheetJson'));
            $(this.getPlayerPrefix() + 'PlayActionPanel').addChild($.container(this.getPlayerPrefix() + 'chipIn-10', {
                    x: 436 * GAME_SCALE,
                    y: $.height - (86 * GAME_SCALE),
                    width: 90 * GAME_SCALE,
                    height: 50 * GAME_SCALE,
                    background: 'url(chouma-btn) 0 0 / 100% 100%',
                },
                'gameSpritesheetJson'));
            $(this.getPlayerPrefix() + 'chipIn-10').off('pointerdown');
            $(this.getPlayerPrefix() + 'chipIn-10').on('pointerdown',
                function() {
                    localStorage.chooseValue = '10';
                    _this.generalChooseDealCardBtn(localStorage.chooseValue);
                });
            $(this.getPlayerPrefix() + 'chipIn-10').addChild($.sprite(this.getPlayerPrefix() + 'chipIn-10-text', 'text-10', {
                    width: 40 * GAME_SCALE,
                    height: 30 * GAME_SCALE,
                    x: 12,
                    y: 5
                },
                'gameSpritesheetJson'));
            $(this.getPlayerPrefix() + 'PlayActionPanel').addChild($.container(this.getPlayerPrefix() + 'chipIn-30', {
                    x: 532 * GAME_SCALE,
                    y: $.height - (86 * GAME_SCALE),
                    width: 90 * GAME_SCALE,
                    height: 50 * GAME_SCALE,
                    background: 'url(chouma-btn) 0 0 / 100% 100%',
                },
                'gameSpritesheetJson'));
            $(this.getPlayerPrefix() + 'chipIn-30').off('pointerdown');
            $(this.getPlayerPrefix() + 'chipIn-30').on('pointerdown',
                function() {
                    localStorage.chooseValue = '30';
                    _this.generalChooseDealCardBtn(localStorage.chooseValue);
                });
            $(this.getPlayerPrefix() + 'chipIn-30').addChild($.sprite(this.getPlayerPrefix() + 'chipIn-30-text', 'text-30', {
                    width: 41 * GAME_SCALE,
                    height: 30 * GAME_SCALE,
                    x: 25 * GAME_SCALE,
                    y: 5
                },
                'gameSpritesheetJson'));
        }
    }
    prop.generalBanker = function(parent) {
        var position = playersConfig.getInstance().getBankerPos(this.getPos());
        if ($('banker')) {
            $('banker').position(position.x, position.y);
        } else {
            if (parent) {
                if (typeof(parent) == 'object') {
                    parent.addChildBefore($.sprite('banker', 'zhuang', {
                            width: 30 * GAME_SCALE,
                            height: 30 * GAME_SCALE,
                            x: position.x,
                            y: position.y
                        },
                        'gameSpritesheetJson'))
                } else if (typeof(parent) == 'string') {
                    $(parent).addChildBefore($.sprite('banker', 'zhuang', {
                            width: 30 * GAME_SCALE,
                            height: 30 * GAME_SCALE,
                            x: position.x,
                            y: position.y
                        },
                        'gameSpritesheetJson'))
                }
            } else {
                $.sprite('banker', 'zhuang', {
                        width: 30 * GAME_SCALE,
                        height: 30 * GAME_SCALE,
                        x: position.x,
                        y: position.y
                    },
                    'gameSpritesheetJson')
            }
        }
    }
    return PlayerEntity;
})(PlayerBase);
var players = {};
var time = 0;
var Page = {
    running: '',
    code: '',
    shareData: {},
    join: function() {
        Page.init();
    },
    create: function() {
        document.addEventListener("visibilitychange",
            function() {
                if (!document.hidden) {
                    var count = 0;
                    for (var i in players) {
                        count++;
                    };
                    Game.clearGreenPanel();
                    setTimeout(function() {
                            Game.clearSaizi();
                        },
                        600);
                    setTimeout(function() {
                            Game.clearGold();
                        },
                        600 * count);
                }
            });
        Game.drawBackGround();
    },
    load: function(fn) {
        var _this = this;
        if (location.href.split('code=').length < 2) {
            //$.alert('非法访问！');
            //return;
        }
        resourceController.getInstance().loadResource(textureConfig.getInstance().getSpriteSheet(),
            function() {
                //Page.code = location.href.split('code=')[1].split('&')[0];
                Page.code = '';
                $.texture(textureConfig.getInstance().getTextures());
                Page.create();
                win.closeLoading();
                fn();
                _this.wsCallback();
            })
    },
    init: function() {
        ws.send('init');
    },
    getCurrentPlayerPosition: function(user_list) {
        var currentPlayerPosition = 0;
        if (user_list) {
            for (var i = 0; i < user_list.length; i++) {
                if (user_list[i].user_id == user.id) {
                    currentPlayerPosition = user_list[i].position;
                    break;
                }
            }
            return currentPlayerPosition;
        }
    },
    parsePositionToPos: function(position, currPlayerPosition) {
        if (position == '0') {
            alert('position不应该等于0');
            Page.init();
            return;
        }
        var PlayerPosition = currPlayerPosition;
        var temp = PlayerPosition - parseInt(position);
        var pos = 0;
        if (temp < 0) {
            pos = 10 - Math.abs(temp);
        } else if (temp > 0) {
            pos = temp
        } else {
            pos = 0;
        }
        return pos;
    },
    playerPosValidate: function(playerData, pos) {
        var count = 0;
        for (var j in players) {
            count++;
            if (players[j].pos == pos && players[j].user_id != playerData.user_id) {
                return '-1';
            } else if (players[j].pos == pos && players[j].user_id == playerData.user_id) {
                return '0';
            } else {
                return '1';
            }
        }
        if (count == 0) {
            return '1';
        } else {
            return '-1';
        }
    },
    ready: function() {
        if (Page.ready && Page.ready == '1') return;
        Page.ready = '1';
        this.loadBgm();
        (function ready() {
            if (typeof(Page.shareData.title) == 'string') {
                share(Page.shareData.title, Page.shareData.description, Page.shareData.link, Page.shareData.path);
            } else {
                setTimeout(ready, 1000);
            }
        })();
    },
    gameInit: function(d) {
        var user_list = d.room_users;
        if (user_list) {
            if (user_list.length > 10) {
                wx.closeWindow()
            }
        }
        if (0) {
            if (d.info == 0) {
                $.alert('加入房间失败');
            } else if (d.info == -1) {
                $.alert('房间号错误');
            } else if (d.info == 1) {
                $.alert('房间已结束')
            } else if (d.info == 2) {
                $.alert('该房间人数已满');
            }
        } else {
            if (DEBUG) {
                //if (!ExceptionController.checkCallBackData('init', d)) {
                //return;
                //}
            }
            Page.running = d.running;
            Page.cur_match = d.cur_match;
            Page.max_matches = d.max_matches;
            Page.zhuang_type = d.zhuang_type;
            Page.max_point = d.room_rule.max_point;
            if (Page.zhuang_type == '1') {
                Page.modeValue = d.chip;
            } else if (Page.zhuang_type == '2') {
                Page.modeValue = d.zhuang_value;
            }
            var description = '模式:' + (Page.zhuang_type == 1 ? '自由抢庄': '固定庄家') + (Page.zhuang_type == 1 ? ' 筹码:': ' 上庄:') + Page.modeValue.toString() + ' 下注上限:' + Page.max_point + ' 局数:' + d.max_matches + '局×' + parseInt(d.max_matches) / 4 + '房卡';
            if (win.app > 0) {
                app_command('share',
                    function() {
                        return WEB_TITLE + '：二八杠' + '\n\r' + description + '\n\r房间ID：' + d.number + '\n\r房间链接：http://' + DOMAIN + '/pushBobbin.html?code=' + Page.code;
                    });
            } else {
                Page.shareData = {
                    title: '二八杠(房间:' + d.number + ')',
                    description: description,
                    link: location.href,
                    path: 'http://img.lfzgame.com/images/texasholdem/game-texasholdem.jpg'
                };
            }
            setTitle(Page.shareData.title);
            Game.initGamePanel();
            Game.generalRound(d.cur_match, d.max_matches);
            Game.generalPlayerNullPositionBg();
            Game.generalPlayers(d.room_users, d.running, d.end_points);
            FlowController.gamePublicFlow(d, parseInt(d.running))
        }
    },
    wsCallback: function() {
        /*Page.gameInit({
            "room_rule" : {
                "max_point" : 30 // 最大下注
            },
            "cur_match" : 0, // 当前局数
            "max_matches" : 24, // 总局数
            "zhuang_type" : 1, // 庄家类型
            "chip" : "1，5，10，30", // 下注筹码字符
            "room_users" : []
        });*/
        /*Game.playerJoin({
            "position" : 0,
            "user_id" : 1736
        });*/
        ws.callback.init = function(data) {
            Page.gameInit(data);
        }
        ws.callback.playerjoin = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('playerjoin', data)) {
                    return;
                }
            }
            Game.playerJoin(data);
        };
        ws.callback.playerleave = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('playerleave', data)) {
                    return;
                }
            }
            Game.playerLeave(data)
        };
        ws.callback.start = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('start', data)) {
                    return;
                }
            }
            if (data.running) {
                Page.running = data.running;
            }
            Page.cur_match = data.cur_match;
            Game.backGroundPanel.setSettlementState(false);
            Game.startGame(data);
        }
        ws.callback.grabZhuang = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('grabZhuang', data)) {
                    return;
                }
            }
            if (data.zhuang_multiple == '1') {
                sound.play(101, data.sex);
            } else if (data.zhuang_multiple == '0') {
                sound.play(102, data.sex);
            }
            Game.clearQiangZhuangBtn(data);
            Game.showQiangZhuangTips(data);
        }
        ws.callback.clickDealsCards = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('clickDealsCards', data)) {
                    return;
                }
            }
            if (data.running) {
                Page.running = data.running;
            }
            Game.clearTimerState();
            Game.generalDealCardBtn(data);
        }
        ws.callback.dealCards = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('dealCards', data)) {
                    return;
                }
            }
            if (data.running) {
                Page.running = data.running;
            }
            Game.clearTimerState();
            Game.showMajongType(data);
            setTimeout(function() {
                    Game.dealMajongToBlock(data, true);
                },
                2000);
        }
        ws.callback.autoAnte = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('autoAnte', data)) {
                    return;
                }
            }
            if (data.running) {
                Page.running = data.running;
            }
            Game.clearSaizi();
            if (data.master_id == user.id) {
                players['u_' + user.id].showXianTips();
            }
            for (var i = 0; i < data.xianjia_user_ids.length; i++) {
                var player = players['u_' + data.xianjia_user_ids[i]];
                if (player.getUserId() == user.id) {
                    player.showTips(Game.gamePanel.getGamePanelPrefix());
                    Game.chipInPanel.initBlockClickState(true);
                    player.generalPlayActionPanel(Game.gamePanel.getGamePanelPrefix());
                    player.generalChooseDealCardBtn(localStorage.chooseValue ? localStorage.chooseValue: '1');
                }
            }
        }
        ws.callback.ready = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('ready', data)) {
                    return;
                }
            }
            Page.running = 0;
            Game.generalPlayerPrepareText(data);
        };
        ws.callback.timer = function(data) {
            Game.toggleTimerState(data);
        };
        ws.callback.getCardsLog = function(data) {
            Game.backGroundPanel.setHistoryData(data);
            Game.showHistory(data);
        }
        ws.callback.showdownOver = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('showdownOver', data)) {
                    return;
                }
            }
            if (data.running) {
                Page.running = data.running;
            }
            var blockControlArr = Game.chipInPanel.blockControlArr;
            for (var i in players) {
                players[i].removeTips();
                players[i].removeXianTips();
            }
            players['u_' + user.id].removePlayerActionPanel();
            Game.chipInPanel.initBlockClickState(false);
            setTimeout(function() {
                    var count = 0;
                    for (var n in data.cards) { (function(index, blockName) {
                        setTimeout(function() {
                                var majong1Value = data.cards[blockName][0].value;
                                var majongObject1 = blockControlArr[index][0];
                                var majong2Value = data.cards[blockName][1].value;
                                var majongObject2 = blockControlArr[index][1];
                                var majongTip = Game.chipInPanel.getPointTips(data.card_code[blockName].point, data.card_code[blockName].code);
                                var musicName = Game.chipInPanel.getMusicTips(data.card_code[blockName].point, data.card_code[blockName].code);
                                sound.play(musicName);
                                majongObject1.playMajongMC(majong1Value);
                                majongObject2.playMajongMC(majong2Value);
                                Game.chipInPanel.generalBlockTips(Game.chipInPanel.parseResponseToBlockName(blockName), majongTip);
                                if (index == 3) {
                                    var count2 = 0;
                                    for (var m in data.cards) { (function(index, blockName) {
                                        var isWin = data.card_code[blockName].is_win;
                                        Game.generalShineToBlock(blockName, isWin);
                                    })(count2, m);
                                        count2++;
                                    }
                                }
                            },
                            index * 1000);
                    })(count, n);
                        count++;
                    }
                },
                2000);
        }
        ws.callback.setAnte = function(data) {
            if (data == '-1') {
                Game.showMaxPointTips();
                return;
            }
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('setAnte', data)) {
                    return;
                }
            }
            sound.play('sound_4_4');
            Game.playerChipIn(data, true);
        }
        ws.callback.selectedMaster = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('selectedMaster', data)) {
                    return;
                }
            }
            if (data.running) {
                Page.running = data.running;
            }
            Game.clearTimerState();
            Game.clearQiangZuangTips();
            Game.clearQiangZhuangBtn(user.id);
            Game.generalBanker(data.random_users, data.master_userid, data.master_value);
        }
        ws.callback.initCards = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('initCards', data)) {
                    return;
                }
            }
            if (data.running) {
                Page.running = data.running;
            }
            Game.clearTimerState();
            Game.chipInPanel.dealMajong(true);
        }
        ws.callback.chipInStart = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('chipInStart', data)) {
                    return;
                }
            }
            sound.play('sound_103');
            Game.generalPlayActionPanel(data);
            Game.setPlayerEndPoint(data.user_id, data.value);
        }
        ws.callback.chipIn = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('chipIn', data)) {
                    return;
                }
            }
            ExceptionController.setExpectedResultData('callbackChipInData', data);
            Game.playerChipIn(data, true);
        }
        ws.callback.roomGameOver = function(data) {
            Game.roomGameOver(data);
        };
        ws.callback.chat = function(data) {
            Game.playChat(data);
        }
        ws.callback.gameRunning = function(data) {
            Game.gameRunning(data);
        }
        ws.callback.settlement = function(data) {
            if (DEBUG) {
                if (!ExceptionController.checkCallBackData('settlement', data)) {
                    return;
                }
            }
            Game.backGroundPanel.setSettlementState(true);
            Game.settlement(data);
        }
        window._ws = ws;
    },
    loadBgm: function() {
        Game.loadBgm();
    }
};
var FlowController = (function() {
    function FlowController() {}
    FlowController.init = function() {
        this.FlowControlArr = new Array();
        this.FlowControlArr[0] = new Array();
        this.FlowControlArr[0][0] = function(player, playerData, endPoints) {
            if (playerData.ready && playerData.ready == '1') {
                player.generalPlayerPrepareText(Game.gamePanel.getGamePanelPrefix());
            } else {
                if (player.getUserId() == user.id) {
                    player.generalPrepareButton(Game.gamePanel.getGamePanelPrefix())
                }
            }
            if (playerData.is_master == '1') {
                player.generalBanker(Game.gamePanel.getGamePanelPrefix());
            }
        }
        this.FlowControlArr[1] = new Array();
        this.FlowControlArr[1][0] = function(player, playerData, endPoints) {
            if (playerData.ready && playerData.ready == '1') {
                player.generalPlayerPrepareText(Game.gamePanel.getGamePanelPrefix());
            } else {
                if (player.getUserId() == user.id) {
                    player.generalPrepareButton(Game.gamePanel.getGamePanelPrefix())
                }
            }
            if (playerData.is_master == '1') {
                player.generalBanker(Game.gamePanel.getGamePanelPrefix());
            }
        }
        this.FlowControlArr[2] = new Array();
        this.FlowControlArr[2][0] = function(player, playerData, endPoints) {
            if (!playerData.is_grabzhuang) {
                if (player.getUserId() == user.id && player.is_join == '1') {
                    player.generalZhuangBtn(Game.gamePanel.getGamePanelPrefix());
                }
            } else {
                player.showQiangZhuangTips(playerData.is_grabzhuang, Game.gamePanel.getGamePanelPrefix());
            }
        }
        this.FlowControlArr[3] = new Array();
        this.FlowControlArr[3][0] = function(player, playerData, endPoints) {
            if (playerData.is_master == '1') {
                player.generalBanker(Game.gamePanel.getGamePanelPrefix());
            }
        }
        this.FlowControlArr[4] = new Array();
        this.FlowControlArr[4][0] = function(player, playerData, endPoints) {
            if (playerData.is_master == '1') {
                player.generalBanker(Game.gamePanel.getGamePanelPrefix());
            } else {}
        }
        this.FlowControlArr[4][1] = function(data) {
            Game.chipInPanel.dealMajong(false);
        }
        this.FlowControlArr[5] = new Array();
        this.FlowControlArr[5][0] = function(player, playerData, endPoints) {
            if (playerData.is_master == '1') {
                player.generalBanker(Game.gamePanel.getGamePanelPrefix());
                player.showDealCardTips(Game.gamePanel.getGamePanelPrefix());
            }
            if (playerData.is_master == '1' && player.getUserId() == user.id) {
                player.generalDealCardBtn(Game.gamePanel.getGamePanelPrefix());
            }
        }
        this.FlowControlArr[5][1] = function(anteData) {
            Game.chipInPanel.dealMajong(false);
            Game.chipInPanel.initBlockClickState(false);
            if (anteData && anteData.length > 0) {
                for (var i = 0; i < anteData.length; i++) {}
            }
        }
        this.FlowControlArr[6] = new Array();
        this.FlowControlArr[6][0] = function(player, playerData, endPoints) {
            if (playerData.is_master == '1') {
                player.generalBanker(Game.gamePanel.getGamePanelPrefix());
            }
        }
        this.FlowControlArr[6][1] = function(data) {
            var dicesData = data.dices.dices;
            var anteData = data.ante;
            Game.chipInPanel.dealMajong(false);
            Game.chipInPanel.initBlockClickState(false);
            Game.dealMajongToBlock(data, false);
            Game.showDownMojong(data, false);
            Game.generalSaizi(dicesData[0], dicesData[1]);
        }
        this.FlowControlArr[7] = new Array();
        this.FlowControlArr[7][0] = function(player, playerData, endPoints) {
            if (playerData.is_master == '1') {
                player.generalBanker(Game.gamePanel.getGamePanelPrefix());
                player.showXianTips(Game.gamePanel.getGamePanelPrefix());
            } else {
                if (playerData.is_join == '0') {
                    return;
                }
                player.showTips(Game.gamePanel.getGamePanelPrefix());
                if (player.getUserId() == user.id) {
                    Game.chipInPanel.initBlockClickState(true);
                    player.generalPlayActionPanel(Game.gamePanel.getGamePanelPrefix());
                    player.generalChooseDealCardBtn(localStorage.chooseValue ? localStorage.chooseValue: '1');
                }
            }
        }
        this.FlowControlArr[7][1] = function(data) {
            var dicesData = data.dices.dices;
            var anteData = data.ante;
            Game.chipInPanel.dealMajong(false);
            Game.dealMajongToBlock(data, false);
            Game.showDownMojong(data, false);
            if (anteData && anteData.length > 0) {
                for (var i = 0; i < anteData.length; i++) {
                    Game.initPlayerChipIn(anteData[i]);
                }
            }
        }
        this.FlowControlArr[8] = new Array();
        this.FlowControlArr[8][0] = function(player, playerData, endPoints) {
            if (playerData.is_master == '1') {
                player.generalBanker(Game.gamePanel.getGamePanelPrefix());
            }
        }
        this.FlowControlArr[8][1] = function(data) {
            var dicesData = data.dices.dices;
            var anteData = data.ante;
            Game.chipInPanel.dealMajong(false);
            Game.chipInPanel.initBlockClickState(false);
            Game.dealMajongToBlock(data, false);
            Game.showDownMojong(data, false);
            Game.resetMajong(data);
            if (anteData && anteData.length > 0) {
                for (var i = 0; i < anteData.length; i++) {
                    Game.initPlayerChipIn(anteData[i]);
                }
            }
            var count = 0;
            for (var n in data.cards) { (function(index, blockName) {
                var isWin = data.card_code[blockName].is_win;
                Game.generalShineToBlock(blockName, isWin);
            })(count, n);
                count++;
            }
        }
    }
    FlowController.initPlayer = function(running, player, playerData, endPoints) {
        var flowArr = this.FlowControlArr[running];
        flowArr[0](player, playerData, endPoints);
    }
    FlowController.gamePublicFlow = function(data, running) {
        switch (running) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                this.FlowControlArr[running][1](data);
                break;
            case 5:
                this.FlowControlArr[running][1](data.ante);
                break;
            case 6:
                this.FlowControlArr[running][1](data);
                break;
            case 7:
                this.FlowControlArr[running][1](data);
                break;
            case 8:
                this.FlowControlArr[running][1](data);
                break;
            case 9:
                break;
        }
    }
    return FlowController;
})();
var Game = (function() {
    function Game() {}
    Game.drawBackGround = function() {
        var _this = this;
        if (!this.userPanel) {
            this.userPanel = new UserPanel();
        }
        if (!this.backGroundPanel) {
            this.backGroundPanel = new BackGroundPanel();
        }
        if (!this.gamePanel) {
            this.gamePanel = new GamePanel();
        }
        if (!this.chipInPanel) {
            this.chipInPanel = new ChipInPanel();
        }
        if (!this.chatPanel) {
            this.chatPanel = new ChatBase();
        }
        this.backGroundPanel.addToStage().addChatEvent(function() {
            _this.chatPanel.generalChatPanel().addChatPanelEventLisener();
        }).addHistoryEvent(function() {
            if (_this.backGroundPanel.getCurrentMatch() == Page.cur_match && _this.backGroundPanel.getSettlementState() == false) {
                _this.showHistory(_this.backGroundPanel.getHistoryData());
            } else {
                _this.backGroundPanel.setCurrentMatch(Page.cur_match);
                ws.send('', 'getCardsLog');
            }
        });
        this.userPanel.addToStage();
        this.gamePanel.addToStage();
        this.setRound('0' + '/' + '0' + '局', this.backGroundPanel.getBackGroundPrefix());
        this.chipInPanel.addToStage();
        this.chipInPanel.updateChipInScoreCount('tian', 'big', 0);
        this.chipInPanel.updateChipInScore('tian', 'big', 0);
        this.chipInPanel.updateChipInScoreCount('di', 'big', 0);
        this.chipInPanel.updateChipInScore('di', 'big', 0);
        this.chipInPanel.updateChipInScoreCount('shun', 'big', 0);
        this.chipInPanel.updateChipInScore('shun', 'big', 0);
    }
    Game.showHistory = function(data) {
        var teneralHistoryPanel = this.backGroundPanel.generalHistoryPanel();
        var count = 0;
        var scoreInformation = null;
        if (data) {
            for (var i in data) {
                var curMatch = data[i].cur_match;
                var cardsData = data[i].data;
                if (curMatch && cardsData) {
                    teneralHistoryPanel.generalHistoryItem(count, cardsData, curMatch);
                    count++;
                } else {
                    scoreInformation = data[i];
                }
            }
            teneralHistoryPanel.generalHistoryScore(scoreInformation);
        }
    }
    Game.loadBgm = function() {
        var _this = this;
        var checkBackGroundTimer = setInterval(function() {
                if (_this.backGroundPanel) {
                    clearInterval(checkBackGroundTimer);
                    if (!storage.get('pausemusic')) {
                        _this.backGroundPanel.ToggleMusicBtn(1);
                        sound.load();
                    } else {
                        _this.backGroundPanel.ToggleMusicBtn(0);
                    }
                }
            },
            100)
    }
    Game.gameRunning = function(data) {
        var playerLength = 0;
        for (var i in players) {
            ++playerLength;
        }
        if (data.is_end && data.is_end == '1') {
            Page.init();
            return;
        }
        if (data.running != Page.running || data.cur_match != Page.cur_match || data.users.length != playerLength) {
            Page.init();
            return;
        }
        if (data.users) {
            for (var i in data.users) {
                if (data.users[i][1] == 0) {
                    players['u_' + data.users[i][0]].setOnline(0);
                } else if (data.users[i][1] == 1) {
                    players['u_' + data.users[i][0]].setOnline(1);
                }
            }
        }
    }
    Game.showDownMojong = function(data, animation) {
        this.chipInPanel.showDownMojong(data, animation);
    }
    Game.resetMajong = function(data) {
        this.chipInPanel.resetMajong(data);
    }
    Game.dealMajongToBlock = function(data, animation) {
        this.chipInPanel.dealMajongToBlock(data, animation);
    }
    Game.generalRound = function(curMatch, maxMach) {
        this.setRound(curMatch + '/' + maxMach + '局', this.backGroundPanel.getBackGroundPrefix())
    }
    Game.generalPlayActionPanel = function(data) {
        var player = players['u_' + data.user_id];
        player.removePlayActionPanel();
        player.generalPlayActionPanel(this.gamePanel.getGamePanelPrefix());
    }
    Game.showMaxPointTips = function() {
        if ($('maxPointTips')) {
            return;
        }
        $(this.gamePanel.getGamePanelPrefix()).addChild($.sprite('maxPointTips', 'maxPoint', {
            x: 26 * GAME_SCALE,
            y: $.height - 373 * GAME_SCALE,
            width: 715 * GAME_SCALE,
            height: 123 * GAME_SCALE,
        }));
        setTimeout(function() {
                $('maxPointTips').animation({
                        'alpha': 0
                    },
                    500,
                    function() {
                        $('maxPointTips').remove();
                    });
            },
            1500);
    }
    Game.initPlayerChipIn = function(data) {
        var className = this.chipInPanel.parseResponseToClassName(data.block, data.size);
        for (var i = 0; i < data.chip_value.length; i++) {
            var position = this.chipInPanel.generalBlockRandomPosition(className);
            players['u_' + data.user_id].chipIn(data.chip_value[i], this.gamePanel.getGamePanelPrefix(), position, false);
        }
        players['u_' + data.user_id].setPlayerEndPoint(data.current_value);
        var block = this.chipInPanel.parseResponseToBlockName(data.block);
        var size = this.chipInPanel.parseResponseToSizeName(data.size);
        this.chipInPanel.updateChipInScoreCount(block, size, data.all_value);
        if (data.user_id == user.id) {
            this.chipInPanel.updateChipInScore(block, size, data.value);
        }
    }
    Game.playerChipIn = function(data, animation) {
        var className = this.chipInPanel.parseResponseToClassName(data.block, data.size);
        var position = this.chipInPanel.generalBlockRandomPosition(className);
        players['u_' + data.user_id].chipIn(data.chip_value[0], this.gamePanel.getGamePanelPrefix(), position, animation);
        players['u_' + data.user_id].setPlayerEndPoint(data.current_value);
        var block = this.chipInPanel.parseResponseToBlockName(data.block);
        var size = this.chipInPanel.parseResponseToSizeName(data.size);
        this.chipInPanel.updateChipInScoreCount(block, size, data.all_value);
        if (data.user_id == user.id) {
            this.chipInPanel.updateChipInScore(block, size, data.value);
        }
    }
    Game.generalDealCardBtn = function(data) {
        this.chipInPanel.initBlockClickState(false);
        for (var i in players) {
            players[i].removeTips();
        }
        var player = players['u_' + data.master_id];
        player.showDealCardTips(this.gamePanel.getGamePanelPrefix());
        players['u_' + user.id].removePlayerActionPanel();
        if (player.getUserId() == user.id) {
            player.generalDealCardBtn(this.gamePanel.getGamePanelPrefix());
        }
    }
    Game.showMajongType = function(data) {
        players['u_' + user.id].removeDealCardBtn();
        for (var i in players) {
            players[i].clearDealCardTips();
        }
        this.playSaiziMC(data.dices.dices[0], data.dices.dices[1]);
    }
    Game.playSaiziMC = function(leftsaiziValue, rightsaiziValue) {
        var _this = this;
        var frames = [];
        if ($.container('saiziContainer')) {
            $('saiziContainer').remove();
        }
        $(this.gamePanel.getGamePanelPrefix()).addChild($.container('saiziAnimationContainer', {
            width: 350 * GAME_SCALE,
            height: 350 * GAME_SCALE,
            x: 260 * GAME_SCALE,
            y: 530 * GAME_SCALE,
        }));
        for (var i = 1; i <= 27; i++) {
            frames.push(PIXI.Texture.fromFrame('shaizi_anmi' + i));
        }
        var anim = new PIXI.extras.AnimatedSprite(frames);
        anim.x = 0;
        anim.y = 0;
        anim.width = 450 * GAME_SCALE;
        anim.height = 450 * GAME_SCALE;
        anim.animationSpeed = .65;
        anim.loop = false;
        anim.play();
        anim.onComplete = function() {
            $('saiziAnimationContainer').get().removeChild(anim);
            _this.generalSaizi(leftsaiziValue, rightsaiziValue);
        }
        $('saiziAnimationContainer').get().addChild(anim);
    }
    Game.generalSaizi = function(leftSaiziValue, rightSaiziValue) {
        if (!$('saiziAnimationContainer')) {
            $(this.gamePanel.getGamePanelPrefix()).addChild($.container('saiziAnimationContainer', {
                width: 350 * GAME_SCALE,
                height: 350 * GAME_SCALE,
                x: 260 * GAME_SCALE,
                y: 530 * GAME_SCALE,
            }))
        }
        $('saiziAnimationContainer').addChild($.sprite('leftSaizi', 'shaizi' + leftSaiziValue, {
                width: 57 * GAME_SCALE,
                height: 66 * GAME_SCALE,
                x: 25 * GAME_SCALE,
                y: 120 * GAME_SCALE
            },
            'saiziSpritesheetJson'));
        $('saiziAnimationContainer').addChild($.sprite('rightSaizi', 'shaizi' + rightSaiziValue, {
                width: 57 * GAME_SCALE,
                height: 66 * GAME_SCALE,
                x: 112 * GAME_SCALE,
                y: 110 * GAME_SCALE
            },
            'saiziSpritesheetJson'));
    }
    Game.clearSaizi = function() {
        if ($('leftSaizi')) {
            $('leftSaizi').remove();
        }
        if ($('rightSaizi')) {
            $('rightSaizi').remove();
        }
    }
    Game.showShineSprite = function(user_id) {
        var pos = players['u_' + user_id].getPos();
        var position = playersConfig.getInstance().getPositionByPos(pos);
        if (!$('shineSprite')) {
            $(this.gamePanel.getGamePanelPrefix()).addChild($.sprite('shineSprite', 'shine', {
                    width: 120 * GAME_SCALE,
                    height: 173 * GAME_SCALE,
                    x: position.x - 17 * GAME_SCALE,
                    y: position.y - 17 * GAME_SCALE
                },
                'gameSpritesheetJson'));
        } else {
            $('shineSprite').position(position.x - 17 * GAME_SCALE, position.y - 17 * GAME_SCALE);
        }
    }
    Game.clearShineSprite = function() {
        if ($('shineSprite')) {
            $('shineSprite').remove();
        }
    }
    Game.setPlayerEndPoint = function(user_id, value) {
        players['u_' + user_id].setPlayerEndPoint(value);
    }
    Game.setRound = function(value, parent) {
        if ($('roundText')) {
            $('roundText').remove();
        }
        $(parent).addChild($.container('roundText', {
            width: 107 * GAME_SCALE,
            height: 30 * GAME_SCALE,
            x: 15 * GAME_SCALE,
            y: 19 * GAME_SCALE,
            borderRadius: 30,
            backgroundColor: "0x000000,0.37"
        }));$('roundText').addChild($.text('roundValue', value, {
            width: 107 * GAME_SCALE,
            height: 30 * GAME_SCALE,
            style: {
                fontFamily: "微软雅黑",
                fontSize: 24 * GAME_SCALE,
                color: '0xffffff',
                align: 'center',
                lineHeight: 26 * GAME_SCALE
            }
        }))
    }
    Game.generalBanker = function(random_users, master_userid, master_value) {
        if (random_users.length > 0) {
            this.usersRand(random_users, master_userid, master_value);
        } else {
            this.showShineSprite(master_userid);
            players['u_' + master_userid].generalBanker(this.gamePanel.getGamePanelPrefix());
            setTimeout(function() {
                    Game.clearShineSprite();
                },
                1500);
        }
    }
    Game.generalShineToBlock = function(_blockName, _iswin) {
        var blockName = this.chipInPanel.parseResponseToBlockName(_blockName);
        var size = this.chipInPanel.parseResponseToSizeName(_iswin);
        var blockObject = $(this.chipInPanel.getChipInPanelPrefix() + '-' + blockName + '-' + 'chipin-' + size);
        if (blockObject) {
            blockObject.addChild($.container(this.chipInPanel.getChipInPanelPrefix() + '-' + blockName + '-' + 'chipin-' + size + '-shineborder', {
                width: blockObject.width() - 4,
                height: blockObject.height(),
                x: 0,
                y: 0,
                borderWidth: 3 * GAME_SCALE,
                borderColor: '0xffba30',
                backgroundColor: '0x000000,0'
            }));
        }
    }
    Game.clearShineToBlock = function() {
        var shunBigName = this.chipInPanel.getChipInPanelPrefix() + '-shun-chipin-big-shineborder';
        var tianBigName = this.chipInPanel.getChipInPanelPrefix() + '-tian-chipin-big-shineborder';
        var diBigName = this.chipInPanel.getChipInPanelPrefix() + '-di-chipin-big-shineborder';
        if ($(shunBigName)) {
            $(shunBigName).remove();
        }
        if ($(tianBigName)) {
            $(tianBigName).remove();
        }
        if ($(diBigName)) {
            $(diBigName).remove();
        }
    }
    Game.usersRand = function(users, user_id, master_value) {
        var _this = this;
        var count = Math.round(Math.random() * users.length) + users.length * 3;
        var x = users.indexOf(user_id);
        var n = (count - x - 1) % users.length;
        var i = 0;
        (function av() {
            _this.showShineSprite(users[n]);
            n++;
            i++;
            if (i == count) {
                _this.showShineSprite(user_id);
                if (master_value && parseInt(master_value) > 0) {
                    players['u_' + user_id].setPlayerEndPoint(master_value);
                }
                players['u_' + user_id].generalBanker(_this.gamePanel.getGamePanelPrefix());
                setTimeout(function() {
                        Game.clearShineSprite();
                    },
                    1500);
                return;
            }
            if (n >= users.length) n = 0;
            setTimeout(av, (1000 + (users.length * 500)) / count);
        })();
    }
    Game.roomGameOver = function(data) {
        delete Page.running;
        if (data == 'error') {
            Page.init();
        } else {
            if (win.version == '1.0.0') {
                createRanking(data,
                    function(d) {
                        var img = new Image();
                        img.src = d;
                        if (parseInt(data.users.length) > 6) {
                            img.className = 'room-gameover-ten ';
                        } else {
                            img.className = 'room-gameover';
                        }
                        img.onload = function() {
                            setTimeout(function() {
                                    document.body.appendChild(img);
                                    $('.room-gameover').fadeIn('slow');
                                    $('.body').remove();
                                    $('body').css({
                                        'background': '#000000',
                                        'min-height': 'initial'
                                    });
                                    $(document.body).off('touchmove');
                                    ws.close();
                                },
                                2500)
                        };
                    })
            } else if (win.version == '2.0.0') {
                createRankingV2(data,
                    function(d) {
                        var img = document.createElement('img');
                        if (parseInt(data.users.length) > 6) {
                            img.className = 'room-gameover-ten ranking-img';
                        } else {
                            img.className = 'room-gameover ranking-img';
                        }
                        img.src = d;
                        img.onload = function() {
                            setTimeout(function() {
                                    document.body.style.backgroundColor = '#000000';
                                    document.body.style.minHeight = 'initial';
                                    document.body.appendChild(img);
                                    var div = document.createElement('div');
                                    div.className = 'search-number-box';
                                    document.body.appendChild(div);
                                    var detailedBtn = '<a class="search-number-box-btn" href="pkdetailed.html?code=' + Page.code + (win.app > 0 ? '&app=' + win.app: '') + '" style="position: absolute;"></a>';
                                    div.insertAdjacentHTML("beforeend", detailedBtn);
                                    getRankingSix();
                                    $('.body').remove();
                                    $(document.body).off('touchmove');
                                    ws.close();
                                },
                                2500);
                        };
                    });
            }
        }
    }
    Game.playChat = function(data) {
        sound.play(data.content, data.sex);
        var num = '';
        if (parseInt(data.content) <= 12) {
            switch (parseInt(data.content)) {
                case 0:
                    num = '快点吧，我等到花儿也谢了';
                    break;
                case 1:
                    num = '我出去叫人';
                    break;
                case 2:
                    num = '你的牌好靓哇';
                    break;
                case 3:
                    num = '我当年横扫澳门九条街';
                    break;
                case 4:
                    num = '算你牛逼';
                    break;
                case 5:
                    num = '别吹牛逼，有本事干到底';
                    break;
                case 6:
                    num = '输得裤衩都没了';
                    break;
                case 7:
                    num = '我给你们送温暖了';
                    break;
                case 8:
                    num = '谢谢老板';
                    break;
                case 9:
                    num = '我来啦，让你们久等了';
                    break;
                case 10:
                    num = '我出去一下，马上回来，等我哦';
                    break;
                case 11:
                    num = '怎么断线了，网络太差了';
                    break;
                case 12:
                    num = '搏一搏，单车变摩托';
                    break;
            }
            players['u_' + data.user_id].say(num);
        }
    }
    Game.generalPlayerNullPositionBg = function() {
        for (var i = 0; i < 10; i++) {
            this.generalNullPositionSprite(i);
        }
    }
    Game.clearNullPositionSprite = function(positionIndex) {
        if ($('player' + positionIndex + 'NullPosition')) {
            $('player' + positionIndex + 'NullPosition').remove();
        }
    }
    Game.generalNullPositionSprite = function(positionIndex) {
        var position = playersConfig.getInstance().getPositionByPos(positionIndex);
        if (!$('player' + positionIndex + 'NullPosition')) {
            $(this.backGroundPanel.getBackGroundPrefix()).addChild($.container('player' + positionIndex + 'NullPosition', {
                width: 94 * GAME_SCALE,
                height: 115 * GAME_SCALE,
                x: position.x - 1,
                y: position.y,
                borderRadius: 10,
                backgroundColor: "0x000000,0.43"
            }))
        }
        $('player' + positionIndex + 'NullPosition').addChild($.container('player' + positionIndex + 'NullPositionContent', {
            width: 85 * GAME_SCALE,
            height: 85 * GAME_SCALE,
            x: 2.5,
            y: 2.5,
            borderRadius: 10,
            backgroundColor: "0x3f564b,0.8"
        }));
        if ($('player' + positionIndex + 'NullPositionText')) {
            $('player' + positionIndex + 'NullPositionText').remove();
        }
        $('player' + positionIndex + 'NullPositionContent').addChild($.text('player' + positionIndex + 'NullPositionText', '空位', {
            y: 3 * GAME_SCALE,
            width: 85 * GAME_SCALE,
            height: 85 * GAME_SCALE,
            style: {
                fontFamily: "微软雅黑",
                fontSize: 30 * GAME_SCALE,
                lineHeight: 70 * GAME_SCALE,
                color: '0x8a9d90',
                align: 'center'
            }
        }))
    }
    Game.clearPlayerPrepareText = function() {
        if (players) {
            for (var i in players) {
                players[i].removePrepareText();
            }
        }
    }
    Game.clearPlayerPrepareButton = function() {
        if (players) {
            for (var i in players) {
                players[i].removePrepareButton();
            }
        }
    }
    Game.initGamePanel = function() {
        this.clearTimerState();
        this.clearGold();
        if (Page.zhuang_type == '1') {
            this.clearBanker();
        }
        for (var i in players) {
            players[i].clearPlayerScore();
            players[i].clearQiangZhuangTips();
            players[i].clearZhuangBtn();
            players[i].clearDealCardTips();
            players[i].removeTips();
            players[i].removeXianTips();
            players[i].removeDealCardBtn();
            if (players[i].getUserId() == user.id) {
                players[i].removePlayerActionPanel();
            }
            if (players[i].chipArr && players[i].chipArr.length > 0) {
                for (var j = 0; j < players[i].chipArr.length; j++) {
                    players[i].chipArr[j].remove();
                }
                players[i].chipArr.splice(0, players[i].chipArr.length);
            }
        }
        this.clearShineToBlock();
        var blockControlArr = this.chipInPanel.blockControlArr;
        for (var m = 0; m < blockControlArr.length; m++) {
            for (var n = 0; n < blockControlArr[m].length; n++) {
                blockControlArr[m][n].clearMajong();
            }
        }
        this.chipInPanel.blockControlArr.splice(0, this.chipInPanel.blockControlArr.length);
        var blockNameArr = ['z', 't', 's', 'd'];
        var chipInPanelObject = this.chipInPanel;
        for (var o = 0; o < blockNameArr.length; o++) {
            chipInPanelObject.clearBlockTips(chipInPanelObject.parseResponseToBlockName(blockNameArr[o]));
        }
        this.clearSaizi();
        chipInPanelObject.initBlockClickState(false);
        this.chipInPanel.updateChipInScoreCount('tian', 'big', 0);
        this.chipInPanel.updateChipInScore('tian', 'big', 0);
        this.chipInPanel.updateChipInScoreCount('di', 'big', 0);
        this.chipInPanel.updateChipInScore('di', 'big', 0);
        this.chipInPanel.updateChipInScoreCount('shun', 'big', 0);
        this.chipInPanel.updateChipInScore('shun', 'big', 0);
    }
    Game.generalPlayers = function(user_list, running, endPoints) {
        for (var i in players) {
            players[i].removePrepareText();
            players[i].removePrepareButton();
            players[i].remove();
            delete players[i];
        }
        if (user_list) {
            if (user_list.length > 0) {
                var currentPlayerPosition = Page.getCurrentPlayerPosition(user_list);
                FlowController.init();
                for (var i in user_list) {
                    var player;
                    var pos = Page.parsePositionToPos(user_list[i].position, currentPlayerPosition);
                    var validate = Page.playerPosValidate(user_list[i], pos);
                    if (validate == '-1') {
                        if (DEBUG) {
                            alert(JSON.stringify(user_list));
                            alert(user_list[i].position);
                        }
                        $.alert('此处已经有人', 'error');
                        break;
                    } else if (validate == '0') {
                        player = players['u_' + user_list[i].user_id];
                    } else if (validate == '1') {
                        player = new PlayerEntity(user_list[i]);
                        player.addStyle1PlayerToStage(pos, this.userPanel.getUserPanelPrefix()).editPlayerStyle().setPlayerEndPoint(user_list[i].value);
                    }
                    player.setOnline(user_list[i].online);
                    player.setIsJoin(user_list[i].is_join);
                    this.clearNullPositionSprite(player.getPos());
                    FlowController.initPlayer(parseInt(running), player, user_list[i], endPoints);
                    players['u_' + user_list[i].user_id] = player;
                }
            }
        }
    }
    Game.clearSystemTimer = function() {
        if ($('gameTimer')) {
            $('gameTimer').remove();
        }
    }
    Game.generalPlayerPrepareText = function(playerId) {
        var player = players['u_' + playerId];
        player.setIsJoin(1);
        player.removePrepareButton();
        player.generalPlayerPrepareText(this.gamePanel.getGamePanelPrefix());
    }
    Game.generalPlayerPrepareButton = function(playerId) {
        var player = players['u_' + playerId];
        player.generalPrepareButton(this.gamePanel.getGamePanelPrefix());
    }
    Game.clearQiangZhuangBtn = function(data) {
        if (typeof(data) == 'object') {
            players['u_' + data.user_id].clearZhuangBtn();
        } else if (typeof(data) == 'string') {
            players['u_' + data].clearZhuangBtn();
        }
    }
    Game.showQiangZhuangTips = function(data) {
        players['u_' + data.user_id].showQiangZhuangTips(data.zhuang_multiple);
    }
    Game.clearQiangZuangTips = function() {
        for (var i in players) {
            players[i].clearQiangZhuangTips();
        }
    }
    Game.clearTimerState = function() {
        if ($('gameTimer')) {
            $('gameTimer').remove();
        }
    }
    Game.toggleTimerState = function(value) {
        if (value == '0') {
            if ($('gameTimer')) {
                $('gameTimer').remove();
            }
            return;
        }
        if (!$('gameTimer')) {
            $(this.gamePanel.getGamePanelPrefix()).addChildToLast($.container('gameTimer', {
                width: 295 * GAME_SCALE,
                height: 50 * GAME_SCALE,
                x: 230 * GAME_SCALE,
                y: 183 * GAME_SCALE,
                borderRadius: 30,
                backgroundColor: '0x000000,.15'
            }));$('gameTimer').addChild($.sprite('gameTimerIcon', 'time', {
                    width: 31 * GAME_SCALE,
                    height: 35 * GAME_SCALE,
                    x: 20,
                    y: 4
                },
                'gameSpritesheetJson'));
            $('gameTimer').addChild($.text('gameTimerValue', '剩余 ' + value + ' 秒', {
                x: 160 * GAME_SCALE,
                y: 4 * GAME_SCALE,
                height: 50 * GAME_SCALE,
                width: 35 * GAME_SCALE,
                style: {
                    fontFamily: "微软雅黑",
                    fontSize: 30 * GAME_SCALE,
                    color: '0xf0fff7',
                    align: 'center',
                    lineHeight: 35 * GAME_SCALE
                }
            }))
        } else {
            $('gameTimerValue').remove();
            $('gameTimer').addChild($.text('gameTimerValue', '剩余 ' + value + ' 秒', {
                x: 160 * GAME_SCALE,
                y: 4 * GAME_SCALE,
                width: 35 * GAME_SCALE,
                height: 50 * GAME_SCALE,
                style: {
                    fontFamily: "微软雅黑",
                    fontSize: 30 * GAME_SCALE,
                    color: '0xf0fff7',
                    align: 'center',
                    lineHeight: 35 * GAME_SCALE
                }
            }))
        }
    }
    Game.generalPlayersChipInState = function(data) {}
    Game.playerJoin = function(playerData) {
        if (!players['u_' + playerData.user_id]) {
            var pos = Page.parsePositionToPos(playerData.position, players['u_' + user.id].getBackGroundPosition());
            var validate = Page.playerPosValidate(playerData, pos);
            if (validate == '-1') {
                if (DEBUG) {
                    alert(JSON.stringify(playerData));
                    alert(playerData.position);
                }
                $.alert('此处已经有人', 'error');
            } else if (validate == '0') {} else if (validate == '1') {
                var player = new PlayerEntity(playerData);
                player.addStyle1PlayerToStage(pos, this.userPanel.getUserPanelPrefix()).editPlayerStyle().setPlayerEndPoint(playerData.value);
                this.clearNullPositionSprite(player.getPos());
                players['u_' + playerData.user_id] = player;
            }
        } else {
            players['u_' + playerData.user_id].setOnline(1);
        }
    }
    Game.playerLeave = function(playerData) {
        if (playerData.is_exist == 1) {
            players['u_' + playerData.user_id].setOnline(0);
        } else {
            if (players['u_' + playerData.user_id]) {
                this.generalNullPositionSprite(players['u_' + playerData.user_id].getPos());
                players['u_' + playerData.user_id].removePrepareText();
                players['u_' + playerData.user_id].remove();
                delete players['u_' + playerData.user_id];
            }
        }
    }
    Game.maxZindex = function() {
        if ($(players['u_' + user.id])) {
            if ($(players['u_' + user.id].getPlayerPrefix() + 'SayContainer')) {
                $(players['u_' + user.id].getPlayerPrefix() + 'SayContainer').setChildIndex(players['u_' + user.id].getPlayerPrefix() + 'SayContainer', App.stage.children.length - 1);
            }
            if ($('autoCardbox')) {
                $('autoCardbox').setChildIndex('autoCardbox', App.stage.children.length - 1);
            }
            if ($('chatListContainer')) {
                $('chatListContainer').setChildIndex('chatListContainer', App.stage.children.length - 1);
            }
            if ($('rule_mask')) {
                $('rule_mask').setChildIndex('rule_mask', App.stage.children.length - 1);
            }
        }
    }
    Game.generalZJTCTips = function(_tipsType) {
        var imgUrl = (_tipsType == '1' ? 'zjtcImg': 'zjtpImg');
        var musicUrl = (_tipsType == '1' ? 'sound_3_99': 'sound_3_100');
        setTimeout(function() {
                sound.play(musicUrl);
            },
            450);
        $(this.gamePanel.getGamePanelPrefix()).addChild($.sprite('zjtcTips', imgUrl, {
            x: 0,
            y: 447 * GAME_SCALE,
            width: 715 * GAME_SCALE,
            height: 184 * GAME_SCALE,
        }));
        setTimeout(function() {
                $('zjtcTips').animation({
                        'alpha': 0
                    },
                    500,
                    function() {
                        $('zjtcTips').remove();
                    });
            },
            1500);
    }
    Game.clearGreenPanel = function() {
        if ($(this.chipInPanel.getChipInPanelPrefix() + '-shun-chipin-big-border')) {
            $(this.chipInPanel.getChipInPanelPrefix() + '-shun-chipin-big-border').alpha(0);
        }
        if ($(this.chipInPanel.getChipInPanelPrefix() + '-tian-chipin-big-border')) {
            $(this.chipInPanel.getChipInPanelPrefix() + '-tian-chipin-big-border').alpha(0);
        }
        if ($(this.chipInPanel.getChipInPanelPrefix() + '-di-chipin-big-border')) {
            $(this.chipInPanel.getChipInPanelPrefix() + '-di-chipin-big-border').alpha(0);
        }
    }
    Game.settlement = function(data) {
        var zhuang_id = data[0].user_id;
        var lost_value = data[0].lost_value;
        var get_value = data[0].get_value;
        var userlost = [];
        var userwin = [];
        var _this = this;
        var winState = data[0].win_status;
        var delayTime = 0;
        if (winState == '1' || winState == '2') {
            delayTime = 1000;
            this.generalZJTCTips(winState);
        }
        if (lost_value > 0 && get_value > 0) {
            setTimeout(getValue, 1000);
            setTimeout(lostValue, 3000);
            setTimeout(score, 5000);
            setTimeout(resetGame, 6500);
        } else if (lost_value > 0) {
            setTimeout(lostValue, 1000 + delayTime);
            setTimeout(score, 2000 + delayTime);
            setTimeout(resetGame, 4000 + delayTime);
        } else if (get_value > 0) {
            setTimeout(getValue, 1500 + delayTime);
            setTimeout(score, 2500 + delayTime);
            setTimeout(resetGame, 4500 + delayTime);
        } else if (lost_value == 0 && get_value == 0) {
            setTimeout(score, 1000);
            setTimeout(resetGame, 2000);
        }
        function getValue() {
            for (var b in data) {
                players['u_' + data[b].user_id].setIsJoin(0);
                if (b == 0) continue;
                if (data[b].value < 0) {
                    userlost.push(data[b].user_id);
                }
            }
            _this.gold2(userlost, zhuang_id);
        }
        function lostValue() {
            for (var a in data) {
                if (a == 0) continue;
                if (data[a].value > 0) {
                    userwin.push(data[a].user_id);
                }
            }
            _this.gold(zhuang_id, userwin);
        }
        function score() {
            for (var i in data) { (function(i) {
                players['u_' + data[i].user_id].generalPlayerScore(data[i].value, _this.gamePanel.getGamePanelPrefix());
                setTimeout(function() {
                        players['u_' + data[i].user_id].setPlayerEndPoint(data[i].total_value);
                    },
                    250);
            })(i)
            }
        }
        function resetGame() {
            if (Page.cur_match == Page.max_matches) {
                return;
            }
            if (Page.zhuang_type == '2') {
                if (parseInt(players['u_' + zhuang_id].getPlayerEndPoint()) <= 0) {
                    return;
                }
            }
            players['u_' + user.id].generalPrepareButton(_this.gamePanel.getGamePanelPrefix());
        }
    }
    Game.clearGold = function() {
        if ($('gameGold')) {
            $('gameGold').remove();
        }
        if ($('gameGold2')) {
            $('gameGold2').remove();
        }
    }
    Game.gold = function(user_id, arr) {
        $.container('gameGold');
        for (var j = 0; j < arr.length; j++) {
            for (var i = 0; i < 10; i++) {
                $('gameGold').addChild($.sprite('gold' + i + j, 'bull_coin', {
                        x: $(players['u_' + user_id].getPlayerPrefix()).x + Math.round(Math.random() * 87 * GAME_SCALE * 0.62),
                        y: $(players['u_' + user_id].getPlayerPrefix()).y + Math.round(Math.random() * 87 * GAME_SCALE * 0.62),
                        width: 16.80,
                        height: 16.80,
                    },
                    'gameSpritesheetJson'));
            }
        }
        var k = 0,
            m = 0,
            music_bol = true;
        var time = setInterval(function() {
                for (var j = 0; j < arr.length; j++) {
                    if (music_bol) {
                        sound.play('gold');
                        music_bol = false;
                    }
                    $('gold' + k + j).animation({
                            x: $(players['u_' + arr[j]].getPlayerPrefix()).x + Math.round(Math.random() * 87 * GAME_SCALE * 0.62),
                            y: $(players['u_' + arr[j]].getPlayerPrefix()).y + Math.round(Math.random() * 87 * GAME_SCALE * 0.62),
                        },
                        500,
                        function() {
                            if (m == 0) {}
                            if (m == arr.length * 10 - 1) {
                                App.stage.removeChild($('gameGold').get());
                                for (var u = 0; u < arr.length; u++) {
                                    for (var o = 0; o < 10; o++) {
                                        $('gold' + o + u).remove();
                                    }
                                }
                            }
                            m++
                        })
                };
                k++;
                if (k >= 10) {
                    clearInterval(time);
                }
            },
            50)
    }
    Game.gold2 = function(arr, user_id) {
        $.container('gameGold2');
        for (var j = 0; j < arr.length; j++) {
            for (var i = 0; i < 10; i++) {
                $('gameGold2').addChild($.sprite('gold' + i + j, 'bull_coin', {
                        x: $(players['u_' + arr[j]].getPlayerPrefix()).x + Math.round(Math.random() * ($(players['u_' + arr[j]].getPlayerPrefix()).width() * 0.62)),
                        y: $(players['u_' + arr[j]].getPlayerPrefix()).y + Math.round(Math.random() * ($(players['u_' + arr[j]].getPlayerPrefix()).width() * 0.62)),
                        width: 16.80,
                        height: 16.80,
                    },
                    'gameSpritesheetJson'));
            }
        }
        var k = 0,
            m = 0,
            music_bol = true;
        var time = setInterval(function() {
                for (var q = 0; q < arr.length; q++) {
                    if (music_bol) {
                        sound.play('gold');
                        music_bol = false;
                    }
                    $('gold' + k + q).animation({
                            x: $(players['u_' + user_id].getPlayerPrefix()).x + Math.round(Math.random() * ($(players['u_' + user_id].getPlayerPrefix()).width() * 0.62)),
                            y: $(players['u_' + user_id].getPlayerPrefix()).y + Math.round(Math.random() * ($(players['u_' + user_id].getPlayerPrefix()).width() * 0.62)),
                        },
                        500,
                        function() {
                            if (m == 0) {}
                            if (m == arr.length * 10 - 1) {
                                App.stage.removeChild($('gameGold2').get());
                                for (var u = 0; u < arr.length; u++) {
                                    for (var o = 0; o < 10; o++) {
                                        $('gold' + o + u).remove();
                                    }
                                }
                            }
                            m++
                        })
                };
                k++;
                if (k >= 10) {
                    clearInterval(time);
                }
            },
            50)
    }
    Game.clearBanker = function() {
        if ($('banker')) {
            $('banker').remove();
        }
    }
    Game.generalQiangZhuang = function(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i] == user.id) {
                players['u_' + user.id].generalZhuangBtn(this.gamePanel.getGamePanelPrefix());
            }
        }
    }
    Game.startGame = function(data) {
        var _this = this;
        this.initGamePanel();
        this.clearTimerState();
        this.clearPlayerPrepareButton();
        this.clearPlayerPrepareText();
        this.generalRound(data.cur_match, Page.max_matches);
        this.generalPlayersChipInState(data);
        if (Page.zhuang_type == '1' && players['u_' + user.id].is_join == '1') {
            this.generalQiangZhuang(data.user_ids);
        } else if (Page.zhuang_type == '2' && parseInt(Page.cur_match) <= 1 && players['u_' + user.id].is_join == '1') {
            this.generalQiangZhuang(data.user_ids);
        }
    }
    return Game;
})();