const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var plank;
var ground;
var higherground;
var con;
var con2;
var con3;
var rope,rope2,rope3;
var bubble,bubble_img;
var star,star2,star_img;
var empty_star,one_star,two_star;
var star_display;

function preload()
{
  bubble_img = loadImage("bubble.png")
  bg_img = loadImage('background.png');
  food = loadImage('candy.png');
  rabbit = loadImage('hungry1.png');
  star_img = loadImage('star.png')
  empty_star =loadImage('empty.png');
  one_star = loadImage('one_star.png');
  two_star = loadImage('stars.png');

  blink = loadAnimation("hungry1.png","hungry2.png","hungry3.png");
  eat = loadAnimation("eat1.png","eat2.png","eat3.png","eat4.png","eat5.png","eat6.png");
  sad = loadAnimation("sad1.png","sad2.png");
 
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var candy_options = {
    restitution: 0.8
  }
  
  ground =new Ground(250,height-10,width,20);
  candy = Bodies.circle(100,400,15,candy_options);
  World.add(world,candy);
  
  bubble = createSprite(340,460,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.13;
  
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  nom = createSprite(50,125,100,100);
  nom.addImage(rabbit);
  nom.scale = 0.3;

  nom.addAnimation('hungry',blink);
  nom.addAnimation('eating',eat);
  nom.addAnimation('sady',sad);
  nom.changeAnimation('hungry');

  higherground =new Ground(50,170,100,10);

  rope = new Rope(5,{x:210,y:300});
  rope2 = new Rope(6,{x:480,y:310});
  rope3 = new Rope(4,{x:315,y:150});
  con = new Link(rope,candy);
  con2 = new Link(rope2,candy);
  con3 = new Link(rope3,candy);

  blower = createImg('balloon.png');
  blower.position(350,70);
  blower.size(150,100);
  blower.mouseClicked(airBlow)
 
  button = createImg('cut_btn.png');
  button.position(200,300);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(450,300);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  buton3 = createImg('cut_btn.png');
  buton3.position(300,150);
  buton3.size(50,50);
  buton3.mouseClicked(drop3);

  star = createSprite(340,450,20,20);
  star.addImage(star_img);
  star.scale = 0.02

  star2 = createSprite(120,155,20,20);
  star2.addImage(star_img);
  star2.scale = 0.02;

  star_display = createSprite(50,20,30,30);
  star_display.scale = 0.2;
  star_display.addAnimation('empty',empty_star);
  star_display.addAnimation('one',one_star);
  star_display.addAnimation('full',two_star);
  star_display.changeAnimation('empty')

  ellipseMode(RADIUS);
}

function draw() 
{
   background(51);
   image(bg_img,0,0,width,height);
   Engine.update(engine);
  
   push();
   imageMode(CENTER);
   if(candy!=null){
    image(food,candy.position.x,candy.position.y,70,70);
   }
   pop();

   ground.show();
   higherground.show();
   rope.show();
   rope2.show();
   rope3.show();

   if(collide(candy,nom,80)==true)
   {
   remove_rope();
   bubble.visible = false;
    World.remove(engine.world,candy);
    candy = null; 
    nom.changeAnimation('eating');
   }
  
   if(collide(candy,bubble,40) == true)
    {
      engine.world.gravity.y = -1;
      bubble.position.x = candy.position.x;
      bubble.position.y = candy.position.y;
    }

    if(candy!=null && candy.position.y<=50) {
      nom.changeAnimation('sady');
      candy=null;   
      bubble.remove()
     }
    /* else if(candy.position.y>=750 ){
      nom.changeAnimation('sady');
      candy=null;   
      bubble.remove()
     }*/

   if(collide(candy,star,20)==true){
      star.visible = false;;
      star_display.changeAnimation('one')
   }

   if(collide(candy,star2,20)==true){
    star2.visible = false;
    star_display.changeAnimation('full')
    }

    drawSprites();

}

function drop()
{
  rope.break()
  con.dettach();
  con = null; 
}

function drop2()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
}

function drop3()
{
  rope3.break();
  con3.dettach();
  con3 = null; 
}

function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow(){
  Matter.Body.applyForce(candy,{x:0,y:0},{x:-0.02,y:0})
}