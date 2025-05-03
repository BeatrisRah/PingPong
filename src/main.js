import './style.css'
import Phaser from 'phaser'

const scoreModal = document.querySelector('div.score-modal')
const pausedMenuModal = document.querySelector('.pause-modal')
const resumeGameBtn = document.querySelector('.pause-modal button')

const sizes = {
	width:800,
	height:350,
}

const speedDown = 300;
const speedX = 200;

const resetModal = () =>  setTimeout(() => scoreModal.style.display = 'none', 600)

class GameScene extends Phaser.Scene {
    constructor() {
        super('scene-game');
        this.leftPlatform;
		this.rightPlatform;
		this.ball;
        this.cursor;
		this.wasd;
        this.platformSpeed = 300; 
		this.isPaused = false;
    }

    preload() {
        this.load.image('bg', '/BG.jpg');
    }

    create() {
		this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		resumeGameBtn.addEventListener('click', () => {
			this.isPaused = false;
			this.physics.world.resume()
			pausedMenuModal.style.display = 'none'

		})

        const platformColor = 0x0f1b24;
        this.add.image(0, 0, 'bg').setOrigin(0, 0);

        this.leftPlatform = this.add.rectangle(20, sizes.height / 2, 20, 80, platformColor);
		this.rightPlatform = this.add.rectangle(sizes.width - 20, sizes.height / 2, 20, 80,  platformColor)
		this.ball = this.add.circle(400, 150, 15, 0xffffff)

        this.physics.add.existing(this.leftPlatform);
		this.physics.add.existing(this.rightPlatform)
        this.physics.add.existing(this.ball);

		
		this.ball.body.setBounce(1);
		this.ball.body.setCollideWorldBounds(true);
		this.ball.body.setVelocity(200, 200);
		this.ball.body.onWorldBounds = true;
		this.ball.body.setAllowGravity(false);

		this.physics.add.collider(this.ball, this.leftPlatform, () => {
			// this.ball.body.setVelocityX(Math.abs(this.ball.body.velocity.x)); 
			this.ball.body.setVelocityX(this.ball.body.velocity.x * 1.1);
		});
		
		this.physics.add.collider(this.ball, this.rightPlatform, () => {
			// this.ball.body.setVelocityX(-Math.abs(this.ball.body.velocity.x)); 
			this.ball.body.setVelocityX(this.ball.body.velocity.x * 1.1); 
		});

		let speedMultiplier = 1.02; 

		this.physics.world.on('worldbounds', (body, up, down, left, right) => {
			const span = scoreModal.querySelector('span')
			if (body.gameObject === this.ball) { 
				if (left) {
					scoreModal.style.display = 'block'
					resetModal()
					this.resetBall()
					span.textContent = '2'
					console.log("Ball hit the left boundary! Player  scores!");
				} else if (right) {
					scoreModal.style.display = 'block'
					resetModal()
					this.resetBall()
					span.textContent = '1'
					console.log("Ball hit the right boundary! Player 1 scores!");
				} else {
					this.ball.body.setVelocity(
						this.ball.body.velocity.x * speedMultiplier,
						this.ball.body.velocity.y * speedMultiplier
					)
				}


			}
		});
    
        this.leftPlatform.body.setCollideWorldBounds(true); 
        this.leftPlatform.body.setAllowGravity(false);
        this.leftPlatform.body.setImmovable(true);
        

		this.rightPlatform.body.setCollideWorldBounds(true); 
        this.rightPlatform.body.setAllowGravity(false);
        this.rightPlatform.body.setImmovable(true);

        this.cursor = this.input.keyboard.createCursorKeys();
		this.wasd = this.input.keyboard.addKeys({up:'W', down:'S'})

		
    }

    update() {
		if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
			this.isPaused = !this.isPaused;
		
			if (this.isPaused) {
				pausedMenuModal.style.display = 'flex'
				this.physics.world.pause();
			} else {
				pausedMenuModal.style.display = 'none'
				this.physics.world.resume();
			}
		}
		
		if (this.isPaused) return;
        const { up, down } = this.cursor;

        if (up.isDown) {
            this.rightPlatform.body.setVelocityY(-this.platformSpeed);
        } else if (down.isDown) {
            this.rightPlatform.body.setVelocityY(this.platformSpeed);
        } else {
            this.rightPlatform.body.setVelocityY(0);
        }

		if (this.wasd.up.isDown) {
            this.leftPlatform.body.setVelocityY(-this.platformSpeed);
        } else if (this.wasd.down.isDown) {
            this.leftPlatform.body.setVelocityY(this.platformSpeed);
        } else {
            this.leftPlatform.body.setVelocityY(0);
        }

    }

	resetBall() {
		this.ball.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
		this.ball.body.setVelocity(200, 200);
	}
}

const config = {
	type: Phaser.WEBGL,
	width: sizes.width,
	height: sizes.height,
	canvas:gameCanvas,
	physics:{
		default:'arcade',
		arcade:{
			gravity: {
				x: speedX,
				y: speedDown
			},
			debug: false
		}
	},
	scene:[GameScene]
}



const game = new Phaser.Game(config)