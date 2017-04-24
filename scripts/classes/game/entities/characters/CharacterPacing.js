 /* global app, ns */

(function () {
     
    /**
     * @lends app.classes.game.entities.base.CharacterPacing.prototype
     */
    var api = {};
    
    /**
     * Creates a CharacterPacing instance
     * 
     * @class
     * 
     * @param {app.classes.game.entities.base.Character} character
     */
    function CharacterPacing (character) {
        
        this.character = character;
        
    }
    
    /**
     * @static
     * @memberOf app.classes.game.entities.base.CharacterPacing
     * @name Kinds
     * @enum {String}
     */
    CharacterPacing.Kinds = {
        
        STRAIGHT: 'straight',
        SQUARE: 'square'
                
    };
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = CharacterPacing;
    
    /**
     * @typedef {app.classes.game.entities.base.Character} character
     */
    api.character = null;
    
    /**
     * Returns the character being manipulated by this instance.
     * 
     * @returns {app.classes.game.entities.base.Character}
     */
    api.getCharacter = function () {
        
        return this.character;
        
    };
    
    /**
     * Makes the character pace in the provided kind.
     * 
     * You can stop an anytime by calling <code>uncross</code>
     * on the character.
     * 
     * @param {String} kind
     * @param {...*}
     */
    api.kind = function (kind) {
        
        var method = this[kind];
        
        method && method.apply(this, Array.prototype.slice.call(arguments, 1));
        
    };
    
    /**
     * Makes the character pace in a straight line.
     * 
     * You can stop an anytime by calling <code>uncross</code>
     * on the character.
     * 
     * @param {Number} size
     * @param {Boolean} [vertical=false]
     * 
     * @param {Number|Object} [v=this]      The stepSize to use. If you pass
     *                                      a number, that number will be used
     *                                      as stepSize, if you pass an object,
     *                                      that object's stepSize will be read
     *                                      on each tick. If you ommit this
     *                                      argument, the current instance's
     *                                      character's stepSize will be used.
     *                                      Step sizes must be positive numbers.
     * 
     * @param {Function} [onComplete]       Called when each cycle of the pacing
     *                                      is complete. Return <code>false</code>
     *                                      to stop pacing.
     *                                  
     * @param {Function} [onReverse]        Called each time this function is 
     *                                      about to go the inverse direction.
     *                                      Return <code>false</code>to stop pacing.
     */
    api.straight = function (size, vertical, v, onComplete, onReverse) {
        
        var that = this;
        
        if (vertical) {

            this.character.cross(0, size, function (forced) {
                
                if (!onReverse || onReverse.call(this.character) !== false) {
                    
                    !forced && this.cross(0, -size, function (forced) {

                        if (!onComplete || onComplete.call(this.character) !== false) {

                            !forced && that.straight(
                                size, vertical, v, onComplete, onReverse
                            );

                        }

                    }, null, null, v);

                }
                
            }, null, null, v);

        }
        else {

            this.character.cross(size, 0, function (forced) {
                
                if (!onReverse || onReverse.call(this.character) !== false) {
                    
                    !forced && this.cross(-size, 0, function (forced) {

                        if (!onComplete || onComplete.call(this.character) !== false) {

                            !forced && that.straight(
                                size, vertical, v, onComplete, onReverse
                            );

                        }

                    }, null, null, v);
                    
                }

            }, null, null, v);

        }

    };
    
    /**
     * Makes the character pace in a square fashion.
     * You can stop an anytime by calling <code>uncross</code>
     * on the character.
     * 
     * @see app.classes.display.DisplayableClip.uncross
     * 
     * @param {Number} size
     * @param {Number|Object} [v=this]      The stepSize to use. If you pass
     *                                      a number, that number will be used
     *                                      as stepSize, if you pass an object,
     *                                      that object's stepSize will be read
     *                                      on each tick. If you ommit this
     *                                      argument, the current instance's
     *                                      character's stepSize will be used.
     *                                      Step sizes must be positive numbers.
     * 
     * @param {Function} [onComplete]       Called when each cycle of the pacing
     *                                      is complete. Return <code>false</code>
     *                                      to stop pacing.
     *                                  
     * @param {Function} [onNewSide]        Called each time this function is 
     *                                      about to go the on a new size of the
     *                                      square. Return <code>false</code>
     *                                      to stop pacing.
     */
    api.square = function (size, v, onComplete, onNewSide) {
        
        // @todo, should also allow to go ccw.
        
        var that = this;
        
        if (!onNewSide || onNewSide.call(this.character, app.classes.geom.Position.BOTTOM) !== false) {
            
            this.character.cross(0, size, function (forced) {

                if (!onNewSide || onNewSide.call(this.character, app.classes.geom.Position.LEFT) !== false) {

                    !forced && this.cross(-size, 0, function (forced) {

                        if (!onNewSide || onNewSide.call(this.character, app.classes.geom.Position.TOP) !== false) {

                            !forced && this.cross(0, -size, function (forced) {

                                if (!onNewSide || onNewSide.call(this.character, app.classes.geom.Position.RIGHT) !== false) {

                                    !forced && this.cross(size, 0, function (forced) {

                                        if (!onComplete || onComplete.call(this.character) !== false) {

                                            !forced && that.square(size, v, onComplete, onNewSide);

                                        }

                                    }, null, null, v);

                                }

                            }, null, null, v);

                        }

                    }, null, null, v);

                }

            }, null, null, v);
            
        }

    };
    
    /**
     * Makes the character pace in a circular fashion.
     * You can stop an anytime by calling <code>uncross</code>
     * on the character.
     * 
     * @see app.classes.display.DisplayableClip.uncross
     * 
     * @param {Number} radius
     * @param {Number} [angleStep=45]
     * @param {Number|Object} [v=this]      The stepSize to use. If you pass
     *                                      a number, that number will be used
     *                                      as stepSize, if you pass an object,
     *                                      that object's stepSize will be read
     *                                      on each tick. If you ommit this
     *                                      argument, the current instance's
     *                                      character's stepSize will be used.
     *                                      Step sizes must be positive numbers.
     * 
     * @param {Function} [onComplete]       Called when each cycle of the pacing
     *                                      is complete. Return <code>false</code>
     *                                      to stop pacing.
     *                                  
     * @param {Function} [onNewAngle]       Called each time this function is 
     *                                      about to go the on a new angle
     *                                      Return <code>false</code>
     *                                      to stop pacing.
     */
    api.circle = function (radius, angleStep, v, onComplete, onNewAngle) {
     
        // @todo, should also allow to go ccw.
        
        var points = [],
            angles = [],
            index = 0,
            angle = 0;
            
        angleStep = angleStep || 45;
        
        // drawcircle http://www.softwareandfinance.com/Turbo_C/DrawCircle.html
        // and keep points in an array
        for (angle = 0; angle < 360; angle += angleStep) {
            
            points.push(new app.classes.geom.Point(
                Math.round(radius * Math.cos(angle * Math.PI / 180)),
                Math.round(radius * Math.sin(angle * Math.PI / 180))
            ));
    
            angles.push(angle);
    
        }
        
        // cross towards each point
        cross(this.character, points[0], v, function next (forced) {
                  
            if (++index < points.length) {
                
                if (!onNewAngle || onNewAngle.call(this, angles[index]) !== false) {
                    
                    !forced && cross(this, points[index], v, next);
                    
                }
                    
            }
            else if (!onComplete || onComplete.call(this) !== false) {
                
                index = 0;
                
                !forced && cross(this, points[index], v, next);
                  
            }
             
        });
        
    };
    
    /**
     * Make the provided Character cross to the given point.
     * 
     * @private
     * @param {app.classes.game.chracters.Character} character
     * @param {app.classes.geom.Point} point
     * @param {Number|Object} v
     * @param {Function} callback
     */
    function cross (character, point, v, callback) {
            
        character.cross(point.x, point.y, callback, null, null, v);

    }
    
    CharacterPacing.prototype = api;
    
    ns.set('app.classes.game.entities.base.CharacterPacing', CharacterPacing);
    
 })();