const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect(); // Getting the positions in the canvas
console.log(canvasPosition);

class Explosions {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.image = new Image();
        this.image.src = "../issets/boom.png";
        this.frame = 0;
    }
    
    update() {
        this.frame++;
    }
    
    draw() {
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

window.addEventListener('click', event => {
    console.log(event);
    ctx.fillStyle = "#fff";
    ctx.fillRect(event.x, event.y, 50, 50);
});