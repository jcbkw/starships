/* global ns, app */

(function () {
    
    /**
     * @lends app.core.EventTarget.prototype
     */
    var api = {constructor: EventTarget};
    
    /**
     * Creates an object that can receive events and may 
     * have listeners for them.
     * 
     * @class
     */
    function EventTarget () {
        
        this.eventSubcribers = {};
        
    }
    
    /**
     * Register an event handler of a
     * specific event type on the EventTarget.
     * 
     * @param {String} type         The type of the to listen to.
     * @param {Function} listener   The callback to be invoked.
     */
    api.addListener = function (type, listener) {
        
        if (!this.eventSubcribers.hasOwnProperty(type)) {
            
            this.eventSubcribers[type] = [];
            
        }
        
        this.eventSubcribers[type].push(listener);
        
    };
    
    /**
     * Register an event handler of a
     * specific event type on the EventTarget
     * that will be called at most once.
     * 
     * @param {String} type         The type of the to listen to.
     * @param {Function} listener   The callback to be invoked.
     */
    api.addListenerOnce = function (type, listener) {
        
        this.addListener(type, function handler () {
            
            this.removeListener(type, handler);
            
            listener.apply(this, Array.prototype.slice.call(arguments, 0));
                        
        });    
        
    };
    
    /**
     * Dispatch an event to this EventTarget.
     * @param {String|app.core.Event} eventOrType   The event or its type
     * @param {*} [data]                            Arbitrary data to pass
     *                                              along with the event.
     *                                              Only used if the first
     *                                              parameter with just
     *                                              a string.
     */
    api.dispatchEvent = function (eventOrType, data) {
        
        var type = eventOrType + '';
        
        if (this.eventSubcribers.hasOwnProperty(type)) {
                        
            if (!(eventOrType instanceof app.core.Event)) {

                eventOrType = new app.core.Event(
                    String(eventOrType),
                    this,
                    data
                );

            }
            
            var list = this.eventSubcribers[type];
                        
            for (var i = 0, count = list.length; i < count; i += 1) {
                
                var listener = list[i];
                
                if (listener) {
                    
                    listener.call(this, eventOrType);
                    
                    if (eventOrType.propagationStopped) {
                        
                        break;
                        
                    }
                    
                }
                
            }
            
            listener = list = null;
            
        }
        
        eventOrType = null;
        
    };
    
    /**
     * Removes one or more event listeners
     * from the EventTarget.
     *
     * @param {String} [type]   The type of event to stop
     *                          listening to. If not provided
     *                          and the callback is also not
     *                          provided, all the handlers
     *                          will get discarded from this
     *                          EventTarget.
     *                          
     * @param {Function} [listener] The handler to unregister.
     *                              If not provided
     *                              and only the type is
     *                              provided, all the handlers
     *                              of the provided type
     *                              will get discarded from this
     *                              EventTarget.
     */
    api.removeListener = function (type, listener) {
        
        var index;
        
        switch (arguments.length) {
            
            case 0: this.eventSubcribers = {}; break;
            
            case 1: 
                
                if (this.eventSubcribers.hasOwnProperty(type)) {
            
                    this.eventSubcribers[type] = [];

                }
                
                break;
                
            default:
                
                if (this.eventSubcribers.hasOwnProperty(type)) {
                    
                    index = this.eventSubcribers[type].indexOf(listener);
                    
                    if (index !== -1) {
                        
                        this.eventSubcribers[type][index] = null;
                        
                    }

                }
                
                break;
            
        }
        
    };
    
    EventTarget.prototype = api;
    
    ns.set('app.core.EventTarget', EventTarget);
    
})();