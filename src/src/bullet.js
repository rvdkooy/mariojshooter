const Bullet = function (bottomMargin, world, posX) {
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

export default Bullet;
