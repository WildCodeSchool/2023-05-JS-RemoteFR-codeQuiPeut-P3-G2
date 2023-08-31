const AbstractManager = require("./AbstractManager")

class StyleImageManager extends AbstractManager {
  constructor() {
    super({ table: "image_style" })
  }

  async editStyleFromImageID(styleImage, imagesID) {
    // recherche du style correspondant à l'ID du imagese
    const [results] = await this.database.query(
      `SELECT ${this.table}.id FROM ${this.table} INNER JOIN page_images ON ${this.table}.page_images_id = ?`,
      [imagesID]
    )

    const styleID = results[0].id

    return this.database.query(
      `UPDATE ${this.table} SET page_images_id = ?, width = ?, height = ?, top = ?, ssi_left = ?, \`z-index\` = ?, border_style = ?, border_color = ?, border_width = ?, border_radius = ?, box_shadow = ?, opacity = ?, padding = ? WHERE id = ?`,
      [
        imagesID,
        styleImage.width,
        styleImage.height,
        styleImage.top,
        styleImage.ssi_left,
        styleImage.zIndex,
        styleImage.border_style,
        styleImage.border_color,
        styleImage.border_width,
        styleImage.border_radius,
        styleImage.box_shadow,
        styleImage.opacity,
        styleImage.padding,
        styleID,
      ]
    )
  }

  async destroyFromImageID(imagesID) {
    // recherche du style correspondant à l'ID du imagese
    const [results] = await this.database.query(
      `SELECT ${this.table}.id FROM ${this.table} INNER JOIN page_images ON ${this.table}.page_images_id = ?`,
      [imagesID]
    )

    const styleID = results[0].id

    return this.database.query(`DELETE from ${this.table} where id = ?`, [
      styleID,
    ])
  }
}

module.exports = StyleImageManager
