import loadRecordedSounds from './loadRecordedSounds.js';

const createFolderDiv = (recordedSounds, sectionEl, isInit, audioCtx) => {
  const getSoundsEl = document.createElement('div');
  getSoundsEl.classList.add('box', 'has-background-dark');
  const iconTextEl = document.createElement('div');
  iconTextEl.classList.add('icon-text');
  const iconEl = document.createElement('span');
  iconEl.classList.add('icon', 'is-large', 'has-color-chartreuse');
  const iEl = document.createElement('ion-icon');
  iEl.classList.add('ion-ionic', 'icon-dimensions-large');
  iEl.name = 'folder-open';
  iEl.size = 'large';
  const columnsEl = document.createElement('div');
  columnsEl.classList.add('columns', 'is-mobile');
  const column = document.createElement('div');
  column.classList.add('column', 'is-offset-1');
  const column2 = document.createElement('div');
  column2.classList.add('column');
  const textSpanEl = document.createElement('span');
  textSpanEl.textContent = 'choose recorded sound';
  textSpanEl.style.fontSize = '25px';
  textSpanEl.style.fontFamily = 'monospace';

  const appendDiv = () => {
    document.body.appendChild(sectionEl);
    sectionEl.appendChild(getSoundsEl);
    getSoundsEl.appendChild(columnsEl);
    columnsEl.appendChild(column);
    iconTextEl.appendChild(iconEl);
    iconEl.appendChild(iEl);
    column.appendChild(iconTextEl);
    iconTextEl.appendChild(column2);
    column2.appendChild(textSpanEl);
  };

  appendDiv();

  getSoundsEl.addEventListener('click', async () => {
    getSoundsEl.parentNode.removeChild(getSoundsEl);
    const playMiddleC = document.getElementById('playMiddleC');
    playMiddleC.parentNode.removeChild(playMiddleC);
    loadRecordedSounds(recordedSounds, sectionEl, isInit, audioCtx);
  });
};

export default createFolderDiv;
