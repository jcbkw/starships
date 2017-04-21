/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.bullets.TinyBullet
     */
    var Super = app.classes.game.entities.bullets.TinyBullet,
    
        /**
         * @lends app.classes.game.entities.weapons.UpOrDownBullet.prototype
         */
        api = new Super;
    
    /**
     * Creates a TinyBullet instance.
     * 
     * @class
     * 
     * @param {Weapon} weapon
     */
    function UpOrDownBullet (weapon) {
        
        // call to super
        Super.call(   
            this,
            weapon,
            /*speed*/  5
            /*lifeImpact*/  -5
        );
        
        this.setStrategy(app.classes.game.entities.base.Bullet.Strategy.STATIC_DIRECTION);
        
        if (this.isOnPlayerSide()) {
            
            this.setDirection(app.classes.geom.Direction.UP);
            
        }
        else {
            
            this.setDirection(app.classes.geom.Direction.DOWN);
            
        }
        
    }
    
    UpOrDownBullet.prototype = api;
    
    ns.set('app.classes.game.entities.bullets.UpOrDownBullet', UpOrDownBullet);

})();