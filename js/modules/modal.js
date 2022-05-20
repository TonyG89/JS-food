function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector)
    modal.classList.add('show')
    modal.classList.remove('hide')
    // modal.classList.toggle('show') //переключатель
    document.body.style.overflow = 'hidden' //убрать скролинг страницы
    if (modalTimerId){
        clearInterval(modalTimerId) // без повторного открытия модального окна через время, если мы его открыли до этого
            }
}

function modalCls(modalSelector) { // закрытие модального окна
    const modal = document.querySelector(modalSelector)
    modal.classList.add('hide')
    modal.classList.remove('show')
    document.body.style.overflow = ''
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //43 модальное окно

    const modalWindow = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        modalClose = document.querySelector('[data-close]')



    modalWindow.forEach(btn => { // работа всех кнопок(псевдомассив)
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId))
    })



    modalClose.addEventListener('click', modalCls)

    modal.addEventListener('click', (e) => { // закрытие модального окна при клике за его область
        if (e.target === modal) {
            modalCls(modalSelector)
        }
    })
    document.addEventListener('keydown', (e) => { // esc выход (гугл-event.code)
        if (e.code === 'Escape' && modal.classList.contains('show'))
            modalCls(modalSelector)
    })

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //пользователь долиста до конца страницы
            openModal(modalSelector, modalTimerId)
            window.removeEventListener('scroll', showModalByScroll) //срабатывание один раз
        }
    }
    window.addEventListener('scroll', showModalByScroll) // , {once:true} -срабатывание один раз
}
export default  modal
export {openModal, modalCls}