import Modal from "./Modal.js";
let valorReceitas = document.querySelector(".box-value #valor-Receitas");
let valorDespesas = document.querySelector(".box-value #valor-Despesas");
let valorSaldo = document.querySelector(".box-value #valor-Saldo");
const button = document.getElementById('add-btn');
const closeButton = document.getElementById('close-btn');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const button2 = document.getElementById('add-btn2');
let valores = [];
if (valorReceitas && valorDespesas && valorSaldo && button && closeButton && dialog && button2 && form) {
    const modal = new Modal(valorReceitas, valorDespesas, valorSaldo, dialog, valores);
    button.addEventListener('click', () => modal.openModal());
    closeButton.addEventListener('click', () => modal.closeModal());
    button2.addEventListener('click', () => modal.addValues());
    button2.addEventListener('keyup', () => modal.addValues());
    form.addEventListener('submit', (e) => modal.sendForm(e));
}
