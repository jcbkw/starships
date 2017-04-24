 /* global app, ns */

(function () {
     
    var Super = app.classes.display.DisplayableContainer,
        
        /**
         * @lends app.classes.display.DisplayableClip.prototype
         */
        api = new Super;
        
    /**
     * Creates a DisplayableContainer that can cross from point to another
     * whithin its container.
     * 
     * @class
     * @name DisplayableClip
     * @memberOf app.classes.display
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function DisplayableClip (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
        this._uncross = [];
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.display.DisplayableClip
     */
    DisplayableClip.GROUP = 'displayclip';
    
    /**
     * @type {Function} constructor Constructor
     */
    api.constructor = DisplayableClip;

    /**
     * @property {Number} stepSize The clips's displacement size
     */
    api.stepSize = 1;
    
    /**
     * @private
     * @type {Function[]} _uncross          These function are temporarily
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
     * @param {app.classes.display.DisplayableClip} instance The instance which was crossing
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
     * @param {app.classes.display.DisplayableClip~crossOnCompleteCallback} [onComplete]
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
        
        x = x || 0;
        y = y || 0;
                
        var crossId         = -1,
            that            = this,
            live            = !v || typeof v === 'object',
            
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
            
            xV,
            yV,
            m,
            
            mSource,
            setDirection;
            
        if (live) {
            
            mSource         = !v ? that : v;
                        
        }
        else {
            
            m               = v;
            xV              = xNeg ? -m : m;
            yV              = yNeg ? -m : m;
                        
        }
            
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
            
            if (live) {
            
                m               = mSource.stepSize;
                xV              = xNeg ? -m : m;
                yV              = yNeg ? -m : m;
                
            }
            
            if (x && !xDone) {
                
                nowX += xV;
                xDone = xNeg ? nowX <= endX : nowX >= endX;
                
                if (xDone) {
                    
                    if (endY !== nowY) {
                        
                        // adjust delta to end excalty at endX
                        xV = nowX - endX;
                        
                    }
                    
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
                    
                    if (endY !== nowY) {
                        
                        // adjust delta to end excalty at endY
                        yV = nowY - endY;
                        
                    }
                    
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
                
                stepper = stop = null;
                
                if (crossId !== -1 && that._uncross[crossId]) {
                    
                    that._uncross[crossId] = null;
                    crossId = -1;
                    
                }
                
                app.nextTick(function () {
                    
                    onComplete && onComplete.call(that, !!force);
                                        
                    that = null;
                    
                });
                
            }

        }
        
        crossId = this._uncross.length;
        
        this._uncross[crossId] = function () {

            stop && stop(true /*forced*/);

        };

        setDirection && setDirection();            
        app.onTick(stepper);
        
        return crossId;
        
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

        // quick check for a positive integer
        x = !x || x < 0 ? 0 : x;
        y = !y || y < 0 ? 0 : y;

        return this.cross(x - this.x, y - this.y, onComplete, onDirection, onStep, v);

    };
    
    /**
     * Cancels any motion started by 
     * cross or crossTo (if any) at any time.
     * 
     * @param {int} id The ID of the cross to uncross.
     *                 If ommitted, all the crosses get
     *                 stopped.
     */
    api.uncross = function (id) {
                
        if (arguments.length === 0) {
            
            this._uncross.forEach(uncross, this);
            
        }
        else {
            
            uncross.call(this, this._uncross[id], id);
            
        }
        
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
    
    /**
     * Invokes the given uncrossFn,
     * and removes it from the _uncross
     * functions array.
     * 
     * @private
     * 
     * @param {Function} uncrossFn
     * @param {int} index
     */
    function uncross (uncrossFn, index) {
        
        uncrossFn && uncrossFn();
        
        this[index] = null;
                
    }
    
    DisplayableClip.prototype = api;
    
    ns.set('app.classes.display.DisplayableClip', DisplayableClip);
    
 })();