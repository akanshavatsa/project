var image=null;
var grey = null;
var red = null;
var tri=null;
var rainbow=null;
var blur=null;
var win=null;
var canvas = document.getElementById("can");

function upload() {
  var fileinput = document.getElementById("i");
  image = new SimpleImage(fileinput);
  grey=new SimpleImage(fileinput);
  red=new SimpleImage(fileinput);
  tri=new SimpleImage(fileinput);
  rainbow=new SimpleImage(fileinput);
  blur=new SimpleImage(fileinput);
  win=new SimpleImage(fileinput);
  image.drawTo(canvas);
}


function dogrey()
{
  if (imageIsLoaded(grey)) {
    makegrey();
  }
}
function makegrey() {
  //change all pixels of image to gray
  for (var pixel of grey.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  var canvas = document.getElementById("can");
  grey.drawTo(canvas);
}


function dored() {
  if (imageIsLoaded(red)) {
    makered();
  }
}
function makered() {
  for (var pixel of red.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255); 
    }
  }
  var canvas = document.getElementById("can");
  red.drawTo(canvas);
}


function reset() {
  if (imageIsLoaded(image)) {
   image.drawTo(canvas);
    grey = new SimpleImage(image);
    red = new SimpleImage(image);
  }
}
function imageIsLoaded(img) {
  if (img == null || !img.complete()) {
    alert("Image not loaded");
    return false;
  } else {
    return true;
  }
}


function dotricolor() {
  if (imageIsLoaded(tri)){
    maketri();
  }
}
function maketri()
{
  w=tri.getWidth();
  for (var pixel of tri.values()) 
  {
    x=pixel.getX();
    y=pixel.getY();
    
    if(x<w/3)
        pixel.setRed(255);
    else if(x>w/3 && x<2*w/3)
        pixel.setGreen(255);
    else
        pixel.setBlue(255);
}
  var canvas = document.getElementById("can");
  tri.drawTo(canvas);
}


function dorainbow() {
  if (imageIsLoaded(rainbow)){
    makerainbow();
  }
}
function makerainbow()
{
  w=rainbow.getWidth();
  for (var pixel of rainbow.values()) 
  {
    x=pixel.getX();
    y=pixel.getY();
    
    if(x<w/7)
        pixel.setRed(255);
    else if(x>w/7 && x<2*w/7){
        pixel.setRed(255); 
        pixel.setGreen(127);
    }
     else if(x>2*w/7 && x<3*w/7){
        pixel.setRed(255); 
        pixel.setGreen(255);
    }
     else if(x>3*w/7 && x<4*w/7){ 
        pixel.setGreen(255);
    }
     else if(x>4*w/7 && x<5*w/7){
        pixel.setBlue(255);
    }
     else if(x>5*w/7 && x<6*w/7){
        pixel.setRed(46); 
        pixel.setGreen(43);
        pixel.setBlue(95);
    }
    
    else
      {
        pixel.setRed(139);
        pixel.setBlue(255);
        pixel.setGreen(0);

      }
  }
 var canvas = document.getElementById("can");
  rainbow.drawTo(canvas);
}



function doblur() {
  if (imageIsLoaded(blur)){
    makeblur();
  }
}

function ensureInImage (coordinate, size) {
    // coordinate cannot be negative
    if (coordinate < 0) {
        return 0;
    }
    // coordinate must be in range [0 .. size-1]
    if (coordinate >= size) {
        return size - 1;
    }
    return coordinate;
}


function getPixelNearby (image, x, y, diameter) {
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, image.getWidth());
    var ny = ensureInImage(y + dy, image.getHeight());
    return image.getPixel(nx, ny);
}

function makeblur()
{
    blur.getHeight();

   for (var pixel of blur.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5) {
        var other = getPixelNearby(blur, x, y, 10);
        blur.setPixel(x, y, other);
    }
    else {
        blur.setPixel(x, y, pixel);
    }
   }
var canvas = document.getElementById("can");
  blur.drawTo(canvas);
   
}


function dowindow() 
{
  if (imageIsLoaded(win))
  {
    makewindow();
  }
}
function setBlack(pixel) 
{
 pixel.setRed(0);
 pixel.setGreen(0);
 pixel.setBlue(0);
 return pixel;
}

function makewindow(){
    var w = win.getWidth();
    var h = win.getHeight();
    var thickness=10;
    for (var pixel of win.values())
    {
        var x = pixel.getX();
        var y = pixel.getY();
     if (x >= w - thickness)
        setBlack(pixel);
     if(x<w/2 && x>=w/2-thickness)
        setBlack(pixel);
     if(y<h/2 && y>=w/2-thickness)
    setBlack(pixel);
    if (x <= thickness)
     setBlack(pixel);
   if (y >= h - thickness)
    setBlack(pixel);
   if (y <= thickness)
    setBlack(pixel);
}
  var canvas = document.getElementById("can");
  win.drawTo(canvas);
}












