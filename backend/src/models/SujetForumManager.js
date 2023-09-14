const AbstractManager = require("./AbstractManager")

class SujetForumManager extends AbstractManager {
  constructor() {
    super({ table: "sujet_forum" })
  }

  insert(sujet, openDate, sujetForumCategoriesId, firstComment) {
    return this.database.query(
      `INSERT INTO ${this.table} (sujet, open_date, sujet_forum_categories_id, firstComment) VALUES (? ,?, ?, ?)`,
      [sujet, openDate, sujetForumCategoriesId, firstComment]
    )
  }
}

module.exports = SujetForumManager
