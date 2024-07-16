# Heart Beat Monitor Simulator

O projeto simula um monitor de batimentos cardíacos e o seu servidor.

O simulador é um simples script que se conecta ao servidor e envia as mensagens através do websocket.

O servidor foi desenvolvido com as seguintes ferramentas:

- NestJS
- PostgreSQL
- Docker
- SocketIO

A arquitetura escolhida foi a hexagonal.

## Como rodar o projeto em ambiente local

1. Crie um arquivo `.env` com as variáveis existentes no arquivo `.env.example`.

2. Rode o seguinte comando e o container será iniciado com todas as dependências necessárias:

```sh
docker compose up --build
```

## Como simular as medições

O script do simulador se conecta ao servidor através de websocket. Todas as medições recebidas pelo servidor serão salvas.

Execute o seguinte comando para iniciar o simulador:

```sh
node .\scripts\simulator.js
```

_*O comando não precisa ser executado dentro do container._

A cada 100ms o script enviará para o servidor uma medição, que pode ser regular ou irregular.

Para parar o simulador, aperte as teclas `CTRL + C` no terminal.

## Como ler as medições e as irregularidades

Acesse o seguinte endpoint GET através do navegador, Postman, ou outro cliente da sua escolha:

- Medições

`http://localhost:3000/measurements`

- Irregularidades

`http://localhost:3000/irregularities`

## O que pode ser feito para melhorar o projeto de forma rápida

- Testes
- Não salvar dados em memória no servidor