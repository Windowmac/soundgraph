

const recordBtn = document.getElementById('record');

new ClickAndHold(recordBtn, () => {
    console.log("made it here!");
});