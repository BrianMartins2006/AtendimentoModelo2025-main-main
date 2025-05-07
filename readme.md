# Sistema de Controle de Fila de Atendimento

Este projeto implementa um **sistema de gerenciamento de fila circular de atendimentos**. Ele permite adicionar, remover e buscar pessoas na fila, registrar o tempo de espera e exibir informações sobre o último atendimento.

## 📌 Funcionalidades

- **Adicionar um atendimento**: Insere um novo atendimento na fila com nome e CPF.
- **Visualizar a fila**: Exibe os elementos presentes na fila em tempo real.
- **Remover atendimento**: Atende a primeira pessoa da fila e registra seu tempo de espera.
- **Buscar atendimento por CPF**: Permite localizar uma pessoa específica dentro da fila.
- **Registro do último atendimento**: Mostra quem foi atendido por último e salva os dados no `localStorage`.
- **Painel de Atendimento**: Interface separada que exibe o último atendimento atualizado automaticamente.

## 🏗 Estrutura do Código

O projeto é organizado da seguinte maneira:

1. **Classes principais**
   - `Atendimento`: Define um atendimento, armazenando nome, CPF, data e hora de chegada.
   - `FilaCircular`: Implementa a fila circular e suas operações (`enqueue`, `dequeue`, `isFull`, `isEmpty`).
   
2. **Controllers**
   - `filaController.js`: Gerencia a adição, remoção e busca de elementos na fila.
   - `painelController.js`: Atualiza dinamicamente o painel do último atendimento.

3. **Interfaces**
   - `index.html`: Página principal do sistema de controle de fila.
   - `painel.html`: Interface do painel de atendimento, exibindo o último atendido.

## 🛠 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando:
- **JavaScript ES6+**
- **HTML** e **CSS**
- **LocalStorage** para armazenamento temporário

## 🔧 Como Executar

1. Abra `index.html` no navegador para acessar o sistema de controle de fila.
2. Insira o nome e CPF e clique em **Adicionar à fila**.
3. Use as opções de **Atender** para remover o primeiro elemento ou **Buscar** para localizar uma pessoa.
4. O **Painel de Atendimento** (`painel.html`) abre automaticamente para exibir o último atendimento atualizado.


