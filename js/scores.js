/**
 * Created by Sankar on 04-07-2016.
 * 
 * Implementation of class for displaying the scores in a panel.
 * This maintains the scores and avatars from all rounds stored in a sorted array.
 * Renders it in using canvas.
 */
'use strict';

(function () {
    var scoreCanvas = document.createElement('canvas'),
        scoreCtx = scoreCanvas.getContext('2d'),
        scoreTable = [],
        starImg = Sprite.starImg,
        scorefield = $("#scorefield"),
        topperIntervalID,
        stopAnimation;

    Resources.load(starImg);

    scorefield.append(scoreCanvas);
    scorefield.hide();
    scoreCanvas.width = 3 * Arcade.cellWidth;
    scoreCanvas.height = 3 * Arcade.cellHeight;

    function render () {
        var gameCount = (scoreTable.length > 3) ? 3 : scoreTable.length,
            who,
            howmuch;

        scoreCtx.clearRect(0,0, scoreCanvas.width, scoreCanvas.height);
        scoreCtx.globalAlpha = 1.0;
        for (var ind = 0; ind < gameCount; ind++) {
            who = scoreTable[ind].avatar;
            howmuch = scoreTable[ind].score;
            displayScore(ind,who,howmuch);
        }
        scorefield.fadeIn();
        if (scoreTable[0].score) // why jump up & down if the score is <= 0
            animateTopper();
    }

    function displayScore (row, avatar, score) {
        scoreCtx.drawImage(Resources.get(avatar), Sprite.playerOffsetX, Sprite.playerOffsetY, Sprite.imgWidth, Sprite.imgHeight, 0, row * Arcade.cellHeight, Arcade.cellWidth, Arcade.cellHeight);
        scoreCtx.font = "32px Garamond";
        scoreCtx.fillStyle = "blue";
        scoreCtx.textAlign = "center";
        scoreCtx.fillText(score, 150, row * Arcade.cellHeight + 50);
        if ((row == 0) && (score > 0))
            scoreCtx.drawImage(Resources.get(starImg), Sprite.playerOffsetX, Sprite.playerOffsetY, Sprite.imgWidth, Sprite.imgHeight, 200, 0, Arcade.cellWidth, Arcade.cellHeight);
    }

    function animateTopper() {
        var toggle = 0;
        stopAnimation = 0;
        topperIntervalID = window.setInterval(function () {
            if (toggle) {
                displayScore(0, scoreTable[0].avatar, scoreTable[0].score);
                toggle = 0;
                // stop animation from within callback as the stopping should
                // happen after the score is displayed, not after the score is
                // cleared out
                if (stopAnimation)
                    clearInterval(topperIntervalID);
            }
            else {
                scoreCtx.clearRect(0, 0, scoreCanvas.width, Arcade.cellHeight);
                toggle = 1;
            }
        }, 900);
    }

    function stopAnimate () {
        stopAnimation = 1; // Stop animation from within callback
    }

    function process (who, howmuch) {
        scoreTable.push({avatar: who, score: howmuch});
        scoreTable.sort(function (a, b) {
            return b.score - a.score;
        })
    }

    window.Scores = {
        render: render,
        process: process,
        stopAnimate: stopAnimate
    };
})();

