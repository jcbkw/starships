 /* global app, ns */

(function () {
     
    /**
     * @class Position  Contains static positional properties and methods
     */
    function Position () {}
    
    Position.TOP               = 'top';
    Position.LEFT              = 'left';
    Position.RIGHT             = 'right';
    Position.BOTTOM            = 'bottom';
    Position.CENTER            = 'center';
    
    Position.TOP_LEFT          = 'topleft';
    Position.TOP_CENTER        = 'topcenter';
    Position.TOP_RIGHT         = 'topright';
    
    Position.CENTER_LEFT       = 'centerleft';
    Position.CENTER_CENTER     = 'centercenter';
    Position.CENTER_RIGHT      = 'centerright';
    
    Position.BOTTOM_LEFT       = 'bottomleft';
    Position.BOTTOM_CENTER     = 'bottomcenter';
    Position.BOTTOM_RIGHT      = 'bottomright';
    
    /**
     * Contains static positional properties and methods.
     * 
     * @typedef {Position} app.classes.geom.Position 
     */
    ns.set('app.classes.geom.Position', Position);
    
 })();