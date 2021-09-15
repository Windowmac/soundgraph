const loadGraph = (sound) => {
    console.log('sound is: ', sound);

    const columnsEl = document.createElement('div');
    columnsEl.classList.add('columns', 'is-vcentered');
    columnsEl.style.paddingTop = '18px';
    const column = document.createElement('div');
    column.classList.add('column', 'is-10', 'is-offset-1');
    const graphBox = document.createElement('div');
    graphBox.classList.add('box');
    graphBox.style.height = '95vh';
    graphBox.style.background = 'url(./assets/images/graph-bg-cropped.png) repeat center center';

    document.body.appendChild(columnsEl);
    columnsEl.appendChild(column);
    column.appendChild(graphBox)
    
    //TODO: create graph background without image - use css instead.
}

export default loadGraph;