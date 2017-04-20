 /* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.base.Character
     */
    var Super = app.classes.game.entities.base.Character,
        
        /**
         * @lends app.classes.game.entities.characters.Attacker.prototype
         */
        api = new Super;
    
    /**
     * Creates a Character who may possess a weapon.
     * 
     * @class Attacker
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Attacker (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
        this.weapon = null;
            
    }
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Attacker;
    
    /**
     * @property {app.classes.game.entities.base.Weapon} weapon The attacker's weapon
     */
    api.weapon = null;
    
    /**
     * Set the attacker's weapon
     * @param {(app.classes.game.entities.base.Weapon|null)} weapon
     */
    api.setWeapon = function (weapon) {
        
        if (this.weapon) {
            
            this.weapon.setAttacker(null);
            
        }
        
        if (weapon) {
            
            weapon.setAttacker(this);
            
        }
        
        this.weapon = weapon;
        
    };
    
    /**
     * Get the attacker's weapon
     * @returns {(app.classes.game.entities.base.Weapon|null)}
     */
    api.getWeapon = function () {
        
        return this.weapon;
        
    };
    
    /**
     * Check whether the attacker has a weapon
     * @returns {Boolean}
     */
    api.hasWeapon = function () {
        
        return this.weapon !== null;
        
    };
    
    /**
     * Attacks using the attacker's weapon if any.
     */
    api.attack = function () {

        if (this.weapon) {

            this.weapon.attack();

        }

    };

    Attacker.prototype = api;
    
    ns.set('app.classes.game.entities.characters.Attacker', Attacker);
    
 })();