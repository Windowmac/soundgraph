const initAudioCtx = async (sound, isInit, audioCtx) => {
  if (isInit) {
    return;
  }
  console.log('sound data is: ', sound);
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const primaryGainControl = audioCtx.createGain();
  primaryGainControl.gain.setValueAtTime(0.5, 0);

  function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for (; i < n_samples; ++i) {
      x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  const audioSourceNode = new AudioBufferSourceNode(audioCtx);

  console.log('sound is: ', sound);
  

  const decodedBuffer = await audioCtx.decodeAudioData(sound).catch(err => {console.log(err)});
  audioSourceNode.buffer = decodedBuffer;
  audioSourceNode.connect(primaryGainControl);

  primaryGainControl.connect(audioCtx.destination);

  isInit = true;

  console.log('decoded is: ', decodedBuffer);
};

export default initAudioCtx;
