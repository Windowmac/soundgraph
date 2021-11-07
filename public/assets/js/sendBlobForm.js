

const sendBlobForm = async (blob, clipName) => {
  // const fd = new FormData();
  // fd.append('newSound', blob, `${clipName}.ogg`);
  const getSettings = await axios.get('/.netlify/functions/firebaseSettings');
  const settings = getSettings.data;
  const app = firebase.initializeApp(settings);
  const storage = app.storage();
  const handleSnapshot = (snapshot) =>
    snapshot.ref.getDownloadURL().then(url => axios.post('/.netlify/functions/saveSoundDoc', {url: url, name: clipName}));

  const uploadSound = (storage, soundAsFile) =>
    storage
      .ref(`/audio/${clipName}.ogg`)
      .put(soundAsFile)
      .then(handleSnapshot)
      .catch((err) => console.log(err));

return uploadSound(storage, blob);
};

export default sendBlobForm;
