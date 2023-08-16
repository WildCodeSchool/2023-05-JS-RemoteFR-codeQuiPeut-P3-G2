const AbstractManager = require("./AbstractManager")

class StyleTextManager extends AbstractManager {
  constructor() {
    super({ table: "text_style" })
  }

  insert(styleText) {
    return this.database.query(
      `INSERT INTO ${this.table} (page_textes_id, width, height, top, sst_left, z_index, border_style, border_color, border_width, border_radius, box_shadow, background_color, font_size, font_style, font_weight, font_family, color, padding, back_drop_filter, text_decoration, text_align) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        styleText.page_textes_id,
        styleText.width,
        styleText.height,
        styleText.top,
        styleText.sst_left,
        styleText.z_index,
        styleText.border_style,
        styleText.border_color,
        styleText.border_width,
        styleText.border_radius,
        styleText.box_shadow,
        styleText.background_color,
        styleText.font_size,
        styleText.font_style,
        styleText.font_weight,
        styleText.font_family,
        styleText.color,
        styleText.padding,
        styleText.back_drop_filter,
        styleText.text_decoration,
        styleText.text_align,
      ]
    )
  }

  update(styleText, id) {
    return this.database.query(
      `UPDATE ${this.table} SET page_textes_id = ?, width = ?, height = ?, top = ?, sst_left = ?, z_index = ?, border_style = ?, border_color = ?, border_width = ?, border_radius = ?, box_shadow = ?, background_color = ?, font_size = ?, font_style = ?, font_weight = ?, font_family = ?, color = ?, padding = ?, back_drop_filter = ?, text_decoration = ?, text_align = ? WHERE id = ?`,
      [
        styleText.page_textes_id,
        styleText.width,
        styleText.height,
        styleText.top,
        styleText.sst_left,
        styleText.z_index,
        styleText.border_style,
        styleText.border_color,
        styleText.border_width,
        styleText.border_radius,
        styleText.box_shadow,
        styleText.background_color,
        styleText.font_size,
        styleText.font_style,
        styleText.font_weight,
        styleText.font_family,
        styleText.color,
        styleText.padding,
        styleText.back_drop_filter,
        styleText.text_decoration,
        styleText.text_align,
        id,
      ]
    )
  }

  async editStyleFromTexteID(styleText, textID) {
    // recherche du style correspondant à l'ID du texte
    const [results] = await this.database.query(
      `SELECT ${this.table}.id FROM ${this.table} INNER JOIN page_textes ON ${this.table}.page_textes_id = ?`,
      [textID]
    )

    const styleID = results[0].id

    return this.database.query(
      `UPDATE ${this.table} SET page_textes_id = ?, width = ?, height = ?, top = ?, sst_left = ?, z_index = ?, border_style = ?, border_color = ?, border_width = ?, border_radius = ?, box_shadow = ?, background_color = ?, font_size = ?, font_style = ?, font_weight = ?, font_family = ?, color = ?, padding = ?, back_drop_filter = ?, text_decoration = ?, text_align = ? WHERE id = ?`,
      [
        textID,
        styleText.width,
        styleText.height,
        styleText.top,
        styleText.sst_left,
        styleText.z_index,
        styleText.border_style,
        styleText.border_color,
        styleText.border_width,
        styleText.border_radius,
        styleText.box_shadow,
        styleText.background_color,
        styleText.font_size,
        styleText.font_style,
        styleText.font_weight,
        styleText.font_family,
        styleText.color,
        styleText.padding,
        styleText.back_drop_filter,
        styleText.text_decoration,
        styleText.text_align,
        styleID,
      ]
    )
  }

  async destroyFromTextID(textID) {
    // recherche du style correspondant à l'ID du texte
    const [results] = await this.database.query(
      `SELECT ${this.table}.id FROM ${this.table} INNER JOIN page_textes ON ${this.table}.page_textes_id = ?`,
      [textID]
    )

    const styleID = results[0].id

    return this.database.query(
      `DELETE from ${this.table} where id = ?`,
      [styleID],
      [styleID]
    )
  }
}

module.exports = StyleTextManager
