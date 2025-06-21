# Gestão de Clientes - Backend (API)
Esse projeto é uma API/BackEnd de um CRM de gestão de clientes, desenvolvida em JavaScript, Node.JS e Express

## Tutorial para inicialização.
1. Tenha instalado em sua maquina versão node 22 ou superior
2. Na raiz do projeto instale as dependências com o comando `npm i`
3. Crie um arquivo .env e defina as variáveis de ambiente. Use o .env.example como referência.
4. Com todas configurações finalizadas o projeto pode ser inicializado com `npm start`.
obs¹: Todos os endpoint estão documentados no arquivo `postman.json` na raiz do projeto no formato `postman_collection`

## ENV
```
# PORTA DA APLICAÇÃO
PORT='3000'

# CHAVE CRIPTOGRAFADA
CRYPTOGRAPHY_KEY='key_test'

# DATABASE - MONGODB
MONGO_URL='mongodb+srv://user:password@cluster.mongodb.net/database?retryWrites=true&w=majority'
```