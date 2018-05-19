const container = document.getElementById('container');
const keyCodes = { LEFT: 37, RIGHT: 39, SPACE: 32 };
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

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}

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

const Player = function (world) {
    this.width = 100;
    this.height = 128;
    this.color = 'white';
    this.direction = 0;
    this.leftDown = false;
    this.rightDown = false;
    this.velocity = 2;

    this.positionCenter = () => {
        this.posX = ((world.width / 2) - (this.width / 2));
        this.posY = (world.height - bottomMargin);
    };

    this.keyUp = (keyCode) => {
        if (keyCode === keyCodes.LEFT) {
            this.leftDown = false;
        }
        if (keyCode === keyCodes.RIGHT) {
            this.rightDown = false;
        }
        this.velocity = 2;
    }

    this.getCenterPos = () => {
        return this.posX + (this.width / 2);
    }

    this.keyDown = (keyCode) => {
        if (keyCode === keyCodes.LEFT && !this.leftDown) {
            this.leftDown = true;
        }

        if (keyCode === keyCodes.RIGHT && !this.rightDown) {
            this.rightDown = true;
        }
    }

    this._detectWorldBoundary = (width, newPos) => {
        if (newPos < 0 || (newPos + this.width) > width) {
            return true;
        }
    }

    this.update = (world) => {
        if ((this.leftDown || this.rightDown) && this.velocity < 10) {
            this.velocity += 1;
        }

        if (this.leftDown && !this.rightDown) {
            const newPos = this.posX - this.velocity;
            if (!this._detectWorldBoundary(world.width, newPos)) {
                this.posX = newPos;
            } else {
                this.posX = 0;
            }
        }

        if (this.rightDown && !this.leftDown) {
            const newPos = this.posX + this.velocity;
            if (!this._detectWorldBoundary(world.width, newPos)) {
                this.posX = newPos;
            } else {
                this.posX = world.width - this.width;
            }
        }

        world.ctx.drawImage(mario, this.posX, this.posY, this.width, this.height);
    }

    this.positionCenter();
}

const Bullet = function (world, posX) {
    this.posX = posX;
    this.posY = (world.height - bottomMargin);
    this.color = 'orange';
    this.radius = 10;
    this.velocity = 15;

    this.update = (world) => {
        this.posY = this.posY - this.velocity;

        world.ctx.beginPath();
        world.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, false);
        world.ctx.fillStyle = this.color;
        world.ctx.fill();
    }
};

const Enemy = function (world, image, width, height, posX) {
    this.posX = posX;
    this.posY = 0;
    this.width = width;
    this.height = height;
    this.velocity = 3;
    this.image = image;
    this.update = (world) => {
        this.posY = this.posY + this.velocity;
        world.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    };

    this.gotHit = (bulletX, bulletY) => {
        if (bulletX > (this.posX) && bulletX < (this.posX + this.width) &&
            bulletY > this.posY && bulletY < (this.posY + this.height)) {
            return true;
        }
    };
}

const initGame = () => {
    const world = create2DWorld();
    const player = new Player(world);
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
        bullets.push(new Bullet(world, posX));
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

initGame();
