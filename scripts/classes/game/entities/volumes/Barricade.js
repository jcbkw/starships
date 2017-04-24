/* global ns, app */

(function (){
    
   var Super = app.classes.display.DisplayableContainer;
   function Barricade(x, y, width, height){
       
       Super.call(this, x, y, width, height);
       build(this);
       
   }
   
   Barricade.prototype = new Super;
   Barricade.prototype.constructor = Barricade;
   
   function build (that) {
       
       var bricks, 
            height = 4,
            width = 4,
            space = 0,
            rows = that.height / height,
            cols = that.width / width,
            i,
            j;
            
        for (j = 0; j < rows; j +=1 ) {
           
            for (i = 0; i < cols; i += 1) {

                bricks = new app.classes.game.entities.volumes.Brick(
                    that.x + (width  * i) + (space * i),
                    that.y + (height * j) + (space * j),
                     width,
                     height
                );
                
                app.stage.addChild(bricks);

            };    
            
        }
       
       
   };
  
   ns.set('app.classes.game.entities.volumes.Barricade', Barricade);
    
})();