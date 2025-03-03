const cards = document.querySelectorAll('.card');
console.log(cards)

cards.forEach(card => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
    card.addEventListener('dragover', dragOver);
    card.addEventListener('drop', drop);
});

let draggedCard = null;

function dragStart(e) {
    draggedCard = e.target; // Сохраняем ссылку на перетаскиваемую карточку
    e.target.classList.add('dragging');
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault(); // Позволяет элементу быть перетаскиваемым
}

function drop(e) {
    e.preventDefault();
    if (e.target.classList.contains('card') && e.target !== draggedCard) {
        // Перемещаем карточку
        const targetCard = e.target;
        const parent = targetCard.parentNode;
        parent.insertBefore(draggedCard, targetCard.nextSibling);
    }
}