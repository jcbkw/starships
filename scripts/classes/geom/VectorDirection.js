 /* global app, ns */

(function () {
    
    "use strict";
    
    /**
     * @lends app.classes.geom.VectorDirection.prototype
     */
    var api = {constructor: VectorDirection};
     
    /**
     * Creates a vector direction instance
     * 
     * @see http://www.physicsclassroom.com/mmedia/vectors/vd.cfm
     * @class VectorDirection
     * 
     * @param {String} [direction=]
     * @param {Number} [directionMagnitude=0]
     */
    function VectorDirection (direction, directionMagnitude) {
        
        this.direction = direction || app.classes.geom.Direction.NONE;
        this.directionMagnitude = directionMagnitude || 0;
        
    }
        
    /**
     * A directional string from app.classes.geom.Direction
     * @type String
     */
    api.direction = null;
    
    /**
     * A positive number or zero
     * @type {Number}
     */
    api.directionMagnitude = 0;
    
    /**
     * Gets this vector direction's direction.
     * @returns {String}
     */
    api.getDirection = function () {
        
        return this.direction;
        
    };
    
    /**
     * Sets this vector direction's direction.
     * @param {String} value    A directional string from app.classes.geom.Direction
     */
    api.setDirection = function (value) {
        
        this.direction = value;
        
    };
    
    /**
     * Gets this vector direction's magnitude.
     * @returns {Number}
     */
    api.getDirectionMagnitude = function () {
        
        return this.directionMagnitude;
        
    };
    
    /**
     * Sets this vector direction's magnitude.
     * @param {Number} value    A positive number or zero
     */
    api.setDirectionMagnitude = function (value) {
        
        this.directionMagnitude = value;
        
    };
    
    VectorDirection.prototype = api;
    
    ns.set('app.classes.geom.VectorDirection', VectorDirection);
    
 })();