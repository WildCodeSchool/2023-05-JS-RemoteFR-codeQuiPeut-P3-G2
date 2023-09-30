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
import { Link } from "react-router-dom"
import CardCampaign from "../components/CardCampaign"
import MyContext from "../components/MyContext"
import Footer from "../components/Footer"
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
              Explore a dedicated space for role-playing enthusiasts in search
              of inspiration! Our scenario-sharing website is the perfect place
              for enthusiasts eager to bring their fantastical adventures to
              life. You can share your own creations while delving into a rich
              library of scenarios crafted by fellow community members. Find
              inspiration for your next epic journeys and contribute to
              enriching the world of role-playing by sharing your unique ideas.
              Join us to experience the ultimate adventure in the realm of
              role-playing!
            </h1>
          </div>
          <img className="BookFall" src={LivreAccueil} />
        </header>

        <section className="contents">
          <div className="find_create ">
            <div className="borderHome borderFind">
              <div className="FindScrip one">
                <h2>FIND YOUR PERFECT SCRIPT</h2>
                <div className="conteneurSVG">
                  <svg>
                    <line x1="0" x2="200" y1="0" y2="0" />
                  </svg>
                </div>
                <p>
                  Explore a plethora of captivating stories just waiting for you
                  to delve into. Whether you're seeking an epic adventure, a
                  hilarious comedy, or a heartfelt narrative, our diverse
                  collection of scenarios is tailored to satisfy all tastes.
                  Dive into a world of endless possibilities and discover the
                  perfect script that aligns with your creativity. Let yourself
                  be inspired, create, and share your vision with the world.
                  Your journey begins here!
                </p>
                <Link to="/scripts">
                  <button className="Explo cursorHover" type="button">
                    Explore
                  </button>
                </Link>
              </div>
            </div>

            <div className="deCreate">
              <div className="containerImg">
                <img src={de} alt="dé" />
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
                  screenwriter or just starting your creative journey, our
                  platform provides you with the resources and features you need
                  to craft the script of your dreams. Build worlds, develop
                  characters, and write memorable dialogue with ease. Your story
                  begins here!
                </p>
                <Link to="/editor">
                  <button className="Create cursorHover" type="button">
                    Create
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="containerMokeUp">
            <div className="borderHome borderMokeUp">
              <div className="contentMokeUp">
                <h3>SIMPLE INTERFACE</h3>
                <div className="AnimLaptop">
                  <img src={mokeUp} alt="" />
                </div>
                <p>
                  Explore a world of epic adventures and immersive narratives in
                  our outstanding selection of campaigns. Whether you're a
                  seasoned Game Master or a player seeking new experiences, our
                  campaigns offer a variety of choices to satisfy your thirst
                  for adventure!
                </p>
              </div>
            </div>
          </div>
          <div className="sliders">
            <div className="borderHome borderSliders">
              <h2 className="popularScript">POPULAR SCRIPT</h2>
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
        </section>
        <Footer />
      </main>
    </>
  )
}
export default Welcome
