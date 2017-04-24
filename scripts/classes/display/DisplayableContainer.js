 /* global app, ns */

(function () {
    
    /**
     * Super
     * @private
     * @type app.classes.display.Displayable
     */
    var Super = app.classes.display.Displayable,
        
        /**
         * @private
         * @lends {app.classes.display.DisplayableContainer.prototype}
         */
        api = new Super;
        
    /**
     * An Object that can be rendered on the screen.
     * 
     * @name DisplayableContainer
     * @memberOf app.classes.display
     * 
     * @class
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function DisplayableContainer (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
        this.children = null;
        this.childCount = 0;
        
    }
    
    /**
     * @property {Displayable[]} children The list of children that this object 
     *                                    contains.
     */
    api.children = null;
    
    /**
     * @type {Number}
     */
    api.childCount = 0;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = DisplayableContainer;
    
    /**
     * Clear this object and mark
     * it as finalized.
     */
    api.finalize = function () {
        
        if (!this.isFinalized()) {
            
            // call super method
            Super.prototype.finalize.call(this);
            
            this.children       = null;
            
        }
        
    };
    
    /**
     * Returns the number of children contained is this
     * object.
     * 
     * @returns {Number}
     */
    api.countChildren = function () {
        
        return this.childCount;
        
    };
    
    /**
     * Tells whether this object contains children.
     * 
     * @returns {Boolean}
     */
    api.hasChildren = function () {
        
        return this.childCount > 0;
        
    };
    
    /**
     * Inserts an inner display object into this one.
     * 
     * @param {app.classes.display.Displayable} displayable
     */
    api.addChild = function (displayable) {
        
        if (app.tk.arrays.put(getChildren(this), displayable)) {
            
            onChildAdded(this, displayable, this.children.length - 1);
            
        }
        
    };
    
    /**
     * Inserts an inner display object into this one
     * at the index position specified.
     * 
     * @throws {app.core.RangeError} Throws if the index position does not 
     *                               exist in the child list.
     * 
     * @param {app.classes.display.Displayable} displayable
     * @param {Number} index
     */
    api.addChildAt = function (displayable, index) {
        
        var children = getChildren(this),
            previous;
        
        if (index === 0 || index < children.length) {
            
            previous = children[index] || null;
            children[index] = displayable;
            onChildAdded(this, displayable, index);
            
        }
        else {
            
            app.die(new app.core.RangeError('The index position does not exist in the child list!'));
            
        }
        
        return previous;
        
    };
    
    /**
     * Determines whether the specified display base is a child of the
     * DisplayableContainer instance or the instance itself.
     * 
     * @param {app.classes.display.Displayable} displayable
     * @returns {Boolean}
     */
    api.contains = function (displayable) {
        
        return     displayable === this 
                || (this.children && this.children.indexOf(displayable) !== -1);
        
    };
    
    /**
     * Returns the child instance that 
     * exists at the specified index.
     *
     * @param {Number} index
     * @returns {(app.classes.display.Displayable|null)}
     */
    api.getChildAt = function (index) {
        
        return (this.children && this.children[index]) || null;
        
    };
    
    /**
     * <p>Returns the child display base that exists with the specified name.
     * If more that one child display object has the specified name,
     * the method returns the first object in the child list.</p>
     * 
     * <p>Note that the {@link #getChildAt()} method is faster than the 
     * <code>getChildByName()</code> method.</p>
     * 
     * @param {String} name
     * @returns {(app.classes.display.Displayable|null)}
     */
    api.getChildByName = function (name) {
        
        if (this.children) {
            
            for (var i = 0, count = this.children.length, child; i < count; i += 1) {
                
                child = this.children[i];
                
                if (child && child.getName() === name) {
                    
                    return child;
                    
                }
                
            }
            
        }
        
        return null;
        
    };
    
    /**
     * Returns the child instance that 
     * exists at the specified index.
     *
     * @param {app.classes.display.Displayable} displayable
     * @returns {Number}
     */
    api.getChildIndex = function (displayable) {
        
        return resolveChildIndex(displayable);
        
    };
    
    /**
     * Returns this object's children.
     * 
     * @param {Function[]} [typeset]
     * 
     * @returns {app.classes.display.Displayable[]}
     */
    api.getChildren = function (typeset) {
        
        var anyType,
            list = [],
            child,
            count,
            i;
        
        if (this.children) {
            
            anyType = !typeset;
            
            for (i = 0, count = this.children.length; i < count; i += 1) {

                child = this.children[i];

                if (child && (anyType || app.tk.types.matches(child, typeset))) {

                    list.push(child);
                    
                }

            }
            
        }
        
        child = null;
        
        return list;
        
    };
    
    /**
     * Returns this object's children or grandchildren, and so on.
     * 
     * @param {Function[]} [typeset]
     * 
     * @returns {app.classes.display.Displayable[]}
     */
    api.getDescendants = function (typeset) {
        
        var anyType,
            list = [],
            child,
            count,
            i;
        
        if (this.children) {
            
            anyType = !typeset;
            
            for (i = 0, count = this.children.length; i < count; i += 1) {

                child = this.children[i];
                
                if (child && (anyType || app.tk.types.matches(child, typeset))) {

                    list.push(child);

                    if (child instanceof DisplayableContainer) {

                        list.push.apply(list, child.getDescendants(typeset));

                    }

                }

            }
            
        }
        
        child = null;
        
        return list;
        
    };
    
    /**
     * Returns an array of children that lie under the specified point.
     * 
     * @param {app.classes.geom.Point} point
     * @returns {app.classes.display.Displayable[]}
     */
    api.getChildrenUnderPoint = function (point) {
        
        var list = [],
            child,
            count,
            i;
    
        if (this.children) {
            
            for (i = 0, count = this.children.length; i < count; i += 1) {
                
                child = this.children[i];
                
                if (child && child.containsPoint(point)) {
                    
                    list.push(child);
                    
                }
                
            }
            
        }
        
        return list;
        
    };
    
    /**
     * Returns an array of objects that lie under the specified point and are
     * children (or grandchildren, and so on) of this DisplayableContainer instance.
     * 
     * @param {app.classes.geom.Point} point
     * @returns {app.classes.display.Displayable[]}
     */
    api.getDescendantsUnderPoint = function (point) {
        
        var list = [],
            child,
            count,
            i;
    
        if (this.children) {
            
            for (i = 0, count = this.children.length; i < count; i += 1) {
                
                child = this.children[i];
                
                if (child && child.containsPoint(point)) {
                    
                    list.push(child);
                    
                    if (child instanceof DisplayableContainer) {
                        
                        list.push.apply(list, child.getDescendantsUnderPoint(point));
                        
                    }
                    
                }
                
            }
            
        }
        
        return list;
        
    };
    
    /**
     * Removes a child of this display object from it.
     * 
     * @param {app.classes.display.Displayable} displayable
     */
    api.removeChild = function (displayable) {
        
        if (this.children && this.innerElement && displayable.container === this) {
            
            this.children[resolveChildIndex(displayable)] = null;
            
            onChildRemoved(this, displayable);
            
        }
        
    };
    
    /**
     * Removes a child of this display object from the 
     * specified index position.
     * 
     * @param {Number} index
     * @returns {app.classes.display.Displayable}
     */
    api.removeChildAt = function (index) {
        
        var child;
        
        if (this.children) {
            
            child = this.children[index];
            
            if (child) {
                
                this.children[index] = null;
                onChildRemoved(this, child);
                                
            }
            
        }
        
        return child || null;
        
    };
    
    /**
     * Removes all child instances from the
     * child list of the DisplayableContainer instance.
     * 
     * @param {Number} [beginIndex=0]
     * @param {Number} [endIndex]
     */
    api.removeChildren = function (beginIndex, endIndex) {
        
        var last,
            child;
        
        if (this.children) {
            
            last = this.children.length - 1;
            
            beginIndex = beginIndex || 0;
            endIndex = endIndex || last;
            
            if (   beginIndex < 0 
                || beginIndex > last
                || endIndex   < 0 
                || endIndex   > last) {
                
                app.die(new app.core.RangeError('The index position does not exist in the child list!'));
                
            }
            
            ++endIndex;
            
            for (beginIndex; beginIndex < endIndex; beginIndex += 1) {
                
                child = this.children[beginIndex];
                
                if (child) {
                    
                    this.children[beginIndex] = null;
                    onChildRemoved(this, child);
                    
                }
                
            }
            
            child = null;
            
        }
        
    };
    
    /**
     * <p>Changes the position of an existing child in the display 
     * container. This affects the layering of child objects.</p>
     * 
     * <p>When you use the <code>setChildIndex()</code> method and specify
     * an index position that is already occupied, the only positions that
     * change are those in between the display object's former and new position.
     * All others will stay the same.</p>
     * 
     * </p>If a child is moved to an index LOWER than
     * its current index, all children in between will INCREASE by 1 for their
     * index reference.</p>
     * 
     * </p>If a child is moved to an index HIGHER than its current index, 
     * all children in between will DECREASE by 1 for their index reference.</p>
     * 
     * @throws {app.core.RangeError} Throws if the index position does not 
     *                               exist in the child list.
     * 
     * @param {app.classes.display.Displayable} displayable
     * @param {Number} index
     * 
     * @example
     * // bring to front
     * container.setChildIndex(someChild, container.countChildren() - 1);
     * // send to back
     * container.setChildIndex(someChild, 0);
     */
    api.setChildIndex = function (displayable, index) {
        
        var oldIndex,
            previous;
        
        if (this.children) {
            
            if (displayable.container !== this) {
                
                app.die(new app.core.ArgumentError('The child parameter is not a child of this object!'));
                
            }
            
            if (index < 0 || index > (this.children.length - 1)) {
                    
                app.die(new app.core.RangeError('The index position does not exist in the child list!'));
                    
            }
                
            oldIndex = resolveChildIndex(displayable);
            
            if (index < oldIndex) {
                
                ++oldIndex;
                
                for (index; index < oldIndex; index += 1) {
                    
                    previous = this.children[index];
                    
                    this.children[index] = displayable;
                    
                    applyChildIndex(this, displayable, index);
                    
                    displayable = previous;
                    
                }
                
            }
            else if (index > oldIndex) {
                
                --oldIndex;
                
                for (index; index > oldIndex; index -= 1) {
                    
                    previous = this.children[index];
                    
                    this.children[index] = displayable;
                    
                    applyChildIndex(this, displayable, index);
                    
                    displayable = previous;
                    
                }
                
            }
            
        }
        
    };
    
    /**
     * Swaps the z-order (front-to-back order) of the two specified child objects.
     * All other child objects in the display object container remain 
     * in the same index positions.
     * 
     * @param {app.classes.display.Displayable} child1
     * @param {app.classes.display.Displayable} child2
     */
    api.swapChildren = function (child1, child2) {
        
        var index1,
            index2;
            
        if (this.children) {
            
            index1 = resolveChildIndex(child1);
            index2 = resolveChildIndex(child2);
            
            if (   child1.container !== this
                || child2.container !== this
                || index1 === -1
                || index2 === -1
               ) {
                
                app.die(new app.core.ArgumentError('The child parameter is not a child of this object!'));
                
            }
            
            if (index1 !== index2) {
                
                this.children[index1] = child2;
                this.children[index2] = child1;
                
                applyChildIndex(this, child2, index1);
                applyChildIndex(this, child1, index2);
                
            }
            
        }
        
    };
    
    /**
     * Swaps the z-order (front-to-back order) of the child objects at the 
     * two specified index positions in the child list.
     * All other child objects in the display object container remain 
     * in the same index positions.
     * 
     * @param {Number} index1
     * @param {Number} index2
     */
    api.swapChildrenAt = function (index1, index2) {
        
        var child1,
            child2;
            
        if (this.children) {
            
            child1 = this.children[index1];
            child2 = this.children[index2];
            
            if (!child1 || !child2) {
                
                app.die(new app.core.RangeError('The index position does not exist in the child list!'));
                
            }
            
            if (child1 !== child2) {
                
                this.children[index1] = child2;
                this.children[index2] = child1;
                
                applyChildIndex(this, child2, index1);
                applyChildIndex(this, child1, index2);
                
            }
            
        }
        
    };
    
    /**
     * Retreives or creates the innerElement of the provided instance.
     * 
     * @private
     * @param {Displayable} that
     * @returns {Element}
     */
    function getInnerElement (that) {
        
        if (!that.innerElement) {
            
            that.innerElement = document.createElement('div');
            
            that.innerElement.classList.add(app.classes.display.Displayable.GROUP + '-content');
            that.element.appendChild(that.innerElement);
            
        }
        
        return that.innerElement;
        
    }
    
    /**
     * Creates or retreives the children object.
     * 
     * @private
     * @param {app.classes.display.DisplayableContainer} that
     * @returns {Array}
     */
    function getChildren (that) {
        
        if (!that.children) {
            
            that.children = [];
            
        }
        
        return that.children;
        
    }
    
    /**
     * Resolves the index of the provided child.
     * 
     * @private
     * @param {app.classes.display.Displayable} child
     * @returns {Number} -1 if it could not be resolved
     */
    function resolveChildIndex (child) {
        
        var zIndex;
        
        if (child) {
            
            zIndex = child.element.style.zIndex;
            
            if (zIndex) {
                
                return parseInt(zIndex);
                
            }
            
        }
        
        return -1;
        
    }
    
    /**
     * Sets or clears the index of the provided child in the underlying
     * rendering engine.
     *  
     * @private
     * @param {app.classes.display.DisplayableContainer} that
     * @param {app.classes.display.Displayable} child
     * @param {Number} index
     */
    function applyChildIndex (that, child, index) {
        
        if (child) {
            
            child.element.style.zIndex = index;
            
        }
        
    }
        
    /**
     * Performs routines to be executed when a child is added
     * to this container.
     *  
     * @private
     * @param {app.classes.display.DisplayableContainer} that
     * @param {app.classes.display.Displayable} child
     * @param {Number} index
     */
    function onChildAdded (that, child, index) {
        
        ++that.childCount;
        
        child.container = that;
        applyChildIndex(that, child, index);
        getInnerElement(that).appendChild(child.element);
        child.dispatchEvent(child.events.ADDED);
        
    }
    
    /**
     * Performs routines to be executed when a child is removed
     * from this container.
     *  
     * @private
     * @param {app.classes.display.DisplayableContainer} that
     * @param {app.classes.display.Displayable} child
     */
    function onChildRemoved (that, child) {
        
        --that.childCount;
        
        child.container = null;
        applyChildIndex(that, child, '');
        that.innerElement.removeChild(child.element);
        child.dispatchEvent(child.events.REMOVED);
                
    }
    
    DisplayableContainer.prototype = api;
    
    ns.set('app.classes.display.DisplayableContainer', DisplayableContainer);
    
 })();