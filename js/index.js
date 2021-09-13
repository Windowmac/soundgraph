const recordBtn = document.getElementById('record');

let audioCtx;

if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
  
    const constraints = { audio: true };
    let chunks = [];

    let onSuccess = (stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        const startRecord = (stream) => {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            console.log("recorder started");
        }
    
        const stopRecord = () => {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            console.log("recorder stopped");
        }
    
        recordBtn.addEventListener('mousedown', (event) => {
            if(recordBtn.dataset.held === "false"){
                recordBtn.dataset.held = "true";
                startRecord();
            }
        });

        recordBtn.addEventListener('mouseup', () => {
            recordBtn.dataset.held === "false";
            stopRecord();
        })
    }
  
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, (err) => {
        console.log(err);
    });

} else {
    console.log('get user media is not supported on your browser!');
};