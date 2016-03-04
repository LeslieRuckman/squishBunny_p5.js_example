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
//  spacebrew.connect("sandbox.spacebrew.cc", 9000, "p5.js button ");
   spacebrew.connect("localhost", 9000, "p5.js button ");




  // createBunny

  randomX = random(width);
  randomY = random(height);

  for (i = 0; i < 20; i++) {
    bunnies.push(new BunnyRabbit(random(width), random(height)));
  }

}
// End of setUp

function draw() {
  background(h, 100, 100);

  for (var i = 0; i < bunnies.length; i++) {
    //update
    bunnies[i].move();
    //check
    //bunnies[i].pokes();
    //display
    bunnies[i].display();
  }

  if (bunnies.length === 0) {
    push();
    fill(0, 0, 100);
    textSize(40);
    textAlign(CENTER);
    text("Squish Got 'em!", width / 2, height / 2);
    image(imgSquish, width / 2, (height / 2) - 120);
    pop();

  }
  if (bunnies.length >= 50) {
    push();
    fill(0, 0, 100);
    textSize(40);
    textAlign(CENTER);
    text("Bunny Winner!", width / 2, height / 2);
    image(imgBunnyWin, width / 2, (height / 2) - 120);
    pop();

  }

  if (bunnyWinner === "true") {
    if (bunnies.length <= 50) {
      bunnies.push(new BunnyRabbit(random(width), random(height)));
      newBunny.setVolume(0.3);
      newBunny.play();
      bunntWinner = false;
    }
  }

  if (squishWinner === "true") {
    //   if (bunnies[i].pokes()) {
    bunnies.splice(0, 1);
    squish.setVolume(1);
    squish.play();
    squishWinner = false;
  }
  println(squishWinner);
  println(bunnyWinner);

}

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

  // this.pokes = function() {
  //   if (createSquish == "true") {
  //       return true;
  //     } else {
  //     return false;
  //   }
  // };
}

function onBooleanMessage(name, value) {
  {
    if (name == "createSquish") {
      squishWinner = value;
    } else if (name == "createBunny") {
      bunnyWinner = value;
    }

  }
}