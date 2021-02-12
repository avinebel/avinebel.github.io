const gameState = {
  score: 0
}

function preload() {
    this.load.image('bird', 'images/bird.png')
    this.load.image('pole', 'images/pole.png')
    this.load.image('city', 'images/city.png')
    this.load.image('ground', 'images/ground.png')
}

function create() {
    gameState.player = this.physics.add.sprite(100, 200, 'bird').setScale(.4);
    gameState.player.setCollideWorldBounds(true);

    gameState.cursors = this.input.keyboard.createCursorKeys();

    gameState.city = this.add.image(0, 0, 'city').setOrigin(0, 0).setDepth(-3)
    gameState.ground = this.physics.add.image(0, 554, 'ground').setOrigin(0, 0).setDepth(-2)
    gameState.ground.setCollideWorldBounds(true)
    gameState.ground.setImmovable(true)

    gameState.scoreText = this.add.text(10, 10, `Score: 0`, { fontSize: '50px', fill: '#FF0000' }).setDepth(4)

    this.physics.add.collider(gameState.player, gameState.ground)

    const poles = this.physics.add.group();
    function createPole() {
      //how to make it with holes, canvas height of 620
      //i think the holes should be 200 gap
        function getYPos(min, max) {
          return Math.random() * (max - min) + min;
        }
        const yPos = getYPos(-10, 80)
        // const yPos = Math.random() * ((config.height / 2) - 200);
        console.log(yPos)
        console.log(yPos + 425)
        const pole1 = poles.create(1200, yPos, 'pole').setOrigin(0.5, 0.3).setFlip(false, true)
        // .setAngle(-180).flipX(true);
        const pole2 = poles.create(1200, yPos + 450, 'pole').setOrigin(0.5, 0.3);
        pole1.setVelocityX(-150); 
        pole2.setVelocityX(-150); 
        // poles.setVelocityY(-200)
        pole1.body.setAllowGravity(false)
        pole1.body.setImmovable(true)
        pole1.outOfBoundsKill = true;
        pole2.body.setAllowGravity(false)
        pole2.body.setImmovable(true)
        pole2.outOfBoundsKill = true;
        gameState.poleTop = pole1
        gameState.poleBottom = pole2
        // poles.setCollideWorldBounds(true);
        // if (pole.x <= gameState.player.x) {
        //   gameState.score += 1;
        //   gameState.scoreText.setText(`Score: ${gameState.score}`)
        // }
    };
    const poleLoop = this.time.addEvent({
        delay: 1500,
        callback: createPole,
        callbackScope: this,
        loop: true,
      });

      // gameState.checkScore = function() {
      //   for (let i = 0; poles[i].x < gameState.player.x; i += 1) {
      //     gameState.score += 1;
      //     gameState.scoreText.setText(`Score: ${gameState.score}`)
      //   }
      // }
    // function scoreCheck() {
    //     for (let i = 0; i < gameState.numPoles; i++) {
    //      if (gameState.allPoles[i].x < gameState.player.x){
    //       gameState.score += 1;
    //       gameState.scoreText.setText(`Score: 69`)
    //     }
    //   }
    // }
    
    // const scoreCheckLoop = this.time.addEvent({
    //   delay: 1,
    //   callback: scoreCheck,
    //   callbackScope: this,
    //   loop: true
    // });    
      // if (poles.x = gameState.player.x) {
      //   gameState.score += 1;
      //   gameState.scoreText.setText(`Score: ${gameState.score}`)
      // }
      
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
    
    gameState.allPoles = poles.getChildren()
    // gameState.numPoles = gameState.allPoles.length;

    // gameState.flight = this.add.tween({
    //   target: gameState.player,
    //   x: 100,
    //   ease: 'Linear',
    //   duration: 1000,
    //   repeat: 1,
    //   yoyo: false,
    //   onStart: function() {
    //   gameState.player.angle += 1
    //   },
    //   onEnd: function(){
    //     gameState.player.angle += -1
    //   }
    // })
    gameState.loopOfPoles = poleLoop
}

function update() {
    if (gameState.cursors.up.isDown || gameState.cursors.space.isDown) {
        gameState.player.setVelocityY(-100)
        // gameState.player.setAngle(-20)
    };
    // gameState.flight.play()
    // gameState.checkScore()
    // for (let i = 0; i < gameState.numPoles; i++) {
      //  if (gameState.allPoles[i].x < gameState.player.x){
    //     gameState.score += 1;
    //     gameState.scoreText.setText(`Score: 69`)
      // }
    // }
    for (let i = 0; i < gameState.allPoles.length; i++) {
      let pole = gameState.allPoles[i]
      if (pole.x < gameState.player.x && !pole.scored) {
        pole.scored = true
        gameState.score += 0.5;
        gameState.scoreText.setText(`Score: ${gameState.score}`)
      }
      if (pole.x <= 0) {
        pole.destroy()
      }
    }
    // if (gameState.score >= 50) {
    //   gameState.poleTop.setVelocityX(-200)
    //   gameState.poleBottom.setVelocityX(-200)
    //   gameState.loopOfPoles.delay = 1000
    // }
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
        enableBody: true
      }
    },
    scene: {
      preload,
      create,
      update
    }
}

const game = new Phaser.Game(config)