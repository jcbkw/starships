/* global app, ns */

(function () {
        
    var Super = app.classes.game.entities.base.Weapon,
    
        /**
         * @lends app.classes.game.entities.weapons.RedBane.prototype
         */
        api = new Super;

    /**
     * @class A base RedBane class.
     * 
     * @param {app.player} attacker 
     */
    function RedBane (attacker) {
        
        // calling super
        Super.call(this, attacker);
        this.group.add(RedBane.GROUP);
        
        this.ammo = Number.POSITIVE_INFINITY;
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.entities.weapons.RedBane
     */
    RedBane.GROUP = 'redbane';
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = RedBane;
    
    /**
     * Attacks (shoots a bullet) using this gun.
     */
    api.attack = function (){
        
        var that = this;
        
        if (!that.drawn) { 
            
            that.drawn = true;
            
            this.setSize(48, 24);
            this.attacker.addChild(this);
            
            function clear () {
                
                that.remove();
                
                that.drawn = false;
                
            }
            
            this.element.addEventListener('webkitAnimationEnd',clear, false); 
            
        }
        
    };
    
    RedBane.prototype = api;
    
    ns.set('app.classes.game.entities.weapons.RedBane', RedBane);

})();