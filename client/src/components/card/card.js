import React, { useContext, useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import image from "./images.jpg";
import axios from "axios";
import "./cards.css";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";
export default function Card(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const authContext = useContext(AuthContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const close = () => {
    setAnchorEl(null);
  };
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const history = useHistory();
  const deleteCard = (e, idC) => {
    e.preventDefault();
    console.log(idC);

    const headers = {
      "Content-Type": "Application/json",
      "x-auth-token": localStorage.getItem("token"),
    };
    console.log(localStorage.getItem("token"));
    axios
      .delete("/api/v1/card/delete", {
        data: { id: idC },
        headers: {
          "Content-Type": "Application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })

      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch((err) => err.message);
  };
  console.log("id user", authContext.user._id);

  const goToProfile = (e, id) => {
    if (id === authContext.user._id) {
      history.push(`/profileview`);
    } else {
      history.push(`/${id}`);
    }
  };

  return (
    <div className="card" style={{ margin: "20px" }}>
      {authContext.user._id === props.id ? (
        <div className="cards-dots">
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizIcon fontSize="large" style={{ color: "#444" }} />
          </IconButton>

          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={close}
            PaperProps={{
              style: {
                marginLeft: "1%",
                marginTop: "4.6%",
                maxHeight: 48 * 4.5,
                width: "20ch",
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <MenuItem onClick={close}>
              <div className="UP_Menu_Item">
                <MenuItem onClick={handleShow}>Edit</MenuItem>
                <MenuItem onClick={(e) => deleteCard(e, props.id)}>
                  Delete
                </MenuItem>
              </div>
            </MenuItem>
          </Menu>
        </div>
      ) : null}
      {show ? (
        <PopupForm
          handleClose={handleClose}
          idCard={props.id}
          nameCard={props.name}
          regionCard={props.region}
          placeCard={props.place}
          offerCard={props.offer}
          descriptionCard={props.description}
          piCard={props.picture}
          siteCard={props.website}
        />
      ) : null}
      <img src={"" + props.picture} className="card-img-top" alt="..."></img>
      <div className="user-name" onClick={(e) => goToProfile(e, props.id)}>
        <div className="content-user">
          <img src={"" + props.picture} className="avatar-user"></img>
          <span className="name">{props.name}</span>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <div className="title-region">
          {/* <h5>{props.category}</h5> */}

          {props.place ? (
            <span className="text-muted">{props.place}</span>
          ) : props.offer.length > 0 || props.offer != "" ? (
            <span className="text-muted">{props.offer}</span>
          ) : null}
          <p className="text-muted">
            <i className="mr bi-geo-alt-fill"></i>
            {props.region}
          </p>
        </div>
        {props.offer.length <= 3 ? (
          <p className="card-text">
            {props.description.replace(/^(.{80}[^\s]*).*/, "$1")}
          </p>
        ) : (
          <p className="card-text">
            {props.description.replace(/^(.{50}[^\s]*).*/, "$1")}
          </p>
        )}

        <div className="cat-offer">
          {props.offer.length > 0 && props.place
            ? props.offer.map((offer) =>
                offer != "" ? <span className="cat">{offer}</span> : null
              )
            : null}
        </div>
      </div>
      <div className="footer-c">
        <div className="bottom">
          <a
            className="links"
            target="_blank"
            rel="noopener noreferrer"
            href={props.website}
          >
            {" "}
            <i class="mr-2 bi-eye-fill"></i> view website
          </a>
        </div>
      </div>
    </div>
  );
}

// popup window
const PopupForm = ({
  handleClose,
  SubmitPost,
  idCard,
  nameCard,
  siteCard,
  regionCard,
  placeCard,
  offerCard,
  descriptionCard,
  piCard,
}) => {
  //New Empty Object To get Post Value

  const [name, setName] = useState(nameCard);
  const [region, setRegion] = useState(regionCard);
  const [categoriesO, setCategoriesO] = useState(offerCard);
  const [categories, setCategories] = useState([]);
  const [categoriesP, setCategoriesP] = useState(placeCard);
  const [description, setDescription] = useState(descriptionCard);
  const [picture, setPicture] = useState();
  const [site, setSite] = useState(siteCard);

  const handleSubmit = (e, idCard) => {
    e.preventDefault();
    const cat = [categoriesO, categoriesP];
    console.log(cat);

    const params = new FormData();
    if (categoriesP) {
      params.append("place", categoriesP);
    }
    if (categoriesO) {
      for (let cat of categoriesO)
        if (cat != "") {
          params.append("offer[]", cat);
        }
    }
    params.append("name", name);
    params.append("region", region);
    params.append("description", description);
    if (picture) {
      params.append("picture", picture);
    }
    params.append("website", site);

    const token = localStorage.getItem("token");
    console.log(token);
    for (var value of params.values()) {
      console.log(value);
    }

    axios
      .patch(`/api/v1/card/update/${idCard}`, params, {
        headers: {
          "Content-Type": "multipart/form-data;",

          "x-auth-token": localStorage.getItem("token"),
        },
      })

      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch((err) => err.message);
  };

  const deleteCategory = (e, index) => {
    e.preventDefault();
    setCategories(categoriesO.splice(index, 1));
    console.log(categoriesO);
  };

  return (
    <>
      <div className="form-pop">
        <div className="content">
          <button
            type="button"
            className="close btn-close"
            onClick={handleClose}
          />
          <input
            type="file"
            placeholder="enter img"
            onChange={(e) => setPicture(e.target.files[0])}
          />
          <label>Title</label>
          <input
            type="text"
            placeholder="enter title"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="select-box">
            <select
              onChange={(e) => setCategoriesP(e.target.value)}
              value={categoriesP}
            >
              <option>Places By Category</option>
              <option value="Training centers">Training centers</option>
              <option value="Schools">Schools</option>
              <option value="Coworking places">Coworking places</option>
              <option value="Incubator">Incubator</option>
            </select>
            <select
              id="browsers3"
              aria-label="Default select example"
              onChange={(e) => setCategoriesO([...categoriesO, e.target.value])}
              value={categoriesO}
            >
              <option>Offers By Category</option>
              <option value="Scholarships">Scholarships</option>
              <option value="Job offers">Job offers</option>
              <option value="Competitions">Competitions</option>
              <option value="Events">Events</option>
            </select>
            <select onChange={(e) => setRegion(e.target.value)} value={region}>
              <option>Region</option>
              <option value="Tunis">Tunis</option>
              <option value="Sousse">Sousse</option>
              <option value="Sfax">Sfax</option>
              <option value="Monastir">Monastir</option>
            </select>
          </div>
          <div className="set-categories">
            {categoriesO
              ? categoriesO.map((cat, index) =>
                  cat != "" ? (
                    <span className="catg">
                      {cat}{" "}
                      <i
                        className="bi bi-x ml"
                        onClick={(e) => deleteCategory(e, index)}
                      ></i>
                    </span>
                  ) : null
                )
              : null}
          </div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            placeholder="enter description"
            className="input"
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Website</label>
          <input
            type="text"
            placeholder="enter Web Site Url"
            className="input"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          />
          <button className="button" onClick={(e) => handleSubmit(e, idCard)}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
};
