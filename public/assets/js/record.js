import loadPlaylist from "./play/loadPlaylist.js";
import sendBlobForm from "./play/sendBlobForm.js";

const record = (stream, chunkArr, isInit, audioCtx) => {
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
    console.log('the blob is: ', blob);
    const blobUrl = URL.createObjectURL(blob);
    if(document.getElementById('rec-audio')){
      document.getElementById('rec-audio').parentNode.removeChild(document.getElementById('rec-audio'));
    }
    const audioEl = document.createElement('audio');
    audioEl.id = 'rec-audio';
    audioEl.src = blobUrl;
    document.body.appendChild(audioEl);

    sendBlobForm(blob, clipName);

    const sectionEl = document.getElementById('section');
    sectionEl.parentNode.removeChild(sectionEl);
    loadPlaylist(blob, isInit, audioCtx);
  };

  recordBtn.addEventListener('mousedown', (event) => {
    if (recordBtn.dataset.held === 'false') {
      recordBtn.dataset.held = 'true';
      startRecord();
    }
  });

  recordBtn.addEventListener('mouseup', () => {
    recordBtn.dataset.held === 'false';
    stopRecord();
  });

};

export default record;
