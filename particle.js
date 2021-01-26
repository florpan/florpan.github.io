class Particle {
    constructor() {
        this.active = false;
        this.damp = .98;
        this.gravity = .5;
        this.maxfallspeed = 700;
        this.col = color(0);
        this.size = 4;
        this.damage = 5;
        this.pos=new p5.Vector(0,0);
        this.vel=new p5.Vector(0,0);
    }
    update(){
      if(this.active) {
        this.pos = this.pos.add(this.vel);
        this.vel.x *= this.damp;
        this.vel.y += this.gravity;
        if(this.vel.y >= this.maxfallspeed)
            this.vel.y = this.maxfallspeed;
        if(this.pos.y > 400)
        this.active = false;
      }
    }
    
    triggerHit() {
    }
  
    draw(){
      if(this.active) {
        fill(this.col);
        ellipse(this.pos.x,this.pos.y,this.size,this.size);
      }
    }
  
  
  }
  