let p5Canvas;
let imgNext,bg1,bg2,bg3,bg4,bg5,bg6,bg7, imgFull, imgFullH;
let voice1,voice2,voice3,voice4,voice5,voice6;
let W = window.innerWidth*(0.65);
let H = W*9/16;
let playing = false;
let showing = false;
let videotest;
const stage = "start";
let oper;
let tester;
let myFont;
let pageLoaded;
let finalPage;
let whole;
let full = false;

function requestFullScreen(element) {
  // Supports most browsers and their versions.
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

  if (requestMethod) { // Native full screen.
      requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
          wscript.SendKeys("{F11}");
      }
  }
}

var elem = document.body; // Make the body go full screen.

// if(window.confirm("전체화면으로 플레이 하시겠습니까?")) {
//   requestFullScreen(elem);
// }
// alert("크롬 전체화면으로 이용해주세요");

function preload() {
  myFont = loadFont("./assets/BMHANNA_11yrs_ttf.ttf")
  videotest = createVideo('./assets/videos/mainVideo.webm'); 
  imgNext = loadImage("./assets/arrowButton2.png");  
  imgNextH = loadImage("./assets/arrowButton2H.png");
  imgPlay = loadImage("./assets/playGray.png");
  imgLoading = loadImage("./assets/loadingAnis/loading4.gif");
  imgTesting = loadImage("./assets/loadingAnis/loading-3-dots.gif");
  imgFull = loadImage("./assets/fullscreen.png");
  imgFullH = loadImage("./assets/fullscreenH.png");

  bg1 = loadImage("./assets/bgImages/001.jpg");
  bg2 = loadImage("./assets/bgImages/002.jpg");
  bg3 = loadImage("./assets/bgImages/003.jpg");
  bg4 = loadImage("./assets/bgImages/004.jpg");
  bg5 = loadImage("./assets/bgImages/005.jpg");
  bg6 = loadImage("./assets/bgImages/006.jpg");
  bg7 = loadImage("./assets/bgImages/007.jpg");

  voice1 = loadSound("./assets/voices/01.mp3");
  voice2 = loadSound("./assets/voices/02.mp3");
  voice3 = loadSound("./assets/voices/03.mp3");
  voice4 = loadSound("./assets/voices/04.mp3");
  voice5 = loadSound("./assets/voices/05.mp3");
  voice6 = loadSound("./assets/voices/06.mp3");
  

  videotest.id('main_video');  
  videotest.size(W,H); 
  videotest.hide();  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  oper = new p5Operator;
  tester = new Tester();
  frameRate(15);
}

function draw() {
  textFont(myFont);
  // drawSection();
  oper.operation();
  oper.checkHover();
  // if(!playing&& camLoaded && maxValue != 0 ) {    
  //   window.onload = videotest.play();
  //   playing = true;
  // }

  // if(playing) showScore(), showGuide();

  // t++;

  // if(t>120) {
  //   startVideo();
  // }
}

function mousePressed() {
  oper.nextStep();
  // if(!full) {
  //   requestFullScreen(elem);
  // }
} 

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

