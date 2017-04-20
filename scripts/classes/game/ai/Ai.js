/* global ns */

(function () {
    
    /**
     * @class Ai A base AI class
     * @param {type} stage
     */
    function Ai (stage) {
        
        this.stage = stage;
        this.characters = [];
        
    }
    
    /**
     * @type app.classes.game.ai.Ai.prototype
     */
    var api = {};
    
    /**
     * @property {app.classes.game.Stage} stage The stage where this AI should 
     *                                          add characters.
     */
    api.stage = null;
    
    /**
     * @property {app.classes.game.characters.Character[]} characters The characters that 
     *                                                                this AI is currently
     *                                                                manipulating.
     */
    api.characters = null;
    
    /**
     * Starts the AI computations
     */
    api.start = function () {};
    
    api.hitsCharacter = function (rectangle) {
        
        for (var i = 0, count = this.characters.length, character; i < count; i += 1) {
            
            character = this.characters[i];
            
            if (rectangle.intersects(character)) {
                
                return character;
                
            }
            
        }
        
        return null;
        
    };
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Ai;
    
    Ai.prototype = api;
    
    ns.set('app.classes.game.ai.Ai', Ai);
    
})();