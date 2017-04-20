/* global app, ns */

(function () {
    
    "use strict";
    
    /**
     * @type app.classes.display.DisplayClip
     */
    var Super = app.classes.display.DisplayClip,
        
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

        Super.call(this, x, y, 2, 2);
        
        // todo noooo
        this.element.style.backgroundColor = 'gray';
        this.stepSize = app.tk.ints.getRandomInt(1, 3);
        this.element.style.opacity = Math.random().toPrecision(1);
        
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
        
        var that = this;
        
        function travelUp () {
            
            that.setPosition(that.x, that.getContainer().height);
            that.crossTo(that.x, 0, travelUp);
            
        }
        
        that.crossTo(that.x, 0, travelUp);
        
    };
    
    Star.prototype = api;
    
    ns.set('app.classes.game.graphics.Star', Star);
    
})();