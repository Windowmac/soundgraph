const animateTouchBubble = (event) => {
    const bubbleNumber = 4;
    for(let i = 0; i < bubbleNumber; i++){
        const x = event.touches ? event.touches[0].clientX + 'px' : event.clientX + 'px';
        const y = event.touches ? event.touches[0].clientY + 'px' :event.clientY + 'px';
        const touchBubble = document.createElement('div');
        touchBubble.classList.add('touch-bubble');
        touchBubble.style.animationDelay = i - 3 + 's';
        touchBubble.style.position = 'absolute';
        touchBubble.style.left = x;
        touchBubble.style.top = y;
        document.getElementById('graph-box').appendChild(touchBubble);
    };
}

export default animateTouchBubble;