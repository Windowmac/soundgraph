import loadPlaylist from "./play/loadPlaylist.js";

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
    // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // const soundBuffer = await blob.arrayBuffer();
    // const decoded = await audioContext.decodeAudioData(soundBuffer);
    // const primaryGainControl = audioContext.createGain();
    // primaryGainControl.gain.setValueAtTime(0.5, 0);

    // const playSound = async () => {

    //   const audioSourceNode = audioContext.createBufferSource();
    //   audioSourceNode.buffer = decoded;
  
    //   audioSourceNode.connect(primaryGainControl);
  
    //   primaryGainControl.connect(audioContext.destination);
    //   audioSourceNode.start();
    // }

    // document.body.addEventListener('click', () => {
    //   playSound();
    // })

    // const fd = new FormData();
    // fd.append('newSound', blob, `${clipName}.ogg`);

    // const response = await axios.post('/.netlify/functions/saveSoundDoc',  fd, {
    //   headers: {'Content-Type': 'multipart/form-data'}
    // }).catch(err => {console.log(err)});

    // console.log('the response is: ', response);
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
