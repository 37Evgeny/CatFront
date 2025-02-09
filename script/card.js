class Card{
    constructor(dataCat,selectorTemplate){
        this._data = dataCat;
        this._selectorTemplate = selectorTemplate;
    }

    _getTemplate(){ 
        return document.querySelector(this._selectorTemplate).content.querySelector('.card');
    }

    getElement(){
        this.element= this._getTemplate().cloneNode(true);
        const cardTtitle= this.element.querySelector('.card__name')
        const cardTage= this.element.querySelector('.card__age')
        const cardImage= this.element.querySelector('.card__image')
        const cardLike = this.element.querySelector('.card__like')

        // Check if img_link exists, otherwise use a default image
        

        if(!this._data.favourite){
            cardLike.remove();
        }

        cardTtitle.textContent = this._data.name;
        cardTage.textContent = 'Возраст : ' + this._data.age;
        cardImage.src = this._data.img_link ? this._data.img_link : '/Users/totenkopf/Desktop/Programming/Git/CatFront/img/cat.jpg';
        // cardImage.src=this._data.img_link;

        if (cardLike) {
            cardLike.addEventListener('click', () => {
                this.toggleLike();
            });
        }

        return this.element;
    }

    toggleLike() {
        // Logic to handle like functionality
        // e.g., toggle favourite state, update UI accordingly
        this._data.favourite = !this._data.favourite;

        // If the card has been liked
        if (this._data.favourite) {
            this.element.querySelector('.card__like').classList.add('liked');
        } else {
            this.element.querySelector('.card__like').classList.remove('liked');
        }
    }

    // Optional method to return data if needed
    getData() {
        return this._data;
    }
}

