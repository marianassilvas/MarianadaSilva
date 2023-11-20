

function ball(name) {
    // DOM Object
    this.name= name;
    this.obj= document.getElementById(name);
    // Size
    this.size= {
      x: this.obj.offsetWidth, 
      y: this.obj.offsetHeight
    }
    // Parent size
    this.sizeParent= {
      x: this.obj.offsetParent.offsetWidth, 
      y: this.obj.offsetParent.offsetHeight
    }
    // Minimum position
    this.posMin= {
      x: this.size.x/2, 
      y: this.size.y/2
    }
    // Maximum position
    this.posMax= {
      x: this.sizeParent.x-this.size.x/2,
      y: this.sizeParent.y-this.size.y/2
    }
    // Actual position
    this.pos= {
      x: this.posMin.x, 
      y: this.posMin.y
    };
    // Actual speed
    this.speed= {
      x: 0, 
      y: 0
    };  
    // Update time
    var time= (new Date()).getTime()/1000;
    
    // Move to new position
    this.move= function(x, y){
      // Limit
      this.pos.x= Math.min(this.posMax.x,
        Math.max(this.posMin.x, x));
      this.pos.y= Math.min(this.posMax.y,
        Math.max(this.posMax.y, y));
      // Updated
      time= (new Date()).getTime()/1000;
    };
    
    // Paint
    this.paint= function(){
      
      // Bounce calculation
      // pos= current position
      // min= minimum position
      // max= maximum position
      // move= movement
      // Return new postion and bounce=true if bounced
      var bounced;
      function bounce(pos, min, max, move){
        var range= max-min;
        // Normalize to [-2*range .. +2*range]
        if (move < 0) {
          move= -(-move%(2*range));
        } else {
          move= move%(2*range);          
        }
        // New position without bounces
        var npos= pos+move;
        // Bounce on min side
        if (pos-min < -move && -move < range) {
          bounced= true;
          return 2*min-npos;
        }
        // Bounce on max side
        if (max-pos < move && move < range) {
          bounced= true;
          return 2*max-npos;
        }
        // No bounce, or even number of bounces
        bounced= false;
        return (npos+2*range)%(2*range);
      }
      
      // Delta t
      var now= (new Date()).getTime()/1000;
      var dt= now-time;
      time= now;
      // Move
      this.pos.x= bounce(
        this.pos.x, 
        this.posMin.x, this.posMax.x,
        this.speed.x*dt
      );
      if (bounced) { this.speed.x= -this.speed.x; }
      this.pos.y= bounce(
        this.pos.y, 
        this.posMin.y, this.posMax.y,
        this.speed.y*dt
      );
      if (bounced) { this.speed.y= -this.speed.y; }
      
      // Move
      this.obj.style.left= (this.pos.x-this.size.x/2) + "px";
      this.obj.style.top= (this.pos.y-this.size.y/2) + "px";
    } 
  }
  
  
  
  /*import LocomotiveScroll from 'locomotive-scroll';



 let scroll;

function initLocomotiveScroll() {
    if (scroll) {
        //scroll.destroy(); // Destroy the existing instance
    }

    scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        mobile: {
            smooth: true,
            breakpoint: 0
        },
        tablet: {
            smooth: true,
            breakpoint: 0
        }
    });

    new ResizeObserver(() => scroll.update()).observe(
        document.querySelector("[data-scroll-container]")
    );
}

window.addEventListener("load", (event) => {
    initLocomotiveScroll();
});
 */

import LocomotiveScroll from "https://cdn.skypack.dev/locomotive-scroll";

const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true
});