 /* global app, ns */

(function () {
    
    "use strict";
    
    /**
     * @lends app.classes.game.utils.Direction.prototype
     */
    var api = {constructor: Direction};
     
    /**
     * Creates a direction instance
     * 
     * @class Direction
     * 
     * @param {String} direction 
     */
    function Direction (direction) {
        
        this.directions = 0;
        this.direction  = null;
        
        if (direction) {
            
            this.up     = direction.indexOf(Direction.UP)     !== -1 && !! ++this.directions;
            this.left   = direction.indexOf(Direction.LEFT)   !== -1 && !! ++this.directions;
            this.down   = direction.indexOf(Direction.DOWN)   !== -1 && !! ++this.directions;
            this.right  = direction.indexOf(Direction.RIGHT)  !== -1 && !! ++this.directions;
            
        }
        
    }
    
    Direction.NONE                      = '';
    
    Direction.UP                        = 'up';
    Direction.LEFT                      = 'left';
    Direction.DOWN                      = 'down';
    Direction.RIGHT                     = 'right';
    
    Direction.DIAG_UPLEFT               = Direction.UP + Direction.LEFT;
    Direction.DIAG_DOWNRIGHT            = Direction.DOWN + Direction.RIGHT;
    
    Direction.DIAG_UPRIGHT              = Direction.UP + Direction.RIGHT;
    Direction.DIAG_DOWNLEFT             = Direction.DOWN + Direction.LEFT;
        
    Direction.OPPOSITE_UP               = Direction.DOWN;
    Direction.OPPOSITE_LEFT             = Direction.RIGHT;
    Direction.OPPOSITE_DOWN             = Direction.UP;
    Direction.OPPOSITE_RIGHT            = Direction.LEFT;
    
    Direction.OPPOSITE_DIAG_UPLEFT      = Direction.DIAG_DOWNRIGHT;
    Direction.OPPOSITE_DIAG_DOWNRIGHT   = Direction.DIAG_UPLEFT;
    Direction.OPPOSITE_DIAG_UPRIGHT     = Direction.DIAG_DOWNLEFT;
    Direction.OPPOSITE_DIAG_DOWNLEFT    = Direction.DIAG_UPRIGHT;
    
    Direction.AXIS_Y                    = 'y';
    Direction.AXIS_X                    = 'x';
    
    Direction.AXES_YX                   = Direction.AXIS_Y + Direction.AXIS_X;
    
    /**
     * Parses the given string into a direction
     * object and returns it.
     * 
     * @static
     * 
     * @param {String} direction
     * @returns {app.classes.game.utils.Direction}
     */
    Direction.parse = function (direction) {
        
        return new Direction(direction);
        
    };
    
    /**
     * Whether the direction is facing up
     * @type Boolean
     */
    api.up      = false;
    
    /**
     * Whether the direction is facing left
     * @type Boolean
     */
    api.left    = false;
    
    /**
     * Whether the direction is facing dwon
     * @type Boolean
     */
    api.down    = false;
    /**
     * Whether the direction is facing right
     * @type Boolean
     */
    api.right   = false;
    
    /**
     * The source string of this direction
     * @type String
     */
    api.direction  = null;
    
    /**
     * The number of directions that this direction is facing
     * @number Number
     */
    api.directions = 0;
    
    /**
     * Returns the directions that this direction is facing.
     * 
     * @returns {String[]}
     */
    api.getDirections = function () {
        
        var directions = [];
        
        this.up     && directions.push(Direction.UP);
        this.left   && directions.push(Direction.LEFT);
        this.down   && directions.push(Direction.DOWN);
        this.right  && directions.push(Direction.RIGHT);
        
        return directions;
        
    };
    
    /**
     * Tells whether this direction is facing multiple
     * directions.
     * 
     * @returns {Boolean}
     */
    api.isMultiple = function () {
        
        return this.directions > 1;
        
    };
    
    /**
     * Returns the number of directions that this direction is facing.
     * 
     * @returns {Number}
     */
    api.countDirections = function () {
        
        return this.directions;
        
    };
    
    /**
     * Tells whether this direction has conflicting
     * directions (e.g. up and down or left and right). 
     * 
     * @returns {Boolean}
     */
    api.isAmbiguous = function () {
        
        return      (this.up   && this.down )
                ||  (this.left && this.right);
        
    };
    
    /**
     * Checks whether this direction has conflicting
     * directions (e.g. up and down or left and right)
     * and returns an empty string if no conflicts have
     * been found or returns the conflicting axis (or axes)
     * which can either be <code>'y'</code>, <code>'x'</code>
     * or <code>'yx'</code>.
     * 
     * @returns {String}
     */
    api.getAmbiguousAxes = function () {
        
        var axis    = Direction.NONE;
        
        if (this.up   && this.down ) {
            
            axis   += Direction.AXIS_Y;
            
        }
        
        if (this.left && this.right) {
            
            axis   += Direction.AXIS_X;
            
        }
        
        return axis;
        
    };
    
    /**
     * <p>Returns a new Direction instance based on this one, but that is has no 
     * conflicting directions (e.g. stuff like up and down or left and right).</p>
     * 
     * <p>The resolution uses the provided starting direction, going
     * counter clockwise by default or clockwise if specified.</p>
     * 
     * @param {String} [starting=app.classes.game.utils.Direction.UP]
     * @param {Boolean} [clockwise=false]
     * 
     * @returns {app.classes.game.utils.Direction} A new Direction.
     */
    api.disambiguate = function (starting, clockwise) {
        
        if (this.isAmbiguous()) {
            
            return new Direction(disambiguation(this, starting, clockwise));
            
        }
        
        return this;
        
    };
    
    /**
     * Tells whether this direction the same as the provided direction.
     * 
     * @param {String|direction app.classes.geom.Direction} direction
     * 
     * @returns {Boolean}
     */
    api.equals = function (direction) {
        
        if (typeof direction === 'string') {
            
            direction = new Direction(direction);
            
        }
        
        return      this.directions === direction.directions
                &&  this.up         === direction.up
                &&  this.left       === direction.left
                &&  this.down       === direction.down
                &&  this.right      === direction.right;
        
    };
    
    /**
     * Tells whether the direction has at least one X axis direction
     * (e.g. left or right) in it.
     * 
     * @returns {Boolean}
     */
    api.hasX = function () {
        
        return this.left || this.right;
        
    };
    
    /**
     * Tells whether the direction has at least one Y axis direction
     * (e.g. up or down) in it.
     * 
     * @returns {Boolean}
     */
    api.hasY = function () {
        
        return this.up || this.down;
        
    };
    
    /**
     * Returns the direction that this instance is facing on the X axis
     * (e.g. left or right) or an empty string if neither.
     * 
     * @returns {String} <code>Direction.LEFT|Direction.RIGHT|&lt;emtpy string&gt;</code>
     */
    api.getX = function () {
        
        return this.left ? Direction.LEFT : (this.right ? Direction.RIGHT : Direction.NONE);
        
    };
    
    /**
     * Returns the direction that this instance is facing on the Y axis
     * (e.g. up or down) or an empty string if neither.
     * 
     * @returns {String} <code>Direction.UP|Direction.DOWN|&lt;emtpy string&gt;</code>
     */
    api.getY = function () {
        
        return this.up ? Direction.UP : (this.down ? Direction.DOWN : Direction.NONE);
        
    };
    
    /**
     * Returns a new Direction facing the oppotise direction.
     * 
     * @returns {app.classes.game.utils.Direction}
     */
    api.opposite = function () {
        
        var direction = Direction.NONE;
        
        if (this.down) {
            
            direction += Direction.OPPOSITE_DOWN;
                    
        }
        
        if (this.right) {
            
            direction += Direction.OPPOSITE_RIGHT;
                    
        }
        
        if (this.up) {
            
            direction += Direction.OPPOSITE_UP;
                    
        }
        
        if (this.left) {
            
            direction += Direction.OPPOSITE_LEFT;
                    
        }
        
        return new Direction(direction);
        
    };
    
    /**
     * Retuns the string representation of this direction.
     * 
     * @returns {String}
     */
    api.stringify = api.toString = function () {
        
        if (this.direction && typeof this.direction === 'string') {
            
            return this.direction;
            
        }
        
        this.direction = Direction.NONE;
        
        if (this.up) {
            
            this.direction += Direction.UP;
                    
        }
        
        if (this.down) {
            
            this.direction += Direction.DOWN;
                    
        }
        
        if (this.left) {
            
            this.direction += Direction.LEFT;
                    
        }
        
        if (this.right) {
            
            this.direction += Direction.RIGHT;
                    
        }
        
        return this.direction;
        
    };
    
    Direction.prototype = api;
    
    /**
     * Removes conflicting directions
     * (e.g. stuff like up and down or left and right) from this
     * direction starting from the provided startDirection, going
     * counter clockwise or clockwise.
     * 
     * @private
     * 
     * @param {app.classes.game.utils.Direction} that
     * @param {String} [starting=app.classes.game.utils.Direction.UP]
     * @param {Boolean} [clockwise=false]
     * 
     * @returns {String} 
     */
    function disambiguation (that, starting, clockwise) {
        
        var axes                = that.getAmbiguousAxes(),
            axesHasX            = axes.indexOf(Direction.AXIS_X) !== -1,
            axesHasY            = axes.indexOf(Direction.AXIS_Y) !== -1,
            direction           = Direction.NONE;
        
        starting                = starting || Direction.UP;
        
        if (arguments.length === 1 ? false: !!clockwise) {
            
            switch (starting) {
                
                case Direction.UP:
                    
                    if (axesHasY)
                        direction  += that.up    ? Direction.UP   : Direction.DOWN;
                       
                    if (axesHasX)
                        direction  += that.right ? Direction.RIGHT: Direction.LEFT;
                    
                    break;
                    
                case Direction.RIGHT:
                    
                    if (axesHasY)
                        direction  += that.down  ? Direction.DOWN : Direction.UP;
                    
                    if (axesHasX)
                        direction  += that.right ? Direction.RIGHT: Direction.LEFT;
                    
                    break;
                    
                case Direction.DOWN:
                    
                    if (axesHasY)
                        direction  += that.down  ? Direction.DOWN : Direction.UP;
                    
                    if (axesHasX)
                        direction  += that.left  ? Direction.LEFT : Direction.RIGHT;
                    
                    break;
                    
                case Direction.LEFT:
                    
                    if (axesHasY)
                        direction  += that.up    ? Direction.UP   : Direction.DOWN;
                    
                    if (axesHasX)
                        direction  += that.left  ? Direction.LEFT : Direction.RIGHT;
                    
                    break;
                    
            }
            
        }
        else {
            
            switch (starting) {
                
                case Direction.UP:
                    
                    if (axesHasY)
                        direction  += that.up    ? Direction.UP   : Direction.DOWN;
                    
                    if (axesHasX)
                        direction  += that.left  ? Direction.LEFT : Direction.RIGHT;
                    
                    break;
                    
                case Direction.LEFT:
                    
                    if (axesHasY)
                        direction  += that.down  ? Direction.DOWN : Direction.UP;
                    
                    if (axesHasX)
                        direction  += that.left  ? Direction.LEFT : Direction.RIGHT;
                    
                    break;
                    
                case Direction.DOWN:
                    
                    if (axesHasY)
                        direction  += that.down  ? Direction.DOWN : Direction.UP;
                    
                    if (axesHasX)
                        direction  += that.right ? Direction.RIGHT: Direction.LEFT;
                    
                    break;
                    
                case Direction.RIGHT:
                    
                    if (axesHasY)
                        direction  += that.up    ? Direction.UP   : Direction.DOWN;
                    
                    if (axesHasX)
                        direction  += that.right ? Direction.RIGHT: Direction.LEFT;
                    
                    break;
                
            }
            
        }
        
        if (axes !== Direction.AXES_YX) {
        
            if (axesHasY) { // then x was not ambiguous
                
                if (that.left)
                    direction  += Direction.LEFT;

                if (that.right)
                    direction  += Direction.RIGHT;
                
            }
            else if (axesHasX) { // then y was not ambiguous

                if (that.up)
                    direction  += Direction.UP;

                if (that.down)
                    direction  += Direction.DOWN;
                
            }
            
        }
        
        return direction;
        
    };
    
    /**
     * Contains static directional properties and methods.
     * 
     * @typedef {Direction} app.classes.geom.Direction 
     */
    ns.set('app.classes.geom.Direction', Direction);
    
 })();