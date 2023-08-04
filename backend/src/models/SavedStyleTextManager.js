const AbstractManager = require("./AbstractManager")

class SavedStyleTextManager extends AbstractManager {
  constructor() {
    super({ table: "saved_style_text" })
  }

  insert(saveStTx) {
    return this.database.query(
      `INSERT INTO ${this.table} (utilisateurs_id, width, height, top, sst_left, z_index, border_style, border_color, border_width, border_radius, box_shadow, background_color, font_size, font_style, font_weight, font_family, color, padding, backdrop_filter, text_decoration, text_align) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        saveStTx.utilisateurs_id,
        saveStTx.width,
        saveStTx.height,
        saveStTx.top,
        saveStTx.sst_left,
        saveStTx.z_index,
        saveStTx.border_style,
        saveStTx.border_color,
        saveStTx.border_width,
        saveStTx.border_radius,
        saveStTx.box_shadow,
        saveStTx.background_color,
        saveStTx.font_size,
        saveStTx.font_style,
        saveStTx.font_weight,
        saveStTx.font_family,
        saveStTx.color,
        saveStTx.padding,
        saveStTx.backdrop_filter,
        saveStTx.text_decoration,
        saveStTx.text_align,
      ]
    )
  }

  update(saveStTx) {
    return this.database.query(
      `UPDATE ${this.table} SET utilisateurs_id = ?, width = ?, height = ?, top = ?, sst_left = ?, z_index = ?, border_style = ?, border_color = ?, border_width = ?, border_radius = ?, box_shadow = ?, background_color = ?, font_size = ?, font_style = ?, font_weight = ?, font_family = ?, color = ?, padding = ?, backdrop_filter = ?, text_decoration = ?, text_align = ? WHERE id = ?`,
      [
        saveStTx.utilisateurs_id,
        saveStTx.width,
        saveStTx.height,
        saveStTx.top,
        saveStTx.sst_left,
        saveStTx.z_index,
        saveStTx.border_style,
        saveStTx.border_color,
        saveStTx.border_width,
        saveStTx.border_radius,
        saveStTx.box_shadow,
        saveStTx.background_color,
        saveStTx.font_size,
        saveStTx.font_style,
        saveStTx.font_weight,
        saveStTx.font_family,
        saveStTx.color,
        saveStTx.padding,
        saveStTx.backdrop_filter,
        saveStTx.text_decoration,
        saveStTx.text_align,
        saveStTx.id,
      ]
    )
  }
}

module.exports = SavedStyleTextManager
