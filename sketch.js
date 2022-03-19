var towerImg, tower;
var climberImg, climber, climberGroup;
var doorImg, door, doorGroup;
var ghost, ghost;
var invisibleblock, invisibleblockGroup;
var gamestate="play";

function preload(){
  towerImg=loadImage("tower.png");
  climberImg=loadImage("climber.png");
  doorImg=loadImage("door.png");
  ghostImg=loadImage("ghost-jumping.png");
  spookySound=loadSound("spooky.wav");
}
function setup(){
 createCanvas(600,600);
 //spookySound.loop();
 tower=createSprite(300,300);
 tower.scale=1;
 tower.addImage(towerImg);
 tower.velocityY=4;

 ghost=createSprite(300,300);
 ghost.scale=0.3;
 ghost.addImage(ghostImg);
 tower.y=tower.height/2;
 doorGroup=createGroup();
 climberGroup=createGroup();
 invisibleblockGroup=createGroup();
}
function draw(){
  background("black");
  if(gamestate==="play"){
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  if(tower.y>400){
    tower.y=300;
  }
  spawnDoors();
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gamestate="end"
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  drawSprites();
}
if(gamestate==="end"){
  textSize(30);
  text("gameover",230,250)
}
}
function spawnDoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50);
    var climber=createSprite(200,10);
    var invisibleblock=createSprite(200,15);
    invisibleblock.debug=true;
    invisibleblock.width=climber.width;
    invisibleblock.height=2;
    door.x=Math.round(random(120,400))
    climber.x=door.x;
    invisibleblock.x=door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY=1;
    climber.velocityY=1;
    invisibleblock.velocityY=1;
    door.lifetime=800;
    climber.lifetime=800;
    invisibleblock.lifetime=800;
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleblockGroup.add(invisibleblock);
    
  }
}