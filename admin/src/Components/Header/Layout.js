import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import './index.css';
import { SmileOutlined,UnorderedListOutlined,ReconciliationOutlined} from '@ant-design/icons';
import Categories from '../GestionCategorie/Categories';
import Offers from '../GestionOffre/Offers';
import Cards from '../GestionCards/Cards';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class LayoutAdmin extends Component {

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }}>

                    <Sider
		theme="light"
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}>
                           <div className="logo" ><h1 className="navbar-brand mb-0 h1">ORENDA</h1></div>
                        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                            <ReconciliationOutlined />
                                <span>Places</span>
                                <Link to="/Categories" />
                            </Menu.Item>
                            <Menu.Item key="2">
                            <ReconciliationOutlined />
                                <span>Offers</span>
                                <Link to="/Offers" />
                            </Menu.Item>
                            <Menu.Item key="3">
                            <ReconciliationOutlined />
                                <span>Cards</span>
                                <Link to="/Cards" />
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
                        <UnorderedListOutlined 
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                style={{ cursor: 'pointer' }}
                                onClick={this.toggle}
                            />
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Route exact path="/Categories" component={Categories} />
                            <Route path="/Offers" component={Offers} />
                            <Route path="/Cards" component={Cards} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                          footerrr
                        </Footer>
                    </Layout>

                </Layout>
            </Router>
        );
    }
}


export default LayoutAdmin;