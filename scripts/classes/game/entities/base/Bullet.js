/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.base.Weaponry
     */
    var Super = app.classes.game.entities.base.Weaponry,
    
        /**
         * @lends app.classes.game.entities.base.Bullet.prototype
         */
        api = new Super;
    
    /**
     * An Base Bullet class.
     * 
     * @class
     * 
     * @param {Weapon} weapon
     * @param {Number} [angle=0]
     * @param {Number} [speed=0]
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Bullet (weapon, angle, speed, x, y, width, height) {
        
        var attacker;
        
        // call to super
        Super.call(this, x, y, width, height);
        
        this.initialPad     = 0;
        this.strategy       = Bullet.Strategy.PLAYER_DIRECTION;
        this.weapon         = weapon;
        this.tickFn         = null;
        this.angle          = angle || 0;
        this.speed          = speed || 0;
        
        attacker            = this.weapon && this.weapon.getAttacker();
        
        if (attacker) {
            
            this.setOnPlayerSide(

                attacker instanceof app.classes.game.entities.characters.Player

            );
            
        }
        
    }
    
    /**
     * This value defines whether bullets can
     * hit other bullets.
     * 
     * @static
     * @type Boolean
     */
    Bullet.CAN_HIT_BULLET = false;
    
    /**
     * @namespace The different bullet flight plans.
     * @enum {Number}
     */
    Bullet.Strategy = {
        
        /**
         * @static
         * @memberOf app.classes.game.entities.base.Bullet.Strategy
         * @property {Number} PLAYER_DIRECTION Flies towards the direction that
         *                                     the player was facing when fired.
         */
        PLAYER_DIRECTION : 1,
        
        /**
         * @static
         * @memberOf app.classes.game.entities.base.Bullet.Strategy
         * @property {Number} PLAYER_DIRECTION Flies towards the direction
         *                                     by the setDirection call;
         */
        STATIC_DIRECTION : 2,
        
        /**
         * @static
         * @memberOf app.classes.game.entities.base.Bullet.Strategy
         * @property {Number} PLAYER_DIRECTION NOT IMPLEMENTED.
         *                                     Flies towards the specified
         *                                     target point.
         */
        DYNAMIC_DIRECTION: 3
        
    };
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Bullet;
    
    /**
     * Get this bullet's flight strategy.
     * 
     * @returns {Number}
     */
    api.getStrategy = function () {
        
        return this.strategy;
        
    };
    
    /**
     * Set this bullet's flight strategy.
     * 
     * @param {Number} value
     */
    api.setStrategy = function (value) {
        
        this.strategy = value;
        
    };
    
    /**
     * Tells whether this entity can be collided
     * with the provided entity.
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     * @returns {Boolean}
     */
    api.isCollidableWith = function (entity) {
        
        var onPlayerSide;
        
        // if super says yes, then say NO if and only if
        if (Super.prototype.isCollidableWith.call(this, entity)) {
            
            // bullets cannot hit bullet and the other entity is a bullet
            if (!Bullet.CAN_HIT_BULLET && entity instanceof Bullet) {
                
                return false;
                
            }
            
            onPlayerSide = this.isOnPlayerSide();
            
            if (
                   // this is on the player side and the other entity is a player
                   ( onPlayerSide && entity instanceof app.classes.game.entities.characters.Player)
                   
                   // this is NOTon the player side and the other entity is an Enemy
                || (!onPlayerSide && entity instanceof app.classes.game.entities.characters.Enemy)
                
            ) {
                
                return false;
                
            }
            
            // otherwise say yes
            return true;
            
        }
        
        // super says no, so sol
        return false;
        
    };

    /**
     * Fires this bullet accross the stage.
     */
    api.fire = function () {
        
        var attacker    = this.weapon.getAttacker(),
            direction   = this.strategy === Bullet.Strategy.PLAYER_DIRECTION
                        ? attacker.getDirection()
                        : this.getDirection();
            
        if (direction && attacker) {
            
            this.setDirection(direction);
            
            direction   = (new app.classes.geom.Direction(direction)).disambiguate();
            
            this.speed  = this.speed + attacker.stepSize;

            this.setBounds(this.getContainer().toBounds());
            
            position(this, attacker, direction.up, direction.down, direction.left, direction.right);
            
            this.getContainer().addChild(this);
            
            shoot(this, direction.up, direction.down, direction.left, direction.right);
            
        }
        
        attacker = direction = null;
        
    };
    
    /**
     * Insentient up this bullet
     */
    api.impact = function () {
        
        this.finalize();
        
    };
    
    /**
     * Handle the collision of this entity with another
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     */
    api.handleCollision = function (entity) {
        
        // behave like a bullet
        app.classes.game.utils.Collisions.entityWithBullet.call(this, entity);
        
    };

    /**
     * Removes this bullet from the stage
     */
    api.finalize = function () {
        
        if (!this.isFinalized()) {
            
            // call super method
            Super.prototype.finalize.call(this);
            
            this.weapon         = null;

            if (this.tickFn) {

                app.unTick(this.tickFn);

                this.tickFn     = null;

            }
            
        }
        
    };
    
    /**
     * Positions the bullet in front of the attacker
     * 
     * @private
     * 
     * @param {Bullet} bullet
     * @param {Attacker} attacker
     * @param {Boolean} up
     * @param {Boolean} down
     * @param {Boolean} left
     * @param {Boolean} right
     */
    function position (bullet, attacker, up, down, left, right) {
        
        var x, y;
        
        if (left) {

            x   = attacker.x - (bullet.width + bullet.initialPad);

        }
        else if (right) {

            x   = attacker.x + attacker.width + bullet.initialPad;

        }
        else {
            
            x   = (attacker.x + (attacker.width / 2)) - bullet.width / 2;
            
        }
        
        if (up) {

            y   = attacker.y - (bullet.height + bullet.initialPad);

        }
        else if (down) {

            y   = attacker.y + attacker.height + bullet.initialPad;
            
        }
        else {
            
            y   = (attacker.y + (attacker.height / 2)) - bullet.height / 2;
            
        }
        
        bullet.setPosition(x, y);
        
    }
    
    /**
     * Moves the bullet accross this stage
     * 
     * @private
     * 
     * @param {Bullet} bullet
     * @param {Boolean} up
     * @param {Boolean} down
     * @param {Boolean} left
     * @param {Boolean} right
     */
    function shoot (bullet, up, down, left, right) {
        
        if (bullet.angle === 0) {
            
            bullet.tickFn = straightShot(bullet, up, down, left, right);
            
        }
        else {
            
            bullet.tickFn = angledShot(bullet, up || left, down || right);
            
        }
        
        app.onTick(bullet.tickFn);
        
    }
    
    /**
     * Moves the bullet straigth accross this stage
     * from its initial position.
     * 
     * @private
     * 
     * @param {Bullet} bullet
     * @param {Boolean} up
     * @param {Boolean} down
     * @param {Boolean} left
     * @param {Boolean} right
     */
    function straightShot (bullet, up, down, left, right) {
        
        // can't cache the bullet speed to allow
        // extended classes to create bullets with easing
        
        return function () {
            
            if (down) {

                bullet.y += bullet.speed;
                
            }

            if (up) {

                bullet.y -= bullet.speed;

            }

            if (left) {

                bullet.x -= bullet.speed;

            }
            
            if (right) {

                bullet.x += bullet.speed;

            }
            
            // if out of bounds
            if (bullet.isOutOfBounds()) {

                // remove
                bullet.finalize();
                
                bullet = null;
                
            }
            else {

                // push forward
                bullet.setPosition(bullet.x, bullet.y);
                
            }

        };
        
    }
    
    /**
     * Moves the bullet accross this stage
     * at an angle from its initial position.
     * 
     * @private
     * 
     * @param {Bullet} bullet
     * @param {Boolean} uporleft
     * @param {Boolean} downorright
     */
    function angledShot (bullet, uporleft, downorright) {
        
        // can't cache the bullet speed to allow
        // extended classes to create bullets with easing
        var radians = app.tk.calc.toRadians(bullet.angle),
            xFactor = Math.sin(radians),
            yFactor = Math.cos(radians);
        
        return function () {
            
            if (downorright) {

                bullet.x += xFactor * bullet.speed;
                bullet.y += yFactor * bullet.speed;
                
            }

            if (uporleft) {

                bullet.x -= xFactor * bullet.speed;
                bullet.y -= yFactor * bullet.speed;
                
            }
            
            // if out of bounds
            if (bullet.isOutOfBounds()) {

                // remove
                bullet.finalize();
                
                bullet = null;
                
            }
            else {

                // push forward
                bullet.setPosition(bullet.x, bullet.y);
                
            }

        };
        
    }
    
    Bullet.prototype = api;
    
    ns.set('app.classes.game.entities.base.Bullet', Bullet);

})();