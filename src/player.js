import { keyCodes } from './utils';

const Player = function (bottomMargin, world) {
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

export default Player;
