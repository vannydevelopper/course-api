const { query } = require("../fonctions/db");

const findAll = async (offset = 0, limit = 10) => {
  try {
    var sqlQuery =
      "SELECT TYPE_DECLARATION_ID, DESCRIPTION FROM type_declaration WHERE 1";
    sqlQuery += " ORDER BY DESCRIPTION ";
    sqlQuery += ` LIMIT ${offset}, ${limit}`;

    return query(sqlQuery);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAll,
};
