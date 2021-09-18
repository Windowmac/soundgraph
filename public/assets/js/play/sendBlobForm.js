

const sendBlobForm = async (blob, clipName) => {
  // const fd = new FormData();
  // fd.append('newSound', blob, `${clipName}.ogg`);
  const app = firebase.initializeApp({
    apiKey: "AIzaSyCA8oDm2UjB_mjXzFAqD5_TrfcTa608h0w",
    authDomain: "kletterstieg.firebaseapp.com",
    projectId: "kletterstieg",
    storageBucket: "kletterstieg.appspot.com",
    messagingSenderId: "616139153956",
    appId: "1:616139153956:web:61bacc3fdf104ccb7e2eb1",
    measurementId: "G-7T5KXQ1WE6"
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
//   const response = await axios
//     .post('/.netlify/functions/saveSoundDoc', blob, {
//       headers: { 'Content-Type': 'blob' },
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   console.log('the response is: ', response);
};

export default sendBlobForm;
