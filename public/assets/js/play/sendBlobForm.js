

const sendBlobForm = async (blob, clipName) => {
  // const fd = new FormData();
  // fd.append('newSound', blob, `${clipName}.ogg`);
  const app = firebase.initializeApp({
    apiKey: "AIzaSyA7r_v_j9WQGGeLtC0UFbmQqZPlI057hlA",
    authDomain: "windowmac-soundgraph.firebaseapp.com",
    projectId: "windowmac-soundgraph",
    storageBucket: "windowmac-soundgraph.appspot.com",
    messagingSenderId: "580941357939",
    appId: "1:580941357939:web:2da9778500fd9b6bc79b06",
    measurementId: "G-JZ6QSS4RGH"
  });
  const storage = app.storage();
  const handleSnapshot = (snapshot) =>
    snapshot.ref.getDownloadURL().then(url => axios.post('/.netlify/functions/saveSoundDoc', {url: url, name: clipName}));

  const uploadSound = (storage, soundAsFile) =>
    storage
      .ref(`/audio/${clipName}.ogg`)
      .put(soundAsFile)
      .then(handleSnapshot)
      .catch((err) => console.log(err));

uploadSound(storage, blob);
};

export default sendBlobForm;
