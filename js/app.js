//*******************************************************************************************//
//********************************************* GAME ****************************************//
//*******************************************************************************************//

var Game = function() {};

Game.prototype.win = function() {
    allEnemies = [];
    alert ("CONGRATS! YOU WIN! **To play again: Refresh the page**");

};

Game.prototype.lose = function() {
    alert ("GAME OVER!");
    this.resetGame();
};

//Reset the game in the event of game over
Game.prototype.resetGame = function() {
    collectedGems = [];
    collectedStar = [];
    selectorCoordinate = [];
    document.getElementById("lives").innerHTML = "Lives: 5";
    document.getElementById("gems").innerHTML = "Gems Collected: 0";
    document.getElementById("star").innerHTML = "Star Collected: Not yet!";
    document.getElementById("key").innerHTML = "Key Collected: Not yet!";
    player.reset();
    key.reset();
    heart.reset();
    star.reset();
    selector.reset();
    var allGemsLength = allGems.length;
    for (i=0; i < allGemsLength; i++) {
        allGems[i].reset();
    }
    var allEnemiesLength = allEnemies.length;
    for (i=0; i < allEnemiesLength; i++) {
        allEnemies[i].reset();
    }
    var allRocksLength = allRocks.length;
    for (i=0; i < allRocksLength; i++) {
        allRocks[i].reset();
    }
};

var game = new Game;


//************************************ ENTITIES IN THE GAME *********************************//
//***********************************(Not Include the Player)*********************************//

var Entity = function (x,y) {
    this.x = x;
    this.y = y;
    this.originalPosition = [x, y];
    this.width = 60;
    this.height = 60;
};

Entity.prototype.reset = function() {
    this.x = this.originalPosition[0];
    this.y = this.originalPosition[1];
};

Entity.prototype.render = function() {
    ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
};


//********************************** Rock Obstacles *****************************************//

var Rock = function (x,y, originalPosition, width, height) {
    Entity.call (this, x, y, originalPosition, width, height);
    this.sprite = 'images/Rock.png';
};

Rock.prototype = Object.create(Entity.prototype);

var allRocks = [];
//Obstacle rocks
var rock0 = new Rock (400,65);
var rock1 = new Rock (300,-15);
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
//Hiding rocks
var rockKey = new Rock (600,-15);
var rockStar = new Rock (0,-15);
var rockSelector = new Rock (810,650);

allRocks.push(rock0, rock1, rock2, rock3, rock4, rock5, rock6, rock7,rock8, rock9, rock10, rock11, rock12);
allRocks.push (rockStar, rockKey, rockSelector);


//********************************* Gems to collect *****************************************//

var Gem = function (x,y, originalPosition, width, height) {
    Entity.call (this, x, y, originalPosition, width, height);
    this.sprite = 'images/GemOrange.png';
};

Gem.prototype = Object.create(Entity.prototype);

var allGems = [];
var gem1 = new Gem (620, 440);
var gem2 = new Gem (120, 275);
var gem3 = new Gem (420, 25);
allGems.push(gem1, gem2, gem3);

var collectedGems = []; //coordinate of collected gems


//********************************** Heart: bonus live **************************************//

var Heart = function (x,y, originalPosition, width, height) {
    Entity.call (this, x, y, originalPosition, width, height);
    this.sprite = 'images/Heart.png';
};

Heart.prototype = Object.create(Entity.prototype);

var heart = new Heart (820,275);


//************************************** Star ***********************************************//

var Star = function (x,y, originalPosition, width, height) {
    Entity.call (this, x, y, originalPosition, width, height);
    this.sprite = 'images/Star.png';
};

Star.prototype = Object.create(Entity.prototype);

//Override the render function
Star.prototype.render = function() {
    if (collectedGems.length === 3) {
        ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
    }
};

var collectedStar = [];
var star = new Star (10,10);


//************************************* Selector ********************************************//

var Selector = function (x,y, originalPosition, width, height) {
    Entity.call (this, x, y, originalPosition, width, height);
    this.sprite = 'images/Selector.png';
};

Selector.prototype = Object.create(Entity.prototype);

//Override the render function
Selector.prototype.render = function() {
    if (collectedStar.length > 0) {
        ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
    }
};

var selectorCoordinate = []; //save the coordinate once the player reach the selector
var selector = new Selector (810,660);


//************************************* Key to win *****************************************//

var Key = function (x,y, originalPosition, width, height) {
    Entity.call (this, x, y, originalPosition);
    this.width = 20;
    this.height = 20;
    this.sprite = 'images/Key.png';
};

Key.prototype = Object.create(Entity.prototype);

//Override the render function
Key.prototype.render = function() {
    if (selectorCoordinate.length > 0) {
        ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
    }
};

var key = new Key (625,35);


//****************************** Enemies moving left to right *******************************//

var EnemyLH = function (x,y, originalPosition, width, height) {
    Entity.call (this, x, y, originalPosition);
    this.width = 85;
    this.height = 65;
    this.speed = Math.floor(Math.random() * 150) + 100;
    this.sprite = 'images/enemy-bug-LH.png';
};

EnemyLH.prototype = Object.create(Entity.prototype);

EnemyLH.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
        if (this.x > 900) {
            this.x = -20;
        }
};

var allEnemies = [];
var enemy0 = new EnemyLH (400,70);
var enemy1 = new EnemyLH (0,70);
var enemy2 = new EnemyLH (0,150);
var enemy3 = new EnemyLH (0,230);
allEnemies.push (enemy0, enemy1, enemy2, enemy3);


//*********************************** Enemies moving right to left **************************//


var EnemyRH = function (x,y, originalPosition, width, height) {
    Entity.call (this, x, y, originalPosition);
    this.width = 85;
    this.height = 65;
    this.speed = Math.floor(Math.random() * 100) + 150;
    this.sprite = 'images/enemy-bug-RH.png';
};

EnemyRH.prototype = Object.create(Entity.prototype);

EnemyRH.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x -= this.speed * dt;
        if (this.x < -50) {
            this.x = 900;
        }
};

var enemy4 = new EnemyRH (900,320);
var enemy5 = new EnemyRH (900,400);
var enemy6 = new EnemyRH (900,480);
var enemy7 = new EnemyRH (400,400);
allEnemies.push (enemy4, enemy5, enemy6, enemy7);


//*******************************************************************************************//
//*************************************** The player ****************************************//
//*******************************************************************************************//

var Player = function(x,y) {
    this.x = x;
    this.y = y;
    //record player's x-y coordinate (to use when running into a rock)
    this.playerPosition = []; // [[x,y], [x,y], etc...]
    this.width = 60;
    this.height = 70;
    this.lives = 5;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function() {
        this.x = 400;
        this.y = 570;
        this.lives = 5;
        this.sprite = 'images/char-boy.png';
}

//what happen when player collide with enemy
Player.prototype.collision = function() {
        //Game Over scenario
        if (this.lives === 1) {
            this.lives -= 1;
            document.getElementById("lives").innerHTML = "Live(s): " + this.lives;
            //Delay the Game Over alert or it pops up too last for the document to update lives status to 0
            setTimeout(function() {
                game.lose();
            }, 50);
       }
       //Scenario 2: Player still has lives left to continue playing
       else if (this.lives > 1) {
            this.lives -= 1;
            document.getElementById("lives").innerHTML = "Live(s): " + this.lives;
            this.x = 400;
            this.y = 570;
       }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* This function helps during the coding process (keep for reference)*
Player.prototype.coordinate = function () {
    console.log (this.x);
    console.log (this.y);
    return;
};
*/

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
    for (i = 0; i < allRocks.length; i++) {
        if (this.x < allRocks[i].x + allRocks[i].width &&
            this.x + this.width > allRocks[i].x &&
            this.y < allRocks[i].y + allRocks[i].height &&
            this.y + this.height > allRocks[i].y) {
                this.x = this.playerPosition[this.playerPosition.length-1][0];
                this.y = this.playerPosition[this.playerPosition.length-1][1];
        }
    }

    //Obtain the Gems
    for (i = 0; i < allGems.length; i++) {
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
                collectedStar.push([star.x, star.y]);
                document.getElementById("star").innerHTML = "Star Collected: Yes!";
                //move the star out of the canvas to make it disappear
                star.x = 1000;
                star.y = 1000;
                this.sprite = 'images/char-boy-star.png';
    }

    //Reach the selector
    if (this.x < selector.x + selector.width &&
            this.x + this.width > selector.x &&
            this.y < selector.y + selector.height &&
            this.y + this.height > selector.y) {
                selectorCoordinate.push([key.x, key.y]);
                //move selector out of the canvas to make it disappear
                selector.x = 1000;
                selector.y = 1000;
                this.sprite = 'images/char-boy.png';
    }

    //Obtain the key
    if (this.x < key.x + key.width &&
            this.x + this.width > key.x &&
            this.y < key.y + key.height &&
            this.y + this.height > key.y) {
                document.getElementById("key").innerHTML = "Key Collected: Yes!";
                //move the key out of the canvas to prevent infinite loop and also make it disappear
                key.x = 1000;
                key.y = 1000;
                this.sprite = 'images/char-boy-key.png';
                //Delay alert by 200 ms otherwise it pops up too fast
                setTimeout(function() {
                    game.win();
                }, 200);
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

// Initiate the player by placing the player object in a variable called player
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