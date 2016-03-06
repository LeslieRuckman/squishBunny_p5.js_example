var bunnies = [];
var imgBunny;
var imgSquish;
var imgBunnyWin;

var fr = 60;
var h = 300;
var bunnyWinner = false;
var squishWinner = false;
var name;
var value;


function preload() {
  imgBunny = loadImage("assets/Bunny.png");
  imgSquish = loadImage("assets/Squish.png");
  imgBunnyWin = loadImage("assets/BunnyWinner.png");

  squish = loadSound("assets/Squishy.wav");
  newBunny = loadSound("assets/NewBunny.wav");

}


function setup() {
  spacebrew = new Spacebrew();

  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  var h = random(360);

  spacebrew.addPublish("Bunny_pressed", "boolean", true);
  spacebrew.addPublish("Squish_pressed", "boolean", true);

  // delcare subscribers
  spacebrew.addSubscribe("createBunny", "boolean", false);
  spacebrew.addSubscribe("createSquish", "boolean", false);

  // connect boolean function
  spacebrew.onBooleanMessage(onBooleanMessage);

  // connect to spacebrew
  spacebrew.connect("sandbox.spacebrew.cc", 9000, "p5.js button ");
//   spacebrew.connect("localhost", 9000, "p5.js button ");




  // create the array of bunnies
  randomX = random(width);
  randomY = random(height);
  for (i = 0; i < 20; i++) {
    bunnies.push(new BunnyRabbit(random(width), random(height)));
  }

}
// End of setUp

function draw() {
  background(h, 100, 100);
  push();
  fill(0, 0, 100);
  textSize(15);
  textAlign(LEFT);
  text("SquishBunny is a game you can play with 2 people through Spacebrew", 30, height - 50);
  text("Connect to me here bit.ly/sbadmin-cloud", 30, height - 30);
  pop();

  for (var i = 0; i < bunnies.length; i++) {
    //update
    bunnies[i].move();
    //check
    //display
    bunnies[i].display();
  }

  // declare the conditions for the squisher to win the game
  if (bunnies.length === 0) {
    push();
    fill(0, 0, 100);
    textSize(40);
    textAlign(CENTER);
    text("Squish Got 'em!", width / 2, height / 2);
    image(imgSquish, width / 2, (height / 2) - 120);
    pop();

  }
  
  // delcare the conditions for the bunny creator to win the game
  if (bunnies.length >= 55) {
    push();
    fill(0, 0, 100);
    textSize(40);
    textAlign(CENTER);
    text("Bunny Winner!", width / 2, height / 2);
    image(imgBunnyWin, width / 2, (height / 2) - 120);
    pop();

  }

// add bunnies to the array each time the bunnyWinner spacebrew button is pressed
  if (bunnyWinner === "true") {
    if (bunnies.length <= 50) {
      bunnies.push(new BunnyRabbit(random(width), random(height)));
      newBunny.setVolume(0.3);
      newBunny.play();
      bunntWinner = false;
    }
  }

// delete one of the bunnies each time squishWinner spacebrew button is pressed
  if (squishWinner === "true") {
    bunnies.splice(0, 1);
    squish.setVolume(1);
    squish.play();
    squishWinner = false;
  }

  //println(squishWinner);
  //println(bunnyWinner);

}

// define the bunnies
function BunnyRabbit(x, y) {
  this.x = x;
  this.y = y;

  this.display = function(x, y) {
    noStroke();
    fill(255);
    imageMode(CENTER);
    image(imgBunny, this.x, this.y);
  };

  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  };
}

// read boolean inputs from the spacebrew buttons.

function onBooleanMessage(name, value) {
  {
    if (name == "createSquish") {
      squishWinner = value;
    } else if (name == "createBunny") {
      bunnyWinner = value;
    }

  }
}
