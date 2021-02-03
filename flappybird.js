const gameState = {
  score: 0
}

function preload() {
    this.load.image('bird', 'images/bird.png')
    this.load.image('pole', 'images/pole.png')
}

function create() {
    gameState.player = this.physics.add.sprite(100, 200, 'bird').setScale(.4);
    gameState.player.setCollideWorldBounds(true);

    gameState.cursors = this.input.keyboard.createCursorKeys();

    gameState.scoreText = this.add.text(10, 10, `Score: 0`, { fontSize: '50px', fill: '#FF0000' }).setDepth(4)

    const poles = this.physics.add.group();

    function createPole() {
        const yPos = Math.random() * config.height; 
        const pole = poles.create(1200, yPos, 'pole');
        pole.setVelocityX(-100); 
        // poles.setVelocityY(-200)
        pole.body.setAllowGravity(false)
        pole.body.setImmovable(true)
        pole.outOfBoundsKill = true;
        // poles.setCollideWorldBounds(true);
        // if (pole.body.x <= 100) {
        //   gameState.score += 1
        // }
    };
    const poleLoop = this.time.addEvent({
        delay: 2500,
        callback: createPole,
        callbackScope: this,
        loop: true,
      });
    
    if (gameState.player.x === poles.x) {
      gameState.score += 1;
      gameState.scoreText.setText(`Score: ${gameState.score}`)
    }
      
    this.physics.add.collider(gameState.player, poles, () => {
      this.physics.pause();
      poleLoop.destroy();
      this.add.text(config.width / 2 - 170, config.height / 2 - 75, 'GAME OVER', { fontSize: '50px', fill: '#FF0000' });
      this.add.text(config.width / 2 - 155, config.height / 2 - 35, 'Click to Restart', { fontSize: '25px', fill: '#FF0000' });
      this.input.on('pointerup', () => {
        gameState.score = 0;
        this.scene.restart();
      });
    })
}

function update() {
    if (gameState.cursors.up.isDown) {
        gameState.player.setVelocityY(-100)
    } 
}

const config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 620,
    backgroundColor: "0x87ceeb",
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
        enableBody: true,
        debug: true
      }
    },
    scene: {
      preload,
      create,
      update
    }
}

const game = new Phaser.Game(config)