function Ground() {
    var heights=[];
    
    this.generate = function(width, scale, offset, maxHeight) {
      //heights = new int[width];
      for(var i=0;i<width; i++) {
        heights[i] = round(noise(i*scale, offset)*maxHeight);
      }
    }
    
    this.update = function() {
      /*for(int i=0; i<heights.length-1; i++) {
        int d = heights[i]-heights[i+1];
        if(abs(d) > 3) {
          heights[i] -= d/3;
          heights[i+1] += d/3;
        }
      }*/
    }
    
    this.at = function(pos) {
      return 400-heights[pos];
    }
    
    this.hit = function(s) {
      var intPos = round(s.pos.x);
      if(intPos < 0 || intPos >= heights.length)
        return true;
        
      var isHit = (this.at(intPos)-s.pos.y) < s.size;
      
      if(isHit) {
        var start = round(intPos-s.size*2);
        var stop = round(intPos+s.size*2);
        var diff = stop-start;
        for(var i = start; i<stop; i++) {
          if(i>0 && i<heights.length) {
            heights[i] += s.size*sin(PI + (i-start)/diff*PI)*2;
            if(heights[i]<0) heights[i]=0;
          }
        }
        //smooth(min(0,round(intPos-s.size*3.5)), max(round(intPos+s.size*3),heights.length), round(s.size/2));
      }
      
      return isHit;
    }
  
    /*function smooth(start, stop, window) {
      var skip = window/2;
      for(var i=start; i<stop-window; i++) {
         var avg = 0;
         for(var j=i; j<i+window; j++){
           avg += j;
         }
         heights[i] = avg/window;
      }
    }*/
    
    this.draw = function() {
      stroke(color(40,180,40));
      strokeWeight(1);
      for(var i=0; i<heights.length; i++) {
        line(i,400,i,400-heights[i]);
      }
    }
    
  }
  