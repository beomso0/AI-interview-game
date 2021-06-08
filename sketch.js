let p5Canvas;
let imgNext,imgWel, imgCheck1, imgCheck2, imgStart,imgTest, imgDone;
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
  videotest = createVideo('./assets/mainVideo.webm'); 
  imgNext = loadImage("./assets/nextButton3.png");
  imgPlay = loadImage("./assets/playGray.png");

  imgWel = loadImage("./assets/bgImages/001.jpg");
  imgCheck1 = loadImage("./assets/bgImages/002.jpg");
  imgCheck2 = loadImage("./assets/bgImages/003.jpg");
  imgStart = loadImage("./assets/bgImages/004.jpg");
  imgTest = loadImage("./assets/whiteBackground.jpg");
  imgDone  = loadImage("./assets/bgImages/007.jpg");
  // imgResult = loadImage("./assets/bgImages/009.jpg");

  imgLoading = loadImage("./assets/loading1.gif");
  imgTesting = loadImage("./assets/loading-3-dots.gif");

  console.log('loding done');
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


