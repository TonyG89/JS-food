window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items')

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = "none"
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block'
        tabs[i].classList.add('tabheader__item_active')
    }
    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (e.target === item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })


    // 41 обратный отчет
    const deadline = "2022/04/25"

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24)
        minutes = Math.floor((t / (1000 * 60) % 60))
        seconds = Math.floor((t / 1000) % 60)
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds')
        timeInterval = setInterval(updateClock, 1000)
        updateClock()

        function updateClock() {
            const t = getTimeRemaining(endtime)
            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if (t.total <= 0) {
                clearInterval(timeInterval) // не срабатывает
                days.innerHTML = "00"
                hours.innerHTML = '00'
                minutes.innerHTML = '00'
                seconds.innerHTML = '00'
            }
        }
    }
    setClock('.timer', deadline)

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    //43 модальное окно

    const modalWindow = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]')

    function openModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        // modal.classList.toggle('show') //переключатель
        document.body.style.overflow = 'hidden' //убрать скролинг страницы
        clearInterval(modalTimerId) // без повторного открытия модального окна через время, если мы его открыли до этого
    }

    modalWindow.forEach(btn => { // работа всех кнопок(псевдомассив)
        btn.addEventListener('click', openModal)
    })



    function modalCls() { // закрытие модального окна
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow = ''
    }

    modalClose.addEventListener('click', modalCls)
    // () => {
    // modal.classList.add('hide')
    // modal.classList.remove('show')
    // // modal.classList.toggle('show') //переключатель
    // document.body.style.overflow=''
    // })

    modal.addEventListener('click', (e) => { // закрытие модального окна при клике за его область
        if (e.target === modal) {
            // modal.classList.add('hide')
            // modal.classList.remove('show')
            // document.body.style.overflow=''
            modalCls()
        }
    })
    document.addEventListener('keydown', (e) => { // esc выход (гугл-event.code)
        if (e.code === 'Escape' && modal.classList.contains('show'))
            modalCls()
    })

    // открытие модального окна через время или при пролистывании сайта до конца
    const modalTimerId = setTimeout(openModal, 2000)

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //пользователь долиста до конца страницы
            openModal()
            window.removeEventListener('scroll', showModalByScroll) //срабатывание один раз
        }
    }
    window.addEventListener('scroll', showModalByScroll) // , {once:true} -срабатывание один раз

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
    const forms = document.querySelectorAll('form'),
        message = {
            loading: 'icons/spinner.svg',
            success: 'Спасибо! мы с Вами свяжемся',
            failure: 'Что-то пошло не так...'
        }

    forms.forEach(item => {
        bindPostData(item)
    })

    // пост данных(шаблон)
    const postData = async (url, data) => { // постинг данных
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })

        return await res.json()
    }

    function bindPostData(form) { //привязка данных
        form.addEventListener('submit', (e) => {
            e.preventDefault() // вначале AJAX всегда идет

            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
        display:block;
        margin: 0 auto;`
            // form.append(statusMessage) 
            form.insertAdjacentElement('afterend', statusMessage) // аналог append, но переносит начинает работать с другого элемента

            // используем вместо этого fetch!
            // const request = new XMLHttpRequest()
            // request.open('POST', 'server.php')

            // request.setRequestHeader('Content-type', 'multipart/json') // при использовании XMLHttpRequest и FormData надо отключать

            const formData = new FormData(form)


            // ПЕРЕВОД ОБЬЕКТА
            // const json = JSON.stringify(Object.fromEntries(formData.enteries()))
            // АНАЛОГ в одну строчку, но не работает.
            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value
            })
            const json = JSON.stringify(object)



            // //!!! C ОБЬЕКТА В МАСИВ С МАСИВА В ОБЬЕКТ
            // const obj={a:23,b:50}
            // console.log(obj)
            // console.log(Object.entries(obj))
            // console.log(Object.fromEntries(Object.entries(obj)));

            // const json = JSON.stringify(object)

            // request.send(json)

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


            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response)
            //         showThanksModal(message.success)
            //         form.reset()
            //         statusMessage.remove()
            //     } else {
            //         showThanksModal(message.failure)
            //     }
            // })

        })
    }
    // 054 красивое оповещение пользователя
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.classList.add('hide')
        openModal()

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
        }, 3000)
    }

    // API FETCH - НЕ ДО КОНЦА СДЕЛАНО, ОШИБКА

    fetch('http://localhost:3000/requests')
        .then(data => data.json())
        .then(res => console.log(res))



    //SLIDER 


    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width // COMPUTED - CHROME


    let slideIndex = 1,
        offset = 0
    // изменение чисел
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length
        current.textContent = slideIndex
    }

    //анимация и переходы каресели
    slidesField.style.width = 100 * slides.length + '%'
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden'

    slides.forEach(slide => {
        slide.style.width = width // чтоб все слайды были одинаковой ширины
    })


    //точки снизу
    slider.style.position = "relative"

    const indicators = document.createElement('ol'),
        dots = []
    indicators.classList.add('carousel-indicators')
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `
    slider.append(indicators)

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i + 1)
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;`
        if (i == 0) {
            dot.style.opacity = 1
        }
        indicators.append(dot)
        dots.push(dot) // помещаем в массив
    }
    // перелистывание
    function dotsList() {
        dots.forEach(dot => {
            dot.style.opacity = '0.5'
        })
        dots[slideIndex - 1].style.opacity = '1'
    }

    function doubleZero() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '')
    }



    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')
            slideIndex = slideTo
            offset = deleteNotDigits(width) * (slideTo - 1)

            slidesField.style.transform = `translateX(-${offset}px`

            doubleZero()
            dotsList()

        })
    })

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // переводим переменную в числовой тип данный и вырезаем 2 последних символа в строке
            offset = 0
        } else {
            offset += deleteNotDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px`

        if (slideIndex == slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }

        doubleZero()
        dotsList()
    })

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1) // перевеодим переменную в числовой тип данный и вырезаем(slice(0, width.length - 2)) 2 последних символа в строке
        } else {
            offset -= deleteNotDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px`

        if (slideIndex == 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        }

        doubleZero()
        dotsList()
    })

    // CALC
    const result = document.querySelector('.calculating__result span')

    let sex, height, weight, age, ratio

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
        localStorage.setItem('sex', 'female')
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = '1.375'
        localStorage.setItem.getItem('ratio', '1.375')
    }

    function iniLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector)
        elements.forEach(elem => {
            elem.classList.remove(activeClass)
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass)
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass)
            }
        })
    }

    iniLocalSettings('#gender', 'calculating__choose-item_active')
    iniLocalSettings('.calculating__choose_big', 'calculating__choose-item_active')

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) { // какая-то из переменных будет не заполнена (нет пола или нет роста или нета веса)
            result.textContent = '_____'
            return
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio) // округления в целое
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)

        }
    }



    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(`${selector}`) // берем с родительского эллемента.

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')) // занесение данный в локалстораж
                } else {
                    sex = e.target.getAttribute('id')
                    localStorage.setItem('sex', e.target.getAttribute('id')) // занесение данный в локалстораж
                }

                elements.forEach(elem => { // каждый активный элемент ... 
                    elem.classList.remove(activeClass) // убираем подсветку кнопки при нажатии
                })
                e.target.classList.add(activeClass) // добавляем подсветку при нажатии 

                calcTotal()
            })
        })

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active')

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector)

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) { // если там не число
                input.style.border = '1px solid red'
                res
            } else {
                input.style.border = 'none'
                switch (input.getAttribute('id')) { // если в указаной кейсом id будет значение
                    case 'height':
                        height = +input.value
                        break
                    case 'weight':
                        weight = +input.value
                        break
                    case 'age':
                        age = +input.value
                        break
                }
            }


            calcTotal()
        })

    }
    getDynamicInformation('#height')
    getDynamicInformation('#weight')
    getDynamicInformation('#age')


})