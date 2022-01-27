class PowerUp {
    constructor(ctx, powerUpPosX, powerUpPosY, powerUpImage, powerUpTimer) {
        this.ctx = ctx
        this.powerUpPos = { x: powerUpPosX, y: powerUpPosY }
        this.powerUpSize = { w: 75, h: 75 }
        this.powerUpImage = new Image()
        this.powerUpImage.src = powerUpImage
        this.powerUpTimer = powerUpTimer
        this.powerUpImage.frames = 4
        this.powerUpImage.framesIndex = 0
        this.explosion = new Image()
        this.explosion.src = 'imgs/Fire Effect 2/Fire Effect 2/Explosion SpriteSheet.png'
        this.explosion.frames = 4
        this.powerUpImage.framesIndex = 0
    }


    drawPowerUp() {
        this.ctx.drawImage(this.powerUpImage, this.powerUpImage.framesIndex * (this.powerUpImage.width / this.powerUpImage.frames), 0, this.powerUpImage.width / this.powerUpImage.frames, this.powerUpImage.height, this.powerUpPos.x, this.powerUpPos.y, this.powerUpSize.w, this.powerUpSize.h)
        this.powerUpTimer++
    }

    clearTimer() {
        this.powerUpTimer = 0
    }
}

class PowerUpIce extends PowerUp {
    constructor(ctx, powerUpPosX, powerUpPosY, powerUpImage, powerUpTimer, enemiesArray) {
        super(ctx, powerUpPosX, powerUpPosY, powerUpImage, powerUpTimer)
        this.enemiesArray = enemiesArray
    }
    // Freeze enemies
    activateBooster() {
        this.enemiesArray.forEach(enemy => {

            if (1 < this.powerUpTimer < 490) {
                enemy.enemyVelocity = 0
                this.drawExplosion()
            }

        })
        return this.enemiesArray
    }

    animate(framesCounter) {
        if (framesCounter % 10 == 0) {
            this.powerUpImage.framesIndex++
        }
        if (this.powerUpImage.framesIndex >= this.powerUpImage.frames) {
            this.powerUpImage.framesIndex = 0
        }
    }
    drawExplosion() {
        this.ctx.drawImage(this.explosion, this.explosion.framesIndex * (this.powerUpImage.width / this.powerUpImage.frames), 0, this.powerUpImage.width / this.powerUpImage.frames, this.powerUpImage.height, this.powerUpPos.x, this.powerUpPos.y, this.powerUpSize.w, this.powerUpSize.h)

    }


}

class PowerUpBomb extends PowerUp {
    constructor(ctx, powerUpPosX, powerUpPosY, powerUpImage, powerUpTimer, playerPosX, playerPosY, enemiesArray) {
        super(ctx, powerUpPosX, powerUpPosY, powerUpImage, powerUpTimer)
        this.playerPos = { x: playerPosX, y: playerPosY }
        this.enemiesArray = enemiesArray
    }
    // BOMB
    activateBooster(playerPos, enemiesArray) {
        return enemiesArray.filter((enemy, indexEnemy) => {
            let dXEnemyPlayer = enemy.enemyPos.x - playerPos.x
            let dYEnemyPlayer = enemy.enemyPos.y - playerPos.y

            if ((dXEnemyPlayer < 200 && dXEnemyPlayer > -200) && (dYEnemyPlayer < 200 && dYEnemyPlayer > -200)) {
                return false
            }
            else return true

        })
    }

    animate(framesCounter) {
        if (framesCounter % 10 == 0) {
            this.powerUpImage.framesIndex++
        }
        if (this.powerUpImage.framesIndex >= this.powerUpImage.frames) {
            this.powerUpImage.framesIndex = 0
        }
    }

}

class PowerUpGravity extends PowerUp {
    constructor(ctx, powerUpPosX, powerUpPosY, powerUpImage, powerUpTimer, repelValue) {
        super(ctx, powerUpPosX, powerUpPosY, powerUpImage, powerUpTimer)
        this.repel = repelValue
    }
    activateBooster(playerPos, enemiesArray) {
        enemiesArray.forEach(enemy => {
            // enemy.enemyPos.y += this.gravity
            enemy.enemyVelocity *= this.repel
        })
        return enemiesArray

    }

    animate(framesCounter) {
        if (framesCounter % 10 == 0) {
            this.powerUpImage.framesIndex++
        }
        if (this.powerUpImage.framesIndex >= this.powerUpImage.frames) {
            this.powerUpImage.framesIndex = 0
        }
    }


}