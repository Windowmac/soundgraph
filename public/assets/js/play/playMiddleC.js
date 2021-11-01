
  const playMiddleC = (event, audioCtx, audioSettings, graph) => {
    let CurX;
    let CurY;
    const currentTouchIndex = event.touches ? event.touches.length - 1 : 0;
    if (event.touches) {
      CurX = event.touches[currentTouchIndex].clientX;
      CurY = event.touches[currentTouchIndex].clientY;
    } else {
      CurX = event.pageX;
      CurY = event.pageY;
    }

    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(
      (CurY / audioSettings.HEIGHT) * audioSettings.maxFreq,
      audioCtx.currentTime
    );
    const oscillatorGain = audioCtx.createGain();

    oscillatorGain.gain.setValueAtTime((CurX / audioSettings.WIDTH) * audioSettings.maxVol, audioCtx.currentTime);
    oscillator.connect(oscillatorGain);
    oscillatorGain.connect(audioSettings.primaryGainControl);
    oscillator.start();
    graph.addEventListener('mouseup', () => {
      oscillatorGain.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime
      );
      oscillator.stop();
    });
    graph.addEventListener('touchend', () => {
      // graph.dataset.held = 'false';
      [...document.getElementsByClassName('touch-bubble')].forEach((bubble) => {
        bubble.parentNode.removeChild(bubble);
      });
      oscillatorGain.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime
      );
      oscillator.stop();
    });

    graph.addEventListener('touchleave', () => {
      // graph.dataset.held = 'false';
      [...document.getElementsByClassName('touch-bubble')].forEach((bubble) => {
        bubble.parentNode.removeChild(bubble);
      });
      oscillatorGain.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime
      );
      oscillator.stop();
    });

    graph.addEventListener('touchcancel', () => {
      // graph.dataset.held = 'false';
      [...document.getElementsByClassName('touch-bubble')].forEach((bubble) => {
        bubble.parentNode.removeChild(bubble);
      });
      oscillatorGain.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime
      );
      oscillator.stop();
    });

    return oscillator;
  };

export default playMiddleC;