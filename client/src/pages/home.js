import React, { useEffect, useState, useContext } from "react";
import Cards from "../components/card/cards";
import "./home.css";
import PopupForm from "../components/filter-box/filter";
//import Sidebar from "../components/sidebar/sidebar";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import Carsouel from "../components/carsouel/carsouel";
import axios from "axios";
// import HomeIcon from '@mui/icons-material/Home';
import { AuthContext } from '../context/authContext';
<<<<<<< HEAD
import Button from 'react-bootstrap/Button';
import AddPlaceModel from "./AddPlaceModel";
=======
import { stateFromPath } from '../util/updatePath';
>>>>>>> 4b320ab23c8e78c9a5cdd30b8e2e93378bf430fc

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Home() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const history = useHistory();
  const [byRegion, setRegion] = useState("");
  const [byPlaces, setPlaces] = useState("");
  const [byOffer, setOffer] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [bgColorPlaces, setBgColorPlaces] = useState("");
  const [BgColorOffer, setBgColorOffer] = useState("");
  const [BgColorOffers, setBgColorOffers] = useState("");

  const [Categories, setCategories] = useState([]);
  const [CategoriesOffer, setCategoriesOffer] = useState([]);
  const [CategoriesOfferSub, setCategoriesOfferSub] = useState("");
  const [CategoriesPlaceSub, setCategoriesPlaceSub] = useState("");
  const handleShow = () => setShow(true);
  const [images, setImages] = useState();

  const [modalShow, setModalShow] = React.useState(false);

  useEffect(async () => {
    // Met à jour le titre du document via l’API du navigateur
    axios.get("/api/v1/categories/PlacesCategories").then((response) => {
      console.log(response.data);
      setCategories(response.data);
    });
    axios.get("/api/v1/categories/offerCategories").then((response) => {
      if (response.data.length > 0) {
        setCategoriesOffer(response.data);
      }
    });
    setImages(
      Array.from(Array(10).keys()).map((id) => ({
        id,
        url: `https://picsum.photos/1000?random=${id}`,
      }))
    );
    // load filters from url
    const { sOffer, sPlace, sregion } = stateFromPath();
    sOffer && setOffer(sOffer);
    sPlace && setPlaces(sPlace);
    sregion && setRegion(sregion);
  }, []);

  let slides = [
    <img src="https://picsum.photos/800/300/?random=1" alt="1" />,
    <img src="https://picsum.photos/800/301/?random=2" alt="2" />,
    <img src="https://picsum.photos/800/302/?random=3" alt="3" />,
    <img src="https://picsum.photos/800/303/?random=4" alt="4" />,
    <img src="https://picsum.photos/800/304/?random=5" alt="5" />,
  ];

  const changePlaces = (event) => {
    
    if (event.target.value != "") {
      
      console.log("in", event.target.value)
      axios
        .get("/api/v1/categories/PlacesCategories/" + event.target.value)
        .then((res) => {
          
          console.log(res.data.place);
          if (res.data.place.length != 0) {
            
            axios
              .patch("/api/v1/categories/update/" + res.data.place[0]._id)
              .then((res) => {
                console.log(res.data);
              });
              
          }
        });
    }

    console.log("out", event.target.value)
    setPlaces(event.target.value);
    
  };

  const changeOffer = (event) => {
    if (event.target.value != "") {
      axios
        .get("/api/v1/categories/offerCategories/" + event.target.value)
        .then((res) => {
          console.log(res.data.offer);
          if (res.data.offer.length != 0) {
            axios
              .patch("/api/v1/categories/updateOffer/" + res.data.offer[0]._id)
              .then((res) => {
                console.log(res.data);
              });
          }
        });
    }
    setOffer(event.target.value);
  };

  const SubOffers = (event) => {
    if (event.target.value != "") {
      axios
        .get("/api/v1/categories/offerCategoriesSub/" + event.target.value)
        .then((res) => {
          console.log(res.data[0].subCategory);
          setCategoriesOfferSub(res.data[0].subCategory);
        });
    }

    setOffer(event.target.value);
  };

  const SubPlaces = (event) => {
    if (event.target.value != "") {
      axios
        .get("/api/v1/categories/PlaceCategoriesSub/" + event.target.value)
        .then((res) => {
          console.log(res.data);
          setCategoriesPlaceSub(res.data[0].subCategory);
        });
    }

    setPlaces(event.target.value);
  };

  const AllPlaces = (event) => {
    setPlaces("");
    if (bgColor === "") {
      setBgColor("contained");
      setBgColorPlaces("");
    }
    var elms = document.querySelectorAll("[id='btnplace']");

    for (var i = 0; i < elms.length; i++) {
      elms[i].style.backgroundColor = "transparent";
      elms[i].style.color = "black";
    }
    setCategoriesPlaceSub([]);
  };

  const AllOffers = (event) => {
    setOffer("");
    if (BgColorOffer === "") {
      setBgColorOffer("contained");
      setBgColorOffers("");
    }
    var elms = document.querySelectorAll("[id='btnoffer']");
    for (var i = 0; i < elms.length; i++) {
      elms[i].style.backgroundColor = "transparent";
      elms[i].style.color = "black";
    }
    setCategoriesOfferSub([]);
  };


  const clear = (event) => {
    event.target.value = "";
  };


  return (
    <div>
      {/* <Carsouel /> */}

      <div className="content-home">
        {/* <Sidebar/> */}

        <div className="container-card">
          <br /> <br /> <br /> <br /> <br />
          <div className="container box">

{/* 
            ----------------------------------------------------------
            the start of the bar
            ----------------------------------------------------------
            */}

            <div className=" category-search">
              <div className="display">




                <div className="category">
               
                  {/* <HomeIcon color="secondary" /> */}
                  <svg className="svg-size" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                  <input
                    className="form-select"
                    list="browsers2"
                    name="byPlaces"
                    id="browser"
                    placeholder="Places"
                    onChange={changePlaces}
                    value={byPlaces}
                    // onClick={clear}
                  ></input>
                  {console.log("categoryxx: ", Categories)}
                  {/* aria-label="Default select example" */}
                  <datalist id="browsers2">
                    {Categories.map((data) => (
                      <option key={data.name} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </datalist>
                </div>


                      <div className="bar-divider">
                        .
                      </div>

                <div className="category">
                <svg className="svg-size" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                  <input
                    className="form-select"
                    list="browsers3"
                    name="byOffer"
                    id="browser"
                    placeholder="Offers"
                    onChange={changeOffer}
                    value={byOffer}
                  ></input>
                  <datalist id="browsers3">
                    
                    {CategoriesOffer.map((data) => (
                      <option key={data._id} value={data.name ? data.name.trim() : data.name}>
                        {data.name}
                        {console.log('options: ', data)}
                        {console.log('options: ', data.name)}
                      </option>
                    ))}
                  </datalist>
                </div>


                <div className="bar-divider">
                      .
                </div>


                <div className="category">
                <svg className="svg-size" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <input
                    className="form-select"
                    list="browsers"
                    name="byRegion"
                    id="browser"
                    placeholder="Region"
                    onChange={(e) => setRegion(e.target.value)}
                    value={byRegion}
                  ></input>
                  <datalist id="browsers">
                    <option value="Tunis">Tunis</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Monastir">Monastir</option>
                    <option value="Sfax">Sfax</option>
                  </datalist>
                </div>
              </div>
              {show ? <PopupForm handleClose={handleClose} /> : null}
            </div>

            {/* 
            ----------------------------------------------------------
            the end of the bar
            ----------------------------------------------------------
            */}

            {authContext.user._id ?

            // <button className=" btn-pry btn-margin-above" onClick={handleShow}>
            //     {" "}
            //     Add Place / Offer{" "}
            //   </button> 
            <Button variant="primary" onClick={() => setModalShow(true)}>
            Add Place / Offer
            </Button>
              
              : <></>}


              

              <AddPlaceModel
                show={modalShow}
                onHide={() => setModalShow(false)}
                handleClose={handleClose}
              />

            <div class="container horizontal-scrollable padding-above">
              <div class="container ">
                <div class="row">
                  <div className={classes.root}>
                    
                    <div className="home_radio_group">
                    <b style={{ fontSize: "18px" }}> Places </b>
                      <input className="home_radio_input" type="radio" value={"All"} name="myRadio1" id="All Places"/>
                      <label className="home_radio_label" for="All Places" onClick={AllPlaces} >All</label>
                    
                    {/* <button
                      type="button"
                      class="button button3 btn-borderless"
                      style={{
                        textAlign: "center",
                        padding: "8px",
                        fontSize: "16px",
                      }}
                      onClick={AllPlaces}
                    >
                      All
                    </button> */}
                    {Categories.map((data) => (

                      <><input className="home_radio_input" type="radio" value={data.name} name="myRadio1" id={data.name} onClick={SubPlaces} ></input><label className="home_radio_label" for={data.name} > {data.name} </label></>

                    ))}

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {CategoriesPlaceSub ? (
              <div class="container horizontal-scrollable">
                <div class="container ">
                  <div class="row">
                    <div className={classes.root}>
                      {/* to get it soon <b style={{ fontSize: "18px"}}> Sub Places </b> */}
                      {CategoriesPlaceSub.map((data) => (
                        <button
                          type="button"
                          class="button button3"
                          style={{
                            textAlign: "center",
                            padding: "8px",
                            fontSize: "16px",
                          }}
                          value={data._id}
                        >
                          {data.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div class="container horizontal-scrollable">
              <div class="container ">
                <div class="row">
                  <div className={classes.root}>
                    
                    <div className="home_radio_group">
                    <b style={{ fontSize: "18px" }}> Offers </b>
                    <input className="home_radio_input" type="radio" value={"All"} name="myRadio2" id="All Offers"/>
                    <label className="home_radio_label" for="All Offers" onClick={AllOffers} >All</label>
                    {/* <button
                      type="button"
                      class="button button3 btn-borderless"
                      style={{
                        textAlign: "center",
                        padding: "8px",
                        fontSize: "16px",
                      }}
                      onClick={AllOffers}
                    >
                      All
                    </button> */}
                    {CategoriesOffer.map((data) => (
                      <><input className="home_radio_input" type="radio" value={data.name} name="myRadio2" id={data.name} onClick={SubOffers} ></input><label className="home_radio_label" for={data.name} > {data.name} </label></>

                     
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {CategoriesOfferSub ? (
              <div class="container horizontal-scrollable">
                <div class="container ">
                  <div class="row">
                    <div className={classes.root}>
                      {/* to get it soon <b style={{ fontSize: "18px"}}> Sub Offers </b> */}
                      {CategoriesOfferSub.map((data) => (
                        <button
                          type="button"
                          class="button button3"
                          style={{
                            textAlign: "center",
                            padding: "8px",
                            fontSize: "16px",
                          }}
                          value={data._id}
                        >
                          {data.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <Cards sregion={byRegion} sPlace={byPlaces} sOffer={byOffer} />
        </div>
      </div>
    </div>
  );
}
export default Home;
