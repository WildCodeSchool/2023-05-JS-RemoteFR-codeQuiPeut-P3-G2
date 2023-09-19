const AbstractManager = require("./AbstractManager")

class CampaignFavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "campagnes_favoris" })
  }

  verifyCampaignIsFavoriteForUser(userId, campagneId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE campagnes_id = ? AND utilisateurs_id = ?`,
      [campagneId, userId]
    )
  }

  add(utilisateurID, campaignID) {
    return this.database.query(
      `INSERT INTO ${this.table} (utilisateurs_id, campagnes_id) VALUES (?,?)`,
      [utilisateurID, campaignID]
    )
  }

  deleteFavorite(utilisateurID, campaignID) {
    return this.database.query(
      `delete from ${this.table} where utilisateurs_id = ? AND  campagnes_id = ? `,
      [utilisateurID, campaignID]
    )
  }
}
module.exports = CampaignFavoriteManager
