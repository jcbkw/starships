/* global ns, app */

(function () {
    
    /**
     * @class ZombieRaid A Zombie Raid AI class
     * @param {type} stage
     */
    function ZombieRaid (stage) {
        
        app.classes.game.ai.Ai.call(this, stage);
        
    }
    
    /**
     * @type app.classes.game.ai.ZombieRaid.prototype
     */
    var api = new app.classes.game.ai.Ai;
    
    /**
     * Starts the AI computations
     */
    api.start = function () {
        
             
        
    };
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = ZombieRaid;
    
    ZombieRaid.prototype = api;
    
    ns.set('app.classes.game.ai.ZombieRaid', ZombieRaid);
    
})();