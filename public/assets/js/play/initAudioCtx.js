const initAudioCtx = async (blob, isInit, audioCtx) => {
  if (isInit) {
    return;
  }
  console.log('blob is: ', blob);
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const bufferArray = blob ? await blob.arrayBuffer() : '';
  const decodedBuffer = bufferArray != '' ? await audioCtx.decodeAudioData(bufferArray).catch(err => {console.log(err)}) : '';

  const primaryGainControl = audioCtx.createGain();
  primaryGainControl.gain.setValueAtTime(0.5, 0);

  if(blob){
    
  }

  audioSourceNode.buffer = decodedBuffer;
  audioSourceNode.connect(primaryGainControl);

  primaryGainControl.connect(audioCtx.destination);

  isInit = true;

  const audioObj = {
    primaryGainControl: primaryGainControl,
    audioSourceNode: audioSourceNode,
    audioCtx: audioCtx
  }

  return audioObj;
};

export default initAudioCtx;
