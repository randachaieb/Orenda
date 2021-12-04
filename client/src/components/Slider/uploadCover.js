import React, { useState } from "react";
import "./Slider.css";
import axios from "axios";

function CoverPopup({ handleCloseUp }) {
  const [upcover, setCover] = useState();

  const uploadCover = (e) => {
    e.preventDefault();

    const params = new FormData();

    params.append("cover", upcover);

    const token = localStorage.getItem("token");
    console.log(token);
    for (var value of params.values()) {
      console.log(value);
    }

    axios
      .patch(`/api/v1/user/addCover`, params, {
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

  return (
    <>
      {/* S ==== Slide */}
      <div className="form-S-popup">
        <div className="form-S-container">
          <button
            type="button"
            className="close btn-close"
            onClick={handleCloseUp}
          />
          <div className="S-field">
            <input
              type="file"
              placeholder="image"
              name="img"
              accept="image/png, image/jpeg "
              onChange={(e) => setCover(e.target.files[0])}
            />
          </div>
          <button className="S-button" onClick={(e) => uploadCover(e)}>
            upload cover
          </button>
        </div>
      </div>
    </>
  );
}

export default CoverPopup;
