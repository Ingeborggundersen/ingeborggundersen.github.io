let squares = [];
let flashing = false;
let bgColor = { r: 50, g: 0, b: 100 };

function setup() {
  createCanvas(600, 600);
  noStroke();
}

function draw() {
  if (flashing) {
    background(random(255), random(255), random(255));
  } else {
    background(bgColor.r, bgColor.g, bgColor.b);
  }
  // Dynamic background with moving waves of purple
  //background(50 + 100 * sin(frameCount * 0.02), 0, 100);

  // Create a new square at a random position and with a random color
  if (mouseIsPressed) {
    let x = mouseX + random(-50, 50);
    let y = mouseY + random(-50, 50);
    let size = random(50, 150);
    let col = color(random(255), random(255), random(255), 150);
    squares.push({ x, y, size, col });
  }

  // Update and display squares
  for (let i = squares.length - 1; i >= 0; i--) {
    let sq = squares[i];
    fill(sq.col);
    square(sq.x, sq.y, sq.size);
    sq.size -= 2;
    if (sq.size <= 0) {
      squares.splice(i, 1);
    }
  }
}

function mousePressed() {
  flashing = true;
  bgColor = { r: 255, g: 0, b: 0 }; // Change background to red when touched
  document.getElementById("message").style.display = "none"; // Hide the h1 element

}

function mouseReleased() {
  flashing = false;
  bgColor = { r: 50, g: 0, b: 100 }; // Reset background to purple when released
  document.getElementById("message").style.display = "block"; // Show the h1 element

}


  
 