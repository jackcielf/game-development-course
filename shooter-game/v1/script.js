const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ravens = [];

class Raven {
    constructor() {
        this.width = 100;
        this.height = 50;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3; // Velocidade X
        this.dirextionY = Math.random() * 5 - 2.5; // Velocidade Y
    }
    
    update() {
        this.x -= this.directionX;
    }
    
    draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const raven = new Raven();

function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    raven.update();
    raven.draw();
    requestAnimationFrame(animate);
}

animate();