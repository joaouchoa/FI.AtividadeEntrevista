# 📝 Sistema de Manutenção de Clientes

Projeto desenvolvido em **ASP.NET MVC** e **.NET FRAMEWORK ** e para a manutenção de clientes, com funcionalidades de cadastramento e gerenciamento de beneficiários. O objetivo é avaliar o conhecimento técnico e a lógica de desenvolvimento do candidato para a vaga de desenvolvedor.

## 🚀 Tecnologias Utilizadas
- **ASP.NET MVC** - Framework para desenvolvimento web.
- **SQL Server Express 2019 LocalDB** - Banco de dados leve para armazenamento local.
- **.NET Framework 4.8** - Plataforma base para o desenvolvimento da aplicação.
- **JavaScript/JQuery** - Para manipulação de eventos na interface do usuário.

## 📋 Requisitos para Executar o Projeto
- **Visual Studio 2022**
  - Baixar em: [https://visualstudio.microsoft.com/pt-br/downloads/](https://visualstudio.microsoft.com/pt-br/downloads/)
  - Incluir as opções: “Pacote de direcionamento do .NET Framework 4.8”, “SDK do .NET Framework 4.8” e “SQL Server Express 2019 LocalDB”.
- **Solution do Projeto**
  - Clone o repositório e acesse a branch `initial-state`, que está pronta para ser usada como ponto de partida:

## ▶️ Como Iniciar o Projeto
1. Baixe e descompacte o arquivo `FI.WebAtividadeEntrevista.zip`.
2. Abra o arquivo `FI.WebAtividadeEntrevista.sln` com o Visual Studio 2022.
3. Certifique-se de que o SQL Server Express LocalDB esteja instalado e funcionando.
4. Execute o projeto pressionando `F5`.

## 🎯 Funcionalidades Implementadas

### ✔ Implementação do CPF do Cliente
- Adição de um novo campo denominado "CPF" na tela de cadastro/alteração de clientes, seguindo o padrão visual dos demais campos.
- Validação obrigatória do CPF, garantindo que o campo esteja preenchido e formatado corretamente (999.999.999-99).
- Implementação de verificação de CPF duplicado, impedindo o cadastro de mais de um cliente com o mesmo CPF.
- Validação do formato do CPF para garantir que seja válido, utilizando o cálculo padrão do dígito verificador.
- Armazenamento do CPF no banco de dados, na tabela "CLIENTES", garantindo a persistência dos dados.

### ✔ Implementação do Botão Beneficiários
- Inclusão de um botão denominado "Beneficiários" na tela de cadastro/alteração de clientes, para gerenciar os beneficiários de cada cliente.
- Ao clicar no botão, um pop-up é exibido para cadastrar novos beneficiários com campos para "CPF" e "Nome".
- Exibição de um grid no pop-up com a lista de beneficiários cadastrados, permitindo operações de manutenção (alteração e exclusão).
- Validação do CPF do beneficiário para garantir formatação correta (999.999.999-99) e impedir duplicidade para o mesmo cliente.
- Gravação dos dados do beneficiário no banco de dados ao acionar o botão "Salvar", utilizando a tabela "BENEFICIARIOS" com os campos "ID", "CPF", "NOME" e "IDCLIENTE".

## 📝 Licença
Este projeto é parte de um desafio de codificação e não está sob uma licença específica.
