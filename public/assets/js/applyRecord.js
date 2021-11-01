import loadPlaylist from "./load/loadPlaylist.js";
import sendBlobForm from "./sendBlobForm.js";

const applyRecord = (stream, chunkArr, isInit, audioCtx) => {
  const recordBtn = document.getElementById('record');
  const mediaRecorder = new MediaRecorder(stream);

  const startRecord = () => {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log('recorder started');
  };

  const stopRecord = () => {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log('recorder stopped');
  };

  mediaRecorder.ondataavailable = (value) => {
    chunkArr.push(value.data);
  };

  mediaRecorder.onstop = async () => {
    console.log('data available after MediaRecorder.stop() called.');
    const clipName = prompt('enter a clipname', 'audio-clip');

    const blob = new Blob(chunkArr, { type: 'audio/ogg; codecs=opus' }); //this works
 
    if(document.getElementById('rec-audio')){
      document.getElementById('rec-audio').parentNode.removeChild(document.getElementById('rec-audio'));
    }

    sendBlobForm(blob, clipName).then(() => {
      const sectionEl = document.getElementById('section');
      sectionEl.parentNode.removeChild(sectionEl);
      
      loadPlaylist(blob, isInit, audioCtx);
    });
  };
  recordBtn.addEventListener('mousedown', () => {
    startRecord();
    recordBtn.addEventListener('mouseup', () => stopRecord());
  });
};

export default applyRecord;
