const animateTouchBubble = (event) => {
    const bubbleNumber = 4;
    for(let i = 0; i < bubbleNumber; i++){
        const x = event.touches ? event.touches[event.touches.length - 1].clientX + 'px' : event.clientX + 'px';
        const y = event.touches ? event.touches[event.touches.length - 1].clientY + 'px' :event.clientY + 'px';
        const touchBubble = document.createElement('div');
        touchBubble.classList.add('touch-bubble');
        if(event.touches.length > 1){
            touchBubble.style.backgroundColor = "blue";
        } 
        if(event.touches.length > 2) {
            touchBubble.style.backgroundColor = "red";
        }
        if(event.touches.length > 3) {
            touchBubble.style.backgroundColor = "purple";
        }
        touchBubble.style.animationDelay = i - 3 + 's';
        touchBubble.style.position = 'absolute';
        touchBubble.style.left = x;
        touchBubble.style.top = y;
        document.getElementById('graph-box').appendChild(touchBubble);
    };
}

export default animateTouchBubble;