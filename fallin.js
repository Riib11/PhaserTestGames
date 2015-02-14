var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
	game.load.image('player', 'assets/images/player.png');
	game.load.image('target', 'assets/images/target.png');
	game.load.image('background', 'assets/images/background.png');
	game.load.image('starfield', 'assets/images/starfield.png');
}

var player;
var targets;
var targetTime = 0;

var cursors;

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
	
	// targets group
	targets = game.add.group();
	targets.enableBody = true;
	targets.physicsBodyType = Phaser.Physics.ARCADE;
	targets.createMultiple(30, 'target');
	targets.setAll('anchor.x', 0.5)
	targets.setAll('anchor.y', 1);
    targets.setAll('outOfBoundsKill', true);
    targets.setAll('checkWorldBounds', true);

    // player
    player = game.add.sprite(400, 500, 'player')
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#4d4d4d';
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    cursors = game.input.keyboard.createCursorKeys();

    game.input.onDown.add(gofull, this);
}

function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}

function update() {

	if (cursors.left.isDown) {
        player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 200;
    }

	game.physics.arcade.overlap(targets, player, collisionHandler, null, this);

	if (game.time.now > targetTime) {
		startTarget();
	}

	starfield.tilePosition.y += 2;
}

function startTarget() {

	target = targets.getFirstExists(false);

    if (target) {
        //  And fire it
        var tx = Math.floor(Math.random()*(800-10+1));
        target.reset(tx, 0);
        target.body.velocity.y = Math.floor(Math.random()*(200)+200);
        targetTime = game.time.now + 200;
    }


}

function resetPlayer() {
	player.body.velocity.x = 0;
	player.body.x = 400;
	player.body.y = 500;
}

function collisionHandler(target, player) {
	resetPlayer();
}

function render() {

}