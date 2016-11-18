function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// Enemies our player must avoid
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
    if (this.x > 500) {
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

// The player class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.x = x;
    this.y = y;
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

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.y < 0) {
        this.y = 0;
    }

    if (this.y > 400) {
        this.y = 400;
    }

    for (i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + allEnemies[i].width &&
        this.x + this.width > allEnemies[i].x &&
        this.y < allEnemies[i].y + allEnemies[i].height &&
        this.y + this.height > allEnemies[i].y) {
            this.collision();
        }
    }
};

Player.prototype.collision = function () {
    if (this.lives > 1) {
        this.lives -= 1;
        console.log ("Collision! You have " + this.lives + " lives left!");
     }
     else {
         window.alert ("You lose!");
     }
    this.x = 200;
    this.y = 400;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    drawBox(this.x + 15, this.y + 60, 70, 80, "red");
};

//Enable the player to be moved around the  canvas
Player.prototype.handleInput = function(movement){
    if (movement == "left") {
        this.x -= 100;
    }
    if (movement == "right") {
        this.x += 100;
    }
        if (movement == "up") {
        this.y -= 80;
    }
        if (movement == "down") {
        this.y += 80;
    }
};

// Place the player object in a variable called player
var player = new Player(200,400);

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
