const AbstractManager = require("./AbstractManager")

class StylePageManager extends AbstractManager {
  constructor() {
    super({ table: "page_style" })
  }

  insert(stylePage) {
    return this.database.query(
      `INSERT INTO ${this.table} (pages_id, padding, background_color) VALUES (?,?,?)`,
      [stylePage.pages_id, stylePage.padding, stylePage.background_color]
    )
  }

  update(stylePage, id) {
    return this.database.query(
      `UPDATE ${this.table} SET pages_id = ?, padding = ?, background_color = ? WHERE id = ?`,
      [stylePage.pages_id, stylePage.padding, stylePage.background_color, id]
    )
  }

  async editStyleFromPageID(stylePage, pageID) {
    // recherche du style correspondant à l'ID de la page
    const [results] = await this.database.query(
      `SELECT ${this.table}.id FROM ${this.table} INNER JOIN pages ON ${this.table}.pages_id = ?`,
      [pageID]
    )

    const styleID = results[0].id

    return this.database.query(
      `UPDATE ${this.table} SET pages_id = ?, padding = ?, background_color = ? WHERE id = ?`,
      [pageID, stylePage.padding, stylePage.background_color, styleID]
    )
  }

  async destroyFromPageID(pageID) {
    // recherche du style correspondant à l'ID du texte
    const [results] = await this.database.query(
      `SELECT ${this.table}.id FROM ${this.table} INNER JOIN pages ON ${this.table}.pages_id = ?`,
      [pageID]
    )

    const styleID = results[0].id

    return this.database.query(`DELETE from ${this.table} where id = ?`, [
      styleID,
    ])
  }
}

module.exports = StylePageManager
