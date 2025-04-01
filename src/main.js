import './style.css'
import Phaser from 'phaser'

const sizes = {
	width:800,
	height:350,
}

const speedDown = 300;
const speedX = 200;

class GameScene extends Phaser.Scene {
    constructor() {
        super('scene-game');
        this.leftPlatform;
		this.rightPlatform;
        this.cursor;
		this.wasd;
        this.platformSpeed = 300; 
    }

    preload() {
        this.load.image('bg', '/BG.jpg');
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
    }

    update() {
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
			debug: true
		}
	},
	scene:[GameScene]
}

const game = new Phaser.Game(config)