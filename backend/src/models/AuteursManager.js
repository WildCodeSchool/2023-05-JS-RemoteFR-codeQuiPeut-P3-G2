const AbstractManager = require("./AbstractManager")

class AuteursManager extends AbstractManager {
  constructor() {
    super({ table: "auteurs" })
  }

  insert(auteurs) {
    return this.database.query(
      `insert into ${this.table} (utilisateurs_id, name) values (?,?)`,
      [auteurs.utilisateurs_id, auteurs.name]
    )
  }

  update(auteurs, id) {
    return this.database.query(
      `update ${this.table} set utilisateurs_id = ?, name = ? WHERE id = ?`,
      [auteurs.utilisateurs_id, auteurs.name, id]
    )
  }

  findUser(userID) {
    return this.database.query(
      `select auteurs.id, auteurs.utilisateurs_id, auteurs.name FROM ${this.table} INNER JOIN utilisateurs ON auteurs.utilisateurs_id = utilisateurs.id WHERE utilisateurs.id = ?`,
      [userID]
    )
  }

  findCampagnes(id) {
    return this.database.query(
      `select campagnes.id, campagnes.name FROM ${this.table} INNER JOIN campagnes ON campagnes.auteurs_id = auteurs.id WHERE auteurs.id = ?`,
      [id]
    )
  }
}

module.exports = AuteursManager
