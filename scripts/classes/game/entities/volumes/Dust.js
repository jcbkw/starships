/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.volumes.Boundary
     */
    var Super = app.classes.game.entities.volumes.Boundary,
        
        /**
         * @lends app.classes.game.entities.volumes.Dust.prototype
         */
        api = new Super;

    /**
     * Creates a dust volume.
     * A dust dissapears when the player
     * collides with it.
     * 
     * @class Dust
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     */
    function Dust (x, y) {
        
        // call to super
        Super.call(this, x, y, 40, 40);
        
        // todo no no no!!!
        this.element.style.background = '#fbab18';
        
    }
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Dust;
    
    /**
     * Handle the collision of this entity with another
     * 
     * @param {app.classes.game.entities.base.Insentient} entity
     */
    api.handleCollision = function (entity) {
        
        if (entity) {
            
            if (entity instanceof app.classes.game.entities.characters.Player) {
                
                // dissipate
                this.remove();
                
            }
            else {
                
                // behave like a boundary
                app.classes.game.utils.Collisions.entityWithBoundary.call(this, entity);
                
            }
            
        }
        
    };
    
    Dust.prototype = api;
    
    ns.set('app.classes.game.entities.volumes.Dust', Dust);
    
})();