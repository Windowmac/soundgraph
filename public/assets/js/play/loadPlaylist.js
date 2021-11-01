import createFolderDiv from './createFolderDiv.js';
import loadMiddleC from './loadMiddleC.js';

const loadPlaylist = async (isInit, audioCtx) => {
  
  const recordedSounds = await axios.get('/.netlify/functions/getSounds');

  const sectionEl = document.createElement('div');
  sectionEl.style.height = '100vw';
  sectionEl.classList.add('section');

  createFolderDiv(recordedSounds, sectionEl, isInit, audioCtx);

  loadMiddleC(sectionEl, isInit, audioCtx);
};

export default loadPlaylist;
