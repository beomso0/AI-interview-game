class p5Operator {
    constructor() {
        this.stage = 0;
        this.camOn = false;
        this.loaded = 0;
        this.button = 'next';
        this.released = false;
    }

    operation() {
        switch (this.stage) {
            case 0 :
                imageMode(CENTER);
                image(bg1,width/2,height/2, width, height);
                image(imgNext, width*12/13, height*12/13, width/20,width/20);
              break;

            case 1 :
                image(bg2,width/2,height/2, width, height);                
                image(imgNext, width*12/13, height*12/13, width/20,width/20);
                image(imgLoading, width/2, height/2+60, 100,100);
            break;

            case 2:
                this.button = 'camOkay';
                image(bg3,width/2,height/2, width, height);
                if(camLoaded) image(imgNext, width*12/13, height*12/13, width/20,width/20);
                if(!this.camOn) {
                    startVideo();
                    video.style.cssText = "display:block; top:60%; left:50%; transform:translate(-50%,-50%)"
                    canvas.style.cssText= "display:block; top:60%; left:50%; transform:translate(-50%,-50%)"
                    this.camOn = !this.camOn;
                }               
            break;

            case 3:
                this.button = 'next';
                video.style.cssText = "display:none;"
                canvas.style.cssText= "display:none;"
                image(bg4,width/2,height/2, width, height);                
                image(imgNext, width*12/13, height*12/13, width/20,width/20);
                image(imgLoading, width/2, height/2+60, 100,100);
            break;

            case 4:
                image(bg5,width/2,height/2, width, height);                
                image(imgNext, width*12/13, height*12/13, width/20,width/20);
                image(imgLoading, width/2, height/2+60, 100,100);
            break;

            case 5:
                this.button = 'play';
                image(bg6,width/2,height/2, width, height);
                if(!playing) image(imgPlay, (width-video.width)/2, height*14/15, width/30,width/30);
                video.style.cssText = "display:block; top:-5px; right:0%; "
                canvas.style.cssText= "display:block; top:-5px; right:0%; "
                drawSection();
                drawChart();
                if(!showing) videotest.show();

                if(playing) {
                    tester.doTest();
                }  

                let threshold = videotest.duration() - 1;

                if(!this.released) {
                    threshold = 45;
                }

                if(videotest.time() >= threshold) {
                    this.stage++;
                }
            break;

            case 6:                
                stopVideo();
                videotest.pause();
                videotest.hide();
                video.style.cssText = "display:none";
                canvas.style.cssText = "display:none";
                image(bg7,width/2,height/2, width, height);
                image(imgLoading, width/2, height/2+60, 100,100);
                this.loaded++;                
                
                if(this.loaded>= 45) {
                    this.stage++;
                }

                if(tester.finalResult == "") {
                    tester.makeScore();
                    console.log(tester.finalResult);
                }

                if(!pageLoaded) {
                    finalPage = loadImage("./assets/resultPages/" + tester.finalResult +".png");
                    pageLoaded = !pageLoaded;
                }              
            break;

            case 7:
                this.button = 'refresh';
                image(finalPage,width/2,height/2, width, height);
            break;
        }
    }

    nextStep() {
        switch(this.button) {
            case 'next':
                if (dist(mouseX, mouseY, width*12/13, height*12/13) < width/40) {
                    this.stage++;
                }
            break;

            case 'camOkay':
                if (dist(mouseX, mouseY, width*12/13, height*12/13) < width/40 && camLoaded) {
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

            case 'refresh':
                if (dist(mouseX, mouseY, width*12/13, height*12/13) < width/40) {
                    window.location.reload();
                }
            break;
        }        
    }
}

function keyPressed() {
    if(key == 'n') oper.stage++;
    if(key == 'f') oper.released = true;
}