var textureConfig = function() {
    this.instance = null;
};
textureConfig.prototype.textures = {
    background: 'https://cdn-1255620552.file.myqcloud.com/images/pushBobbin/background.jpg'
};
textureConfig.prototype.spriteSheets = {
    gameSpritesheetImage: 'https://cdn-1255620552.file.myqcloud.com/images/pushBobbin/spritesheet/game-spritesheet.png?v=10',
    majiangSpritesheetImage: 'https://cdn-1255620552.file.myqcloud.com/images/pushBobbin/spritesheet/majiang-spritesheet.png?v=10',
    publicSpritesheetImage: 'https://cdn-1255620552.file.myqcloud.com/images/pushBobbin/spritesheet/public-spritesheet.png?v=10',
    saiziSpritesheetImage: 'https://cdn-1255620552.file.myqcloud.com/images/pushBobbin/spritesheet/saizi-spritesheet.png?v=10',
    majiangSpritesheetJson: 'https://cdn-1255620552.file.myqcloud.com/images/pushBobbin/spritesheet/majiang-spritesheet.json?v=10',
    gameSpritesheetJson: 'https://cdn-1255620552.file.myqcloud.com/images/pushBobbin/spritesheet/game-spritesheet.json?v=10',
    publicSpritesheetJson: 'https://cdn-1255620552.file.myqcloud.com/images/pushBobbin/spritesheet/public-spritesheet.json?v=10',
    saiziSpritesheetJson: 'https://cdn-1255620552.file.myqcloud.com/images/pushBobbin/spritesheet/saizi-spritesheet.json?v=10',
    zjtcImg: 'https://cdn-1255620552.file.myqcloud.com/images/pushBobbin/spritesheet/zjtcTips.png?v=10',
    zjtpImg: 'https://cdn-1255620552.file.myqcloud.com/images/pushBobbin/spritesheet/zjtpTips.png?v=10',
    maxPoint: 'https://cdn-1255620552.file.myqcloud.com/images/pushBobbin/spritesheet/max_point.png?v=10'
};
textureConfig.prototype.getSpriteSheet = function() {
    return this.spriteSheets;
};
textureConfig.prototype.getTextures = function() {
    return this.textures;
};
textureConfig.getInstance = function() {
    if (!this.instance) {
        this.instance = new textureConfig();
    }
    return this.instance;
};
var playersConfig = function() {
    this.instance = null;
};
playersConfig.prototype.position = {
    pos0: {
        x: 18 * GAME_SCALE,
        y: $.height - (168 * GAME_SCALE)
    },
    pos1: {
        x: 18 * GAME_SCALE,
        y: $.height - (348 * GAME_SCALE)
    },
    pos2: {
        x: 18 * GAME_SCALE,
        y: 675 * GAME_SCALE
    },
    pos3: {
        x: 18 * GAME_SCALE,
        y: 484 * GAME_SCALE
    },
    pos4: {
        x: 18 * GAME_SCALE,
        y: 290 * GAME_SCALE
    },
    pos5: {
        x: 18 * GAME_SCALE,
        y: 98 * GAME_SCALE
    },
    pos6: {
        x: $.width - (103 * GAME_SCALE),
        y: 149 * GAME_SCALE
    },
    pos7: {
        x: $.width - (103 * GAME_SCALE),
        y: 345 * GAME_SCALE
    },
    pos8: {
        x: $.width - (103 * GAME_SCALE),
        y: 536 * GAME_SCALE
    },
    pos9: {
        x: $.width - (103 * GAME_SCALE),
        y: 736 * GAME_SCALE
    },
}
playersConfig.prototype.bankerPosition = {
    pos0: {
        x: (18 + 70) * GAME_SCALE,
        y: $.height - ((168 + 10) * GAME_SCALE)
    },
    pos1: {
        x: (18 + 70) * GAME_SCALE,
        y: $.height - ((348 + 10) * GAME_SCALE)
    },
    pos2: {
        x: (18 + 70) * GAME_SCALE,
        y: (675 - 10) * GAME_SCALE
    },
    pos3: {
        x: (18 + 70) * GAME_SCALE,
        y: (484 - 10) * GAME_SCALE
    },
    pos4: {
        x: (18 + 70) * GAME_SCALE,
        y: (290 - 10) * GAME_SCALE
    },
    pos5: {
        x: (18 + 70) * GAME_SCALE,
        y: (98 - 10) * GAME_SCALE
    },
    pos6: {
        x: $.width - ((103 - 70) * GAME_SCALE),
        y: (149 - 10) * GAME_SCALE
    },
    pos7: {
        x: $.width - ((103 - 70) * GAME_SCALE),
        y: (345 - 10) * GAME_SCALE
    },
    pos8: {
        x: $.width - ((103 - 70) * GAME_SCALE),
        y: (536 - 10) * GAME_SCALE
    },
    pos9: {
        x: $.width - ((103 - 70) * GAME_SCALE),
        y: (736 - 10) * GAME_SCALE
    },
}
playersConfig.prototype.chipInPosition = {
    pos0: {
        x: 18 * GAME_SCALE,
        y: $.height - (168 * GAME_SCALE)
    },
    pos1: {
        x: 18 * GAME_SCALE,
        y: $.height - (348 * GAME_SCALE)
    },
    pos2: {
        x: 18 * GAME_SCALE,
        y: 675 * GAME_SCALE
    },
    pos3: {
        x: 18 * GAME_SCALE,
        y: 484 * GAME_SCALE
    },
    pos4: {
        x: 18 * GAME_SCALE,
        y: 290 * GAME_SCALE
    },
    pos5: {
        x: 18 * GAME_SCALE,
        y: 98 * GAME_SCALE
    },
    pos6: {
        x: $.width - (103 * GAME_SCALE),
        y: 149 * GAME_SCALE
    },
    pos7: {
        x: $.width - (103 * GAME_SCALE),
        y: 345 * GAME_SCALE
    },
    pos8: {
        x: $.width - (103 * GAME_SCALE),
        y: 536 * GAME_SCALE
    },
    pos9: {
        x: $.width - (103 * GAME_SCALE),
        y: 736 * GAME_SCALE
    },
}
playersConfig.prototype.prepareTextPosition = {
    pos0: {
        x: 335 * GAME_SCALE,
        y: $.height - 330 * GAME_SCALE
    },
    pos1: {
        x: 120 * GAME_SCALE,
        y: $.height - 336 * GAME_SCALE
    },
    pos2: {
        x: 120 * GAME_SCALE,
        y: 686 * GAME_SCALE
    },
    pos3: {
        x: 120 * GAME_SCALE,
        y: 494 * GAME_SCALE
    },
    pos4: {
        x: 120 * GAME_SCALE,
        y: 300 * GAME_SCALE
    },
    pos5: {
        x: 120 * GAME_SCALE,
        y: 110 * GAME_SCALE
    },
    pos6: {
        x: $.width - 163 * GAME_SCALE,
        y: 163 * GAME_SCALE
    },
    pos7: {
        x: $.width - 163 * GAME_SCALE,
        y: 356 * GAME_SCALE
    },
    pos8: {
        x: $.width - 163 * GAME_SCALE,
        y: 545 * GAME_SCALE
    },
    pos9: {
        x: $.width - 163 * GAME_SCALE,
        y: 748 * GAME_SCALE
    },
};
playersConfig.prototype.getPrepareTextPosition = function(pos) {
    return this.prepareTextPosition['pos' + pos];
}
playersConfig.prototype.getChipInPos = function(pos) {
    return this.chipInPosition['pos' + pos];
}
playersConfig.prototype.getBankerPos = function(pos) {
    return this.bankerPosition['pos' + pos];
}
playersConfig.prototype.getPositionByPos = function(pos) {
    return this.position['pos' + pos];
}
playersConfig.getInstance = function() {
    if (!this.instance) {
        this.instance = new playersConfig();
    }
    return this.instance;
};