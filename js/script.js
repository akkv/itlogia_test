'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.nav__menu-icon');
  const menu = document.querySelector('.nav__list');
  const overlay = document.querySelector('.overlay');
  const form = document.querySelector('.form');
  const nameField = document.querySelector('.form__name');
  const phoneField = document.querySelector('.form__phone');

  form.addEventListener('submit', formSend);
  async function formSend(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      openModal();
      form.reset();
    } else {
      alert('Ошибка отправки');
    }
  }

  burger.addEventListener('click', () => {
    menu.classList.toggle('d-n-for-menu');
  });
  nameField.addEventListener('input', function () {
    this.value = this.value.replace(/\./g, '');
  });
  phoneField.addEventListener('input', function () {
    this.value = phoneMask(this.value);
  });
  function phoneMask(phone) {
    const regex = /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/g;
    const subst = '+$1 ($2) $3-$4-$5';
    return phone.replace(regex, subst);
  }

  function openModal() {
    document.addEventListener('keyup', escapeKeyHandler);
    overlay.addEventListener('click', overlayClickHandler);
    overlay.classList.remove('d-n');
  }
  function closeModal() {
    document.removeEventListener('keyup', escapeKeyHandler);
    overlay.removeEventListener('click', overlayClickHandler);
    overlay.classList.add('d-n');
  }
  function overlayClickHandler(e) {
    if (e.target.classList.contains('overlay') || e.target.classList.contains('modal__button')) {
      closeModal();
    }
  }
  function escapeKeyHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
});
