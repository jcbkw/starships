/* global app, ns */

(function () {
    
    /**
     * @lends app.classes.hid.game.Joystick
     */
    var api = {constructor: Joystick};
    
    function Joystick () {
        
        createHandlers(this);
        
        document.addEventListener("keydown", this.handlers.onKeydown, false);
        document.addEventListener("keyup",   this.handlers.onKeyup,   false);
        
        this.directions = [];
        this.buttonCallbacks = [];
        
    }
    
    /**
     * The buttons supported by this joystick
     * 
     * @type Object
     */
    Joystick.buttons = {

        ACTION  : 'action',
        START   : 'start'

    };
    
    /**
     * An enumeration of the keyboard arrow key codes
     * for reference.
     * 
     * @private
     * 
     * @type Object
     */
    var keymap = {

        left_arrow  : 37,
        up_arrow    : 38,
        right_arrow : 39,
        down_arrow  : 40,
        spacebar    : 32,
        enter       : 13

    };
        
    /**
     * Contains the directional buttons
     * currently pressed by the end user.
     * 
     * @type String[]
     */
    api.directions = null;
        
    /**
     * Contains this object's event handlers.
     * 
     * @type {Object}
     */
    api.handlers = {
            
        onKeyup: null,
        onKeydown: null

    };
        
    /**
     * Contains the functions to be called 
     * when buttons are pressed.
     * 
     * @type String[]
     */
    api.buttonCallbacks = null;

    /**
     * The maximum number of directional buttons
     * that can be recorded in the app.joystic.direction
     * array.
     * 
     * @type Number
     */
    api.maxDirections = 2;

    /**
     * Takes a callback function to be called when
     * an action button is pressed.
     * 
     * @param {Function} callback
     */
    api.onButtonPressed = function (callback) {

        var index = this.buttonCallbacks.indexOf(callback);

        if (index === -1) {

            this.buttonCallbacks.push(callback);

        }

    };

    /**
     * Removes a registered button press callback function.
     * 
     * @param {Function} callback
     */
    api.offButtonPressed = function (callback) {

        var index = this.buttonCallbacks.indexOf(callback);

        if (index !== -1) {

            this.buttonCallbacks.splice(index, 1);

        }

    };

    function createHandlers (joystick) {
        
        /**
         * Updates the Joystick.directions array on keydown
         * to add the newly pressed direction.
         * 
         * @param {Event} event 
         */
        joystick.handlers.onKeydown = function (event) {

            event.preventDefault();

            switch (event.which) {

                case keymap.left_arrow : 

                    addDirection(joystick, app.classes.geom.Direction.LEFT);

                break;

                case keymap.right_arrow : 

                    addDirection(joystick, app.classes.geom.Direction.RIGHT);

                break;  

                case keymap.up_arrow : 

                    addDirection(joystick, app.classes.geom.Direction.UP);

                break;

                case keymap.down_arrow : 

                    addDirection(joystick, app.classes.geom.Direction.DOWN);

                break;             

            }

        };
        
        /**
         * Updates the Joystick.directions array on keydown
         * to remove the newly released direction.
         * 
         * @param {Event} event 
         */
        joystick.handlers.onKeyup = function (event) {

            switch (event.which) {

               case keymap.left_arrow : 

                   removeDirection(joystick, app.classes.geom.Direction.LEFT);

               break;

               case keymap.right_arrow : 

                   removeDirection(joystick, app.classes.geom.Direction.RIGHT);

               break;  

               case keymap.up_arrow : 

                   removeDirection(joystick, app.classes.geom.Direction.UP);

               break;

               case keymap.down_arrow : 

                   removeDirection(joystick, app.classes.geom.Direction.DOWN);

               break;

               case keymap.enter : 
               case keymap.spacebar : 

                   broadcastKeyPress(joystick, event.which === keymap.enter ? Joystick.buttons.START : Joystick.buttons.ACTION);

               break;             

           }

        };            
        
    }

    /**
     * Adds the provided direction to the Joystick.directions
     * array if the provided direction didn't already figure in 
     * the array.
     * 
     * @private
     * 
     * @param {app.classes.game.Jostick} joystick
     * @param {String} direction 
     */
    function addDirection (joystick, direction) {

        if (joystick.directions.indexOf(direction) === -1 
        &&  joystick.directions.length < joystick.maxDirections) {

            joystick.directions.push(direction);

        }

    }

    /**
     * Removes the provided direction from the this.directions
     * array if the provided direction figured in the array.
     * 
     * @private
     * 
     * @param {app.classes.game.Jostick} joystick
     * @param {String} direction 
     */
    function removeDirection (joystick, direction) {

        var index = joystick.directions.indexOf(direction);

        if (index !== -1) {

            joystick.directions.splice(index, 1);

        }

    }

    /**
     * Calls all the registered button 
     * press callback functions.
     * 
     * @private
     * @param {app.classes.game.Jostick} joystick
     * @param {String} button 
     */
    function broadcastKeyPress (joystick, button) {

        for (var i = 0, count = joystick.buttonCallbacks.length, fn; i < count; i += 1) {

            fn = joystick.buttonCallbacks[i];

            fn && fn(button);

        }

    }
    
    Joystick.prototype = api;
    
    ns.set('app.classes.hid.game.Joystick', Joystick);

})();