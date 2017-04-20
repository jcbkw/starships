 /* global app, ns */

(function () {
    
    /**
     * @lends app.classes.geom.Dimension
     */
    var api = {};
     
    /**
     * Creates an object containing a width an a height.
     * 
     * @class
     * 
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Dimension (width, height) {
        
        this.width = width || 0;
        this.height = height || 0;
        
    }
    
    /**
     * Constructor
     * @type Function
     */
    api.constructor = Dimension;

    /**
     * The width
     * @type {Number}
     */
    api.width = 0;

    /**
     * The height
     * @type {Number}
     */
    api.height = 0;
    
    Dimension.prototype = api;
    
    ns.set('app.classes.geom.Dimension', Dimension);
    
 })();