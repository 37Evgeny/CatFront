// Класс Card предназначен для создания карточки кота, которая отображает информацию о нем и предоставляет возможность взаимодействия с ней 
class Card {
    // dataCat: объект, содержащий данные о коте
    // selectorTemplate: селектор шаблона карточки, который будет использоваться для создания экземпляра карточки
    constructor(dataCat, selectorTemplate) {
        this._data = dataCat;
        this._selectorTemplate = selectorTemplate;
        this._isLiked = dataCat.favourite; // Инициализация состояния "нравится"
    }
// метод возвращает шаблон карточки, который будет клонирован для создания новой карточки. Он ищет элемент с заданным селектором и возвращает его содержимое.
    _getTemplate() { 
        return document.querySelector(this._selectorTemplate).content.querySelector('.card');
    }
// метод создает экземпляр карточки, клонируя шаблон
// заполняет карточку данными о коте 
// добавляет обработчики событий для кнопок 
    getElement() {
        this.element = this._getTemplate().cloneNode(true);
        const cardTitle = this.element.querySelector('.card__name');
        const cardAge = this.element.querySelector('.card__age');
        const cardImage = this.element.querySelector('.card__image');
        const cardLike = this.element.querySelector('.card__like');
        // const cardLike = this.element.querySelector('.card__like').nextElementSibling;
        const cardDelete = this.element.querySelector('.card__delete');

        cardTitle.textContent = this._data.name;
        cardAge.textContent = 'Возраст: ' + this._data.age;
        // заполняем карточку данными о коте. Если ссылка на изображение отсутствует, используется изображение по умолчанию
        cardImage.src = this._data.img_link ? this._data.img_link : './path/to/default/cat.jpg';

        // Устанавливаем начальное состояние лайка
        this.updateLikeButton(cardLike);
        
          if (cardLike) {
              cardLike.addEventListener('click', () => {
                  this.toggleLike(cardLike);
              });
          }

        // Добавление обработчика события на кнопку удаления
        // при нажатии на кнопку "удалить" выводится сообщение в консоль, карточка удаляется из DOM, и вызывается функция handleCatDelete, которая отправляет запрос на удаление кота с сервера.
        cardDelete.addEventListener('click', () => {
            console.log(`${this._data.name} удалена!`);

            // Логика для удаления карточки из DOM
            this.element.remove(); // Удаление карточки из DOM

            // Вызов функции удаления
            handleCatDelete(this._data.id); // передаем ID кота, который нужно удалить
        });

        return this.element;

    }

    toggleLike(cardLike) {
        // Переключаем состояние
        this._isLiked = !this._isLiked; 
        this.updateLikeButton(cardLike);
    }

    updateLikeButton(cardLike) {
        if (this._isLiked) {
            // Добавляем классы для визуального эффекта
            cardLike.classList.remove('fa-regular', 'fa-heart'); 
            cardLike.classList.add('fa-solid', 'fa-heart'); 
        } else {
             // Убираем классы
            cardLike.classList.remove('fa-solid', 'fa-heart');
            cardLike.classList.add('fa-regular', 'fa-heart'); 
        }
    }
}

// функция принимает идентификатор кота и отправляет запрос на его удаление через API.
// Если запрос успешен, выводится сообщение об успешном удалении, в противном случае выводится ошибка.
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

