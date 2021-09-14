import play from "./play.js";
import record from "./record.js";

let audioCtx;

if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  const constraints = { audio: true };
  let chunks = [];

  const onSuccess = (stream) => {
    record(stream, chunks);
  };

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, (err) => {
    console.log(err);
  });

  const playBtn = document.getElementById('play');
  playBtn.addEventListener('click', () => {
    play();
  });
  
} else {
  console.log('get user media is not supported on your browser!');
};
