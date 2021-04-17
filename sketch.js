const Engine = Matter.Engine;
const World= Matter.World;
const Bodies= Matter.Bodies;
const Constraint= Matter.Constraint;

var engine, world;
var ground;
var ash,ashImage;
var pokeball;
var ivy;
var pball;
var back;
var gamescore=0;
var Charmander;

var ash_hits=1;
var gameState="play"
var gameoverSound;
function preload()
{
ashImage=loadImage("Images/ash2.png");
back=loadImage("Images/back.jpg");
gameoverSound=loadSound("gameover.mp3");

}
function setup(){
    var canvas = createCanvas(1200,800);
    engine = Engine.create();
    world = engine.world;
    ground=new Ground(600,height-250,1200,2);
    pball=new Pokeball(910,180,12);
    ivy=new Enemy(68,450,1);
    Charmander=new Enemy(270,450,2);
    slingshot=new SlingShot(pball.body,{x:913,y:180});
}

function draw(){
    if(gameState=="play")
    {
    background(back);
    textSize(30);
    fill("white");
    text("Score: "+gamescore,900,50);
    Engine.update(engine);
    //console.log(mouseX,mouseY);
    image(ashImage,900,100,100,300);
    pball.display();
    ivy.display();
    ground.display();
    slingshot.display();
    ivy.score();
  Charmander.display();
  Charmander.score();
  
console.log("no of hits"+ash_hits);
}
else{
background(back);
textSize(40);
fill("black");
text("GAME OVER",600,400);
//gameoverSound.play();

}
}


function mouseDragged(){

    Matter.Body.setPosition(pball.body,{x:mouseX,y:mouseY})
    
   
}

function mouseReleased(){
   
    slingshot.fly();
}
function keyPressed()
{
    if(keyCode==32  && ash_hits<3)
    {
        Matter.Body.setPosition(pball.body,{x:910,y:180});
        slingshot.attach(pball.body);
        ash_hits=ash_hits+1;
    }
    else{
        
      gameState="end";
       
    }

   

}