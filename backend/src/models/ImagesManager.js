const AbstractManager = require("./AbstractManager")

class ImagesManager extends AbstractManager {
  constructor() {
    super({ table: "page_images" })
  }

  insert(images) {
    return this.database.query(
      `insert into ${this.table} (pages_id, data) values (?,?)`,
      [images.pages_id, images.text]
    )
  }

  update(images, id) {
    return this.database.query(
      `update ${this.table} set pages_id = ?, data = ? WHERE id = ?`,
      [images.pages_id, images.text, id]
    )
  }

  async createNew(imageUrl, pageID) {
    // on insere dans la table page_images une nouvelle image
    const [results] = await this.database.query(
      `insert into ${this.table} (pages_id, img_src) values (?,?)`,
      [pageID, imageUrl]
    )
    const newImageID = results.insertId
    // on insère dans la table text_style un nouveau style avec page_images_id = newText.id
    const [styleResult] = await this.database.query(
      `INSERT INTO image_style (page_images_id, width, height, top, ssi_left, \`z-index\`, border_style, border_width, border_radius, border_color, box_shadow, opacity, padding) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        newImageID,
        "40%",
        "auto",
        "30%",
        "30%",
        1,
        "none",
        "1px",
        "0px",
        "rgba(200,200,200,1)",
        "0px 0px 0px 0px rgba(0,0,0,0)",
        "1",
        "0px",
      ]
    )

    const newStyleID = styleResult.insertId
    return [newImageID, newStyleID]
  }

  async createCopy(copy, pageID) {
    // on insere dans la table page_images une nouvelle image
    const [results] = await this.database.query(
      `insert into ${this.table} (pages_id, img_src) values (?,?)`,
      [pageID, copy.img_src]
    )
    const newImageID = results.insertId
    // on insère dans la table text_style un nouveau style avec page_images_id = newText.id
    const [styleResult] = await this.database.query(
      `INSERT INTO image_style (page_images_id, width, height, top, ssi_left, \`z-index\`, border_style, border_width, border_radius, border_color, box_shadow, opacity, padding) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        newImageID,
        copy.style.width,
        copy.style.height,
        "40%",
        "5%",
        3,
        copy.style.borderStyle,
        copy.style.borderWidth,
        copy.style.borderRadius,
        copy.style.borderColor,
        copy.style.boxShadow,
        copy.style.opacity,
        copy.style.padding,
      ]
    )

    const newStyleID = styleResult.insertId
    return [newImageID, newStyleID]
  }

  verifyNumberOfSameImageInTableImages(img) {
    return this.database.query(
      `SELECT COUNT(*) as countImage FROM ${this.table} WHERE img_src = ?`,
      [img]
    )
  }

  //   async createNewSpecific(properties, id) {
  //     // on insere dans la table page_images un nouveau texte
  //     const [results] = await this.database.query(
  //       `insert into ${this.table} (pages_id, data) values (?,?)`,
  //       [id, ""]
  //     )
  //     const newTextId = results.insertId
  //     // on insère dans la table text_style un nouveau style avec page_images_id = newText.id
  //     const [styleResult] = await this.database.query(
  //       `INSERT INTO text_style (page_images_id, width, height, top, sst_left, z_index, border_style, border_color, border_width, border_radius, box_shadow, background_color, font_size, font_style, font_weight, font_family, color, padding, back_drop_filter, text_decoration, text_align) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  //       [
  //         newTextId,
  //         properties.width,
  //         properties.height,
  //         properties.top,
  //         properties.left,
  //         0,
  //         "none",
  //         "rgba(200,200,200,1)",
  //         "1px",
  //         "0px",
  //         "0px 0px 0px 0px rgba(0,0,0,0)",
  //         "rgba(255,255,255,1)",
  //         properties.fontSize,
  //         "normal",
  //         properties.fontWeight,
  //         "cursive",
  //         "rgba(0,0,0,1)",
  //         "4px",
  //         "blur(0px)",
  //         "none",
  //         properties.textAlign,
  //       ]
  //     )

  //     const newStyleID = styleResult.insertId
  //     return [newTextId, newStyleID]
  //   }

  //   async recreatePrevious(proprietes, id) {
  //     // on insere dans la table page_images un nouveau texte
  //     const [results] = await this.database.query(
  //       `insert into ${this.table} (pages_id, data) values (?,?)`,
  //       [id, proprietes.data]
  //     )
  //     const newTextId = results.insertId
  //     // on insère dans la table text_style un nouveau style avec page_images_id = newText.id
  //     const [styleResult] = await this.database.query(
  //       `INSERT INTO text_style (page_images_id, width, height, top, sst_left, z_index, border_style, border_color, border_width, border_radius, box_shadow, background_color, font_size, font_style, font_weight, font_family, color, padding, back_drop_filter, text_decoration, text_align) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  //       [
  //         newTextId,
  //         proprietes.width,
  //         proprietes.height,
  //         proprietes.top,
  //         proprietes.sst_left,
  //         proprietes.z_index,
  //         proprietes.border_style,
  //         proprietes.border_color,
  //         proprietes.border_width,
  //         proprietes.border_radius,
  //         proprietes.box_shadow,
  //         proprietes.background_color,
  //         proprietes.font_size,
  //         proprietes.font_style,
  //         proprietes.font_weight,
  //         proprietes.font_family,
  //         proprietes.color,
  //         proprietes.padding,
  //         proprietes.back_drop_filter,
  //         proprietes.text_decoration,
  //         proprietes.text_align,
  //       ]
  //     )

  //     const newStyleID = styleResult.insertId
  //     return [newTextId, newStyleID]
  //   }

  async getLast() {
    const [results] = await this.database.query(
      `SELECT MAX(id) AS lastID FROM ${this.table}`
    )
    // const lastID = results[0].lastID - 1
    const lastID = results[0].lastID

    // console.log("lastID", lastID);

    const [rows] = await this.database.query(
      `select pi.id,s.id AS style_id ,pi.pages_id ,pi.img_src ,s.width,s.height,s.top,s.ssi_left ,s.\`z-index\` AS z_index,s.border_style,s.border_color,s.border_width,s.border_radius,s.box_shadow,s.opacity,s.padding FROM page_images AS pi INNER JOIN image_style as s ON s.page_images_id = pi.id WHERE pi.id = ?`,
      [lastID]
    )

    return [rows]
  }
}

module.exports = ImagesManager
