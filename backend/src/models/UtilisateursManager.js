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
        utilisateurs.hashedPassword,
        utilisateurs.img,
      ]
    )
  }

  update(utilisateurs, id) {
    return this.database.query(
      `update ${this.table} set lastname = ?, firstname = ?, login = ?, email = ?, img = ? WHERE id = ?`,
      [
        utilisateurs.lastname,
        utilisateurs.firstname,
        utilisateurs.login,
        utilisateurs.email,
        utilisateurs.img,
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
      `select id, lastname, firstname, login, email, password, img, inscription_date from  ${this.table} where email = ?`,
      [email]
    )
  }

  readUserByEmailNoPassword(email) {
    return this.database.query(
      `select id, lastname, firstname, login, email, img, inscription_date from  ${this.table} where email = ?`,
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
      `select utilisateurs.id, lastname, firstname, login, email, img, inscription_date, COALESCE(auteurs.id, NULL) AS auteurId, COALESCE(auteurs.id, NULL) AS auteurs_id , COALESCE(auteurs.name, NULL) AS auteurs_name from ${this.table}
left join auteurs ON utilisateurs.id=auteurs.utilisateurs_id
where email = ?`,
      [email]
    )
  }

  findAllWithoutPassword() {
    return this.database.query(
      `SELECT id, lastname, firstname, login, email, img, inscription_date FROM  ${this.table}`
    )
  }

  // findWithoutPassword(id) {
  //   return this.database.query(
  //     `SELECT id, lastname, firstname, login, email, img, inscription_date FROM  ${this.table} WHERE  id = ?`,
  //     // `SELECT * FROM  ${this.table} WHERE  id = ?`,   //  Pour test !!!!!!!!!!!!!
  //     [id]
  //   )
  // }

  findWithoutPassword(id) {
    return this.database.query(
      `SELECT utilisateurs.id, lastname, firstname, login, email, img, inscription_date, COALESCE(auteurs.id, NULL) AS auteurId, COALESCE(auteurs.id, NULL) AS auteurs_id , COALESCE(auteurs.name, NULL) AS auteurs_name 
      FROM ${this.table} 
      LEFT JOIN auteurs ON auteurs.utilisateurs_id = utilisateurs.id 
      WHERE utilisateurs.id = ?`,
      [id]
    )
  }

  usersWhoAreFollowers(auteurId) {
    return this.database.query(
      `select auteurs_favoris.utilisateurs_id as utilisateurId, login, auteurs_favoris.auteurs_id as auteurId, count(scenarios_favoris.scenarios_id) as nbFavoris, count(avis_scenario.id) as nbAvis from ${this.table}
      LEFT JOIN auteurs_favoris ON auteurs_favoris.utilisateurs_id=utilisateurs.id
      LEFT JOIN scenarios_favoris ON scenarios_favoris.utilisateurs_id=utilisateurs.id
      LEFT JOIN avis_scenario ON avis_scenario.utilisateurs_id=utilisateurs.id
      LEFT JOIN auteurs ON auteurs.utilisateurs_id=utilisateurs.id
      WHERE auteurs_favoris.auteurs_id= ?
      GROUP BY auteurs_favoris.utilisateurs_id, auteurs.id, login, auteurs_favoris.auteurs_id`,
      [auteurId]
    )
  }
}

module.exports = UtilisateursManager
