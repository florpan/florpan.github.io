class Shot extends Particle {
    
    constructor(at, dir){
        super()
        this.pos = at;
        this.vel = dir;
        this.vel.normalize();
        this.vel.mult(17.0);
        this.active = true; 
    }
    
   draw(){
     if(this.active) {
       fill(this.col);
       push();
       translate(this.pos.x, this.pos.y);     
       rotate(this.vel.heading());
       ellipse(0,0,this.size*2,this.size);
       
       
       //ellipse(pos.x,pos.y,size*2,size);
       pop();
     }
   }
   
 }
 
 class MegaShot extends Shot {  
    constructor(at, dir){
        super(at,dir);
        this.damp = .99;
        this.gravity = .35;
        this.damage = 25;
        this.size = 16;
        this.pos = at;
        this.vel = dir;
        this.vel.normalize();
        this.vel.mult(17.0);
        this.active = true; 
    }  
    
   draw(){
     if(this.active) {
       fill(this.col);
       push();
       translate(this.pos.x, this.pos.y);     
       rotate(PI+this.vel.heading());
       rect(this.size,-this.size/2,this.size/2,this.size);
       ellipse(0,0,this.size*2,this.size);
       noStroke();
       fill(color(255,255,0));
       circle(0,0,2*this.size/3);
       pop();
     }
   }
    
 }
 