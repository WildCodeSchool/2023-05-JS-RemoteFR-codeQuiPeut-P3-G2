const AbstractManager = require("./AbstractManager")

class UtilisateursManager extends AbstractManager {
  constructor() {
    super({ table: "utilisateurs" })
  }

  insert(utilisateurs) {
    return this.database.query(
      `insert into ${this.table} (lastname, firstname, login, email, password, img) values (?,?,?,?,?,?)`,
      [
        utilisateurs.lastname,
        utilisateurs.firstname,
        utilisateurs.login,
        utilisateurs.email,
        utilisateurs.password,
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
      `select utilisateurs.id, lastname, firstname, login, email, img, inscription_date, auteurs.utilisateurs_id from ${this.table}
left join auteurs ON utilisateurs.id=auteurs.utilisateurs_id
where email = ?`,
      [email]
    )
  }

  usersWhoAreFollowers(auteurId) {
    return this.database.query(
      `select auteurs_favoris.utilisateurs_id, login, auteurs_favoris.auteurs_id, count(scenarios_favoris.scenarios_id) as nbFavoris, count(avis_scenario.id) as nbAvis from ${this.table}
      JOIN auteurs_favoris ON auteurs_favoris.utilisateurs_id=utilisateurs.id
      JOIN scenarios_favoris ON scenarios_favoris.utilisateurs_id=utilisateurs.id
      JOIN avis_scenario ON avis_scenario.utilisateurs_id=utilisateurs.id
      JOIN auteurs ON auteurs.utilisateurs_id=utilisateurs.id
      WHERE auteurs_favoris.auteurs_id= ?
      GROUP BY auteurs_favoris.utilisateurs_id, auteurs.id, login, auteurs_favoris.auteurs_id`,
      [auteurId]
    )
  }
}

module.exports = UtilisateursManager
