const mysql = require("mysql");

class Database {
    get(query, params) {
        return new Promise((resolve, reject) => {
            Database.connection.query(query, params, function (err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }

    getAll(query, params) {
        return new Promise((resolve, reject) => {
            Database.connection.query(query, params, function (err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }

    query(query, params) {
        return new Promise((resolve, reject) => {
            Database.connection.query(query, params, function (err, result) {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
        });
    }

    static connection = "";
    static connect = (connection) => {
        if (!Database.connection || Database.connection.state === "disconnected") {
            Database.connection = mysql.createConnection(connection);
            Database.connection.connect();
        }
    }
}

module.exports = Database;