/** @type { HTMLCanvasElement } */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

/*
const enemy1 = {
    x: 50,
    y: 100, 
    width: 200,
    height: 200
}
*/

class Enemy {
    constructor() {
        this.x = 10;
        this.y = 50;
        this.width = 100;
        this.height = 100;
    }
}

const enemy1 = new Enemy();
const enemy2 = new Enemy();

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
    ctx.fillRect(enemy2.x, enemy2.y, enemy2.width, enemy2.height);
    enemy1.x++;
    enemy1.y++;
    enemy2.x+=0.5;
    enemy2.y+=0.5;
    
    requestAnimationFrame(animate);
}

animate();