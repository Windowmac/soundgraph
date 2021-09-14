const record = (stream, chunkArr) => {
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
      const clipName = prompt(
        'Enter a name for your sound clip?',
        'My unnamed clip'
      );
      const blob = new Blob(chunkArr, { type: 'audio/ogg; codecs=opus' });

      const response = await fetch('/.netlify/functions/saveSoundDoc', {
        method: 'POST',
        body: JSON.stringify({
            name: clipName,
            binData: blob.toString()
        })
      }).then(response => response.json()).catch((err) => {
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

  export default record;