const recordBtn = document.getElementById('record');

let audioCtx;

if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  const constraints = { audio: true };
  let chunks = [];

  const onSuccess = (stream) => {
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
      console.log('made line 28!', value.data);
      chunks.push(value.data);
    };

    mediaRecorder.onstop = async () => {
      console.log('data available after MediaRecorder.stop() called.');
      const clipName = prompt(
        'Enter a name for your sound clip?',
        'My unnamed clip'
      );
      const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });

      const response = await fetch('./.netlify/functions/writeDb', {
        method: 'POST',
        body: JSON.stringify({
            name: clipName,
            binData: blob.toString()
        })
      }).catch((err) => {
        console.log(err);
      });

      console.log('the response is: ', response);
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

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, (err) => {
    console.log(err);
  });
} else {
  console.log('get user media is not supported on your browser!');
}
