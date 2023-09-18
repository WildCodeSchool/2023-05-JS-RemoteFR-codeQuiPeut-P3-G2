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
      `select scenarios.id, campagnes.name, campagnes.id as campagneId, scenarios.name, count(scenarios.id) as nbScenarios FROM ${this.table} INNER JOIN scenarios ON scenarios.campagnes_id = campagnes.id WHERE campagnes.id = ?
      group by scenarios.id, scenarios.name, campagnes.name, campagnes.id`,
      [id]
    )
  }

  readCampagneDetailedScenarios(id) {
    return this.database.query(
      `select scenarios.*, campagnes.name AS campagnes_name, jdr.name AS jeux_de_role, themes.name AS theme FROM ${this.table} INNER JOIN scenarios ON scenarios.campagnes_id = campagnes.id INNER JOIN jeux_de_role AS jdr ON jdr.id = scenarios.jeux_de_role_id INNER JOIN scenarios_themes AS st ON st.scenarios_id = scenarios.id  INNER JOIN themes ON themes.id = st.themes_id WHERE campagnes.id = ?`,
      [id]
    )
  }

  readWithTheme(id) {
    return this.database.query(
      `select s.* , st.themes_id, t.name AS theme_name, jdr.name AS jeux_de_role FROM  ${this.table} AS s INNER JOIN campagnes_themes AS st ON st.campagnes_id = s.id INNER JOIN themes AS t ON t.id = st.themes_id INNER JOIN jeux_de_role AS jdr ON jdr.id = s.jeux_de_role_id where s.id = ?`,
      [id]
    )
  }

  findCampagne() {
    return this.database.query(
      `select campagnes.name, campagnes.id as campagneId, count(scenarios.id) as nbScenarios FROM ${this.table} INNER JOIN scenarios ON scenarios.campagnes_id = campagnes.id 
      group by campagnes.name, campagnes.id`
    )
  }
}

module.exports = CampagnesManager
