const playBlob = async (event, sound, audioSettings) => {
    let CurX;
    let CurY;
    const currentTouchIndex = event.touches ? event.touches.length - 1 : 0;
    if (event.touches) {
      CurX = event.touches[currentTouchIndex].clientX;
      CurY = event.touches[currentTouchIndex].clientY;
    } else {
      CurX = event.pageX;
      CurY = event.pageY;
    }

    if (sound) {
      audioSettings.primaryGainControl.gain.value = (CurX / audioSettings.WIDTH) * audioSettings.maxVol;
      return sound;
    } else {
      const audioSourceNode = await audioCtx.createBufferSource();
      audioSourceNode.loop = true;
      audioSourceNode.buffer = audioSettings.decodedBuffer;
      audioSourceNode.connect(audioSettings.primaryGainControl);
      audioSourceNode.start();
      graph.addEventListener('mouseup', () => {
        audioSourceNode.stop();
      });
      graph.addEventListener('touchend', () => {
        audioSourceNode.stop();
      });
      return audioSourceNode;
    }
  };

  export default playBlob;