class Card {
    constructor(dataCat, selectorTemplate) {
        this._data = dataCat;
        this._selectorTemplate = selectorTemplate;
    }

    _getTemplate() { 
        return document.querySelector(this._selectorTemplate).content.querySelector('.card');
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true);
        const cardTitle = this.element.querySelector('.card__name');
        const cardAge = this.element.querySelector('.card__age');
        const cardImage = this.element.querySelector('.card__image');
        const cardLike = this.element.querySelector('.card__like');
        const cardDelete = this.element.querySelector('.card__delete');

        cardTitle.textContent = this._data.name;
        cardAge.textContent = 'Возраст: ' + this._data.age;
        cardImage.src = this._data.img_link ? this._data.img_link : '/path/to/default/cat.jpg';

        if (cardLike) {
            cardLike.addEventListener('click', () => {
                this.toggleLike();
            });
        }

        // Добавление обработчика события на кнопку удаления
        cardDelete.addEventListener('click', () => {
            console.log(`${this._data.name} удалена!`);

            // Логика для удаления карточки из DOM
            this.element.remove(); // Удаление карточки из DOM

            // Вызов функции удаления
            handleCatDelete(this._data.id); // передаем ID кота, который нужно удалить
        });

        return this.element;
    }
}

// Функция для удаления кота
function handleCatDelete(catId) {
    // Предполагается, что `api` - это экземпляр, с которым нужно работать
    api.deleteCat(catId)
        .then(response => {
            console.log(`Кот с ID ${catId} успешно удалён!`);
        })
        .catch(error => {
            console.error(`Ошибка при удалении кота: ${error}`);
        });
}