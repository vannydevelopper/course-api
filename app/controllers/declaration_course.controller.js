const declaration_courseModel = require("../models/declaration_course.model");
const moment = require('moment');
const { query } = require("../fonctions/db");

const createDeclaration = async (req, res) => {
          var {
                    ID_CORPORATE,
                    TYPE_DECLARATION_ID,
                    iS_COVOITURAGE,
                    CLIENT_ID,
                    AUTRE_CLIENT,
                    AGENCE_ID,
                    RIDER_ID,
                    PICK_UP_ID, AUTRE_PICKUP,
                    DESTINATION_ID, AUTRE_DESTINATION,
                    TYPE_INCIDENT_ID, AUTRE_INCIDENT,
                    IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES,
                    COMMENTAIRE_COVOITURAGE, RAISON_ANNULATION, ANNULE_PAR,
                    TIME_SPENT, KM_SPENT, MONTANT, DATE_DEBUT_COURSE
          } = req.body;

          try {

                    if(CLIENT_ID == 'autre') {
                              const { insertId: newClientId } = await query('INSERT INTO rider_kcb(NOM, AGENCE_ID, CORPORATE_ID, IS_ACTIF) VALUES(?, ?, ?, ?)', [
                                        AUTRE_CLIENT,
                                        AGENCE_ID,
                                        ID_CORPORATE,
                                        1
                              ])
                              CLIENT_ID = newClientId
                    }

                    if(PICK_UP_ID =='autre') {
                              const { insertId: newPickupId } = await query('INSERT INTO pick_up(ID_CORPORATE, DESCRIPTION) VALUES(?, ?)', [
                                        ID_CORPORATE,
                                        AUTRE_PICKUP
                              ])
                              PICK_UP_ID = newPickupId
                    }
                    
                    if(DESTINATION_ID =='autre') {
                              const { insertId: newDestinationpId } = await query('INSERT INTO destination(CORPORATE_ID, DESCRIPTION) VALUES(?, ?)', [
                                        ID_CORPORATE,
                                        AUTRE_DESTINATION
                              ])
                              DESTINATION_ID = newDestinationpId
                    }
                    if(TYPE_INCIDENT_ID == 'autre') {
                              const { insertId: newIncidentId } = await query('INSERT INTO type_incident(DESCRIPTION) VALUES(?)', [
                                        AUTRE_INCIDENT
                              ])
                              TYPE_INCIDENT_ID = newIncidentId
                    }
                    const { insertId } = await declaration_courseModel.create(
                              ID_CORPORATE, TYPE_DECLARATION_ID, iS_COVOITURAGE,
                              CLIENT_ID, RIDER_ID,
                              PICK_UP_ID, DESTINATION_ID, TYPE_INCIDENT_ID, IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES,
                              COMMENTAIRE_COVOITURAGE, RAISON_ANNULATION, ANNULE_PAR, TIME_SPENT, KM_SPENT,
                              MONTANT, DATE_DEBUT_COURSE, moment().format('YYYY/MM/DD HH:mm:ss'));
                    res.status(201).json({ ...req.body, DECLARATION_ID : insertId });
          } catch (error) {
                    console.log(error);
                    res.status(500).send('Server error')
          }
};

const getAgences = async (req, res) => {
          try {
                    const agences = await declaration_courseModel.getAgences()
                    res.status(200).json(agences)
          } catch (error) {
                    console.log(error)
                    res.status(500).send('Server error')
          }
}

const login = async (req, res) => {
          try {
                    const { TELEPHONE } = req.body
                    const driver = (await declaration_courseModel.getDriver(TELEPHONE))[0]
                    if(driver) {
                              res.status(200).json(driver)
                    } else {
                              res.status(200).json({})
                    }
          } catch (error) {
                    console.log(error)
                    res.status(500).send('Server error')
          }
}

module.exports = {
          createDeclaration,
          getAgences,
          login
};
