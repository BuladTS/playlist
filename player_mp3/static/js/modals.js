function modals() {
    const modalButtons = document.querySelectorAll('[data-modal-button]');
    const modalClosebuttons = document.querySelectorAll('[data-modal-close]');
    const allModals = document.querySelectorAll('[data-modal]');

    function closeAllModals() {
        allModals.forEach(function (item) {
            item.classList.add('hidden');
        })
    }

    modalButtons.forEach(function (item) {
        item.addEventListener('click', function () {
            closeAllModals();
            const modalId = this.dataset.modalButton;
            const modal = document.querySelector('#' + modalId);
            modal.classList.remove('hidden');
            modal.querySelector('.modal-window').addEventListener('click', function (event) {
                event.stopPropagation();
            })
        })
    })


    modalClosebuttons.forEach(function (item) {
        item.addEventListener('click', function () {
            const modal = this.closest('[data-modal]');
            modal.classList.add('hidden');
        })
    })


    allModals.forEach(function (item) {
        item.addEventListener('click', function () {
            this.classList.add('hidden');
        })
    })
}

modals();