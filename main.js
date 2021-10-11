video = "";
objects = "";
object = "";
status1 = "";

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status1 != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if (objects[i].label == object) {
                document.getElementById("found").innerHTML = object + " found"
            }
            else {
                document.getElementById("found").innerHTML = object + " not found"
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object = document.getElementById("object").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
    video.loop()
    video.speed(1);
    video.volume(0);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
    }
    objects = result;
}