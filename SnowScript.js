const canvas = document.getElementById("snowflake-canvas");
const ctx = canvas.getContext("2d");
const depthLabel = document.getElementById("depth-label");
const depthSlider = document.getElementById("recursion-depth-slider");

let recursionDepth = 0;
let maxDepth = 0;

function drawSnowflake(x, y, length, angle, depth) {
    const newPath = new Path2D(); // Create a new path for the snowflake

    function drawLine(x1, y1, x2, y2) {
        newPath.moveTo(x1, y1);
        newPath.lineTo(x2, y2);
    }

    function recursiveDraw(x, y, length, angle, depth) {
        if (depth === 0) {
            const x2 = x + length * Math.cos(angle);
            const y2 = y + length * Math.sin(angle);
            drawLine(x, y, x2, y2); // Draw the line
        } else {
            const newLength = length / 3;
            const x1 = x + newLength * Math.cos(angle);
            const y1 = y + newLength * Math.sin(angle);

            for (let i = 0; i < 6; i++) { // 6 branches for a snowflake
                const newX = x1 + newLength * 2 * Math.cos(angle + (i * Math.PI) / 3);
                const newY = y1 + newLength * 2 * Math.sin(angle + (i * Math.PI) / 3);
                drawLine(x1, y1, newX, newY); // Draw the line
                recursiveDraw(newX, newY, newLength, angle + (i * Math.PI) / 3, depth - 1);
            }
        }
    }

    recursiveDraw(x, y, length, angle, depth);
    
    // Stroke the entire path at the end
    ctx.strokeStyle = "white";
    ctx.stroke(newPath);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateDepthLabel() {
    depthLabel.textContent = recursionDepth;
}

function draw() {
    clearCanvas();
    const centerX = canvas.width / 2;
    const centerY = (canvas.height / 2) + 100; // Adjust the Y offset here
    const length = canvas.width * 0.25; // Decreased length
    const angle = -Math.PI / 2;

    drawSnowflake(centerX, centerY, length, angle, recursionDepth);
    updateDepthLabel();

    // Draw white circles for snow
    drawSnow(centerX, centerY);

    // Draw the snowflake
    drawSnowflake(centerX, centerY, length, angle, recursionDepth);
    updateDepthLabel();
}

function drawSnow(x, y) {
    const numSnowflakes = 100; // Adjust the number of snowflakes as needed

    for (let i = 0; i < numSnowflakes; i++) {
        const radius = Math.random() * 2 + 1; // Random radius between 1 and 3 pixels
        const posX = Math.random() * canvas.width;
        const posY = Math.random() * canvas.height;

        ctx.beginPath();
        ctx.arc(posX, posY, radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

depthSlider.addEventListener("input", (e) => {
    recursionDepth = parseInt(e.target.value);
    draw();
});

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

maxDepth = parseInt(depthSlider.max);
depthSlider.value = recursionDepth;

draw();
