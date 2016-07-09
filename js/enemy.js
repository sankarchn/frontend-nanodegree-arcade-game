/**
 * Created by Sankar on 01-07-2016.
 * 
 * A simple class that implements functionality for bugs traversing the arcade.
 * The speed of bugs are varied linearly within certain limits.
 */
'use strict';

var speedInc = 20,
    speedMax = 300;

var Enemy = function (pic, x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = pic;
    this.curPos = new Point(x, y);
    this.startPos = new Point(x, y);
    this.speed = speed;
    this.initSpeed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.curPos.x += dt * this.speed;

    if (this.curPos.x >= ctx.canvas.clientWidth) {
        this.curPos.x = 0;
        this.speed += speedInc * Math.random();
        if (this.speed > speedMax) {
            this.speed = this.initSpeed;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), Sprite.bugOffsetX, Sprite.bugOffsetY, Sprite.imgWidth, Sprite.imgHeight, this.curPos.x, this.curPos.y, Arcade.cellWidth, Arcade.cellHeight);
};

Enemy.prototype.checkCollision = function (playerPos) {
    var myPos = this.curPos;
    if ((playerPos.y == myPos.y) &&
        (playerPos.x >= myPos.x) &&
        (playerPos.x <= (myPos.x + Arcade.cellWidth)))
    // the bug cannot bite if its mouth is past your body :-)
    // || (myPos.x >= playerPos.x) && (myPos.x <= (playerPos.x + Arcade.cellWidth)) )
        return true;

    return false;
};

Enemy.prototype.reset = function () {
    this.curPos.x = this.startPos.x;
    this.curPos.y = this.startPos.y;
    this.speed = this.initSpeed;
};
