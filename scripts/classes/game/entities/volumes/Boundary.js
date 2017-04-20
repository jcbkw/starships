/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.base.Volume
     */
    var Super = app.classes.game.entities.base.Volume,
        
        /**
         * @lends app.classes.game.entities.volumes.Boundary.prototype
         */
        api = new Super;

    /**
     * Creates a virtual boundary volume;
     * 
     * @class Boundary
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Boundary (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
    }
    
    /**
     * Handle the collision of this entity with another
     * 
     * @param {app.classes.game.entities.base.Insentient} entity
     */
    api.handleCollision = function (entity) {
        
        // behave like a boundary
        app.classes.game.utils.Collisions.entityWithBoundary.call(this, entity);
        
    };
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Boundary;
    
    Boundary.prototype = api;
    
    ns.set('app.classes.game.entities.volumes.Boundary', Boundary);
    
})();