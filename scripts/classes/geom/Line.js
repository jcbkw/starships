 /* global app, ns */

(function () {
     
    /**
     * @class Point An object two points.
     * 
     * @param {Number} [a]
     * @param {Number} [b]
     */
    function Line (a, b) {
        
        this.a = a || new app.classes.geom.Point(0, 0);
        this.b = b || new app.classes.geom.Point(0, 0);
        
    }
    
    Line.prototype = {

       /**
        * Constructor
        * @type Function
        */
       constructor: Line,

       /**
        * The line's starting point
        * @type {app.classes.geom.Point}
        */
       a: 0,

       /**
        * The line's ending point
        * @type {app.classes.geom.Point}
        */
       b: 0

    };
    
    ns.set('app.classes.geom.Line', Line);
    
 })();