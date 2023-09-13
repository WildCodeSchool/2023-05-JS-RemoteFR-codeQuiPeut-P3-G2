import Navbar from "../components/Navbar"
import plusDansRond from "../assets/images/plusDansRond.png"

export default function Forum() {
  const handleClickAddNewTopic = () => {}

  return (
    <>
      <Navbar />
      <main className="main-forum">
        <section className="forum-bandeauGauche">
          <div className="div-newTopic">
            <h1>NEW TOPIC</h1>
            <img
              src={plusDansRond}
              alt="Button add new Topic"
              onClick={handleClickAddNewTopic}
            />
          </div>

          <div className="div-categories">
            <h1>CATEGORIES</h1>
          </div>
        </section>

        <section className="forum-bandeauDroite"></section>
      </main>
    </>
  )
}
