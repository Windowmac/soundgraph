class ClickAndHold {
    /**
     * 
     * @param {EventTarget} target html target the event will be applied to
     * @param {Function} callback function that is called when target is clicked and held
     */
    constructor(target, callback){
        this.target = target;
        this.callback = callback;
        this.isHeld = false;
        this.activeHoldTimeoutId = null;

        ["mousedown", "touchstart"].forEach(eventType => {
            this.target.addEventListener(type, this._onHoldStart.bind(this))
        });

        ["mouseup", "mouseleave", "mouseout", "touchend", "touchcancel"].forEach(eventType => {
            this.target.addEventListener(type, this._onHoldEnd.bind(this))
        });
    }

    _onHoldStart() {
        this.isHeld = true;

        this.activeHoldTimeoutId = setTimeout(() => {
            if(this.isHeld){
                this.callback();
            }
        }, 1000);
    }
    _onHoldEnd() {
        this.isHeld = false;
        clearTimeout(this.activeHoldTimeoutId);
    }
}

export default ClickAndHold;