/* global app, ns */

(function () {
    
    /**
     * @lends app.classes.game.utils.LifeGauge.prototype
     */
    var api = {constructor: LifeGauge};
    
    /**
     * Creates a LifeGauge instance
     * 
     * @class
     * 
     * @param {Number} [life]
     * @param {Number} [max]
     */
    function LifeGauge (life, max) {
        
        this.max = max;
        
        this.setLife(life);
        
    }
    
    /**
     * The life value of this gauge.
     * 
     * @type {Number}
     */
    api.life = 0;
    
    /**
     * The maximum life point of this gauge.
     * 
     * @type {Number}
     */
    api.max = 0;
    
    /**
     * Returns this gauge's max life points.
     * 
     * @returns {Number}
     */
    api.getMax = function () {
        
        return this.max;
        
    };
    
    /**
     * Set this gauge's max life points.
     * 
     * @param {Number} value
     */
    api.setMax = function (value) {
        
        this.max = value;
        
    };
    
    /**
     * Returns this gauge's life points.
     * 
     * @returns {Number}
     */
    api.getLife = function () {
        
        return this.life;
        
    };
    
    /**
     * Set this gauge's life points.
     * 
     * @param {Number} value
     */
    api.setLife = function (value) {
        
        this.life = value;
        
    };
    
    /**
     * Add the provided number
     * (positive or negative) to this gauge's 
     * life points.
     * 
     * @param {Number} value
     */
    api.updateLife = function (value) {
        
        var life = this.life;
        
        life += value;
        
        if (life < 0) {
            
            life = 0;
            
        }
        else if (life > this.max) {
            
            life = this.max;
            
        }
        
        this.setLife(life);
        
    };
    
    LifeGauge.prototype = api;
    
    ns.set("app.classes.game.utils.LifeGauge", LifeGauge);
    
})();