(function () {
    
    /**
     * @fileOverview    <p>Creates a top-level <code>ns</code> object that contains
     *                  a set of methods which help working with deep object names
     *                  in JavaScript that are used to simulate namespacing.</p>
     * 
     * @todo            Should throw errors instead of strings but should account for
     *                  Rhino versions that have issues throwing Error instances.
     * 
     * @todo            Add an "isSet" method that checks if a property exits (not just
     *                  if it's equal to undefined)
     * 
     * @todo            Methods whose signature ends with "root, separator" parameters
     *                  should take a {Object} option parameter instead to allow named
     *                  paramters instead of sequential paramters. 
     * 
     * @author Edouard Dorval <edouarddorval@gmail.com>
     */
    "use strict";
    
    /**
     * This is the object where you want the <code>ns</code> instance
     * to originally attach itself.
     * 
     * @ignore
     * @type {Window|GlobalObject}
     */
    var self                                            = this,
    
        /**
         * This should always hold a reference to the global object. It
         * may sometimes be pointing to the same variable as <code>self</code> but
         * that's only coincidental.
         * 
         * @ignore
         * @type {Window|GlobalObject}
         */
        global                                          = this,
        
        /**
         * The default propertyName of the object.
         * 
         * @ignore
         * @type {String}
         */
        name                                            = "ns",
        
        /**
         * The String that should be used as default namespace separator.
         * It is usually a single character, but that does not have to be
         * the case.
         * 
         * @ignore
         * @type String
         */
        pathSeparator                                   = ".",
        
        /** 
         * Used to match property names within property paths.
         */        
        rePropName                                      = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g,
        
        /**
         *  Used to match backslashes in property paths. 
         */
        reEscapeChar                                    = /\\(\\)?/g,
        
        /**
         * Tells whether the value pass as argument is an Array.
         * 
         * @ignore
         * @function
         * @returns {Boolean}
         */
        isArray                                         = (function () { 
            
            if (Array.isArray) {
                
                return Array.isArray;
                
            }
            
            return function (value) {

                return Object.prototype.toString.call(value) === "[object Array]";
                
            };

        })(),
        
        /**
         * Converts `string` to a property path array.
         *
         * @private
         * @param {string} string The string to convert.
         * @returns {Array} Returns the property path array.
         */
        stringToPath                                    = function (string) {
            
            var result                                  = [];
            
            string.replace(rePropName, function (match, number, quote, string) {
                
                result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
                
            });
            
            return result;
        },
        
        /**
         * The base implementation of `_.get` without support for default values.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {Array|string} path The path of the property to get.
         * @returns {*} Returns the resolved value.
         */
        baseGet                                         = function (object, path) {
            
            var index                                   = 0,
                parts                                   = stringToPath(path),
                length                                  = parts.length;

            while (object !== null && object !== void 0 && index < length) {
                
                object                                  = object[parts[index++]];
              
            }
            
            return (index && index === length) ? object : void 0;
            
        },
    
        api                                             = {
            
            /**
             * Merges any readable property owned (not part of its prototype)
             * by the subsequent object passed as argument to the first object
             * passed as argument.
             * 
             * @name merge
             * @memberOf ns
             * @function
             * @param {Object} [base]   The first object the add properties to. It must not
             *                          be a sealed or frozen object.
             *                          
             * @param {Object} [...]    Subsequent objects to read properties from.
             * 
             * @throws {String}         An Exception will be thrown if any of the
             *                          subsequent object has an own property that is
             *                          iterable but not readable. Normally, this should
             *                          not be possible, but it seems that some implementations
             *                          of Rhino will showcase that rather particular behavior.
             * 
             * @returns {Object}        The first object, loaded with new properties.
             * 
             * @example
             * 
             * var a = {"one" : 1, "two"   : 5};
             * var b = {"two" : 2, "three" : 3, "four": 4};
             * 
             * ns.merge(a, b);
             * 
             * console.dir(a); // prints {"one": 1, "two": 2, "three": 3, "four": 4};
             */
            merge: function (base) {

                var count                               = arguments.length,
                    arg, 
                    key, 
                    i;

                for (i = 1; i < count; i += 1) {

                    for (key in arguments[i]) {

                        arg                             = arguments[i];

                        if (Object.prototype.hasOwnProperty.call(arg, key)) {

                            base[key]                   = arg[key];

                        }

                    }

                }

                return base;

            },
            
            /**
             * Sets or Gets a non-empty string used as namespace identifier
             * separator.
             * 
             * @name separator
             * @type function
             * @memberOf ns
             * 
             * @param {String} [value]      The non-empty string to be used as namespace identifier
             *                              separator.
             *                              
             * @returns {String|ns}         When used as a setter, the <code>ns</code> instance
             *                              is returned. When used as a setter, the value being
             *                              used as namespace identifier separator is returned.
             *                              
             * @example
             * 
             * var Map      = ns.separator("/").get("google/maps/Map");
             * var LatLng   = ns.get("google/maps/LatLng"); // "/" has already been set as namespace identifier separator.
             */
            separator: function (value) {
        
                if (arguments.length > 0) {
                    
                    if (typeof value === "string" && value.length > 0) {
                        
                        pathSeparator                   = value;
                        
                    }
                    
                    return api;
                    
                }
                else {
                    
                    return pathSeparator;
                    
                }
        
            },
            
            /**
             * <p>Get/Set the object that should be used as root
             * object, in other words, the object into which
             * the namespaces are added by default, if not explicitely
             * given when creating a namespace.</p>
             * 
             * <p>The default value is the global object.</p>
             * 
             * <p>Using this method as a getter is equivalent to using
             * the {@link rt} property.</p>
             * 
             * @name root
             * @type function
             * @memberOf ns 
             * 
             * @param {*} value
             * @returns {*}
             * 
             * @example
             * 
             * var app = {};
             * 
             * ns.base(app);
             * 
             * ns.set("utils.methods.sayHi", function () { alert("Hi!"); });
             * 
             * app.utils.methods.sayHi(); // Alerts "Hi!"
             */
            root: function (value) {
                
                if (arguments.length > 0) {

                    global                              = value;
                    api.rt                              = global;
                    
                    return api;

                }
                else {

                    return global;

                }
                
            },
            
            /**
             * <p>A property that serves as a shortcut to
             * <bold>get</bold> the object is being used as root.</p>
             * 
             * <p>This property must not be used as a setter. Setting 
             * this property to something else <bold>will not</bold> 
             * result in a change of the root object.</p>
             * 
             * <p>To change ns.js' root object, use the {@link root} method.</p>
             * 
             * @name rt
             * @memberOf ns
             * @property {*} rt         <p>A property that serves as a shortcut to
             *                          <bold>get</bold> the object is being used as root.</p>
             */
            rt: global,
            
            /**
             * Release ns.js' control of the <code>ns</code> global property,
             * and restore that property (ns) to it's orginal value (if any).
             * 
             * @param {Object} [value]  If an object is passed, ns.js will attemp
             *                          to set itself as the <code>ns</code> of
             *                          that object. But release that a call to
             *                          {@link #noConflict} will NOT undo such
             *                          attachement.
             * 
             * @returns {ns}            A reference to the <code>ns</code> object</code>
             * 
             * @example
             * 
             * // Example 1
             * // ns.js is no longer at the "ns" global property and CANNOT be reached anywhere else.
             * ns.noConflict();
             * 
             * 
             * // Example 2
             * // ns.js is no longer at the "ns" global property but a reference was held in the "nsBuilder" variable.
             * var nsBuilder = ns.noConflict();
             * // nsBuilder.set(...);
             * 
             * 
             * // Example 2
             * // ns.js is no longer at the "ns" global property but created a property names "ns"
             * in the variable app and set itself there.
             * var app = {};
             * ns.noConflict(app);
             * // app.ns.set(...);
             */
            noConflict: function (value) {
                
                if (self[name] === api) {
                    
                    if (conflicted) {
                        
                        self[name]                      = noConflict;
                        
                    }
                    else {
                        
                        try {
                            
                            delete self[name];
                            
                        }
                        catch (e) {
                            
                            self[name]                  = noConflict; // undefined
                            
                        }
                        
                    }
                    
                }
                
                if (typeof value !== "undefined" && value !== null) {
                    
                    value[name]                         = api;
                    
                }
                
                return api;
        
            },
            
            /**
             * Returns the object found at the specified namespace.
             * 
             * @name get
             * @memberOf ns
             * @function
             * 
             * @param {String} path                     The namespace as a <code>String</code>. (usually separated by dots)
             * @param {Object} [root=global]            The base object to look for that namespace into.
             * @param {String|Boolean} [separator="."]  <p>The string with which the parts of this namespace are separated.</p>
             *                                          <p>If <code>true</code> is passed, the global separator set by
             *                                          <code>separator</code> will be used.</p>
             * 
             * @throws {String}                         <p>An Exception will be thrown if an invalid namespace is passed.</p>
             *                                          <p>(e.g. <code>ns.get("8.().p")</code>) will definitely throw an Exception.</p>
             *                                  
             * @returns {*}                             Whatever was found as the specified namespace or 
             *                                          <code>undefined</code> if nothing was found.
             *                                  
             * @example
             * 
             * var Map      = ns.get("google.maps.Map");
             * var LatLng   = ns.get("google/maps/LatLng", this, "/"); // where 'this' is an instance of the global object.
             * 
             * if (!ns.get("mycontent.myobject.MyClass")) {
             *  
             *      // include or require it
             * 
             * }
             */
            get: function (path, root, separator) {
                
                var separate                            = (typeof separator === "string" && separator.length > 0) || separator === true,
                    result;
                
                if (separate) {

                    if (path.indexOf('"') !== -1) {
                                                    // Preferred over String.prototype.replace
                        path                            = path.split('"').join('\\"');

                    }

                    path                                = '["'
                                                        + path.split(separator === true ? pathSeparator : separator).join('"]["')
                                                        + '"]';

                }
                    
                try {
                    
                    result                          = baseGet(root || global, path);

                }
                catch (e) {

                    // todo if strict throw e
                    throw   "'"
                          + path
                          + " is not a valid property identifier!";

                }

                return result;

            },
            
            /**
             * <p>Add the given <code>value</code> to the specified namespace.</p>
             * <p>Only non sealed and non frozen JavaScript plain objects should be use for namespacing.</p>
             * <p><code>Array</code> and <code>Function</code> instances are <strong>tolerated</strong> because of
             * their direct inheritance and hash similarities with <code>Object.prototype</code> but are 
             * <strong>strongly discouraged</strong>.</p>
             * <p>If an object was already found at the specified namespace, a {@link ns#merge} will be attempted.</p>
             * 
             * @name set
             * @memberOf ns
             * @function
             * 
             * @param {String|String[]} path    The namespace as a <code>String</code> (usually separated by dots) or
             *                                  the namespace names already splitted and given as a <code>String[]</code>.
             *                                  
             * @param {*} [value]               The value to set at or merge with the object found at the given namespace.
             * 
             * @param {Object} [root]           The base object to build that namespace into.
             * 
             * @param {String} [separator="."]  The string with which the parts of this namespace are separated.
             * 
             * @throws {String}                 <p>An Exception will be thrown if an invalid namespace is passed.</p>
             *                                  <p>(e.g. <code>ns.get("8.().p")</code>) will definitely throw an Exception.</p>
             *                                  
             * @throws {String}                 An Exception will be also be thrown in case of an unsuccessful {@link ns#merge}
             *                                  <p>(e.g. <code>ns.set("a.b.c", "Hi"); ns.set("a.b.c", function callback () {});</code>) 
             *                                  will definitely throw an Exception because the properties of <code>callback</code> 
             *                                  will be attempted to merged as properties of <code>"Hi"</code>.</p>
             *                                  
             * @returns {*}                     Whatever was passed at <code>value</code> in case of a successful build.
             *                                  
             * @example
             * 
             * ns.set("utils", {one: 1});
             * ns.set("utils.array", {two: 2});
             * ns.set("utils", {three: 3});
             * ns.set("array/helpers", {four: 4}, this, "/"); // where 'this' is an instance of the global object.
             */
            set: function (path, value, root, separator) {

                if (path) {

                    var count                           = arguments.length;

                    if (!isArray(path)) {

                        if (count < 4) {

                            separator                   = pathSeparator;

                        }

                        path                            = path.split(separator);

                    }

                    if (count < 3) {

                        root                            = global;

                    }

                    var size                            = path.length,
                        part,
                        item,
                        type;

                    while (size !== 0) {

                        part                            = path.shift();
                        type                            = typeof root;

                        if (root !== null && (type === "object" || type === "function")) {

                            type                        = typeof part;

                            if (part && type === "string") {

                                if (false === (part in root)) {

                                    item                = 
                                    root[part]          = size === 1 
                                                        ? value
                                                        : {};

                                }
                                else {

                                    if (size === 1) {

                                        type            = typeof value;

                                        if (value && (type === "object" || type === "function")) {

                                            if (root[part] === value) {

                                                item    = value;

                                            }
                                            else {

                                                item    = api.merge(root[part], value);

                                            }

                                        }
                                        else {

                                            throw   "Cannot merge the existing property '" 
                                                   + part 
                                                   + "' with a" 
                                                   + (
                                                        type === "undefined"

                                                            ? "n " 
                                                            : " "

                                                     )
                                                   + (
                                                        value === null

                                                            ? "null" 
                                                            : type

                                                    )
                                                  + " value!";

                                        }

                                    }
                                    else {

                                        item            = root[part];

                                    }

                                }

                            }
                            else {

                                throw   "The property names must be valid JavaScript property names. A" 
                                      + (
                                            type === "undefined"

                                                ? "n " 
                                                : " "
                                        ) 
                                      + (
                                            type === "string"

                                                ? "n invalid string" 
                                                : (
                                                        part === null

                                                            ? "null value" 
                                                            : type

                                                  )

                                        ) 
                                        + " was given instead!";

                            }

                            root                        = item;

                        }
                        else {

                            throw   "Cannot add property '" 
                                  + part 
                                  + "' to a" 
                                  + (
                                        type === "undefined"

                                        ? "n "
                                        : " "
                                    )
                                  + (
                                        root === null

                                        ? "null" 
                                        : type

                                    )
                                  + " value!";

                        }

                        --size;

                    }

                    return item;

                }

            }

        },
        
        /**
         * Whether the was a property of named <code>ns</code> in
         * or visible through the global object before the module's
         * execution.
         * 
         * @ignore
         * @type {Boolean}
         */
        conflicted                                      = (name in self),
        
        /**
         * The value (if any) previous found at the global object's
         * <code>ns</code> property.
         * 
         * @ignore
         * @type {*}
         */
        noConflict;
        
        if (conflicted) {
            
            noConflict                                  = self[name];
            
        }

    // Export api
    if (!self[name]) {
        
        self[name]                                      = api;
        
    }

// ns.js
}).call(window);