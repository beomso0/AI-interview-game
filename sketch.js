let p5Canvas;
let imgNext,bg1,bg2,bg3,bg4,bg5,bg6,bg7;
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


alert("크롬 전체화면으로 이용해주세요");

function preload() {
  myFont = loadFont("./assets/BMHANNA_11yrs_ttf.ttf")
  videotest = createVideo('./assets/videos/mainVideo.webm'); 
  imgNext = loadImage("./assets/nextButton3.png");
  imgPlay = loadImage("./assets/playGray.png");
  imgLoading = loadImage("./assets/loadingAnis/loading4.gif");
  imgTesting = loadImage("./assets/loadingAnis/loading-3-dots.gif");

  bg1 = loadImage("./assets/bgImages/001.jpg");
  bg2 = loadImage("./assets/bgImages/002.jpg");
  bg3 = loadImage("./assets/bgImages/003.jpg");
  bg4 = loadImage("./assets/bgImages/004.jpg");
  bg5 = loadImage("./assets/bgImages/005.jpg");
  bg6 = loadImage("./assets/bgImages/006.jpg");
  bg7 = loadImage("./assets/bgImages/007.jpg");

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
} 


