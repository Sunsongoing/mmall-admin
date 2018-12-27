import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
//页面
import Home from 'page/home/index.jsx';
import ProductRoter from 'page/product/router.jsx';
import Login from 'page/login/index.jsx';
import UserList from 'page/user/index.jsx';
import OrderList from 'page/order/index.jsx';
import OrderDetail from 'page/order/detail.jsx';
import Error from 'page/error/index.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/product" component={ProductRoter} />
                    <Route path="/product-category" component={ProductRoter} />
                    <Route path="/order/index" component={OrderList} />
                    <Route path="/order/detail/:orderNumber" component={OrderDetail} />
                    <Route path="/user/index" component={UserList} />
                    <Redirect exact from="/order" to="/order/index" />
                    <Redirect exact from="/user" to="/user/index" />
                    <Route component={Error} />
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={(props) => (LayoutRouter)} />
                </Switch>
            </Router>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);


