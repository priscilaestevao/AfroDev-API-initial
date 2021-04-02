const Scheduling = require("../models/scheduling");

module.exports = (app) => {
  app.get("/agenda", (req, res) => {
    Scheduling.listing(res);
  });

  app.post("/agenda", (req, res) => {
    const scheduling = req.body;
    Scheduling.insert(scheduling, res);
  });

  app.get("/agenda/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Scheduling.searchById(id, res);
  })
};
