const AbstractManager = require("./AbstractManager")

class UtilisateursManager extends AbstractManager {
  constructor() {
    super({ table: "utilisateurs" })
  }

  insert(utilisateurs) {
    return this.database.query(
      `insert into ${this.table} (lastname, firstname, login, email, password, hashedPassword, img) values (?,?,?,?,?,?,?)`,
      [
        utilisateurs.lastname,
        utilisateurs.firstname,
        utilisateurs.login,
        utilisateurs.email,
        utilisateurs.password,
        utilisateurs.hashedPassword,
        utilisateurs.img,
      ]
    )
  }

  update(utilisateurs, id) {
    return this.database.query(
      `update ${this.table} set lastname = ?, firstname = ?, login = ?, email = ? WHERE id = ?`,
      [
        utilisateurs.lastname,
        utilisateurs.firstname,
        utilisateurs.login,
        utilisateurs.email,
        id,
      ]
    )
  }

  updatePassword(utilisateurs, id) {
    return this.database.query(
      `update ${this.table} set password = ? where id = ?`,
      [utilisateurs.password, id]
    )
  }

  readUserByEmailWithPassword(email) {
    return this.database.query(
      `select id, lastname, firstname, login, email, hashedPassword, img, inscription_date from  ${this.table} where email = ?`,
      [email]
    )
  }

  readUserByEmail(email) {
    return this.database.query(`select * from  ${this.table} where email = ?`, [
      email,
    ])
  }

  readUserByLogin(login) {
    return this.database.query(`select * from  ${this.table} where login = ?`, [
      login,
    ])
  }

  sendUserWhoHasGoodEmailAndPassword(email) {
    return this.database.query(
      `select id, lastname, firstname, login, email, img, inscription_date from  ${this.table} where email = ?`,
      [email]
    )
  }

  findAllWithoutPassword() {
    return this.database.query(
      `SELECT id, lastname, firstname, login, email, img, inscription_date FROM  ${this.table}`
    )
  }

  findWithoutPassword(id) {
    return this.database.query(
      // `SELECT id, lastname, firstname, login, email, img, inscription_date FROM  ${this.table} WHERE  id = ?`,
      `SELECT * FROM  ${this.table} WHERE  id = ?`,
      [id]
    )
  }
}

module.exports = UtilisateursManager
