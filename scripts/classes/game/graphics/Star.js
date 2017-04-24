/* global app, ns */

(function () {
    
    "use strict";
    
    /**
     * @type app.classes.display.DisplayableClip
     */
    var Super = app.classes.display.DisplayableClip,
        
        /**
         * @lends app.classes.game.graphics.Star.prototype
         */
        api = new Super;
    
    /**
     * Creates a Star instance
     * 
     * @class
     * @param {Number} x
     * @param {Number} y
     */
    function Star (x, y) {

        var color = app.tk.ints.rand(10, 100),
            size  = app.tk.ints.rand(1, 2);
    
        Super.call(this, x, y, size, size);
        
        // todo noooo
        this.element.style.backgroundColor = 'rgb('+ color +','+ color +','+ color +')';
        this.stepSize = app.tk.ints.rand(1, 3);
        this.endY = 0;
        
    }  
    
    /**
     * @type Function
     */
    api.constructor = Star;
    
    /**
     * Makes the star travel on the y axis
     * of its container.
     * 
     */
    api.travel = function () {
        
        this.endY = this.getContainer().height;
        
        function travelUp () {
            
            this.setPosition(this.x, this.endY);
            this.crossTo(this.x, 0, travelUp);
            
        }
        
        this.crossTo(this.x, 0, travelUp);
        
    };
    
    Star.prototype = api;
    
    ns.set('app.classes.game.graphics.Star', Star);
    
})();