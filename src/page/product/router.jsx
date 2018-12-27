import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

//页面
import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from 'page/product/index/detail.jsx';
import CategoryList from 'page/product/category/index.jsx';
import CategoryAdd from 'page/product/category/add.jsx';

class PorductRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                {/* 问号表示参数是可选的，不是必须的 */}
                <Route path="/product/save/:id?" component={ProductSave} />
                <Route path="/product/detail/:id" component={ProductDetail} />
                <Route path="/product-category/index/:categoryId?" component={CategoryList} />
                <Route path="/product-category/add" component={CategoryAdd} />

                <Redirect exact from="/product" to="/product/index" />
                <Redirect exact from="/product-category" to="/product-category/index" />
            </Switch>
        );
    }
}


export default PorductRouter;

