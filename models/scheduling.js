const connection = require("../infra/connection");
const moment = require("moment");

class Scheduling {
  
  update(id, dates, res) {
    const sql = "UPDATE schedulings SET ? WHERE id = ?";
    if (dates.service_date) {
      dates.service_date = moment(dates.service_date).format("YYYY-MM-DD");
    }

    connection.query(sql, [dates, id], (error, result) => {
      if (error) {
        res.status(400).json(error);
      }
      res.status(201).json({ ...dates, id });
    });
  }

  remove(id, res) {
    const sql = "DELETE FROM schedulings WHERE id = ?";

    connection.query(sql, id, (error, results) => {
      if (error) {
        res.status(400).json(error);
      }
      res.status(201).json({
        message: `Scheduling with ${id} removed successfully`,
      });
    });
  }

  searchById(id, res) {
    const sql = "SELECT * FROM schedulings WHERE id = ?";

    connection.query(sql, id, (error, results) => {
      if (error) {
        res.status(400).json(error);
      }
      res.status(201).json(results);
    });
  }

  listing(res) {
    const sql = "SELECT * FROM schedulings";

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
      }
      res.status(200).json(results);
    });
  }

  insert(scheduling, res) {
    const sql = "INSERT INTO schedulings SET ?";

    const service_date = moment(scheduling.data_servico).format("YYYY-MM-DD");
    const scheduling_date = moment().format("YYYY-MM-DD");
    const schedulingWithDate = {
      ...scheduling,
      scheduling_date,
      service_date,
    };

    const isValidDate = moment(scheduling.service_date).isSameOrAfter(scheduling.scheduling_date);
    const isValidClientName = scheduling.client_name.length >= 3;

    const validations = [
      {
        name: "service_date",
        valid: isValidDate,
        message: "Scheduling date must be equal to or greater than current",
      },
      {
        name: "client_name",
        valid: isValidClientName,
        message: "The client's name must be at least three characters",
      },
    ];

    const errors = validations.filter((field) => !field.valid);

    if (errors.length > 0) {
      res.status(400).json(errors);
    }

    connection.query(sql, schedulingWithDate, (error, results) => {
      if (error) {
        res.status(400).json(error);
      }
      res.status(201).json({...schedulingWithDate, id: results.insertId});
    });
  }
}

module.exports = new Scheduling();
