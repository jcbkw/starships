/* global ns */

(function () {
    
    /**
     * @lends app.classes.display.displayable.Informer
     */
    var api = {constructor: Informer};
    
    function Informer () {
        
        this.added   = null;
        this.removed = null;
        
    }
    
    api.added   = null;
    api.removed = null;
    
    Informer.prototype = api;
    
    ns.set('app.classes.display.displayable.Informer', Informer);
    
})();