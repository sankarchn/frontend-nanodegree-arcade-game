/**
 * Created by Sankar on 01-07-2016.
 * 
 * Implementation of a simple player class, that does the minimal job of keeping
 * track of where the player is at a moment and drawing the player on the arcade.
 *
 */

'use strict';

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (pImg, x, y) {
    this.avatar = pImg;
    this.curPos = new Point(x, y);
    this.initPos = new Point(x, y);
    this.curScore = 0;
    this.scoreHist = []; // for future use
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.avatar), Sprite.playerOffsetX, Sprite.playerOffsetY, Arcade.cellWidth, Arcade.cellHeight, this.curPos.x, this.curPos.y, Arcade.cellWidth, Arcade.cellHeight);
};

Player.prototype.gotoStartPos = function () {
    this.curPos.x = this.initPos.x;
    this.curPos.y = this.initPos.y;
};

Player.prototype.handleInput = function (direction) {
    var self = this;

    if (self.curPos.y == 0) {
        self.gotoStartPos();
        return;
    }

    switch (direction) {
        case 'up' :
            self.curPos.y = self.curPos.y - Arcade.cellHeight;
            break;
        case 'down':
            self.curPos.y = self.curPos.y + Arcade.cellHeight;
            if (self.curPos.y == ctx.canvas.height - Arcade.cellHeight) {
                self.gotoStartPos();
            }
            break;
        case 'left':
            self.curPos.x = self.curPos.x - Arcade.cellWidth;
            if (self.curPos.x < 0) {
                self.gotoStartPos();
            }
            break;
        case 'right':
            self.curPos.x = self.curPos.x + Arcade.cellWidth;
            if (self.curPos.x  == ctx.canvas.width) {
                self.gotoStartPos();
            }
            break;
    }
};

Player.prototype.updateScore = function (val) {
    this.curScore += val;
};

Player.prototype.reset = function () {
    this.curScore = 0;
    this.curPos.x = Arcade.startPos.x;
    this.curPos.y = Arcade.startPos.y;
};

Player.prototype.saveStats = function () {
    this.scoreHist.push(this.curScore);
};

Player.prototype.getScore = function () {
    return this.curScore;
};

Player.prototype.getAvatar = function () {
    return this.avatar;
};

Player.prototype.getPos = function () {
    return this.curPos;
};

