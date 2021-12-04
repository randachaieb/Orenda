import React, { useState } from "react";
import "./ProfileCard.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { IconButton } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

function ProfileCard({ card }) {
  return (
    <div className="gallerie">
      {card.map((card, index) => {
        return <Card key={index} card={card} />;
      })}
    </div>
  );
}

export default ProfileCard;

const Card = ({ card }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const close = () => {
    setAnchorEl(null);
  };
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const deletePost = (e, idC) => {
    e.preventDefault();
    console.log(idC);

    console.log(idC);
    axios
      .delete("/api/v1/post/delete", {
        data: { id: idC }, // or data: jdId, depending on how you handle it in the back end
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

  return (
    <div>
      {show ? (
        <Repost
          handleClose={handleClose}
          id={card._id}
          text={card.text}
          picture={card.link}
        />
      ) : null}
      {card.link === "" ? (
        <div className="cardItems">
          <div className="only-description" style={{ color: "red" }}>
            {card.text}
          </div>
        </div>
      ) : (
        <div className="cardItems">
          <div className="post-card">
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizIcon fontSize="large" style={{ color: "#fff" }} />
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
                <div className="Menu_Item">
                  <MenuItem onClick={handleShow}>edit</MenuItem>
                  <MenuItem onClick={(e) => deletePost(e, card._id)}>
                    Delete
                  </MenuItem>
                </div>
              </MenuItem>
            </Menu>
          </div>

          <img className="img" src={`${card.link}`} Alt="post" />
          <div className="description">{card.text}</div>
        </div>
      )}
    </div>
  );
};

const Repost = ({ handleClose, id, text, picture }) => {
  const [txt, setTxt] = useState(text);
  const [link, setLink] = useState();

  const handleSubmit = (e, id) => {
    e.preventDefault();
    //console.log(name, region, description, categoriesP, categoriesO, picture)
    const params = new FormData();

    params.append("text", txt);
    if (link) {
      params.append("link", link);
    }

    const token = localStorage.getItem("token");
    console.log(token);
    for (var value of params.values()) {
      console.log(value);
    }

    console.log("id", id);
    axios
      .patch(`/api/v1/post/update/${id}`, params, {
        headers: {
          "Content-Type": "multipart/form-data",

          "x-auth-token": localStorage.getItem("token"),
        },
      })

      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch((err) => err.message);
  };

  return (
    <>
      <div className="form-popup">
        <div className="form-container">
          <button type="button" class="close btn-close" onClick={handleClose} />
          <label className="title-label">
            <b> Edit Post</b>
          </label>
          <div className="desc-field">
            <textarea
              className="field-description"
              name="description"
              placeholder=" Write Here .. "
              value={txt}
              onChange={(e) => setTxt(e.target.value)}
            />
          </div>
          <div className="field">
            <input
              type="file"
              placeholder="image"
              name="img"
              accept="image/png, image/jpeg "
              onChange={(e) => setLink(e.target.files[0])}
            />
          </div>
          <button className="button" onClick={(e) => handleSubmit(e, id)}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
};
