import React, { useEffect, useState } from "react";
import Cards from "../components/card/cards";
import "./home.css";
import PopupForm from "../components/filter-box/filter";
//import Sidebar from "../components/sidebar/sidebar";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Carsouel from "../components/carsouel/carsouel";
import axios from "axios";
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
  return (
    <div>
      <Carsouel />

      <div className="content-home">
        {/* <Sidebar/> */}

        <div className="container-card">
          <br /> <br /> <br /> <br /> <br />
          <div className="container box">
            <div className=" category-search">
              <div className="display">
                <div className="category">
                  <input
                    className="form-select"
                    list="browsers2"
                    name="byPlaces"
                    id="browser"
                    placeholder="Places By Category"
                    onChange={changePlaces}
                  ></input>
                  <datalist id="browsers2" aria-label="Default select example">
                    {Categories.map((data) => (
                      <option key={data.name} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </datalist>
                </div>
                <div className="category">
                  <input
                    className="form-select"
                    list="browsers3"
                    name="byOffer"
                    id="browser"
                    placeholder="Offers By Category"
                    onChange={changeOffer}
                  ></input>
                  <datalist id="browsers3" aria-label="Default select example">
                    {CategoriesOffer.map((data) => (
                      <option key={data._id} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </datalist>
                </div>
                <div className="category">
                  <input
                    className="form-select"
                    list="browsers"
                    name="byRegion"
                    id="browser"
                    placeholder="Region"
                    onChange={(e) => setRegion(e.target.value)}
                  ></input>
                  <datalist id="browsers" aria-label="Default select example">
                    <option value="Tunis">Tunis</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Monastir">Monastir</option>
                    <option value="Sfax">Sfax</option>
                  </datalist>
                </div>
              </div>
              <button className=" btn-pry" onClick={handleShow}>
                {" "}
                Add Card{" "}
              </button>

              {show ? <PopupForm handleClose={handleClose} /> : null}
            </div>
            <div class="container horizontal-scrollable">
              <div class="container ">
                <div class="row">
                  <div className={classes.root}>
                    <b style={{ fontSize: "18px" }}> Places </b>
                    <button
                      type="button"
                      class="button button3"
                      style={{
                        textAlign: "center",
                        padding: "8px",
                        fontSize: "16px",
                      }}
                      onClick={AllPlaces}
                    >
                      All
                    </button>
                    {Categories.map((data) => (
                      <button
                        type="button"
                        class="button button3"
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          fontSize: "16px",
                        }}
                        value={data.name}
                        onClick={SubPlaces}
                      >
                        {data.name}
                      </button>
                    ))}
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
                    <b style={{ fontSize: "18px" }}> Offers </b>
                    <button
                      type="button"
                      class="button button3"
                      style={{
                        textAlign: "center",
                        padding: "8px",
                        fontSize: "16px",
                      }}
                      onClick={AllOffers}
                    >
                      All
                    </button>
                    {CategoriesOffer.map((data) => (
                      <button
                        type="button"
                        class="button button3"
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          fontSize: "16px",
                        }}
                        value={data.name}
                        onClick={SubOffers}
                      >
                        {data.name}
                      </button>
                    ))}
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
