/* global ns, app */

(function () {
    
    /**
     * @type app.core.Finalizable
     */
    var Super = app.core.Finalizable,
    
        /**
         * @lends {app.classes.display.displayable.Transformer.prototype}
         */
        api = new Super;
    
    /**
     * Creates a Processor instance.
     * 
     * @class
     * 
     * @name Processor
     * @param {Displayable} displayable
     */
    function Processor (displayable) {
        
        // call super
        Super.call(this);
        
        this.displayable = displayable;
        
    }
    
    /**
     * @type {app.classes.display.Displayable}
     */
    api.displayable = null;
    
    
    /**
     * @type {Function}
     */
    api.constructor = Processor;
    
    
    /**
     * Clear this object and mark
     * it as finalized.
     */
    api.finalize = function () {
        
        // call super method
        Super.prototype.finalize.call(this);
        
        this.displayable = null;
        
    };
    
    api.centerX = function () {
        
        return this.displayable.width / 2;
        
    };
    
    api.centerY = function () {
        
        return this.displayable.height / 2;
        
    };
    
    api.leftTopPoint = function () {
        
        return new app.classes.geom.Point(this.displayable.x, this.displayable.y);
        
    };
    
    api.centerTopPoint = function () {
        
        return new app.classes.geom.Point(this.centerX(), this.displayable.y);
        
    };
    
    api.rightTopPoint = function () {
        
        return new app.classes.geom.Point(this.displayable.width, this.displayable.y);
        
    };
    
    api.leftCenterPoint = function () {
        
        return new app.classes.geom.Point(this.displayable.x, this.centerY());
        
    };
    
    api.centerPoint = function () {
        
        return new app.classes.geom.Point(this.centerX(), this.centerY());
        
    };
    
    api.rightCenterPoint = function () {
        
        return new app.classes.geom.Point(this.displayable.width, this.centerY());
        
    };
    
    api.leftBottomPoint = function () {
        
        return new app.classes.geom.Point(this.displayable.x, this.displayable.heigth);
        
    };
    
    api.centerBottomPoint = function () {
        
        return new app.classes.geom.Point(this.centerX(), this.displayable.heigth);
        
    };
    
    api.rightBottomPoint = function () {
        
        return new app.classes.geom.Point(this.displayable.width, this.displayable.heigth);
        
    };
    
    Processor.prototype = api;
    
    ns.set('app.classes.display.displayable.Processor', Processor);
    
})();