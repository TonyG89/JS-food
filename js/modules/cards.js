import {getResource} from '../services/services'

function cards(){
//Использования классов для карточек
class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...classes) {
        this.src = src
        this.alt = alt
        this.title = title
        this.description = description
        this.price = price
        this.classes = classes
        this.parent = document.querySelector(parentSelector) //место куда будет пушаться 

        this.transfer = 30
        this.changeToUah()
    }
    changeToUah() {
        this.price *= this.transfer
    }
    render() {
        const element = document.createElement('div')
        if (this.classes.length === 0) { // если массив будет пустой(не будет строк)
            element.classList.add("menu__item")
        } else {
            this.classes.forEach(className => element.classList.add(className))
        }
        // element.classList.add('menu__item')
        element.innerHTML = `
        <div class="">
        <img src="${this.src}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`
        this.parent.append(element)
    }
}

const getResource = async (url) => { // постинг данных МОЖНО ЛИ ЗАКОМЕНТИРОВАТЬ?
    const res = await fetch(url)

    // ручная настройка кетчей(реджект) ошибки
    if (!res.ok) {
        throw new Error(`Couldn't fetch ${ulr}, status: ${res.status} `)
    }

    return await res.json()
}
// // один из способов! РАБОЧИЙ
// getResource('http://localhost:3000/menu')
// .then(data=>{
//     data.forEach(({img, altimg, title, descr, price})=>{
//         new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
//     })
// })

// способ axios
axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
        })
    })

// // !!! верстка налету - ДОДЕЛАТ!!!ВРОДЕ ОК
// getResource('http://localhost:3000/menu')
// .then(data=> createCard(data))
// function createCard(data){
//     data.forEach(({img, altimg, title, descr, price})=>{
//         const element=document.createElement('div')
//         element.innerHTML = `
//         <div class="">
//         <img src="${img}" alt="${altimg}">
//         <h3 class="menu__item-subtitle">${title}</h3>
//         <div class="menu__item-descr">${descr}</div>
//         <div class="menu__item-divider"></div>
//         <div class="menu__item-price">
//             <div class="menu__item-cost">Цена:</div>
//             <div class="menu__item-total"><span>${price}</span> грн/день</div>
//             </div>`
//         document.querySelector('.menu .container').append(element)
//     })
// }

// new MenuCard( //используется один раз
//     "img/tabs/vegy.jpg",
//     "vegy",
//     'Меню "Фитнес"',
//     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//     7,
//     '.menu .container',

// ).render()
}
 
export default cards