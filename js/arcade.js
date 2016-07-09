/**
 * Created by Sankar on 05-07-2016.
 * 
 * This is sort of configuration file where all the key parameters driving the entire
 * game. The Point, Arcade and Sprite objects are almost used in all the modules.
 */
'use strict';

var Point = function (x, y) {
    this.x = x;
    this.y = y;
};

var Arcade = {
        cellHeight: 101,
        cellWidth: 101,
        numRows: 6,
        numCols: 5,
        nBugs: 3,
        basicPts: 100,
        gemPts: 1000,
        penaltyPts: -25, // if bitten by the bug
        timeLimit: 60 * 1000 // in millisec
    };

Arcade.startPos = new Point (Arcade.cellWidth * 2, Arcade.cellHeight * 4);
Arcade.scorePos = new Point (Arcade.cellWidth * 3 + 50, Arcade.cellHeight * 5 + 80);
Arcade.timePos = new Point (Arcade.cellWidth * 4 + 50, Arcade.cellHeight * 5 + 80);

var Sprite = {
    stonePic: 'images/stone-block.png',
    waterPic: 'images/water-block.png',
    grassPic: 'images/grass-block.png',
    bugPic: 'images/enemy-bug.png',
    starImg: 'images/Star.png',
    avatarPics: [
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-boy.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'],
    gemPics : ['images/Gem Blue.png',
            'images/Gem Green.png',
            'images/Gem Orange.png'
        ],
    bugOffsetX : 0,
    bugOffsetY: 61,
    playerOffsetX: 0,
    playerOffsetY: 51,
    blockOffsetX: 0,
    blockOffsetY: 51,
    imgWidth: 101,
    imgHeight: 101,
    blockWidth: 101,
    blockHeight: 80  // ignoring the dark portion at the bottom
};
