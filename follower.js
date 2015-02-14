var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('arrow', 'assets/images/player.png');
}

var sprite;
// var target;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#0072bc';

    sprite = game.add.sprite(400, 300, 'arrow');
    sprite.anchor.setTo(0.5, 0.5);
    // target = game.add.sprite(0,0, 'arrow')

    //  Enable Arcade Physics for the sprite
    game.physics.enable(sprite, 0);
    // game.physics.enable(taget, 0)

    //  Tell it we don't want physics to manage the rotation
    sprite.body.allowRotation = false;

}

function update() {

    sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 500);

}

// function playerContainsTarget() {
//     if(game.physics.intersects(sprite, target) return true;
//     else return false;
// }

// function resetTarget() {

// }

function render() {

    game.debug.spriteInfo(sprite, 32, 32);

}