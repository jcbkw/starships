/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.base.Volume
     */
    var Super = app.classes.game.entities.base.Volume,
        
        /**
         * @lends app.classes.game.entities.volumes.Pushable.prototype
         */
        api = new Super;

    /**
     * Creates a basic volume that can be pushed;
     * 
     * @class Pushable
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Pushable (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
    }
    
    /**
     * Handle the collision of this entity with another
     * 
     * @param {app.classes.game.entities.base.Insentient} entity
     */
    api.handleCollision = function (entity) {
        
        if (entity instanceof app.classes.game.entities.characters.Player) {
            
            // behave like a pushable
            app.classes.game.utils.Collisions.entityWithPushable.call(this, entity);
            
        }
        else {
            
            // behave like a boundary
            app.classes.game.utils.Collisions.entityWithBoundary.call(this, entity);
            
        }
        
    };
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Pushable;
    
    Pushable.prototype = api;
    
    ns.set('app.classes.game.entities.volumes.Pushable', Pushable);
    
})();