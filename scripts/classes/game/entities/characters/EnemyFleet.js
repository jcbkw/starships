/* global ns, app */

(function (){
    
    var Super = app.classes.game.entities.base.Insentient,
        metaFleet = 'parentFleet',
        metaIndex = 'indexInFleet';
    
    function EnemyFleet (x, y, initialStepSize) {

        Super.call(this, x, y, 0, 0);
        this.stepSize = initialStepSize;
        /*
        this.enemies = null;
        this.enemiesLeft = 0;
        this.enemiesCreated = 0;
        */
    }
        
    EnemyFleet.prototype = new Super;
    EnemyFleet.prototype.constructor = EnemyFleet;
            
    EnemyFleet.prototype.setFormation = function () {
       
        var enemy = null,
            cursor = -1,
            bounds = app.stage.toBounds(),
            height = 16,
            space = 10,
            width = 16,
            rows = 3,
            cols = 8,
            col,
            row;
            
        /*this.enemiesCreated = rows * cols;
        this.enemiesLeft = this.enemiesCreated;
        this.enemies = new Array(this.enemiesCreated);*/
            
        for (row = 0; row < rows; row +=1 ) {
            
            for (col = 0; col < cols; col += 1) {
                
                //++cursor;
                
                enemy = new app.classes.game.entities.characters.Enemy(
                    (width  * col) + (space * col),
                    (height * row) + (space * row),
                     width,
                     height
                );

                enemy.group.add('darkforce', 'type-1');
                enemy.setWeapon(new app.classes.game.entities.base.Gun());
                enemy.setMetadata(metaFleet, this);
                //enemy.setMetadata(metaIndex, cursor);
                enemy.addListenerOnce(enemy.events.REMOVED, whenEnemiesGetRemoved);
                
                scheduleNextShot(enemy);
                paceHorizontally(/*fleet*/this, bounds, enemy, row, rows - 1);
                
                app.stage.addChild(enemy);
                
                //this.enemies[cursor] = enemy;
                
            };    
            
        }
        
    };
    
    function whenEnemiesGetRemoved () {
        
        var fleet = this.getMetadata(metaFleet),
            index = this.getMetadata(metaIndex);
        
        fleet.stepSize += .075;
        //fleet.enemies[index] = null;
        
    }
    
    function disposeOf (enemy) {
        
        enemy.uncross();
        enemy.getContainer() && enemy.remove();
        
    }
  
    function isAlive (enemy, dontFinalize) {

        if (enemy.isAlive() && enemy.getContainer()) {

            return true;

        }
        else if (!dontFinalize) {
            
            disposeOf(enemy);

        }

    }
    
    function scheduleNextShot (enemy) {
                    
        var shoot = function () {

            if (isAlive(enemy)) {

                enemy.attack();
                scheduleNextShot(enemy);

            }
            else {
                
                shoot = null;
                
            }

        };
                    
        setTimeout(shoot, app.tk.ints.rand(1000, 24000));
        
    }
    
    function paceHorizontally (fleet, bounds, enemy, row, rows) {
        
        function slideDown () {

            setTimeout(function () {

                if (isAlive(enemy)) {

                    // slide down
                    enemy.cross(
                            
                        /*x*/0, 
                        /*y*/16, 
                        /*onComplete*/function () {

                            if (enemy.isOutOfBounds(bounds)) {

                                disposeOf(enemy);

                            }

                        }, 
                        /*onDirectionUpdate*/null, 
                        /*onEachStep*/null, 
                        /*stepSizeProvider*/fleet
                                
                    );

                }

            }, Math.abs(row - rows) * 750);

        }
        
        setTimeout(function () {

            if (isAlive(enemy)) {
                
                // pace horizontally
                enemy.pace().straight(
                        
                    /*size*/270, 
                    /*vertical*/false, 
                    /*stepSizeProvider*/fleet, 
                    /*onEachLap*/slideDown, 
                    /*onReverse*/slideDown
                    
                );

            }

        }, row * 500);

    }
    
    ns.set('app.classes.game.entities.characters.EnemyFleet', EnemyFleet);
    
})();