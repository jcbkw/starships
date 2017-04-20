 /* global app, ns */

(function () {
     
    /**
     * @class RectangularBounds A shape that defines 
     *                          top right bottom and left
     *                          properties.
     * 
     * @param {Number} [top=0]
     * @param {Number} [right=0]
     * @param {Number} [bottom=0]
     * @param {Number} [left=0]
     */
    function RectangularBounds (top, right, bottom, left) {
        
        this.left = left || 0;
        this.top = top || 0;
        this.right = right || 0;
        this.bottom = bottom || 0;
        
    }
    
    /**
     * Creates and returns a <code>app.classes.geom.RectangularBounds</code> using 
     * the provided rectangle measurements.
     * 
     * @param {app.classes.geom.Rectangle} rectangle
     * 
     * @param {Boolean} [absolute=false]    <p>If <code>true</code> the bounds use 0 as their
     *                                      top, left and the instance's width and height
     *                                      as their bottom,right.</p>
     *                                      <p>If <code>false</code> the bounds use the instance's
     *                                      x and y as their top, left and the instance's 
     *                                      width and height added to its x and y as their
     *                                      bottom, right.</p>
     * @param {Number} [originX=0]
     * 
     * @param {Number} [originY=0]
     * 
     * @returns {app.classes.geom.RectangularBounds}
     */
    RectangularBounds.fromRectangle = function (rectangle, absolute, originX, originY) {
        
        var bounds;
        
        if (absolute) {
            
            bounds          = new RectangularBounds(
                /*top*/     originX || 0,
                /*right*/   rectangle.width,
                /*bottom*/  rectangle.height,
                /*left*/    originY || 0
            );
            
        }
        else {
            
            bounds          = new RectangularBounds(
                /*top*/     rectangle.y,
                /*right*/   rectangle.x + rectangle.width,
                /*bottom*/  rectangle.y + rectangle.height,
                /*left*/    rectangle.x
            );
            
        }
        
        return bounds;
        
    };

    RectangularBounds.prototype = {

       /**
        * Constructor
        * @type Function
        */
       constructor: RectangularBounds,

       /**
        * The left bound
        * @type {Number}
        */
       left: 0,

       /**
        * The top bound
        * @type {Number}
        */
       top: 0,

       /**
        * The right bound
        * @type {Number}
        */
       right: 0,

       /**
        * The bottom bound
        * @type {Number}
        */
       bottom: 0       

    };
    
    ns.set('app.classes.geom.RectangularBounds', RectangularBounds);
    
 })();