class Popup {
    constructor(className){
        this._className = className;
        this.popup =document.querySelector(`.${className}`);
        this._EscUp = this._EscUp.bind(this);
    }

    _EscUp(evt){
        if(evt.key=== 'Escape'){
            this.close();
        }
    }

    open(){
        this.popup.classList.add('popup_active')
        document.addEventListener('keyup', this._EscUp)
    }

    close(){
        this.popup.classList.remove('popup_active')
        document.removeEventListener('keyup', this._EscUp)
    }

    setEventListener(){
        this.popup.addEventListener('click', (evt)=>{
            if(evt.target.classList.contains(this._className) || !!evt.target.closest('.popup__close')){
                this.close()
            }
        })
    }
}