import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
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
import Footer from "../components/Footer"

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

        <div className="find_create">
          <div className="FindScrip">
            <h2>FIND YOUR PERFECT SCRIPT</h2>
            <div className="conteneurSVG">
              <svg>
                <line x1="0" x2="200" y1="0" y2="0" />
              </svg>
            </div>
            <p>
              Explore a plethora of captivating stories just waiting for you to
              delve into. Whether you're seeking an epic adventure, a hilarious
              comedy, or a heartfelt narrative, our diverse collection of
              scenarios is tailored to satisfy all tastes. Dive into a world of
              endless possibilities and discover the perfect script that aligns
              with your creativity. Let yourself be inspired, create, and share
              your vision with the world. Your journey begins here!
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
              Expand your imagination and bring your ideas to life with our
              intuitive scenario creation tool. Whether you're a seasoned
              screenwriter or just starting your creative journey, our platform
              provides you with the resources and features you need to craft the
              script of your dreams. Build worlds, develop characters, and write
              memorable dialogue with ease. Your story begins here!
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
          <p>
            Explore a world of epic adventures and immersive narratives in our
            outstanding selection of campaigns. Whether you're a seasoned Game
            Master or a player seeking new experiences, our campaigns offer a
            variety of choices to satisfy your thirst for adventure!
          </p>
          <div className="sliderHome">
            <Slider {...sliderSettings}>
              {campagnes.map((campaign) => (
                <CardCampaign
                  key={campaign.id}
                  user={user}
                  campaign={campaign}
                />
              ))}
            </Slider>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
export default Welcome
