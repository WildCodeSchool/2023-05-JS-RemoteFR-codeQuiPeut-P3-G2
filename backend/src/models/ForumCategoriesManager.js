const AbstractManager = require("./AbstractManager")
class ForumCategoriesManager extends AbstractManager {
  constructor() {
    super({ table: "sujet_forum_categories" })
  }
}
module.exports = ForumCategoriesManager
