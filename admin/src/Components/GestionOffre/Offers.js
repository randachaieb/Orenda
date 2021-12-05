import React from 'react';
import 'antd/dist/antd.css';
import { withRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import { Tag, Space , Modal, Button,Input,Select } from 'antd';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const { Option } = Select;
class Offers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        bottom: 'bottomCenter',
        isModalVisible:false,
        isModalVisibleSubCategory:false,
        isModalVisiblEdit:false,
        isModalVisiblDelete:false,
        data : [],
        item: null,
        namee:null
      };
      this.handleOk = this.handleOk.bind(this);
      this.handleOkSubCategory = this.handleOkSubCategory.bind(this);
      this.formSubmit = this.formSubmit.bind(this);
      this.formSubmitSub = this.formSubmitSub.bind(this);
    }
     showModal = () => {
        this.setState({isModalVisible:true})
      };
      
      handleOk  = () => {
        console.log(this.state.item)
        const newItem =
        {
          key: this.state.data.length+1,
          name: this.state.item,
          subcategory: [],
          category:'choose', 
          itemsub:null

        }
        
        const updatedItems = [...this.state.data, newItem]
    
          this.setState({
            data: updatedItems
          })
        console.log(updatedItems)
          this.setState({isModalVisible:false})
        };
      
     handleCancel = () => {
       this.setState({isModalVisible:false})
      };
      showModalSubCategory = () => {
        this.setState({isModalVisibleSubCategory:true})
      };
      
     handleOkSubCategory  = () => {
       var t= 0
            const newList = this.state.data.map((item) => {
      
          const updatedItem = {
            key: t+1,
            name: this.state.item,
            subcategory: [this.state.itemsub],
         
   
        
          
        }
       
      
      });
      this.setState({
        data: newList
      })
        this.setState({isModalVisibleSubCategory:false})

      };
      
     handleCancelSubCategory = () => {
       this.setState({isModalVisibleSubCategory:false})
      };
    
      showModalDelete  = (event) => {
        axios.get('/api/v1/categories/offerCategoriesid/' + event)
            .then(response => {
              console.log(response.data);
                this.setState({
                  id:event,
                    name: response.data.offer.name,
                    isModalVisiblDelete:true
                })
                console.log(response.data+event);
            })
            .catch((error) => {
                console.log(error);
            })
 
     
    };
    handleOkDelete  = (event) => {
      axios.delete("/api/v1/categories/deleteOffer",
      {
 data: {"id": event }
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
      showModalEdit  = (event) => {
        axios.get('/api/v1/categories/offerCategoriesid/' + event)
        .then(response => {
          console.log(response.data);
            this.setState({
              id:event,
              namee: response.data.offer.name,
                isModalVisiblEdit:true
            })
            console.log(response.data+event);
        })
        .catch((error) => {
            console.log(error);
        })
    };
    
   handleOkEdit  = (event) => {
    const formData = {
      name: this.state.namee
    }
  
    axios.patch('/api/v1/categories/updateOffer/'+event,formData)
        .then(res => {
            console.log(res.data)
      
        });
      this.setState({isModalVisiblEdit:false})
    };
    
   handleCancelEdit = () => {
     this.setState({isModalVisiblEdit:false})
    }; 
	handleChange = event => {
		this.setState({
			item: event.target.value
		})
	}
  handleChangenamee = event => {
		this.setState({
			namee: event.target.value
		})
	}
  formSubmit(event) {
    event.preventDefault();
    const formData = {
      name: this.state.item,
      count: 0
    }

    axios.post('/api/v1/categories/OfferCategory',formData)
        .then(res => {
            console.log(res.data)
      
        });
    this.setState({isModalVisible:false})
}
  handleChangenamesub = event => {
		this.setState({
			itemsub: event.target.value
		})
	}
  formSubmitSub(event) {
    event.preventDefault();
    const formData = {
      name: this.state.itemsub
    }
  
    axios.post('/api/v1/categories/offers/'+this.state.category+'/subCategory',formData)
        .then(res => {
            console.log(res.data)
      
        });
    this.setState({isModalVisibleSubCategory:false})
  }
  componentDidMount() {
    // need to make the initial call to getData() to populate
    // data right away
    this.getData();
    // Now we need to make it run at a specified interval
    setInterval(this.getData, 1000); // runs every 1 second.
  }
  getData = () => {
  axios.get('/api/v1/categories/offerCategories')
      .then(response => {
          if (response.data.length > 0) {
              this.setState({
                data:response.data
              })
          }
      })
  }
  render() {
    return (

        <div>
           <Space size="middle">
      <Button type="default" onClick={this.showModal}>
      Add Category of Offers
      </Button>
      <Button type="default" onClick={this.showModalSubCategory}>
      Add Sub-Category
      </Button>
      </Space>  <br/><br/>
      <Modal title="Add Category" visible={this.state.isModalVisible}  footer={[
                        <Button key="cancel" onClick={this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="schedule" type="submit" onClick={this.formSubmit}>Add</Button>
                      ]} onCancel={this.handleCancel}>
     <form onSubmit={this.formSubmit}>
      <Input 
      placeholder=" category Name" 
      item={this.state.item}
			onChange={this.handleChange}/>
      </form>
      </Modal>
     
      
      <Modal title="Add Sub-Category" visible={this.state.isModalVisibleSubCategory} footer={[
                        <Button key="cancel" onClick={this.handleCancelSubCategory}>
                            Cancel
                        </Button>,
                        <Button key="schedule" type="submit" onClick={this.formSubmitSub}>Add</Button>
                      ]}  onCancel={this.handleCancelSubCategory}>
      <form onSubmit={this.formSubmitSub}>
      <Select  style={{ width: "100%" }} onChange={e =>  this.setState({category: e})} value={this.state.category}>
      {this.state.data.map((data) => (
                                 <Option key={data._id}  value={data._id} 	>{data.name}</Option>
                                    ))}
     
    </Select><br/><br/>
      <Input 
      itemsub={this.state.itemsub}
			onChange={this.handleChangenamesub}
      placeholder=" Sub-category Name" />
      </form>
      </Modal>
      <Modal title="Edit Offer" visible={this.state.isModalVisiblEdit} onOk={(e) =>this.handleOkEdit(this.state.id)} onCancel={this.handleCancelEdit}>
      <Input placeholder="Name" 	onChange={this.handleChangenamee} value={this.state.namee} /><br/><br/>

      </Modal>
      <Modal title="Delete Offer" visible={this.state.isModalVisiblDelete} onOk={(e) => this.handleOkDelete(this.state.id)} onCancel={this.handleCancelDelete}>
          <p>
            Are you sure that you want to delete {this.state.name}?
          </p>
     
      </Modal>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell>
                  Category Name
                </TableCell>
                <TableCell>
                Sub-category
                </TableCell>
                <TableCell>
                Action
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">  <span>
             
    {row.subCategory?row.subCategory.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.name}
            </Tag>
          );
        }):'None'}
      </span></TableCell>
              <TableCell align="left">
              <Space size="middle">
                                        <EditOutlined key="edit" onClick={(e) => this.showModalEdit(row._id)}/>
                                        <DeleteOutlined  key="delete" onClick={(e) => this.showModalDelete(row._id)}/>
                          
      </Space>
                </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
  }
}

export default withRouter(Offers);

