var mimg;
var cimg;
var imimg;
var ieimg;
var enimg;
var seimg;
var eximg;

function uploadMainImage(){
  var can1 = document.getElementById("can1");
  var imgfile = document.getElementById("mimgfile")
  mimg = new SimpleImage(imgfile);
  mimg.drawTo(can1);
}

function uploadToHideImage(){
  var can2 = document.getElementById("can2");
  var imgfile = document.getElementById("cimgfile")
  cimg = new SimpleImage(imgfile);
  cimg.drawTo(can2);
}

function front4bits(colorvalue){
  var x = Math.floor(colorvalue/16) * 16;
  return x;
}
function last4bits(colorvalue){
  var x = colorvalue/16;
  return x;
}

function generateIMI(){
  imimg = mimg;
  var can3 = document.getElementById("can3");
  for(var px of imimg.values()){
    px.setRed(front4bits(px.getRed()));
    px.setBlue(front4bits(px.getBlue()));
    px.setGreen(front4bits(px.getGreen()));
  
  }
  imimg.drawTo(can3);
}

function generateIHI(){
  ieimg = cimg;
  var can4 = document.getElementById("can4");
  for(var px of ieimg.values()){
    px.setRed(last4bits(px.getRed()));
    px.setBlue(last4bits(px.getBlue()));
    px.setGreen(last4bits(px.getGreen()));
  
  }
  ieimg.drawTo(can4);
}

function composite(){
  var can5 = document.getElementById("can5");
  enimg = new SimpleImage(ieimg.getWidth(),ieimg.getHeight()); 
  
  for(var px of enimg.values()){
    var x = px.getX();
    var y = px.getY();
    var mp = imimg.getPixel(x,y);
    var ep = ieimg.getPixel(x,y);
    px.setRed(mp.getRed() + ep.getRed());
    px.setBlue(mp.getBlue() + ep.getBlue());
    px.setGreen(mp.getGreen() + ep.getGreen());
  }
  
  enimg.drawTo(can5);
  seimg = new SimpleImage(enimg);
}

function selectfor(){
  var can6 = document.getElementById("can6");
  
  seimg.drawTo(can6);
  
}

function reset(){
  mimg=cimg=imimg=ieimg=enimg=null;
}

function uploadencryptedimage(){
  
  var can6 = document.getElementById("can6");
  var imgfile = document.getElementById("enfile");
  seimg = new SimpleImage(imgfile);
  seimg.drawTo(can6);
}

function extract(){
  var eximg = new SimpleImage(seimg.getWidth(),seimg.getHeight());
  
  var can7 = document.getElementById("can7");
  for(var px of eximg.values())
  {
    var x = px.getX();
    var y = px.getY();
    var ep = seimg.getPixel(x,y);
    px.setRed((ep.getRed()%16)*16);
    px.setBlue((ep.getBlue()%16)*16);
    px.setGreen((ep.getGreen()%16)*16);
  }
  eximg.drawTo(can7);
}