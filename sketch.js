let p5Canvas;
let imgNext,bg1,bg2,bg3,bg4,bg5,bg6,bg7, imgFull, imgFullH, imgShare, imgShareH, imgDown, imgDownH, imgRef, imgRefH;
let voice1,voice2,voice3,voice4,voiceMain;
let imgangry, imgdisgusted, imgfearful, imghappy, imgneutral, imgsad, imgsurprised;
// let W = windowWidth*(0.65);
// let H = W*9/16;
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
alert("PC 크롬 환경에서 이용해주세요!");

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
  
  imgShare = loadImage("./assets/icons/share.png");
  imgShareH = loadImage("./assets/icons/shareH.png");
  imgDown = loadImage("./assets/icons/save.png");
  imgDownH = loadImage("./assets/icons/saveH.png");
  imgRef = loadImage("./assets/icons/back.png");
  imgRefH = loadImage("./assets/icons/backH.png");

  imgangry = loadImage("./assets/emojis/angry.png");
  imgdisgusted = loadImage("./assets/emojis/disgusted.png");
  imgfearful = loadImage("./assets/emojis/fearful.png");
  imghappy = loadImage("./assets/emojis/happy.png");
  imgneutral = loadImage("./assets/emojis/neutral.png");
  imgsad = loadImage("./assets/emojis/sad.png");
  imgsurprised = loadImage("./assets/emojis/surprised.png");

  bg0 = loadImage("./assets/bgImages/newSlides/001.jpg");
  bg1 = loadImage("./assets/bgImages/newSlides/002.jpg");
  bg2 = loadImage("./assets/bgImages/newSlides/003.jpg");
  bg3 = loadImage("./assets/bgImages/newSlides/004.jpg");
  bg4 = loadImage("./assets/bgImages/newSlides/005.jpg");

  voice1 = loadSound("./assets/voices/01.mp3");
  voice2 = loadSound("./assets/voices/02.mp3");
  voice3 = loadSound("./assets/voices/03.mp3");
  voice4 = loadSound("./assets/voices/04.mp3");  
  voiceMain = loadSound("./assets/voices/main.mp3"); 
  let vol = 0.2;
  voice1.setVolume(vol);
  voice2.setVolume(vol);
  voice3.setVolume(vol);
  voice4.setVolume(vol);
  voiceMain.setVolume(vol);
  

  videotest.id('main_video');  
  videotest.size(windowWidth*0.65,windowWidth*0.65*9/16); 
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

