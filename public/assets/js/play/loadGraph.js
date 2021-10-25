import animateTouchBubble from './animateTouchBubble.js';
import createGraph from './createGraph.js';

const loadGraph = async (blob, isInit, audioCtx) => {
  if (isInit) {
    return;
  }

  const graph = createGraph();

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const WIDTH = graph.clientWidth;
  const HEIGHT = graph.clientHeight;
  const maxFreq = 500;
  const maxVol = 1;

  const primaryGainControl = audioCtx.createGain();
  primaryGainControl.gain.setValueAtTime(1, 0);
  primaryGainControl.connect(audioCtx.destination);

  console.log('sound is: ', blob ? blob : '');

  const fetchedFile = blob
    ? await fetch(blob.data.url, {
        headers: {
          origin: 'https://windowmac-soundgraph.netlify.app/',
        },
      })
    : '';

  console.log('fetched file is: ', fetchedFile);
  const bufferArray = blob ? fetchedFile.arrayBuffer() : '';
  const decodedBuffer = bufferArray
    ? await audioCtx.decodeAudioData(bufferArray)
    : '';

  const playBlob = async (event, sound) => {
    let CurX;
    let CurY;
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

    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(
      (CurY / HEIGHT) * maxFreq,
      audioCtx.currentTime
    );
    const oscillatorGain = audioCtx.createGain();

    oscillatorGain.gain.setValueAtTime((CurX / WIDTH) * maxVol, audioCtx.currentTime);
    oscillator.connect(oscillatorGain);
    oscillatorGain.connect(primaryGainControl);
    oscillator.start();
    graph.addEventListener('mouseup', () => {
      oscillatorGain.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime
      );
      oscillator.stop();
    });
    graph.addEventListener('touchend', () => {
      // graph.dataset.held = 'false';
      [...document.getElementsByClassName('touch-bubble')].forEach((bubble) => {
        bubble.parentNode.removeChild(bubble);
      });
      oscillatorGain.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime
      );
      oscillator.stop();
    });

    graph.addEventListener('touchleave', () => {
      // graph.dataset.held = 'false';
      [...document.getElementsByClassName('touch-bubble')].forEach((bubble) => {
        bubble.parentNode.removeChild(bubble);
      });
      oscillatorGain.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime
      );
      oscillator.stop();
    });

    graph.addEventListener('touchcancel', () => {
      // graph.dataset.held = 'false';
      [...document.getElementsByClassName('touch-bubble')].forEach((bubble) => {
        bubble.parentNode.removeChild(bubble);
      });
      oscillatorGain.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime
      );
      oscillator.stop();
    });

    return oscillator;
  };

  isInit = true;

  graph.addEventListener('mousedown', (event) => {
    if (graph.dataset.held === 'false') {
      graph.dataset.held = 'true';
      animateTouchBubble(event);
      const sounds = [];

      for (let i = 0; i < 1; i++) {
        sounds.push(blob ? playBlob(event) : playMiddleC(event));
      }

      graph.addEventListener('mousemove', (event) => {
        for (let i = 0; i < sounds.length; i++) {
          sounds[i].frequency.setValueAtTime(
            (event.clientY / HEIGHT) * maxFreq,
            audioCtx.currentTime
          );
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

    animateTouchBubble(event);
    const sounds = [];

    for (let i = 0; i < event.touches.length; i++) {
      sounds.push(blob ? playBlob(event) : playMiddleC(event));
    }

    graph.addEventListener('touchmove', (event) => {
      for (let i = 0; i < sounds.length; i++) {
        sounds[i].frequency.setValueAtTime(
          (event.touches[i].clientY / HEIGHT) * maxFreq,
          audioCtx.currentTime
        );
      }
    });
  });
};

export default loadGraph;
