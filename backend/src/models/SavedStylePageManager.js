const AbstractManager = require("./AbstractManager")

class SavedStylePageManager extends AbstractManager {
  constructor() {
    super({ table: "saved_style_page" })
  }

  insert(saveStPg) {
    return this.database.query(
      `INSERT INTO ${this.table} (utilisateurs_id, padding, background_color) VALUES (?,?,?)`,
      [saveStPg.utilisateurs_id, saveStPg.padding, saveStPg.background_color]
    )
  }

  update(saveStPg) {
    return this.database.query(
      `UPDATE ${this.table} SET utilisateurs_id = ?, padding = ?, background_color = ? WHERE id = ?`,
      [
        saveStPg.utilisateurs_id,
        saveStPg.padding,
        saveStPg.background_color,
        saveStPg.id,
      ]
    )
  }
}

module.exports = SavedStylePageManager
