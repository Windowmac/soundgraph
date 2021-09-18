import animateTouchBubble from './animateTouchBubble.js';

const loadGraph = async (blob, isInit, audioCtx) => {
  if (isInit) {
    return;
  }

  const createGraph = () => {
    const columnsEl = document.createElement('div');
    columnsEl.classList.add('columns', 'is-vcentered');
    columnsEl.style.paddingTop = '18px';
    const column = document.createElement('div');
    column.classList.add('column', 'is-10', 'is-offset-1');
    const graphBox = document.createElement('div');
    graphBox.id = 'graph-box';
    graphBox.classList.add('box');
    graphBox.style.height = '95vh';
    graphBox.style.background =
      'url(/assets/images/graph-bg-cropped.png) repeat center center';
    graphBox.dataset.held = 'false';

    document.body.appendChild(columnsEl);
    columnsEl.appendChild(column);
    column.appendChild(graphBox);

    return graphBox;
  };

  const graph = createGraph();

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  const maxFreq = 500;
  const maxVol = 0.7;

  let CurX;
  let CurY;

  const bufferArray = blob ? await blob.arrayBuffer() : '';
  console.log('buffer array is: ', bufferArray);
  const decodedBuffer =
    bufferArray != ''
      ? await audioCtx.decodeAudioData(bufferArray).catch((err) => {
          console.log(err);
        })
      : '';

  const primaryGainControl = audioCtx.createGain();
  primaryGainControl.gain.setValueAtTime(0.5, 0);
  primaryGainControl.connect(audioCtx.destination);

    const playBlob = async() => {
      console.log('made it here in playblob');
      const audioSourceNode = await audioCtx.createBufferSource();
      audioSourceNode.loop = true;
      audioSourceNode.buffer = decodedBuffer;
      audioSourceNode.connect(primaryGainControl);
      audioSourceNode.start();
      graph.addEventListener('mouseup', () => {
        audioSourceNode.stop();
      })
    };

    const playMiddleC = (event) => {

      CurX = event.pageX;
      CurY = event.pageY;
      console.log('X, Y are: ', CurX, CurY);
      const oscillator = audioCtx.createOscillator();
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(((CurY/HEIGHT) * maxFreq), 0);
      primaryGainControl.gain.value = (CurX/WIDTH) * maxVol;
      oscillator.connect(primaryGainControl);
      oscillator.start();
      graph.addEventListener('mouseup', () => {
        oscillator.stop();
      });
      graph.addEventListener('mousemove', () => {
        oscillator.stop();
      });
    };

  isInit = true;

  graph.addEventListener('mousedown', (event) => {
    if (graph.dataset.held === 'false') {
      graph.dataset.held = 'true';
      animateTouchBubble(event);
      if(blob){
        playBlob(event);
      } else {
        playMiddleC(event);
      }
    }
  });

  graph.addEventListener('mouseup', () => {
    graph.dataset.held = 'false';
    [...document.getElementsByClassName('touch-bubble')].forEach((bubble) => {
      bubble.parentNode.removeChild(bubble);
    });
  });

  graph.addEventListener('mousemove', (event) => {
    if (graph.dataset.held === "true") {
      animateTouchBubble(event);
      blob ? playBlob(event) : playMiddleC(event);
    }
  });
};

export default loadGraph;
