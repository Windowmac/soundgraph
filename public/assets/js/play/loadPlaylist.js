import loadGraph from './loadGraph.js';

const loadPlaylist = async (blob, isInit, audioCtx) => {
  const recordedSounds = await axios.get('/.netlify/functions/getSounds');
  console.log('recorded sounds are: ', recordedSounds);

  const sectionEl = document.createElement('div');
  sectionEl.style.height = '100vw';
  sectionEl.classList.add('section');

  const loadRecordedSounds = () => {
    recordedSounds.data.forEach((sound) => {
      const playRecordedSoundEl = document.createElement('div');
      playRecordedSoundEl.classList.add('box', 'has-background-dark');
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
      textSpanEl.textContent = sound.name;
      textSpanEl.style.fontSize = '25px';
      textSpanEl.style.fontFamily = 'monospace';

      document.body.appendChild(sectionEl);
      sectionEl.appendChild(playRecordedSoundEl);
      playRecordedSoundEl.appendChild(columnsEl);
      columnsEl.appendChild(column);
      iconTextEl.appendChild(iconEl);
      iconEl.appendChild(iEl);
      column.appendChild(iconTextEl);
      iconTextEl.appendChild(column2);
      column2.appendChild(textSpanEl);

      playRecordedSoundEl.addEventListener('click', async () => {
        playRecordedSoundEl.parentNode.parentNode.removeChild(sectionEl);

        const chosenSound = await axios.post(
          '/.netlify/functions/chooseSound',
          { id: sound._id }
        );

        loadGraph(chosenSound, isInit, audioCtx);
      });
    });
  };

  loadRecordedSounds();

  const loadMiddleC = () => {
    const playMiddleCEl = document.createElement('div');
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

  loadMiddleC();

};

export default loadPlaylist;
