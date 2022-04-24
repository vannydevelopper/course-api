const { query } = require("../fonctions/db");

const create = async (ID_CORPORATE, TYPE_DECLARATION_ID, NUMERO_COURSE, iS_COVOITURAGE, CLIENT_ID, RIDER_ID, PICK_UP_ID, DESTINATION_ID, TYPE_INCIDENT_ID, IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES, COMMENTAIRE_COVOITURAGE, RAISON_ANNULATION, ANNULE_PAR, TIME_SPENT, KM_SPENT, MONTANT, DATE_DEBUT_COURSE, DATE_INSERTION) => {
          try {
                    return await query(
                              "INSERT INTO declaration_course(ID_CORPORATE, TYPE_DECLARATION_ID, NUMERO_COURSE, iS_COVOITURAGE, CLIENT_ID, RIDER_ID, PICK_UP_ID, DESTINATION_ID, TYPE_INCIDENT_ID, IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES, COMMENTAIRE_COVOITURAGE, RAISON_ANNULATION, ANNULE_PAR, TIME_SPENT, KM_SPENT, MONTANT, DATE_DEBUT_COURSE, DATE_INSERTION) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                              [ID_CORPORATE, TYPE_DECLARATION_ID, NUMERO_COURSE, iS_COVOITURAGE, CLIENT_ID, RIDER_ID, PICK_UP_ID, DESTINATION_ID, TYPE_INCIDENT_ID, IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES, COMMENTAIRE_COVOITURAGE, RAISON_ANNULATION, ANNULE_PAR, TIME_SPENT, KM_SPENT, MONTANT, DATE_DEBUT_COURSE, DATE_INSERTION]
                    );
          } catch (error) {
                    console.log(error);
                    throw error;
          }
};

const getAgences = async () => {
          try {
                    return query('SELECT * FROM agence_kcb ORDER BY DESCRIPTION')
          } catch (error) {
                    throw error
          }
}

const getDriver = async (TELEPHONE) => {
          try {
                    return query('SELECT * FROM driver_kcb WHERE TELEPHONE = ?', [TELEPHONE])
          } catch (error) {
                    throw error
          }
}

const getHistory = async (chauffeurId, corporate,  month, year, q, limit = 0, offset = 10) => {
          try {
                    var sqlQuery = `SELECT dc.*, co.DESCRIPTION CORPORATE_DESCRIPTION, pi.DESCRIPTION PICKUP, de.DESCRIPTION DESTINATION, rk.NOM  FROM declaration_course  dc     `
                    sqlQuery += " LEFT JOIN corporate co ON co.ID_CORPORATE = dc.ID_CORPORATE "
                    sqlQuery += " LEFT JOIN pick_up pi ON pi.PICK_UP_ID = dc.PICK_UP_ID "
                    sqlQuery += " LEFT JOIN destination de ON de.DESTINATION_ID = dc.DESTINATION_ID "
                    sqlQuery += " LEFT JOIN rider_kcb rk ON rk.RIDE_KCB_ID  = dc.CLIENT_ID "
                    sqlQuery += ` WHERE dc.RIDER_ID = ? AND dc.ID_CORPORATE = ? AND MONTH(DATE_DEBUT_COURSE) = ? AND YEAR(DATE_DEBUT_COURSE) = ?`
                    sqlQuery += ` ORDER BY DATE_DEBUT_COURSE DESC`
                    return query(sqlQuery, [chauffeurId, corporate, month, year])
          } catch (error) {
                    throw error
          }
}

const getLastCourse = async (chauffeurId) => {
          try {
                    return query('SELECT dc.DECLARATION_ID,co.* FROM declaration_course dc LEFT JOIN corporate co ON co.ID_CORPORATE = dc.ID_CORPORATE WHERE RIDER_ID = ? ORDER BY DECLARATION_ID DESC LIMIT 1', [chauffeurId])
          } catch (error) {
                    throw error
          }
}

module.exports = {
          create,
          getAgences,
          getDriver,
          getHistory,
          getLastCourse
};
