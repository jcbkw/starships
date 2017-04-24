 /* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.base.Sentient
     */
    var SuperA = app.classes.game.entities.base.Sentient,
        
        /**
         * @type app.classes.display.DisplayableClip
         */
        SuperB = app.classes.display.DisplayableClip,
        
        /**
         * @lends app.classes.game.entities.base.Character.prototype
         */
        api = ns.merge(new SuperA, SuperB.prototype);
     
    /**
     * @class Character A base Character Class
     * 
     * @augments app.classes.game.entities.base.Sentient
     * @augments app.classes.display.DisplayableClip
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Character (x, y, width, height) {
        
        // call to super
        SuperA.call(this, x, y, width, height);
        SuperB.call(this, x, y, width, height);
        
        this.group.add(Character.GROUP);
        
        this.ghost = false;
        
    }
    
    /**
     * @static
     * @type Number
     */
    Character.COLLISION_THRESHOLD = 10;
    
    /**
     * Tells whether the provided characters are whithin the defined
     * collision threshold.
     * 
     * You must first make a call to {@link #intersect} to ensure that the
     * character retangles intersect before calling this function.
     * 
     * @static
     * 
     * @param {app.classes.game.entities.base.Character} a
     * @param {app.classes.game.entities.base.Character} b
     * 
     * @returns {Boolean}
     */
    Character.areWhithinCollisionThreshold = function (a, b) {
        
        return (Math.abs(Math.abs(a.y) - Math.abs(b.y)))
               <= Character.COLLISION_THRESHOLD;
        
    };
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.entities.base.Character
     */
    Character.GROUP = 'character';
    
    /**
     * @static
     * @memberOf app.classes.game.entities.base.Character
     * @name Attributes
     * @type {Enum}
     */
    Character.Attributes = {
        
        /**
         * @memberOf app.classes.game.entities.base.Character.Attributes
         * @name DIRECTION
         * @type {String}
         */
        DIRECTION: 'direction',
        
        /**
         * @memberOf app.classes.game.entities.base.Character.Attributes
         * @name IN_MOTION
         * @type {String}
         */
        IN_MOTION: 'in-motion'
                
    };
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Character;
    
    /**
     * @type {app.classes.game.entities.base.CharacterPacing}  Used to make the character 
     *                                                      execute pacing movements.
     */
    api.pacer = null;
    
    /**
     * @type {app.classes.game.entities.characters.LifeGaugeView}
     */
    api.lifeGauge = null;
    
    /**
     * @type Boolean
     */
    api.ghost = false;
    
    /**
     * Tells whether this character has a life gauge with more than
     * 0 point;
     * 
     * @returns {Boolean}
     */
    api.isAlive = function () {
        
        return this.lifeGauge && this.lifeGauge.getLife() > 0;
        
    };
    
    /**
     * Tells whether this entity can be collided
     * with the provided entity;
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     * @returns {Boolean}
     */
    api.isCollidableWith = function (entity) {
        
        if (this.ghost) {
            
            // cannot collide with other characters
            if (entity instanceof Character) {
                
                return false;
                
            }
            
        }
        
        // defer to super method
        return SuperA.prototype.isCollidableWith.call(this, entity);
        
    };
        
    /**
     * Handles the collision of this entity with another
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     */
    api.handleCollision = function (entity) {
        
        // call super method
        SuperA.prototype.handleCollision.call(this, entity);
        
        // swap z order
        app.classes.game.utils.Collisions.entityUpdateIndex.call(this, entity);
            
    };
    
    /**
     * Returns a <code>CharacterPacing</code> instance used to make the character
     * execute pacing movements.
     * 
     * @returns {app.classes.game.entities.base.CharacterPacing}
     */
    api.pace = function () {
        
        if (!this.pacer) {
            
            this.pacer = new app.classes.game.entities.base.CharacterPacing(this);
            
        }
        
        return this.pacer;
        
    };
    
    /**
     * Set the character's direction (e.g. the direction
     * towards which the character is facing)
     * 
     * @param {String} value
     */
    api.setDirection = function (value) {
        
        if (value === null) {
            
            this.removeAttribute(Character.Attributes.DIRECTION);
            
            value = app.classes.geom.Direction.NONE;
            
        }
        else {
            
            this.setAttribute(Character.Attributes.DIRECTION, value);
            
        }
        
        SuperA.prototype.setDirection.call(this, value);
            
    };
            
    /**
     * Indicate that the character is in motion.
     * 
     * @param {Boolean} value
     */
    api.setInMotion = function (value) {
        
        if (value) {
            
            this.group.add(Character.Attributes.IN_MOTION);
            
        }
        else {
            
            this.group.remove(Character.Attributes.IN_MOTION);
            
        }
        
    };
    
    /**
     * Check whether the character is in motion.
     * 
     * @returns {Boolean}
     */
    api.isInMotion = function () {
        
        return this.group.contains(Character.Attributes.IN_MOTION);
        
    };
    
    /**
     * Sets whether this character can collide with other
     * characters.
     * 
     * @param {Boolean} value
     */
    api.setGhost = function (value) {
       
        this.ghost = value;
        
    };
    
    /**
     * Tells whether this character can collide with other
     * characters.
     * 
     * @returns {Boolean}
     */
    api.isGhost = function () {
       
        return this.ghost;
        
    };
    
    /**
     * A function to call when the cross has been completed
     * 
     * @callback crossOnCompleteCallback
     * @param {SuperB} instance The instance which was crossing
     * @param {Boolean} wasForce Whether the completion was forcefully triggered 
     *                          (e.g. called before the cross has actually completed)
     */
    
    /**
     * Makes the clip "cross" (make a series of steps) towards the provided 
     * x and/or y axis relative to its current position.
     * 
     * @param {Number} [x=0]                The desired final X position.
     *                                      Can be a negative integer.
     *                                      
     * @param {Number} [y=0]                The desired final Y position.
     *                                      Can be a negative integer.
     * 
     * @param {SuperB~crossOnCompleteCallback} [onComplete]
     *                                      
     * @param {Function} [onDirection]      A function to call each time
     *                                      this function has new insights
     *                                      about the direction towards 
     *                                      which this clip is crossing.
     *                                      
     * @param {Function} [onStep]           A function to call after each
     *                                      step of the cross.
     *                                      
     * @param {Number|Object} [v=this]      The stepSize to use. If you pass
     *                                      a number, that number will be used
     *                                      as stepSize, if you pass an object,
     *                                      that object's stepSize will be read
     *                                      on each tick. If you ommit this
     *                                      argument, the current instance's
     *                                      stepSize will be used. Step sizes
     *                                      must be positive numbers.
     */
    api.cross = function (x, y, onComplete, onDirection, onStep, v) {
        
        function onEachStep (isLastStep) {
            
            this.setInMotion(true);
            onStep && onStep.call(this, isLastStep);
            
        }
        
        function onStopped (forced) {
            
            this.setInMotion(false);
            this.setDirection(null);
            onComplete && onComplete.call(this, forced);
            
        }
        
        function onDirectionInsight (direction) {
            
            this.setDirection(direction);
            onDirection && onDirection.call(this, direction);
            
        }

        SuperB.prototype.cross.call(this, x, y, onStopped, onDirectionInsight, onEachStep, v);

    };
    
    /**
     * Makes the clip "cross" (make a series of steps) untils it reaches 
     * the provided x and/or y axis relative to the stage.
     * 
     * @param {Number} [x=0]                The desired final X position.
     *                                      Cannot be a negative integer.
     *                                      
     * @param {Number} [y=0]                The desired final Y position.
     *                                      Cannot be a negative integer.
     * 
     * @param {crossOnCompleteCallback} [onComplete]
     *                                      
     * @param {Function} [onDirection]      A function to call each time
     *                                      this function has new insights
     *                                      about the direction towards 
     *                                      which this clip is walking.
     *                                      
     * @param {Function} [onStep]           A function to call after each
     *                                      step of the cross.
     *                                      
     * @param {Number|Object} [v=this]      The stepSize to use. If you pass
     *                                      a number, that number will be used
     *                                      as stepSize, if you pass an object,
     *                                      that object's stepSize will be read
     *                                      on each tick. If you ommit this
     *                                      argument, the current instance's
     *                                      stepSize will be used. Step sizes
     *                                      must be positive numbers.
     */
    api.crossTo = function (x, y, onComplete, onDirection, onStep, v) {
        
        function onEachStep (isLastStep) {
            
            this.setInMotion(true);
            onStep && onStep.call(this, isLastStep);
            
        }
        
        function onStopped (forced) {
            
            this.setInMotion(false);
            this.setDirection(null);
            onComplete && onComplete.call(this, forced);
            
        }
        
        function onDirectionInsight (direction) {
            
            this.setDirection(direction);
            onDirection && onDirection.call(this, direction);
            
        }

        return SuperB.prototype.crossTo.call(this, x, y, onStopped, onDirectionInsight, onEachStep, v);

    };
        
    Character.prototype = api;
    
    ns.set('app.classes.game.entities.base.Character', Character);
    
 })();