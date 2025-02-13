let mic, recorder, soundFile, vSlider, recBool, cnv, cnvDiv, statusTag, questionsTag;
let startBtn, stopBtn, nextBtn;
let ctr = 1;

// // One-liner to resume playback when user interacted with the page.
// document.querySelector('button').addEventListener('click', function() {
//     context.resume().then(() => {
//       console.log('Playback resumed successfully');
//     });
//   });


let questionsDict ={
    1: "How did LuminAI’s responses influence your movement choices in ways that deviated from your usual dance patterns?",
    2: "In what ways, if any, did LuminAI influence your choice of movements or sequences?",
    3: "How would you describe the impact of LuminAI on your movement choices?",
    4: "Did LuminAI facilitate any moments of heightened meaning or expressiveness in your improvisation? If so, how?",
    5: "Did LuminAI generate any movements or interactions that were unexpected? If so, how did you respond?",
    6: "Did LuminAI introduce any movement patterns that led your improvisation in an unanticipated direction? Give examples and explain.",
    7: "Describe your experience improvising with LuminAI. What strategies did you use to adapt your movement style or decision-making to engage dynamically with LuminAI’s responses?",
    8: "Can you reflect on any challenges you faced during the interaction with LuminAI? How did you navigate or overcome them?",
    9: "Can you describe how you established a dialogue or interaction with LuminAI through movement?",
    10: "How did improvising with LuminAI differ from dancing with a human partner, and what cognitive or creative adjustments did it require of you as a performer?",
    11: "What emotions or states of mind did you experience while co-creating movements with LuminAI?",
    12: "Did using LuminAI affect your level of engagement or motivation during the improvisation? In what way?",
    13: "How would you describe LuminAI’s level of engagement throughout your improvisation?",
    14: "Can you describe a moment when you felt particularly connected or disconnected from LuminAI during the dance? What do you think influenced that feeling of connection or disconnection?"
}


function setup() {
    getAudioContext().suspend();

    cnv = createCanvas(800, 400);
    cnvDiv = select("#canvas");
    cnv.id('cnv');
    cnv.parent(cnvDiv);
    background(50);
    textSize(30);
    textWrap(WORD);
    fill("white");




    recBool  = false;

    startBtn = select("#start");
    startBtn.mousePressed(record);
    statusTag = select("#status");
    questionsTag = select("#qs")

    stopBtn = select("#stop");
    stopBtn.mousePressed(stop);

    nextBtn = select("#next");
    nextBtn.mousePressed(next);
    nextBtn.hide();

    
    mic = new p5.AudioIn();
    mic.start();
    recorder = new p5.SoundRecorder();
    recorder.setInput(mic);
    soundFile = new p5.SoundFile();
}

function draw(){
    background(50);
    let qstr = 'Question '+ ctr.toString() +":"
    text(qstr, width/20, 50);
    text(questionsDict[ctr], width/20, height/4, width-50);
    // console.log(questionsDict[1]);
    // print("Frame:",frameCount)

}

function record(){
    if (mic.enabled) {
        statusTag.html("Now recording, click 'STOP' when done...");
        recorder.record(soundFile);
        recBool = true;
        
    }

}

function stop(){
    if (recBool) {
        statusTag.html("Recording stopped, click 'Next' to answer next question...");
        nextBtn.show()
        recorder.stop();
        recBool = false;
        
    }

}

function next(){
    // soundFile.play();
    let fnm = 'Q'+ ctr.toString()+".wav"
    save(soundFile, fnm);
    nextBtn.hide();
    statusTag.html("Click 'START' to record...");
    ctr += 1;

}

function mousePressed() {
    userStartAudio();
}

