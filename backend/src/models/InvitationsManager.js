const AbstractManager = require("./AbstractManager")

class InvitationsManager extends AbstractManager {
  constructor() {
    super({ table: "invitations" })
  }

  insert(invitation) {
    return this.database.query(
      `insert into ${this.table} (auteurs_id, utilisateurs_id, scenarios_id, type, etat, messageProposition, afficher) values (?,?,?,?,?,?,?)`,
      [
        invitation.auteurs_id,
        invitation.utilisateurs_id,
        invitation.scenarios_id,
        invitation.type,
        invitation.etat,
        invitation.messageProposition,
        invitation.afficher,
      ]
    )
  }

  update(invitation, id) {
    return this.database.query(
      `UPDATE ${this.table} SET type = ?, etat = ?, reponse = ?, afficher = ? WHERE id = ?`,
      [
        invitation.type,
        invitation.etat,
        invitation.reponse,
        invitation.afficher,
        id,
      ]
    )
  }

  readMyPropositions(auteurID) {
    return this.database.query(
      `SELECT i.*, s.name AS scenario_name, a.name AS auteur_name, u.login AS pseudo_follower FROM ${this.table} AS i
    INNER JOIN scenarios AS s ON s.id = i.scenarios_id
    INNER JOIN auteurs AS a ON a.id = i.auteurs_id
    INNER JOIN utilisateurs AS u ON u.id = i.utilisateurs_id
    WHERE i.auteurs_id = ?`,
      [auteurID]
    )
  }

  readMyInvitations(utilisateurID) {
    return this.database.query(
      `SELECT i.*, s.name AS scenario_name, a.name AS auteur_name, u.login AS pseudo_follower FROM ${this.table}  AS i
    INNER JOIN scenarios AS s ON s.id = i.scenarios_id
    INNER JOIN auteurs AS a ON a.id = i.auteurs_id
    INNER JOIN utilisateurs AS u ON u.id = i.utilisateurs_id
    WHERE i.utilisateurs_id = ?`,
      [utilisateurID]
    )
  }

  // update(images, id) {
  //   return this.database.query(
  //     `update ${this.table} set pages_id = ?, data = ? WHERE id = ?`,
  //     [images.pages_id, images.text, id]
  //   )
  // }
}

module.exports = InvitationsManager
