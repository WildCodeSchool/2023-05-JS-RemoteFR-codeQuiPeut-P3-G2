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
}

module.exports = VuesScenariosManager
