
# Customer Management

Esse projeto é uma API/BackEnd de um CRM de gestão de clientes, desenvolvido em Node.JS e Express

## Índice

- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Dependências](#dependências)
- [Licença](#licença)

## Instalação

Para começar a usar o CRM, siga os passos abaixo:

1. Tenha instalado em sua maquina a versão do node `22` ou superior
2. Na raiz do projeto instale as dependências com o comando:
  ```bash
  npm install
  ```
3. Crie um arquivo `.env` e defina as variáveis de ambiente, use o `.env.example` como referência.
4. Após finalizar a instalação, inicie a aplicação com o comando:
  ```bash
  npm start
  ```

obs¹: Todos os endpoint estão documentados no arquivo `postman.json` na raiz do projeto no formato `postman_collection`

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes scripts:

1. Inicia a aplicação de desenvolvimento `Express`. A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).
  ```bash
  npm run dev
  ```

## Dependências

### Produção

- **bcrypt**: Criptografa as senhas dos usuários.
- **connect-mongo**: Armazena as sessões do express no banco de dados MongoDB.
- **cors**: Gerencia quais domínios podem acessar a API.
- **dotenv-safe**: Gerencia as variáveis do arquivo `.env`.
- **express**: Cria e gerencia servidores e rotas HTTP em Node.js.
- **express-session**: Gerencia sessões de usuários, salvando dados entre requisições em aplicações Express.
- **jsonwebtoken**: Gera e valida tokens JWT para autenticação e autorização segura em APIs.
- **mongoose**: Gerencia a interação da aplicação com o banco de dados MongoDB.


### Desenvolvimento

- **eslint**: Ferramenta de linting para JavaScript.
- **@eslint/js**: Linting para JavaScript puro.
- **nodemon**: Reinicia automaticamente o servidor Node.js sempre que arquivos do projeto são alterados.
- **@faker-js/faker**: Gera dados falsos para testes e desenvolvimento.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.