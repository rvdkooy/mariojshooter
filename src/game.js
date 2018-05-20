import Player from './player';
import Enemy from './enemy';
import Bullet from './bullet';
import { beep } from './sounds';
import { keyCodes, getRandomInt } from './utils';
const container = document.getElementById('container');

let bullets = [];
let enemies = [];
const bottomMargin = 182;
const backgroundImage = document.getElementById('background');
const mario = document.getElementById('mario');
const goomba = document.getElementById('goomba');
const spiny = document.getElementById('spiny');
const bulletBill = document.getElementById('bullet');
let score = 0;
let gameOver = false;

const create2DWorld = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    canvas.className = 'world';
    const ctx = canvas.getContext("2d");

    container.appendChild(canvas);

    return {
        ctx: ctx,
        width: canvas.width,
        height: canvas.height,
        clear: () => ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
};

const initGame = () => {
    const world = create2DWorld();
    const player = new Player(bottomMargin, world);
    window.requestAnimationFrame(() => {
        gameLoop(world, player);
    });

    document.addEventListener('keydown', (e) => keyDownEvent(world, player, e.keyCode));
    document.addEventListener('keyup', (e) => keyUpEvent(world, player, e.keyCode));
}

const keyDownEvent = (world, player, keyCode) => {
    if (!gameOver) {
        if (keyCode === keyCodes.LEFT || keyCode === keyCodes.RIGHT) {
            player.keyDown(keyCode);
        }
        if (keyCode === keyCodes.SPACE) {
            shootBullet(world, player.getCenterPos());
        }
    } else {
        if (keyCode === keyCodes.SPACE) {
            restartGame(world, player);
        }
    }
};

const keyUpEvent = (world, player, keyCode) => {
    if (keyCode === keyCodes.LEFT || keyCode === keyCodes.RIGHT) {
        player.keyUp(keyCode);
    }
};

const shootBullet = (world, posX) => {
    if (bullets.length < 2) {
        beep();
        bullets.push(new Bullet(bottomMargin, world, posX));
    }
};

const restartGame = (world, player) => {
    gameOver = false;
    enemies = [];
    bullets = [];
    score = 0;
    player.positionCenter();
    window.requestAnimationFrame(() => {
        gameLoop(world, player);
    });
};

const createGoomba = (world, player) => 
    new Enemy(world, goomba, 70, 81,
        getRandomInt((player.width / 2), world.width - (player.width / 2)));

const createSpiny = (world, player) => 
    new Enemy(world, spiny, 70, 74,
        getRandomInt((player.width / 2), world.width - (player.width / 2)));

const createBulletBill = (world, player) => 
    new Enemy(world, bulletBill, 70, 80,
        getRandomInt((player.width / 2), world.width - (player.width / 2)));

const gameLoop = (world, player) => {
    world.clear();
    world.ctx.drawImage(backgroundImage, 0, 0, world.width, world.height + 70);

    player.update(world);

    if (!enemies.length) {
        const random = getRandomInt(1, 3);
        switch (random) {
            case 1:
                enemies.push(createSpiny(world, player));
                break;
            case 2:
                enemies.push(createGoomba(world, player));
                break;
            case 3:
                enemies.push(createBulletBill(world, player));
                break;
        }
    }

    // detect if an enemy git the bottom
    for (let ei = 0; ei < enemies.length; ei++) {
        const enemy = enemies[ei];
        if (enemy.posY > world.height) {
            enemies.splice(ei, 1);
        } else {
            enemy.update(world);
            if ((enemy.posY + enemy.height) >= world.height) {
                gameOver = true;
            }
        }
    }

    // detect if a bullet hits an enemy
    for (let bi = 0; bi < bullets.length; bi++) {
        const bullet = bullets[bi];
        if (bullet.posY < 0) {
            bullets.splice(bi, 1);
        } else {
            bullet.update(world);

            for (let ei = 0; ei < enemies.length; ei++) {
                const enemy = enemies[ei];
                if (enemy.gotHit(bullet.posX, bullet.posY)) {
                    enemies.splice(ei, 1);
                    bullets.splice(bi, 1);
                    score = score + 10;
                }
            }

        }
    }

    world.ctx.font = '30px Arial';
    world.ctx.fillStyle = 'white';
    world.ctx.fillText(`Score: ${score}`, 10, 50);

    if (!gameOver) {
        window.requestAnimationFrame(() => {
            gameLoop(world, player);
        });
    }
};

initGame();
