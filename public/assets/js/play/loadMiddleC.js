import loadGraph from './loadGraph.js';
const loadMiddleC = (sectionEl, isInit, audioCtx) => {
    const playMiddleCEl = document.createElement('div');
    playMiddleCEl.id = ('playMiddleC');
    playMiddleCEl.classList.add('box', 'has-background-dark');
    const iconTextEl = document.createElement('div');
    iconTextEl.classList.add('icon-text');
    const iconEl = document.createElement('span');
    iconEl.classList.add('icon', 'is-large', 'has-color-chartreuse');
    const iEl = document.createElement('ion-icon');
    iEl.classList.add('ion-ionic', 'icon-dimensions-large');
    iEl.name = 'volume-high';
    iEl.size = 'large';
    const columnsEl = document.createElement('div');
    columnsEl.classList.add('columns', 'is-mobile');
    const column = document.createElement('div');
    column.classList.add('column', 'is-offset-1');
    const column2 = document.createElement('div');
    column2.classList.add('column');
    const textSpanEl = document.createElement('span');
    textSpanEl.textContent = 'Play Middle C';
    textSpanEl.style.fontSize = '25px';
    textSpanEl.style.fontFamily = 'monospace';

    document.body.appendChild(sectionEl);
    sectionEl.appendChild(playMiddleCEl);
    playMiddleCEl.appendChild(columnsEl);
    columnsEl.appendChild(column);
    iconTextEl.appendChild(iconEl);
    iconEl.appendChild(iEl);
    column.appendChild(iconTextEl);
    iconTextEl.appendChild(column2);
    column2.appendChild(textSpanEl);

    playMiddleCEl.addEventListener('click', () => {
      playMiddleCEl.parentNode.parentNode.removeChild(sectionEl);
      loadGraph('', isInit, audioCtx);
    });
  };

  export default loadMiddleC;