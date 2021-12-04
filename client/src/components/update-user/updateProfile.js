import React, { useState } from "react";

import axios from "axios";

function UpdateProfile({ handleCloseProfile, Pname, Pbio }) {
  const [upcover, setCover] = useState();
  const [name, setName] = useState(Pname);
  const [bio, setBio] = useState(Pbio);
  const [picture, setPicture] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData();

    if (picture) {
      params.append("picture", picture);

      axios
        .patch(`/api/v1/user/update`, params, {
          headers: {
            "Content-Type": "multipart/form-data",

            "x-auth-token": localStorage.getItem("token"),
          },
        })

        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => err.message);
    }

    axios
      .patch(
        `/api/v1/user/update`,
        {
          name: name,
          bio: bio,
        },
        {
          headers: {
            "Content-Type": "application/json",

            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )

      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch((err) => err.message);
  };

  return (
    <>
      {/* S ==== Slide */}
      <div className="form-pop">
        <div className="content">
          <button
            type="button"
            className="close btn-close"
            onClick={handleCloseProfile}
          />
          Picture :{" "}
          <input
            type="file"
            placeholder="enter name"
            className="input"
            onChange={(e) => setPicture(e.target.files[0])}
          />
          <label>name</label>
          <input
            type="text"
            placeholder="enter name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Bio</label>
          <input
            type="text"
            placeholder="add bio"
            className="input"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button className="button" onClick={(e) => handleSubmit(e)}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
