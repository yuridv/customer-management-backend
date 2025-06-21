require('dotenv-safe').config();
const mongoose = require('mongoose');

const { colors } = require('./src/utils/bases');
const { MongoDB } = require('./src/utils/functions');

const User = require('./src/models/user');

MongoDB()
  .then(async() => {
    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const collection of collections) {
      await mongoose.connection.db.dropCollection(collection.name);
      console.log(`${colors.YELLOW}Coleção "${collection.name}" deletada.`);
    }

    const user = new User({
      email: 'dev@dev.com',
      password: 'dev123',
      name: 'Developer Tester System',
      role: 'ADMIN'
    });
    await user.save();

    console.log(`${colors.YELLOW}Usuário "dev@dev.com" criado com sucesso.`);

    return mongoose.disconnect();
  })
  .catch((e) => console.log(`${colors.RED}[MongoDB Error]=> ${e}${colors.RESET}`));