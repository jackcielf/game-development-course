const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = '../issets/shadow_dog.png';
const spriteWidth = 573; // Resultado obtido do cálculo da largura (width) da imagem dividido pela quantidade de colunas | 6876 / 12 = 573
const spriteHeight = 523; // Como a imagem aqui usada tem dimensões diferentes é necessário fazer outro cálculo, agora o comprimento (height) da imagem dividido pela quantidade de linhas/fileiras

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(playerImage, 0, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    requestAnimationFrame(animate);
}

animate();