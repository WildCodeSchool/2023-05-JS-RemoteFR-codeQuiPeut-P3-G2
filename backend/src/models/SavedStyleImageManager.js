const AbstractManager = require("./AbstractManager")

class SavedStyleImageManager extends AbstractManager {
  constructor() {
    super({ table: "saved_style_image" })
  }

  insert(saveStIm) {
    return this.database.query(
      `INSERT INTO ${this.table} (utilisateurs_id, width, height, top, ssi_left, z_index, border_style, border_width, border_radius, border_color, box_shadow, opacity, padding) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        saveStIm.utilisateurs_id,
        saveStIm.width,
        saveStIm.height,
        saveStIm.top,
        saveStIm.ssi_left,
        saveStIm.z_index,
        saveStIm.border_style,
        saveStIm.border_width,
        saveStIm.border_radius,
        saveStIm.border_color,
        saveStIm.box_shadow,
        saveStIm.opacity,
        saveStIm.padding,
      ]
    )
  }

  update(saveStIm) {
    return this.database.query(
      `UPDATE ${this.table} SET utilisateurs_id = ?, width = ?, height = ?, top = ?, ssi_left = ?, z_index = ?, border_style = ?, border_width = ?, border_radius = ?, border_color = ?, box_shadow = ?, opacity = ?, padding = ? WHERE id = ?`,
      [
        saveStIm.utilisateurs_id,
        saveStIm.width,
        saveStIm.height,
        saveStIm.top,
        saveStIm.ssi_left,
        saveStIm.z_index,
        saveStIm.border_style,
        saveStIm.border_width,
        saveStIm.border_radius,
        saveStIm.border_color,
        saveStIm.box_shadow,
        saveStIm.opacity,
        saveStIm.padding,
        saveStIm.id,
      ]
    )
  }
}

module.exports = SavedStyleImageManager
