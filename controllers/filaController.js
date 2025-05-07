const minhaFila = new FilaCircular(5); // Cria uma fila circular com tamanho 5
let contador = 0; // Contador global para rastrear a quantidade de pessoas na fila

// Adiciona um novo elemento na fila
function addElemento() {
   const inputNome = document.getElementById("txtnovoNome");
   const inputCPF = document.getElementById("txtnovoCPF");

   // Verifica se há espaço na fila
   if (!minhaFila.isFull()) {
      const novoAtendimento = new Atendimento(inputNome.value, inputCPF.value);
      minhaFila.enqueue(novoAtendimento); // Insere na fila
      contador++; // Incrementa o contador global
      mostrarFila(); // Atualiza a exibição da fila

      // Limpa os campos de entrada
      inputNome.value = "";
      inputCPF.value = "";
      inputNome.focus();
   } else {
      alert("Fila cheia!");
   }
}

// Atualiza a visualização da fila na tela
function mostrarFila() {
   const listaFila = document.getElementById("listFila");
   listaFila.innerHTML = ""; // Limpa a lista atual

   // Itera pela fila e adiciona os elementos na lista HTML
   for (let item of minhaFila) {
      const listaElemento = document.createElement("li");
      listaElemento.textContent = item; // toString() do Atendimento será chamado
      listaFila.appendChild(listaElemento);
   }
}

// Remove o primeiro elemento da fila (atendimento)
function atenderFila() {
   if (!minhaFila.isEmpty()) {
      const atendido = minhaFila.dequeue(); // Remove o primeiro da fila
      contador--; // Decrementa o contador global

      const horaAtendimento = obterHoraAtual();
      const diferenca = calcularDiferencaHoras(atendido.horaChegada, horaAtendimento);

      const mostraratendimento = document.getElementById("mensagem-remocao");
      mostraratendimento.textContent = "Pessoa atendida: " + atendido.nome + " | Espera: " + diferenca;

      mostrarFila(); // Atualiza a lista exibida

      localStorage.setItem('ultimoAtendido', atendido.nome); // Salva localmente o último atendido

   } else {
      alert("Fila vazia!");
      localStorage.setItem('ultimoAtendido', "Aguardando...");
   }
}

// Busca uma pessoa na fila pelo CPF
function buscarCpf() {
   const inputCPF = document.getElementById("txtnovoCPF").value;
   let posicao = 1; // Contador de posição para mostrar onde está na fila

   for (let item of minhaFila) {
      if (item.cpf === inputCPF) {
         alert(
            "Pessoa encontrada:\n" +
            "Nome: " + item.nome + "\n" +
            "CPF: " + item.cpf + "\n" +
            "Hora de chegada: " + item.horaChegada + "\n" +
            "Posição na fila: " + posicao
         );
         return item;
      }
      posicao++;
   }

   alert("CPF não encontrado na fila.");
   return null;
}

// Retorna a data atual formatada como dd/mm/aaaa
function obterDataAtual() {
   let dataAtual = new Date();
   let dia = dataAtual.getDate();
   let mes = dataAtual.getMonth() + 1;
   let ano = dataAtual.getFullYear();
   return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
}

// Retorna a hora atual formatada como hh:mm:ss
function obterHoraAtual() {
   const data = new Date();
   const hora = data.getHours().toString().padStart(2, '0');
   const minuto = data.getMinutes().toString().padStart(2, '0');
   const segundo = data.getSeconds().toString().padStart(2, '0');
   return `${hora}:${minuto}:${segundo}`;
}

// Calcula a diferença entre duas horas no formato hh:mm:ss
function calcularDiferencaHoras(hora1, hora2) {
   const [h1, m1, s1] = hora1.split(':').map(Number);
   const [h2, m2, s2] = hora2.split(':').map(Number);

   const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
   const horas = Math.floor(diferencaSegundos / 3600);
   const minutos = Math.floor((diferencaSegundos % 3600) / 60);
   const segundos = diferencaSegundos % 60;

   return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
