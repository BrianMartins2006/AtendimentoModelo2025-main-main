class Atendimento{
    #nome;
    #cpf;
    data;
    horaChegada;

constructor(nome,cpf){
    this.nome = nome;
    this.cpf = cpf;
    this.data = obterDataAtual();
    this.horaChegada = obterHoraAtual();
}
get nome() {
    return this.#nome;
}

get cpf() {
    return this.#cpf;
}

set nome(novoNome) {
    this.#nome = novoNome;
}

set cpf(novoCpf) {
    this.#cpf = novoCpf;
}


    toString(){
        return this.nome + "  Cpf: " + this.cpf + "  " + this.data + " Hora de chegada: " + this.horaChegada;
    }

}