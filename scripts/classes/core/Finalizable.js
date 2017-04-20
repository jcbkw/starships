/* global ns */

(function () {
    
    /**
     * @lends app.core.Finalizable.prototype
     */
    var api = {constructor: Finalizable};
    
    /**
     * Creates an object that can be marked as 
     * being finalized. (e.g. should no longer be used
     * and is should be marked for garbage collection.)
     * 
     * @class
     */
    function Finalizable () {
        
        this.finalized = false;
        
    }
    
    /**
     * Holds whether this object as been finalized
     * and should no longer be used
     * @type {Boolean}
     */
    api.finalized = false;
    
    /**
     * Tells whether this object as been finalized
     * and should no longer be used.
     * 
     * @returns {Boolean}
     */
    api.isFinalized = function () {
        
        return this.finalized;
        
    };
    
    /**
     * Marks this object as finalized.
     */
    api.finalize = function () {
        
        this.finalized = true;
        
    };
    
    Finalizable.prototype = api;
    
    ns.set('app.core.Finalizable', Finalizable);
    
})();