const { query } = require("../fonctions/db");

const findAll = async () => {
  try {
    var sqlQuery =
      "SELECT ID_MODE, MODE_COURSE FROM mode_course WHERE 1";
    sqlQuery += " ORDER BY MODE_COURSE ";

    return query(sqlQuery);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAll,
};
