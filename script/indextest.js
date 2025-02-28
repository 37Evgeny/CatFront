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
                        const cardInst = new Card(dataCat, '#card-template');
                        // Возвращаем разметку
                        const newCardElem = cardInst.getElement();
                        // Находим элемент с именем котика и добавляем обработчик нажатия
                        const catNameElement = newCardElem.querySelector('.card__name');
                        // Открываем модальное окно при нажатии на имя котика
                        catNameElement.addEventListener('click', () => showExpandedCard(dataCat)); 
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
            <h2><span class="cat-name">${dataCat.name}</span></h2>
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

// Функция для получения данных о породах из API
async function fetchBreeds() {
    try {
        const response = await fetch('http://89.111.169.234:3000/cats');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const dataCat = await response.json(); // Предполагаем, что API возвращает JSON
        const uniqueBreeds = [...new Set(dataCat.map(cat => cat.breed))]; // Удаляем дубликаты
        displayBreeds(uniqueBreeds); // Вызываем функцию для отображения пород
        // renderCards(dataCat); // Отображаем карточки
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

// Функция для отображения пород
function displayBreeds(breeds) {
    const breedLinks = breeds.map(breed => {
        return `<a href="#" class="breed__link">${breed}</a>`;
    }).join('');
    
    document.querySelector('.breed__sort').innerHTML = breedLinks;

    const breedLinksElements = document.querySelectorAll('.breed__link');
    breedLinksElements.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default action
            const selectedBreed = this.textContent; // Получаем выбранную породу
            filterCards(selectedBreed); // Фильтруем карточки
        });
    });
}

// Функция для отображения карточек
function renderCards(breeds) {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = ''; // Очищаем контейнер перед добавлением карточек
    breeds.forEach(dataCat => {
        const cardInst = new Card(dataCat, '#card-template');
        const newCardElem = cardInst.getElement();
        const catNameElement = newCardElem.querySelector('.card__name');
        catNameElement.addEventListener('click', () => showExpandedCard(dataCat)); // Открываем модальное окно при нажатии на имя котика
        cardsContainer.append(newCardElem);
    });
}

// Функция для фильтрации карточек
function filterCards(selectedBreed) {
    const cards = document.querySelectorAll('.cards .card');
    cards.forEach(card => {
        const cardBreed = card.querySelector('.card__breed').textContent; // Получаем породу из карточки
        if (cardBreed === selectedBreed || selectedBreed === '') {
            card.style.display = 'block'; // Показываем карточки выбранной породы
        } else {
            card.style.display = 'none'; // Скрываем остальные карточки
        }
    });
}

// Вызываем функцию после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    fetchBreeds(); // Запускаем получение данных
});

// Функция для отображения всех котиков
function showAllCats() {
    console.log('кнопка нажата')
    fetchBreeds(); // Вызываем функцию для получения всех котиков
}

// Добавляем обработчик события для кнопки
document.getElementById('showAllCats').addEventListener('click', showAllCats);

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
