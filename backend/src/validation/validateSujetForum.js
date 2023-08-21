const Joi = require("Joi")

const validateSujetForumSchema = Joi.object({
  sujet: Joi.string().max(255).required(),
  open_date: Joi.string().max(255).required(),
})

const validateSujetForum = (req, res, next) => {
  const { sujet, open_date } = req.body

  const { error } = validateSujetForumSchema.validate(
    { sujet, open_date },
    { abortEarly: false }
  )

  if (error) {
    res.status(422).json({ validationErrors: error.details })
  } else {
    next()
  }
}

module.exports = {
  validateSujetForum,
}
