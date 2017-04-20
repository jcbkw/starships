/* global ns */

(function () {
    
    var api                         = {
        
        /**
         * <p>Finds the indices where the given search term was found in the
         * given array and returns an array of indices.</p>
         * 
         * @memberOf arrays
         * @name indicesOf
         * @function
         * 
         * @param {Array} array
         * @param {*} search
         * 
         * @return {Number[]}
         */
        indicesOf: function (array, search) {

            var result                              = [],
                count                               = array.length,
                i;

            for (i = 0; i < count; i += 1) {

                if (search === array[i]) {

                    result.push(i);

                }

            }

            return result;

        },
                
        /**
         * <p>Count the number of times the given search term was found in the
         * given array and returns that number.</p>
         * 
         * <p>Note that this produces the same result as <code>array.indicesOf(array, search).length</code>,
         * but in situations where you only need the count but not the indices, this method should be
         * use, as it's implementation is more straigth forward.</p>
         * 
         * @memberOf arrays
         * @name occurencesOf
         * @function
         * 
         * @see arrays#indicesOf
         * 
         * @param {Array} array
         * @param {*} search
         * 
         * @return {Number}
         */
        occurencesOf: function (array, search) {

            var total                               = 0,
                count                               = array.length,
                i;

            for (i = 0; i < count; i += 1) {

                if (search === array[i]) {

                    ++total;

                }

            }

            return total;

        },
        
        /**
         * Casts an object (usually an array like object) to an array.
         * 
         * @memberOf arrays
         * @name toArray
         * @function
         * 
         * @param {Object} value
         * @param {Number} [startIndex=0]
         * 
         * @returns {Array}
         */
        toArray: function (value, startIndex) {
            
            return Array.prototype.slice.call(value, startIndex || 0);
            
        },
                
        /**
         * The <code>filter</code> method calls a the <code>callback</code> function on each element od the array,
         * and builds a new array with the values for which the <code>callback</code> returned <code>true</code>.
         * 
         * @memberOf arrays
         * @name filter
         * @function
         * 
         * @param {Array} array     The array.
         * @param {Function} fn     The callback.
         * @param {*} [thisArg]     Value to pass as context when invoking the callback.
         * 
         * @returns {Array}
         */
        filter: function (array, fn, thisArg) {
            
            var count                               = array.length >>> 0,
                result                              = [],
                value,
                i;

            for (i = 0; i < count; i += 1) {

                value                               = array[i];

                if (fn.call(thisArg, value, i, array) === true) {

                    result.push(value);

                }

            }

            return result;

        },
                
        /**
         * The <code>find</code> method returns the value of the first element in the Array
         * for which the <code>callback</code> returned <code>true</code>. Otherwise <code>undefined</code> is returned.
         * 
         * @memberOf arrays
         * @name find
         * @function
         * 
         * @param {Array} array     The array.
         * @param {Function} fn     The callback.
         * @param {*} [thisArg]     Value to pass as context when invoking the callback.
         * 
         * @returns {*|undefined}
         */
        find: function (array, fn, thisArg) {
            
            var count                               = array.length,
                unset,
                value,
                i;

            for (i = 0; i < count; i += 1) {

                value                               = array[i];

                if (fn.call(thisArg, value) === true) {

                    return value;

                }

            }

            return unset;

        },
                
        /**
         * The <code>findIndex</code> method returns the index of the first element in the Array
         * for which the <code>callback</code> returned <code>true</code>. Otherwise <code>-1</code> is returned.
         * 
         * @memberOf arrays
         * @name findIndex
         * @function
         * 
         * @param {Array} array     The array.
         * @param {Function} fn     The callback.
         * @param {*} [thisArg]     Value to pass as context when invoking the callback.
         * 
         * @returns {Number}
         */
        findIndex: function (array, fn, thisArg) {
            
            var count                               = array.length,
                i;

            for (i = 0; i < count; i += 1) {

                if (fn.call(thisArg, array[i]) === true) {

                    return i;

                }

            }

            return -1;

        },
                
        /**
         * <p>Modifies the values of an array with the results of calling the provided 
         * callback function on every element of that array.</p>
         * 
         * @memberOf arrays
         * @function
         * @name walk
         * 
         * @param {Array} array             The array whose elements are to be modified.
         * 
         * @param {Function} callback       A function signed 
         *                                  <code>function ({*} currentValue, {Number} currentIndex, {Array} array)</code>
         *                                  to call passing it each of the array's element and replace
         *                                  that element by the output of this callback.
         *                                  
         * @param {*} [thisArg]             The desired value of <code>this</code> when calling the callback.
         *                                  If omitted, it <code>undefined</code> will be passed as 
         *                                  <code>this</code> value to the callback. 
         *                                  
         * @returns {Array}                 The provided array.
         */
        walk: function (array, callback, thisArg) {
           
            var count                               = array.length,
                i;

            for (i = 0; i < count; i += 1) {
                    
                array[i]                            = callback.call(thisArg, array[i], i, array);
                
            }
            
            return array;
    
        },
                
        /**
         * <p>Creates a new array with the results of calling the provided
         * callback on every element of the array passed as argument.</p>
         * 
         * @memberOf arrays
         * @function
         * @name map
         * 
         * @param {Array} array             The array to iterate over.
         * 
         * @param {Function} callback       A function signed 
         *                                  <code>function ({*} currentValue, {Number} currentIndex, {Array} array)</code>
         *                                  to call passing it each of the array's element. The output of this callback
         *                                  is used as the element at the coresponding index in the newly created array.
         *                                  
         * @param {*} [thisArg]             The desired value of <code>this</code> when calling the callback.
         *                                  If omitted, it <code>undefined</code> will be passed as 
         *                                  <code>this</code> value to the callback. 
         *                                  
         * @returns {Array}                 The newly created array.
         */
        map: function (array, callback, thisArg) {
            
            var count                               = array.length,
                newArray                            = new Array(count),
                i;

            for (i = 0; i < count; i += 1) {
                    
                newArray[i]                         = callback.call(thisArg, array[i], i, array);
                
            }
            
            return newArray;
    
        },
        
        /**
         * <p>Inserts all the elements of an array into a source array
         * starting at the provided insertion index.</p>
         * 
         * @memberOf arrays
         * @function
         * @name insert
         * 
         * @param {Array} sourceArray       The source array. New elements will be added to that array.
         * 
         * @param {Number} insertionIndex   <p>As of which element of the <code>sourceArray</code> shall 
         *                                  all the elements of the <code>arrayToInsert</code> be inserted.</p>
         *                                  
         *                                  <p>If it is less than or equal to zero, the <code>arrayToInsert</code>
         *                                  will be prepended to the <code>sourceArray</code>.</p>
         *                                  
         *                                  <p>If it is greather than <code>sourceArray</code>'s length, 
         *                                  the <code>arrayToInsert</code> will be appended to the 
         *                                  <code>sourceArray</code>.</p>
         *                                  
         * @param {Array} arrayToInsert     All the elements of this array will be inserted into the  
         *                                  <code>sourceArray</code> starting from the <code>insertionIndex</code>.
         *                                  
         * @returns {Array}                 The <code>sourceArray</code>.
         */
        insert: function (sourceArray, insertionIndex, arrayToInsert) {
            
            sourceArray.splice.apply(sourceArray, ([insertionIndex, 0]).concat(arrayToInsert));
            
            return sourceArray;
            
        },
        
        /**
         * <p>Iterate over the elements of the array passed as argument and calls the
         * provided callback upon each element.</p>
         * 
         * @memberOf arrays
         * @function
         * @name each
         * 
         * @param {Object} array            The object array elements are to be iterated over.
         * 
         * @param {Function} callback       A function signed 
         *                                  <code>function ({*} currentValue, {Number} currentIndex, {Array} array)</code>
         *                                  to call passing it each of the array's element index and value. You may
         *                                  return <code>false</code> to break out of the loop.
         *                                  
         * @param {*} [thisArg]             The desired value of <code>this</code> when calling the callback.
         *                                  If omitted, it <code>undefined</code> will be passed as 
         *                                  <code>this</code> value to the callback. 
         *                                  
         * @returns {Array}                 The provided array.
         */
        each: function (array, callback, thisArg) {
            
            var count               = array.length,
                i;
        
            // not using forEach because Array-like objects are allowed
            for (i = 0; i < count; i += 1) {
                    
                if (callback.call(thisArg, array[i], i, array) === false) {

                    break;

                }
                
            }
            
            return array;
    
        },
        
        /**
         * <p>Allows to asynchonously loop of the provided array.</p>
         * 
         * <p>Reads one element of the array passed as argument and calls
         * the provided onStep callback passing it that element.</p>
         * 
         * <p>The callback is also passed a <code>step</code> function which it can
         * can when this function is to read the next element (if any) and recall
         * the callback... and so on.</p>
         * 
         * @memberOf arrays
         * @function
         * @name each
         * 
         * @param {Object} array            The object array elements are to be iterated over.
         * 
         * @param {Function} onStep         A function signed 
         *                                  <code>function ({Function} next, {*} currentValue, {Number} currentIndex, {Array} array)</code>
         *                                  to call passing it each of the array's element index and value. You may
         *                                  pass <code>false</code> to this function in order to break out of the loop.
         *                                  
         * @param {Function} [onComplete]   A function signed 
         *                                  <code>function ({*} currentValue, {Number} currentIndex, {Array} array)</code>
         *                                  to call when the loop has completed.
         *                                  
         * @param {*} [thisArg]             The desired value of <code>this</code> when calling the callback.
         *                                  If omitted, it <code>undefined</code> will be passed as 
         *                                  <code>this</code> value to the callback. 
         *                                  
         * @returns {Array}                 The provided array.
         */
        loop: function (array, onStep, onComplete, thisArg) {
        
            var length                  = array.length,
                cursor                  = -1;    

            function next (step) {

                if (step !== false && ++cursor < length) {

                    onStep.call(thisArg, next, array[cursor], cursor, array);

                }
                else {
                    
                    onComplete && onComplete.call(thisArg, cursor, array);

                }

            }

            next();

        },
        
        /**
         * Converts an array like object to a real array.
         * 
         * @param {Object} arrayLikeObject
         * @param {Number} [startingFrom=0]
         * @returns {Array}
         */
        cast: function (arrayLikeObject, startingFrom) {
            
            return Array.prototype.slice.call(arrayLikeObject, startingFrom > 0 ? startingFrom : 0);
            
        },
        
        /**
         * Scrambles the order of the elements of this array.
         * 
         * @param {Array} array
         * @returns {Array}
         */
        shuffle: function (array) {
            
            for (var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);

            return array;

        },
        
        /**
         * Creates a array with a range of numbers or letters.
         * 
         * @see http://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-an-array-based-on-suppl
         * @param {Number|String} start
         * @param {Number|String} end
         * @param {Number} [step]
         * @returns Array
         * 
         * @example
         * arrays.range(0,10);          // [0,1,2,3,4,5,6,7,8,9,10]
         * arrays.range(-100,100,20);   // [-100,-80,-60,-40,-20,0,20,40,60,80,100]
         * arrays.range('A','F');       // ['A','B','C','D','E','F']
         * arrays.range('m','r');       // ['m','n','o','p','q','r']
         */
        range: function (start, end, step) {
            
            var range               = [],
                typeofEnd           = typeof end,
                typeofStart         = typeof start;

            if (step === 0) {
                
                die("Step cannot be zero.");
                
            }

            if (typeofStart === "undefined" || typeofEnd === "undefined") {
                
                die("Must pass start and end arguments.");
                
            }
            else if (typeofStart !== typeofEnd) {
                
                die("Start and end arguments must be of same type.");
                
            }

            if (typeof step === "undefined") {
                
                step                = 1;
                
            }

            if (end < start) {
                
                step                = -step;
                
            }

            if (typeofStart === "number") {

                while (step > 0 ? end >= start : end <= start) {
                    
                    range.push(start);
                    
                    start          += step;
                    
                }

            }
            else if (typeofStart === "string") {

                if (start.length !== 1 || end.length !== 1) {
                    
                    die("Only strings with one character are supported.");
                    
                }

                start               = start.charCodeAt(0);
                end                 = end.charCodeAt(0);

                while (step > 0 ? end >= start : end <= start) {
                    
                    range.push(String.fromCharCode(start));
                    
                    start          += step;
                    
                }

            }
            else {
                
                die("Only string and number types are supported");
                
            }

            return range;

        },
        
        /**
         * Returns the first element of that array.
         * 
         * @param {*[]} array
         * @returns {*}
         */
        first: function (array) {
            
            return array[0];
            
        },
        
        /**
         * Returns the last element of that array.
         * 
         * @param {*[]} array
         * @returns {*}
         */
        last: function (array) {
            
            return array[array.length - 1];
            
        },
        
        /**
         * Returns a random element form the array.
         * 
         * @param {*[]} array
         * @returns {*}
         */
        any: function (array) {
            
            return array[Math.round(Math.random() * (array.length - 1))];
            
        },
        
        /**
         * Removes a random element from the array
         * and returns that element.
         * 
         * @param {*[]} array
         * @returns {*}
         */
        mug: function (array) {
            
            var index               = Math.round(Math.random() * (array.length - 1)),
                value               = array[index];
        
            array.splice(index, 1);
            
            return value;
            
        },
        
        /**
         * Removes an element from the provided array
         * and returns the array.
         * 
         * @param {*[]} array
         * @param {*} value
         * @returns {Array}
         */
        remove: function (array, value) {
            
            var index               = array.indexOf(value);
            
            if (index !== -1) {
                
                array.splice(index, 1);
                
            }
            
            return array;
            
        },
        
        /**
         * Pushes the provided value in the array
         * if it is found in that array.
         * 
         * @param {*[]} array
         * @param {*} value
         * @returns {Boolean}
         */
        put: function (array, value) {
            
            var result = array.indexOf(value) === -1;
            
            if (result) {
                
                array.push(value);
                
            }
            
            return result;
            
        },
        
        /**
         * Creates a new array all the array elements from the profided array
         * recursively extended in order to return a (larger) flat array.
         * 
         * @param {*[]} array
         * @returns {Array}
         */
        flatten: function (array) {
            
            var result              = [];
            
            api.each(array, function (item) {
                
                if (Array.isArray(item)) {
                    
                    this.push.apply(this, api.flatten(item));
                    
                }
                else {
                    
                    this.push(item);
                    
                }
                
            }, result);
            
            return result;
            
        },
        
        /**
         * Create a fast JS array with a fixed initial size.
         * 
         * @param {Number} [length] The size of the array. Pass NaN
         *                          to resolve dynamically from the
         *                          number of argument given.
         *                          
         * @param {*} [...] Elements to add to the array
         * 
         * @returns {Array}
         */
        fixed: function (length) {
            
            var count               = arguments.length,
                array               = new Array(isNaN(length) ? count - 1 : length),
                i;
        
            for (i = 1; i < count; i += 1) {
                
                array[i - 1]        = arguments[i];
                
            }
            
            return array;
            
        }
        
    };
    
    function die (message) {
        
        throw new Error(message);
        
    }
    
    ns.set('app.tk.arrays', api);
    
})();