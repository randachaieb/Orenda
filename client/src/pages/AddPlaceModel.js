import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Form } from "react-bootstrap";


import './AddPlaceModel.css'

function AddPlaceModel(props) {

  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesO, setCategoriesO] = useState([]);
  const [categoriesP, setCategoriesP] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState();
  const [site, setSite] = useState();
  const [facebook, setFacebook] = useState();
  const [instagram, setInstagram] = useState();
  const [linkedin, setLinkedin] = useState();

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
    params.append("facebook", facebook);
    params.append("instagram", instagram);
    params.append("linkedin", linkedin);
    const token = localStorage.getItem("token");
    console.log(token);
    for (var value of params.values()) {
      console.log(value);
    }
    console.log("params:: ",params)
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Place/Offer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="content">
          <label>Select an Image</label>
          <input
            type="file"
            placeholder=" Choose an Image"
            onChange={(e) => setPicture(e.target.files[0])}
          />
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="select-box">
            <select className="form-select" onChange={(e) => setCategoriesP(e.target.value)}>
              <option >Places By Category</option>
              <option value="Training Centers">Training Centers</option>
              <option value="Campings">Campings</option>
              <option value="Schools">Schools</option>
              <option value="Incubators">Incubators</option>
              <option value="Coworking Spaces">Coworking Spaces</option>
              <option value="Clubs">Clubs</option>
              <option value="Leisure Tourism">Leisure Tourism</option>
              <option value="Accelerators">Accelerators</option>
            </select>


            <select
              id="browsers3"
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setCategoriesO([...categoriesO, e.target.value])}
            >
              <option >Offers By Category</option>
              <option value="Exchange Programs">Exchange Programs</option>
              <option value="Job Offers">Job Offers</option>
              <option value="Internships">Internships</option>
              <option value="Scholarships">Scholarships</option>
              <option value="Competitions">Competitions</option>
              <option value="Discounts">Discounts</option>
              <option value="Events">Events</option>
              <option value="Hackathons">Hackathons</option>


            </select>

            <select className="form-select" onChange={(e) => setRegion(e.target.value)}>
              <option >Region</option>
              <option value="Tunis">Tunis</option>
              <option value="Sousse">Sousse</option>
              <option value="Sfax">Sfax</option>
              <option value="Monastir">Monastir</option>
            </select>
          </div>
          <div className="set-categories">
            {categoriesO
              ? categoriesO.map((cat, index) => (
                  <span className="catg">
                    {cat}{" "}
                    <i
                      className="bi bi-x ml"
                      onClick={(e) => deleteCategory(e, index)}
                    ></i>
                  </span>
                ))
              : null}
          </div>
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter Description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="Enter Web Site Url"
            className="form-control"
            onChange={(e) => setSite(e.target.value)}
          /> */}
          {/* <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-primary"
                title="Website"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item href="#">Website</Dropdown.Item>
                <Dropdown.Item href="#">Facebook</Dropdown.Item>
                <Dropdown.Item href="#">Instagram</Dropdown.Item>
                <Dropdown.Item href="#">LinkedIn</Dropdown.Item>
              </DropdownButton>
              <FormControl aria-label="Text input with dropdown button" onChange={(e) => setSite(e.target.value)} placeholder="Please Enter Web Site URL"/>
            </InputGroup> */}
            <div className="add-place-model-social-container">
                <div className="add-place-model-social-item">
                <Form.Label htmlFor="website">Website</Form.Label>
                <Form.Control
                  type="website"
                  id="website"
                  aria-describedby="website"
                  placeholder="Please Enter Web Site URL"
                  onChange={(e) => setSite(e.target.value)}
                />
                </div>
                <div className="add-place-model-social-item">
                <Form.Label htmlFor="facbook">Facebook</Form.Label>
                <Form.Control
                  type="website"
                  id="facbook"
                  aria-describedby="facbook"
                  placeholder="Please Enter Facebook URL"
                  onChange={(e) => setFacebook(e.target.value)}
                />
                </div>
                <div className="add-place-model-social-item">
                <Form.Label htmlFor="instagram">Instagram</Form.Label>
                <Form.Control
                  type="website"
                  id="instagram"
                  aria-describedby="instagram"
                  placeholder="Please Enter Instagram URL"
                  onChange={(e) => setInstagram(e.target.value)}
                />
                </div>
                <div className="add-place-model-social-item">
                <Form.Label htmlFor="linkedin">LinkedIn</Form.Label>
                <Form.Control
                  type="website"
                  id="linkedin"
                  aria-describedby="linkedin"
                  placeholder="Please Enter LinkedIn URL"
                  onChange={(e) => setLinkedin(e.target.value)}
                />
                </div>
            </div>
          
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button onClick={(e) => handleSubmit(e)}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default AddPlaceModel;