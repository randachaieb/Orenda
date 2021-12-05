import React from 'react';
import 'antd/dist/antd.css';
import { withRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import {  Tag, Space , Modal, Button,Input,Select } from 'antd';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const { Option } = Select;
class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        bottom: 'bottomCenter',
        isModalVisible:false,
        isModalVisiblEdit:false,
        isModalVisiblDelete:false,
        isModalVisibleSubCategory:false,
        data : [],
        name: null,
        category:'choose',
        itemsub:null,
       page:0,
       namee:null,
        rowsPerPage:10
      };
      this.handleChange=this.handleChange.bind(this);
      this.handleChangeCategory=this.handleChangeCategory.bind(this);
      this.handleChangenamesub=this.handleChangenamesub.bind(this);
      this.formSubmit = this.formSubmit.bind(this);
      this.formSubmitSub = this.formSubmitSub.bind(this);
      this.handleOkSubCategory = this.handleOkSubCategory.bind(this);
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
      showModalDelete  = (event) => {
        axios.get('/api/v1/categories/PlacesCategoriesid/' + event)
            .then(response => {
              console.log(response.data);
                this.setState({
                  id:event,
                    name: response.data.place.name,
                    isModalVisiblDelete:true
                })
                console.log(response.data+event);
            })
            .catch((error) => {
                console.log(error);
            })
 
     
    };
    handleOkDelete  = (event) => {
      axios.delete("/api/v1/categories/delete",
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
        axios.get('/api/v1/categories/PlacesCategoriesid/' + event)
        .then(response => {
          console.log(response.data);
            this.setState({
              id:event,
                namee: response.data.place.name,
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
  
    axios.patch('/api/v1/categories/updatePlace/'+event,formData)
        .then(res => {
            console.log(res.data)
      
        });
    
      this.setState({isModalVisiblEdit:false})
    };
    
   handleCancelEdit = () => {
     this.setState({isModalVisiblEdit:false})
    };
     handleOkSubCategory  = () => {
       var t= 0
            const newList = this.state.data.map((item) => {
      
          const updatedItem = {
            key: t+1,
            name: this.state.name,
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
    
      
	handleChange (e) {
    this.setState({
      name: e.target.value
    })
}
  handleChangenamesub = event => {
		this.setState({
			itemsub: event.target.value
		})
	}
  handleChangeCategory= event => {
    this.setState({category: event.target.value});
}
	
  formSubmit(event) {
    event.preventDefault();
    const formData = {
      name: this.state.name,
      count: 0
    }

    axios.post('/api/v1/categories/placeCategory',formData)
        .then(res => {
            console.log(res.data)
      
        });
    this.setState({isModalVisible:false})
}
formSubmitSub(event) {
  event.preventDefault();
  const formData = {
    name: this.state.itemsub
  }

  axios.post('/api/v1/categories/places/'+this.state.category+'/subCategory',formData)
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
axios.get('/api/v1/categories/PlacesCategories')
    .then(response => {
        if (response.data.length > 0) {
            this.setState({
              data:response.data
            })
        }
    })
}
 handleChangePage = (event, newPage) => {
   this.setState({
  page:newPage
})
  
};

 handleChangeRowsPerPage = (event) => {
  this.setState({
    rowsPerPage:+event.target.value,
    page:0
  })
};
handleChangenamee = event => {
  this.setState({
    namee: event.target.value
  })
}
  render() {
    return (

        <div>
            <Space size="middle">
      <Button type="default" onClick={this.showModal}>
      Add Category of place
      </Button>
      <Button type="default" onClick={this.showModalSubCategory}>
      Add Sub-Category
      </Button>
      </Space>
      <br/><br/>
      <Modal title="Add Category" visible={this.state.isModalVisible}     
    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="schedule" type="submit" onClick={this.formSubmit}>Add</Button>
                      ]}  onCancel={this.handleCancel}>
    <form onSubmit={this.formSubmit}>
      <Input 
      placeholder=" category Name" 
      id="Name"
			onChange={this.handleChange}/>
      </form>
      </Modal>
  
      <Modal title="Edit place" visible={this.state.isModalVisiblEdit} onOk={(e) =>this.handleOkEdit(this.state.id)} onCancel={this.handleCancelEdit}>
      <Input placeholder="Name" onChange={this.handleChangenamee} value={this.state.namee} /><br/><br/>

      </Modal>
     
      <Modal title="Add Sub-Category" visible={this.state.isModalVisibleSubCategory}  footer={[
                        <Button key="cancel" onClick={this.handleCancelSubCategory}>
                            Cancel
                        </Button>,
                        <Button key="schedule" type="submit" onClick={this.formSubmitSub}>Add</Button>
                      ]} onCancel={this.handleCancelSubCategory}>
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
      <Modal title="Delete place" visible={this.state.isModalVisiblDelete} onOk={(e) => this.handleOkDelete(this.state.id)} onCancel={this.handleCancelDelete}>
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

export default withRouter(Categories);

