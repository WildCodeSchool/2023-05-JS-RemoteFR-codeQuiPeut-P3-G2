const AbstractManager = require("./AbstractManager")
class FilterManager extends AbstractManager {
  constructor() {
    super({ table: "themes" })
  }

  findTheme() {
    return this.database.query(`SELECT name FROM ${this.table}`)
  }
}
module.exports = FilterManager
