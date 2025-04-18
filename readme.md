# igmp

O projeto **igmp**, plataforma Web e Mobile para Controle de Produção Industrial, consiste em uma API REST desenvolvida com o framework Node.js/Express em TypeScript, banco de dados PostegreSQL, acessado através do ORM TypeORM e upload de arquivos através da biblioteca Multer.

## Requisitos necessários

Para que a aplicação possa ser executada e testada em ambiente local de desenvolvimento, alguns itens de software devem estar previamente instalados.

- Node.js [(Guia de Instalação)](https://nodejs.org/en/download/package-manager/)
- Yarn [(Guia de Instalação)](https://classic.yarnpkg.com/lang/en/docs/install), caso prefira usar no lugar do npm. Neste documento o Yarn será utilizado nos procedimentos.
- Docker [(Guia de Instalação)](https://docs.docker.com/engine/install/)
- Docker Compose [(Guia de Instalação)](https://docs.docker.com/compose/install/)
- Postman [(Guia de Instalação)](https://www.postman.com/downloads/) ou Insomnia [(Guia de Instalação)](https://insomnia.rest/download)
- Conta de e-mail fake para testes no Ethereal [(Criação de conta fake)](https://ethereal.login/create)

## Requisitos opcionais

- **Editor SQL**: Beekeeper Studio [(Download)](https://www.beekeeperstudio.io/), DBeaver Community [(Download)](https://dbeaver.io/download/)
- **Controlador de fila**: RabbitMq [(Guia de Instalação no Ubuntu)](https://www.cherryservers.com/blog/how-to-install-and-start-using-rabbitmq-on-ubuntu-22-04) 

<br>

## Como executar a aplicação

### Configuração inicial do ambiente

1. Crie uma pasta em um local onde você tenha direitos de gravação e leitura
2. Descompacte o arquivo zip e copie os arquivos da aplicação para a pasta criada
3. Alterar dados de acesso ao banco de dados, caso seja necessário, editando os arquivos "docker-compose.yml" e "ormconfig.json" na raiz do projeto.
4. Todos os passos a seguir devem ser executados em linha de comando, a partir do local onde o projeto foi copiado
5. Instalar os pacotes necessários para a execução da aplicação, digitando os comandos:

```
  yarn
```
  
<br>
  
### Início rápido com servidor PostgreSQL já instalado

Antes que qualquer comando possa ser executado, é necessário que o caminho onde os binários do PostgreSQL estão localizados, seja adicionado ao PATH do sistema operacional.

No Windows para a versão 14 do PostgreSQL seria por exemplo: "C:\Program Files\PostgreSQL\14\bin".
  
Agora um passo a passo para iniciar a aplicação de forma rápida.

Abra uma nova seção de linha de comando. Mude para a pasta onde se encontra a aplicação. Nesta janela digite os seguintes comandos para criar usuário e banco de dados para a aplicação:

```
  psql -h localhost -d postgres -U postgres
  Password for user postgres:
  psql (14.2)
  Type "help" for help.

  postgres=# create user igmp_user with encrypted password '123456'
  postgres=# create database igmp_db
  postgres=# grant all privileges on database igmp_db to igmp_user
  postgres=# exit
```

Na mesma pasta do passo anterior onde será executada a aplicação, digite os comandos:

```  
  yarn run typeorm migration:run
  yarn run seed:admin
  yarn run dev
```

Testar o acesso a API através do Swagger UI em: [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

<br>
  
### Início rápido com Docker

Aqui um passo a passo para iniciar a aplicação de forma rápida. Caso ocorra algum problema, ou deseje conhecer os detalhes de cada passo, siga para a próxima seção.

Abra uma nova seção de linha de comando. Mude para a pasta onde se encontra a aplicação. Nesta janela será executado o container, digitando os comandos:

```
  docker-compose up
```

Abra uma nova seção de linha de comando, na mesma pasta do passo anterior, onde será executada a aplicação:

```  
  yarn run typeorm migration:run
  yarn run seed:admin
  yarn run dev
```

Testar o acesso a API através do Swagger UI em: [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

<br>

### Gerenciando os containers Docker do PostgreSQL e Redis

Para iniciar os containers com a exibição contínua do log, que auxiliará na depuração inicial do ambiente, digite os comandos a seguir.

A sessão do terminal permanecerá ativa, até que sejam pressionadas as teclas CTRL+C duas vezes seguidas. Neste modo o PostgreSQL e o Redis somente estarão disponíveis para a aplicação, enquanto essa janela estiver aberta.
  
Para que os containers rodem em background, devem ser seguidos os passos da seção **Containers em Background**

```
  docker-compose up

  [+] Running 3/3
   - Network network_igmp     Created                                  0.0s
   - Container database_igmp  Created                                  0.0s
   - Container redis_igmp     Created                                  0.0s
  Attaching to database_igmp, redis_igmp
  database_igmp  |
  database_igmp  | PostgreSQL Database directory appears to contain a database ˜˜˜
  database_igmp  |
  ˜˜˜
```

Para verificar o status dos containers, abra outra janela de linha de comando, digite:

```
  docker ps

  CONTAINER ID   IMAGE          ˜˜˜   STATUS         PORTS                    NAMES
  bec89ece9546   postgres       ˜˜˜   Up 5 seconds   0.0.0.0:5432->5432/tcp   database_igmp
  1f1efb10abbd   redis:alpine   ˜˜˜   Up 5 seconds   0.0.0.0:6379->6379/tcp   redis_igmp
```

Para verificar o log de um container, em linha de comando digite o comando utilizando o nome do container desejado:

```
  docker logs database_igmp

  The files belonging to this database system will be owned by user "postgres".
  This user must also own the server process.

  The database cluster will be initialized with locale "en_US.utf8".
  The default database encoding has accordingly been set to "UTF8".
  The default text search configuration will be set to "english".

  Data page checksums are disabled.

  fixing permissions on existing directory /var/lib/postgresql/data ˜˜˜ ok
  creating subdirectories ˜˜˜ ok
  selecting dynamic shared memory implementation ˜˜˜ posix
  selecting default max_connections ˜˜˜ 100
  selecting default shared_buffers ˜˜˜ 128MB
  selecting default time zone ˜˜˜ Etc/UTC
  creating configuration files ˜˜˜ ok
  running bootstrap script ˜˜˜ ok
  performing post-bootstrap initialization ˜˜˜ ok
  initdb: warning: enabling "trust" authentication for local connections
  You can change this by editing pg_hba.conf or using the option -A, or
  --auth-local and --auth-host, the next time you run initdb.
  syncing data to disk ˜˜˜ ok

  Success. You can now start the database server using:
  ˜˜˜
```

Para iniciar uma sessão interativa com um container, utilizando o nome do container, digite o comando abaixo. Para encerrar a sessão, digite no prompt do container "exit" e pressione o enter.

```
  docker exec -it database_igmp /bin/bash

  root@bec89ece9546:/# exit
```

Para encerrar os containers:

```
  docker-compose down

  [+] Running 3/3
   - Container database_igmp  Removed                                  3.1s
   - Container redis_igmp     Removed                                  3.2s
   - Network network_igmp     Removed                                  0.2s
```

Para iniciar os containers em background:

```
  docker-compose up -d

  [+] Running 3/3
   - Network network_igmp     Started                                  0.0s
   - Container database_igmp  Started                                  0.7s
   - Container redis_igmp     Started                                  0.9s
```

<br>

### Inicializar o banco de dados

Antes de executar os passos a seguir, é importante verificar se o container do PostgreSQL está em execução.


- Executar as migrations do TypeORM para criação das tabelas no banco de dados:

```
  yarn run typeorm migration:run    
```

- Caso precise reverter a última migration:

```
  yarn run typeorm migration:revert    
```

- Executar o seed da tabela de usuarios, criando o usuario "admin", com a senha "admin":

```
  yarn run seed:admin    
```

<br>

### Inicializar o rabbit mq

Atenção: É necessário que o RabbitMq esteja instalado e rodando no seu Ubuntu, você pode verificá-lo diretamente pelo seu browser no endereço http://localhost:15672. Caso não esteja no ar, você pode tentar utilizar o seguinte comando

```
  sudo rabbitmq-server start -detached
```

e verificar novamente. Caso ocorra algum erro o mesmo deverá ser corrigido para que a aplicação acesse a fila.

Para acionar a fila basta que no arquivo .env você altrere as configurações do seu mq. E quando executar o procedimento de execução o rabbitMq será iniciado junto de sua aplicação.

<br>

### Executar e testar a aplicação


- Executar a aplicação:

```
  yarn run dev    
```

- Testar o acesso a API através do Swagger UI em: [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

<br>
