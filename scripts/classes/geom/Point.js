 /* global app, ns */

(function () {
     
    /**
     * @class Point An object containing x and y coordintates.
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     */
    function Point (x, y) {
        
        this.x = x || 0;
        this.y = y || 0;
        
    }
    
    Point.prototype = {

       /**
        * Constructor
        * @type Function
        */
       constructor: Point,

       /**
        * The point's x coordinate
        * @type {Number}
        */
       x: 0,

       /**
        * The point's y coordinate
        * @type {Number}
        */
       y: 0

    };
    
    ns.set('app.classes.geom.Point', Point);
    
 })();