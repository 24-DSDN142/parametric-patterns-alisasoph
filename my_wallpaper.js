//your parameter variables go here!
let rect_width  = 20;
let rect_height = 20;



function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(true); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 50;
}

function wallpaper_background() {
  background(240, 255, 240); //light honeydew green colour
}

function my_symbol() { // do not rename this function. Treat this similarly to a Draw function
  rect(40 ,40, rect_width, rect_height);
}
// wallpaper_bundle.js

// Define parameters
let patterns = [];
let currentPatternIndex = 0;
let bgColors = [];
let currentBgColorIndex = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // Prevent continuous drawing
  
  // Initialize background colors
  bgColors = [
    color(0, 0, 255),    // Blue
    color(255, 0, 0),    // Red
    color(255, 192, 203),// Pink
    color(255, 165, 0),  // Orange
    color(0, 255, 0)     // Green
  ];
  
  generatePatterns();
}

function draw() {
  background(bgColors[currentBgColorIndex]); // Use the current background color
  patterns[currentPatternIndex].draw();
}

// Function to generate different patterns
function generatePatterns() {
  for (let i = 0; i < 5; i++) {
    patterns.push(new Pattern(i));
  }
}

// Pattern class
class Pattern {
  constructor(index) {
    this.index = index;
    this.size = random(30, 100);
    this.shapeType = ['heart', 'square', 'triangle', 'eyes'][index % 4];
    this.color = color(random(255), random(255), random(255));
    this.lineWeight = random(1, 10);
    this.density = int(random(5, 50));
    this.opacity = random(50, 255);
    this.rotation = random(TWO_PI);
  }

  draw() {
    for (let i = 0; i < this.density; i++) {
      let x = random(width);
      let y = random(height);
      
      fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.opacity);
      strokeWeight(this.lineWeight);
      
      push();
      translate(x, y);
      rotate(this.rotation);
      
      if (this.shapeType === 'heart') {
        drawHeart(0, 0, this.size);
      } else if (this.shapeType === 'square') {
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
      } else if (this.shapeType === 'triangle') {
        triangle(-this.size / 2, this.size / 2, this.size / 2, this.size / 2, 0, -this.size / 2);
      } else if (this.shapeType === 'eyes') {
        noStroke();
        ellipse(0, 0, this.size);
        fill(255);
        ellipse(-this.size * 0.2, -this.size * 0.2, this.size * 0.4);
        ellipse(this.size * 0.2, -this.size * 0.2, this.size * 0.4);
        fill(0);
        ellipse(-this.size * 0.2, -this.size * 0.2, this.size * 0.1);
        ellipse(this.size * 0.2, -this.size * 0.2, this.size * 0.1);
      }
      
      pop();
    }
  }
}

// Function to draw a heart
function drawHeart(x, y, size) {
  noStroke();
  fill(255, 0, 0); // Default heart color
  beginShape();
  vertex(x, y + size * 0.3);
  bezierVertex(x - size * 0.2, y - size * 0.2, x - size * 0.6, y + size * 0.2, x, y + size);
  bezierVertex(x + size * 0.6, y + size * 0.2, x + size * 0.2, y - size * 0.2, x, y + size * 0.3);
  endShape(CLOSE);
}

// Function to handle key presses for changing patterns and background
function keyPressed() {
  if (key === ' ') { // Spacebar to change pattern
    currentPatternIndex = (currentPatternIndex + 1) % patterns.length;
    redraw(); // Redraw the new pattern
  } else if (key === 'b') { // 'b' key to change background color
    currentBgColorIndex = (currentBgColorIndex + 1) % bgColors.length;
    redraw(); // Redraw with the new background color
  }
}

// Adjust canvas size on window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
