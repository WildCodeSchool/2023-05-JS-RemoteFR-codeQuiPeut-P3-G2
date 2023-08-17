const AbstractManager = require("./AbstractManager")

class TextesManager extends AbstractManager {
  constructor() {
    super({ table: "page_textes" })
  }

  insert(textes) {
    return this.database.query(
      `insert into ${this.table} (pages_id, data) values (?,?)`,
      [textes.pages_id, textes.text]
    )
  }

  update(textes, id) {
    return this.database.query(
      `update ${this.table} set pages_id = ?, data = ? WHERE id = ?`,
      [textes.pages_id, textes.text, id]
    )
  }

  async createNew(position, id) {
    // on insere dans la table page_textes un nouveau texte
    const [results] = await this.database.query(
      `insert into ${this.table} (pages_id, data) values (?,?)`,
      [id, ""]
    )
    const newTextId = results.insertId
    // on insère dans la table text_style un nouveau style avec page_textes_id = newText.id
    const [styleResult] = await this.database.query(
      `INSERT INTO text_style (page_textes_id, width, height, top, sst_left, z_index, border_style, border_color, border_width, border_radius, box_shadow, background_color, font_size, font_style, font_weight, font_family, color, padding, back_drop_filter, text_decoration, text_align) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        newTextId,
        "50%",
        "5%",
        position.top,
        position.left,
        0,
        "none",
        "rgba(200,200,200,1)",
        "1px",
        "0px",
        "0px 0px 0px 0px rgba(0,0,0,0)",
        "rgba(250,250,250,1)",
        "1.25rem",
        "normal",
        400,
        "cursive",
        "rgba(0,0,0,1)",
        "4px",
        "blur(0px)",
        "none",
        "justify",
      ]
    )

    const newStyleID = styleResult.insertId
    return [newTextId, newStyleID]
  }

  async createNewSpecific(properties, id) {
    // on insere dans la table page_textes un nouveau texte
    const [results] = await this.database.query(
      `insert into ${this.table} (pages_id, data) values (?,?)`,
      [id, ""]
    )
    const newTextId = results.insertId
    // on insère dans la table text_style un nouveau style avec page_textes_id = newText.id
    const [styleResult] = await this.database.query(
      `INSERT INTO text_style (page_textes_id, width, height, top, sst_left, z_index, border_style, border_color, border_width, border_radius, box_shadow, background_color, font_size, font_style, font_weight, font_family, color, padding, back_drop_filter, text_decoration, text_align) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        newTextId,
        properties.width,
        properties.height,
        properties.top,
        properties.left,
        0,
        "none",
        "rgba(200,200,200,1)",
        "1px",
        "0px",
        "0px 0px 0px 0px rgba(0,0,0,0)",
        "rgba(255,255,255,1)",
        properties.fontSize,
        "normal",
        properties.fontWeight,
        "cursive",
        "rgba(0,0,0,1)",
        "4px",
        "blur(0px)",
        "none",
        properties.textAlign,
      ]
    )

    const newStyleID = styleResult.insertId
    return [newTextId, newStyleID]
  }

  async recreatePrevious(proprietes, id) {
    // on insere dans la table page_textes un nouveau texte
    const [results] = await this.database.query(
      `insert into ${this.table} (pages_id, data) values (?,?)`,
      [id, proprietes.data]
    )
    const newTextId = results.insertId
    // on insère dans la table text_style un nouveau style avec page_textes_id = newText.id
    const [styleResult] = await this.database.query(
      `INSERT INTO text_style (page_textes_id, width, height, top, sst_left, z_index, border_style, border_color, border_width, border_radius, box_shadow, background_color, font_size, font_style, font_weight, font_family, color, padding, back_drop_filter, text_decoration, text_align) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        newTextId,
        proprietes.width,
        proprietes.height,
        proprietes.top,
        proprietes.sst_left,
        proprietes.z_index,
        proprietes.border_style,
        proprietes.border_color,
        proprietes.border_width,
        proprietes.border_radius,
        proprietes.box_shadow,
        proprietes.background_color,
        proprietes.font_size,
        proprietes.font_style,
        proprietes.font_weight,
        proprietes.font_family,
        proprietes.color,
        proprietes.padding,
        proprietes.back_drop_filter,
        proprietes.text_decoration,
        proprietes.text_align,
      ]
    )

    const newStyleID = styleResult.insertId
    return [newTextId, newStyleID]
  }

  async getLast() {
    const [results] = await this.database.query(
      `SELECT MAX(id) AS lastID FROM ${this.table}`
    )
    // const lastID = results[0].lastID - 1
    const lastID = results[0].lastID

    // console.log("lastID", lastID);

    const [rows] = await this.database.query(
      `select pt.id,s.id AS style_id ,pt.pages_id ,pt.data AS text ,s.width,s.height,s.top,s.sst_left AS \`left\`,s.z_index AS zIndex,s.border_style AS borderStyle,s.border_color AS borderColor,s.border_width AS borderWidth,s.border_radius AS borderRadius,s.box_shadow AS boxShadow,s.background_color AS backgroundColor,s.font_size AS fontSize,s.font_style AS fontStyle,s.font_weight AS fontWeight,s.font_family AS fontFamily,s.color,s.padding,s.back_drop_filter AS backdropFilter,s.back_drop_filter AS WebkitBackdropFilter,s.text_decoration AS textDecoration,s.text_align AS textAlign FROM page_textes AS pt INNER JOIN text_style as s ON s.page_textes_id = pt.id WHERE pt.id = ?`,
      [lastID]
    )

    return [rows]
  }
}

module.exports = TextesManager
