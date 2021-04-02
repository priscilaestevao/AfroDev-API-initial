const configExpress = require("./config/configExpress");
const connection = require("./infra/connection");
const Tables = require("./infra/tables");
const port = 3030;

connection.connect((error) => {
  if (error) {
    throw error;
  }
  Tables.init(connection);

  app = configExpress();

  app.listen(port, () => {
    console.log(`Server running on the port ${port}`);
  });
});
