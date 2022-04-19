const { query } = require("../fonctions/db");

const create = async (ID_CORPORATE, TYPE_DECLARATION_ID, iS_COVOITURAGE, CLIENT_ID, RIDER_ID, PICK_UP_ID, DESTINATION_ID, TYPE_INCIDENT_ID, IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES, COMMENTAIRE_COVOITURAGE, RAISON_ANNULATION, ANNULE_PAR, TIME_SPENT, KM_SPENT, MONTANT, DATE_DEBUT_COURSE, DATE_INSERTION) => {
          try {
                    return await query(
                              "INSERT INTO declaration_course(ID_CORPORATE, TYPE_DECLARATION_ID, iS_COVOITURAGE, CLIENT_ID, RIDER_ID, PICK_UP_ID, DESTINATION_ID, TYPE_INCIDENT_ID, IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES, COMMENTAIRE_COVOITURAGE, RAISON_ANNULATION, ANNULE_PAR, TIME_SPENT, KM_SPENT, MONTANT, DATE_DEBUT_COURSE, DATE_INSERTION) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                              [ID_CORPORATE, TYPE_DECLARATION_ID, iS_COVOITURAGE, CLIENT_ID, RIDER_ID, PICK_UP_ID, DESTINATION_ID, TYPE_INCIDENT_ID, IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES, COMMENTAIRE_COVOITURAGE, RAISON_ANNULATION, ANNULE_PAR, TIME_SPENT, KM_SPENT, MONTANT, DATE_DEBUT_COURSE, DATE_INSERTION]
                    );
          } catch (error) {
                    console.log(error);
                    throw error;
          }
};

const getAgences = () => {
          try {
                    return query('SELECT * FROM agence_kcb')
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

module.exports = {
          create,
          getAgences,
          getDriver
};
