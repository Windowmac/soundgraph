import makeDistortionCurve from "./makeDistortionCurve.js";

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
      const analyser = audioCtx.createAnalyser();
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.85;
    
      const distortion = audioCtx.createWaveShaper();
      const biquadFilter = audioCtx.createBiquadFilter();

      audioSourceNode.connect(distortion);
      distortion.connect(biquadFilter);
      biquadFilter.connect(blobGain);
      blobGain.connect(analyser);
      analyser.connect(audioSettings.primaryGainControl);

      distortion.oversample = '4x';
      distortion.curve = makeDistortionCurve((CurY / audioSettings.HEIGHT) * 800);
      biquadFilter.type = "lowshelf";
      biquadFilter.detune.value = (CurY / audioSettings.HEIGHT) * audioSettings.maxFreq;

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
      return {distortion: distortion, gain: blobGain, CurX: CurX};
    }
  };

  export default playBlob;