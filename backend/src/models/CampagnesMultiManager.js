const AbstractManager = require("./AbstractManager")

class CampagnesMultiManager extends AbstractManager {
  constructor() {
    super({ table: "campagnes" })
  }

  findCampagne() {
    return this.database.query(
      `select campagnes.name, campagnes.id as campagneId, scenarios.type, count(scenarios.id) as nbScenarios FROM campagnes INNER JOIN scenarios ON scenarios.campagnes_id = campagnes.id 
    group by campagnes.name, campagnes.id, scenarios.type
   having nbScenarios > 1  `
    )
  }
}
module.exports = CampagnesMultiManager
