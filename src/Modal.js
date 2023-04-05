export default class Modal {
    modal;
    valores;
    receitas;
    despesas;
    saldo;
    index;
    constructor(receitas, despesas, saldo, modal, valores, index) {
        this.modal = modal;
        this.receitas = receitas;
        this.despesas = despesas;
        this.saldo = saldo;
        this.valores = valores;
        this.index = index;
        this.valores.length === 0 ? "<p>Não há itens na lista no momento.</p>" : this.createList();
    }
    openModal() {
        this.modal?.showModal();
    }
    closeModal() {
        this.modal?.close();
    }
    addValues() {
        let inputValue = document.getElementById('valor');
        let inputNameValue = document.getElementById('nome-valor');
        let enterChecked = document.getElementById('entrada');
        let leftChecked = document.getElementById('saida');
        if (inputValue.value === '' || inputNameValue.value === '' || (enterChecked.checked === false && leftChecked.checked === false)) {
            alert('Preencha todos os campos para continuar.');
            return undefined;
        }
        const list = {
            valor: this.normalizeNumbers(+inputValue.value),
            nomeValor: String(inputNameValue.value),
            checked: enterChecked.checked ? '<i class="fa-sharp fa-solid fa-arrow-up"></i>' : leftChecked.checked ? '<i class="fa-sharp fa-solid fa-arrow-down"></i>' : undefined
        };
        inputValue.value = '';
        inputNameValue.value = '';
        if (enterChecked.checked)
            enterChecked.checked = false;
        else if (leftChecked.checked)
            leftChecked.checked = false;
        this.valores.push(list);
        console.log(this.valores);
        this.createList();
        this.refreshBoxValues(this.index);
        return this.valores;
    }
    /**
     * Submete o formulário ao clique ou enter do usuário.
     * @param event
     */
    sendForm(event) {
        event.preventDefault();
    }
    /**
     * Converte o número(valor) inserido pelo usuário em uma moeda local(real).
     * @param value
     * @returns string
     */
    normalizeNumbers(value) {
        const newValue = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
        return newValue;
    }
    /**
     * Cria a lista contendo os valores(objetos) inseridos pelo usuário.
     * @param arr
     */
    createList() {
        let lista = document.querySelector('#list');
        let textoLista = document.querySelector('#list p');
        if (this.valores.length === 0) {
            lista.classList.add("emptyList");
        }
        if (textoLista) {
            lista.removeChild(textoLista);
        }
        lista.classList.add("list");
        return this.valores.forEach((item, index) => {
            index++;
            lista.innerHTML += `<p><span>${item.valor[index]}</span><span>${item.nomeValor[index]}</span><span>${item.checked ? item.checked[index] : null}}</span><i class="fa-thin fa-xmark"></i></p>`;
        });
    }
    /**
     * Atualiza o valor das caixas "receitas", "despesas" e "saldo".
     */
    refreshBoxValues(index, el) {
        let newReceita = this.normalizeNumbers(+this.receitas);
        let newDespesa = this.normalizeNumbers(+this.despesas);
        let newSaldo = this.normalizeNumbers(+this.saldo);
        if (this.valores.length === 0) {
            newReceita = 'R$0,00';
            newDespesa = 'R$0,00';
            newSaldo = 'R$0,00';
        }
        else if (el.value === 'enterChecked') {
            index++;
            newReceita += this.valores[index].valor;
            newSaldo += this.valores[index].valor;
        }
        else if (el.value === 'leftChecked') {
            index++;
            newDespesa -= this.valores[index].valor;
        }
    }
}
