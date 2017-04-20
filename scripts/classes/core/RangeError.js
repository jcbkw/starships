/* global ns */

(function () {
    
    /**
     * @type Error
     */
    var Super = Error,
        
        /**
         * @lends app.core.RangeError.prototype
         */
        api = new Super;
    
    /**
     * Creates a new RangeError object.
     * 
     * @class
     * @param {String} message
     */
    function RangeError (message) {
        
        this.message    = message;
        
        this.stack      = Super.captureStackTrace
                        ? Super.captureStackTrace(this, this.constructor)
                        : (new Super).stack || null;
        
    }
    
    /**
     * @type Function
     */
    api.constructor = RangeError;
    
    /**
     * @type String The Error name
     */
    api.name = 'RangeError';
    
    RangeError.prototype = api;
    
    ns.set('app.core.RangeError', RangeError);
    
})();