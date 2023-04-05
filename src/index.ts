import Modal from "./Modal.js"
import { Obj } from "./Modal.js"

let valorReceitas = document.querySelector("#valor-Receitas")
let valorDespesas = document.querySelector("#valor-Despesas")
let valorSaldo =  document.querySelector("#valor-Saldo")

const button = document.getElementById('add-btn')
const closeButton = document.getElementById('close-btn')
const dialog = document.querySelector('dialog')

const form = document.querySelector('form')

const button2 = document.getElementById('add-btn2')

let valores: Array<Obj> = []

if (valorReceitas && valorDespesas && valorSaldo && button && closeButton && dialog && button2 && form) {
    const modal = new Modal(valorReceitas, valorDespesas, valorSaldo, dialog, valores, 0)
    button.addEventListener('click', () => modal.openModal())
    closeButton.addEventListener('click', () => modal.closeModal())
    button2.addEventListener('click', () => modal.addValues())
    button2.addEventListener('keyup', () => modal.addValues())
    form.addEventListener('submit', (e) => modal.sendForm(e))
}