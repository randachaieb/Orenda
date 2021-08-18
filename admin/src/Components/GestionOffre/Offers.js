import React from 'react';
import 'antd/dist/antd.css';
import { withRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import { Table, Tag, Space , Modal, Button,Input,Select } from 'antd';
import axios from 'axios'

const columns = [
  {
    title: ' Category Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'sub-category',
    key: 'subcategory',
    dataIndex: 'subCategory',
    render: subcategory => (
      <span>
    {subcategory?subcategory.map(tag => {
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
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Update</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const { Option } = Select;
class Offers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        bottom: 'bottomCenter',
        isModalVisible:false,
        isModalVisibleSubCategory:false,
        data : [],
        item: null
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
    
      
	handleChange = event => {
		this.setState({
			item: event.target.value
		})
	}
  formSubmit(event) {
    event.preventDefault();
    const formData = {
      name: this.state.item
    }

    axios.post('http://localhost:5000/api/v1/categories/OfferCategory',formData)
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
  
    axios.post('http://localhost:5000/api/v1/categories/offers/'+this.state.category+'/subCategory',formData)
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
  axios.get('http://localhost:5000/api/v1/categories/offerCategories')
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
        <Table
          columns={columns}
          pagination={{ position: [this.state.bottom] }}
          dataSource={this.state.data}
        />
      </div>
    );
  }
}

export default withRouter(Offers);

