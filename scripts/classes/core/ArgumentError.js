/* global ns */

(function () {
    
    /**
     * @type Error
     */
    var Super = Error,
        
        /**
         * @lends app.core.ArgumentError.prototype
         */
        api = new Super;
    
    /**
     * Creates a new ArgumentError object.
     * 
     * @class
     * @param {String} message
     */
    function ArgumentError (message) {
        
        this.message    = message;
        
        this.stack      = Super.captureStackTrace
                        ? Super.captureStackTrace(this, this.constructor)
                        : (new Super).stack || null;
        
    }
    
    /**
     * @type Function
     */
    api.constructor = ArgumentError;
    
    /**
     * @type String The Error name
     */
    api.name = 'ArgumentError';
    
    ArgumentError.prototype = api;
    
    ns.set('app.core.ArgumentError', ArgumentError);
    
})();