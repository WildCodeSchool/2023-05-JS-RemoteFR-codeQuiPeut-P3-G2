export default function EditorPage(props) {
  const {
    textes,
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
        ></textarea>
      ))}

      {/* <button type='button' onClick={handleClickNewTextZone}>Nouvelle Zone de texte</button> */}
    </section>
  )
}
