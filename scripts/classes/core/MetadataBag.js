/* global GLOBAL, ns */

(function () {
    
    var api = {constructor: MetadataBag};
    
    /**
     * Creates a object that can store
     * arbitrary data.
     */
    function MetadataBag () {
        
        this.metadata = {};
        
    }
    
    /**
     * Stores a key/value pair of data to this instance
     * or stores all the key/values found in the provided
     * object to this medata store.
     * 
     * @param {String|Object} keyOrObject
     * @param {*} [value]
     */
    api.setMetadata = function (keyOrObject, value) {
        
        if (typeof keyOrObject === 'object' && keyOrObject) {
            
            ns.merge(this.metadata, keyOrObject);
            
        }
        else {
            
            this.metadata[keyOrObject]  = value;
            
        }
        
        return this;
        
    };
    
    /**
     * Returns the data stored at the provided key
     * or an object with the data corresponding to the
     * keys found in the provided array.
     * 
     * @param {String|String[]} keyOrArray
     * @returns {*|Object}
     */
    api.getMetadata = function (keyOrArray) {
        
        var result;
        
        if (Array.isArray(keyOrArray)) {
            
            result = {};
            
            keyOrArray.forEach(function (key) {
                
                result[key] = this.metadata[key];
                
            });
            
        }
        else {
            
            result = this.metadata[keyOrArray];
            
        }
        
        return result;
        
    };
    
    /**
     * Checks whether one or more metadata
     * are stored in this metadata store.
     * 
     * @param {String|String[]} keyOrArray
     * @returns {Boolean}
     */
    api.hasMetadata = function (keyOrArray) {
        
        var result;
        
        if (Array.isArray(keyOrArray)) {
                 
            keyOrArray.every(function (key) {
                
                return result =  this.metadata.hasOwnProperty(key)
                              && this.metadata[key] !== void 0;
                
            }, this);
            
        }
        else {
            
            result =  this.metadata.hasOwnProperty(keyOrArray)
                   && this.metadata[keyOrArray] !== void 0;
            
        }
        
        return result;
        
    };
    
    /**
     * Removes one or more metadata from this
     * metadat store.
     * 
     * @param {String|String[]} keyOrArray
     */
    api.removeMetadata = function (keyOrArray) {
        
        if (Array.isArray(keyOrArray)) {
                        
            keyOrArray.forEach(function (key) {
                
                this.metadata[key] = void 0;
                
            }, this);
            
        }
        else {
            
            this.metadata[keyOrArray] = void 0;
            
        }
        
    };
    
    MetadataBag.prototype                   = api;
    
    ns.set('app.core.MetadataBag', MetadataBag);
    
})();