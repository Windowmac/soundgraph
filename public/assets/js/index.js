import loadPlaylist from "./play/loadPlaylist.js";
import applyRecord from "./applyRecord.js";

let isInit = false;
let audioCtx;

if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  const constraints = { audio: true };
  let chunks = [];

  const onSuccess = (stream) => {
    applyRecord(stream, chunks);
  };

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, (err) => {
    console.log(err);
  });

  const playBtn = document.getElementById('play');
  playBtn.addEventListener('click', () => {
    const sectionEl = document.getElementById('section');
    sectionEl.parentNode.removeChild(sectionEl);
    loadPlaylist('', isInit, audioCtx);
  });

} else {
  console.log('get user media is not supported on your browser!');
};
