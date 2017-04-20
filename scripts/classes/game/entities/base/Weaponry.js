/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.base.Insentient
     */
    var Super = app.classes.game.entities.base.Insentient,
    
        /**
         * @lends app.classes.game.entities.base.Weaponry.prototype
         */
        api = new Super;

    /**
     * Weaponry The base Weaponry class.
     * Anytype that needs to be identified as a weapon
     * must inherit from this class.
     * 
     * @class
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Weaponry (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
        this.onPlayerSide = false;
        
    }
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Weaponry;
    
    /**
     * @type {Boolean}  Whether this weapon is currently harmful
     *                  to the player.
     */
    api.onPlayerSide = false;
    
    /**
     * Tells whether, at this point it time,
     * this weapon is neutral or harmful
     * to the player.
     * 
     * @returns {Boolean}
     */
    api.isOnPlayerSide = function () {
        
        return this.onPlayerSide;
        
    };
    
    /**
     * Sets whether, at this point it time,
     * this weapon is neutral or harmful
     * to the player.
     * 
     * @param {Boolean} value
     */
    api.setOnPlayerSide = function (value) {
        
        this.onPlayerSide = value;
        
    };
    
    Weaponry.prototype = api;
    
    ns.set('app.classes.game.entities.base.Weaponry', Weaponry);
    
})();