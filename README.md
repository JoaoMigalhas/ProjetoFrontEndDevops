```text
# Projeto Front-End DevOps
Projeto desenvolvido como parte das atividades acadêmicas da disciplina de Front-End DevOps.

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
* **Node.js**: Versão 18.0.0 ou superior.
* **NPM**: Gerenciador de pacotes (instalado automaticamente com o Node.js).

---

## Passo a Passo para Execução

### 1. Instalação
Abra o terminal do seu sistema e execute os comandos abaixo para clonar o repositório e instalar os arquivos necessários:

```bash
git clone [https://github.com/JoaoMigalhas/ProjetoFrontEndDevops.git](https://github.com/JoaoMigalhas/ProjetoFrontEndDevops.git)
cd ProjetoFrontEndDevops
npm install

```

### 2. Inicialização do Servidor

Para colocar o projeto em execução, utilize o comando:

```bash
npm start

```

*Este comando inicia o arquivo `server.js` através do Node.js.*

### 3. Acesso ao Sistema

Após iniciar o servidor, abra o seu navegador de internet e acesse o seguinte endereço:

```text
http://localhost:3000/

```

---

## Como o Projeto Funciona

O sistema está dividido em duas partes que trabalham juntas:

* **Front-end (Interface):** A parte visual com a qual o usuário interage no navegador. Ela envia as informações coletadas para o servidor.
* **Back-end (Servidor):** Processa as informações enviadas pela interface e armazena os dados localmente em arquivos no formato JSON, que funcionam como o banco de dados do projeto.

---

## Tecnologias Utilizadas

* **Node.js**: Plataforma utilizada para executar o código do servidor.
* **Express**: Ferramenta responsável por gerenciar as rotas e o acesso às páginas do projeto.