const AbstractManager = require("./AbstractManager")

class ScenarioCommentManager extends AbstractManager {
  constructor() {
    super({ table: "avis_scenario" })
  }

  add(scenarioID, utilisateurID, textcomment, datecomment) {
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
      `UPDATE ${this.table} SET commentaire = ? WHERE id = ? AND scenarioS_id = ? AND utilisateurs_id = ?`,
      [avis.textcomment, avis.id, avis.scenarioID, avis.utilisateurID]
    )
  }
}

module.exports = ScenarioCommentManager
