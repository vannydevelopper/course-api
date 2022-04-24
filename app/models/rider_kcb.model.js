const { query } = require("../fonctions/db");

const getAllRider = async (CORPORATE_ID, q, offset = 0, limit = 10) => {
          try {
                    var binds = [CORPORATE_ID]
                    var sqlQuery = "SELECT * FROM `rider_kcb` WHERE 1 ";
                    sqlQuery += " AND CORPORATE_ID=? AND IS_AUTRE = 0 ";
                    if(q) {
                              sqlQuery += " AND NOM LIKE ? "
                              binds.push(`%${q}%`)
                    }
                    sqlQuery += " ORDER BY NOM ";
                    sqlQuery += `LIMIT ${offset}, ${limit}`;
                    return query(sqlQuery, binds);
          } catch (error) {
                    throw error;
          }
};

module.exports = {
          getAllRider,
};
