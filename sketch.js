var balloon;
var database, balloonposition;

function preload(){

backgroundImg = loadImage("Hot Air Ballon-01.png");
hotairballoon = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png")

}

function setup() {
  database = firebase.database();

  createCanvas(1518, 730);
  balloon = createSprite(400, height/2, 1, 1);
  balloon.addAnimation("hotairballoon", hotairballoon);   
  balloon.scale = 0.75;

  var ballposition = database.ref("Balloon/Position");
  ballposition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg); 
  

  if(keyDown(LEFT_ARROW) && balloon.x > 100){
    writePosition(-15, 0);
  }
  else if(keyDown(RIGHT_ARROW) && balloon.x < 1420){
    writePosition(15, 0);                                                            
  }
  else if(keyDown(UP_ARROW) && balloon.y > 0){
    writePosition(0, -15); 
    balloon.scale = balloon.scale - 0.02;                                                     
  }
  else if(keyDown(DOWN_ARROW) && balloon.y < 500){
    writePosition(0, 15);
    balloon.scale = balloon.scale+0.02;                                                           
  }


  drawSprites();

  fill(37, 247, 58);
  stroke("black");
  strokeWeight(2);
  textSize(50);
  text("AIR BALLOON RIDE", 550, 50);
  textSize(40)
  text("Use 'Arrow keys' to move Hot Air Ballon", 25, 100)

}

function readPosition(data){
position = data.val();
balloon.x = position.x;
balloon.y = position.y;
}

function writePosition(x, y){
database.ref('Balloon/Position').set({
  x:balloon.x + x,
  y:balloon.y + y,
})
}

function showError(){
  console.log("error");
}