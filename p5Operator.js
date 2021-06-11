class p5Operator {
    constructor() {
        this.stage = 0;
        this.camOn = false;
        this.loaded = 0;
        this.button = 'start';
        this.released = false;
        this.hover = false;
        this.soundPlayed = false;
    }

    operation() {
        switch (this.stage) {
            
            case 0 :       
                imageMode(CENTER);
                image(bg1,width/2,height/2, width, height);
                if(this.hover) {
                    image(imgFullH, width/2, height*4/5, width/30,width/30);
                } else {
                    image(imgFull, width/2, height*4/5, width/30,width/30);
                }
                // this.loaded++;                
                
                if(this.loaded>= 40) {
                    this.stage++;
                }                
            break;

            case 1 : 
                if(!this.soundPlayed) {                                     
                    voice2.play();
                    this.soundPlayed = true;
                }
                 
                image(bg2,width/2,height/2, width, height);     

                if(!voice2.isPlaying() && this.soundPlayed) {                    
                    this.button = 'next';
                    if(this.hover) {
                        image(imgNextH, width/2, height/2+60, width/20,width/20);
                    } else {
                        image(imgNext, width/2, height/2+60, width/20,width/20);
                    }
                } else {                
                    image(imgLoading, width/2, height/2+60, 100,100);
                }
                
            break;

            case 2: //
                voice2.stop();
                if(!this.soundPlayed) {                    
                    voice3.play();
                    this.soundPlayed = true;
                }
                image(bg3,width/2,height/2, width, height);
                if(!this.camOn) {
                    startVideo();
                    video.style.cssText = "display:block; top:60%; left:50%; transform:translate(-50%,-50%)"
                    canvas.style.cssText= "display:block; top:60%; left:50%; transform:translate(-50%,-50%)"
                    this.camOn = !this.camOn;
                }                 
                if(!voice3.isPlaying() && camLoaded && this.soundPlayed) {
                    this.button = 'camOkay';
                    if(this.hover) {
                        image(imgNextH, width*12/13, height*12/13, width/20,width/20);
                    } else {
                        image(imgNext, width*12/13, height*12/13, width/20,width/20);
                    } 
                }      
            break;

            case 3: //
                voice3.stop();
                if(!this.soundPlayed) {                    
                    voice4.play();
                    this.soundPlayed = true;
                }
                video.style.cssText = "display:none;"
                canvas.style.cssText= "display:none;"
                image(bg4,width/2,height/2, width, height);      
                
                // if(!voice4.isPlaying() && this.soundPlayed) {                    
                //     this.button = 'next';
                //     if(this.hover) {
                //         image(imgNextH, width/2, height/2+60, width/20,width/20);
                //     } else {
                //         image(imgNext, width/2, height/2+60, width/20,width/20);
                //     }
                // } else {                
                //     image(imgLoading, width/2, height/2+60, 100,100);
                // }
                image(imgLoading, width/2, height/2+60, 100,100);
                if(this.soundPlayed && !voice4.isPlaying()) {
                    this.stage++;
                    this.soundPlayed = false;
                    this.button = "";
                }
                
            break;

            case 4: //
                if(!this.soundPlayed) {                    
                    voice5.play();
                    this.soundPlayed = true;
                }
                image(bg5,width/2,height/2, width, height);         

                if(!voice5.isPlaying() && this.soundPlayed) {                    
                    this.button = 'next';
                    if(this.hover) {
                        image(imgNextH, width/2, height/2+60, width/20,width/20);
                    } else {
                        image(imgNext, width/2, height/2+60, width/20,width/20);
                    }
                } else {                
                    image(imgLoading, width/2, height/2+60, 100,100);
                }
            break;

            case 5:
                voice5.stop();
                this.button = 'play';
                image(bg6,width/2,height/2, width, height);           
                if(!playing)                 
                if(this.hover) {
                    image(imgNextH, (width-video.width)/2, height*14/15, width/33,width/33);
                } else {
                    image(imgNext, (width-video.width)/2, height*14/15, width/33,width/33);
                }
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
                    this.soundPlayed = false;
                }
            break;

            case 6: //     
                if(!this.soundPlayed) {                    
                    voice6.play();
                    this.soundPlayed = true;
                }  
                
                if(this.soundPlayed && !voice6.isPlaying()) {
                    this.stage++;
                }

                stopVideo();
                videotest.pause();
                videotest.hide();
                video.style.cssText = "display:none";
                canvas.style.cssText = "display:none";
                image(bg7,width/2,height/2, width, height);
                image(imgLoading, width/2, height/2+60, 100,100);
                

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
            case 'start':
                if(this.hover == true) {
                    requestFullScreen(elem);
                    this.stage++;
                    this.button = "";
                }
            break;

            case 'next':
                if (this.hover == true) {
                    this.stage++;
                    this.soundPlayed = false;
                    this.button = "";
                }
            break;

            case 'camOkay':
                if (this.hover == true && camLoaded) {
                    this.stage++;
                    this.soundPlayed = false;
                    this.button = "";
                }
            break;

            case 'play':
                if (this.hover == true && camLoaded) {
                    videotest.play();
                    playing = true;
                    this.button = "";                    
                    this.soundPlayed = false;
                    this.button = "";
                }
            break;

            case 'refresh':
                if (this.hover == true) {
                    window.location.reload();
                }
            break;
        }       
    }

    checkHover() {
        let bts = ['camOkay', 'refresh'];
        if(bts.includes(this.button)) {
            if(dist(mouseX, mouseY, width*12/13, height*12/13) < width/40) {
                this.hover = true;
            } else {
                this.hover = false;
            }
        } else if(this.button == 'play') {
            if(dist(mouseX, mouseY, (width-video.width)/2, height*12/13) < width/66) {
                this.hover = true;
            } else {
                this.hover = false;
            }
        } else if(this.button == 'start') {
            if(dist(mouseX, mouseY, width/2, height*4/5) < width/60) {
                this.hover = true;
            } else {
                this.hover = false;
            }
        } else if(this.button == 'next') {
            if(dist(mouseX, mouseY, width/2, height/2+60) < width/60) {
                this.hover = true;
            } else {
                this.hover = false;
            }
        }
    }
}

function keyPressed() {
    if(key == 'n') {
        oper.stage++; 
        this.soundPlayed = false;
    }    
    if(key == 'f') oper.released = true;
}