 /* global app, ns */

(function () {
    
    /**
     * Super
     * @private
     * @type Function
     */
    var SuperA = app.classes.geom.Rectangle,
    
        /**
         * Super
         * @private
         * @type Function
         */
        SuperB = app.core.Finalizable,
        
        /**
         * Super
         * @private
         * @type Function
         */
        SuperC = app.core.EventTarget,
        
        /**
         * Super
         * @private
         * @type Function
         */
        SuperD = app.core.MetadataBag,
        
        /**
         * @private
         * @lends {app.classes.display.Displayable.prototype}
         */
        api = ns.merge(new SuperA, 
                       SuperB.prototype, 
                       SuperC.prototype,
                       SuperD.prototype);
    
    /**
     * An Object that can be rendered on the screen.
     * 
     * @name Displayable
     * @memberOf app.classes.display
     * 
     * @class
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Displayable (x, y, width, height) {
        
        // call to super
        SuperA.call(this, x, y, width, height);
        SuperB.call(this);
        SuperC.call(this);
        SuperD.call(this);
        
        this.element = document.createElement('div');
        this.group = this.element.classList;
        this.transform = new app.classes.display.displayable.Transformer(this);
        this.visible = true;
        this.locked = false;
        this.alpha = 1;
        this.name = null;
        this.bounds = null;
        this.processor = null;
        this.container = null;
        
        this.setSize(this.width, this.height);
        this.setPosition(this.x, this.y);
       
        this.group.add(Displayable.GROUP);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.display.Displayable
     */
    Displayable.GROUP = 'displayable';
    
    /**
     * The events dispatched by this type.
     * 
     * @static
     * @name Events
     * @type namespace
     * @memberOf app.classes.display.Displayable
     */
    Displayable.Events = {
        
        /**
         * @memberOf app.classes.display.Displayable.Events
         * @property {String} ADDED Dispatched when this instance has been
         *                          added to a container.
         */
        ADDED: 'added',
        
        /**
         * @memberOf app.classes.display.Displayable.Events
         * @property {String} REMOVED Dispatched when this instance has been
         *                            removed from a container.
         */
        REMOVED: 'removed'
        
    };
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Displayable;

    /**
     * @property {Displayable} container this object's parent 
     *                           object on the screen
     */
    api.container = null;
    
    /**
     * @property {Element} element A DOM element used to display the object
     */
    api.element = null;
    
    /**
     * @property {Element} element A DOM element created inside this object's
     *                             element used to append inner element.
     *                             This object is null until a display object
     *                             has been insterted inside this one.
     */
    api.innerElement = null;
    
    /**
     * @property {DOMTokenList} group   Allows to add and remove qualifying groups
     *                                  to this object. Similar to a DOMElement's
     *                                  classList.
     */
    api.group = null;
    
    /**
     * @type app.classes.display.displayable.Transformer
     */
    api.transform = null;
    
    /**
     * @type app.classes.display.displayable.Processor
     */
    api.processor = null;
    
    /**
     * The events dispatched by this instance.
     * Shorthand to app.classes.display.Displayable.Events
     * @borrows app.classes.display.Displayable.Events as events
     * @type Object
     */
    api.events = Displayable.Events;
    
    /**
     * @type Number
     */
    api.alpha = 1;
    
    /**
     * @type Boolean
     */
    api.visible = true;
    
    /**
     * @type String
     */
    api.name = null;
    
    /**
     * @property {Boolean} locked Whether this object is prevented from moving
     */
    api.locked = false;
    
    /**
     * @property {RectangularBounds} bounds The bounds of this object whithin its
     *                                      parent. e.g. The limits of where it can
     *                                      move.
     */
    api.bounds = null;
    
    /**
     * Clear this object and mark
     * it as finalized.
     */
    api.finalize = function () {
        
        if (!this.isFinalized()) {
            
            // call super method
            SuperB.prototype.finalize.call(this);
            
            this.remove();
            this.transform.finalize();
            this.processor && this.processor.finalize();
            
            this.displayable    =
            this.container      = 
            this.transform      =
            this.processor      =
            this.children       = 
            this.element        = 
            this.bounds         = 
            this.group          = 
            this.name           = 
            this.on             = null;
            
        }
        
    };
    
    /**
     * Retreives the instance name. 
     * 
     *  @returns {String}  
     */
    api.getName = function () {
        
        return this.name;
        
    };
    
    /**
     * Indicates the instance name. The object can be identified in the child
     * list of its parent display object container by calling the 
     * <code>getChildByName()</code> method of its display container.
     * 
     * @param {String} value
     */
    api.setName = function (value) {
        
        this.name = value;
        
    };
        
    /**
     * Set this instance's opacity.
     * 
     * @param {Number} value A number between 0 and 1 inclusive
     */
    api.setAlpha = function (value) {
        
        this.alpha = value;
        this.element.style.opacity = value;
        
    };
    
    /**
     * Get this instance's opacity.
     * 
     * @returns {Number}
     */
    api.getAlpha = function () {
        
        return this.alpha;
        
    };
    
    /**
     * Set the visible state of this instance.
     * 
     * @param {Boolean} value
     */
    api.setVisible = function (value) {
        
        this.visible = value;
        this.element.style.display = value ? '' : 'none';
        
    };
    
    /**
     * Tells whether this instance's visible state.
     * 
     * @returns {Boolean}
     */
    api.isVisible = function () {
        
        return this.visible;
        
    };
    
    /**
     * Attach the provided qualifying 
     * key/value pair to this object.
     * 
     * @param {String} name
     * @param {String} value
     */
    api.setAttribute = function (name, value) {
        
        this.element.setAttribute(name, value);
        
    };
    
    /**
     * Tells whether this object contains the provided
     * attribute
     * 
     * @param {String} value
     * @returns {Boolean}
     */
    api.hasAttribute = function (value) {
        
        return this.element.hasAttribute(value);
        
    };
    
    /**
     * Returns the value attached to the provided
     * attribute of this object if any
     * 
     * @param {String} value
     * @returns {(String|null)}
     */
    api.getAttribute = function (value) {
        
        return this.element.getAttribute(value) || null;
        
    };
    
    /**
     * Removes this provided attribute from this element
     * 
     * @param {String} value
     */
    api.removeAttribute = function (value) {
        
        return this.element.removeAttribute(value);
        
    };
    
    /**
     * Return an object that can used to apply 2D tranforms
     * to this Displayable.
     * 
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.transformer = function () {
        
        return this.transform;
        
    };
    
    /**
     * Return an object that can used to calculate data
     * from and apply useful routines to this Displayable.
     * 
     * @returns {app.classes.display.displayable.Processor}
     */
    api.cpu = function () {
        
        if (this.processor === null) {
            
            this.processor = new app.classes.display.displayable.Processor(this);
            
        }
        
        return this.processor;
        
    };
       
    /**
     * Set this instance's width and height
     * within its container.
     * 
     * @param {Number} width
     * @param {Number} height
     */
    api.setSize = function (width, height) {
        
        this.width  = width;
        this.height = height;
        
        this.element.style.width    = width  + "px";
        this.element.style.height   = height + "px";
        
    };
    
    /**
     * Returns the instance's width and height as a
     * <code>app.classes.geom.Dimension</code> object.
     * 
     * @returns {app.classes.geom.Dimension}
     */
    api.getSize = function () {
        
        return new app.classes.geom.Dimension(this.width, this.height);
        
    };
        
    /**
     * Set this instance's x and y coordinates
     * within its container.
     * 
     * @param {Number} x
     * @param {Number} y
     */
    api.setPosition = function (x, y) {
        
        this.transform.xTranslation = this.x = x;
        this.transform.yTranslation = this.y = y;
        
        this.transform.apply();
        
    };
    
    /**
     * Returns the instance's x and y coordinates as a
     * <code>app.classes.geom.Point</code> object.
     * 
     * @returns {app.classes.geom.Point}
     */
    api.getPosition = function () {
        
        return new app.classes.geom.Point(this.x, this.y);
        
    };
    
    /**
     * Returns this instance's parent display object, if any.
     * 
     * @returns {(app.classes.display.Displayable|null)}
     */
    api.getContainer = function () {
        
        return this.container;
        
    };
    
    /**
     * Removes this display object from its container.
     */
    api.remove = function () {
        
        if (this.container) {
            
            this.container.removeChild(this);
            
        }
        
    };
    
    
    /**
     * Prevents or allowing this object from moving.
     * This affect the {@link #moveTo} function and
     * all its high level clients.
     * 
     * @param {Boolean} value
     */
    api.setLocked = function (value) {
        
        this.locked = value;
        
    };
    
    /**
     * Tells whether this object is prevented from moving.
     * 
     * @returns {Boolean}
     */
    api.isLocked = function () {
        
        return this.locked;
        
    };
    
    /**
     * Set the rectangle used to measure the bounds
     * of this object whithin its parent. e.g. The limits of where it can
     * move.
     * 
     * @param {(app.classes.geom.RectangularBounds|null)} bounds
     */
    api.setBounds = function (bounds) {
       
        this.bounds = bounds;
        
    };
    
    /**
     * Get the rectangle used to measure the bounds
     * of this object whithin its parent.
     * 
     * @returns {(app.classes.geom.RectangularBounds|null)}
     */
    api.getBounds = function () {
       
        return this.bounds;
        
    };
    
    /**
     * Creates a <code>app.classes.geom.RectangularBounds</code> using this instance's 
     * measurements and returns it.
     * 
     * @param {Boolean} [absolute=false]    <p>If <code>true</code> the bounds use 0 as their
     *                                      top, left and the instance's width and height
     *                                      as their bottom,right.</p>
     *                                      <p>If <code>false</code> the bounds use the instance's
     *                                      x and y as their top, left and the instance's 
     *                                      width and height added to its x and y as their
     *                                      bottom, right.</p>
     * 
     * @returns {app.classes.geom.RectangularBounds}
     */
    api.toBounds = function (absolute) {
        
        return app.classes.geom.RectangularBounds.fromRectangle(this, absolute);
        
    };
    
    /**
     * Use this object container's dimensions as its bounds.
     * 
     * @param {Boolean} [outside=false] Whether the object should be bound
     *                                  right outside its container as opposed
     *                                  to inside of it.
     */
    api.boundToContainer = function (outside) {
        
        var bounds = new app.classes.geom.RectangularBounds(),
            container = this.container;
        
        if (outside) {
            
            bounds          = new app.classes.geom.RectangularBounds(
                /*top*/     -this.height,
                /*right*/   container.width  + this.width,
                /*bottom*/  container.height + this.height,
                /*left*/    -this.width
            );
            
        }
        else {
            
            bounds          = new app.classes.geom.RectangularBounds(
                /*top*/     0,
                /*right*/   container.width  - this.width,
                /*bottom*/  container.height - this.height,
                /*left*/    0
            );
            
        }
        
        this.bounds = bounds;
        bounds = container = null;
        
    };
    
    /**
     * Tells whether this object is outside of its
     * bounds (if any) or outside of the provided
     * bounds (if given).
     * 
     * @param {RectangularBounds} [bounds]
     * @returns {Boolean}
     */
    api.isOutOfBounds = function (bounds) {
        
        if (!bounds) {
            
            bounds = this.bounds;
            
        }
        
        if (!bounds) {
            
            return false;
            
        }
        
        return     this.y < bounds.top
                || this.x < bounds.left
                || this.y > bounds.bottom
                || this.x > bounds.right;
        
    };
    
    /**
     * Places the object at a new position
     * relative to its current position.
     * 
     * @param {Number} [x=0] The relative x coordinate. 
     * @param {Number} [y=0] The relativ y coordinate.
     * 
     * @example
     * displayObject.move(5)     // moves right by 5px
     * displayObject.move(0, -2) // moves up by 2px
     */
    api.move = function (x, y) {

        this.moveTo(this.x + (x || 0), this.y + (y || 0));

    };
    
    /**
     * Moves this object to the specified position
     * while making sure that it remains its bounds.
     * 
     * @param {Number} x The x coordinate. 
     * @param {Number} y The y coordinate. 
     */
    api.moveTo = function (x, y) {
        
        if (!this.locked) {
            
            if (this.bounds) {

                // prevents from going out of bounds up or down
                // if y is less than the defined top
                if (y < this.bounds.top) {

                    // than set y to the defined top
                    // so that it can't go further up
                    y = this.bounds.top;

                }
                // otherwise
                // if y is more than the fartest allowed
                else if (y > this.bounds.bottom) {

                        // than set it to the fartest allowed
                        // so that it can't go further down
                        y = this.bounds.bottom;


                }

                // prevents from going out of bounds left or right
                // if x is less than the defined top
                if (x < this.bounds.left) {

                    // than set x to the defined top
                    // so that it can't go further left
                    x = this.bounds.left;

                }
                // otherwise 
                // if x is more than the fartest allowed
                else if (x > this.bounds.right) {

                    // than set it to the fartest allowed
                    // so that it can't go further right
                    x = this.bounds.right;

                }

            }

            this.setPosition(x, y);
            
        }

    };
    
    Displayable.prototype = api;
    
    ns.set('app.classes.display.Displayable', Displayable);
    
 })();