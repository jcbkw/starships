/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.base.Bullet
     */
    var Super = app.classes.game.entities.base.Bullet,
    
        /**
         * @lends app.classes.game.entities.weapons.TinyBullet.prototype
         */
        api = new Super;
    
    /**
     * Creates a TinyBullet instance.
     * 
     * @class
     * 
     * @param {Weapon} weapon
     * @param {Number} [speed=5]
     * @param {Number} [lifeImpact=-5]
     */
    function TinyBullet (weapon, speed, lifeImpact) {
        
        // call to super
        Super.call(   
            this,
            weapon,
            /*angle*/  0,
            /*speed*/  speed || 5, 
            /*x*/      0, 
            /*y*/      0, 
            /*width*/  5, 
            /*height*/ 5
        );
        
        this.initialPad = 0;
        this.setLifeImpact(lifeImpact || -5);   
        this.group.add(TinyBullet.GROUP);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.entities.base.Bullet
     */
    TinyBullet.GROUP = 'tinybullet';
    
    TinyBullet.prototype = api;
    
    ns.set('app.classes.game.entities.bullets.TinyBullet', TinyBullet);

})();