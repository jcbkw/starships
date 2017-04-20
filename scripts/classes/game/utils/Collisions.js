 /* global app, ns */

(function () {
    
    /**
     * Contains static collision handling helpers.
     * 
     * @type app.classes.game.utils.Collisions
     */
    var api = {};
    
    /**
     * Handle the collision of an entity with a bullet.
     * Where the <code>this</code> argument of this function
     * must be the bullet.
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     */
    api.entityWithBullet = function (entity) {
        
        this.impact();
        
    };
    
    /**
     * Handle the collision of an entity with a boundary.
     * Where the <code>this</code> argument of this function
     * must be the boundary.
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     */
    api.entityWithBoundary = function (entity) {
        
        if (    entity instanceof app.classes.game.entities.base.Character
            ||  entity instanceof app.classes.game.entities.base.Volume) {
            
            // behave like a boundary
            switch (entity.intersectsAt(this)) {

                case app.classes.geom.Position.BOTTOM: 

                    entity.moveTo(entity.x, this.y + this.height);

                    break;

                case app.classes.geom.Position.LEFT: 

                    entity.moveTo(this.x - entity.width, entity.y);

                    break;

                case app.classes.geom.Position.RIGHT:

                    entity.moveTo(this.x + this.width, entity.y);

                    break;

                case app.classes.geom.Position.TOP:

                    entity.moveTo(entity.x, this.y - entity.height);

                    break;

            }
            
        }
        // else disregard
        
    };
    
    /**
     * Handle the collision of an entity with a pushable.
     * Where the <code>this</code> argument of this function
     * must be the pushable.
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     */
    api.entityWithPushable = function (entity) {
        
        switch (entity.intersectsAt(this)) {

            case app.classes.geom.Position.BOTTOM: 

                this.moveTo(this.x, entity.y - this.height);
                entity.moveTo(entity.x, this.y + this.height);

                break;

            case app.classes.geom.Position.LEFT: 

                this.moveTo(entity.x + entity.width, this.y);
                entity.moveTo(this.x - entity.width, entity.y);

                break;

            case app.classes.geom.Position.RIGHT:

                this.moveTo(entity.x - this.width, this.y);
                entity.moveTo(this.x + this.width, entity.y);

                break;

            case app.classes.geom.Position.TOP:

                this.moveTo(this.x, entity.y + entity.height);
                entity.moveTo(entity.x, this.y - entity.height);

                break;
                
        }
        
    };
    
    /**
     * Handle the collision of an entity with another one
     * by making sure that the one with the highest x axis
     * also has the highest z order.
     * Where the <code>this</code> argument of this function
     * must be one of the two entities.
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     */
    api.entityUpdateIndex = function (entity) {
        
        var entityContainer = entity.getContainer(),
            myContainer     = this.getContainer();
        
        // if we are in the same container
        if (entityContainer === myContainer) {

            // and this has lower on the screem than the e
            if (this.y > entity.y) {

                // then I must have a higher z-index,
                if (myContainer.getChildIndex(this) < entityContainer.getChildIndex(entity)) {

                    // otherwise swap our z-index
                    myContainer.swapChildren(this, entity);

                }

            }

        }
        
    };
    
    /**
     * Handle the collision of an character with an entity,
     * check whether that enitiy can is neutral or can harm
     * or heal the character, and apply the verdict.
     * Where the <code>this</code> argument of this function
     * must be the character.
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     */
    api.characterUpdateLife = function (entity) {
        
        var entityLifeImpact = entity.getLifeImpact();
        
        // if not a neutral entity
        if (entityLifeImpact !== 0) {

            // let the entity harm me or heal me
            this.lifeGauge &&
            this.lifeGauge.updateLife(entityLifeImpact);

        }
        
    };
    
    /**
     * Handle the collision of an character with a harful entity.
     * Where the <code>this</code> argument of this function
     * must be the character.
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     */
    api.characterWithHarmfulEntity = function (entity) {
        
        var intersection    = 0, //this.intersection(entity),
            largestSide     = 0, // entity.width > entity.height ? entity.width : entity.height,
            direction       = new app.classes.geom.Direction(entity.getDirection()),
            magnitude       = largestSide + entity.getDirectionMagnitude(),
            that            = this;
    
        if (direction.hasX()) {
            
            magnitude      +=  0; //intersection.width;
            
        }
        
        if (direction.hasY()) {
            
            magnitude      += 0; //intersection.height;
            
        }
        
        this.steps(direction.getX(), direction.getY(), magnitude);
        
        // todo nooooo must user animation frame
        // can't move for a split second
        ///////////////////////////////////////////
        that.setLocked(true);
        setTimeout(function () {
            that.setLocked(false);
        }, 250);
        
        // can't be touched for a second        
        that.setGhost(true);        
        that.setAlpha(.5);
        
        setTimeout(function () {
            that.setGhost(false);
            that.setAlpha(1);
        }, 1000);
        ///////////////////////////////////////////
        ///////////////////////////////////////////
        
        
    };
    
    ns.set('app.classes.game.utils.Collisions', api);
    
 })();