const AbstractManager = require("./AbstractManager")

class FavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "avis_scenario" })
  }

  add(scenarioID, utilisateurID, textcomment, datecomment) {
    return this.database.query(
      `INSERT INTO ${this.table} (scenarios_id, utilisateurs_id, commentaire, date) VALUES (?,?,?,?)`,
      [scenarioID, utilisateurID, textcomment, datecomment]
    )
  }

  deleteFavorite(utilisateurID, scenarioID) {
    return this.database.query(
      `delete from ${this.table} where scenarios_id = ? AND  utilisateurs_id = ? `,
      [scenarioID, utilisateurID]
    )
  }

  // findFavorite(id) {
  //   return this.database.query(
  //     `select * from  ${this.table} where scenarios_id = ?`,
  //     [id]
  //   )
  // }
}

module.exports = FavoriteManager
