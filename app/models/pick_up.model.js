const { query } = require("../fonctions/db");

const getPick = async (CORPORATE_ID, offset = 0, limit = 10) => {
  try {
    var sqlQuery = "SELECT * FROM pick_up WHERE 1";
    sqlQuery += " AND ID_CORPORATE=? ";
    sqlQuery += " ORDER BY DESCRIPTION DESC ";
    sqlQuery += `LIMIT ${offset}, ${limit}`;
    return query(sqlQuery, [CORPORATE_ID]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPick,
};
