class Keyboard {
    left = false;
    right = false;
    up = false;
    down = false;
    space = false;
    attack = false;

    /**
     * Functions within the constructor are executed immediately
     * 
     */
    constructor() {
        this.bindKeypressEvent();
        this.bindKeyTouchEvent();
    }

    /**
     * This function checks which key was pressed 
     * 
     */
    bindKeypressEvent() {
        window.addEventListener("keydown", (event) => { 
            if (event.keyCode == '38') { 
                this.up = true; 
            }
            else if (event.keyCode == '40') {
                this.down = true;
            }
            else if (event.keyCode == '37') {
                this.left = true;
            }
            else if (event.keyCode == '39') {
                this.right = true;
            }
            else if (event.keyCode == '32') {
                this.space = true;
            }
            else if (event.keyCode == '68') {
                this.attack = true;
            }
        });

        window.addEventListener("keyup", (event) => { 
            if (event.keyCode == '38') { 
                this.up = false; 
            }
            else if (event.keyCode == '40') {
                this.down = false;
            }
            else if (event.keyCode == '37') {
                this.left = false;
            }
            else if (event.keyCode == '39') {
                this.right = false;
            }
            else if (event.keyCode == '32') {
                this.space = false;
            }
            else if (event.keyCode == '68') {
                this.attack = false;
            }
        });
    }

    /**
     * This function checks which button was touched
     * 
     */
    bindKeyTouchEvent() {
        document.getElementById('mobile-left').addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.left = true;
        });

        document.getElementById('mobile-left').addEventListener("touchend", (event) => {
            event.preventDefault();
            this.left = false;
        });

        document.getElementById('mobile-right').addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.right = true;
        });

        document.getElementById('mobile-right').addEventListener("touchend", (event) => {
            event.preventDefault();
            this.right = false;
        });

        document.getElementById('mobile-jump').addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.space = true;
        });

        document.getElementById('mobile-jump').addEventListener("touchend", (event) => {
            event.preventDefault();
            this.space = false;
        });

        document.getElementById('mobile-throw').addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.attack = true;
        });

        document.getElementById('mobile-throw').addEventListener("touchend", (event) => {
            event.preventDefault();
            this.attack = false;
        });
    }
}
