 /* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.characters.Attacker
     */
    var Super = app.classes.game.entities.characters.Attacker,
        
        /**
         * @lends app.classes.game.entities.characters.Player.prototype
         */
        api = new Super;
        
    /**
     * @class Player A base Player Class
     * 
     * @augments app.classes.game.entities.characters.Attacker
     * 
     * @param {DisplayableContainer} stage
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Player (stage, x, y, width, height) {
        
        // call to super
        Super.call(this, stage, x, y, width, height);
        this.group.add(Player.GROUP);
        
        this.joystick = new app.classes.hid.game.Joystick();
        this.lifeGauge = new app.classes.game.utils.LifeGauge(1,1);
        
        var that = this;
                
        function onJoystickButtonPress (button) {

            if (button === app.classes.hid.game.Joystick.buttons.ACTION) {

                that.attack();

            }

        };
        
        function onEachAnimationFrame () {

            onAnimationFrames(that);

        };

        app.onTick(onEachAnimationFrame);
        this.joystick.onButtonPressed(onJoystickButtonPress);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.entities.characters.Player
     */
    Player.GROUP = 'player';
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Player;
    
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
                
                // or a weapo not handled by the player
                || !entity.isOnPlayerSide();
            
        }
        
        return false;
        
    };
    
    /**
     * Handles the collision of this entity with another
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     */
    api.handleCollision = function (entity) {
        
        var collided    = !(entity instanceof app.classes.game.entities.base.Character)
                           // characters requires a more presice collision detection
                        || app.classes.game.entities.base.Character.areWhithinCollisionThreshold(this, entity),
            oldLife,
            newLife;
        
        // call super mehtod
        Super.prototype.handleCollision.call(this, entity);
        
        if (collided) {
            
            oldLife     = this.lifeGauge.getLife();
            
            // check harmful or helpful entity
            app.classes.game.utils.Collisions.characterUpdateLife.call(this, entity);

            newLife = this.lifeGauge.getLife();

            // if crossing that entity's path had an impact on my life
            if (oldLife !== newLife) {

                // negative?
                if (oldLife > newLife) {
                    
                    // show damage
                    app.classes.game.utils.Collisions.characterWithHarmfulEntity.call(this, entity);

                }

            }

            if (!this.isAlive()) {

                this.setLocked(true);
                this.uncross();
                this.remove();

            }
            
        }
        
    };
    
    /**
     * This gets called on each application tick.
     * It checks the directions listed by the joystick
     * and moves the player towards them.
     * 
     * The function also assigns the correct position
     * classes to the player so that the correct sprites
     * get displayed.
     * 
     * @private
     * @param {app.classes.game.chracters.Player} player
     */
    function onAnimationFrames (player) {
        
        var count = player.joystick.directions.length,
            i;
        
        if (count === 0) {
            
            player.setInMotion(false);

        }
        else {
            
            player.setInMotion(true);
            player.setDirection(resolveDirection(player.joystick.directions));

            for (i = 0; i < count; i += 1) {

                player.step(player.joystick.directions[i]);

            }

        }

    }

    /**
     * Computes the directional attribute to use
     * based on the provided directions array.
     * 
     * @private
     * @param {String[]} directions 
     */
    function resolveDirection (directions) {
        
        return (new app.classes.geom.Direction(directions.join(''))).toString();
        
        /** old fashion... maybe more performant, but idk
        var result;
        
        // check for diagonals
        if (directions.indexOf(app.classes.geom.Direction.UP) !== -1) {

            if (directions.indexOf(app.classes.geom.Direction.LEFT) !== -1) {

                // diagonal upleft
                result = app.classes.geom.Direction.DIAG_UPLEFT;

            }
            else if (directions.indexOf(app.classes.geom.Direction.RIGHT) !== -1) {

                // diagonal upright
                result = app.classes.geom.Direction.DIAG_UPRIGHT;

            }

        }
        else if (directions.indexOf(app.classes.geom.Direction.DOWN) !== -1) {

            if (directions.indexOf(app.classes.geom.Direction.LEFT) !== -1) {

                // diagonal downleft
                result = app.classes.geom.Direction.DIAG_DOWNLEFT;

            }
            else if (directions.indexOf(app.classes.geom.Direction.RIGHT) !== -1) {

                // diagonal downright
                result = app.classes.geom.Direction.DIAG_DOWNRIGHT;

            }

        }

        // no diagonal found
        if (!result) {

            // then use the last item
            result = directions[directions.length - 1];

        }

        return result || "";
        */

    }
    
    Player.prototype = api;
    
    ns.set('app.classes.game.entities.characters.Player', Player);
    
 })();