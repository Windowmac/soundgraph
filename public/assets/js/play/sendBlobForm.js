const sendBlobForm = async (blob, clipName) => {
    const fd = new FormData();
    fd.append('newSound', blob, `${clipName}.ogg`);

    const response = await axios.post('/.netlify/functions/saveSoundDoc',  fd, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).catch(err => {console.log(err)});

    console.log('the response is: ', response);
  }

export default sendBlobForm;