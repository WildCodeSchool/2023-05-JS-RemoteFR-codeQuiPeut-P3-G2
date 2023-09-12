const AbstractManager = require("./AbstractManager")

class ScenariosManager extends AbstractManager {
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

  // findPages(id) {
  //   return this.database.query(
  //     `select pages.* from  ${this.table} INNER JOIN pages ON pages.scenarios_id = scenarios.id where scenarios.id = ?`,
  //     [id]
  //   )
  // }

  findPages(id) {
    return this.database.query(
      `select pages.*, ps.padding, ps.background_color FROM  ${this.table} INNER JOIN pages ON pages.scenarios_id = scenarios.id INNER JOIN page_style AS ps ON ps.pages_id = pages.id where scenarios.id = ?`,
      [id]
    )
  }

  findScenarios() {
    return this.database.query(
      `SELECT scenarios.id, auteurs.name as autor, scenarios.name AS title, scenarios.nb_player_min, scenarios.nb_player_max, scenarios.type, scenarios.level, scenarios.start_writing_date, scenarios.publication_date, scenarios.img, scenarios.description, jeux_de_role.name AS universe, themes.name as theme, count(scenarios_favoris.scenarios_id)as nb_favoris, count(avis_scenario.scenarios_id)as nb_avis
FROM ${this.table}
JOIN jeux_de_role ON scenarios.jeux_de_role_id = jeux_de_role.id
JOIN auteurs ON scenarios.auteurs_id = auteurs.id
JOIN scenarios_themes ON scenarios.id = scenarios_themes.scenarios_id
JOIN themes ON scenarios_themes.themes_id = themes.id 
LEFT JOIN scenarios_favoris ON scenarios_favoris.scenarios_id = scenarios.id
LEFT JOIN avis_scenario ON avis_scenario.scenarios_id = scenarios.id
GROUP BY scenarios.id, auteurs.name, scenarios.name, scenarios.nb_player_min, scenarios.nb_player_max, scenarios.type, scenarios.level, scenarios.start_writing_date, scenarios.publication_date, scenarios.img, scenarios.description, jeux_de_role.name, themes.name`
    )
  }
}

module.exports = ScenariosManager
