const conn = require('../connection');

class Event {
  static async create(eventDetails) {
    const { name, date, city, street, number, description } = eventDetails;
    const query = `INSERT INTO event (name, date, city, street, number, description) VALUES ('${name}', '${date}', '${city}', '${street}', '${number}', '${description}')`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, _results) => {
        if (err) return reject(err);
        return resolve({ name, date, city, street, number, description });
      });
    });
  }

  static async getAll() {
    const query = 'SELECT * FROM event;';
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }

  static async getDetails(eventId) {
    const query = `SELECT * FROM event WHERE event_id = '${eventId}';`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      });
    });
  }

  static async getUserEvents(email) {
    const query = `SELECT e.event_id, e.name, date, city, street, number, description FROM event AS e
    INNER JOIN confirmed AS c ON c.event_id = e.event_id
    INNER JOIN user AS u ON u.user_id = c.user_id
    WHERE u.email = '${email}';`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }

  static async confirm(eventId, userEmail) {
    const query = `INSERT INTO confirmed (event_id, user_id) VALUES ('${eventId}', (SELECT user_id FROM user WHERE email = '${userEmail}'))`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }

  static async disconfirm(eventId, userEmail) {
    const query = `DELETE FROM confirmed WHERE event_id = '${eventId}' AND user_id = (SELECT user_id FROM user WHERE email = '${userEmail}')`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }

  static async isUserConfirmed(eventId, userEmail) {
    const query = `SELECT * FROM confirmed WHERE user_id = (SELECT user_id FROM user WHERE email = '${userEmail}') AND event_id = '${eventId}'`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      });
    });
  }

  static async confirmedCount(eventId) {
    const query = `SELECT COUNT(*) as confirmedCount FROM confirmed WHERE event_id = '${eventId}'`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      });
    });
  }
}

module.exports = Event;