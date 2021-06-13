let colorsForEmotion = {
    무표정: 'rgb(99, 110, 114)',
    웃음: 'rgb(255, 118, 117)',
    슬픔: 'rgb(9, 132, 227)',
    화남: 'rgb(163, 122, 18)',
    공포: 'rgb(225, 112, 85)',
    혐오: 'rgb(0, 184, 148)',
    놀람: 'rgb(162, 155, 254)'
}

let emotionKo = ["무표정", "웃음", "슬픔", "화남", "공포", "혐오", "놀람"];

function drawSection() {
    push();
    stroke(173, 173, 173, 127);
    strokeWeight(5);
    noFill();
    // rect(width - video.width, video.height, video.width-2, height - video.height-10);
    line(width - video.width-5,0,width-video.width-5, height);
    line(width - video.width-5, video.height-2, width, video.height-2);
    line(width - video.width-5, video.height + 140, width, video.height + 140);
    pop();
}

function drawChart() {
    push();    
    translate(width-video.width, video.height);
    noStroke();
    strokeCap(ROUND);
    let areaW = video.width;
    let areaH = height - video.height;
    let garo = video.width - 30;
    let sero = height - video.height - 170;
    if(nowValues.length != 0) {
        for (let i=0; i<emotions.length; i++) {
            let nowExp = emotionKo[i];
            let nowScore = Math.round(nowValues[i] * 100, 1)
            fill(colorsForEmotion[nowExp]);
            rect(78, 165+(i*sero/emotions.length), (garo-80) * nowScore/100 ,10);
            text(nowExp, 15, 175+(i*sero/emotions.length));
        }

        image(eval("img"+maxEmotion), areaW/2, areaH*0.13, areaW/10, areaW/10);
    } else if(camLoaded) {
        fill(0);
        textSize(15);
        textAlign(CENTER);
        text("얼굴을 인식할 수 없습니다", areaW/2, areaH/2+70);
    } 

    // if(playing && tester.nowTest) {
    //     fill(0);
    //     textAlign(CENTER);
    //     textSize(15)
    //     text("표정을 테스트하고 있습니다", (areaW/4)+20, areaH/6);
    //     image(imgTesting, areaW*3/4, (areaH/6)-5, width/20,width/20);
    // }   
    pop();

    if(playing) {
        strokeWeight(10);
        strokeCap(ROUND);
        stroke(212, 212, 212); 
        let fullLen = width*0.64
        line(width*0.05, height*0.87, (width*0.05) + fullLen, height*0.87);

        stroke(0);
        let nowPoint = videotest.time() / videotest.duration();
        if(videotest.time() >= 0) {
            line(width*0.05, height*0.87, (width*0.05) + (fullLen*nowPoint) ,height*0.87);
        }
    }
}

function drawBar() {

}

class Tester {
    constructor() {
        this.testTime = [38,52,69,96,114]; //type:array [s1,s2, s3]
        this.duration = 5; 
        // this.answers =  //type:array ex) ['neutral', 'happy', 'surprised' ...]
        this.stage = 0;
        this.nowTest = false;
        this.result = {
            stage1: [[],0],
            stage2: [[],0],
            stage3: [[],0],
            stage4: [[],0],
            stage5: [[],0],
        };
        this.criterion = 0.6;
        this.rightAns = {
            stage1: [1],
            stage2: [6],
            stage3: [0],
            stage4: [1],
            stage5: [0,3]
        }
        this.finalResult = "";
    }

    doTest () {
        if(this.testTime[this.stage] == (int(videotest.time()))) {
            this.nowTest = true;         
        }
        if(this.nowTest) {
            const nowStage = 'stage'+str(this.stage + 1)
            if(frameCount % 5 == 0 && nowValues.length != 0) {
                for (let i=0; i<nowKeys.length; i++) {                    
                    if(!this.result[nowStage][0][i]) {
                        this.result[nowStage][0][i] = nowValues[i];
                    } else {
                        this.result[nowStage][0][i] += nowValues[i];
                    }
                }
                this.result[nowStage][1] += 1;
            }
                     
            if(videotest.time() > this.testTime[this.stage]+this.duration) {
                this.nowTest = false;
                if(this.stage != 5) {
                    this.stage++;
                }
            }
        }
    }

    makeScore() {
        for(let prop in this.result) {
            const values = this.result[prop][0];
            const testNum = this.result[prop][1];
            let max = Math.max(...values);
            let maxIndex = values.indexOf(max);

            if(this.rightAns[prop].includes(maxIndex) && max/testNum >= this.criterion) {
                this.finalResult += "o";
            } else {
                this.finalResult += "x";
            }
        }
    }
}


