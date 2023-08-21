const AbstractManager = require("./AbstractManager")

class SavedStylePageManager extends AbstractManager {
  constructor() {
    super({ table: "saved_style_page" })
  }

  insert(saveStPg) {
    return this.database.query(
      `INSERT INTO ${this.table} (utilisateurs_id, padding, background_color, styleName) VALUES (?,?,?,?)`,
      [
        saveStPg.utilisateurs_id,
        saveStPg.padding,
        saveStPg.background_color,
        saveStPg.styleName,
      ]
    )
  }

  update(saveStPg) {
    return this.database.query(
      `UPDATE ${this.table} SET utilisateurs_id = ?, padding = ?, background_color = ?, styleName = ? WHERE id = ?`,
      [
        saveStPg.utilisateurs_id,
        saveStPg.padding,
        saveStPg.background_color,
        saveStPg.styleName,
        saveStPg.id,
      ]
    )
  }

  readFromUtilisateurID(userID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE utilisateurs_id = ?`,
      [userID]
    )
  }
}

module.exports = SavedStylePageManager
