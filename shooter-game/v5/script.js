const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];
class Raven {
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3; // Velocidade X
        this.dirextionY = Math.random() * 5 - 2.5; // Velocidade Y
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = "../issets/raven.png";
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
    }
    
    update(deltaTime) {
        this.x -= this.directionX;
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
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;
    
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
    }
    
    // Drawing objects at the screen
    [...ravens].map(object => object.update(deltaTime));
    [...ravens].map(object => object.draw());
    
    ravens = ravens.filter(obj => !obj.markedForDeletion);
    requestAnimationFrame(animate);
}

animate(0);