
new_status="";
object=[];
function preload(){

}
function setup(){
canvas=createCanvas(400,400);
canvas.center();
video=createCapture(VIDEO);
video.hide();
objectdetector=ml5.objectDetector("cocossd",modelLoaded);
}
function draw(){
image(video,0,0,400,400);
if (new_status!=""){
    objectdetector.detect(video,gotResult);
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="Status: Object Detected";  
        document.getElementById("number_of_objects").innerHTML="number of objects detected : "+object.length;
        fill("red");
        percent= floor(object[i].confidence * 100);
        text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
        noFill();
        stroke("yellow");
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
    }
}
}
function modelLoaded(){
    console.log("Model is Loaded");
    new_status="true";
    document.getElementById("status").innerHTML="Status: Detecting Objects";
   
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;

    }
}
