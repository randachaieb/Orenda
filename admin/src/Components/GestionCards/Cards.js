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

    state = {
        bottom: 'bottomCenter',
        isModalVisible:false,
        isModalVisiblEdit:false,
        isModalVisiblDelete:false,
        id:null,
        data: [],
        name:null,
        place : null,
        description:null,
        website:null,
        subcategoryOffers:null,
        subcategory:null
      };
     showModal = () => {
        this.setState({isModalVisible:true})
      };
      
     handleOk  = () => {
        this.setState({isModalVisible:false})
      };
      
     handleCancel = () => {
       this.setState({isModalVisible:false})
      };

      showModalEdit  = (event) => {
          axios.get('/api/v1/card/' + event)
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
          axios.get('/api/v1/card/' + event)
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
      handlechangeOffer = () => {
        this.setState({
          subcategoryOffers:true
        })
      }
      handlechangecategory = () => {
        this.setState({
          subcategory:true
        })
      }
     handleOkDelete  = (event) => {
      axios.delete("/api/v1/card/delete/",
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
      axios.get('/api/v1/card/all/')
          .then(response => {
              if (response.data.length > 0) {
                  this.setState({
                    data: response.data.map(user => user),
                  })
              }
          })
  }
  render() {
    return (
      <>
    <Button type="default" onClick={this.showModal}>
      Add Card
      </Button><br/><br/>
      <Modal title="Add Card" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
      <Input placeholder="Title" /><br/><br/>
      <Input placeholder="Image" type='file' /><br/><br/>
      <Select defaultValue="select category" style={{ width: "100%" }} onChange={this.handlechangecategory}>
      <Option value="Training centers">Training centers</Option>
      <Option value="Schools">Schools</Option>
      <Option value="Coworking places">Coworking places</Option>
      <Option value="Clubs">Clubs</Option>
    </Select><br/><br/>
    {  this.state.subcategory?
    <div>
 <Select defaultValue="choose sub category" style={{ width: "100%" }} >
 <Option value="Scholarships">ss</Option>
 <Option value="Job offers">Jj</Option>
 <Option value="Competitions">cc</Option>
 <Option value="Events">ee</Option>
 </Select>
   <br/><br/>
   </div>
 :''
    }
    <Select defaultValue="Select Offer" style={{ width: "100%" }} onChange={this.handlechangeOffer}>
    <Option value="Scholarships">Scholarships</Option>
    <Option value="Job offers">Job offers</Option>
    <Option value="Competitions">Competitions</Option>
    <Option value="Events">Events</Option>
    </Select><br/><br/>
    {  this.state.subcategoryOffers?
    <div>
 <Select defaultValue="choose sub " style={{ width: "100%" }} >
 <Option value="Scholarships">ss</Option>
 <Option value="Job offers">Jj</Option>
 <Option value="Competitions">cc</Option>
 <Option value="Events">ee</Option>
 </Select>
   <br/><br/>
   </div>
 :''
    }
    <Select defaultValue="Sousse" style={{ width: "100%" }} >
    <Option value="Tunis">Tunis</Option>
    <Option value="Sousse">Sousse</Option>
     <Option value="Sfax">Sfax</Option>
    <Option value="Monastir">Monastir</Option>
    </Select><br/><br/>
    <Input placeholder="Enter description"  /><br/><br/>
    <TextArea placeholder="Enter Web Site Url"  /><br/><br/>
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
      {this.state.data.map((card, index) => {
                                    return (
                                    
                                      <Col className="gutter-row" span={6} key={index}>
                                      <Card 
                                      style={{ width: 300 }}
                                      cover={
                                        <img
                                          alt="example"
                                          src={"/" +card.picture}
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


 