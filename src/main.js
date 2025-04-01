import './style.css'
import Phaser from 'phaser'

const sizes = {
	width:500,
	heigth:500,
}

const speedDown = 300;
const speedX = 200;

const config = {
	type: Phaser.AUTO,
	width: sizes.width,
	heigth:sizes.heigth,
	canvas:gameCanvas,
	physics:{
		default:'arcade',
		arcade:{
			gravity: {
				x: speedX,
				y: speedDown
			},
		}
	}
}

const game = new Phaser.Game(config)