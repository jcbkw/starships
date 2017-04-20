 /* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.characters.Attacker
     */
    var Super = app.classes.game.entities.characters.Attacker,
        
        /**
         * @lends app.classes.game.entities.characters.Enemy.prototype
         */
        api = new Super;
        
    /**
     * @class Enemy A base Enemy Class
     * 
     * @augments app.classes.game.entities.characters.Attacker
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Enemy (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
                
        this.lifeGauge = new app.classes.game.utils.LifeGauge(1,1);
        
        this.group.add(Enemy.GROUP);
        
        this.setLifeImpact(-1);
        
    }
        
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.entities.characters.Enemy
     */
    Enemy.GROUP = 'enemy';
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Enemy;
    
    /**
     * Tells whether this entity can be collided
     * with the provided entity;
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     * @returns {Boolean}
     */
    api.isCollidableWith = function (entity) {
        
        // super says yes
        if (Super.prototype.isCollidableWith.call(this, entity)) {
            
            // allow if either no a weapon
            return !(entity instanceof app.classes.game.entities.base.Weaponry)
                
                // or a weapon handled by the player
                || entity.isOnPlayerSide();
            
        }
        
        return false;
        
    };
    
    /**
     * Handles the collision of this entity with another
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     */
    api.handleCollision = function (entity) {
        
        // call super mehtod
        Super.prototype.handleCollision.call(this, entity);
                
        if (entity instanceof Enemy) {
            
            if (app.classes.game.entities.base.Character.areWhithinCollisionThreshold(this, entity)) {
                
                // also behave like a boundary
                app.classes.game.utils.Collisions.entityWithBoundary.call(this, entity);
                
            }
            
        }
        else {
            
            // check harmful or helpful entity
            app.classes.game.utils.Collisions.characterUpdateLife.call(this, entity);
            
        }
        
        if (!this.isAlive()) {
            
            this.uncross();
            this.remove();
            
        }
        
    };
    
    Enemy.prototype = api;
    
    ns.set('app.classes.game.entities.characters.Enemy', Enemy);
    
 })();