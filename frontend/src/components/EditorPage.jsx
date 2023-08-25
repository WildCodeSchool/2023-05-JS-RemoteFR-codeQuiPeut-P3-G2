// import { useEffect } from "react"

export default function EditorPage(props) {
  const {
    textes,
    // setTextes,
    images,
    handleClickDropNewText,
    handleMouseMove,
    handleMouseUp,
    handleDragOver,
    handleDrop,
    handleChangeTexte,
    handleDragStart,
    handleClickElementTexte,
    handleMouseDown,
    editedCampagne,
    selectedPage,
    // setPageHistory,
  } = props

  // ----------------------------------------------------------------------------
  // ------FONCTIONS POUR ENREGISTRER AVANT SUPPRESSION DES TEXTES DANS DES ZONES DE TEXTES----
  // ---------------------------------------------------------------------------

  //   //Ne fonctionne pas !
  //   const handleKeyDownDelete = (event) => {
  //     console.log("event.inputType", event.key)
  //     if (event.key === 'Delete' || event.key === 'Backspace') {
  //         console.log("test delete");
  //         // on enregistre le state de textes dans history afin de pouvoir récupérer le contenu supprimé
  //         setPageHistory((prevState) => {
  //             const newTexteHistory = JSON.parse(JSON.stringify(textes)) // obligé sinon ça copie la référence de textes et du coup la suite ne fonctionne pas
  //             newTexteHistory.pop() // textes étant mis à jour avec un nouvel élément, on enlève cet élément
  //             const newState = [...prevState, { textes: newTexteHistory, images }]
  //             return newState
  //           })
  //       }
  //   }

  // ----FIN SECTION--------------------------------------------------

  return (
    <>
      {editedCampagne.name ? (
        <section
          className="section-page"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, "idColumn1")}
          onClick={handleClickDropNewText}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={selectedPage ? selectedPage.style : null}
        >
          {textes.map((item) => (
            <textarea
              key={item.id}
              style={item.style}
              onChange={(e) => handleChangeTexte(item.id, e.target.value)}
              value={item.text}
              placeholder={item.placeHolder}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              onClick={(e) => handleClickElementTexte(item.id, e)}
              onMouseDown={(e) => handleMouseDown(e, item.id)}
              //   onKeyDown={handleKeyDownDelete}
            ></textarea>
          ))}

          {images.map((item) => (
            <img
              src={item.img_src}
              alt="image"
              style={item.style}
              key={item.id}
            />
          ))}
        </section>
      ) : (
        <section className="section-page">
          <p>Veuillez ouvrir ou créer un nouveau projet pour commencer !</p>
        </section>
      )}
    </>
  )
}
