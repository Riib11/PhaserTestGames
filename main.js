var game = new Phaser.Game(800, 500, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create , update: update, render: render});

var player;
var cursors;
var target;

function preload() {
	 game.load.image('player', 'assets/images/player.png');
	 game.load.image('background','assets/images/background.png');
     game.load.image('target', 'assets/images/target.png');
	 cursors = game.input.keyboard.createCursorKeys();
}


function create() {
    // background
    game.add.sprite(0,0,'background')

    // midground
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    var offsetX = game.world.centerX + 200;
    var offsetY = game.world.centerY + 200;
    target = game.add.sprite(offsetX, offsetY, 'target');

    // forground
    // var text = "Hello World!";
    // var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    // game.add.text(game.world.centerX-170, game.world.centerY-50, text, style);

    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.enable(target, Phaser.Physics.ARCADE);
    player.body.allowRotation = false;
}

function update() {

	// player.rotation = game.physics.arcade.moveToPointer(player, 60, game.input.activePointer, 500);

 	player.body.velocity.setTo(0, 0);
    if (cursors.left.isDown) {
        player.body.velocity.x = -500;
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 500;
    }
    if (cursors.up.isDown) {
    	player.body.velocity.y = -500;
    } else if (cursors.down.isDown) {
    	player.body.velocity.y = 500;
    }

    // if(player.body.contains(target.body)) {
    //     alert("Collided!");
    // }

}

function render() {
	game.debug.spriteInfo(player, 32, 32);
    game.debug.spriteInfo(target, 32, 122);
}