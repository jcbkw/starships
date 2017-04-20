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
     * An abstract TinyBullet class. Extenders must implement
     * its <code>isCollidableWith</code> method.
     * 
     * @class
     * 
     * @param {Weapon} weapon
     */
    function TinyBullet (weapon) {
        
        // call to super
        Super.call(   
            this,
            weapon,
            /*angle*/  0,
            /*speed*/  5, 
            /*x*/      0, 
            /*y*/      0, 
            /*width*/  5, 
            /*height*/ 5
        );
        
        this.initialPad = 0;
        this.setLifeImpact(-5);   
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