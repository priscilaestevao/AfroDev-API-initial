module.exports = (app) => {
  app.get("/agendamentos", (req, res) => {
    res.send("ok server");
  });
};
