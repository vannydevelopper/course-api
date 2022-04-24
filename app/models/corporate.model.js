const { query } = require("../fonctions/db");

const findAll = async (offset = 0, limit = 10) => {
  try {
    var binds = [];
    var sqlQuery = "SELECT * FROM `corporate` WHERE 1 ORDER BY  DESCRIPTION ";
    sqlQuery += `LIMIT ${offset}, ${limit}`;
    return query(sqlQuery, binds);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAll,
};
