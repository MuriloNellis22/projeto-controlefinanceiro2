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
    list;
    constructor(receitas: Element, despesas: Element, saldo: Element, modal: HTMLDialogElement | null, valores: Array<Obj>, list: Obj) {
        this.modal = modal
        this.receitas = receitas
        this.despesas = despesas
        this.saldo = saldo
        this.valores = valores
        this.list = list

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
            this.list = {
                valor: this.normalizeNumbers(+inputValue.value),
                nomeValor: String(inputNameValue.value),
                checked: enterChecked.checked ? '<i class="fa-sharp fa-solid fa-arrow-up"></i>' : leftChecked.checked ? '<i class="fa-sharp fa-solid fa-arrow-down"></i>' : undefined
        }
        inputValue.value = ''
        inputNameValue.value = ''
        if (enterChecked.checked) enterChecked.checked = false
        else if (leftChecked.checked) leftChecked.checked = false
        this.valores.push(this.list)
        console.log(this.valores)
        this.createList()
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

        function gerarLista(el: HTMLDivElement, arr: Obj[], item: Obj) {
            for (let index = 0; arr.length > 0; index++) {
                el.innerHTML += `<p><span>${item.valor[index]}</span><span>${item.nomeValor[index]}</span><span>${item.checked ? item.checked[index] : null}}</span><i class="fa-thin fa-xmark"></i></p>`
              }
        }
        return gerarLista(lista, this.valores, this.list)
    }

    /**
     * Atualiza o valor das caixas "receitas", "despesas" e "saldo".
     */
    private refreshBoxValues(index: number) {
        let newReceita = String(this.receitas)
        let newDespesa = String(this.despesas)
        let newSaldo = String(this.saldo)
        if (this.valores.length === 0) {
            newReceita = 'R$0,00'
            newDespesa = 'R$0,00'
            newSaldo = 'R$0,00'
        } else {
            index++
            newReceita = this.normalizeNumbers(+newReceita) + this.valores[index].valor
            newDespesa = this.normalizeNumbers(+newDespesa) + this.valores[index].valor
        }
    } 

}