function Tank(g, settings) {
    var alive = true;
    var hp = 100;
    var pos = settings ? settings.pos : 20;
    var hppos = settings ? settings.hppos : 30;
    var hpdir = settings ? settings.hpdir : 1;
    var hpsize = 200;
    var angle = settings ? settings.angle : 39;
    var col = settings ? settings.col : color(0);
    var shots = [];
    var ground = g;
    var maxWeapon = 4;
    var selectedWeapon = 0;
    var fireLength = 0;
    var lastFire=0;
    var fireRate = 100;
    var spread = 10.0;
    this.done=false;
    var currentShot;
    
    this.explode = function() {
      for(var i=0; i<100; i++) {
        var s = new Particle();
        s.active = true;
        s.pos = new p5.Vector(pos,ground.at(pos));
        s.vel = p5.Vector.random2D();
        s.vel.y = -abs(s.vel.y);
        s.vel.mult(8.0+random(10.0));
        s.col = color(random(255),random(128),0);
        s.size = 2+random(8);
        shots.push(s);
      }
    }
  
    this.addShot = function(s) {
        shots.push(s);
    }

    this.fireSequence = function(length) {
      var elapsed = millis()-lastFire;
      if(length > 0 && elapsed > fireRate) {
        Support.play(selectedWeapon);
        var r = spread*random(1000.0)/1000.0 - spread/2.0;
        shots.push(new Shot(
          new p5.Vector(pos+cos(6.28*angle/360.0)*10,ground.at(pos)-6-sin(6.28*angle/360.0)*10),
          new p5.Vector(cos(6.28*(r+angle)/360.0),-sin(6.28*(r+angle)/360.0)))
        );
        fireLength = length-1;
        lastFire=millis();
        this.done = true;    
      }
    }
    
    this.isAlive = function() {
        return alive;
    }

    this.isDone = function() {
        return !alive || this.done;
    }
    
    this.isFiring = function() {
      return fireLength > 0 || (currentShot != null && currentShot.active);
    }
    
    this.getShots = function() {
        return shots;
    }

    this.setCol = function(c) {
        col = c;
    }

    this.incPos = function() {
        pos++;
    }

    this.decPos = function() {
        pos--;
    }

    this.setPos = function(p) {
        pos = p;
    }

    this.incAngle = function() {
        angle++;
    }

    this.decAngle = function() {
        angle--;
    }

    this.setAngle = function(a) {
        angle = a;
    }

    this.fire = function(target) {
      //console.log("Fire " + selectedWeapon, this, pos, angle);
      if(selectedWeapon==0){
        this.fireSequence(5);
      } else if(selectedWeapon == 1){
        Support.play(0);
        currentShot=new MegaShot(
          new p5.Vector(pos+cos(6.28*angle/360.0)*20,ground.at(pos)-6-sin(6.28*angle/360.0)*20),
          new p5.Vector(cos(6.28*(angle)/360.0),-sin(6.28*(angle)/360.0)));
        shots.push(currentShot);
        this.done = true;
      } else if(selectedWeapon == 2){
        Support.play(0);
        currentShot=new ClusterShot(
          new p5.Vector(pos+cos(6.28*angle/360.0)*10,ground.at(pos)-6-sin(6.28*angle/360.0)*10),
          new p5.Vector(cos(6.28*(angle)/360.0),-sin(6.28*(angle)/360.0)), this);
        shots.push(currentShot);
        this.done=true;
      } else if(selectedWeapon == 3){
        Support.play(0);
        currentShot=new HomingShot(
          new p5.Vector(pos+cos(6.28*angle/360.0)*10,ground.at(pos)-6-sin(6.28*angle/360.0)*10),
          new p5.Vector(cos(6.28*(angle)/360.0),-sin(6.28*(angle)/360.0)), new p5.Vector(target.pos,ground.at(target.pos)));
        shots.push(currentShot);
        this.done=true;
      }
    }
    
    this.setWeapon = function(index) {
      if(index < maxWeapon) {
        selectedWeapon = index;
      }
    }
      
    this.update = function(otherShots) {
      var dead = [];
      
      for(var i=0;i<shots.length;i++) {
        var s = shots[i];
        s.update();
        if(this.isHit(s)) {
          s.triggerHit();
          s.active = false;
          hp-=s.damage;
        }
        if(s.active && ground.hit(s)){
          s.triggerHit();
          s.active = false;
        }
        if(!s.active){
          dead.push(s);
        }
      }
      dead.forEach(function(s) {
          for(var i=0; i<shots.length; i++){
              if(shots[i] == s){
                shots.splice(i,1);
                i = shots.length;
              }
          }
      });
    //   for(Particle s : dead) {
    //     shots.remove(s);
    //   }
    var hCheck = this.isHit;
      otherShots.forEach(function(s){
        if(hCheck(s)) {
            s.active = false;
            hp-=s.damage;
          }  
      });
    //   for(Particle s : otherShots) {
    //     if(isHit(s)) {
    //       s.active = false;
    //       hp-=s.damage;
    //     }
    //   }    
      
      if(hp < 0) {
        hp=0;
        alive = false;
        this.explode();
      }
      
      if(fireLength > 0) {
        this.fireSequence(fireLength);
      }
      
      if(currentShot != null && !currentShot.active){
        currentShot = null;
      }
    }
    
    this.isHit = function(s) {
  //    println(pos);
  //    println(ground);
  //    println(s.pos);
      return alive && abs(s.pos.x - pos) < s.size*2 && abs(s.pos.y - ground.at(pos)) < s.size; 
    }
    
    this.draw = function(isCurrent) {
      colorMode(RGB);
      noFill();
      stroke(col);
      strokeWeight(1);
      if(alive) {
        circle(pos-10,ground.at(pos),5);
        circle(pos-5,ground.at(pos),5);
        circle(pos,ground.at(pos),5);
        circle(pos+5,ground.at(pos),5);
        circle(pos+10,ground.at(pos),5);
        strokeWeight(2);
        line(pos,ground.at(pos)-6,pos+cos(6.28*angle/360.0)*10,ground.at(pos)-6-sin(6.28*angle/360.0)*10);
        strokeWeight(3);
        line(pos-10,ground.at(pos)-3,pos+10,ground.at(pos)-3);
        line(pos-5,ground.at(pos)-6,pos+5,ground.at(pos)-6);
      }
      noStroke();
      for(var i=0; i<shots.length; i++) { //kan ändras under draw. använd ej foreach
        var s = shots[i];
        s.draw();
      }
      
      if(isCurrent) {
        noFill();
        stroke(color(255,0,255));
        strokeWeight(5);
        rect(hppos, 20, hpsize*hpdir,20);
      }
      
      noStroke();
      fill(color(50,50,250));
      rect(hppos, 20, round(hp*hpsize/100.0)*hpdir,20);
      noFill();
      strokeWeight(1);
      stroke(0);
      rect(hppos, 20, hpsize*hpdir,20);
      
    }
    
  }
  