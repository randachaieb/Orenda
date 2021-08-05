import React from 'react';
import 'antd/dist/antd.css';
import { withRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import { Table, Tag, Space , Modal, Button,Input,Select } from 'antd';


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
    dataIndex: 'subcategory',
    render: subcategory => (
      <span>
        {subcategory.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
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
class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        bottom: 'bottomCenter',
        isModalVisible:false,
        isModalVisibleSubCategory:false,
        data : [
          {
            key: '1',
            name: 'Training centers',
            subcategory: ['lala', 'bla'],
          },
          {
            key: '2',
            name: 'Schools',
            subcategory: ['azerty'],
          },
          {
            key: '3',
            name: 'Coworking places',
            subcategory: ['aa', 'bb'],
          },
          {
            key: '4',
            name: 'Clubs',
            subcategory: ['iii'],
          },
        ],
        item: null
      };
      this.handleOk = this.handleOk.bind(this);
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
  handleChangenamesub = event => {
		this.setState({
			itemsub: event.target.value
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
      <Modal title="Add Category" visible={this.state.isModalVisible}  onOk={this.handleOk} onCancel={this.handleCancel}>
    
      <Input 
      placeholder=" category Name" 
      item={this.state.item}
			onChange={this.handleChange}/>
      
      </Modal>
  
      
      <Modal title="Add Sub-Category" visible={this.state.isModalVisibleSubCategory} onOk={this.handleOkSubCategory} onCancel={this.handleCancelSubCategory}>
      <Select defaultValue="Schools" style={{ width: "100%" }} >
      {this.state.data.map((data) => (
                                 <Option value={data.name} 	>{data.name}</Option>
                                    ))}
     
    </Select><br/><br/>
      <Input 
      itemsub={this.state.itemsub}
			onChange={this.handleChangenamesub}
      placeholder=" Sub-category Name" />
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

export default withRouter(Categories);

