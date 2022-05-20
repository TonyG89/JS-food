import {openModal, modalCls} from './modal'
import {postData} from '../services/services'

function forms(formSelector, modalTimerId){
    // Forms (НЕ РАБОТАЕТ!!!)
// ПЕРВЫЙ МЕТОД - НЕ РАБОТАЕТ
// const forms = document.querySelectorAll('form'),
//     message = {
//         loading: 'Загрузка',
//         success: 'Спасибо! мы с Вами свяжемся',
//         failure: 'Что-то пошло не так...'
//     }

// forms.forEach(item => {
//     postData(item)
// })

// function postData(form) {
//     form.addEventListener('submit', (e) => {
//         e.preventDefault() // вначале AJAX всегда идет

//         const statusMessage = document.createElement('div')
//         statusMessage.classList.add('status')
//         statusMessage.textContent = message.loading
//         form.append(statusMessage)

//         const request = new XMLHttpRequest()
//         request.open('POST', 'server.php')

//         // request.setRequestHeader('Content-type', 'multipart/form-data') // при использовании XMLHttpRequest и FormData надо отключать
//         const formData = new FormData(form)

//         request.send(formData)

//         request.addEventListener('load', () => {
//             if (request.status === 200) {
//                 console.log(request.response)
//                 statusMessage.textContent = message.success
//                 form.reset()
//                 setTimeout(()=>{
//                     statusMessage.remove()
//                 }, 2000)
//             } else {
//                 statusMessage.textContent = message.failure
//             }
//         })
//     })
// }

//ВТОРОЙ МЕТОД РАБОЧИЙ МЕТОД
const forms = document.querySelectorAll(formSelector),
message = {
loading: 'icons/spinner.svg',
success: 'Спасибо! мы с Вами свяжемся',
failure: 'Что-то пошло не так...'
}

forms.forEach(item => {
bindPostData(item)
})



function bindPostData(form) { //привязка данных
form.addEventListener('submit', (e) => {
e.preventDefault() // вначале AJAX всегда идет

const statusMessage = document.createElement('img')
statusMessage.src = message.loading
statusMessage.style.cssText = `
display:block;
margin: 0 auto;`
form.insertAdjacentElement('afterend', statusMessage) // аналог append, но переносит начинает работать с другого элемента

const formData = new FormData(form)


const object = {};
formData.forEach(function (value, key) {
object[key] = value
})
const json = JSON.stringify(object)



postData('http://localhost:3000/requests', json)
// .then(data => data.text()) // ТРАНСФОРМАЦИЯ ДАННЫХ ретурн!!
.then(data => {
showThanksModal(message.success)
form.reset()
statusMessage.remove()
}).catch(() => {
showThanksModal(message.failure)
}).finally(() => {
form.reset()
})


})
}
// 054 красивое оповещение пользователя
function showThanksModal(message) {
const prevModalDialog = document.querySelector('.modal__dialog')

prevModalDialog.classList.add('hide')
openModal('.modal', modalTimerId)

// создаем обертку html
const thanksModal = document.createElement('div')
thanksModal.classList.add('modal__dialog')
thanksModal.innerHTML = `
<div class="modal__content">
<div class="modal__close" data-close>x</div>
<div class="modal__title">${message}</div>
</div>`

document.querySelector('.modal').append(thanksModal)
setTimeout(() => {
thanksModal.remove()
prevModalDialog.classList.add('show')
prevModalDialog.classList.remove('hide')
modalCls('.modal')
}, 3000)
}

// API FETCH - НЕ ДО КОНЦА СДЕЛАНО, ОШИБКА

fetch('http://localhost:3000/requests')
.then(data => data.json())
.then(res => console.log(res))



}

export default forms