class HomingShot extends Shot {
    homingDistance = 50;
    isHoming = false;
    
    constructor(at, dir, target){
        super(at,dir);
        this.target = target;
        this.size=20;
        this.pos = at;
        this.vel = dir;
        this.vel.normalize();
        this.vel.mult(17.0);
        this.active = true; 
    }
     
    draw(){
      if(!this.isHoming && abs(this.pos.x-this.target.x) < this.homingDistance) {
        var speed = this.vel.mag();
        this.vel = (new p5.Vector(this.target.x,this.target.y)).sub(new p5.Vector(this.pos.x,this.pos.y));
        this.vel.normalize();
        this.vel.mult(speed*2);
        this.isHoming = true;
      }
      if(this.active) {
        fill(this.col);
        push();
        translate(this.pos.x, this.pos.y);     
        rotate(this.vel.heading());
        ellipse(0,0,8,   4);
        
        
        //ellipse(pos.x,pos.y,size*2,size);
        pop();
      }
    }
    
  }
  