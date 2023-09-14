const AbstractManager = require("./AbstractManager")

class ScenarioCommentManager extends AbstractManager {
  constructor() {
    super({ table: "avis_scenario" })
  }

  add(utilisateurID, scenarioID, textcomment, datecomment) {
    return this.database.query(
      `INSERT INTO ${this.table} (scenarios_id, utilisateurs_id, commentaire, date) VALUES (?,?,?,?)`,
      [scenarioID, utilisateurID, textcomment, datecomment]
    )
  }

  // deleteComment(id, scenarioID, utilisateurID) {
  deleteComment(avis) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE id = ? AND scenarios_id = ? AND  utilisateurs_id = ?`,
      [avis.id, avis.scenarioID, avis.utilisateurID]
    )
  }

  update(avis) {
    return this.database.query(
      `UPDATE ${this.table} SET commentaire = ? WHERE id = ? AND scenarios_id = ? AND utilisateurs_id = ?`,
      [avis.textcomment, avis.id, avis.scenarioID, avis.utilisateurID]
    )
  }

  getByScenarioID(id) {
    return this.database.query(
      `SELECT avis_scenario.id, scenarios_id, scenarios.name, utilisateurs_id, concat(utilisateurs.firstname,' ',utilisateurs.lastname) AS nomPrenom, utilisateurs.login, commentaire, date FROM ${this.table} INNER JOIN utilisateurs ON utilisateurs_id = utilisateurs.id INNER JOIN scenarios ON scenarios_id = scenarios.id WHERE scenarios_id = ? ORDER BY avis_scenario.id ASC`,
      [id]
    )
  }

  getByScenarioID_sauvegarde(id) {
    return this.database.query(
      `select * from  ${this.table} where scenarios_id = ?`,
      [id]
    )
  }

  findAllExtended() {
    return this.database.query(
      `SELECT avis_scenario.id, scenarios_id, scenarios.name, utilisateurs_id, concat(utilisateurs.firstname,' ',utilisateurs.lastname) AS nomPrenom, utilisateurs.login, commentaire, date FROM ${this.table} INNER JOIN utilisateurs ON utilisateurs_id = utilisateurs.id INNER JOIN scenarios ON scenarios_id = scenarios.id`
    )
  }
}

module.exports = ScenarioCommentManager
