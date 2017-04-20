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
     * @param {Function} [callback] Called when each cycle of the pacing
     *                              is complete. Return <code>false</code>
     *                              to stop pacing.
     */
    api.straight = function (size, vertical, callback) {
        
        var that = this;
        
        if (vertical) {

            this.character.cross(0, size, function (forced) {
                
                !forced && this.cross(0, -size, function (forced) {

                    if (!callback || callback.call(this) !== false) {
                            
                        !forced && that.straight(size, vertical);

                    }

                });

            });

        }
        else {

            this.character.cross(size, 0, function (forced) {
                
                !forced && this.cross(-size, 0, function (forced) {
                    
                    if (!callback || callback.call(this) !== false) {
                            
                        !forced && that.straight(size, vertical);

                    }
                    
                });

            });

        }

    };
    
    /**
     * Makes the character pace in a square fashion.
     * You can stop an anytime by calling <code>uncross</code>
     * on the character.
     * 
     * @see app.classes.display.DisplayClip.uncross
     * 
     * @param {Number} size
     * @param {Function} [callback] Called when each cycle of the pacing
     *                              is complete. Return <code>false</code>
     *                              to stop pacing.
     */
    api.square = function (size, callback) {
        
        var that = this;
        
        this.character.cross(0, size, function (forced) {

            !forced && this.cross(-size, 0, function (forced) {

                !forced && this.cross(0, -size, function (forced) {

                    !forced && this.cross(size, 0, function (forced) {
                        
                        if (!callback || callback.call(this) !== false) {
                            
                            !forced && that.square(size);
                            
                        }

                    });

                });

            });

        });

    };
    
    /**
     * Makes the character pace in a circular fashion.
     * You can stop an anytime by calling <code>uncross</code>
     * on the character.
     * 
     * @see app.classes.display.DisplayClip.uncross
     * 
     * @param {Number} radius
     * @param {Number} [angleStep=45]
     * @param {Function} [callback] Called when each cycle of the pacing
     *                              is complete. Return <code>false</code>
     *                              to stop pacing.
     */
    api.circle = function (radius, angleStep, callback) {
        
        var points = [],
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
    
        }
        
        // cross towards each point
        cross(this.character, points[0], function next (forced) {
                  
            if (++index < points.length) {
                
                !forced && cross(this, points[index], next);
                    
            }
            else if (!callback || callback.call(this) !== false) {
                
                index = 0;
                
                !forced && cross(this, points[index], next);
                  
            }
             
        });
        
    };
    
    /**
     * Make the provided Character cross to the given point.
     * 
     * @private
     * @param {app.classes.game.chracters.Character} character
     * @param {app.classes.geom.Point} point
     * @param {Function} callback
     */
    function cross (character, point, callback) {
            
        character.cross(point.x, point.y, callback);

    }
    
    CharacterPacing.prototype = api;
    
    ns.set('app.classes.game.entities.base.CharacterPacing', CharacterPacing);
    
 })();