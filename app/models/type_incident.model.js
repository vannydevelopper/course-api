const { query } = require("../fonctions/db");

const findAll = async (q, offset = 0, limit = 10) => {
          try {
                    var binds = []
                    var sqlQuery = "SELECT * FROM type_incident WHERE 1 AND IS_AUTRE = 0 ";
                    if(q) {
                              sqlQuery += " AND DESCRIPTION LIKE ? "
                              binds.push(`%${q}%`)
                    }
                    sqlQuery += " ORDER BY DESCRIPTION ";
                    sqlQuery += ` LIMIT ${offset}, ${limit}`;

                    return query(sqlQuery, binds);
          } catch (error) {
                    throw error;
          }
};

module.exports = {
          findAll,
};
