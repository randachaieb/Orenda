import React, { useState } from "react";
import "./Popup.css";
import axios from "axios";

const Popup = ({ handleClose, SubmitPost }) => {
  //New Empty Object To get Post Value
  const [text, setText] = useState("");
  const [link, setLink] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name, region, description, categoriesP, categoriesO, picture)
    const params = new FormData();

    params.append("text", text);
    if (link) {
      params.append("link", link);
    }

    const token = localStorage.getItem("token");
    console.log(token);
    for (var value of params.values()) {
      console.log(value);
    }

    axios
      .post("/api/v1/post", params, {
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
            <b> Create a Post</b>
          </label>
          <div className="desc-field">
            <textarea
              className="field-description"
              name="description"
              placeholder=" Write Here .. "
              onChange={(e) => setText(e.target.value)}
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
          <button className="button" onClick={(e) => handleSubmit(e)}>
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;
