 /* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.base.Character
     */
    var Super = app.classes.game.entities.base.Character,
        
        /**
         * @lends app.classes.game.entities.characters.Actor.prototype
         */
        api = new Super;
        
    /**
     * @class Actor A base Actor Class
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Actor (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
        this.group.add(Actor.GROUP);
        
    }
        
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.entities.characters.Actor
     */
    Actor.GROUP = 'actor';
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Actor;
    
    Actor.prototype = api;
    
    ns.set('app.classes.game.entities.characters.Actor', Actor);
    
 })();