const configExpress = require("./config/configExpress");
const port = 3000;

const app = configExpress();

app.listen(port, () => {
  console.log(`server running on the port ${port}`);
});
