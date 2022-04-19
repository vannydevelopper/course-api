const { query } = require("../fonctions/db");

const findAll = async (offset = 0, limit = 10) => {
  try {
    var sqlQuery = "SELECT * FROM type_incident WHERE 1";
    sqlQuery += " ORDER BY DESCRIPTION DESC ";
    sqlQuery += ` LIMIT ${offset}, ${limit}`;

    return query(sqlQuery);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAll,
};
