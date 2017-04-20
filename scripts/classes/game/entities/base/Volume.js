/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.base.Insentient
     */
    var Super = app.classes.game.entities.base.Insentient,
        
        /**
         * @lends app.classes.game.entities.base.Volume.prototype
         */
        api = new Super;

    /**
     * Creates a basic volume;
     * 
     * @class Volume
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Volume (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
    }
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Volume;
    
    Volume.prototype = api;
    
    ns.set('app.classes.game.entities.base.Volume', Volume);
    
})();