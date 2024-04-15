const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.words = ["ASSUMILO", "SI", "#WE#ARE#WATCHING", "YESYESYES", "#LET#ME#CODE", "WARNING", "#ASSUMI#MARCO", "#NOFORN", "#TOP#SECRET", "CLASSIFIED", "ATTENTI", "FALLO", "#LET#ME#CODE", "BENVENUTO", "SVEGLIATI", "#WEAK#UP", "#DO#IT", "WELCOME", "#SEND#MONEY", "#HIRE#MARCO", "JOIN ME TO SAVE THE WORLD"];
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = "";
        this.canvasHeight = canvasHeight;
        this.symbolY = y; // Indice Y del simbolo
    }

    draw(context) {
        // Ogni tanto seleziona una parola
        if (Math.random() < 0.02) {
            const randomWord = this.words[Math.floor(Math.random() * this.words.length)];
            // Disegna un simbolo per ogni lettera della parola selezionata
            context.fillStyle = "red"; // Imposta il colore del testo a rosso
            for (let i = 0; i < randomWord.length; i++) {
                this.text = randomWord.charAt(i);
                // Disegna il testo sul canvas utilizzando l'indice Y del simbolo
                context.fillText(this.text, this.x * this.fontSize, this.symbolY * this.fontSize);
                this.symbolY++; // Incrementa l'indice Y del simbolo
            }
            // Reimposta il colore del testo a verde per i simboli successivi
            context.fillStyle = "#0aff0a";
        } else {
            // Seleziona un carattere casuale
            this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            // Disegna il testo sul canvas utilizzando l'indice Y del simbolo
            context.fillText(this.text, this.x * this.fontSize, this.symbolY * this.fontSize);
        }

        // Gestisci il movimento del simbolo
        if (this.symbolY * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.symbolY = this.y; // Reimposta l'indice Y del simbolo alla posizione iniziale
        } else {
            this.symbolY++; // Incrementa l'indice Y del simbolo
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 16;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.initialize();
    }

    initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }

    draw(context) {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.textAlign = "center";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0aff0a";
        for (let i = 0; i < this.symbols.length; i++) {
            const symbol = this.symbols[i];
            ctx.font = symbol.fontSize + 'px monospace';
            symbol.draw(context);
        }
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 60;
const nextFrame = 2000 / fps;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        effect.draw(ctx);
        timer = 0;
    } else {
        timer += deltaTime;
    }

    requestAnimationFrame(animate);
}

animate(0);
