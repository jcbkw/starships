/* global app, ns */

(function () {
    
    var MAX_SAFE_VALUE = Math.pow(2, 31) - 1,
        
        /**
         * @type app.tk.ints
         */
        api  = {
        
        /**
         * <p>A property holding the 2^31 -1.</p>
         * <p>Can be safely used as a max int value in most common languages.</p>
         * <p>Note that this is different than JavaScript's Number.MAX_SAFE_VALUE
         * which is 2^53 -1.</p>
         * 
         * @type Number
         */
        MAX_SAFE_VALUE:  MAX_SAFE_VALUE,
        
        /**
         * <p>A property holding the -2^31 -1.</p>
         * <p>Can be safely used as a min int value in most common languages.</p>
         * <p>Note that this is different than JavaScript's Number.MIN_SAFE_VALUE
         * which is -2^53 -1.</p>
         * 
         * @type Number
         */
        MIN_SAFE_VALUE: -MAX_SAFE_VALUE,
        
        /**
         * Returns a random integer between min (included) and max (included)
         * @param {Number} min
         * @param {Number} max
         * @returns {Number}
         */
        getRandomInt: function (min, max) {

            return Math.floor(Math.random() * (max - min + 1)) + min;

        }
        
    };
    
    ns.set('app.tk.ints', api);
    
})();