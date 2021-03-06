﻿class Ball extends ColoredSprite {
    constructor() {
        super(
            {
                red: new SpriteImage(Game.images['ball_red']),
                green: new SpriteImage(Game.images['ball_green']),
                blue: new SpriteImage(Game.images['ball_blue']),
            }, 'red');
        this.reset();
    }

    get bound() {
        return new Circle(this.position.x, this.position.y, this.width / 2);
    }

    shoot(target: Vector2) {
        this.visible = true;
        this.color = GameWorld.sprites.cannon.color;
        this.velocity = Vector2.times(1.2, Vector2.minus(target, GameWorld.sprites.cannon.position));
        this.position = Vector2.minus(GameWorld.sprites.cannon.ballPosition, Vector2.times(0.5, this.size));
        Sound.Play(Game.audios['shoot_paint'], 0.6);
    }

    handleInput() {
        if (Mouse.left.pressed && !this.visible) {
            this.shoot(Mouse.position);
        }
    }

    update(frameSpan: number) {
        if (GameWorld.lives > 0) {
            this.handleInput();
            if (this.visible) {
                this.velocity.add(Physics.gravity(500, frameSpan));
                this.velocity.add(Physics.resistance(0.001, this.velocity, frameSpan));
                super.update(frameSpan);
            }
            if (this.isOutside(Game.viewport)) {
                this.reset();
            }
        }
    }

    reset() {
        this.visible = false;
    }
} 