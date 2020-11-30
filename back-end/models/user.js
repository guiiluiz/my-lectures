const conn = require('../connection');

class User {
  constructor(name, email, password, isManager) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isManager = isManager;
  }

  async create() {
    const { name, email, password, isManager } = this;
    const manager = isManager ? 1 : 0;
    const query = `INSERT INTO user (name, email, manager, password) VALUES ('${name}', '${email}', '${manager}', '${password}')`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, _results) => {
        if (err) return reject(err);
        return resolve({ name, email, password, manager });
      });
    });
  }

  static async userLogin(email, password) {
    const query = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      });
    });
  };

  static async validateEmail(email) {
    const query = `SELECT * FROM user WHERE email = '${email}';`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      });
    });
  }

  static async getUserEmail(id) {
    const query = `SELECT email FROM user WHERE user_id = '${id}';`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      });
    });
  }
}

module.exports = User;
