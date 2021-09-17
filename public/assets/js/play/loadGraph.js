import animateTouchBubble from './animateTouchBubble.js';

const loadGraph = (sound) => {
  console.log('sound is: ', sound);

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
    graphBox.dataset.held = "false";

  document.body.appendChild(columnsEl);
  columnsEl.appendChild(column);
  column.appendChild(graphBox);

  graphBox.addEventListener('mousedown', (event) => {
    if (graphBox.dataset.held === 'false') {
      graphBox.dataset.held = 'true';
      animateTouchBubble(event);
      //playSound(event, audioCtx);
    }
  });

  graphBox.addEventListener('mouseup', () => {
    graphBox.dataset.held = 'false';
    [...document.getElementsByClassName('touch-bubble')].forEach((bubble) => {
        bubble.parentNode.removeChild(bubble);
      });
  });
};

export default loadGraph;
