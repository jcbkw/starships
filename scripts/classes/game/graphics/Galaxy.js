/* global app, ns */

(function () {
    
    "use strict";
    
    /**
     * @type app.classes.display.DisplayableContainer
     */
    var Super = app.classes.display.DisplayableContainer,
        
        /**
         * @lends app.classes.game.graphics.Galaxy.prototype
         */
        api = new Super;
    
    /**
     * Creates a cluster of star instances
     * 
     * @class
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     */
    function Galaxy (x, y, width, height) {

        Super.call(this, x, y, width, height);
        
    }  
    
    /**
     * @type Function
     */
    api.constructor = Galaxy;
    
    /**
     * Renders the number of stars
     * @param {Number} count
     */
    api.render = function (count) {
        
        var star,
            i;
        
        for (i = 0; i <= count; i += 1 ) {
            
            star = new app.classes.game.graphics.Star(
                        app.tk.ints.getRandomInt(0, this.width),
                        app.tk.ints.getRandomInt(0, this.height)
                   );
            
            this.addChild(star);
            
            star.travel();
            
        }
        
    };
    
    Galaxy.prototype = api;
    
    ns.set('app.classes.game.graphics.Galaxy', Galaxy);
    
})();