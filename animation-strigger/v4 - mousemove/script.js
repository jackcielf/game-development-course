const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect(); // Getting the positions in the canvas

class Explosions {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = "../issets/boom.png";
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
    }
    
    update() {
        this.timer++;
        if (this.timer % 10 === 0) {
            this.frame++;
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y); // Getting with reference the center
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width/2, 0 - this.height/2, this.width, this.height);
        ctx.restore();
    }
}

// window.addEventListener('click', e => {
//     createAnimation(e);
// });

function createAnimation(event) {
    let positionX = event.x - canvasPosition.left;
    let positionY = event.y - canvasPosition.top;
    ctx.fillStyle = "#fff";
    explosions.push(new Explosions(positionX, positionY));
}

window.addEventListener('mousemove', e => {
    createAnimation(e);
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame > 5) {
            explosions.splice(i, 1);
            i--;
        }
    }
    
    requestAnimationFrame(animate);
}

animate();