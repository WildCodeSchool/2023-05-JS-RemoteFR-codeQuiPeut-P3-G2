const AbstractManager = require("./AbstractManager")

class AuteursFavorisManager extends AbstractManager {
  constructor() {
    super({ table: "auteurs_favoris" })
  }

  addAuteur(utilisateurID, auteurID) {
    return this.database.query(
      `INSERT INTO ${this.table} (utilisateurs_id, auteurs_id) VALUES (?,?)`,
      [utilisateurID, auteurID]
    )
  }

  deleteFavoriteAuteur(auteurID, utilisateurID) {
    return this.database.query(
      `delete from ${this.table} where auteurs_id = ? AND  utilisateurs_id = ? `,
      [auteurID, utilisateurID]
    )
  }

  findFavoriteAuteur(id) {
    return this.database.query(
      `select * from  ${this.table} where utilisateurs_id = ?`,
      [id]
    )
  }

  verifyAuthorIsFavoriteForUser(userId, authorId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE auteurs_id = ? AND utilisateurs_id = ?`,
      [authorId, userId]
    )
  }
}

module.exports = AuteursFavorisManager
