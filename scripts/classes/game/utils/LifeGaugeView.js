/* global app, ns */

(function () {
    
    /**
     * @type app.classes.display.DisplayableContainer
     */
    var SuperA = app.classes.display.DisplayableContainer,
        
        /**
         * @type app.classes.game.utils.LifeGauge
         */
        SuperB = app.classes.game.utils.LifeGauge,
        
        /**
         * @lends app.classes.game.utils.LifeGaugeView.utils
         */
        api = ns.merge(new SuperA, SuperB.prototype);
        
    /**
     * Creates a LifeGaugeView instance
     * 
     * @class
     * 
     * @augments app.classes.display.DisplayableContainer
     * @augments app.classes.game.LifeGauge
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function LifeGaugeView (x, y, width, height) {
        
        SuperA.call(this, x, y, width, height);
        SuperB.call(this, LifeGaugeView.DEFAULT_LIFE, LifeGaugeView.DEFAULT_LIFE);
        
        this.group.add(LifeGaugeView.GROUP);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.utils.LifeGaugeView
     */
    LifeGaugeView.GROUP = 'LifeGaugeView';
    
    /**
     * The gauges default life.
     * 
     * @static
     * @name GROUP
     * @type Number
     * @memberOf app.classes.game.utils.LifeGaugeView
     */
    LifeGaugeView.DEFAULT_LIFE = 100;
    
    LifeGaugeView.prototype = api;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = LifeGaugeView;
    
    ns.set("app.classes.game.utils.LifeGaugeView", LifeGaugeView);
    
})();