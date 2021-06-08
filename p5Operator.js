class p5Operator {
    constructor() {
        this.stage = 0;
        this.camOn = false;
        this.loaded = 0;
        this.button = 'next';
    }

    operation() {
        switch (this.stage) {
            case 0 :
                imageMode(CENTER);
                image(imgWel,width/2,height/2, width, height);
                image(imgNext, width*12/13, height/2, width/20,width/20);
              break;

            case 1:
                this.button = 'camOkay';
                image(imgCheck2,width/2,height/2, width, height);
                image(imgNext, width*12/13, height/2, width/20,width/20);
                if(!this.camOn) {
                    startVideo();
                    video.style.cssText = "display:block; top:50%; left:50%; transform:translate(-50%,-50%)"
                    canvas.style.cssText= "display:block; top:50%; left:50%; transform:translate(-50%,-50%)"
                    this.camOn = !this.camOn;
                }               
            break;

            case 2:
                this.button = 'play';
                image(imgTest,width/2,height/2, width, height);
                if(!playing) image(imgPlay, (width-video.width)/2, height*14/15, width/30,width/30);
                video.style.cssText = "display:block; top:0%; right:0%; "
                canvas.style.cssText= "display:block; top:0%; right:0%; "
                drawSection();
                // showScore();
                drawChart();
                if(!showing) videotest.show();
                if(playing) {
                    tester.doTest();
                }               
                
                // if(!playing&& camLoaded&&nowKeys.length!=0) { 
                //       videotest.show();   
                //       window.onload = videotest.play();
                //       playing = true;
                // }
                if(videotest.time() >= videotest.duration()) {
                    this.stage++;
                }
            break;

            case 3:
                videotest.pause();
                videotest.hide();
                video.style.cssText = "display:none";
                canvas.style.cssText = "display:none";
                image(imgDone,width/2,height/2, width, height);
                image(imgLoading, width/2, height/2+60, 200,200);
                this.loaded++;

                if(this.loaded>= 75) {
                    this.stage++;
                }

                if(finalResult == "") {
                    tester.makeScore();
                    console.log(finalResult);
                }

                if(!pageLoaded) {
                    finalPage = loadImage("./assets/resultPages/" + finalResult +".png");
                    pageLoaded = !pageLoaded;
                }              
            break;

            case 4:
                image(finalPage,width/2,height/2, width, height);
            break;
        }
    }

    nextStep() {
        switch(this.button) {
            case 'next':
                if (dist(mouseX, mouseY, width*14/15, height/2) < width/40) {
                    this.stage++;
                }
            break;

            case 'camOkay':
                if (dist(mouseX, mouseY, width*14/15, height/2) < width/40 && camLoaded) {
                    this.stage++;
                }
            break;

            case 'play':
                if (dist(mouseX, mouseY, (width-video.width)/2, height*12/13) < width/60 && camLoaded) {
                    videotest.play();
                    playing = true;
                    this.button = "";
                }
            break;
        }        
    }
}

function keyPressed() {
    if(key == 'n') oper.stage++;
}