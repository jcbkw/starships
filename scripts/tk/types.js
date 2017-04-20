/* global app, ns */

(function () {
    
    var api  = {
        
        /**
         * Tells whether provided object is
         * and instance of any of the given types
         * 
         * @param {*} object
         * @param {Function[]} typeset
         * 
         * @returns {Boolean}
         */
        matches: function (object, typeset) {
            
            var count,
                i;
            
            if (object) {
                
                for (i = 0, count = typeset.length; i < count; i += 1) {
                    
                    if (object instanceof typeset[i]) {
                        
                        return true;
                        
                    }
                    
                }
                
            }
            
            return false;
            
        }
        
    };
    
    ns.set('app.tk.types', api);
    
})();