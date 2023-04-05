export interface Obj {
    valor: string;
    nomeValor: string;
    checked: string | undefined;
}

export default class Modal {
    modal;
    valores;
    receitas;
    despesas;
    saldo;
    index;
    constructor(receitas: Element, despesas: Element, saldo: Element, modal: HTMLDialogElement | null, valores: Array<Obj>, index: number) {
        this.modal = modal
        this.receitas = receitas
        this.despesas = despesas
        this.saldo = saldo
        this.valores = valores
        this.index = index

        this.valores.length === 0 ? "<p>Não há itens na lista no momento.</p>" : this.createList()
    }
    public openModal(): void {
        this.modal?.showModal()
    }

    public closeModal(): void {
        this.modal?.close()
    }
    
    public addValues(): Obj[] | (undefined & void) {

        let inputValue = document.getElementById('valor') as HTMLInputElement;

        let inputNameValue = document.getElementById('nome-valor') as HTMLInputElement;

        let enterChecked = document.getElementById('entrada') as HTMLFormElement;
        let leftChecked = document.getElementById('saida') as HTMLFormElement;

        if (inputValue.value === '' || inputNameValue.value === '' || (enterChecked.checked === false && leftChecked.checked === false)) {
            alert('Preencha todos os campos para continuar.') 
            return undefined
            }
            const list: Obj = {
                valor: this.normalizeNumbers(+inputValue.value),
                nomeValor: String(inputNameValue.value),
                checked: enterChecked.checked ? '<i class="fa-sharp fa-solid fa-arrow-up"></i>' : leftChecked.checked ? '<i class="fa-sharp fa-solid fa-arrow-down"></i>' : undefined
        }
        inputValue.value = ''
        inputNameValue.value = ''
        if (enterChecked.checked) enterChecked.checked = false
        else if (leftChecked.checked) leftChecked.checked = false
        this.valores.push(list)
        console.log(this.valores)
        this.createList()
        this.refreshBoxValues(this.index, list.checked)
        return this.valores
    }

    /**
     * Submete o formulário ao clique ou enter do usuário.
     * @param event 
     */
    public sendForm(event: SubmitEvent): void {
        event.preventDefault()
    }

    /**
     * Converte o número(valor) inserido pelo usuário em uma moeda local(real).
     * @param value 
     * @returns string
     */
    private normalizeNumbers(value: number): string {
        const newValue = value.toLocaleString("pt-BR",{
            style: "currency",
            currency: "BRL"
        })
        return newValue
    }

    /**
     * Cria a lista contendo os valores(objetos) inseridos pelo usuário.
     * @param arr  
     */
    private createList() {

        let lista = document.querySelector('#list') as HTMLDivElement;
        let textoLista = document.querySelector('#list p') as HTMLDivElement;

        if (this.valores.length === 0) {

            lista.classList.add("emptyList")
        }

        if (textoLista) {
            lista.removeChild(textoLista)
        }

        lista.classList.add("list")

        return this.valores.forEach((item, index) => {
            index++
            lista.innerHTML += `<p><span>${item.valor[index]}</span><span>${item.nomeValor[index]}</span><span>${item.checked ? item.checked[index] : null}}</span><i class="fa-thin fa-xmark"></i></p>`;
        });
    }

    /**
     * Atualiza o valor das caixas "receitas", "despesas" e "saldo".
     */
    private refreshBoxValues(index: number, el: string): void {
        let newReceita = this.normalizeNumbers(+this.receitas)
        let newDespesa = this.normalizeNumbers(+this.despesas)
        let newSaldo = this.normalizeNumbers(+this.saldo)
        if (this.valores.length === 0) {
            newReceita = 'R$0,00'
            newDespesa = 'R$0,00'
            newSaldo = 'R$0,00'
        } else if (el === enterChecked) {
            index++
            newReceita += this.valores[index].valor
            newSaldo += this.valores[index].valor
        } else if (el.value === 'leftChecked') {
            index++
            newDespesa = newDespesa - this.valores[index].valor
            newSaldo -= this.valores[index].valor
        }
    }

}