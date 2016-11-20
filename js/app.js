function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

//********* Enemies our player must avoid ************//
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.width = 85;
    this.height = 65;
    this.speed = Math.floor(Math.random() * 100) + 50;
    this.sprite = 'images/enemy-bug.png';
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
    drawBox(this.x, this.y + 77, 100, 67, "yellow");
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemy1 = new Enemy (0,70);
var enemy2 = new Enemy (0,150);
var enemy3 = new Enemy (100,230);
allEnemies.push (enemy1, enemy2, enemy3);

//********** Stars to collect *****************//
var Star = function (x,y){
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.sprite = 'images/Star.png';
};

Star.prototype.render = function() {
    ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
};

var allStars = [];
var Star1 = new Star (500, 325);
var Star2 = new Star (100, 240);
var Star3 = new Star (600, 155);
allStars.push(Star1, Star2, Star3);

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

var key = new Key (0,-10);

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
var rock1 = new Rock (300,-20);
var rock2 = new Rock (500,395);
var rock3 = new Rock (200,230);
allRocks.push(rock1, rock2, rock3);

//*********** The player *************//
// requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.playerPosition = []; //record player's x-y coordinate (to use when hitting rock)
    this.width = 60;
    this.height = 70;
    this.lives = 3;
    this.sprite = 'images/char-boy.png';
};

//Prevent player icon from moving out of the canvas
Player.prototype.update = function(dt) {
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

    //collide with bugs
    for (i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + allEnemies[i].width &&
        this.x + this.width > allEnemies[i].x &&
        this.y < allEnemies[i].y + allEnemies[i].height &&
        this.y + this.height > allEnemies[i].y) {
            this.collision();
        }
    }

    //collide with rocks
    for (i = 0; i < allRocks.length; i++){
        if (this.x < allRocks[i].x + allRocks[i].width &&
        this.x + this.width > allRocks[i].x &&
        this.y < allRocks[i].y + allRocks[i].height &&
        this.y + this.height > allRocks[i].y) {
            this.coordinate();
            this.x = this.playerPosition[this.playerPosition.length-1][0];
            this.y = this.playerPosition[this.playerPosition.length-1][1];
            this.coordinate();
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
    this.x = 300;
    this.y = 570;
}

Player.prototype.coordinate = function () {
    console.log (this.playerPosition);
    console.log (this.x);
    console.log (this.y);
    return;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    drawBox(this.x + 15, this.y + 60, 70, 80, "red");
};

//Enable the player to be moved around the canvas
Player.prototype.handleInput = function(movement){
    if (movement == "left") {
        this.playerPosition.push ([this.x, this.y]);
        this.x -= 100;

    }
    if (movement == "right") {
        this.playerPosition.push ([this.x, this.y]);
        this.x += 100;

    }
    if (movement == "up") {
        this.playerPosition.push ([this.x, this.y]);
        this.y -= 83;

    }
    if (movement == "down") {
        this.playerPosition.push ([this.x, this.y]);
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
