const video = document.getElementById('video');
const canvas = document.getElementById('drawing');
const screenRatio = 0.25;
video.width = window.innerWidth * screenRatio ;
video.height = video.width * 7/9;
canvas.width = video.width;
canvas.height = video.height;
let expression; 
const emotions = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];
let nowValues = [];
let nowKeys = [];
let maxEmotion = 'unknown';
let maxValue = 0;
let detections;
let camLoaded = false;

Promise.all([
  faceapi.nets.tinyFaceDetector.load('./models'),
  faceapi.nets.faceLandmark68Net.load('./models'),
  faceapi.nets.faceRecognitionNet.load('./models'),
  faceapi.nets.faceExpressionNet.load('./models')
])

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  // const canvas = faceapi.createCanvasFromMedia(video)
  // canvas.className = "drawing";
  // document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()    
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    // catchMax();
    try {
      expression = detections[0].expressions;
      nowValues = Object.values(expression);
      nowKeys = Object.keys(expression);
    } catch(e) {
      nowValues = [];
    }
    camLoaded = true;
  }, 100)
})

function catchMax() {  
  maxValue = 0;
  try {
    expression = detections[0].expressions
    emotions.forEach(emotion => {
      let now = expression[emotion];
      if(now > maxValue) {
        maxValue = int(now*100);
        maxEmotion = emotion;
      }
    });
  } catch(e) {
    maxEmotion = 'unknown';
  }  
  
  return([str(maxEmotion),maxValue]);
}