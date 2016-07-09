'use strict';

$(document).ready(function () {
    var launchGame = $("#launchGame");

    // This listens for key presses and sends the keys to
    // Engine.handleInput() method.
    var kbdInput = function (e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        Engine.handleInput(allowedKeys[e.which]);
        e.preventDefault();
    };

    var launchClickHandler = function  () {
        var btnString = launchGame.text();

        switch (btnString) {
            case "Play Again":
            case "Start":
                launchGame.text("Stop");
                $(document).keyup (kbdInput);
                Engine.startGame(function () {
                    // callback invoked when the game is over
                    // first turnoff key capture pending key strokes
                    // are not processed in a new round of play
                    $(document).off("keyup");
                    launchGame.text("Play Again");
                });
                break;
            case "Stop":
                Engine.stopGame();
                launchGame.text("Play Again");
                break;
            default:
                window.alert("Unable to Launch Game : " + btnString);
                break;
        }
    };

    // launch the arcade when all the images have been loaded
    Resources.onReady(function () {
        Engine.launchArcade();
        launchGame.click(launchClickHandler);
    });
});