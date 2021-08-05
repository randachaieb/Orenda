
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LayoutAdmin from './Components/Header/Layout'
import {  Spin, Space  } from 'antd';
import Categories from './Components/GestionCategorie/Categories';
import Offers from './Components/GestionOffre/Offers';
import Cards from './Components/GestionCards/Cards';
class App extends React.Component {
  _isMounted = false;

  constructor() {
    super()
    this.state = {
      isloading: true,
      connected: true
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isloading: false
      })
    }, 3000)
  }
  render() {
  return (
    <div>
        {this.state.isloading ?

          <Space size="middle"
          style={{
            position: "fixed",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
          >
    <Spin size="large" />
  </Space>
          :
          <Router>
          <div>

            <Switch>
              <Route path='/' exact component={LayoutAdmin} />
              <LayoutAdmin/>
              <Route path="/Categories" component={Categories} />
              <Route path="/Offres" component={Offers} />
              <Route path="/Cards" component={Cards} />
            </Switch>
          </div>
        </Router>
          }
  </div>
  );
}
}

export default App;
