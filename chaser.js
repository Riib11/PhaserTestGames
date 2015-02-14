var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
	game.load.image('player', 'assets/images/player.png');
	game.load.image('target', 'assets/images/target.png');
	game.load.image('background', 'assets/images/background.png');
}

var active = false;

var player;
var target;

var score;
var scoreString;
var scoreText;

var seconds;
var secondsString;
var secondsText;

var cursors;

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.add.sprite(0,0, 'background');

	player = game.add.sprite(400, 400, 'player');;
	player.anchor.setTo(0.5, 0.5);
	game.physics.enable(player, Phaser.Physics.ARCADE);

	target = game.add.sprite(200,100, 'target');
	target.anchor.setTo(0.5, 0.5);
	game.physics.enable(target, Phaser.Physics.ARCADE);

	score = 0;
	scoreString = 'Score: ';
	scoreText = game.add.text(10,40, scoreString + score, { font: '34px Arial', fill: '#fff' });

	seconds = 0;
	secondsString = 'Seconds : ';
    secondsText = game.add.text(10, 10, secondsString + seconds, { font: '34px Arial', fill: '#fff' });

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	if(active) {
		console.log(game.input.keyboard.lastKey);
		// if(game.input.keyboard.lastKey.keyCode == Phaser.Keyboard.ESC) {
		// 	timerStart();	
		// } else {
			seconds += game.time.elapsed;
			updateSecondsText();
			player.body.velocity.setTo(0, 0);
		    
		    if (cursors.left.isDown) {
				player.body.velocity.x = (cursors.up.isDown || cursors.down.isDown) ? 
					-( Math.sqrt(2) * 200) : -400;
			} else if (cursors.right.isDown) {
				player.body.velocity.x = (cursors.up.isDown || cursors.down.isDown) ? 
					( Math.sqrt(2) * 200) : 400;
			}
			if (cursors.up.isDown) {
				player.body.velocity.y = (cursors.left.isDown || cursors.right.isDown) ? 
					-( Math.sqrt(2) * 200) : -400;
			} else if (cursors.down.isDown) {
				player.body.velocity.y = (cursors.left.isDown || cursors.right.isDown) ? 
					( Math.sqrt(2) * 200) : 400;
			}
		    game.physics.arcade.overlap(player, target, playerCollideTarget, null, this);
		// }
	}
}

function playerCollideTarget() {
	target.body.x = Math.floor(Math.random()*(800-10+1));
	target.body.y = Math.floor(Math.random()*(600-10+1));
	score++;
	scoreText.text = scoreString + score;
}

function timerStart() {
	if(active) {
		active = false;
		document.getElementById("button_start").innerHTML = "CONTINUE";
	} else {
		active = true;
		document.getElementById("button_start").innerHTML = "PAUSE";
	}
}

function gameReset() {
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;
	player.body.x = 400;
	player.body.y = 400;
	target.body.velocity.x = 0;
	target.body.velocity.y = 0;
	target.body.x = 200;
	target.body.y = 100;
	seconds = 0;
	score = 0;
	active = false;
	update();
	document.getElementById("button_start").innerHTML = "START";
}

function updateSecondsText() {
	secondsText.text = secondsString + (Math.floor(seconds/100) / 10);
}









function render() {

}