class Tables {
  init(connection) {
    this.connection = connection;
    this.newScheduling();
  }

  newScheduling() {
    const sql = `CREATE TABLE IF NOT EXISTS schedulings
    (id int NOT NULL AUTO_INCREMENT,
    client_name varchar(50) NOT NULL,
    service varchar(50) NOT NULL,
    status varchar(20) NOT NULL,
    service_date date NOT NULL,
    scheduling_date date NOT NULL,
    PRIMARY KEY (id))`;

    this.connection.query(sql, (error) => {
      if (error) {
        throw error;
      }
    });
  };
};

module.exports = new Tables;