/* global app, ns */

(function () {
    
    var Super = app.classes.game.entities.base.Weapon,
    
        /**
         * @lends app.classes.game.entities.base.Gun.prototype
         */
        api = new Super;

    /**
     * @class A base Gun class.
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Gun (x, y, width, height) {
        
        // calling super
        Super.call(this, x, y, width, height);
        this.group.add(Gun.GROUP);
        
        this.ammo = Number.POSITIVE_INFINITY;

    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.entities.base.Gun
     */
    Gun.GROUP = 'gun';
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Gun;
    
    /**
     * Attacks (shoots a bullet) using this gun.
     */
    api.attack =  function () {
        
        var bullet,
            attacker;

        if (this.ammo > 0) {
            
            attacker = this.getAttacker();
            
            if (attacker) {
                
                // todo, quick and dirty, the gun should not
                // decide which bullet to use
                bullet = new app.classes.game.entities.bullets.TinyBullet(this);
                
                attacker.getContainer().addChild(bullet);
                bullet.fire();

                this.ammo--;
                
            }

        }
        
        bullet = attacker = null;

    };
    
    Gun.prototype = api;
    
    ns.set('app.classes.game.entities.base.Gun', Gun);

})();