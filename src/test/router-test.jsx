import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link,Switch} from 'react-router-dom';

class A extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>Component A Acer
            <Switch>
                {/* exact 表示完全匹配路径 */}
                <Route exact path={`${this.props.match.path}`} 
                render={()=>{ return <div>不带参数的A</div>}}/>

                {/* 既有子路径又有参数的，通配的参数要放到最后，这样可以避免冲突 */}
                <Route path={`${this.props.match.path}/(sub)`} 
                render={(route)=>{ return <div>A的子路径, 子路径是：{route.match.url}</div>}}/>
                <Route path={`${this.props.match.path}/(sub1)`} 
                render={(route)=>{ return <div>A的子路径, 子路径是：{route.match.url}</div>}}/>

                <Route path={`${this.props.match.path}/:id`} 
                render={(route)=>{ return <div>带参数的A, 参数是：{route.match.params.id}</div>}}/>
            </Switch>
        </div>;
    }
}
class B extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>Component B Bler</div>;
    }
}
class Wrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // children 是props中的保留字段，指容器组件包含的内容
        return <div>{this.props.children}</div>
    }
}


ReactDOM.render(
    <div>
        <Router>
            <Wrapper>
                <Link to="/a">组件A</Link>
                <br/>
                <Link to="/a/123">带参数的组件A</Link>
                <br/>
                <Link to="/a/sub">A的子路径 /a/sub</Link>
                <br/>
                <Link to="/a/sub1">A的子路径 /a/sub1</Link>
                <br/>
                <Link to="/b">组件B</Link>
                {/* 匹配到a路径渲染A ,/:id  表示接收参数id*/}
                <Route path="/a" component={A} />
                <Route path="/b" component={B} />
            </Wrapper>
        </Router>
    </div>,
    document.getElementById('app')
);


