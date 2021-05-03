# Bot Github


**Bot para listagem de repositórios**

- [Bot Github](#bot-github)
  - [Execução local](#execução-local)
    - [Pré-requisitos](#pré-requisitos)
    - [Executando o projeto](#executando-o-projeto)
  - [Sobre o projeto](#sobre-o-projeto)

---


## Execução local

### Pré-requisitos

- [Git](https://git-scm.com/download/) e [Node.js](https://nodejs.org/en/download/) instalados.

### Executando o projeto

Todos os comandos abaixo são feitos no terminal

**1** - Faça um clone do repositório e acesse o diretório criado pelo clone.

```sh
git clone https://github.com/DanielGoncalvesL/bot-take.git && cd bot-take
```

**2** - Entre na API:

```sh
cd api-github
```
**3** - Instale as dependências Node:

```sh
npm i
```
**4** - Inicie a API:

```sh
npm run dev
```

**5** - Volte a pasta raiz e entre nos arquivos do bot:

```sh
cd .. && cd bot-sdk
```
**6** - Instale as dependências do bot:

```sh
npm i 
```
**7** - Inicie o bot:

```sh
npm run start
```

## Sobre o projeto

O projeto foi desenvolvido com base na SDK disponinibilizada pela __Take__. Após o início da API e do bot, a aplicação estará disponível no [BLiP Chat](https://chat.blip.ai/?appKey=dGVzdGV0YWtlYmxpcDM6MmRlN2QxMzAtMGE0OS00NWU4LWFjNmUtMzgwOTE2NTMzYmQw), [E-mail](mailto:testetakeblip3@blip.bot) e [Telegram](https://t.me/githubTake_bot)


