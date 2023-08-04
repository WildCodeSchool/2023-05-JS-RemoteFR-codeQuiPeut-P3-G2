const AbstractManager = require("./AbstractManager")

class SujetForumManager extends AbstractManager {
  constructor() {
    super({ table: "sujet_forum" })
  }

  insert(sujFor) {
    return this.database.query(
      `INSERT INTO ${this.table} (sujet, open_date) VALUES (?,?)`,
      [sujFor.sujet, sujFor.open_date]
    )
  }

  update(sujFor) {
    return this.database.query(
      `UPDATE ${this.table} SET sujet = ?, open_date = ? WHERE id = ?`,
      [sujFor.sujet, sujFor.open_date, sujFor.id]
    )
  }
}

module.exports = SujetForumManager
