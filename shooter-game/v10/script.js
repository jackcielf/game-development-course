const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0;
ctx.font = "35px 'Press Start 2P'";

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];
class Raven {
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.6 + 0.4; // Size objects
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3; // Velocidade X
        this.directionY = Math.random() * 5 - 2.5; // Velocidade Y
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = "../issets/raven.png";
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [ 
            Math.floor(Math.random() * 255), 
            Math.floor(Math.random() * 255), 
            Math.floor(Math.random() * 255)
        ];
        this.color = `rgb(
            ${this.randomColors[0]}, 
            ${this.randomColors[1]}, 
            ${this.randomColors[2]}
        )`;
    }
    
    update(deltaTime) {
        // Impedindo que o objeto saia da tela (cima e baixo)
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY *= -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        
        // Tempo de animação
        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval) {
            // Animação - bater de asas
            this.frame > this.maxFrame ? this.frame = 0 : this.frame++;
            this.timeSinceFlap = 0;
        }
    }
    
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

let explosions = [];
class Explosion {
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = "../issets/boom.png";
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.timeSinceFrame = 0;
        this.frameInterval = 200;
        this.sound = new Audio();
        this.sound.src = "../sounds/crow_caw.wav";
        this.markedForDeletion = false;
    }
    
    update(deltaTime) {
        if (this.frame === 0) this.sound.play();
        this.timeSinceFrame += deltaTime;
        if (this.timeSinceFrame > this.frameInterval) {
            this.frame++;
            if (this.frame > 5) this.markedForDeletion = true;
        }
    }
    
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.size, this.size);
    }
}

function drawScore() {
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: ${score}`, 50, 75);
    ctx.fillStyle = "#fff";
    ctx.fillText(`Score: ${score}`, 55, 80);
}

window.addEventListener("click", e => {
    const delectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    const pc = delectPixelColor.data;
    
    ravens.forEach(obj => {
        if (obj.randomColors[0] === pc[0] && obj.randomColors[1] === pc[1] && obj.randomColors[2] === pc[2]) {
            // Collision detection
            obj.markedForDeletion = true;
            score++;
            explosions.push(new Explosion(obj.x, obj.y, obj.width));
        }
    })
});

function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
        
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;
    
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort((a, b) => {
            return a.width - b.width;
        });
    }
    
    drawScore();
    
    // Drawing objects at the screen
    [...ravens, ...explosions].map(object => object.update(deltaTime));
    [...ravens, ...explosions].map(object => object.draw());
    
    ravens = ravens.filter(obj => !obj.markedForDeletion);
    explosions = explosions.filter(obj => !obj.markedForDeletion);
    requestAnimationFrame(animate);
}

animate(0);