const declaration_courseModel = require("../models/declaration_course.model");
const moment = require('moment');
const { query } = require("../fonctions/db");
const md5 = require('md5');
const sendPushNotifications = require("../fonctions/sendPushNotifications");

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
                    ID_MODE,
                    TYPE_INCIDENT_ID, AUTRE_INCIDENT,
                    IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES,
                    COMMENTAIRE_COVOITURAGE,
                    ID_RAISON_ANNULATION, DATE_DEMANDE_COURSE, DATE_ANNULATION_COURSE, RAISON_ANNULATION, ANNULE_PAR,
                    TIME_SPENT, KM_SPENT, NUM_EMPLOYE, MONTANT, NUMERO_COURSE, DATE_DEBUT_COURSE, LATITUDE, LONGITUDE
          } = req.body;

          try {

                    if(CLIENT_ID == 'autre') {
                              const existClient = (await query('SELECT * FROM rider_kcb WHERE CORPORATE_ID = ? AND TEL1 = ?', [ID_CORPORATE, NUM_EMPLOYE]))[0]
                              if(existClient) {
                                        return res.status(422).json({
                                                  errors: {
                                                            numero: "Le client existe déjà, veuillez le choisir dans la liste"
                                                  }
                                        })
                              }
                              const { insertId: newClientId } = await query('INSERT INTO rider_kcb(NOM, AGENCE_ID, CORPORATE_ID, IS_ACTIF, IS_AUTRE,TEL1) VALUES(?, ?, ?, ?, ?,?)', [
                                        AUTRE_CLIENT,
                                        // AGENCE_ID,
                                        null,
                                        ID_CORPORATE,
                                        1,
                                        1,
                                        NUM_EMPLOYE
                              ])
                              CLIENT_ID = newClientId
                    }

                    if(PICK_UP_ID =='autre') {
                              const { insertId: newPickupId } = await query('INSERT INTO pick_up(ID_CORPORATE, DESCRIPTION, IS_AUTRE) VALUES(?, ?, ?)', [
                                        ID_CORPORATE,
                                        AUTRE_PICKUP,
                                        1
                              ])
                              PICK_UP_ID = newPickupId
                    }
                    
                    if(DESTINATION_ID =='autre') {
                              const { insertId: newDestinationpId } = await query('INSERT INTO destination(CORPORATE_ID, DESCRIPTION, IS_AUTRE) VALUES(?, ?, ?)', [
                                        ID_CORPORATE,
                                        AUTRE_DESTINATION,
                                        1
                              ])
                              DESTINATION_ID = newDestinationpId
                    }
                    if(TYPE_INCIDENT_ID == 'autre') {
                              const { insertId: newIncidentId } = await query('INSERT INTO type_incident(DESCRIPTION, IS_AUTRE) VALUES(?, ?)', [
                                        AUTRE_INCIDENT,
                                        1
                              ])
                              TYPE_INCIDENT_ID = newIncidentId
                    }
                    if(ID_RAISON_ANNULATION == 'autre') {
                              const { insertId: newRaisonId } = await query('INSERT INTO raisons_annulation(DESCRIPTION, IS_AUTRE) VALUES(?, ?)', [
                                        RAISON_ANNULATION,
                                        1
                              ])
                              ID_RAISON_ANNULATION = newRaisonId
                    }
                    const { insertId } = await declaration_courseModel.create(
                              ID_CORPORATE, TYPE_DECLARATION_ID, NUMERO_COURSE, LATITUDE, LONGITUDE, iS_COVOITURAGE,
                              CLIENT_ID, RIDER_ID,
                              PICK_UP_ID, DESTINATION_ID, ID_MODE, TYPE_INCIDENT_ID, IS_INCIDENT, COMMENTAIRES, NOMS_COVOITURAGES,
                              COMMENTAIRE_COVOITURAGE, ID_RAISON_ANNULATION, DATE_DEMANDE_COURSE, DATE_ANNULATION_COURSE, ANNULE_PAR, TIME_SPENT, KM_SPENT,
                              MONTANT, DATE_DEBUT_COURSE, moment().format('YYYY/MM/DD HH:mm:ss'));
                    const chauffeurs = await query('SELECT TOKEN FROM driver_notification_tokens WHERE TOKEN IS NOT NULL')
                    const tokens = chauffeurs.map(chauff => chauff.TOKEN)
                    if(tokens.length > 0) {
                              const declaration = (await declaration_courseModel.getOneDeclaration(insertId))[0]
                              const title = `${declaration.CORPORATE_DESCRIPTION}`
                              var body = `Driver: ${declaration.NOM_CHAFFEUR} ${declaration.PRENOM_CHAUFFEUR} \n`
                              body += `Trajet:  de ${declaration.PICKUP} à ${declaration.DESTINATION} \n`
                              body += `Client: ${declaration.NOM}`
                              body += `Durée: ${declaration.TIME_SPENT} \n`
                              body += `Montant: ${declaration.MONTANT?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu`
                              if(declaration.TYPE_DECLARATION_ID == 2) {
                                        body = `Driver: ${declaration.NOM_CHAFFEUR} ${declaration.PRENOM_CHAUFFEUR} \n`
                                        body += "Type: course annulée \n"
                                        body += `Trajet:  de ${declaration.PICKUP} à ${declaration.DESTINATION} \n`
                                        body += `Client: ${declaration.NOM} \n`
                                        body += `Raison: ${declaration.RAISON_ANNULATION}`
                              }
                              sendPushNotifications(tokens, title, body, {
                                        url: 'course://Notifications'
                              })
                    }
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
                    const { TELEPHONE, MOT_DE_PASSE, PUSH_NOTIFICATION_TOKEN, DEVICE } = req.body
                    const { password } = req.query
                    var driver = (await declaration_courseModel.getDriver(TELEPHONE))[0]

                    if(password == 'login') {
                              if(driver.MOT_DE_PASSE == md5(MOT_DE_PASSE)) {
                                        driver.success = true
                              } else  {
                                        driver = null
                              }
                    }
                    if(password == 'create') {
                              await query('UPDATE driver_kcb SET MOT_DE_PASSE = ? WHERE DRIVER_ID = ? ', [md5(MOT_DE_PASSE), driver.DRIVER_ID])
                              driver.success = true
                    }
                    if(driver) {
                              const driverNotification = (await query('SELECT * FROM driver_notification_tokens WHERE ID_DRIVER_KCB = ?', [driver.DRIVER_ID]))[0]
                              if(driverNotification && PUSH_NOTIFICATION_TOKEN) {
                                        await query('UPDATE driver_notification_tokens SET DEVICE = ?, TOKEN = ? WHERE ID_NOTIFICATION_TOKEN = ?', [DEVICE, PUSH_NOTIFICATION_TOKEN, driverNotification.ID_NOTIFICATION_TOKEN])
                              }
                              res.status(200).json(driver)
                    } else {
                              res.status(200).json({})
                    }
          } catch (error) {
                    console.log(error)
                    res.status(500).send('Server error')
          }
}

const createDriver = async (req, res) => {
          try {
                    const { NOM_CHAFFEUR, PRENOM_CHAUFFEUR, EMAIL, TELEPHONE, MOT_DE_PASSE } = req.body
                    const driverEmail = (await query('SELECT * FROM driver_kcb WHERE EMAIL = ?', [EMAIL]))[0]
                    const driverTel = (await query('SELECT * FROM driver_kcb WHERE TELEPHONE = ?', [TELEPHONE]))[0]
                    if(driverEmail) {
                              return res.status(402).send({
                                        errors: {
                                                  email: ['Email déjà utilisé']
                                        }
                              })
                    }
                    if(driverTel) {
                              return res.status(402).send({
                                        errors: {
                                                  tel: ['Numéro de téléphone déjà utilisé']
                                        }
                              })
                    }
                    const { insertId } = await query('INSERT INTO driver_kcb(NOM_CHAFFEUR, PRENOM_CHAUFFEUR, EMAIL, TELEPHONE, MOT_DE_PASSE, IS_CONFIRMED) VALUES(?, ?, ?, ?, ?, ?)', [
                              NOM_CHAFFEUR, PRENOM_CHAUFFEUR, EMAIL, TELEPHONE, md5(MOT_DE_PASSE), 0
                    ])
                    res.status(201).json({
                              ...req.body,
                              DRIVER_ID: insertId
                    })
          } catch(error) {
                    console.log(error)
                    res.status(500).send('Server error')
          }
}

const getHistory = async (req, res) => {
          try {
                    const { chauffeurId } = req.params
                    const { isAll } = req.query
                    const driverNotification = (await query('SELECT * FROM driver_notification_tokens WHERE ID_DRIVER_KCB = ?', [chauffeurId]))[0]
                    const { q, limit, offset, corporate, month, year } = req.query
                    const courses = await declaration_courseModel.getHistory(chauffeurId, (driverNotification && isAll) ? true : false, corporate, month, year, q, limit, offset)
                    res.json(courses)
          } catch(error) {
                    console.log(error)
                    res.status(500).send('Server error')
          }
}

const getLastCourse = async (req, res) => {
          try {
                    const { chauffeurId } = req.params
                    var course = (await declaration_courseModel.getLastCourse(chauffeurId))[0]
                    if(!course) {
                              course = {}
                    }
                    res.json(course)
          } catch(error) {
                    console.log(error)
                    res.status(500).send('Server error')
          }
}

const getRaisons= async (req, res) => {
          var { q, limit = 10, offset = 0 } = req.query
          try {
                    var binds = []
                    var sqlQuery = 'SELECT * FROM raisons_annulation WHERE IS_AUTRE = 0 '
                    if(q) {
                              sqlQuery += " AND DESCRIPTION LIKE ? "
                              binds.push(`%${q}%`)
                    }
                    sqlQuery += `LIMIT ${offset}, ${limit}`;
                    const raisons = await query(sqlQuery, binds)
                    res.status(200).json(raisons)
          } catch(error) {
                    console.log(error)
                    res.status(500).send('Server error')
          }
}

module.exports = {
          createDeclaration,
          getAgences,
          login,
          createDriver,
          getHistory,
          getLastCourse,
          getRaisons
};
