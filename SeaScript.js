const canvas = document.getElementById('seaCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numParticles = 100;
const particleSizeRange = [1, 10];
const particleOpacity = 0.7; 

let particles = []; // Define particles as a global variable


function setup() {
    // Initialize particles with random positions and colors
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * (particleSizeRange[1] - particleSizeRange[0]) + particleSizeRange[0];

        const color = `rgba(0, 0, 255, ${particleOpacity})`; 
        particles.push({ x, y, size, color });

        ctx.globalCompositeOperation = 'multiply';

    }

    // Animation loop
    function draw() {
        // Clear the entire canvas on each frame
        ctx.fillStyle =  'rgba(173, 216, 230, 0.1)'; // Adjust the color and opacity as needed
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    

        for (const particle of particles) {
            const xOffset = noise(particle.x * 0.005, particle.y * 0.005) * 20;
            const yOffset = noise(particle.y * 0.005, particle.x * 0.005) * 20;

            ctx.fillStyle = particle.color;

            // Draw each particle as a filled circle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            // Wrap particles around the canvas
            particle.x = (particle.x + xOffset + canvas.width) % canvas.width;
            particle.y = (particle.y + yOffset + canvas.height) % canvas.height;
        }

        requestAnimationFrame(draw);
    }

    draw();
}

canvas.addEventListener('click', () => {
    setup(); // Call the setup function to reset and start over
});

/*function noise(x, y) {
    return Math.random();
}*/

// Perlin noise function from ChatGPT
function noise(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const A = p[X] + Y;
    const B = p[X + 1] + Y;

    return lerp(v, lerp(u, grad(p[A], x, y), grad(p[B], x - 1, y)), lerp(u, grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1)));
}

function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t, a, b) {
    return a + t * (b - a);
}

function grad(hash, x, y) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

// Permutation table (you can customize this for different noise patterns)
const p = [...Array(512)].map(() => Math.floor(Math.random() * 255));
p.push(...p); // Duplicate the permutation table to avoid index wrapping
p.push(...p); // Duplicate the permutation table to avoid index wrapping



window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setup();
});

setup();
