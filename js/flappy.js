// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
* Loads all resources for the game and gives them names.
*/
var score;
score = 0;
var player;
var labelScore;
var gapStart = game.rnd.integerInRange(1, 5);
var pipes = [];

function preload() {
  game.load.image("playerImg", "../assets/flappy_frog.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe.png");

}

//alert("hellow world");

/*
* Initialises the game. This function is only called once.
*/
function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.setBackgroundColor("#143D66");
  game.add.text(20, 40, "Flappy Frog", {font: "30px Courier", fill: "#EBF5FF"});
  game.input.onDown.add(clickHandler);
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
  labelScore = game.add.text(20, 20, "0");
  player = game.add.sprite(100, 200, "playerImg");
  player.anchor.setTo(0.5, 0.5);
  game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  .onDown.add(moveRight);
  game.physics.arcade.enable(player);
  player.body.velocity.x = 0;
  player.body.velocity.y = -30;
  player.body.gravity.y = 750;
  game.input.keyboard
  .addKey(Phaser.Keyboard.SPACEBAR)
  .onDown
  .add(playerJump);
  var pipeInterval = 1 * Phaser.Timer.SECOND;
  game.time.events.loop(
    pipeInterval,
    generatePipe
  );


  generatePipe();

  // set the background colour of the scene

}

/*
* This function updates the scene. It is called for every new frame.
*/
function update() {
  if(player.body.y < 0 || player.body.y > 400) {
    gameOver();
  }
  player.rotation = Math.atan(player.body.velocity.y / 1000);
  if(player.body.y < 0) {
      gameOver();
  }
  if(player.body.y > 400){
      gameOver();
  }
  game.physics.arcade.overlap(
    player,
    pipes,
    gameOver);
  }
  function gameOver() {
    console.log("1");
    registerScore(score);
    score=0;
      game.state.restart();
  }
function clickHandler(event) {
  game.add.sprite(event.x - 25, event.y - 25, "playerImg");
}
function spaceHandler() {
  game.sound.play("score");
}
function changeScore() {
  score = score + 1;

    labelScore.setText(score.toString());


}
function moveRight() {
  player.x = player.x + 10;
}
function generatePipe() {
  var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count < 8; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(750, count * 50);
        }
    }
    changeScore();
    game.world.bringToTop(labelScore);
}
function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -215
  ;
}
function playerJump() {
  player.body.velocity.y = -275;
}
