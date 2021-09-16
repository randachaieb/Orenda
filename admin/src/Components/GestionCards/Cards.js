import React from 'react';
import 'antd/dist/antd.css';
import { Card,Select } from 'antd';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import {  Modal, Button,Input,Row, Col ,Pagination } from 'antd';
import axios from 'axios'
const { Meta } = Card;
const { Option } = Select;
const { TextArea } = Input;

class Cards extends React.Component {
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

      showModalEdit  = (event) => {
          axios.get('http://localhost:5000/api/v1/card/' + event)
              .then(response => {
                  this.setState({
                    id:event,
                    name: response.data.card.name,
                      place: response.data.card.place,
                      description: response.data.card.description,
                      website:response.data.card.website,
                      isModalVisiblEdit:true
                  })
                  console.log(response.data);
              })
              .catch((error) => {
                  console.log(error);
              })
      };
      
     handleOkEdit  = () => {
        this.setState({isModalVisiblEdit:false})
      };
      
     handleCancelEdit = () => {
       this.setState({isModalVisiblEdit:false})
      };
      showModalDelete  = (event) => {
          axios.get('http://localhost:5000/api/v1/card/' + event)
              .then(response => {
                  this.setState({
                    id:event,
                      name: response.data.card.name,
                      isModalVisiblDelete:true
                  })
                  console.log(response.data);
              })
              .catch((error) => {
                  console.log(error);
              })
   
       
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
     handleOkDelete  = (event) => {
      axios.delete("http://localhost:5000/api/v1/card/delete/",
      {
 data: {"id": event }, 
 headers: {
      'Content-Type': 'Application/json',
      'x-auth-token': localStorage.getItem('token'),
 }
})
      .then(res => {
          console.log(res.data)
          this.setState({
            isModalVisiblDelete:false,
          })
      }
      );
      };
      
     handleCancelDelete = () => {
       this.setState({isModalVisiblDelete:false})
      };
      componentDidMount() {
        // need to make the initial call to getData() to populate
        // data right away
        this.getData();
        // Now we need to make it run at a specified interval
        setInterval(this.getData, 1000); // runs every 1 second.
    }
    getData = () => {
      axios.get('http://localhost:5000/api/v1/card/allcards')
          .then(response => {
              if (response.data.length > 0) {
                  this.setState({
                    cards: response.data.map(user => user),
                  })
              }
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
      <Modal title="Add Card" visible={this.state.isModalVisible}footer={[
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
      <Modal title="Edit Card" visible={this.state.isModalVisiblEdit} onOk={this.handleOkEdit} onCancel={this.handleCancelEdit}>
      <Input placeholder="Title"  value={this.state.name} /><br/><br/>
      <Input placeholder="Image" type='file' /><br/><br/>
      <Select defaultValue="Schools" style={{ width: "100%" }} >
      <Option value="Training centers">Training centers</Option>
      <Option value="Schools">Schools</Option>
      <Option value="Coworking places">Coworking places</Option>
      <Option value="Clubs">Clubs</Option>
    </Select><br/><br/>
    <Select defaultValue="Scholarships" style={{ width: "100%" }} >
    <Option value="Scholarships">Scholarships</Option>
    <Option value="Job offers">Job offers</Option>
    <Option value="Competitions">Competitions</Option>
    <Option value="Events">Events</Option>
    </Select><br/><br/>
 
    <Select defaultValue="Sousse" style={{ width: "100%" }} >
    <Option value="Tunis">Tunis</Option>
    <Option value="Sousse">Sousse</Option>
     <Option value="Sfax">Sfax</Option>
    <Option value="Monastir">Monastir</Option>
    </Select><br/><br/>
    <Input placeholder="Enter description" value={this.state.description} /><br/><br/>
    <TextArea placeholder="Enter Web Site Url" value={this.state.website} /><br/><br/>
      </Modal>
      <Modal title="Delete Card" visible={this.state.isModalVisiblDelete} onOk={(e) => this.handleOkDelete(this.state.id)} onCancel={this.handleCancelDelete}>
          <p>
            Are you sure that you want to delete {this.state.name}?
          </p>
     
      </Modal>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}  pagination={{ position: [this.state.bottom] }} id="cont">
      {this.state.cards.map((card, index) => {
                                    return (
                                    
                                      <Col className="gutter-row" span={6} key={index}>
                                      <Card 
                                      style={{ width: 300 }}
                                      cover={
                                        <img
                                          alt="example"
                                          src={"http://localhost:5000" + card.picture}
                                          style={{"height" : "300px", "width" : "300px"}}
                                        />
                                      }
                                      actions={[
                                        <EditOutlined key="edit" onClick={(e) => this.showModalEdit(card._id)}/>,
                                        <DeleteOutlined  key="delete" onClick={(e) => this.showModalDelete(card._id)}/>,
                                      ]}
                                    >
                                      <Meta
                                        title={card.name}
                                        description={card.description}
                                        maxLength="11"
                                      />
                                    </Card>
                                      </Col>
                               
                                  
                                     
                                    );
                                })}
                             
       </Row>

      </>
    );
  }
}

export default  Cards;


 