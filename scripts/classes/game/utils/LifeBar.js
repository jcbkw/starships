/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.utils.LifeGaugeView
     */
    var Super = app.classes.game.utils.LifeGaugeView,
    
        /**
         * @lends app.classes.game.utils.LifeBar.prototype
         */
        api = new Super;
    
    /**
     * Creates a LifeBar instance
     * 
     * @class
     * 
     * @augments app.classes.game.utils.LifeGaugeView
     */
    function LifeBar () {
            
        Super.call(this);
        this.group.add(LifeBar.GROUP);
        this.addListenerOnce(this.events.ADDED, onAdded);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.utils.LifeBar
     */
    LifeBar.GROUP = 'lifebar';
    
    /**
     * @type {app.classes.display.DisplayableContainer}
     */
    api.meter = null;
    
    /**
     * Set this gauge's life points.
     * 
     * @param {Number} value
     */
    api.setLife = function (value) {
        
        // call super method
        Super.prototype.setLife.call(this, value);
        
        if (this.meter) {
            
            var percent  = app.tk.calc.toPercent(this.getLife(), this.getMax());
            var newWidth = app.tk.calc.ofPercent(this.width, percent);
            
            this.meter.setSize(newWidth, this.height);
            
        }
        
    };
    
    function onAdded (container) {
        
        var height  = 2,
            width   = 15,
            x       = (container.width / 2) - (width / 2),
            y       = -(height * 2);
    
        this.setPosition(x, y);
        this.setSize(width, height);
         
        createMeter(this);
        
    }
    
    function createMeter (lifeBar) {
        
        lifeBar.meter = new app.classes.display.DisplayableContainer(0, 0, 
        lifeBar.width, lifeBar.height);
        
        lifeBar.meter.group.add("lifebar-meter");
        
        lifeBar.addChild(lifeBar.meter);
        
    }
    
    LifeBar.prototype = api;
    
    ns.set("app.classes.game.utils.LifeBar", LifeBar);
    
})();