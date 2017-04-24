/* global ns */

(function () {
    
    /**
     * @lends app.core.Event.prototype
     */
    var api = {constructor: Event};
    
    /**
     * The Event() constructor creates a new Event.
     * 
     * @class
     * 
     * @param {String} type                 The Event's type
     * @param {*} [target=null]             The object emitting the event
     * @param {*} [data={}]                 Arbitraty event data
     * @param {Boolean} [cancelable=true]   A Boolean indicating whether the
     *                                      event is cancelable
     */
    function Event (type, target, data, cancelable) {
        
        /**
         * The name of the event.
         */
        this.type = type;
        
        /**
         * Arbitraty data associated with this event.
         */
        this.data = data === void 0 ? {} : data;
        
        /**
         * A reference to the target to which the event was originally dispatched.
         */
        this.target = target === void 0 ? null : target;
        
        /**
         * A Boolean indicating whether the event is cancelable.
         */
        this.cancelable = cancelable === void 0 ? true : !!cancelable;
        
        /**
         * Indicates whether or not event.preventDefault() 
         * has been called on the event.
         */
        this.defaultPrevented = false;
        
        /**
         * Indicates whether or not event.stopPropagation() 
         * has been called on the event.
         */
        this.propagationStopped = false;
        
    }
    
    /**
     * Cancels the event (if it is cancelable).
     */
    api.preventDefault = function () {
        
        if (this.cancelable) {
            
            this.defaultPrevented = true;
            
        }
        
    };
    
    /**
     * For this particular event,
     * no other listener will be called.
     */
    api.stopPropagation = function () {
        
        this.propagationStopped = true;
        
    };
    
    /**
     * The String representation of this instance.
     */
    api.toString = function () {
        
        return this.type + '';
        
    };
    
    Event.prototype = api;
    
    ns.set('app.core.Event', Event);
    
})();