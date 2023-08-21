const AbstractManager = require("./AbstractManager")

class CampagnesManager extends AbstractManager {
  constructor() {
    super({ table: "campagnes" })
  }

  insert(campagnes) {
    return this.database.query(
      `INSERT INTO ${this.table} (auteurs_id, jeux_de_role_id, name, img, synopsis, nb_player_min, nb_player_max, level, start_writing_date, publication_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        campagnes.auteurs_id,
        campagnes.jeux_de_role_id,
        campagnes.name,
        campagnes.img,
        campagnes.synopsis,
        campagnes.nb_player_min,
        campagnes.nb_player_max,
        campagnes.level,
        campagnes.start_writing_date,
        campagnes.publication_date,
      ]
    )
  }

  update(campagnes, id) {
    return this.database.query(
      `update ${this.table} set auteurs_id = ?, jeux_de_role_id = ?, name = ?, img = ?, synopsis = ?, nb_player_min = ?, nb_player_max = ?, level = ?, start_writing_date = ?, publication_date = ?  WHERE id = ?`,
      [
        campagnes.auteurs_id,
        campagnes.jeux_de_role_id,
        campagnes.name,
        campagnes.img,
        campagnes.synopsis,
        campagnes.nb_player_min,
        campagnes.nb_player_max,
        campagnes.level,
        campagnes.start_writing_date,
        campagnes.publication_date,
        id,
      ]
    )
  }

  findScenarios(id) {
    return this.database.query(
      `select scenarios.id, scenarios.name FROM ${this.table} INNER JOIN scenarios ON scenarios.campagnes_id = campagnes.id WHERE campagnes.id = ?`,
      [id]
    )
  }
}

module.exports = CampagnesManager
