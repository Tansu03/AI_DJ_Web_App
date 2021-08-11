song="";
LeftwristX=0;
RightwristX=0;
LeftwristY=0;
RightwristY=0;
scoreRightwrist=0;
scoreLeftWrist=0;

function preload()
{
   song= loadSound("music.mp3");
}
 
function setup()
{
   canvas= createCanvas(500,500);
   canvas.center();
   video= createCapture(VIDEO);
   video.hide();
   poseNet= ml5.poseNet(video, modelLoaded);
   poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Posenet is Inizialized");
}
function draw()
{
    image(video, 0, 0, 500, 500);
    fill('#FF0000');
    stroke('FF0000');
    if(scoreRightwrist>0.2)
    {
    circle(RightwristX, RightwristY,20)
    if(RightwristY>0 && RightwristY <=100)
    {
        document.getElementById("speed_btn").innerHTML="Speed=0.5";
        song.rate(0.5);
    }
    else if(RightwristY>100 && RightwristY <=200)
    {
        document.getElementById("speed_btn").innerHTML="Speed=1";
        song.rate(1);
    }
    else if(RightwristY>200 && RightwristY<=300)
    {
        document.getElementById("speed_btn").innerHTML="Speed=1.5";
        song.rate(1.5);
    }
    else if(RightwristY>300 && RightwristY<=400)
    {
        document.getElementById("speed_btn").innerHTML="Speed=2";
        song.rate(2);
    }
    else if(RightwristY>400 && RightwristY<=500)
    {
        document.getElementById("speed_btn").innerHTML="Speed=2.5";
        song.rate(2.5);
    }
}
    if(scoreLeftWrist>0.2)
    {
    circle(LeftwristX,LeftwristY,20);
    InNumberLeftWristY= Number(LeftwristY);
    remove_decimals= floor(InNumberLeftWristY);
    volume= remove_decimals/500;
    document.getElementById("volume_btn").innerHTML="Volume ="+volume;
    song.setVolume(volume);
    }
}


function gotPoses(results)
{
    if (results.length > 0)
    {
        scoreRightwrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("scoreRightwrist"+scoreRightwrist);
        console.log("scoreLeftWrist"+scoreLeftWrist);
        console.log(results);
        LeftwristX= results[0].pose.Leftwrist.x;
        LeftwristY= resuluts[0].pose.Leftwrist.y;
        console.log("LeftwristX="+LeftwristX+"LeftwristY="+LeftwristY);
        RightwristX= results[0].pose.Rightwrist.x;
        RightwristY= results[0].pose.Rightwrist.y;
        console.log("RightwristX="+RightwristX+"RightwristY="+RightwristY);
    }


}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

