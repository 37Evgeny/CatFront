//  Используется localStorage для сохранения выбранной темы, чтобы она сохранялась при перезагрузке страницы.
 
// Элементы для отображения текущей темы и переключателя
const themeName = document.querySelector('.theme__name');
const sw = document.querySelector('.switch');
const img = document.querySelector('.theme__img');

// функция для установки заданной темы/цветовой схемы
function setTheme(themeName) {
   localStorage.setItem('theme', themeName);
   document.documentElement.className = themeName;
}

// Функция для переключения тем
function toggleTheme() {
   if (localStorage.getItem('theme') === 'theme-dark') {
       setTheme('theme-light');
       themeName.textContent = 'Light Theme';
       img.src = './sun-Photoroom.png'
   } else {
       setTheme('theme-dark');
       themeName.textContent = 'Dark Theme';
       img.src = './moon-Photoroom.png'
   }
}


// функция для установки темы при начальной загрузке
(function () {
   if (localStorage.getItem('theme') === 'theme-dark') {
       setTheme('theme-dark');
       document.getElementById('slider').checked = false;
       themeName.textContent = 'Dark Theme'
   } else {
       setTheme('theme-light');
     document.getElementById('slider').checked = true;
     themeName.textContent = 'Light Theme'
   }
})();

// Обработчик события на переключателе
sw.addEventListener('click', toggleTheme);