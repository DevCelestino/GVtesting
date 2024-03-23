# `GVtesting` [![npm version](https://badge.fury.io/js/react-scripts-ts.svg)](https://badge.fury.io/js/react-scripts-ts) [![Build Status](https://travis-ci.org/wmonk/create-react-app-typescript.svg?branch=master)](https://travis-ci.org/wmonk/create-react-app-typescript)

Create React apps (with Typescript) with no build configuration.

 * [Instalação](#instalação) – Como começar a usar a aplicação.
 * [Guia de Usuário](#guia-de-usuário) – Como usar cada uma das funcionalidades.

_Quer agilizar o processo de criação de cenários de testes automatizados? Ou quer utilizar de ferramentas que agilizam os processos de teste manual?_
Tenha todos os benefícios da ferramenta `GVtesting` e seja feliz testando! 🚀

## Instalação

Para usar este projeto é necessário baixar o repo em .zip ou cloná-lo localmente usando `git clone`:

<br/>

```sh
git clone https://github.com/gcelestinogvdasa/GVtesting.git
```

<br/>

Após ter clonado o repo, abra o terminal na pasta do repo e execute os comandos `npm` e `node` abaixo para instalar as dependências do back e iniciá-lo:

<br/>

```sh
cd .\back\
npm install
node .\src\server.js
```

<br/>

A aplicação de backend ficará rodando por padrão no endereço [http://localhost:5000/](http://localhost:5000/).

Em seguida abra o terminal na pasta do repo novamente e execute os comandos `npm` abaixo para instalar as dependências do front e iniciá-lo:

<br/>

```sh
cd .\front\
npm install
npm start
```

<br/>

Então abra [http://localhost:3000/](http://localhost:3000/) para acessar a aplicação.

*([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))*


When you’re ready to deploy to production, create a minified bundle with `npm run build`.
