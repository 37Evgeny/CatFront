// Контейнер для карточек с котиками
const cardsContainer = document.querySelector('.cards');
// Кнопка для открытия всплывающего окна добавления котика
const btnOpenPopup = document.querySelector('#add');
 // Кнопка для открытия формы авторизации
const btnOpenAuthorization = document.querySelector('#login');
// Форма для добавления нового котика
const formCatAdd = document.querySelector('#popup-form-cat');
// Форма авторизации (не используется в коде)
const formAuthorization = document.querySelector('#form-login');

// вызов метода getAllCats получакм всех котиков
api.getAllCats()
    .then(data => {
        // Логируем данные о котиках
        console.log(data + 'index'); 
        data.forEach(function(dataCat){
                        // Создаем карточу
                        console.log(dataCat)
                        const cardInst = new Card(dataCat, '#card-template');
                        // Возвращаем разметку
                        const newCardElem = cardInst.getElement();
                        newCardElem.addEventListener('click', () => showExpandedCard(dataCat)); // Добавляем обработчик нажатия
                        // Добавляем на страницу  
                        cardsContainer.append(newCardElem);
                       
                    }) 
         })
    .catch(error => {
        console.error('Ошибка при получении котиков:', error); // Обработка ошибок
    });


// Функция добавления котика на страницу
function formAddCat(event){
    // Предотвращаем стандартное поведение формы
    event.preventDefault();
    // Получаем элементы формы
    const elementsFormCat = [...formCatAdd.elements];
    // Сериализуем данные формы
    const dataFromForm = serializeForm(elementsFormCat);
    // добавление котика на сервер
    api.addNewCat(dataFromForm)
        .then(()=>{
            // Создаем карточку для нового котика
            const cardInst = new Card(dataFromForm, '#card-template');
            // Получаем разметку карточки
            const newCardElem = cardInst.getElement();
            // Добавляем карточку на страницу
            cardsContainer.append(newCardElem);
            //  закрытие popup
            AddCat.close();
        })
}

// Функция для сериализации данных формы
function serializeForm(elem){
    const formData ={};
    elem.forEach(input =>{
        // Игнорируем кнопку отправки
        if(input.type === 'submit') return;
        if(input.type !== 'checkbox') {
            // Сохраняем значение текстовых полей
            formData[input.name]= input.value;
        }
        if(input.type === 'checkbox') {
            // Сохраняем состояние чекбоксов
            formData[input.name]= input.checked;
        }
    })
    // Возвращаем объект с данными формы
    return formData;
}

// Функция для отображения развернутой карточки в виде модального окна
function showExpandedCard(dataCat) {
    const modal = document.createElement('div'); // Создаем элемент для модального окна
    modal.classList.add('modal'); // Добавляем класс для стилизации
    modal.innerHTML = `
        <div class="modal-content">
        <button class="close-btn"><i class="fa-solid fa-xmark"> </i></button>
            <h2>${dataCat.name}</h2>
            <img src="${dataCat.img_link}" alt="${dataCat.name}">
            <p>Порода: ${dataCat.breed}</p>
            <p>Возраст: ${dataCat.age}</p>
            <p>Описание: ${dataCat.description}</p>
        </div>
    `; // Заполняем разметку данными о котике

    // Добавляем обработчик для закрытия модального окна
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove(); // Удаляем модальное окно
    });

    // Добавляем модальное окно в body
    document.body.append(modal);
}

// Создаем экземпляр всплывающего окна для добавления котика
const AddCat = new Popup('popup-add-cats')
// Устанавливаем обработчики событий для всплывающего окна
AddCat.setEventListener()
// Устанавливаем обработчики событий для кнопок
// Открываем всплывающее окно при нажатии на кнопку
btnOpenPopup.addEventListener('click',()=>  AddCat.open());
// Обрабатываем отправку формы добавления котика
formCatAdd.addEventListener('submit', formAddCat)

// //Функция Авторизации
// function formFromAuthorization(event){
//     event.preventDefault();
//     const elementsFormAuthorization = [...formAuthorization.elements];
//     const dataFromForm = serializeForm(elementsFormAuthorization);
//     Cookies.set('email', `email=${dataFromForm.email}`)
//     // удаляем скрытие с кнопки добавления котика
//     btnOpenPopup.classList.remove('visually-hidden')
//     // закрываем окно авторизации 
//     authorization.close();
// }





// // Вызов модельного окна авторизации
// const authorization = new Popup('authorization')
// authorization.setEventListener()
// btnOpenAuthorization.addEventListener('click',()=>  authorization.open());
// formAuthorization.addEventListener('submit', formFromAuthorization)

// const auth = Cookies.get('email');


// if(!auth){
//     authorization.open();
//     // вешаем ласс скрытия на кнопку добавления котика
//     btnOpenPopup.classList.add('visually-hidden')
// }
