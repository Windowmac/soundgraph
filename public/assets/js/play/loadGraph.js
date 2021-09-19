import animateTouchBubble from './animateTouchBubble.js';
import createGraph from './createGraph.js';

const loadGraph = async (blob, isInit, audioCtx) => {
  if (isInit) {
    return;
  }

  const graph = createGraph();

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  const maxFreq = 500;
  const maxVol = 1;

  let CurX;
  let CurY;

  const primaryGainControl = audioCtx.createGain();
  primaryGainControl.gain.setValueAtTime(1, 0);
  primaryGainControl.connect(audioCtx.destination);

  console.log('sound is: ', blob ? blob : '');

  const fetchedFile = blob ? await fetch(blob.data.url, {
    headers: {
      "origin": "localhost"
    }
  }) : '';
  const bufferArray = blob ? fetchedFile.arrayBuffer() : '';
  const decodedBuffer = bufferArray
    ? await audioCtx.decodeAudioData(bufferArray)
    : '';

  const playBlob = async (event, sound) => {
    if (event.touches.length) {
      CurX = event.touches[0].clientX;
      CurY = event.touches[0].clientY;
    } else {
      CurX = event.pageX;
      CurY = event.pageY;
    }

    if (sound) {
      primaryGainControl.gain.value = (CurX / WIDTH) * maxVol;
      return sound;
    } else {
      const audioSourceNode = await audioCtx.createBufferSource();
      audioSourceNode.loop = true;
      audioSourceNode.buffer = decodedBuffer;
      audioSourceNode.connect(primaryGainControl);
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

  const playMiddleC = (event, sound) => {
    if (event.touches) {
      CurX = event.touches[0].clientX;
      CurY = event.touches[0].clientY;
    } else {
      CurX = event.pageX;
      CurY = event.pageY;
    }

    if (sound) {
      sound.frequency.setValueAtTime(
        (CurY / HEIGHT) * maxFreq,
        audioCtx.currentTime
      );
      primaryGainControl.gain.value = (CurX / WIDTH) * maxVol;
      return sound;
    } else {
      console.log('X, Y are: ', CurX, CurY);
      const oscillator = audioCtx.createOscillator();
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(
        (CurY / HEIGHT) * maxFreq,
        audioCtx.currentTime
      );
      primaryGainControl.gain.value = (CurX / WIDTH) * maxVol;
      oscillator.connect(primaryGainControl);
      oscillator.start();
      graph.addEventListener('mouseup', () => {
        primaryGainControl.gain.setValueAtTime(0.01, audioCtx.currentTime);
        oscillator.stop();
      });
      graph.addEventListener('touchend', () => {
        graph.dataset.held = 'false';
        [...document.getElementsByClassName('touch-bubble')].forEach(
          (bubble) => {
            bubble.parentNode.removeChild(bubble);
          }
        );
        primaryGainControl.gain.setValueAtTime(0.01, audioCtx.currentTime);
        oscillator.stop();
      });
      graph.addEventListener('touchmove', () => {
        oscillator.frequency.setValueAtTime(
          (CurY / HEIGHT) * maxFreq,
          audioCtx.currentTime
        );
      });
      return oscillator;
    }
  };

  isInit = true;

  graph.addEventListener('mousedown', (event) => {
    if (graph.dataset.held === 'false') {
      graph.dataset.held = 'true';
      animateTouchBubble(event);
      const sound = blob ? playBlob(event) : playMiddleC(event);

      graph.addEventListener('mousemove', (event) => {
        if (graph.dataset.held === 'true') {
          animateTouchBubble(event);
          blob ? playBlob(event, sound) : playMiddleC(event, sound);
        }
      });
    }
  });

  graph.addEventListener('mouseup', () => {
    graph.dataset.held = 'false';
    [...document.getElementsByClassName('touch-bubble')].forEach((bubble) => {
      bubble.parentNode.removeChild(bubble);
    });
  });

  graph.addEventListener('touchstart', (event) => {
    event.preventDefault();
    // if (graph.dataset.held === 'false') {
    //   graph.dataset.held = 'true';
      console.log(event);
      animateTouchBubble(event);
      const sound = blob ? playBlob(event) : playMiddleC(event);

      graph.addEventListener('touchmove', (event) => {
        // if (graph.dataset.held === 'true') {
          animateTouchBubble(event);
          blob ? playBlob(event) : playMiddleC(event, sound);
          sound.frequency.setValueAtTime(
            (CurY / HEIGHT) * maxFreq,
            audioCtx.currentTime
          );
        //}
      });
    //}
  });
};

export default loadGraph;
