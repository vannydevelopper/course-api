const { query } = require("../fonctions/db");

const getAllRider = async (CORPORATE_ID, offset = 0, limit = 10) => {
  try {
    var sqlQuery = "SELECT * FROM `rider_kcb` WHERE 1";
    sqlQuery += " AND CORPORATE_ID=? ";
    sqlQuery += " ORDER BY NOM DESC ";
    sqlQuery += `LIMIT ${offset}, ${limit}`;
    return query(sqlQuery, [CORPORATE_ID]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRider,
};
