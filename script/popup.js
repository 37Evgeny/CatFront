class Popup {
    // Конструктор принимает имя класса для модального окна
    constructor(className){
        // Сохраняем имя класса
        this._className = className;
        // Находим элемент модального окна по классу
        this.popup = document.querySelector(`.${className}`);
        // Привязываем контекст метода _EscUp к текущему объекту
        this._EscUp = this._EscUp.bind(this);
    }

    // Метод для обработки нажатия клавиши Escape
    _EscUp(evt){
        // Проверяем, была ли нажата клавиша Escape
        if(evt.key === 'Escape'){
            // Закрываем модальное окно
            this.close();
        }
    }
    // Метод для открытия модального окна
    open(){
        // Добавляем класс для отображения модального окна
        this.popup.classList.add('popup_active')
        // Добавляем обработчик события нажатия клавиш
        document.addEventListener('keyup', this._EscUp)
    }
     // Метод для закрытия модального окна
    close(){
        // Удаляем класс, чтобы скрыть модальное окно
        this.popup.classList.remove('popup_active')
        // Удаляем обработчик события нажатия клавиш
        document.removeEventListener('keyup', this._EscUp)
    }
     // Метод для установки обработчиков событий
    setEventListener(){
         // Проверяем, был ли клик по самому модальному окну или по кнопке закрытия
        this.popup.addEventListener('click', ( evt )=>{
            if(evt.target.classList.contains(this._className) || !!evt.target.closest('.popup__close')){
                // Закрываем модальное окно
                this.close()
            }
        })
    }
}