class p5Operator {
    constructor() {
        this.stage = 0;
        this.camOn = false;
        this.loaded = 0;
        this.button = 'start';
        this.released = true;
        this.hover = false;
        this.soundPlayed = false;
        this.hoverWhich = "";
    }

    operation() {
        switch (this.stage) {
            
            case 0 :       
                imageMode(CENTER);
                image(bg0,width/2,height/2, width, height);
                if(this.hover) {
                    image(imgFullH, width/2, height*0.67, width/30,width/30);
                } else {
                    image(imgFull, width/2, height*0.67, width/30,width/30);
                }
            break;

            case 1: //
                if(!this.soundPlayed) {                    
                    voice1.play();
                    this.soundPlayed = true;
                }
                image(bg1,width/2,height/2, width, height);
                if(!this.camOn) {
                    startVideo();
                    video.style.cssText = "display:block; top:60%; left:50%; transform:translate(-50%,-50%)"
                    canvas.style.cssText= "display:block; top:60%; left:50%; transform:translate(-50%,-50%)"
                    this.camOn = !this.camOn;
                }
                if(!camLoaded) {
                    image(imgTesting, width/2, height*0.88, width/20, width/20);
                }                 
                if(!voice1.isPlaying() && camLoaded && this.soundPlayed) {
                    this.button = 'camOkay';
                    if(this.hover) {
                        image(imgNextH, width*12/13, height*12/13, width/20,width/20);
                    } else {
                        image(imgNext, width*12/13, height*12/13, width/20,width/20);
                    } 
                } 
            break;

            case 2: //
                voice1.stop();
                if(!this.soundPlayed) {                    
                    voice2.play();
                    this.soundPlayed = true;
                }
                image(bg2,width/2,height/2, width, height);  
                
                video.style.cssText = "display:none;"
                canvas.style.cssText= "display:none;"

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

            case 3:
                voice2.stop();
                if(!this.soundPlayed) {                    
                    voiceMain.play();
                    this.soundPlayed = true;
                }
                image(bg3,width/2,height/2, width, height);           
                if(!playing && !voiceMain.isPlaying() && this.soundPlayed) {                    
                    this.button = 'play';
                    if(this.hover) {
                        image(imgNextH, (width-video.width)/2, height*0.9, width/33,width/33);
                    } else {
                        image(imgNext, (width-video.width)/2, height*0.9, width/33,width/33);
                    }
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

            case 4: //   
                voiceMain.stop();
                if(!this.soundPlayed) {                    
                    voice3.play();
                    this.soundPlayed = true;
                }  
                
                if(this.soundPlayed && !voice3.isPlaying()) {
                    this.stage++;
                    this.soundPlayed = false;
                }

                stopVideo();
                videotest.pause();
                videotest.hide();
                video.style.cssText = "display:none";
                canvas.style.cssText = "display:none";
                image(bg4,width/2,height/2, width, height);
                image(imgLoading, width/2, height/2+60, 100,100);                

                if(tester.finalResult == "") {
                    tester.makeScore();
                    console.log(tester.finalResult);
                }

                if(!pageLoaded) {
                    finalPage = loadImage("./assets/resultPages/" + tester.finalResult +".png");
                    urlForImg = 'https://shsh.live/assets/resultPages/' + tester.finalResult + '.png';
                    kakaoM['content']['imageUrl'] = urlForImg;
                    pageLoaded = !pageLoaded;
                }              
            break;

            case 5:
                frameRate(60);
                voice3.stop();
                if(!this.soundPlayed) {                    
                    voice4.play();
                    this.soundPlayed = true;
                } 
                this.button = 'final';
                image(finalPage,width/2,height/2, width, height);
                
                let size = 45                
                let butHeight = 0.1
                switch(this.hoverWhich) {                                        
                    case 'share' :
                        image(imgShareH, width*0.88, height*butHeight, width/size,width/size);
                        image(imgDown, width*0.91, height*butHeight, width/size,width/size);
                        image(imgRef, width*0.94,height*butHeight, width/size,width/size);
                    break;

                    case 'down':
                        image(imgShare, width*0.88, height*butHeight, width/size,width/size);
                        image(imgDownH, width*0.91, height*butHeight, width/size,width/size);
                        image(imgRef, width*0.94,height*butHeight, width/size,width/size);
                    break;

                    case 'refresh':
                        image(imgRefH, width*0.94,height*butHeight, width/size,width/size);
                        image(imgShare, width*0.88, height*butHeight, width/size,width/size);
                        image(imgDown, width*0.91, height*butHeight, width/size,width/size);
                    break;

                    default:
                        image(imgShare, width*0.88, height*butHeight, width/size,width/size);
                        image(imgDown, width*0.91, height*butHeight, width/size,width/size);
                        image(imgRef, width*0.94,height*butHeight, width/size,width/size);
                }

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
                }
            break;

            case 'final':
                if (this.hover == true) {
                    switch (this.hoverWhich) {
                        case 'share' :
                            Kakao.Link.sendDefault(kakaoM);
                        break;

                        case 'down':
                            finalPage.save('result', 'jpg');
                        break;

                        case 'refresh':
                            window.location.reload();
                        break;
                    }
                }
            break;
        }       
    }

    checkHover() {
        let butHeight = 0.1
        if(this.button == "camOkay") {
            if(dist(mouseX, mouseY, width*12/13, height*12/13) < width/40) {
                this.hover = true;
            } else {
                this.hover = false;
            }
        } else if(this.button == 'play') {
            if(dist(mouseX, mouseY, (width-video.width)/2, height*0.9) < width/66) {
                this.hover = true;
            } else {
                this.hover = false;
            }
        } else if(this.button == 'start') {
            if(dist(mouseX, mouseY, width/2, height*0.67) < width/60) {
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
        } else if(this.button == "final") {     
            if (dist(mouseX, mouseY,width*0.88, height*butHeight) < width/90) {
                this.hoverWhich = 'share';
                this.hover = true;
            } else if (dist(mouseX, mouseY,width*0.91, height*butHeight) < width/90) {
                this.hoverWhich = 'down';
                this.hover = true;
            } else if (dist(mouseX, mouseY,width*0.94, height*butHeight) < width/90) {
                this.hoverWhich = 'refresh';
                this.hover = true;
            } else {                
                this.hover = false;
                this.hoverWhich = '';
            }
        }
    }
}

function keyPressed() {
    if(key == 'n') {
        oper.stage++; 
        oper.soundPlayed = false;
    }    
    if(key == 'f') oper.released = true;
}