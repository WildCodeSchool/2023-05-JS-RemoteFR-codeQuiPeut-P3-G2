const AbstractManager = require("./AbstractManager")

class RoleGamesManager extends AbstractManager {
  constructor() {
    super({ table: "jeux_de_role" })
  }

  insert(rolegames) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      rolegames.name,
    ])
  }

  update(rolegames, id) {
    return this.database.query(
      `update ${this.table} set name = ? WHERE id = ?`,
      [rolegames.name, id]
    )
  }
}

module.exports = RoleGamesManager
