
const CONFIG_API = {
    url: 'http://89.111.169.234:3000',
    headers: {
        'Content-Type': 'application/json' // учтите, что заглавные буквы могут иметь значение, в зависимости от сервера
    }
};

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    // Метод для обработки ответа
    _onRes(response) {
        if (!response.ok) {
            // Если статус ответа не в диапазоне 200-299, возвращаем ошибку
            return Promise.reject({ ...response, message: "Server side error!!!" });
        }
        return response.json(); // Возвращаем данные в формате JSON
    }

    // Получаем всех котиков с сервера
    getAllCats() {
        // Возвращаем цепочку промисов
        return fetch(`${this._url}/cats`, {
            method: 'GET',
            headers: this._headers // добавляем заголовки
        }).then(this._onRes); // Возвращаем результат обработки
    }

    // Добавить котика на сервер
    addNewCat(data){
        return fetch(`${this._url}/cats`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this._headers
        }).then(this._onRes)
    }

    // удаления котика по ID
    deleteCat(catId) {
    return fetch(`${this._url}/cats/${catId}`, {
        method: 'DELETE',
        headers: this._headers
    })
    .then(this._onRes)
}

  // Установка удаление лайkа
  changeLikeCat(catId, isLike) {
    return fetch(`${this._url}/cats/likes/${catId}`,{
        method: isLike? "DELETE" : "PUT",
        headers: this._headers 
    } ).then(onResponce)
    // .catch((err) => { console.log(`ошибка ${err}`) })
}


}

const api = new Api(CONFIG_API);

