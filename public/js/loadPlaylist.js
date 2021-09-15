const loadPlaylist = async () => {
    const soundList = await fetch('/.netlify/functions/getSounds')
    .then(response => response.json()).catch(err => {
        console.log(err);
    });

    soundList.forEach(sound => {
      const boxEl = document.createElement('div');
      boxEl.classList.add('box');
      const iconTextEl = document.createElement('div');
      iconTextEl.classList.add('icon-text');
      const iconEl = document.createElement('span');
      iconEl.classList.add('icon', 'is-large', 'has-text-success');
      const iEl = document.createElement('i');
      iEl.classList.add('fas', 'fa-2x', 'fa-waveform');
      const textSpanEl = document.createElement('span');
      textSpanEl.textContent = sound.name;

      document.body.appendChild(boxEl);
      boxEl.appendChild(iconTextEl);
      iconTextEl.appendChild(iconEl);
      iconEl.appendChild(iEl);
      iconTextEl.appendChild(textSpanEl);

      boxEl.addEventListener('click', () => {
        console.log('clicked!');
      });
    });



  //   <div class="box">
  // <article class="media">
  //   <div class="media-left">
  //     <figure class="image is-64x64">
  //       <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
  //     </figure>
  //   </div>
  //   <div class="media-content">
  //     <div class="content">
  //       <p>
  //         <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
  //         <br>
  //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
  //       </p>
  //     </div>
  }

export default loadPlaylist;