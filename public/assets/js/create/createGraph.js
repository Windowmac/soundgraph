const createGraph = () => {
    const columnsEl = document.createElement('div');
    columnsEl.classList.add('columns', 'is-vcentered');
    columnsEl.style.paddingTop = '18px';
    const column = document.createElement('div');
    column.classList.add('column', 'is-10', 'is-offset-1');
    const graphBox = document.createElement('div');
    graphBox.id = 'graph-box';
    graphBox.classList.add('box');
    graphBox.style.height = '95vh';
    graphBox.style.background =
      'url(/assets/images/graph-bg-cropped.png) repeat center center';
    graphBox.dataset.held = 'false';

    document.body.appendChild(columnsEl);
    columnsEl.appendChild(column);
    column.appendChild(graphBox);

    return graphBox;
  };

export default createGraph;