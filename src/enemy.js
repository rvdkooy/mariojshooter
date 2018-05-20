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

export default Enemy;
