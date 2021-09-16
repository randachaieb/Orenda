import './filter.css'
import React from 'react';
import 'antd/dist/antd.css';
import { Card,Select } from 'antd';
import {  Modal, Button,Input} from 'antd';
import axios from 'axios'
const { Option } = Select;
const { TextArea } = Input;

class PopupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bottom: 'bottomCenter',
      isModalVisible:false,
      isModalVisiblEdit:false,
      isModalVisiblDelete:false,
      id:null,
      data: [],
      cards:[],
      offers: [],
      name:null,
      place : null,
      offer : null,
      description:null,
      website:null,
      subcategoryOffers:null,
      subcategory:null,
      subcategoryPlaces:null,
      namee:null,
      reg:null,
      subcateg:[],
      subcategoffer:[] ,
      picture:null
      };
      this.handleOk = this.handleOk.bind(this);
      this.formSubmit = this.formSubmit.bind(this);
    }
 
     showModal = () => {
      axios.get('http://localhost:5000/api/v1/categories/PlacesCategories')
      .then(response => {
          if (response.data.length > 0) {
              this.setState({
                data:response.data
              })
          }
      })
      axios.get('http://localhost:5000/api/v1/categories/offerCategories')
      .then(response => {
          if (response.data.length > 0) {
              this.setState({
                offers:response.data
              })
          }
      })
        this.setState({isModalVisible:true})
      };
      
     handleOk  = () => {
        this.setState({isModalVisible:false})
      };
      
     handleCancel = () => {
       this.setState({isModalVisible:false})
      };
      handlechangeOffer = (event) => {
        axios.get('http://localhost:5000/api/v1/categories/offerCategoriesSub/'+event)
        .then(res => {
          console.log(res.data[0].subCategory)
          this.setState({
            subcategoryOffers:res.data[0].subCategory,
            offer:res.data[0]._id
          })
       
        });
        
      }
      handlechangecategory = (event) => {
        axios.get('http://localhost:5000/api/v1/categories/PlaceCategoriesSub/'+event)
        .then(res => {
          console.log(res.data)
          this.setState({
            subcategoryPlaces:res.data[0].subCategory,
            place:res.data[0]._id
          })
          
        });
        this.setState({
          subcategory:true
        })
      }
  handleChangenamee = event => {
    this.setState({
      namee: event.target.value
    })
  }
  handlechangeReg = event => {
    this.setState({
      reg: event
    })
  }
  handlechangeDesc = event => {
    this.setState({
      description: event.target.value
    })
  }
  handlechangeURL = event => {
    this.setState({
      website: event.target.value
    })
  }
  handleChangepicture = event => {
    this.setState({
      picture: event.target.value
    })
  }
  handlechangesub= event => {
    this.setState({
      subcateg: event
    })
    console.log(this.state.subcateg)
  }
  handlechangesuboffer= event => {
    this.setState({
      subcategoffer: event
    })
    console.log(this.state.subcategoffer)
  }
  formSubmit(event) {
    event.preventDefault();
    const params = new FormData();
  
        params.append("name", this.state.namee);
        params.append("region", this.state.reg);
        params.append("description", this.state.description);
        params.append("website", this.state.website);
        params.append("PlaceCategory", this.state.place);
        params.append("OfferCategory", this.state.offer);
        params.append("domain", [...this.state.subcateg, this.state.subcategoffer]);
        params.append("picture", this.state.picture);
    axios.post('http://localhost:5000/api/v1/card',params, {
      headers:{
            'Content-Type': 'multipart/form-data;',
            
            'x-auth-token': localStorage.getItem('token')
      }
    })
    .then(res => {
        console.log(res.data)
  
    });
    this.setState({isModalVisible:false})
  }
  render() {
    return (
                    <>
            <Button type="default" onClick={this.showModal}>
      Add Card
      </Button><br/><br/>
      <Modal title="Add Card" visible={this.state.isModalVisible} footer={[
                        <Button key="cancel" onClick={this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="schedule" type="submit" onClick={this.formSubmit}>Add</Button>
                      ]}>
      <Input placeholder="Title"  onChange={this.handleChangenamee}  required/><br/><br/>
      <Input placeholder="Image" type='file' onChange={this.handleChangepicture}  required/><br/><br/>
      <Select defaultValue="select category" style={{ width: "100%" }} onChange={this.handlechangecategory} required>
      {this.state.data.map((data) => (
                                 <Option key={data._id}  value={data.name} 	>{data.name}</Option>
                                    ))}
 
    </Select><br/><br/>
    {  this.state.subcategoryPlaces?
    <div>
 <Select  mode="multiple"
      style={{ width: '100%' }}
      placeholder="Please select" style={{ width: "100%" }}   onChange={this.handlechangesub} required>
 {this.state.subcategoryPlaces.map((data) => (
                                 <Option key={data._id}  value={data._id} 	>{data.name}</Option>
                                    ))}
 </Select>
 
   <br/><br/>
   </div>
 :''
    }
    <Select defaultValue="Select Offer" style={{ width: "100%" }} onChange={this.handlechangeOffer} required>
    {this.state.offers.map((data) => (
                                 <Option key={data._id}  value={data.name} 	>{data.name}</Option>
                                    ))}
    </Select><br/><br/>
    {  this.state.subcategoryOffers?
    <div>
 <Select mode="multiple"
      style={{ width: '100%' }}
      placeholder="Please select"  style={{ width: "100%" }} onChange={this.handlechangesuboffer} required>
 {this.state.subcategoryOffers.map((data) => (
                                 <Option key={data._id}  value={data._id} 	>{data.name}</Option>
                                    ))}
 </Select>
   <br/><br/>
   </div>
 :''
    }
    <Select defaultValue="Sousse" style={{ width: "100%" }}  onChange={this.handlechangeReg} required>
    <Option value="Tunis">Tunis</Option>
    <Option value="Sousse">Sousse</Option>
     <Option value="Sfax">Sfax</Option>
    <Option value="Monastir">Monastir</Option>
    </Select><br/><br/>
    <Input placeholder="Enter description"  onChange={this.handlechangeDesc} required /><br/><br/>
    <TextArea placeholder="Enter Web Site Url"  onChange={this.handlechangeURL} item={this.state.website} required/><br/><br/>
      </Modal>
                    </>
);
}
}

export default  PopupForm;