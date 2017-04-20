/* global ns, app */

(function () {
    
    /**
     * @type app.classes.game.Engine
     */
    var api = {},
        created = false;
    
    /**
     * Create the game engine
     * 
     * @class
     */
    function Engine () {
        
        if (created) {
            
            app.die(new Error('Cannot create more than one engine!'));
            
        }
        
        this.watchAll = 
        this.watchStage = 
        this.watchSentient = 
        this.watchInsentient = true;
        
        app.onTick(createWatchers(this));
        
    };
    
    Engine.Watch = {
        
        ALL: 'All',
        STAGE: 'Stage',
        SENTIENT: 'Sentient',
        INSENTIENT: 'Insentient'
        
    };
    
    /**
     * @type Function
     */
    api.contructor = Engine;
    
    api.watchers = null;
    
    /**
     * @type boolean
     */
    api.watchAll = false;
    
    /**
     * @type boolean
     */
    api.watchStage = false;
    
    /**
     * @type boolean
     */
    api.watchSentient = false;
    
    /**
     * @type boolean
     */
    api.watchInsentient = false;
    
    /**
     * Instructs the engine to stop watching the 
     * given type.
     * 
     * @param {String} type
     * 
     * @example 
     * app.game.engine.stopWatching(app.classes.game.Engine.Watch.STAGE);
     */
    api.stopWatching = function (type) {
        
        var property = getWatchPropertyName(type);
        
        if (this.hasOwnProperty(property)) {
            
            this[property] = false;
            
        }
        
    };
    
    /**
     * Tells whether the engine is watching the 
     * given type.
     * 
     * @param {String} type
     * @returns {Boolean}
     * 
     * @example 
     * app.game.engine.isWatching(app.classes.game.Engine.Watch.STAGE);
     */
    api.isWatching = function (type) {
        
        var property = getWatchPropertyName(type);
        
        if (this.hasOwnProperty(property)) {
            
            return this[property];
            
        }
        
        return false;
        
    };
    
    /**
     * Creates the watchers of the game that executes its physics
     * and mechanics.
     * 
     * @param {app.classes.game.Engine} engine
     */
    function createWatchers (engine) {
        
        var watchStage = createStageWatcher(engine),
            watchSentient = createSentientWatcher(engine),
            watchInsentient = createInsentientWatcher(engine);
    
        /**
         * Watches the game and executes its physics
         * and mechanics.
         */
        function watch () {

            if (engine.watchAll) {

                engine.watchStage && watchStage(engine);
                engine.watchSentient && watchSentient(engine);
                engine.watchInsentient && watchInsentient(engine);

            }

        }
        
        return watch;
        
    }
    
    function createStageWatcher (engine) {
        
        var viewPortCenterX = app.viewport.cpu().centerX(),
            viewPortCenterY = app.viewport.cpu().centerY();
    
        return function () {

            var stageX = -(app.player.x - viewPortCenterX),
                stageY = -(app.player.y - viewPortCenterY);

            app.stage.moveTo(stageX, stageY);

        };
       
    }
    
    function createSentientWatcher (engine) {
        
        var entityTypes = app.tk.arrays.fixed(1, app.classes.game.entities.base.Entity);
        
        return function () {
            
            var entites = app.stage.getDescendants(entityTypes),
                entityA = null,
                entityB = null,
                count = entites.length >>> 0,
                i,
                j;
                
            for (i = 0; i < count; i += 1) {
                
                entityA = entites[i];
                
                for (j = 0; j < count; j += 1) {
                    
                    if (j !== i) {
                        
                        entityB = entites[j];
                        
                        if (entityA.isCollidableWith(entityB) && entityA.intersects(entityB)) {
                            
                            entityA.handleCollision(entityB);
                            //app.log('A', entityA.constructor.name, 'collided with a', entityB.constructor.name);
                            
                        }
                        
                    }

                }
                
            }
                        
        };
        
    }
    
    function createInsentientWatcher (engine) {
        
        return function () {


        };
        
    }
        
    /**
     * Builds a watch property name
     * 
     * @private
     * 
     * @param {String} type
     * @returns {String}
     */
    function getWatchPropertyName (type) {
        
        return 'watch' + type;
        
    }
    
    Engine.prototype = api;
    
    ns.set('app.classes.game.Engine', Engine);
    
})();