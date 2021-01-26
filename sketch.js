
var len = 0.2;
var step = 0.01;
var ground;
var tanks = [];
var activeTank = 0;

function preload() {
  Support.init(this);
}

function setup() {
  ground = new Ground();
  tanks.push(new Tank(ground));
  tanks.push(new Tank(ground, {
    pos:580,
    hppos: 550,
    hpdir: -1,
    angle: 135,
    col: color(200,0,0)
  }));

  ground.generate(600,.005,0,250);
  tanks[0].setCol(color(0,0,255));
  createCanvas(600,400);
  background(255);
}

function currentTank() {
  return tanks[activeTank];
}

function otherTank() {
  return tanks[(activeTank+1) % tanks.length];
}


function nextTank() {
  activeTank = (activeTank+1) % tanks.length;
  currentTank().done = false;
}

function keyPressed(k) {
  var t = currentTank();
  //console.log('KEY', k.keyCode, k, 'TANK', t.isAlive(), t.isFiring());
  //if (key == CODED) {
  /*if(k.keyCode == 39) //flyttat t draw
    t.incPos();
  else if(k.keyCode == 37)
    t.decPos();
  else if(k.keyCode == 38)
    t.incAngle();
  else if(k.keyCode == 40)
    t.decAngle(); 
  else*/ if(k.keyCode > 48 && k.keyCode < 58) {
    t.setWeapon(k.keyCode-49);
  } 
  else if(k.keyCode == 32 && t.isAlive() && !t.isFiring()) {
    t.fire(otherTank());
  }
}

function draw() {
  var t = currentTank();
  if(keyIsDown(RIGHT_ARROW))
    t.incPos();
  else if(keyIsDown(LEFT_ARROW))
    t.decPos();
  else if(keyIsDown(UP_ARROW))
    t.incAngle();
  else if(keyIsDown(DOWN_ARROW))
    t.decAngle(); 

  if(currentTank().isDone())
    nextTank();
    
  tanks[0].update(tanks[1].getShots());
  tanks[1].update(tanks[0].getShots());
  ground.update();

  
  background(color(255));
  ground.draw();
  for(var i=0; i<tanks.length; i++){
    var t = tanks[i]
    t.draw(t.isAlive() && activeTank == i);
  }
  // tank.draw(tank.isAlive() && activeTank==0);
  // tank2.draw(tank2.isAlive() && activeTank==1);
}
