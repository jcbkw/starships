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
            /*angle*/ 0,
            /*speed*/ 1,
            /*lifeImpact*/  -5
        );

        var isOnPlayerSide = this.isOnPlayerSide();
        
        this.setStrategy(app.classes.game.entities.base.Bullet.Strategy.STATIC_DIRECTION);
        
        if (isOnPlayerSide) {
            
            this.setDirection(app.classes.geom.Direction.UP);
            // todo nooooo
            this.element.style.backgroundColor = 'rgb(85, 85, 255)';
            
        }
        else {
            
            this.setDirection(app.classes.geom.Direction.DOWN);
            // todo nooooo
            this.element.style.backgroundColor = 'orangered';
            
        }
        
    }
    
    UpOrDownBullet.prototype = api;
    
    ns.set('app.classes.game.entities.bullets.UpOrDownBullet', UpOrDownBullet);

})();