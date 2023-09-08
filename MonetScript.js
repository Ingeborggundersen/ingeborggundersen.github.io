const canvas = document.getElementById("waterCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];

let animationRunning = false; // Flag to control animation

class Star {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: 1
        };
        this.gravity = 0.2;
        this.growing = true; // Flag to track if the star is growing
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();

        // If animation is paused, do not update position or size
        if (!animationRunning) {
            return;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Add gravity effect
        this.velocity.y += this.gravity;

        // Increase size before exploding
        if (this.growing) {
            this.radius += 0.2;
            if (this.radius >= this.radius * 2) {
                this.growing = false;
            }
        }
    }
}

function createStar() {
    if (!animationRunning) {
        return;
    }
    const x = Math.random() * canvas.width;
    const y = 0;
    const radius = Math.random() * 15 + 5; // Bigger and more visible stars
    const color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`;
    const star = new Star(x, y, radius, color);
    stars.push(star);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create stars at regular intervals
    
    if (Math.random() < 0.1) {
        createStar();
    }

    stars.forEach((star, index) => {
        star.update();

        // Remove stars that reach the middle of the page
        if (star.y + star.radius > canvas.height / 2 && !star.growing) {
            stars.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

// Toggle animation on click
canvas.addEventListener("click", () => {
    animationRunning = !animationRunning; // Toggle animation flag
    if (animationRunning) {
        animate(); // Start or resume animation
    }
});
