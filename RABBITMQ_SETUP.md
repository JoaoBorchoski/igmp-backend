# Configuração do RabbitMQ para Importação de Produtos

## Visão Geral

A importação de produtos foi migrada para processamento assíncrono usando RabbitMQ. Isso resolve problemas de timeout quando há alto volume de dados, pois o processamento acontece em background.

## Como Funciona

1. **Controller**: Recebe o arquivo Excel e envia um job para a fila RabbitMQ
2. **Worker**: Processa os jobs da fila de forma assíncrona
3. **Resposta**: O usuário recebe uma resposta imediata (HTTP 202) informando que o processamento foi iniciado

## Configuração Local (Desenvolvimento)

### 1. Instalar RabbitMQ

**Ubuntu/Debian:**

```bash
sudo apt-get update
sudo apt-get install rabbitmq-server
```

**Ou usando Docker:**

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

### 2. Iniciar o RabbitMQ

```bash
sudo systemctl start rabbitmq-server
# ou
sudo rabbitmq-server start -detached
```

### 3. Configurar Variáveis de Ambiente

Adicione no seu arquivo `.env`:

```env
# RabbitMQ Configuration
MQ_PROVIDER=rabbitMq
MQ_HOST=localhost
MQ_PORT=5672
MQ_USER=guest
MQ_PASS=guest

# Import Produto Queue
IMPORT_PRODUTO_QUEUE=import_produto
IMPORT_PRODUTO_QUEUE_ENABLED=true
```

### 4. Acessar Interface de Gerenciamento

Acesse: http://localhost:15672

-   Usuário: `guest`
-   Senha: `guest`

## Configuração em Produção (VPS)

### 1. Instalar RabbitMQ no Servidor

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install rabbitmq-server

# Habilitar e iniciar o serviço
sudo systemctl enable rabbitmq-server
sudo systemctl start rabbitmq-server
```

### 2. Criar Usuário e Configurar Segurança

```bash
# Criar usuário
sudo rabbitmqctl add_user seu_usuario sua_senha

# Dar permissões de administrador
sudo rabbitmqctl set_user_tags seu_usuario administrator

# Dar permissões de acesso
sudo rabbitmqctl set_permissions -p / seu_usuario ".*" ".*" ".*"

# Habilitar plugin de gerenciamento (opcional, mas recomendado)
sudo rabbitmq-plugins enable rabbitmq_management
```

### 3. Configurar Firewall (se necessário)

```bash
# Permitir porta do RabbitMQ (5672)
sudo ufw allow 5672/tcp

# Permitir porta de gerenciamento (15672) - apenas se quiser acesso externo
sudo ufw allow 15672/tcp
```

### 4. Configurar Variáveis de Ambiente no Servidor

No seu arquivo `.env` de produção:

```env
# RabbitMQ Configuration
MQ_PROVIDER=rabbitMq
MQ_HOST=localhost  # ou o IP do servidor se estiver em outro servidor
MQ_PORT=5672
MQ_USER=seu_usuario
MQ_PASS=sua_senha

# Import Produto Queue
IMPORT_PRODUTO_QUEUE=import_produto
IMPORT_PRODUTO_QUEUE_ENABLED=true
```

## Arquitetura

### Componentes

1. **RabbitMqProvider** (`src/shared/container/providers/mq-provider/implementations/rabbit-mq-provider.ts`)

    - Gerencia conexões com RabbitMQ
    - Métodos: `sendJob()`, `consumeJobs()`

2. **QueueProvider** (`src/shared/infra/mq/queue-provider.ts`)

    - Abstração para envio e consumo de jobs

3. **ImportProdutoController** (`src/modules/configuracao/use-cases/produto/import-produto/import-produto-controller.ts`)

    - Recebe arquivo e envia para fila
    - Retorna HTTP 202 (Accepted)

4. **ImportProdutoQueueWorker** (`src/modules/configuracao/use-cases/produto/import-produto/import-produto-queue-worker.ts`)

    - Processa jobs da fila
    - Executa a importação de produtos

5. **startImportProdutoWorker** (`src/shared/infra/mq/import-produto-worker-run.ts`)
    - Inicia o worker quando o servidor inicia

## Fluxo de Processamento

```
1. Cliente envia arquivo Excel → POST /produtos/import
2. Controller salva arquivo e envia job para fila
3. Retorna HTTP 202: "Importação iniciada"
4. Worker processa job da fila
5. Worker executa ImportProdutoUseCase
6. Worker remove arquivo após processamento
```

## Monitoramento

### Via Interface Web (Management Plugin)

1. Acesse http://localhost:15672 (ou IP do servidor:15672)
2. Faça login
3. Vá em "Queues" para ver a fila `import_produto`
4. Monitore:
    - Mensagens prontas (Ready)
    - Mensagens sendo processadas (Unacked)
    - Taxa de mensagens processadas

### Via Logs da Aplicação

O worker loga todas as operações:

-   `[ImportProdutoWorker] Processing file: ...`
-   `[ImportProdutoWorker] Successfully processed: ...`
-   `[ImportProdutoWorker] Error processing job: ...`

## Troubleshooting

### RabbitMQ não está rodando

```bash
# Verificar status
sudo systemctl status rabbitmq-server

# Iniciar
sudo systemctl start rabbitmq-server

# Ver logs
sudo journalctl -u rabbitmq-server -f
```

### Erro de conexão

-   Verifique se as variáveis de ambiente estão corretas
-   Verifique se o RabbitMQ está acessível na porta 5672
-   Verifique se o usuário e senha estão corretos

### Jobs não estão sendo processados

-   Verifique se `IMPORT_PRODUTO_QUEUE_ENABLED=true`
-   Verifique os logs da aplicação
-   Verifique se há mensagens na fila via interface web

### Timeout ainda ocorrendo

-   Verifique se o worker está rodando
-   Verifique se há muitos jobs na fila (pode precisar escalar workers)
-   Considere processar em lotes menores

## Escalabilidade

Para processar mais rápido, você pode:

1. **Rodar múltiplos workers**: Inicie a aplicação em múltiplas instâncias
2. **Aumentar prefetch**: Modifique `channel.prefetch()` no RabbitMqProvider
3. **Processar em lotes**: Modifique o worker para processar múltiplos itens por vez

## Notas Importantes

-   O Express **não precisa** rodar outro serviço separado. O worker roda no mesmo processo do Express
-   O RabbitMQ **precisa** estar rodando como serviço separado (ou em Docker)
-   Arquivos são automaticamente removidos após processamento
-   Se um job falhar, ele será reprocessado (até um limite configurado)
