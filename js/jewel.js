/**
 * Created by Sankar on 05-07-2016.
 * 
 * This file implements functionality to put a Gem on the arcade board.
 * The Jewel object provides methods to initialize and act upon the gems.
 * It creates multiple Gem objects and at defined intervals throws a gem
 * into the arcade. The position and the type of gem is randomized just to
 * beat monotony. Gem object is used within this file and only Jewel object
 * is visible outside of the file.
 */
'use strict';

(function () {

    var gemPics = Sprite.gemPics,
        allGems = [],
        elapsedTime = 0;

    Resources.load(gemPics);

    var Gem = function (pic, pts) {
        this.sprite = pic;
        this.curPos = new Point(0, 0);
        this.display = false; // important property, is the Gem visible on the board?
        this.pts = pts;
    };

    Gem.prototype.getPts = function () {
        return this.pts;
    };

    Gem.prototype.setPos = function (x, y) {
        this.curPos.x = x;
        this.curPos.y = y;
    };

    Gem.prototype.render = function () {
        if (this.display)
            ctx.drawImage(Resources.get(this.sprite), Sprite.blockOffsetX, Sprite.blockOffsetY, Sprite.imgWidth, Sprite.imgHeight, this.curPos.x, this.curPos.y, Arcade.cellWidth, Arcade.cellHeight);
    };

    Gem.prototype.show = function () {
        this.display = true;
    };

    Gem.prototype.hide = function () {
        this.display = false;
    };

    Gem.prototype.checkCollision = function (pos) {
        return ((this.display) && (this.curPos.y == pos.y) && (this.curPos.x == pos.x));
    };

    for (var i = 0; i < gemPics.length; i++) {
        allGems[i] = new Gem(gemPics[i], Arcade.gemPts);
    }

    var init = function () {
        elapsedTime = 0;
    };

    var update = function (dt) {
        elapsedTime += dt * 1000;
        if (elapsedTime.toFixed(1) >= 5 * 1000) {
            offerGem();
            elapsedTime = 0;
        }
    };

    function offerGem () {
        var slot = Math.floor(Arcade.numCols * Math.random()),
            which = Math.floor(allGems.length * Math.random());

        for (var i = 0; i < allGems.length; i++) {
            var gem = allGems[i];
            if (i == which) {
                gem.setPos(slot * Arcade.cellWidth, 0);
                gem.show();
            }
            else {
                gem.hide();
            }
        }
    }

    var reset = function () {
        for (var i = 0; i < allGems.length; i++) {
            allGems[i].hide();
        }
    };

    // Draw the gem on the screen, required method for game
    var render = function () {
        for (var i = 0; i < allGems.length; i++) {
            allGems[i].render();
        }
    };

    var acquire = function (pos) {
        for (var i = 0; i < allGems.length; i++) {
            var gem = allGems[i];
            if(gem.checkCollision(pos)) {
                gem.hide();
                return gem.getPts();
            }
        }
        return 0;
    };

    window.Jewel = {
        init: init,
        update: update,
        render: render,
        acquire: acquire,
        reset: reset
    };
} ());

