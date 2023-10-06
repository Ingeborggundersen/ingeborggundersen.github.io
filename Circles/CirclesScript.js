
// Define the color palette for the panda
const colors = [
    "#28003C", // Dark purple
    "#FFC0CB",  // Pink
    "#655A7C", // Light blue
    "#AFC1D6", //Yellow
    "#f9e900", 
    "#AB92BF" //purple
];


function setup() {
    createCanvas(1200, 800);
    blendMode(MULTIPLY); 
    background("beige"); 
}


function draw() {
    const radius = random(5, 25); // Random radius between 5 and 25
    const color = random(colors);

    const x = random(width);
    const y = random(height);

    noStroke();
    fill(color);
    ellipse(x, y, radius * 2);
}

const colorsNew = [
    color(40, 0, 60),    // Dark purple
    color(255, 192, 203) // Pink
];
