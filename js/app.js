//Draw boxes around moving entities to easily detect collisions
/*
function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}
*/

//********************** GAME ******************************//

var Game = function() {
    this.gameOver = false;
    this.gameWin = false;
};

Game.prototype.resetGame = function() {
    player.reset();
};

var game = new Game;

//********* Enemies moving left to right ************//
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.width = 85;
    this.height = 65;
    this.speed = Math.floor(Math.random() * 150) + 120;
    this.sprite = 'images/enemy-bug-LH.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
        if (this.x > 900) {
            this.x = -20;
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //drawBox(this.x, this.y + 77, 100, 67, "yellow");
};

//********* Enemies moving right to left ************//
var EnemyRH = function(x,y) {
    this.x = x;
    this.y = y;
    this.width = 85;
    this.height = 65;
    this.speed = Math.floor(Math.random() * 120) + 100;
    this.sprite = 'images/enemy-bug-RH.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
EnemyRH.prototype.update = function(dt) {
    this.x -= this.speed * dt;
        if (this.x < -50) {
            this.x = 900;
        }
};

// Draw the enemy on the screen, required method for game
EnemyRH.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //drawBox(this.x, this.y + 77, 100, 67, "yellow");
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemy0 = new Enemy (400,70);
var enemy1 = new Enemy (0,70);
var enemy2 = new Enemy (0,150);
var enemy3 = new Enemy (0,230);
//allEnemies.push (enemy0, enemy1, enemy2, enemy3);

var enemy4 = new EnemyRH (900,320);
var enemy5 = new EnemyRH (900,400);
var enemy6 = new EnemyRH (900,480);
var enemy7 = new EnemyRH (400,400);
allEnemies.push (enemy4, enemy5, enemy6, enemy7);


//********** Gems to collect *****************//
var Gem = function (x,y){
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.sprite = 'images/GemOrangeSmall.png';
};

Gem.prototype.render = function() {
    ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
};

var allGems = [];
var gem1 = new Gem (620, 440);
var gem2 = new Gem (120, 275);
var gem3 = new Gem (420, 25);
allGems.push(gem1, gem2, gem3);

var collectedGems = []; //coordinate of collected gems

//*************** Key to reveal the star ***********//
var Key = function (x,y){
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.sprite = 'images/key.png';
}

Key.prototype.render = function() {
    if (selectorCoordinate.length > 0) {
        ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
    }
};

var key = new Key (625,35);

//*************** Selector ***********//
var Selector = function (x,y){
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.sprite = 'images/Selector.png';
}

Selector.prototype.render = function() {
    if (collectedStar.length > 0){
        ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
    }
};

var selectorCoordinate = [];
var selector = new Selector (810,660);

//*************** Star ***********//
var Star = function (x,y){
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.sprite = 'images/Star.png';
}

Star.prototype.render = function() {
    if (collectedGems.length === 3) {
        ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
    }
};
var collectedStar = [];
var star = new Star (10,10);

//*************** Heart bonus ***********//
var Heart = function (x,y){
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.sprite = 'images/heart.png';
}

Heart.prototype.render = function() {
    ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
};

var heart = new Heart (820,275);


//******* Rock Obstacles *************//
var Rock = function (x,y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.sprite = 'images/rock.png';
};

// Draw the rocks on the screen
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allRocks = [];
//wall rocks
var rock0 = new Rock (400,65);
var rock1 = new Rock (300,-20);
var rock2 = new Rock (500,395);
var rock3 = new Rock (400,315);
var rock4 = new Rock (200,230);
var rock5 = new Rock (100,315);
var rock6 = new Rock (0, 315);
var rock7 = new Rock (500, 150);
var rock8 = new Rock (600, 650);
var rock9 = new Rock (600, 565);
var rock10 = new Rock (600, 480);
var rock11 = new Rock (710,230);
var rock12 = new Rock (810, 315);
//hiding rocks
var rockKey = new Rock (600,-20);
var rockStar = new Rock (0,-15);
var rockSelector = new Rock (810,660);

allRocks.push(rock0, rock1, rock2, rock3, rock4, rock5, rock6, rock7,rock8, rock9, rock10, rock11, rock12);
allRocks.push (rockStar, rockKey, rockSelector);

//*********** The player *************//
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.playerPosition = []; //record player's x-y coordinate (to use when hitting rock)
    this.width = 60;
    this.height = 70;
    this.lives = 3;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    //Prevent player icon from moving out of the canvas
    if (this.x < 0) {
        this.x = 0;
    }

    if (this.x > 800) {
        this.x = 800;
    }

    if (this.y < -15) {
        this.y = -10;
    }

    if (this.y > 653) {
        this.y = 653;
    }

    //Collide with bugs
    for (i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + allEnemies[i].width &&
            this.x + this.width > allEnemies[i].x &&
            this.y < allEnemies[i].y + allEnemies[i].height &&
            this.y + this.height > allEnemies[i].y) {
                this.collision();
                }
    }

    //Hit the rocks
    for (i = 0; i < allRocks.length; i++){
        if (this.x < allRocks[i].x + allRocks[i].width &&
            this.x + this.width > allRocks[i].x &&
            this.y < allRocks[i].y + allRocks[i].height &&
            this.y + this.height > allRocks[i].y) {
                //this.coordinate();
                this.x = this.playerPosition[this.playerPosition.length-1][0];
                this.y = this.playerPosition[this.playerPosition.length-1][1];
                //this.coordinate();
        }
    }

    //Obtain the Gems
    for (i = 0; i < allGems.length; i++){
        if (this.x < allGems[i].x + allGems[i].width &&
            this.x + this.width > allGems[i].x &&
            this.y < allGems[i].y + allGems[i].height &&
            this.y + this.height > allGems[i].y) {
                collectedGems.push([allGems[i].x, allGems[i].y]);
                document.getElementById("gems").innerHTML = "Gems Collected: " + collectedGems.length;
                //move the gem out of the canvas to make it disappear
                allGems[i].x = 1000;
                allGems[i].y = 1000;
        }
    }

    //Obtain the star
    if (this.x < star.x + star.width &&
            this.x + this.width > star.x &&
            this.y < star.y + star.height &&
            this.y + this.height > star.y) {
                //move the star out of the canvas to make it disappear
                collectedStar.push([star.x, star.y]);
                document.getElementById("star").innerHTML = "Star Collected: " + collectedStar.length;
                star.x = 1000;
                star.y = 1000;
                player.sprite = 'images/char-boy-star.png';
    }

    //Reach the selector
    if (this.x < selector.x + selector.width &&
            this.x + this.width > selector.x &&
            this.y < selector.y + selector.height &&
            this.y + this.height > selector.y) {
                selectorCoordinate.push([key.x, key.y]);
                selector.x = 1000;
                selector.y = 1000;
                player.sprite = 'images/char-boy.png';
    }

        //Obtain the key
    if (this.x < key.x + key.width &&
            this.x + this.width > key.x &&
            this.y < key.y + key.height &&
            this.y + this.height > key.y) {
                document.getElementById("key").innerHTML = "Key Collected: 1";
                //move the key out of the canvas to make it disappear
                key.x = 1000;
                key.y = 1000;
                player.sprite = 'images/char-boy-key.png';
    }

    //Obtain the heart
    if (this.x < heart.x + heart.width &&
            this.x + this.width > heart.x &&
            this.y < heart.y + heart.height &&
            this.y + this.height > heart.y) {
                this.lives += 1;
                document.getElementById("lives").innerHTML = "Live(s): " + this.lives;
                //move the heart out of the canvas to make it disappear
                heart.x = 1000;
                heart.y = 1000;
        }
};

//Return player to the grass
Player.prototype.reset = function(){
        this.x = 400;
        this.y = 570;
}

Player.prototype.collision = function () {
        this.lives -= 1;
        document.getElementById("lives").innerHTML = "Live(s): " + this.lives;
        this.reset();
}

Player.prototype.coordinate = function () {
    console.log (this.x);
    console.log (this.y);
    return;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //drawBox(this.x + 15, this.y + 60, 70, 80, "red");
};

//Enable the player to be moved around the canvas
Player.prototype.handleInput = function(movement){
    if (movement == "left") {
        this.playerPosition.push ([this.x, this.y]);
        //console.log([this.x, this.y]);
        this.x -= 100;

    }
    if (movement == "right") {
        this.playerPosition.push ([this.x, this.y]);
        //console.log([this.x, this.y]);
        this.x += 100;

    }
    if (movement == "up") {
        this.playerPosition.push ([this.x, this.y]);
        //console.log([this.x, this.y]);
        this.y -= 83;
    }
    if (movement == "down") {
        this.playerPosition.push ([this.x, this.y]);
        //console.log([this.x, this.y]);
        this.y += 83;
    }
};

// Place the player object in a variable called player
var player = new Player(400,653);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
