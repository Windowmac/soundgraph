const playBlob = async (event, audioCtx, audioSettings, graph, sound) => {
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
      const blobGain = audioCtx.createGain();

      blobGain.gain.setValueAtTime((CurX / audioSettings.WIDTH) * audioSettings.maxVol, audioCtx.currentTime);
      audioSourceNode.connect(blobGain);

      blobGain.connect(audioSettings.primaryGainControl)
      audioSourceNode.start();
      graph.addEventListener('mouseup', () => {
        [...document.getElementsByClassName('touch-bubble')].forEach((bubble) => {
            bubble.parentNode.removeChild(bubble);
          });
        audioSourceNode.stop();
      });
      graph.addEventListener('touchend', () => {
        [...document.getElementsByClassName('touch-bubble')].forEach((bubble) => {
            bubble.parentNode.removeChild(bubble);
          });
        audioSourceNode.stop();
      });
      return audioSourceNode;
    }
  };

  export default playBlob;