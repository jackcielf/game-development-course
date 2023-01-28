/** @type { HTMLCanvasElement } */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

class Enemy {
    constructor() {
        this.x = 10;
        this.y = 50;
        this.width = 100;
        this.height = 100;
    }
    
    update() {
        this.x++;
        this.y++;
    }
    
    draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const enemy1 = new Enemy(); // This object 'Enemy' is related with the class 'Enemy'

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemy1.draw();
    enemy1.update();
    
    requestAnimationFrame(animate);
}

animate();