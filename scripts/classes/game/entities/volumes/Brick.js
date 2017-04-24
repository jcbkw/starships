/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.volumes.Boundary
     */
    var Super = app.classes.game.entities.volumes.Boundary,
        
        /**
         * @lends app.classes.game.entities.volumes.Brick.prototype
         */
        api = new Super;

    /**
     * Creates a dust volume.
     * A dust dissapears when the player
     * collides with it.
     * 
     * @class Brick
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Brick (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
        // todo no no no!!!
        this.element.style.background = '#fbab18';
        
    }
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Brick;
    
    /**
     * Handle the collision of this entity with another
     * 
     * @param {app.classes.game.entities.base.Insentient} entity
     */
    api.handleCollision = function (entity) {
        
        if (entity) {
            
            if (entity instanceof app.classes.game.entities.base.Bullet
            ||  entity instanceof app.classes.game.entities.characters.Enemy) {
                
                // dissipate
                this.remove();
                
            }
            else {
                
                // behave like a boundary
                app.classes.game.utils.Collisions.entityWithBoundary.call(this, entity);
                
            }
            
        }
        
    };
    
    Brick.prototype = api;
    
    ns.set('app.classes.game.entities.volumes.Brick', Brick);
    
})();