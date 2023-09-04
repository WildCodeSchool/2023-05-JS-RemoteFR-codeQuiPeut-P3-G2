const AbstractManager = require("./AbstractManager")

class ThemesScenarioManager extends AbstractManager {
  constructor() {
    super({ table: "scenarios_themes" })
  }

  insert(themesScenario) {
    return this.database.query(
      `insert into ${this.table} (scenarios_id, themes_id) values (?, ?)`,
      [themesScenario.scenarios_id, themesScenario.themes_id]
    )
  }

  update(themesScenario, id) {
    return this.database.query(
      `update ${this.table} set scenarios_id = ? , themes_id = ? WHERE scenarios_id = ?`,
      [themesScenario.scenarios_id, themesScenario.themes_id, id]
    )
  }
}

module.exports = ThemesScenarioManager
