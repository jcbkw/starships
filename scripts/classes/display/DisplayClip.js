 /* global app, ns */

(function () {
     
    var Super = app.classes.display.DisplayableContainer,
        
        /**
         * @lends app.classes.display.DisplayClip.prototype
         */
        api = new Super;
        
    /**
     * Creates a DisplayableContainer that can cross from point to another
     * whithin its container.
     * 
     * @class
     * @name DisplayClip
     * @memberOf app.classes.display
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function DisplayClip (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
        this._uncross = null;
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.display.DisplayClip
     */
    DisplayClip.GROUP = 'displayclip';
    
    /**
     * @type {Function} constructor Constructor
     */
    api.constructor = DisplayClip;

    /**
     * @property {Number} stepSize The clips's displacement size
     */
    api.stepSize = 1;
    
    /**
     * @private
     * @type {?Function} _uncross    This function is temporarily
     *                                      populated after a call to
     *                                      walk, walkTo, and can be
     *                                      used stop the clip from
     *                                      walking ahead of time.
     */
    api._uncross = null;
    
    /**
     * A function to call when the cross has been completed
     * 
     * @callback crossOnCompleteCallback
     * @param {app.classes.display.DisplayClip} instance The instance which was crossing
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
     * @param {app.classes.display.DisplayClip~crossOnCompleteCallback} [onComplete]
     *                                      
     * @param {Function} [onDirection]      A function to call each time
     *                                      this function has new insights
     *                                      about the direction towards 
     *                                      which this clip is crossing.
     *                                      
     * @param {Function} [onStep]           A function to call after each
     *                                      step of the cross.
     *                                      
     * @param {Number} [v=this.stepSize]    The stepSize to use.
     */
    api.cross = function (x, y, onComplete, onDirection, onStep, v) {
        
        x = x || 0;
        y = y || 0;
        v = v || this.stepSize;

        var that            = this,
            
            xDir            = x > 0 ? app.classes.geom.Direction.RIGHT 
                                    : app.classes.geom.Direction.LEFT,
            yDir            = y > 0 ? app.classes.geom.Direction.DOWN  
                                    : app.classes.geom.Direction.UP,
                        
            xNeg            = xDir === app.classes.geom.Direction.LEFT,
            yNeg            = yDir === app.classes.geom.Direction.UP,
            
            nowX            = that.x,
            nowY            = that.y,
            
            endX            = nowX + x,
            endY            = nowY + y,
                
            xDone           = !x,
            yDone           = !y,
            
            xV              = xNeg ? -v : v,
            yV              = yNeg ? -v : v,
            
            setDirection;
            
        if (onDirection) {
            
            setDirection = function () {

                var direction = '';
                
                if (!yDone) {

                    direction += yDir;

                }

                if (!xDone) {

                    direction += xDir;

                }
                
                onDirection.call(that, direction);

            };
            
        }
        
        function stepper () {

            if (x && !xDone) {
                
                nowX += xV;
                xDone = xNeg ? nowX <= endX : nowX >= endX;
                
                if (xDone) {
                    
                    that.move(xV, 0);
                    setDirection && setDirection();
                    stop();
                    
                }
                else {
                    
                    that.move(xV, 0);
                    
                }

            }

            if (y && !yDone) {
                
                nowY  += yV;
                yDone = yNeg ? nowY <= endY : nowY >= endY;
                
                if (yDone) {
                    
                    that.move(0, yV);
                    setDirection && setDirection();
                    stop();
                    
                }
                else {
                    
                    that.move(0, yV);
                    
                }

            }
            
            onStep && onStep.call(that, /*isLastCall*/yDone && xDone);

        }

        function stop (force) {

            if (stepper && (force || (xDone && yDone))) {

                xDone = yDone = true;

                app.unTick(stepper);               
                setDirection && setDirection();
                
                that._uncross = stepper = stop = null;
                
                app.nextTick(function () {
                    
                    onComplete && onComplete.call(that, !!force);
                                        
                    that = null;
                    
                });
                
            }

        }
        
        // cancel previous
        this.uncross();

        this._uncross = function () {

            stop && stop(true /*forced*/);

        };

        setDirection && setDirection();            
        app.onTick(stepper);
        
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
     * @param {Number} [v=this.stepSize]    The stepSize to use.
     */        
    api.crossTo = function (x, y, onComplete, onDirection, onStep, v) {

        // quick check for a positive integer
        x = !x || x < 0 ? 0 : x;
        y = !y || y < 0 ? 0 : y;

        return this.cross(x - this.x, y - this.y, onComplete, onDirection, onStep, v);

    };
    
    /**
     * Cancels any motion started by 
     * cross or crossTo (if any) at any time.
     */
    api.uncross = function () {
        
        this._uncross && this._uncross();
        
        this._uncross = null;
        
    };
    
    /**
     * Makes the clip step in the provided direction.
     * 
     * @param {String} [x]          The desired direction on the X axis.
     *                              Can be either left or right or a falsy value.
     *                              
     * @param {String} [y]          The desired direction on the Y axis.
     *                              Can be either up or down or null.
     *                              
     * @param {Number} [stepSize]   Uses the instance's stepSize by default.
     *                              If provided, always pass a positive Number.
     */
    api.steps = function (x, y, stepSize) {
        
        if (stepSize === void 0) {
            
            stepSize = this.stepSize;
            
        }
        
        this.move
        (
            x && (x === app.classes.geom.Direction.LEFT ? -stepSize : stepSize) || 0,
            y && (y === app.classes.geom.Direction.UP ? -stepSize : stepSize) || 0
        );
        
    };

    /**
     * Makes the clip step in the provided direction.
     * 
     * @param {String} direction    The desired direction. Can be either
     *                              up, down, left, right 
     * @param {Number} [stepSize]   Uses the instance's stepSize by default.
     *                              If provided, always pass a positive Number.
     */
    api.step = function (direction, stepSize) {
        
        if (stepSize === void 0) {
            
            stepSize = this.stepSize;
            
        }
        
        switch (direction) {
            
            case app.classes.geom.Direction.UP   : this.move(0, -stepSize); break;
            case app.classes.geom.Direction.DOWN : this.move(0, stepSize);  break;
            case app.classes.geom.Direction.LEFT : this.move(-stepSize);    break;
            case app.classes.geom.Direction.RIGHT: this.move(stepSize);     break;

        }  

    };
    
    DisplayClip.prototype = api;
    
    ns.set('app.classes.display.DisplayClip', DisplayClip);
    
 })();