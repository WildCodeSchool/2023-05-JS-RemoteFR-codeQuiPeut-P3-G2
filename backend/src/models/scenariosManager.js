const AbstractManager = require("./AbstractManager")

class scenariosManager extends AbstractManager {
  constructor() {
    super({ table: "scenarios" })
  }

  insert(scenarios) {
    return this.database.query(
      `insert into ${this.table} (auteurs_id, jeux_de_role_id, campagnes_id, name, nb_player_min, nb_player_max, type, level, start_writing_date, publication_date, img, description, model, pdf) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        scenarios.auteurs_id,
        scenarios.jeux_de_role_id,
        scenarios.campagnes_id,
        scenarios.name,
        scenarios.nb_player_min,
        scenarios.nb_player_max,
        scenarios.type,
        scenarios.level,
        scenarios.start_writing_date,
        scenarios.publication_date,
        scenarios.img,
        scenarios.description,
        scenarios.model,
        scenarios.pdf,
      ]
    )
  }

  update(scenarios) {
    return this.database.query(
      `update ${this.table} set name = ?, nb_player_min = ?, nb_player_max = ?, type = ?, level = ?, start_writing_date = ?, publication_date = ?, img = ?, description = ?, model = ?, pdf = ? where id = ?`,
      [
        scenarios.name,
        scenarios.nb_player_min,
        scenarios.nb_player_max,
        scenarios.type,
        scenarios.level,
        scenarios.start_writing_date,
        scenarios.publication_date,
        scenarios.img,
        scenarios.description,
        scenarios.model,
        scenarios.pdf,
        scenarios.id,
      ]
    )
  }
}

module.exports = scenariosManager
