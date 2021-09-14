const play = async () => {
    const soundList = await fetch('/.netlify/functions/getSounds')
    .then(response => response.json());

    console.log(soundList);
  }

export default play;