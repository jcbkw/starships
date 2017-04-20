/* global app, ns */

(function () {
    
    var api  = {
        
        /**
         * Rounds the number with respect to the
         * provided maximum number of decimals.
         * 
         * @param {Number} number
         * @param {Number} maxDecimal
         * 
         * @returns {Number}
         */
        round: function (number, maxDecimal) {
            
            return Number(number.toFixed(maxDecimal + 1));
            
        }
        
    };
    
    ns.set('app.tk.floats', api);
    
})();