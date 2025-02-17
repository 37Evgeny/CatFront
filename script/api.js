// const CONFIG_API = {
//     url: 'http://89.111.169.234:3000',
//     headers: {
//         'Content-type': 'application/json'
//     }
// }

// class Api {
//     constructor(config){
//         this._url = config.url;
//         this._headers = config.headers;
//     }

//      // Метод  
//      _onRes(response){
//         // const cats = await response.json(); // Извлекаем данные
        
//         return response.ok ? response.json() : Promise.reject({...response, message: "Server side error!!!"})
       
//     }

//     // Получаем всех котиков с сервера
//      getAllCats(){
//         // return вернуть цепочку промисов
//        return fetch(`${this._url}/cats`, {
//             method: 'GET'
//         }).then(this._onRes)  
       
//     }



// // // Добавить котика на сервер
// //     addNewCat(data){
// //         return fetch(`${this._url}/add`, {
// //             method: 'POST',
// //             body: JSON.stringify(data),
// //             headers: this._headers
// //         }).then(this._onRes)
// //     }
// }

// const api = new Api(CONFIG_API);

// const CONFIG_API = {
//     url: 'http://89.111.169.234:3000',
//     headers: {
//         'Content-Type': 'application/json' // учтите, что заглавные буквы могут иметь значение, в зависимости от сервера
//     }
// };

// class Api {
//     constructor(config) {
//         this._url = config.url;
//         this._headers = config.headers;
//     }

//     // Метод для обработки ответа
//     _onRes(response) {
//         if (!response.ok) {
//             // Если статус ответа не в диапазоне 200-299, возвращаем ошибку
//             return Promise.reject({ ...response, message: "Server side error!!!" });
//         }
//         console.log(response.json())
//         return response.json(); // Возвращаем данные в формате JSON
//     }

//     // Получаем всех котиков с сервера
//     getAllCats() {
//         // Возвращаем цепочку промисов
//          return fetch(`${this._url}/cats`, {
//             method: 'GET',
//             headers: this._headers // добавляем заголовки
//         }).then(this._onRes)
//     }

//     // Добавить котика на сервер
//     addNewCat(data) {
//         return fetch(`${this._url}/add`, {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: this._headers
//         }).then(this._onRes);
//     }
// }

// const api = new Api(CONFIG_API);

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

    // Метод для удаления котика по ID
deleteCat(catId) {
    return fetch(`${this._url}/cats/${catId}`, {
        method: 'DELETE',
        headers: this._headers
    })
    .then(this._onRes)
}
}

const api = new Api(CONFIG_API);

