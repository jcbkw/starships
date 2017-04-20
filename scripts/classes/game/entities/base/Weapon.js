/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.base.Weaponry
     */
    var Super = app.classes.game.entities.base.Weaponry,
        
        /**
         * @lends app.classes.game.entities.base.Weapon.prototype
         */
        api = new Super;

    /**
     * The base, abstract Weapon class.
     * Extenders must implement the 
     * <code>attachk</code> function.
     * 
     * @class
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Weapon (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
        this.attacker = null;
        
    }
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Weapon;
    
    /**
     * @property {app.classes.game.entities.characters.Attacker} attacker The Weapons attacker
     */
    api.attacker = null;
    
    /**
     * Executes an attack with the current weapon.
     * @type Function
     */
    api.attack = null;

    /**
     * Returns the attacker whom this weapon is assigned to.
     * 
     * @return {app.classes.game.entities.characters.Attacker}
     */
    api.getAttacker = function () {

        return this.attacker;

    };
    
    /**
     * Sets the attacker whom this weapon is assigned to.
     * 
     * @param {app.classes.game.entities.characters.Attacker} attacker 
     */
    api.setAttacker = function (attacker) {
        
        this.attacker = attacker;
        
        this.setOnPlayerSide(
            
            this.attacker instanceof app.classes.game.entities.characters.Player
            
        );

    };
    
    Weapon.prototype = api;
    
    ns.set('app.classes.game.entities.base.Weapon', Weapon);
    
})();