var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud;
var obstacle;
var score = 0;
var clouds_group, cloud_image;
var obstacles_group, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var gameOver,restart;
var gameOverImg,restartImg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloud_image = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  
  trex.scale = 0.5;
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5
  gameOver.visible = false;
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.5;
 restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  clouds_group = new Group();
  
  obstacles_group = new Group();
  
  score = 0;
  
}

function draw() {
  background(180);
  
  text("Score: " + score,400,50 );
  
  
  if(gameState === PLAY){
    
    score = score+Math.round(getFrameRate()/60);
    
    ground.velocityX = -(6+3*score/100);
    
    if(keyDown("space") && trex.y >=161 ) {
    trex.velocityY = -12;
  }
  
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  spawnClouds();
  
  spawnObstacle();
    
    if(obstacles_group.isTouching(trex)){
      
      gameState = END;
    }
    
  
  }
  
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    
  obstacles_group.setVelocityXEach(0);
    clouds_group.setVelocityXEach(0);
    
    trex.changeAnimation("collided",trex_collided);
    
    obstacles_group.setLifetimeEach(-1);
    clouds_group.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
  
  
  drawSprites();
}

function reset(){
  
  gameState = PLAY
  
  gameOver.visible = false;
  restart.visible = false
  
  obstacles_group.destroyEach();
  clouds_group.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
  
}



function spawnClouds(){
  
  if (frameCount%60 === 0){
    
    cloud = createSprite(580,120,40,10);
    cloud.y = Math.round(random(50,140));
    cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    clouds_group.add(cloud);
  }
  
  
  
}

function spawnObstacle(){
  
  if (frameCount%60 === 0){
    
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,6));
    
    switch(rand){
       case 1: obstacle.addImage(obstacle1);
              break;
       case 2: obstacle.addImage(obstacle2);
              break;
       case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;                                                case 5: obstacle.addImage(obstacle5);
              break;
     case 6: obstacle.addImage(obstacle6);
              break;
              default: break
      
        
    }
    
              obstacle.scale = 0.4;
              obstacle.lifetime = 300
              obstacles_group.add(obstacle);
              
  }
  
  
  
}









