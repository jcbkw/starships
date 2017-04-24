/* global app, ns */

(function () {
           
    var queuedForTickMaxLength = 1024,
        queuedForTickCursor = -1,
        queuedForTick = new Array(queuedForTickMaxLength),
        api = {};
    
    /**
     * Tells whether the game is paused.
     * 
     * @type Boolean
     */
    api.paused = false;
    
    /**
     * Whethe the app is in debug mode;
     * 
     * @type Boolean
     */
    api.debug = true;

    /**
     * Calls the provided callback function on each tick.
     * 
     * @param {Function} callback The function to be called.
     */
    api.onTick = function (callback) {
        
        cleanseQueue();
        queuedForTick[++queuedForTickCursor] = callback;
        
    };
    
    /**
     * Calls the provided callback function once, on
     * the next tick only.
     * 
     * @param {Function} callback The function to be called.
     */
    api.nextTick = function (callback) {
        
        function oneTimer () {
           
            callback && callback();
            app.unTick(oneTimer);
            
        }
        
        api.onTick(oneTimer);
        
    };

    /**
     * Removes the provided callback function from the tick queue.
     * 
     * @param {Function} callback The function to be removed from the tick queue.
     */
    api.unTick = function (callback) {

        var index = queuedForTick.indexOf(callback);

        if (index !== -1) {

            queuedForTick[index] = null;

        }

    };
    
    /**
     * Throws the provided error.
     * 
     * @param {Error} error
     */
    api.die = function (error) {
        
        throw error;
        
    };
    
    api.log = function () {
        
        api.debug && console.log.apply(console, Array.prototype.slice.call(arguments, 0));
        
    };

    /**
     * Initializes the main objects and
     * starts the game.
     * 
     * @private
     */
    function init () {
        
        app.viewport = new app.classes.game.Viewport(document.body, 480, 270);
        app.stage    = new app.classes.game.Stage(0, 0, app.viewport.width, app.viewport.height);
        
        app.viewport.addChild(app.stage);
        app.stage.boundToContainer();
       
            
        var galaxy = new app.classes.game.graphics.Galaxy(0, 0, app.viewport.width, app.viewport.height);
            
        app.stage.addChild(galaxy);
        galaxy.render(30);
        
       
        app.player = new app.classes.game.entities.characters.Player(0, 0, 16, 16);
        
        app.player.stepSize = 3;
        app.player.group.add('hero');
        app.stage.addChild(app.player);
        app.player.setBounds(new app.classes.geom.RectangularBounds(/*top*/  app.viewport.height  - (app.player.height * 2),
                                                                    /*right*/ app.viewport.width  - app.player.width, 
                                                                    /*bottom*/app.viewport.height - app.player.height, 
                                                                    /*left*/ 0));
        
        app.player.setWeapon(new app.classes.game.entities.base.Gun());
        
        app.player.moveTo( app.viewport.cpu().centerX() - app.player.cpu().centerX(), 
                           app.viewport.height - app.player.height);
        
        app.player.setDirection(app.classes.geom.Direction.UP);
        
        ns.set('app.game.engine', new app.classes.game.Engine);
        
        
        new app.classes.game.entities.volumes.Barricade (50, 200, 32, 8);
        new app.classes.game.entities.volumes.Barricade (150, 200, 32, 8);
        new app.classes.game.entities.volumes.Barricade (250, 200, 32, 8);
        new app.classes.game.entities.volumes.Barricade (350, 200, 32, 8);
        
        var e = new app.classes.game.entities.characters.EnemyFleet(0,0,.2);

        e.setFormation();
        app.stage.addChild(e);
        
        
        
        
            
        // start ticking
        requestAnimationFrame(tick);
        
        
        /*
        var fps = 0;
        
        app.onTick(function () {
            
            ++fps;
            
        });
        
        setInterval(function () {
            
            console.log(fps, 'fps');
            fps = 0;
            
        }, 1000);
        */
    };

    /**
     * Called upon DOM Ready in order to
     * initializes the app.
     * 
     * @private
     */
    function onReady () {
        
        document.addEventListener('DOMContentLoaded', init, false);

    };

    /**
     * Sequentially calls each one of the callback functions
     * passed to app.onTick on each tick (approx 60 times per second).
     * 
     * @private
     */
    function tick () {

        if (!app.paused) {

            requestAnimationFrame(tick);
            
            for (var i = 0, count = (queuedForTickCursor + 1) >>> 0, fn; i < count; ++i) {

                fn = queuedForTick[i];

                fn && fn();

            }

        }
        
    }
    
    function cleanseQueue () {
        
        var count = (queuedForTickCursor + 1) >>> 0;
        
        if (count === queuedForTickMaxLength) {
            
            var newQueue = new Array(queuedForTickMaxLength),
                newCursor = -1;
            
            for (var i = 0; i < count; ++i) {
                
                var callback = queuedForTick[i];
                
                if (callback) {
                    
                    newQueue[++newCursor] = callback;
                    
                }
                
            }
            
            if (newCursor === queuedForTickCursor) {
                
                throw new Error('Maximum tick callbacks reached: ' + queuedForTickMaxLength + '!');
                
            }
            
            queuedForTick = newQueue;
            queuedForTickCursor = newCursor;
            
        }
        
    }
    
    ns.set('app', api);
    
    // begin
    onReady();
    
})();