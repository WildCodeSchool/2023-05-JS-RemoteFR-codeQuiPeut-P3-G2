const AbstractManager = require("./AbstractManager")

class VuesScenariosManager extends AbstractManager {
  constructor() {
    super({ table: "vues_scenarios" })
  }

  insert(nbVues, scenarioId) {
    return this.database.query(
      `insert into ${this.table} (nbVuesScenario, scenarios_id) values (?, ?)`,
      [nbVues, scenarioId]
    )
  }

  update(nbVues, scenarioId) {
    return this.database.query(
      `update ${this.table} set nbVuesScenario = ? WHERE scenarios_id = ?`,
      [nbVues, scenarioId]
    )
  }

  addUserReadScenario(userID, scenarioId) {
    return this.database.query(
      `INSERT INTO utilisateurs_vuesscenarios (utilisateurs_id, scenarios_id) VALUES (?,?)`,
      [userID, scenarioId]
    )
  }

  browseUserReadScenarios() {
    return this.database.query(`SELECT * FROM utilisateurs_vuesscenarios`)
  }
}

module.exports = VuesScenariosManager
