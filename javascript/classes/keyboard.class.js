class Keyboard {
    left = false;
    right = false;
    up = false;
    down = false;
    space = false;
    attack = false;

    constructor() {
        this.bindKeypressEvent();
        this.bindKeyTouchEvent();
    }

    bindKeypressEvent() {
        window.addEventListener("keydown", (event) => { // Mithilfe dieser Eventfunktion wird uns ausgeloggt, was für eine Taste der User gedrückt hat //
            if (event.keyCode == '38') { // 38 = Pfeilhochtaste // Wenn Event mit dem Keycode 38 gedrückt wurde...
                this.up = true; // ... soll die Variable UP auf true geändert werden
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

        window.addEventListener("keyup", (event) => { // Mithilfe dieser Eventfunktion wird uns ausgeloggt, was für eine Taste der User gedrückt hat //
            if (event.keyCode == '38') { // 38 = Pfeilhochtaste // Wenn Event mit dem Keycode 38 losgelassen wurde...
                this.up = false; // ... soll die Variable UP auf false geändert werden
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
