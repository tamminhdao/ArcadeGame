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
allEnemies.push (enemy0, enemy1, enemy2, enemy3);

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

//*************** Key to win ***********//
var Key = function (x,y){
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.sprite = 'images/key.png';
}

Key.prototype.render = function() {
    ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
};

var key = new Key (10,20);

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
var rock0 = new Rock (400,65);
var rock1 = new Rock (300,-20);
var rock2 = new Rock (500,395);
var rock3 = new Rock (400,315);
var rock4 = new Rock (200,230);
var rock5 = new Rock (100,315);
var rock6 = new Rock (600,-20);
var rock7 = new Rock (500, 150);
var rock8 = new Rock (600, 650);
var rock9 = new Rock (600, 555);
var rock10 = new Rock (600, 470);
var rock11 = new Rock (0, 315);
allRocks.push(rock0, rock1, rock2, rock3, rock4, rock5, rock6, rock7,rock8, rock9, rock10, rock11);

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

        }
    }
};

Player.prototype.collision = function () {
    if (this.lives > 1) {
        this.lives -= 1;
        console.log ("Collision! You have " + this.lives + " lives left!");
     }
     else if (this.lives = 1) {
         window.alert ("You lose!");
     }
    this.x = 400;
    this.y = 570;
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
        console.log([this.x, this.y]);
        this.x -= 100;

    }
    if (movement == "right") {
        this.playerPosition.push ([this.x, this.y]);
                console.log([this.x, this.y]);
        this.x += 100;

    }
    if (movement == "up") {
        this.playerPosition.push ([this.x, this.y]);
                console.log([this.x, this.y]);
        this.y -= 83;
    }
    if (movement == "down") {
        this.playerPosition.push ([this.x, this.y]);
                console.log([this.x, this.y]);
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
