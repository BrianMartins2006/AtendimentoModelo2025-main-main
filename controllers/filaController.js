const minhaFila = new FilaCircular(5);


function addElemento(){
   const inputNome = document.getElementById("txtnovoNome");
   const inputCPF = document.getElementById("txtnovoCPF");
    if(!minhaFila.isFull()){
       const novoAtendimento = new Atendimento(inputNome.value,inputCPF.value);
       
       minhaFila.enqueue(novoAtendimento);
       mostrarFila();
       inputNome.value = "";
       inputCPF.value = "";
       inputNome.focus();
    } 
    else
        alert("Fila cheia!");     
}// fim addElemento

//-----------------------------------
function mostrarFila(){
   const listaFila = document.getElementById("listFila");
 //  listaFila.textContent = minhaFila.toString();
   listaFila.innerHTML = ""; // limpa a lis
   for(let item of minhaFila){
      const listaElemento = document.createElement("li");
      listaElemento.textContent = item;
      listaFila.appendChild(listaElemento);
   }
}

//-----------------------------
function atenderFila(){
   if(!minhaFila.isEmpty()){
     const atendido = minhaFila.dequeue();
     const horaAtendimento = obterHoraAtual();
     const diferenca = calcularDiferencaHoras(atendido.horaChegada, horaAtendimento);
     
     //alert("Pessoa atendida: " + atendido.nome + " Tempo de espera: " + diferenca);

     const mostraratendimento = document.getElementById("mensagem-remocao");
     mostraratendimento.textContent = "Pessoa atendida: " + atendido.nome + " | Espera: " + diferenca;
     
     mostrarFila();
     localStorage.setItem('ultimoAtendido', atendido.nome);
     //localStorage.setItem('ultimoAtendido', JSON.stringify(atendido));
     //atualizarUltimoAtendimento();
     //localStorage.setItem('ultimoAtendido', atendido.nome);
   }
   else {
      alert("Fila vazia!");
      localStorage.setItem('ultimoAtendido', "Aguardando...");
   }
}

function buscarCpf() {
   const inputCPF = document.getElementById("txtnovoCPF").value;

   for (let item of minhaFila) {
      if (item.cpf === inputCPF) {
         alert(
            "Pessoa encontrada:\n" +
            "Nome: " + item.nome + "\n" +
            "CPF: " + item.cpf + "\n" +
            "Hora de chegada: " + item.horaChegada
            
         );
         
         return item;
      }
   }

   alert("CPF não encontrado na fila.");
   return null;
}


// Função para obter a data atual formatada
function obterDataAtual() {
   let dataAtual = new Date();
   let dia = dataAtual.getDate();
   let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
   let ano = dataAtual.getFullYear();
   return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
}

// Função para obter a hora atual formatada
function obterHoraAtual() {
   const data = new Date();
   const hora = data.getHours().toString().padStart(2, '0');
   const minuto = data.getMinutes().toString().padStart(2, '0');
   const segundo = data.getSeconds().toString().padStart(2, '0');
   return `${hora}:${minuto}:${segundo}`;
}


function calcularDiferencaHoras(hora1, hora2) {
   const [h1, m1, s1] = hora1.split(':').map(Number);
   const [h2, m2, s2] = hora2.split(':').map(Number);
   const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
   const horas = Math.floor(diferencaSegundos / 3600);
   const minutos = Math.floor((diferencaSegundos % 3600) / 60);
   const segundos = diferencaSegundos % 60;
   return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}