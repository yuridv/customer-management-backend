require('dotenv-safe').config();

const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const { colors } = require('./src/utils/bases');
const { MongoDB } = require('./src/utils/functions');

const User = require('./src/models/user');
const Client = require('./src/models/client');

MongoDB()
  .then(async() => {
    const collections = await mongoose.connection.db.listCollections().toArray();

    // DELETA TODAS AS COLLECTIONS DO BANCO DE DADOS
    for (const collection of collections) {
      await mongoose.connection.db.dropCollection(collection.name);
      console.log(`${colors.YELLOW}Coleção "${collection.name}" deletada.`);
    }
    console.log(`${colors.YELLOW}As coleções do banco de dados foram deletadas com sucesso.`);

    // INSERE OS USUÁRIOS DE TESTES NO BANCO DE DADOS
    const users = [
      { email: 'dev@dev.com', password: 'dev@123!', name: 'Developer Tester System', role: 'ADMIN' },
      { email: 'admin@admin.com', password: 'admin@123!', name: 'Administrator Tester System', role: 'ADMIN' },
      { email: 'user@user.com', password: 'user@123!', name: 'User Tester System', role: 'USER' }
    ];

    const userList = [];
    for (const user of users) {
      const newUser = new User(user);
      await newUser.save();

      userList.push(newUser._id);
    }
  
    console.log(`${colors.GREEN}Os usuários de testes foram criados com sucesso.`);

    // INSERE OS CLIENTES DE TESTES NO BANCO DE DADOS
    const status = [ 'IN_PROGRESS', 'FINISHED', 'PENDING', 'CANCELED' ];
    for (let i = 0; i <= 30; i++) {
      const newClient = new Client({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: Number(`${faker.number.int({ min: 11, max: 99 })}9${faker.string.numeric(8)}`),
        cpf: faker.string.numeric(11),
        birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        user: userList[Math.floor(Math.random() * userList.length)],
        status: status[Math.floor(Math.random() * status.length)]
      });
      await newClient.save();
    }

    console.log(`${colors.GREEN}Os clientes de testes foram criados com sucesso.`);

    return mongoose.disconnect();
  })
  .catch((e) => console.log(`${colors.RED}[MongoDB Error]=> ${e}${colors.RESET}`));