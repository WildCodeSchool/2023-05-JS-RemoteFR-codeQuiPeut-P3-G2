const AbstractManager = require("./AbstractManager")

class PagesManager extends AbstractManager {
  constructor() {
    super({ table: "pages" })
  }

  insert(pages) {
    return this.database.query(
      `INSERT INTO ${this.table} (scenarios_id, page_types_id, titre, number) VALUES (?, ?, ?, ?)`,
      [pages.scenarios_id, pages.page_types_id, pages.titre, pages.number]
    )
  }

  update(pages, id) {
    return this.database.query(
      `update ${this.table} set scenarios_id = ?, page_types_id = ?, titre = ?, number = ?  WHERE id = ?`,
      [pages.scenarios_id, pages.page_types_id, pages.titre, pages.number, id]
    )
  }

  findPageTexts(id) {
    return this.database.query(
      `select pt.id, pt.pages_id, pt.data AS text , s.width, s.height, s.top, s.sst_left AS \`left\`, s.z_index AS zIndex, s.border_style AS borderStyle, s.border_color AS borderColor, s.border_width AS borderWidth, s.border_radius AS borderRadius, s.box_shadow AS boxShadow, s.background_color AS backgroundColor, s.font_size AS fontSize, s.font_style AS fontStyle, s.font_weight AS fontWeight, s.font_family AS fontFamily, s.color, s.padding, s.back_drop_filter AS backdropFilter, s.back_drop_filter AS WebkitBackdropFilter, s.text_decoration AS textDecoration, s.text_align AS textAlign from  ${this.table} INNER JOIN page_textes AS pt ON pt.pages_id = pages.id INNER JOIN text_style as s ON s.page_textes_id = pt.id  where pages.id = ?`,
      [id]
    )
  }
}

module.exports = PagesManager
