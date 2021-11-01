import animateTouchBubble from '../play/animateTouchBubble.js';
import createGraph from '../create/createGraph.js';
import playMiddleC from '../play/playMiddleC.js';
import playBlob from '../play/playBlob.js';

const loadGraph = async (blob, isInit, audioCtx) => {
  if (isInit) {
    return;
  }
  isInit = true;

  const graph = createGraph();

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const primaryGainControl = audioCtx.createGain();
  primaryGainControl.gain.setValueAtTime(1, 0);
  primaryGainControl.connect(audioCtx.destination);

  const fetchedFile = blob
    ? await fetch(blob.data.url, {
        headers: {
          origin: 'https://windowmac-soundgraph.netlify.app/',
        },
      })
    : '';

  const bufferArray = fetchedFile ? await fetchedFile.arrayBuffer() : '';
  const decodedBuffer = bufferArray
    ? await audioCtx.decodeAudioData(bufferArray)
    : '';

  const audioSettings = {
    WIDTH: graph.clientWidth,
    HEIGHT: graph.clientHeight,
    maxFreq: 500,
    maxVol: 1,
    primaryGainControl: primaryGainControl,
    decodedBuffer: decodedBuffer,
  };

  graph.addEventListener('mousedown', (event) => {
    if (graph.dataset.held === 'false') {
      graph.dataset.held = 'true';
      animateTouchBubble(event);
      const sounds = [];

      for (let i = 0; i < 1; i++) {
        sounds.push(
          blob
            ? playBlob(event, audioCtx, audioSettings, graph)
            : playMiddleC(event, audioCtx, audioSettings, graph)
        );
      }

      graph.addEventListener('mousemove', (event) => {
        for (let i = 0; i < sounds.length; i++) {
          sounds[i].frequency.setValueAtTime(
            (event.clientY / audioSettings.HEIGHT) * audioSettings.maxFreq,
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
      sounds.push(
        blob
          ? playBlob(event, audioCtx, audioSettings, graph)
          : playMiddleC(event, audioCtx, audioSettings, graph)
      );
    }

    graph.addEventListener('touchmove', (event) => {
      for (let i = 0; i < sounds.length; i++) {
        sounds[i].frequency.setValueAtTime(
          (event.touches[i].clientY / audioSettings.HEIGHT) *
            audioSettings.maxFreq,
          audioCtx.currentTime
        );
      }
    });
  });
};

export default loadGraph;
