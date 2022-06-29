const { query } = require("../fonctions/db");

const create = async (ID_CORPORATE, TYPE_DECLARATION_ID, NUMERO_COURSE, LATITUDE, LONGITUDE, iS_COVOITURAGE, CLIENT_ID, RIDER_ID, PICK_UP_ID, DESTINATION_ID,	ID_MODE, TYPE_INCIDENT_ID, IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES, COMMENTAIRE_COVOITURAGE, ID_RAISON_ANNULATION, DATE_DEMANDE_COURSE, DATE_ANNULATION_COURSE, ANNULE_PAR, TIME_SPENT, KM_SPENT, MONTANT, DATE_DEBUT_COURSE, DATE_INSERTION) => {
          console.log(DATE_INSERTION, DATE_DEBUT_COURSE)
          try {
                    return await query(
                              "INSERT INTO declaration_course(ID_CORPORATE, TYPE_DECLARATION_ID, NUMERO_COURSE, LATITUDE, LONGITUDE, iS_COVOITURAGE, CLIENT_ID, RIDER_ID, PICK_UP_ID, DESTINATION_ID, ID_MODE, TYPE_INCIDENT_ID, IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES, COMMENTAIRE_COVOITURAGE, ID_RAISON_ANNULATION, DATE_DEMANDE_COURSE, DATE_ANNULATION_COURSE, ANNULE_PAR, TIME_SPENT, KM_SPENT, MONTANT, DATE_DEBUT_COURSE, DATE_INSERTION) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
                              [ID_CORPORATE, TYPE_DECLARATION_ID, NUMERO_COURSE, LATITUDE, LONGITUDE, iS_COVOITURAGE, CLIENT_ID, RIDER_ID, PICK_UP_ID, DESTINATION_ID, ID_MODE, TYPE_INCIDENT_ID, IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES, COMMENTAIRE_COVOITURAGE, ID_RAISON_ANNULATION, DATE_DEMANDE_COURSE, DATE_ANNULATION_COURSE, ANNULE_PAR, TIME_SPENT, KM_SPENT, MONTANT, DATE_DEBUT_COURSE, DATE_INSERTION]
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
                    return query('SELECT dkc.*, dt.ID_DRIVER_KCB FROM driver_kcb dkc LEFT JOIN driver_notification_tokens dt ON dt.ID_DRIVER_KCB = dkc.DRIVER_ID WHERE TELEPHONE = ?', [TELEPHONE])
          } catch (error) {
                    throw error
          }
}

const getHistory = async (chauffeurId, isAll = false, corporate,  month, year, q, limit = 0, offset = 10) => {
          try {
                    var binds = []
                    var sqlQuery = `SELECT dc.*, co.DESCRIPTION CORPORATE_DESCRIPTION, tyi.DESCRIPTION INCIDENT_DESCRIPTION, ra.DESCRIPTION RAISON_ANNULATION, drk.NOM_CHAFFEUR, drk.PRENOM_CHAUFFEUR, pi.DESCRIPTION PICKUP, de.DESCRIPTION DESTINATION, rk.NOM  FROM declaration_course  dc`
                    sqlQuery += " LEFT JOIN corporate co ON co.ID_CORPORATE = dc.ID_CORPORATE "
                    sqlQuery += " LEFT JOIN pick_up pi ON pi.PICK_UP_ID = dc.PICK_UP_ID "
                    sqlQuery += " LEFT JOIN destination de ON de.DESTINATION_ID = dc.DESTINATION_ID "
                    sqlQuery += " LEFT JOIN driver_kcb drk ON drk.DRIVER_ID = dc.RIDER_ID "
                    sqlQuery += " LEFT JOIN type_incident tyi ON tyi.TYPE_INCIDENT_ID = dc.TYPE_INCIDENT_ID "
                    sqlQuery += " LEFT JOIN raisons_annulation ra ON ra.ID_RAISON_ANNULATION = dc.ID_RAISON_ANNULATION "
                    sqlQuery += " LEFT JOIN rider_kcb rk ON rk.RIDE_KCB_ID  = dc.CLIENT_ID WHERE 1 "
                    if(!isAll) {
                              sqlQuery +=  ' AND dc.RIDER_ID = ? '
                              binds.push(chauffeurId)
                    }
                    sqlQuery += `  AND dc.ID_CORPORATE = ? AND MONTH(DATE_INSERTION) = ? AND YEAR(DATE_INSERTION) = ?`
                    sqlQuery += ` ORDER BY DATE_INSERTION DESC`
                    if(isAll) {
                              sqlQuery += " LIMIT 50 "
                    }
                    binds.push(corporate, month, year)
                    return query(sqlQuery, binds)
          } catch (error) {
                    throw error
          }
}

const getOneDeclaration = async (idDeclaration) => {
          try {
                    var sqlQuery = `SELECT dc.*, co.DESCRIPTION CORPORATE_DESCRIPTION, ra.DESCRIPTION RAISON_ANNULATION , drk.NOM_CHAFFEUR, drk.PRENOM_CHAUFFEUR, pi.DESCRIPTION PICKUP, de.DESCRIPTION DESTINATION, rk.NOM  FROM declaration_course  dc     `
                    sqlQuery += " LEFT JOIN corporate co ON co.ID_CORPORATE = dc.ID_CORPORATE "
                    sqlQuery += " LEFT JOIN pick_up pi ON pi.PICK_UP_ID = dc.PICK_UP_ID "
                    sqlQuery += " LEFT JOIN destination de ON de.DESTINATION_ID = dc.DESTINATION_ID "
                    sqlQuery += " LEFT JOIN rider_kcb rk ON rk.RIDE_KCB_ID  = dc.CLIENT_ID "
                    sqlQuery += " LEFT JOIN driver_kcb drk ON drk.DRIVER_ID = dc.RIDER_ID "
                    sqlQuery += " LEFT JOIN raisons_annulation ra ON ra.ID_RAISON_ANNULATION = dc.ID_RAISON_ANNULATION "
                    sqlQuery += ` WHERE dc.DECLARATION_ID = ?`
                    sqlQuery += ` ORDER BY DATE_INSERTION DESC`
                    return query(sqlQuery, [idDeclaration])
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
          getLastCourse,
          getOneDeclaration
};
