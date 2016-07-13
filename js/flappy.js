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
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
var width = 790;
var height = 400;
var pipeEndHeight = 25;
var pipeEndExtraWidth = 12;
var balloons = [];
var weights = [];
var gameGravity = 750;
var splashDisplay;

function preload() {
  game.load.image("playerImg", "../assets/flappy_frog.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe.png");
  game.load.image("pipeEnd","../assets/pipe-end.png");
  game.load.image("balloon","../assets/balloons.png");
  game.load.image("weight","../assets/weight.png");
  game.load.image("Gucci","../assets/guccimane.jpg");

}

//alert("hellow world");

/*
* Initialises the game. This function is only called once.
*/
function create() {
  game.stage.setBackgroundColor("#143D66");
  game.add.tileSprite(0, 0, 790, 400, "Gucci");
  game.add.text(20, 40, "Flappy Gucci", {font: "30px Courier", fill: "#EBF5FF"});
  game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(start);
  game.paused = true;
  splashDisplay = game.add.text(100,200, "Press ENTER get lit, SPACEBAR to turn up", {fill: "#00FA9A"});


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

      for(var i = balloons.length - 1; i >= 0; i--){

      game.physics.arcade.overlap(player, balloons[i], function(){

        changeGravity(-50);
        balloons[i].destroy();
        balloons.splice(i, 1);
        console.log("balloon");
        console.log(player.body.gravity.y);

      });
    }
    for(var i = weights.length - 1; i >= 0; i--){
    game.physics.arcade.overlap(player, weights[i], function(){

        changeGravity(+50);
        weights[i].destroy();
        weights.splice(i, 1);
        console.log("weight");
        console.log(player.body.gravity.y);

    });
}


  }
function start() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.input.onDown.add(clickHandler);
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
  labelScore = game.add.text(20, 20, "0");
  player = game.add.sprite(100, 200, "playerImg");
  player.anchor.setTo(0.5, 0.5);
  game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  .onDown.add(moveRight);
  game.input.keyboard
  .addKey(Phaser.Keyboard.SPACEBAR)
  .onDown
  .add(playerJump);
  var pipeInterval = 1 * Phaser.Timer.SECOND;
  game.time.events.loop(
    pipeInterval,
    generate
  );
  game.physics.arcade.enable(player);
  player.body.velocity.x = 0;
  player.body.velocity.y = -30;
  player.body.gravity.y = gameGravity;
  splashDisplay.destroy();


generatePipe();

game.paused = false;
}

  function gameOver() {
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
    var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart - pipeEndHeight);
    for(var y = gapStart - pipeEndHeight; y > 0; y -= blockHeight) {
      addPipeBlock(width, y - blockHeight);
    }

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);
    for(y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
      addPipeBlock(width, y);
    }

    changeScore();
  }
  function addPipeEnd(x, y) {
    var pipeEnd = game.add.sprite(x,y,"pipeEnd");
    pipes.push(pipeEnd);
    game.physics.arcade.enable(pipeEnd);
    pipeEnd.body.velocity.x = -215
    ;
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
  function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity;
  }
  function generateBalloons(){
    var bonus = game.add.sprite(width, height, "balloon");
    balloons.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 200;
    bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
  }
  function generateWeights(){
    var bonus = game.add.sprite(width, 0, "weight");
    weights.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 200;
    bonus.body.velocity.y =   game.rnd.integerInRange(60, 5);
  }
  function generate() {
    var diceRoll = game.rnd.integerInRange(1, 10);
    if(diceRoll==1) {
      generateBalloons();
    } else if(diceRoll==2) {
      generateWeights();
    } else {
      generatePipe();
    }
  }
