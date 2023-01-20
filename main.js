var song=""
var rate=0
var volume2=0
leftWristY=0
rightWristY=0
leftWristX=0
rightWristX=0
var scoreLY=0
var rightElbow=0
var leftElow=0
function  preload(){

    song= loadSound("music.mp3")
}


function setup(){
    canvas= createCanvas(500,400)
    canvas.center()
    video= createCapture(VIDEO)
    video.hide()
    poseNet= ml5.poseNet(video,modelloaded)
    poseNet.on('pose',getposes)
}
function modelloaded(){
console.log("successfully loaded")
}


function pause(){
  
    document.getElementById("controls").pause()
}
function stop(){
    document.getElementById("controls").pause()
    document.getElementById("controls").currentTime = 0;
}
function getposes(results){
    
    if(results.length>0){
        scoreLY=Number(results[0].pose.keypoints[9].score)
        console.log(results)
       
        leftWristX=floor(Number(results[0].pose.leftWrist.x))
        leftWristY=floor(Number(results[0].pose.leftWrist.y))
         rightWristX=floor(Number(results[0].pose.rightWrist.x))
         rightWristY=floor(Number(results[0].pose.rightWrist.y))
        rightElbow= Number(results[0].pose.keypoints[8].score)
        leftElow= Number(results[0].pose.keypoints[7].score)
         console.log("leftX" + leftWristX)
         console.log("leftY" + leftWristY)
         console.log("rightX" + rightWristX)
         console.log("rightY" + rightWristY)
    }
}

function draw(){
    image(video,0,0,500,400)
    fill(255,14,52)
    stroke(255,14,52)
    circle(leftWristX-100,leftWristY-100,50)
     circle(rightWristX,rightWristY-100,50)
    //  if(scoreLY>0.5){
     leftY= leftWristY-100
     volume2 =Math.abs(leftY/500)
     console.log("Volume : " + volume2)
     controls=  document.getElementById("controls")
      document.getElementById("controls").volume=volume2
      document.getElementById("volume2").innerHTML="Volume : " + volume2 

      rightY= rightWristY-100
      
      if(rightY<=50){
        document.getElementById("controls").playbackRate=0.5
      }else if(rightY>=50&&rightY<=100 ){
        document.getElementById("controls").playbackRate=2.5
      }else if(rightY>=100&&rightY<=200 ){
        document.getElementById("controls").playbackRate=2
      }else if(rightY>=200&&rightY<=300 ){
        document.getElementById("controls").playbackRate=1.5
      }else if(rightY<=300 ){
        document.getElementById("controls").playbackRate=1
      }


document.getElementById("speed2").innerHTML="Speed : " + document.getElementById("controls").playbackRate 
    //  }   
if(rightElbow>0.2){
    document.getElementById("controls").pause()
}
document.getElementById("controls").style.display="block"
if(leftElow>0.2){
    document.getElementById("controls").play()
}
}

function  play(){
    // song.setVolume(0.1)
    document.getElementById("controls").style.display="block"
   
    document.getElementById("controls").play()

     controls.playbackRate=1

   
}