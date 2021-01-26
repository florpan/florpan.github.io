class ClusterShot extends Shot {
    maxDist = 400;
    clusterCount = 100;
    
    constructor(at, dir, parent){
        super(at,dir);
        this.shooter = parent;
        this.col = color(0,100,0);
        this.start = new p5.Vector(at.x,at.y);
        this.damp = .99;
        this.gravity = .35;
        this.damage = 5;
        this.size = 10;
        this.pos = at;
        this.vel = dir;
        this.vel.normalize();
        this.vel.mult(17.0);
        this.active = true; 
        this.hasExploded = false;
    }
     
     explode() {
       //play sound..
      for(var i=0; i<this.clusterCount; i++) {
        var s = new Particle();
        s.active = true;
        s.pos = new p5.Vector(this.pos.x, this.pos.y);
        s.vel = p5.Vector.random2D();
        s.vel.mult(4.0+random(6.0));
        s.col = color(random(128),random(255),random(128));
        s.size = 1+random(4);
        this.shooter.addShot(s);
      }
      this.hasExploded = true;
      this.active = false;
     }
     
    triggerHit() {
      if(!this.hasExploded) {
        this.explode();
      }
    }
     
    draw(){
      if(!this.hasExploded) {
        var dist = this.start.dist(this.pos);
        //println("cluster " + dist);
        var shouldExplode = dist > this.maxDist || !this.active;
        if(shouldExplode) {
            this.explode();
        }
      }
      if(this.active) {
        fill(this.col);
        push();
        translate(this.pos.x, this.pos.y);     
  /*      rotate(PI+vel.heading());*/
        circle(0,0,this.size);
        pop();
      }
    }
  
  }
  