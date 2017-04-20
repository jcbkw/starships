 /* global app, ns */

(function () {
     
    /**
     * @class Rectangle A rectangular shape.
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Rectangle (x, y, width, height) {
        
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        
    }

    Rectangle.prototype = {

        /**
         * Constructor
         * @type Function
         */
        constructor: Rectangle,

        /**
         * The rectangle's x coordinate
         * @type {Number}
         */
        x: 0,

        /**
         * The rectangle's y coordinate
         * @type {Number}
         */
        y: 0,

        /**
         * The rectangle's width
         * @type {Number}
         */
        width: 0,

        /**
         * The rectangle's height
         * @type {Number}
         */
        height: 0,
        
        /**
         * Checks whether or not this <code>Rectangle</code> contains the
         * point at the specified <code>Point</code>.
         *
         * @param {app.classes.geom.Point} point the specified point
         * 
         * @returns    <code>true</code> if the point
         *            {@code (X,Y)} is inside this
         *            <code>Rectangle</code>;
         *            <code>false</code> otherwise.
         */
        containsPoint: function (point) {
            
            return this.contains(point.x, point.y);
            
        },
        
        /**
         * Checks whether or not this <code>Rectangle</code> contains the
         * point at the specified location.
         *
         * @param {Number} pX the specified X coordinate
         * @param {Number} pY the specified Y coordinate
         * 
         * @returns    <code>true</code> if the point
         *            {@code (X,Y)} is inside this
         *            <code>Rectangle</code>;
         *            <code>false</code> otherwise.
         */
        contains: function (pX, pY) {
            
            var w = this.width,
                h = this.height,
                x,
                y;
                
            if ((w | h) < 0) {
                // At least one of the dimensions is negative...
                return false;
            }
            
            // Note: if either dimension is zero, tests below must return false...
            x = this.x;
            y = this.y;
            
            if (pX < x || pY < y) {
                return false;
            }
            
            w += x;
            h += y;
            
            //    overflow || intersect
            return ((w < x || w > pX) &&
                    (h < y || h > pY));
            
        },
       
        /**
         * Tells whether this rectangle is colliding 
         * with the provided rectangle.
         * 
         * @param {app.classes.geom.Rectangle} rectangle
         * 
         * @returns {Boolean}
         */
        intersects: function (rectangle) {

            return  this.x < rectangle.x + rectangle.width  &&
                    this.x + this.width > rectangle.x       &&
                    this.y < rectangle.y + rectangle.height &&
                    this.height + this.y > rectangle.y;

        },
        
        /**
         * Computes the intersection of this <code>Rectangle</code> with the
         * specified <code>Rectangle</code>. Returns a new <code>Rectangle</code>
         * that represents the intersection of the two rectangles.
         * If the two rectangles do not intersect, the result will be
         * an empty rectangle.
         *
         * @param {app.classes.geom.Rectangle} r the specified <code>Rectangle</code>
         * 
         * @returns   the largest <code>Rectangle</code> contained in both the
         *            specified <code>Rectangle</code> and in
         *            this <code>Rectangle</code>; or if the rectangles
         *            do not intersect, an empty rectangle.
         */
        intersection: function (r) {
            
            var tx1 = this.x;
            var ty1 = this.y;
            var rx1 = r.x;
            var ry1 = r.y;
            var tx2 = tx1; tx2 += this.width;
            var ty2 = ty1; ty2 += this.height;
            var rx2 = rx1; rx2 += r.width;
            var ry2 = ry1; ry2 += r.height;
                
            if (tx1 < rx1) tx1 = rx1;
            if (ty1 < ry1) ty1 = ry1;
            if (tx2 > rx2) tx2 = rx2;
            if (ty2 > ry2) ty2 = ry2;
            
            tx2 -= tx1;
            ty2 -= ty1;
            
            // tx2,ty2 will never overflow (they will never be
            // larger than the smallest of the two source w,h)
            // they might underflow, though...
            if (tx2 < app.tk.ints.MIN_SAFE_VALUE) tx2 = app.tk.ints.MIN_SAFE_VALUE;
            if (ty2 < app.tk.ints.MIN_SAFE_VALUE) ty2 = app.tk.ints.MIN_SAFE_VALUE;
            
            return new Rectangle(tx1, ty1, tx2, ty2);
            
        },
        
        /**
         * Tells whether this rectangle is colliding 
         * with the provided rectangle and if so, from 
         * which side.
         * 
         * @param {app.classes.geom.Rectangle} rectangle
         * 
         * @returns {(String|null)} app.classes.geom.Position
         */
        intersectsAt: function (rectangle) {
            
            var dx          = (this.x + this.width  / 2) - (rectangle.x + rectangle.width / 2),
                dy          = (this.y + this.height / 2) - (rectangle.y + rectangle.height/ 2),
                width       = (this.width  + rectangle.width) / 2,
                height      = (this.height + rectangle.height)/ 2,

                crossWidth  = width  * dy,
                crossHeight = height * dx,

                side        = null;
            
            if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
                
                if (crossWidth>crossHeight) {
                    
                    side    = crossWidth > -crossHeight
                            ? app.classes.geom.Position.BOTTOM
                            : app.classes.geom.Position.LEFT;
                    
                }
                else {
                    
                    side    = crossWidth > -crossHeight
                            ? app.classes.geom.Position.RIGHT
                            : app.classes.geom.Position.TOP;
                    
                }
                
            }
            
            return side;
            
        }

    };
    
    ns.set('app.classes.geom.Rectangle', Rectangle);
    
 })();