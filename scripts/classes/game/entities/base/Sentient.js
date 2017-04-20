/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.base.Entity
     */
    var Super = app.classes.game.entities.base.Entity,
        
        /**
         * @lends app.classes.game.entities.base.Sentient.prototype
         */
        api = new Super;

    /**
     * Creates a neutral sentient entity;
     * 
     * @class Sentient
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Sentient (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
    }
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Sentient;
    
    Sentient.prototype = api;
    
    ns.set('app.classes.game.entities.base.Sentient', Sentient);
    
})();