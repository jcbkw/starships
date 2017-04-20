/* global app, ns */

(function () {
    
    /**
     * @type app.classes.display.DisplayableContainer
     */
    var SuperA = app.classes.display.DisplayableContainer,
        
        /**
         * @type app.classes.geom.VectorDirection
         */
        SuperB = app.classes.geom.VectorDirection,
        
        /**
         * @lends app.classes.game.entities.base.Entity.prototype
         */
        api = ns.merge(new SuperA, SuperB.prototype);

    /**
     * Creates a Block which has a neutral (0), positive or
     * negative life point;
     * 
     * @class Entity
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Entity (x, y, width, height) {
        
        // call to supers
        SuperA.call(this, x, y, width, height);
        SuperB.call(this);
        
        this.lifeImpact = 0;
        
    }
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Entity;
    
    /**
     * @type {Number} The entity's hit points.
     */
    api.lifeImpact = 0;
    
    /**
     * Tells whether this entity can be collided
     * with the provided entity;
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     * @returns {Boolean}
     */
    api.isCollidableWith = function (entity) {
        
        return !!(entity && entity instanceof Entity);
        
    };
    
    /**
     * Handle the collision of this entity with another
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     */
    api.handleCollision = function (entity) {};
    
    /**
     * Returns the entity object's potential
     * impact on another's enity's life.
     * 
     * @returns {Number}
     */
    api.getLifeImpact = function () {
        
        return this.lifeImpact;
        
    };
    
    /**
     * <p>Set the entity object's potential
     * impact on another's enity's life.</p>
     * 
     * <p>If <code>0</code> is passed, this entity
     * is considered neutal.</p>
     * 
     * <p>If a positive value is passed, this entity
     * is considered helpul.</p>
     * 
     * <p>If a negative value is passed, this entity
     * is considered harmful.</p>
     * 
     * @param {Number} value
     */
    api.setLifeImpact = function (value) {
        
        this.lifeImpact = value;
        
    };
    
    /**
     * Tells whether this entity should be considered harmful
     * (e.g. may potentially have a negative impact on another
     * entity's life).
     * 
     * @returns {Boolean}
     */
    api.hasNegativeLifeImpact = function () {
        
        return this.lifeImpact < 0;
        
    };
    
    /**
     * Tells whether this entity should be considered helpful
     * (e.g. may potentially have a positive impact on another
     * entity's life).
     * 
     * @returns {Boolean}
     */
    api.hasPositiveLifeImpact = function () {
        
        return this.lifeImpact > 0;
        
    };
    
    
    /**
     * Tells whether this entity should be considered neutral
     * (e.g. has no impact on another entity's life).
     * 
     * @returns {Boolean}
     */
    api.hasNoLifeImpact = function () {
        
        return this.lifeImpact === 0;
        
    };
    
    Entity.prototype = api;
    
    ns.set('app.classes.game.entities.base.Entity', Entity);
    
})();