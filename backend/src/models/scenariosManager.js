const AbstractManager = require("./AbstractManager")

class ScenariosManager extends AbstractManager {
  constructor() {
    super({ table: "scenarios" })
  }

  insert(scenarios) {
    return this.database.query(
      `insert into ${this.table} (auteurs_id, jeux_de_role_id, campagnes_id, name, nb_player_min, nb_player_max, type, level, start_writing_date, publication_date, img, description, model) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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

  readWithTheme(id) {
    return this.database.query(
      `select s.* , st.themes_id, t.name AS theme_name from  ${this.table} AS s INNER JOIN scenarios_themes AS st ON st.scenarios_id = s.id INNER JOIN themes AS t ON t.id = st.themes_id where s.id = ?`,
      [id]
    )
  }
}

module.exports = ScenariosManager
