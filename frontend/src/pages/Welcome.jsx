import "slick-carousel/slick/slick.scss"
import "slick-carousel/slick/slick-theme.scss"
import "./Welcome.scss"
import TitreAccueil from "../assets/TitreAccueil.png"
import LivreAccueil from "../assets/LivreAccueil.png"
import mokeUp from "../assets/Laptop.png"
import Navbar from "../components/Navbar"
import Slider from "react-slick"
import axios from "axios"
import { useState, useEffect, useContext } from "react"
import CardCampaign from "../components/CardCampaign"
import MyContext from "../components/MyContext"
import de from "../assets/images/de.svg"

const Welcome = () => {
  const [campagnes, setCampagnes] = useState([])
  const [originalCampagnes, setOrginalCampagnes] = useState([])
  const { user, setUser, setFollowedAutors } = useContext(MyContext)

  useEffect(() => {
    axios
      .get("http://localhost:4242/detailedCampagnes")
      .then(({ data }) => {
        setCampagnes(data)
        setOrginalCampagnes(data)
      })
      .catch((err) => console.error(err))
  }, [])

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <>
      <main className="GlobalWelcContain" alt="Accueil">
        <Navbar />
        <header className="TitleContain">
          <div className="images_header">
            <img className="title" src={TitreAccueil} />
            <h1 className="SubTitCon">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
              aliquid perferendis eveniet. Consectetur, quis voluptatibus!
              Aspernatur repellat accusantium beatae! Repellendus atque nobis
              quod amet voluptatem ex cum asperiores! Enim, reprehenderit!
            </h1>
          </div>
          <img className="BookFall" src={LivreAccueil} />
        </header>

        <div className="containerImg">
          <img src={de} alt="dé" />
        </div>
        <div className="find_create ">
          <div className="FindScrip one">
            <h2>FIND YOUR PERFECT SCRIPT</h2>
            <div className="conteneurSVG">
              <svg>
                <line x1="0" x2="200" y1="0" y2="0" />
              </svg>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laboriosam eius animi, sunt est harum delectus corporis repellat
              perspiciatis quas, minus voluptate minima rerum quos cupiditate
              maiores. Illo ducimus accusamus aliquid!
            </p>
            <button className="Explo" type="button">
              Explore
            </button>
          </div>
          <div className="CreateScrip">
            <h2>CREATE YOUR PERFECT SCRIPT</h2>
            <div className="conteneurSVG">
              <svg>
                <line x1="0" x2="200" y1="0" y2="0" />
              </svg>
            </div>
            <p className="TextContain">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur eum ullam repellat? Qui, repellendus nihil sit
              commodi enim facilis natus, consequatur possimus atque sed
              voluptates nam quam iure, cumque quo!
            </p>
            <button className="Create" type="button">
              Create
            </button>
          </div>
        </div>

        <div className="mokeUp">
          <h3>SIMPLE INTERFACE</h3>
          <div className="AnimLaptop">
            <img src={mokeUp} alt="" />
          </div>
          <p className="textMock">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur eum ullam repellat? Qui, repellendus nihil sit commodi
            enim facilis natus, consequatur possimus atque sed voluptates nam
            quam iure, cumque quo!
          </p>
        </div>
        <div className="sliders">
          <h2 className="popularScript">POPULAR SCRIPT</h2>
          <Slider {...sliderSettings}>
            {campagnes.map((campaign) => (
              <CardCampaign key={campaign.id} user={user} campaign={campaign} />
            ))}
          </Slider>
        </div>
        <div className="co-writers">
          <h2>FIND YOUR CO-WRITERS</h2>
        </div>
      </main>
    </>
  )
}
export default Welcome
