const AbstractManager = require("./AbstractManager")

class PagesManager extends AbstractManager {
  constructor() {
    super({ table: "pages" })
  }

  insert(pages) {
    return this.database.query(
      `INSERT INTO ${this.table} (scenarios_id, page_types_id, titre, number) VALUES (?, ?, ?, ?)`,
      [pages.scenarios_id, pages.page_types_id, pages.titre, pages.number]
    )
  }

  update(pages, id) {
    return this.database.query(
      `update ${this.table} set scenarios_id = ?, page_types_id = ?, titre = ?, number = ?  WHERE id = ?`,
      [pages.scenarios_id, pages.page_types_id, pages.titre, pages.number, id]
    )
  }

  //   findScenarios(id) {
  //     return this.database.query(
  //       `select scenarios.id, scenarios.name FROM ${this.table} INNER JOIN scenarios ON scenarios.pages_id = pages.id WHERE campagnes.id = ?`,
  //       [
  //         id,
  //       ]
  //     )
  //   }
}

module.exports = PagesManager
