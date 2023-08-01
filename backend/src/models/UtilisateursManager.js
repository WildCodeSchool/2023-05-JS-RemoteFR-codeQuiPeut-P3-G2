const AbstractManager = require("./AbstractManager")

class UtilisateursManager extends AbstractManager {
  constructor() {
    super({ table: "utilisateurs" })
  }

  insert(utilisateurs) {
    return this.database.query(
      `insert into ${this.table} (lastname, firstname, login, email, password, img, inscription_date) values (?,?,?,?,?,?,?)`,
      [
        utilisateurs.lastname,
        utilisateurs.firstname,
        utilisateurs.login,
        utilisateurs.email,
        utilisateurs.password,
        utilisateurs.img,
        utilisateurs.inscription_date,
      ]
    )
  }

  update(utilisateurs) {
    return this.database.query(
      `UPDATE ${this.table} SET lastname = ?, firstname = ?, login = ?, email = ? password = ? img = ? inscription_date = ? WHERE (id = ?)`,
      [
        utilisateurs.lastname,
        utilisateurs.firstname,
        utilisateurs.login,
        utilisateurs.email,
        utilisateurs.password,
        utilisateurs.img,
        utilisateurs.inscription_date,
        utilisateurs.id,
      ]
    )
  }
}

module.exports = UtilisateursManager
