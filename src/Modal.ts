export interface Obj {
    id: number;
    valor: string;
    nomeValor: string;
    checked: string | undefined;
}

export default class Modal {
    modal;
    receitas;
    despesas;
    saldo;
    valores;
    constructor(receitas: HTMLInputElement, despesas: HTMLInputElement, saldo: HTMLInputElement, modal: HTMLDialogElement | null, valores: Array<Obj>) {
        this.modal = modal
        this.receitas = receitas
        this.despesas = despesas
        this.saldo = saldo
        this.valores = valores

        if (this.valores.length === 0) {
            this.receitas.innerText = 'R$ 0,00'
            this.despesas.innerText = 'R$ 0,00'
            this.saldo.innerText = 'R$ 0,00'
        }

        //this.valores.length === 0 ? "<p>Não há itens na lista no momento.</p>" : this.createList()
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
            let list: Obj = {
                id: Math.random(),
                valor: this.normalizeNumbers(+inputValue.value),
                nomeValor: String(inputNameValue.value),
                checked: enterChecked.checked ? '<i class="fa-sharp fa-solid fa-arrow-up arrowUp-icon"></i>' : leftChecked.checked ? '<i class="fa-sharp fa-solid fa-arrow-down arrowDown-icon"></i>' : undefined
        }
        inputValue.value = ''
        inputNameValue.value = ''

        this.getAmount(list)

        const trash = document.querySelector('.trash-icon')

        trash?.addEventListener('click', () => this.removeItem(list.id))

        if (enterChecked.checked) enterChecked.checked = false
        else if (leftChecked.checked) leftChecked.checked = false

        this.valores.push(list)
        this.createList()

        this.closeModal()

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

        return this.valores.map((item) => {
            lista.innerHTML += `<div class="itemValues">

             <label for="item-valor">Valor:</label>
             <span id="item-valor">${item.valor}</span>
             
             <label for="item-nomeValor">Referente a:</label>
             <span id="item-nomeValor">${item.nomeValor}</span>
             
             <label for="item-checked">Tipo:</label>
             <span id="item-checked">${item.checked ? item.checked : null}</span>

             <i class="fa-solid fa-trash trash-icon"></i>
            </div>`;
        });
    }

    private getAmount(list: Obj) {
        const positiveValue = this.valores.filter((item) => {
            item.checked == 'enterChecked'
        })

        const negativeValue = this.valores.filter((item) => {
            item.checked == 'leftChecked'
        })
        
        if (list.checked == 'enterChecked') {
            positiveValue.reduce((acc, curr) => {
                let receitasValue = this.addNumbers(acc, curr.valor)
                return receitasValue
            }, this.receitas.value)
            this.receitas.innerText += this.normalizeNumbers(+positiveValue)
            this.saldo.innerText += this.normalizeNumbers(+positiveValue)
        } else if (list.checked == 'leftChecked') {
            negativeValue.reduce((acc, curr) => {
                let despesasValue = this.addNumbers(acc.valor, curr.valor)
                return despesasValue
            }, this.despesas.value)
            this.despesas.innerText = this.normalizeNumbers(+negativeValue)
            this.saldo.innerText = -this.normalizeNumbers(+positiveValue) - -this.normalizeNumbers(+negativeValue)
        }
    }

    private removeItem(index: number) {
        const lista = document.querySelector('#list') as HTMLDivElement
        lista.innerHTML += this.valores.filter((item) => {
            !(item.id === index)
        })
    }

    private addNumbers(value1: number | string, value2: number | string) {
        if (typeof value1 === "number" && typeof value2 === "number") {
            const newValue = value1 + value2
            return this.normalizeNumbers(newValue)
        } else if (typeof value1 === "number" && typeof value2 === 'number') {
            const newValue = Number(value1 + value2)
            return this.normalizeNumbers(newValue)
        }
    }
}