"use strict";

//функция для элементов меню
var menuLinks = document.querySelectorAll('.menu__link'); //перебираю все элементы и навешиваю на каждый из них клик

menuLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    menuLinks.forEach(function (link) {
      return link.classList.remove('link-active');
    });
    event.target.classList.add('link-active');
  });
}); //функция для ползунка, отвечающая за заполнение background при перемещении влево/вправо

var rangeEl = document.querySelector('.range-slider');
var orderCostEl = document.querySelector('.order-cost');

function range() {
  //получаю значение ползунка - максимальное значенеи 40 - это 100%, с учётом этого выполняется следующее вычисление
  var rangeValue = (30 - rangeEl.value) * 100 / 30;
  rangeEl.style.background = "linear-gradient(to left, rgb(255, 255, 255, 0) ".concat(rangeValue, "%, rgb(0, 102, 204) ").concat(rangeValue, "%)"); //преобразую значение из input в массив

  var array = orderCostEl.value.split(''); //прибаваляю 10 value, так как отсчет там начинается с 0 до 30 и преобразую в number;

  var rangeElValue = +rangeEl.value + 10;
  orderCostEl.value = rangeElValue + ' 000 000 ₽';
} //навешиваю функцию на событие input


rangeEl.addEventListener('input', range); //функция для указания площади объекта

var squareEl = document.getElementById('order-square');
var squareValue = +squareEl.value.replace(/[^+\d]/g, '');

function plusSquare() {
  if (squareValue === 1000) {
    squareValue = 1000;
  } else {
    squareValue++;
    squareEl.value = squareValue + ' м²';
  }
}

function minusSquare() {
  if (squareValue === 0) {
    squareValue = 0;
  } else {
    squareValue--;
    squareEl.value = squareValue + ' м²';
  }
} //навешиваю на input с вычислением площади событие, чтобы при редактировании получать новое значение value


squareEl.addEventListener('input', function () {
  squareValue = +squareEl.value.replace(/[^+\d]/g, '');
});
document.querySelector('.square-plus').addEventListener('click', plusSquare);
document.querySelector('.square-minus').addEventListener('click', minusSquare); //функция для проверки заполнения всех полей

var fields = document.querySelectorAll('.validation-field');

function validationForm(event) {
  event.preventDefault();

  for (var i = 0; i < fields.length; i++) {
    console.log(fields[i].previousElementSibling);
    fields[i].previousElementSibling.classList.remove('field-error');
    fields[i].previousElementSibling.classList.remove('field-correct'); //если поле пустое

    if (!fields[i].value) {
      fields[i].previousElementSibling.classList.add('field-error');
    } else {
      fields[i].previousElementSibling.classList.add('field-correct');
    }
  }
}

document.querySelector('.form-order').addEventListener('submit', validationForm); //функция для кнопки

var btnTopEl = document.querySelector('.button-top'); //получаю текущую прокрутку

window.addEventListener('scroll', function () {
  if (window.pageYOffset >= 900) {
    btnTopEl.style.opacity = "100%";
  } else {
    btnTopEl.style.opacity = 0;
  }
}); //при клике перехожу в верхнюю часть страницы

btnTopEl.addEventListener('click', function () {
  window.scrollBy(0, -window.pageYOffset);
});