/* global ns, app */

(function () {
    
    /**
     * @type app.core.Finalizable
     */
    var Super = app.core.Finalizable,
    
        /**
         * @lends {app.classes.display.displayable.Transformer.prototype}
         */
        api = new Super,
        
        /**
         * The transform function names and syntax utils.
         * 
         * @private
         * @enum {String}
         */
        Fns = {
           
           translate: 'translate(',
           rotate: 'rotate(',
           
           scalex: 'scalex(',
           scaley: 'scaley(',
           skewx: 'skewx(',
           skewy: 'skewy(',
           rotatey: 'rotatey(',
           rotatex: 'rotatex(',
           
           comma: ',',
           close: ') ',
           pixel: 'px',
           degree: 'deg',
           empty: ''
           
        };
    
    
    /**
     * Creates a Transformer instance.
     * 
     * @class
     * 
     * @name Transformer
     * @param {Displayable} displayable
     */
    function Transformer (displayable) {
        
        // call super
        Super.call(this);
        
        this.displayable = displayable;
        
        this.xTranslation = 0;
        this.yTranslation = 0;
        
        this.reset();
        
    }
    
    /**
     * @type {Function}
     */
    api.constructor = Transformer;
    
    /**
     * @type {app.classes.display.Displayable}
     */
    api.displayable = null;
    
    /**
     * @type {Number} The x Skew
     */
    api.xSkew = 0;
    
    /**
     * @type {String} The x Skew call expression
     */
    api.xSkewCall = '';
    
    /**
     * @type {Number} The y Skew
     */
    api.ySkew = 0;
    
    /**
     * @type {String} The y Skew call expression
     */
    api.ySkewCall = '';
    
    /**
     * @type {Number} The x Scale
     */
    api.xScale = 0;
    
    /**
     * @type {String} The y Scale call expression
     */
    api.xScaleCall = '';
    
    /**
     * @type {Number} The y Scale
     */
    api.yScale = 0;
    
    /**
     * @type {String} The x Scale call expression
     */
    api.yScaleCall = '';
    
    /**
     * @type {Number} The Rotation
     */
    api.rotation = 0;
    
    /**
     * @type {String} The Rotation call expression
     */
    api.rotationCall = '';
    
    /**
     * @type {Number} The x Rotation
     */
    api.xRotation = 0;
    
    /**
     * @type {String} The X Rotation call expression
     */
    api.cRotationCall = '';
    
    /**
     * @type {Number} The y Rotation
     */
    api.yRotation = 0;
    
    /**
     * @type {String} The Y Rotation call expression
     */
    api.yRotationCall = '';
    
    /**
     * @type {Number} The x Displacement
     */
    api.xTranslation = 0;
    
    /**
     * @type {Number} The y Displacement
     */
    api.yTranslation = 0;
    
    /**
     * @property {Number} The x Origin
     */
    api.xOrigin = 0;
    
    /**
     * @property {Number} The y Origin
     */
    api.yOrigin = 0;
    
    /**
     * Clear this object and mark
     * it as finalized.
     */
    api.finalize = function () {
        
        // call super method
        Super.prototype.finalize.call(this);
        
        this.displayable = null;
        
    };
    
    /**
     * Clears the transformations applied to this object.
     * This still needs to be followed by a call to {@link #apply}
     * in order to be applied to this underlying 
     * {@link #app.classes.display.Displayable}.
     * 
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.reset = function () {
        
        this.xSkew          = 
        this.ySkew          = 
        this.xScale         = 
        this.yScale         = 
        this.rotation       = 
        this.xRotation      = 
        this.yRotation      = 0;
        
        this.xSkewCall      =
        this.ySkewCall      =
        this.xScaleCall     =
        this.yScaleCall     = 
        this.rotationCall   = 
        this.xRotationCall  = 
        this.yRotationCall  = '';
                
        return this;
        
    };
    
    /**
     * Tells whether any of the tranformations
     * properties is not set to its inital value.
     * 
     * @returns {Boolean}
     */
    api.hasTransformations = function () {
        
        return     this.xSkew     !== 0
                || this.ySkew     !== 0
                || this.xScale    !== 0
                || this.yScale    !== 0
                || this.rotation  !== 0
                || this.xRotation !== 0
                || this.yRotation !== 0;
        
    };
    
    /**
     * Applies the transformations set to this object
     * unto its underlying {@link #app.classes.display.Displayable}.
     * 
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.apply = function () {
        
        var transforms = '';
        
        if (this.xTranslation !== 0 || this.yTranslation !== 0) {
            
            transforms += Fns.translate 
                        +   this.xTranslation + Fns.pixel 
                        +   Fns.comma 
                        +   this.yTranslation + Fns.pixel
                        + Fns.close;
            
        }
        
        transforms += this.xRotationCall
                    + this.yRotationCall
                    + this.rotationCall
                    + this.xScaleCall
                    + this.yScaleCall
                    + this.xSkewCall
                    + this.ySkewCall;
        
        this.displayable.element.style.transform = transforms;
        
        return this;
        
    };
    
    /**
     * Set this instance's registration point.
     * 
     * @param {Number} x
     * @param {Number} y
     */
    api.setOrigin = function (x, y) {
        
        this.xOrigin = x;
        this.yOrigin = y;
        
        this.displayable.element.style.transformOrigin = x + 'px ' + y + 'px';
        
    };
    
    /**
     * Return this instance's x registration point.
     * 
     * @returns {Number}
     */
    api.getXOrigin = function () {
        
        return this.xOrigin;
        
    };
    
    /**
     * Return this instance's y registration point.
     * 
     * @returns {Number}
     */
    api.getYOrigin = function () {
        
        return this.yOrigin;
        
    };
    
    /**
     * Return this instance's registration point.
     * 
     * @returns {app.classes.geom.Point}
     */
    api.getOrigin = function () {
        
        return new app.classes.geom.Point(this.xOrigin, this.yOrigin);
        
    };
    
    /**
     * Returns this object's rotation.
     * 
     * @returns {Number}
     */
    api.getRotation = function () {
        
        return this.rotation;
        
    };
    
    /**
     * Set this object's rotation.
     * 
     * @param {Number} value
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.setRotation = function (value) {
        
        this.rotation = value;        
        this.rotationCall = value ? Fns.rotate + value + Fns.degree + Fns.close
                                  : Fns.empty;
        
        return this;
        
    };
    
    /**
     * Clear this object's rotation.
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.clearRotation = function () {
        
        this.rotation = 0;
        this.rotationCall = Fns.empty;
        
        return this;
        
    };
    
    /**
     * Returns this object's x rotation.
     * 
     * @returns {Number}
     */
    api.getXRotation = function () {
        
        return this.xRotation;
        
    };
    
    /**
     * Returns this object's y rotation.
     * 
     * @returns {Number}
     */
    api.getYRotation = function () {
        
        return this.yRotation;
        
    };
    
    /**
     * Set this object's x rotation.
     * 
     * @param {Number} value
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.setXRotation = function (value) {
        
        this.xRotation = value;
        this.xRotationCall = value ? Fns.rotatex + value + Fns.degree + Fns.close
                                   : Fns.empty;
        
        return this;
        
    };
    
    /**
     * Set this object's y rotation.
     * 
     * @param {Number} value
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.setYRotation = function (value) {
        
        this.yRotation = value;
        this.yRotationCall = value ? Fns.rotatey + value + Fns.degree + Fns.close
                                   : Fns.empty;
        
        return this;
        
    };
    
    /**
     * Returns this object's y and x rotation
     * as a {@link #app.classes.geom.Point}.
     * 
     * @returns {app.classes.geom.Point}
     */
    api.getXYRotation = function () {
        
        return new app.classes.geom.Point(this.xRotation, this.yRotation);
        
    };
    
    /**
     * Clear this object's x and y rotation.
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.clearXYRotation = function () {
        
        this.xRotation = 
        this.yRotation = 0;

        this.xRotationCall = 
        this.yRotationCall = Fns.empty;
        
        return this;
        
    };
    
    /**
     * Returns this object's x Scale.
     * 
     * @returns {Number}
     */
    api.getXScale = function () {
        
        return this.xScale;
        
    };
    
    /**
     * Returns this object's y Scale.
     * 
     * @returns {Number}
     */
    api.getYScale = function () {
        
        return this.yScale;
        
    };
    
    /**
     * Set this object's x Scale.
     * 
     * @param {Number} value
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.setXScale = function (value) {
        
        this.xScale = value;
        this.xScaleCall = value ? Fns.scalex + value + Fns.close
                                : Fns.empty;
        
        return this;
        
    };
    
    /**
     * Set this object's y Scale.
     * 
     * @param {Number} value
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.setYScale = function (value) {
        
        this.yScale = value;
        this.yScaleCall = value ? Fns.scaley + value + Fns.close
                                : Fns.empty;
        
        return this;
        
    };
    
    /**
     * Returns this object's y and x Scale
     * as a {@link #app.classes.geom.Point}.
     * 
     * @returns {app.classes.geom.Point}
     */
    api.getScale = function () {
        
        return new app.classes.geom.Point(this.xScale, this.yScale);
        
    };
    
    /**
     * Clear this object's x and y Scale.
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.clearScale = function () {
        
        this.xScale = 
        this.yScale = 0;
        
        this.xScaleCall = 
        this.yScaleCall = Fns.empty;
        
        return this;
        
    };
    
    /**
     * Returns this object's x Skew.
     * 
     * @returns {Number}
     */
    api.getXSkew = function () {
        
        return this.xSkew;
        
    };
    
    /**
     * Returns this object's y Skew.
     * 
     * @returns {Number}
     */
    api.getYSkew = function () {
        
        return this.ySkew;
        
    };
    
    /**
     * Set this object's x Skew.
     * 
     * @param {Number} value
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.setXSkew = function (value) {
        
        this.xSkew = value;
        this.xSkewCall = value ? Fns.skewx + value + Fns.degree + Fns.close
                               : Fns.empty;
        
        return this;
        
    };
    
    /**
     * Set this object's y Skew.
     * 
     * @param {Number} value
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.setYSkew = function (value) {
        
        this.ySkew = value;
        this.ySkewCall = value ? Fns.skewy + value + Fns.degree + Fns.close
                               : Fns.empty;
        
        return this;
        
    };
    
    /**
     * Returns this object's y and x Skew
     * as a {@link #app.classes.geom.Point}.
     * 
     * @returns {app.classes.geom.Point}
     */
    api.getSkew = function () {
        
        return new app.classes.geom.Point(this.xSkew, this.ySkew);
        
    };
    
    /**
     * Clear this object's x and y Skew.
     * @returns {app.classes.display.displayable.Transformer}
     */
    api.clearSkew = function () {
        
        this.xSkew =
        this.ySkew = 0;
        
        this.xSkewCall = 
        this.ySkewCall = Fns.empty;
        
        return this;
        
    };
    
    Transformer.prototype = api;
    
    ns.set('app.classes.display.displayable.Transformer', Transformer);
    
})();