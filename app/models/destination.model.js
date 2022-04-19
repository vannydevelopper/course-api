const { query } = require("../fonctions/db");

const getDestination = async (CORPORATE_ID, offset = 0, limit = 10) => {
  try {
    var sqlQuery = "SELECT * FROM `destination` WHERE 1";
    sqlQuery += " AND CORPORATE_ID=? ";
    sqlQuery += " ORDER BY DESCRIPTION DESC ";
    sqlQuery += `LIMIT ${offset}, ${limit}`;
    return query(sqlQuery, [CORPORATE_ID]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDestination,
};
