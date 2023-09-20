const AbstractManager = require("./AbstractManager")

class VuesCampagnesManager extends AbstractManager {
  constructor() {
    super({ table: "vues_campagnes" })
  }

  insert(nbVues, campagneId) {
    return this.database.query(
      `insert into ${this.table} (nbVuesCampagne, campagnes_id) values (?, ?)`,
      [nbVues, campagneId]
    )
  }

  update(nbVues, campagneId) {
    return this.database.query(
      `update ${this.table} set nbVuesCampagne = ? WHERE campagnes_id = ?`,
      [nbVues, campagneId]
    )
  }
}

module.exports = VuesCampagnesManager
