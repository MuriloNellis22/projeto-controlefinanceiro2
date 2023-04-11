import Modal from "./Modal.js"
import { Obj } from "./Modal.js"

let valorReceitas = document.querySelector(".box-value #valor-Receitas") as HTMLInputElement;
let valorDespesas = document.querySelector(".box-value #valor-Despesas") as HTMLInputElement;
let valorSaldo =  document.querySelector(".box-value #valor-Saldo") as HTMLInputElement;

const button = document.getElementById('add-btn')
const closeButton = document.getElementById('close-btn')
const dialog = document.querySelector('dialog')

const form = document.querySelector('form')

const button2 = document.getElementById('add-btn2')

let valores: Array<Obj> = []

if (valorReceitas && valorDespesas && valorSaldo && button && closeButton && dialog && button2 && form) {
    const modal = new Modal(valorReceitas, valorDespesas, valorSaldo, dialog, valores)
    button.addEventListener('click', () => modal.openModal())
    closeButton.addEventListener('click', () => modal.closeModal())
    button2.addEventListener('click', () => modal.addValues())
    button2.addEventListener('keyup', () => modal.addValues())
    form.addEventListener('submit', (e) => modal.sendForm(e))
}