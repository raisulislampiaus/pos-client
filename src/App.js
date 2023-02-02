import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import "antd/dist/antd.css";
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';


import Header from './components/Header';
import Bills from './pages/Bills';
import Customers from './pages/Customers';
import CartPage from './pages/CartPage';
import Category from './pages/Category';

import UpdatePost from './pages/UpdatePost';
import Headerss from './components/Headerss';

function App(props) {
  return (
    <Router>
      {/* <Header /> */}
      <Headerss />
      <div className='container-fluid'>

        <div className='row'>

          {/* <div className='col-2 min-vh-100 bg-light '>

            <Sidebar />
          </div> */}
          <div className='col'>

            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/category">
                <Category />
              </Route>
              <Route path="/bills">
                <Bills />
              </Route>
              <Route path="/customers">
                <Customers />
              </Route>
              <Route path="/cart">
                <CartPage />
              </Route>
              
              <Route path="/product/edit/:id">
                <UpdatePost />
              </Route>
            </Switch>

          </div>
        </div>
      </div>
    </Router>
  )
}

export default App