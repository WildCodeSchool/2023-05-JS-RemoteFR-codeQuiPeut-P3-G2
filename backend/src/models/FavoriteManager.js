const AbstractManager = require("./AbstractManager")

class FavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "scenarios_favoris" })
  }

  add(utilisateurID, scenarioID) {
    return this.database.query(
      `INSERT INTO ${this.table} (utilisateurs_id, scenarios_id) VALUES (?,?)`,
      [utilisateurID, scenarioID]
    )
  }

  deleteFavorite(utilisateurID, scenarioID) {
    return this.database.query(
      `delete from ${this.table} where scenarios_id = ? AND  utilisateurs_id = ? `,
      [scenarioID, utilisateurID]
    )
  }

  findFavorite(id) {
    return this.database.query(
      `select * from  ${this.table} where scenarios_id = ?`,
      [id]
    )
  }
}

module.exports = FavoriteManager
