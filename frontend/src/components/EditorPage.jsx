import { useEffect } from "react"

export default function EditorPage(props) {
  const {
    textes,
    setTextes,
    handleClickDropNewText,
    handleMouseMove,
    handleMouseUp,
    handleDragOver,
    handleDrop,
    handleChangeTexte,
    handleDragStart,
    handleClickElement,
    handleMouseDown,
  } = props

  // ----------------------------------------------------------------------------
  // ------FONCTIONS POUR SUPPRESSION DES ZONES DE TEXTES----
  // ---------------------------------------------------------------------------

  useEffect(() => {
    // suppression avec la combinaison de touche ctrl + suppr
    // car la touche suppr seule doit pouvoir servir à supprimer du texte dans ma textarea
    // A MODIFIER QUAND IL Y AURA DES IMAGES

    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "Delete") {
        setTextes((prevState) => prevState.filter((text) => !text.selected))
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])
  // ----FIN SECTION--------------------------------------------------

  return (
    <section
      className="section-page"
      onDragOver={handleDragOver}
      onDrop={(event) => handleDrop(event, "idColumn1")}
      onClick={handleClickDropNewText}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
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
          onClick={(e) => handleClickElement(item.id)}
          onMouseDown={(e) => handleMouseDown(e, item.id)}
          //   onContextMenu={(e)=>handleContextMenuTextarea(e,item.id)}
          //   onMouseLeave={() =>handleLeaveContextMenuTextarea(item.id)}
        ></textarea>
      ))}

      {/* <button type='button' onClick={handleClickNewTextZone}>Nouvelle Zone de texte</button> */}
    </section>
  )
}
