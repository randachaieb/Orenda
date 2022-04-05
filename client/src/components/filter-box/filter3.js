import "./filter.css";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

// popup window
const PopupForm2 = ({ handleClose, SubmitPost }, props) => {
  //New Empty Object To get Post Value

  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesO, setCategoriesO] = useState([]);
  const [categoriesP, setCategoriesP] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState();
  const [site, setSite] = useState();

  const [modalShow, setModalShow] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log(name, region, description, categoriesP, categoriesO, picture)
    const params = new FormData();
    if (categoriesP) {
      params.append("place", categoriesP);
    }
    if (categoriesO) {
      for (let cat of categoriesO) params.append("offer[]", cat);
    }
    params.append("name", name);
    params.append("region", region);
    params.append("description", description);
    params.append("picture", picture);
    params.append("website", site);
    const token = localStorage.getItem("token");
    console.log(token);
    for (var value of params.values()) {
      console.log(value);
    }

    axios
      .post("/api/v1/card", params, {
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
    <Modal
        
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          {console.log('props',props)}
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};
export default PopupForm2;
