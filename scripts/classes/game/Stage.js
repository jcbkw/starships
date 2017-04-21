 /* global app, ns */

(function () {
    
    /**
     * @type app.classes.display.DisplayClip
     */
    var Super = app.classes.display.DisplayClip,
    
        /**
         * @lends app.classes.display.Stage.prototype
         */
        api = new Super;
    
    /**
     * @class Stage The main DisplayClip of the application
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Stage (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
        this.group.add(Stage.GROUP);
        
        this.entities = [];
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.Stage
     */
    Stage.GROUP = 'stage';
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Stage;
    
    /**
     * @type app.classes.game.entities.base.Entity[]
     */
    api.entities = null;
    
    /**
     * Returns all the app.classes.game.entities.base.Entity
     * instances added to this stage.
     * 
     * @returns {app.classes.game.entities.base.Entity[]}
     */
    api.getEntities = function () {
        
        return this.entities.filter(function (e) {return !!e;});
        
    };
    
    /**
     * Restricts the Stage's panning to its viewport.
     * The <code>outside</code> parameter has no effect.
     * 
     * @param {Boolean} outside
     */
    api.boundToContainer = function (outside) {
        
        var container = this.getContainer();
        
        this.setBounds(new app.classes.geom.RectangularBounds(

            /*top*/     -(this.height - container.height),
            /*right*/   0,
            /*bottom*/  0,
            /*left*/    -(this.width - container.width)

        ));
        
    };
    
    /**
     * Inserts an inner display object into this one.
     * 
     * Overrites app.classes.display.DisplayableContainer's
     * method to capture entities for fast retrieval.
     * 
     * @param {app.classes.display.Displayable} displayable
     */
    api.addChild = function (displayable) {
        
        Super.prototype.addChild.call(this, displayable);
        onAdd(this, displayable);
        
    };
    
    /**
     * Inserts an inner display object into this one
     * at the index position specified.
     * 
     * Overrites app.classes.display.DisplayableContainer's
     * method to capture entities for fast retrieval.
     * 
     * @throws {app.core.RangeError} Throws if the index position does not 
     *                               exist in the child list.
     * 
     * @param {app.classes.display.Displayable} displayable
     * @param {Number} index
     */
    api.addChildAt = function (displayable, index) {
        
        Super.prototype.addChild.call(this, displayable, index);
        onAdd(this, displayable);
        
    };
    
    /**
     * Removes a child of this display object from it.
     * 
     * Overrites app.classes.display.DisplayableContainer's
     * method to capture entities for fast cleanrance.
     * 
     * @param {app.classes.display.Displayable} displayable
     */
    api.removeChild = function (displayable) {
         
        Super.prototype.removeChild.call(this, displayable);
        onRemove(this, displayable);
        
    };
    
    /**
     * Removes a child of this display object from the 
     * specified index position.
     * 
     * Overrites app.classes.display.DisplayableContainer's
     * method to capture entities for fast cleanrance.
     * 
     * @param {Number} index
     * @returns {app.classes.display.Displayable}
     */
    api.removeChildAt = function (index) {
        
        var displayable = Super.prototype.removeChild.call(this, index);
        
        onRemove(this, displayable);
        
    };
    
    /**
     * Routines to be performed on child added
     * @private
     * @param {app.classes.game.Stage} stage
     * @param {app.classes.display.Displayable} displayable
     */
    function onAdd (stage, displayable) {
        
        if (displayable && displayable instanceof app.classes.game.entities.base.Entity) {
            
            if (app.tk.arrays.put(stage.entities, displayable)) {
                
                displayable.setMetaData(new IndexStore(stage.entities.length - 1));
                
            }
            
        }
        
    }
    
    /**
     * Routines to be performed on child removed
     * @private
     * @param {app.classes.game.Stage} stage
     * @param {app.classes.display.Displayable} displayable
     */
    function onRemove (stage, displayable) {
        
        var indexStore = displayable && displayable.getMetaData();
        
        if (indexStore && indexStore instanceof IndexStore) {
            
            stage.entities[indexStore.index] = null;
            displayable.setMetaData(null);
            
        }
        
    }
    
    /**
     * Creates a fast object with an index property
     * @private
     * @param {Number} index
     */
    function IndexStore (index) {
        
        this.index = index;
        
    }
    
    Stage.prototype = api;
    
    ns.set('app.classes.game.Stage', Stage);
    
 })();