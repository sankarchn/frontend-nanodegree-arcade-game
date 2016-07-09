/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */
'use strict';
(function() {
    /*
     * Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        player, // Place the player object in a variable called player
        allEnemies = [], // Place all enemy objects in an array called allEnemies
        lastTime,
        elapsedTime = 0,
        lastAnimationReq,
        appCallback = null;

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load(Sprite.stonePic);
    Resources.load(Sprite.waterPic);
    Resources.load(Sprite.grassPic);
    Resources.load(Sprite.bugPic);

    canvas.width = Arcade.cellWidth * Arcade.numCols;
    canvas.height = Arcade.cellHeight * Arcade.numRows;
    $("#playfield").prepend(canvas);

    function launchArcade () {
        if (!allEnemies.length) {
            // Enemies our player must avoid
            for (var i = 0; i < Arcade.nBugs; i++) {
                allEnemies[i] = new Enemy(Sprite.bugPic, 0, (i + 1) * Arcade.cellHeight, 50 + i*25);
            }
        }
        Jewel.init();
        Avatars.choose(function (p) {
            player = p;
            render();
        });
    }

    /*
     * This function initializes variables used by the game core engine
     * (such as lastTime variable) as well as variables corresponding to
     * player/enemy states - such as scores, pixel positions etc., This
     * function is called before every game or "round" of play.
     */
    function startGame (cb) {
        Avatars.disableSelection ();
        Scores.stopAnimate();
        lastTime = Date.now();
        appCallback = cb; // The callback function is invoked at the time of completion of a game
        main();
    }

    function stopGame () {
        window.cancelAnimationFrame(lastAnimationReq);
        player.saveStats();
        Scores.process(player.getAvatar(), player.getScore());
        Scores.render();
        if (appCallback) {
            appCallback();
        }
        resetEntities();
        launchArcade();
    }

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /*
         * Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt;
        dt = (now - lastTime) / 1000.0;
        elapsedTime += (now - lastTime);

        /*
         * Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /*
         * Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /*
         * Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */

        if (elapsedTime.toFixed(0) <= Arcade.timeLimit ) {
            /*
             * Save the id for animation request, useful when the user wants
             * to stop the game before timelimit is reached.
             */
            lastAnimationReq = window.requestAnimationFrame(main);
        }
        else {
            console.log("Play Over!");
            stopGame();
        }
    }

    /*
     * This is called by the main function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function update(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
            if (enemy.checkCollision(player.getPos())) {
                player.gotoStartPos();
                player.updateScore(Arcade.penaltyPts);
            }
        });
        Jewel.update(dt);
    }

    /*
     * This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render () {
        renderArcade();
        renderEntities();
    }

    function renderArcade() {
        /*
         * This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                Sprite.waterPic,   // Top row is water
                Sprite.stonePic,   // Row 1 of 3 of stone
                Sprite.stonePic,   // Row 2 of 3 of stone
                Sprite.stonePic,   // Row 3 of 3 of stone
                Sprite.grassPic,   // Row 1 of 2 of grass
                Sprite.grassPic    // Row 2 of 2 of grass
            ],
            numRows = Arcade.numRows,
            numCols = Arcade.numCols,
            row, col;

        /*
         * Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), Sprite.blockOffsetX, Sprite.blockOffsetY, Sprite.blockWidth, Sprite.blockHeight, col * Arcade.cellHeight, row * Arcade.cellWidth, Arcade.cellWidth, Arcade.cellHeight);
            }
        }
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
        Jewel.render();
        renderCurscore ();
    }

    function renderCurscore () {
        ctx.font = "32px Garamond";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Score", Arcade.scorePos.x, Arcade.scorePos.y - 40);
        ctx.fillText(player.getScore(), Arcade.scorePos.x, Arcade.scorePos.y);
        ctx.fillText("Time", Arcade.timePos.x, Arcade.timePos.y - 40);
        ctx.fillText((elapsedTime / 1000).toFixed(1), Arcade.timePos.x, Arcade.timePos.y);
    }

    function resetEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.reset();
        });

        // reset everything else and get ready for a new round
        player.reset();
        Jewel.reset();
        elapsedTime = 0;
    }

    function handleInput (keyin) {
        player.handleInput(keyin);
        if (player.getPos().y == 0) {
            var pts = Jewel.acquire(player.curPos);
            if (pts) {
                player.updateScore(pts);
            }
            else {
                player.updateScore(Arcade.basicPts);
            }
        }
    }
    /*
     * Assign the canvas' context object and other key properties to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their .js files.
     */
    window.ctx = ctx;

    window.Engine = {
        launchArcade : launchArcade,
        startGame : startGame,
        stopGame : stopGame,
        handleInput : handleInput
    };

})();
