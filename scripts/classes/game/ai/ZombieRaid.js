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
        var intruder, 
            height = 32,
            space = 10,
            width = 32,
            rows = 2,
            i,
            j;
    
        for (j = 0; j < rows; j +=1 ) {
           
            
            for (i = 0; i < 5; i += 1) {

                intruder = new app.classes.game.entities.characters.Enemy((width*i) + (space*i) , height*j, 32, 32)

                intruder.group.add('darkforce');

                this.stage.addChild(intruder);

            };
           
            
            
        }         
    
    
        
        
    };
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = ZombieRaid;
    
    ZombieRaid.prototype = api;
    
    ns.set('app.classes.game.ai.ZombieRaid', ZombieRaid);
    
})();