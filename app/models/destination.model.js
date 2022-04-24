const { query } = require("../fonctions/db");

const getDestination = async (CORPORATE_ID, q, offset = 0, limit = 10) => {
          try {
                    var binds = [CORPORATE_ID]
                    var sqlQuery = "SELECT * FROM `destination` WHERE 1 ";
                    sqlQuery += " AND CORPORATE_ID=? AND IS_AUTRE = 0 ";
                    if(q) {
                              sqlQuery += " AND DESCRIPTION LIKE ? "
                              binds.push(`%${q}%`)
                    }
                    sqlQuery += " ORDER BY DESCRIPTION ";
                    sqlQuery += `LIMIT ${offset}, ${limit}`;
                    return query(sqlQuery, binds);
          } catch (error) {
                    throw error;
          }
};

module.exports = {
          getDestination,
};
