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
    handleDragStartImage,
    handleClickElementTexte,
    handleClickElementImage,
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
          id="section-page"
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
              // style={item.style}
              style={{
                ...item.style,
                filter: item.selected ? "drop-shadow(0 0 1px black)" : "none",
              }}
              draggable
              // className={item.selected === true ? "imgPageSelected" : "imgPageNoSelected"}
              onClick={(e) => handleClickElementImage(item.id, e)}
              onDragStart={(e) => handleDragStartImage(e, item.id)}
              key={item.id}
            />
          ))}
          {/* {images.map((item) => (
            <div
              className={item.selected === true ? "imgPageSelected" : "imgPageNoSelected"}
              style={{position:"absolute", width:item.style.width, height:item.style.height, top: item.style.top , left: item.style.left , zIndex:item.style.zIndex}}
              onDragStart={(e) => handleDragStartImage(e, item.id)}
              draggable

              key={item.id}
            >
              <img
                src={item.img_src}
                alt="image"
                style={{width:"100%", height:"100%" , borderStyle: item.style.borderStyle, borderRadius: item.style.borderRadius, borderColor: item.style.borderColor, boxShadow: item.style.boxShadow, opacity: item.style.opacity , padding: item.style.padding, boxSizing:"border-box"}}
                onClick={(e) => handleClickElementImage(item.id, e)}
              />
            </div>
          ))} */}
        </section>
      ) : (
        <section className="section-page">
          <p>Veuillez ouvrir ou créer un nouveau projet pour commencer !</p>
        </section>
      )}
    </>
  )
}
