require('dotenv-safe').config();

const { colors } = require('./src/utils/bases');
console.log(`\n${colors.YELLOW}[BackEnd]=> Starting...${colors.RESET}`);

const { MongoDB } = require('./src/utils/functions');

MongoDB()
  .then(() => {
    console.log(`${colors.GREEN}${colors.BOLD}[BackEnd]=> Started successfully!${colors.RESET}`);
  })
  .catch((e) => console.log(`${colors.RED}[MongoDB Error]=> ${e}${colors.RESET}`));