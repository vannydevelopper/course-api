const { query } = require("../fonctions/db");

const getPick = async (CORPORATE_ID, q, offset = 0, limit = 10) => {
          try {
                    var binds = [CORPORATE_ID]
                    var sqlQuery = "SELECT * FROM pick_up WHERE 1 ";
                    sqlQuery += " AND ID_CORPORATE=? AND IS_AUTRE = 0 ";
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
          getPick,
};
