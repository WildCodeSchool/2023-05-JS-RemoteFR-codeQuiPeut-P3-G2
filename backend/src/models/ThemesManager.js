const AbstractManager = require("./AbstractManager")

class ThemesManager extends AbstractManager {
  constructor() {
    super({ table: "themes" })
  }

  insert(themes) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      themes.name,
    ])
  }

  update(themes, id) {
    return this.database.query(
      `update ${this.table} set name = ? WHERE id = ?`,
      [themes.name, id]
    )
  }
}

module.exports = ThemesManager
