//
//
//= ========================================================================================
// ============================> inutilisé pour le moment !!!! <============================
//= ========================================================================================
//
//
//
// import axios from "axios"

// // axios
// //       .put(`http://localhost:4242/scenarcomm/${id}`, {
// //         utilisateurID: user.id,
// //         scenarioID: scenario.id,
// //         textcomment: `${editComment} (modifié !)`,
// //       })
// //       .then(() =>
// //         axios
// //           .get(`http://localhost:4242/scenario/${scenario.id}/scenarcomm`)
// //           .then(({ data }) => {
// //             const newAvis = data.map((avi) => ({ ...avi, edit: false }))
// //             setAvis(newAvis)
// //           })
// //       )
// //       .catch((err) => console.error(err))
// //   }

// const checkIsNotDuplication = (req, res, next) => {
//   const error = []

//   axios
//     .get("http://localhost:4242/utilisateurs")
//     .then(({ data }) => {
//       if (req.body.email === data.email) {
//         error.push("Mail déjà existant")
//       }

//       if (req.body.login === data.login) {
//         error.push("Login déjà existant")
//       }
//       res.send({error})
//     })
//     .catch((err) => console.error(err))
// }

// const { firstname, lastname, email, city, language } = req.body
// // const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
// // const poulet = [];

// // const verifyEmail = (req, res, next) => {
// //   models.utilisateurs
// //     .readUserByEmail(req.body.email)
// //     .then(([rows]) => {
// //       if (rows[0] == null) {
// //         next()
// //       } else {
// //         res.status(422).json({ errorMessage: "Mail déjà existant" })
// //       }
// //     })
// //     .catch((err) => {
// //       console.error(err)
// //       res.status(500).json({ errorMessage: "Mail déjà existant" }) // inutile a cet endroit
// //     })
// // }

// // const verifyLogin = (req, res, next) => {
// //   models.utilisateurs
// //     .readUserByLogin(req.body.login)
// //     .then(([rows]) => {
// //       if (rows[0] == null) {
// //         next()
// //       } else {
// //         // res.send(rows[0])
// //         res.status(422).json({ errorMessage: "Login déjà existant" })
// //       }
// //     })
// //     .catch((err) => {
// //       console.error(err)
// //       res.status(500).json({ errorMessage: "Login déjà existant" }) // inutile a cet endroit
// //     })
// // }
