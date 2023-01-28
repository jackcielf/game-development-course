/** @type { HTMLCanvasElement } */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100;
const enemiesArray = [];

const enemyImage = new Image();
enemyImage.src = "../issets/enemy1.png";
let gameFrame = 0;

class Enemy {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 4 - 2;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }
    
    update() {
        this.x += this.speed;
        this.y += this.speed;
        
        // Animate sprites
        if (gameFrame % 2 === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    
    draw() {
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    enemiesArray.map(enemy => {
        enemy.update();
        enemy.draw();
    });
    
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();