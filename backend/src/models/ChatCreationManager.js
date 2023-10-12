const AbstractManager = require("./AbstractManager")

class ChatCreationManager extends AbstractManager {
  constructor() {
    super({ table: "chat_creation" })
  }

  insert(newPost) {
    return this.database.query(
      `insert into ${this.table} (scenarios_id, utilisateurs_id, commentaire, date_time) values (?,?,?,?)`,
      [
        newPost.scenarios_id,
        newPost.utilisateurs_id,
        newPost.commentaire,
        newPost.date_time,
      ]
    )
  }

  readFromScenarioId(scenarioID) {
    return this.database.query(
      `SELECT c.* , u.login AS userName FROM ${this.table} AS c
        INNER JOIN utilisateurs AS u ON u.id = c.utilisateurs_id
        WHERE c.scenarios_id = ?`,
      [scenarioID]
    )
  }
}

module.exports = ChatCreationManager
