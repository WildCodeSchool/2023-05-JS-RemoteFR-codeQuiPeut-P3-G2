const AbstractManager = require("./AbstractManager")

class SavedStyleTextManager extends AbstractManager {
  constructor() {
    super({ table: "saved_style_text" })
  }

  insert(saveStTx) {
    return this.database.query(
      `INSERT INTO ${this.table} (utilisateurs_id, styleName, z_index, border_style, border_color, border_width, border_radius, box_shadow, background_color, font_size, font_style, font_weight, font_family, color, padding, backdrop_filter, text_decoration, text_align) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        saveStTx.utilisateurs_id,
        saveStTx.textStyleName,
        saveStTx.zIndex,
        saveStTx.borderStyle,
        saveStTx.borderColor,
        saveStTx.borderWidth,
        saveStTx.borderRadius,
        saveStTx.boxShadow,
        saveStTx.backgroundColor,
        saveStTx.fontSize,
        saveStTx.fontStyle,
        saveStTx.fontWeight,
        saveStTx.fontFamily,
        saveStTx.color,
        saveStTx.padding,
        saveStTx.backdropFilter,
        saveStTx.textDecoration,
        saveStTx.textAlign,
      ]
    )
  }

  update(saveStTx) {
    return this.database.query(
      `UPDATE ${this.table} SET utilisateurs_id = ?, styleName = ?, z_index = ?, border_style = ?, border_color = ?, border_width = ?, border_radius = ?, box_shadow = ?, background_color = ?, font_size = ?, font_style = ?, font_weight = ?, font_family = ?, color = ?, padding = ?, backdrop_filter = ?, text_decoration = ?, text_align = ? WHERE id = ?`,
      [
        saveStTx.utilisateurs_id,
        saveStTx.textStyleName,
        saveStTx.zIndex,
        saveStTx.borderStyle,
        saveStTx.borderColor,
        saveStTx.borderWidth,
        saveStTx.borderRadius,
        saveStTx.boxShadow,
        saveStTx.backgroundColor,
        saveStTx.fontSize,
        saveStTx.fontStyle,
        saveStTx.fontWeight,
        saveStTx.fontFamily,
        saveStTx.color,
        saveStTx.padding,
        saveStTx.backdropFilter,
        saveStTx.textDecoration,
        saveStTx.textAlign,
        saveStTx.id,
      ]
    )
  }

  readFromUtilisateurID(userID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE utilisateurs_id = ?`,
      [userID]
    )
  }
}

module.exports = SavedStyleTextManager
