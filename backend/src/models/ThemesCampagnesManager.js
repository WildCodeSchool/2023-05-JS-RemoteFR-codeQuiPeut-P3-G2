const AbstractManager = require("./AbstractManager")

class ThemesCampagnesManager extends AbstractManager {
  constructor() {
    super({ table: "campagnes_themes" })
  }

  insert(themesCampagnes) {
    return this.database.query(
      `insert into ${this.table} (campagnes_id, themes_id) values (?, ?)`,
      [themesCampagnes.campagnes_id, themesCampagnes.themes_id]
    )
  }

  update(themesCampagnes, id) {
    return this.database.query(
      `update ${this.table} set campagnes_id = ? , themes_id = ? WHERE campagnes_id = ?`,
      [themesCampagnes.campagnes_id, themesCampagnes.themes_id, id]
    )
  }
}

module.exports = ThemesCampagnesManager
