const configExpress = require("./config/configExpress");
const connection = require("./infra/connection");
const port = 3000;

const app = configExpress();

connection.connect((error) => {
  if (error) {
    throw error;
  }
  app.listen(port, () => {
    console.log(`server running on the ${port}`);
  });
});
