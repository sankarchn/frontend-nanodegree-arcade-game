/**
 * Created by Sankar on 03-07-2016.
 * 
 * This file implements player selection. Avatar is a sanskrit word 
 * referring to a particular manifestation of a soul/divinity. In the
 * game, the user is allowed to choose any of the 5 avatars.
 *
 * Note the use of callback function. Engine invokes chooseAvatar function
 * with a callback that can get called multiple times - whenever the user
 * changes the avatar. The Engine can use the callback to keep track of the
 * current active player. There is also an immediate invocation of callback
 * function with the default player object as parameter, this is done so that
 * things work smooth even when the user starts playing without changing the default.
 */
'use strict';

(function () {
    var avCanvas = document.createElement('canvas'),
        avCtx = avCanvas.getContext('2d'),
        avatars = Sprite.avatarPics,
        avDefault = 2,
        avCurrent = 2,
        allAvatars = [],
        avSelection = $("#avSelection"),
        avSelCanvas;

    Resources.load(avatars);
    for (var i = 0; i < avatars.length; i++) {
        allAvatars[i] = new Player(avatars[i], Arcade.startPos.x, Arcade.startPos.y);
    }
    avCanvas.width = 505;
    avCanvas.height = 101;
    avSelection.hide();
    avSelection.append(avCanvas);
    avSelCanvas = $("#avSelection > canvas");

    function chooseAvatar (cb) {
        var playerObj;

        avSelection.show();
        displayAvatars(avDefault);
        playerObj = allAvatars[avCurrent];
        if (cb)
            cb(playerObj);

        avSelCanvas.click(function (e) {
            var pos = {
                x: e.pageX - avSelCanvas.offset().left,
                y: e.pageY - avSelCanvas.offset().top
            };

            avCurrent = Math.floor(pos.x / Arcade.cellWidth);
            displayAvatars(avCurrent);
            playerObj = allAvatars[avCurrent];
            if (cb)
                cb(playerObj);
        });
    }

    function displayAvatars (selection) {

        for (var i = 0; i < avatars.length; i++) {
            avCtx.globalAlpha = 1.0;
            avCtx.drawImage(Resources.get(avatars[i]), Sprite.playerOffsetX, Sprite.playerOffsetY, Sprite.imgWidth, Sprite.imgHeight, i * Arcade.cellWidth, 0, Arcade.cellWidth, Arcade.cellHeight);
            if (i != selection) {
                avCtx.globalAlpha = 0.6;
                avCtx.fillStyle = "white";
                avCtx.fillRect(i * Arcade.cellWidth, 0, Arcade.cellWidth, Arcade.cellHeight);
            }
        }
    }

    function maskAvatarSelection () {
        avSelCanvas.unbind("click");
    }

    window.Avatars = {
        choose : chooseAvatar,
        disableSelection : maskAvatarSelection
    }
})();