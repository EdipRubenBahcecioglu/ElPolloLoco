class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {}; 
    currentImage = 0;

    /**
     * This function creates a new image object 
     * 
     * @param {string} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function iterates through an array and stores the individual image paths in the image cache
     * 
     * @param {array} arr -  this is the array that will be iterated
     */
    loadImages(arr) { 
        arr.forEach((path) => { 
            let img = new Image(); 
            img.src = path 
            this.imageCache[path] = img; 
        });

    }

    /**
     * With this function we draw the image in the canvas / context
     * 
     * @param {string} ctx - context / canvas / gamefield
     */
    draw(ctx) {
        try{
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
        } catch(e){
            // console.warn('Error loading image', e);
            // console.log('Could not load image', this.img.src);
        }
    }

    /**
     * This function draws a border arround an object
     * 
     * @param {string} ctx - context / canvas / gamefield
     */
    drawBorder(ctx) {
        // if () { // this instanceof Character// 
        //     ctx.beginPath(); 
        //     ctx.lineWidth = '3'; 
        //     ctx.strokeStyle = 'blue'; 
        //     ctx.rect(this.x, this.y, this.width, this.height); 
        //     ctx.stroke();
        // }
    }
}


