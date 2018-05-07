const container = document.getElementById('container');
const keyCodes = { LEFT: 37, RIGHT: 39, SPACE: 32 };
const bullets = [];
const enemies = [];
const bottomMargin = 80;

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
    this.height = 20;
    this.posX = ((world.width / 2) - (this.width / 2));
    this.posY = (world.height - bottomMargin);
    this.color = 'white';
    this.direction = 0;
    this.leftDown = false;
    this.rightDown = false;
    this.velocity = 10;

    this.keyUp = (keyCode) => {
        if (keyCode === keyCodes.LEFT) {
            this.leftDown = false;
        }
        if (keyCode === keyCodes.RIGHT) {
            this.rightDown = false;
        }
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
        
        world.ctx.fillStyle = this.color;
        world.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
}

const Bullet = function(world, posX) {
    this.posX = posX;
    this.posY = (world.height - bottomMargin);
    this.color = 'yellow';
    this.radius = 6;
    this.velocity = 15;
    
    this.update = (world) => {
        this.posY = this.posY - this.velocity;
        
        world.ctx.beginPath();
        world.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, false);
        world.ctx.fillStyle = this.color;
        world.ctx.fill();
    }
};

const Enemy = function(world, posX) {
    this.posX = posX;
    this.posY = 0;
    this.width = 40;
    this.height = 40;
    this.color = 'red';
    this.velocity = 3;
    
    this.update = (world) => {
        this.posY = this.posY + this.velocity;
        world.ctx.fillStyle = this.color;
        world.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    };

    this.gotHit = (bulletX, bulletY) => {
        if (bulletX > (this.posX) && bulletX < (this.posX + this.width) &&
            bulletY > this.posY && bulletY < (this.posY + this.height) ) {
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
    if (keyCode === keyCodes.LEFT || keyCode === keyCodes.RIGHT) {
        player.keyDown(keyCode);
    }
    if (keyCode === keyCodes.SPACE) {
        shootBullet(world, player.getCenterPos());        
    }
};

const keyUpEvent = (world, player, keyCode) => {
    if (keyCode === keyCodes.LEFT || keyCode === keyCodes.RIGHT) {
        player.keyUp(keyCode);
    }
};

const shootBullet = (world, posX) => {
    bullets.push(new Bullet(world, posX));
};

const gameLoop = (world, player) => {
    world.clear();
    player.update(world);
    
    if (!enemies.length) {
        enemies.push(new Enemy(world, getRandomInt((player.width / 2), world.width - (player.width / 2))));
    }

    for (let ei = 0; ei < enemies.length; ei++) {
        const enemy = enemies[ei];
        if (enemy.posY > world.height) {
            enemies.splice(ei, 1);
        } else {
            enemy.update(world);
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
                }
            }

        }
    }

    window.requestAnimationFrame(() => {
        gameLoop(world, player);
    });
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

initGame();
