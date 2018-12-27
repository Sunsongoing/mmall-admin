import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import './index.scss';

// react 组件
//ES6形式
// class ES6Component extends React.Component {
//     constructor(props) {
//         //要使用this 必须调用父类的super方法获取this指针
//         super(props);
//         this.state = {
//             name: '我靠 牛逼啊',
//             age: 18
//         };
//     }
//     //父组件向子组件传参，props 是只读的
//     // constructor(props) {
//     //     //要使用this 必须调用父类的super方法获取this指针
//     //     super(props);
//     //     this.state = {
//     //         name: '我靠 牛逼啊'
//     //     };
//     // }
//     handleClick() {
//         this.setState({
//             name: 'sedog',
//             age: this.state.age += 1
//         });
//     }
//     onValueChange(e) {
//         this.setState({
//             age: e.target.value
//         })
//     }
//     onFocusw(e) {
//         console.log(e);
//     }
//     render() {
//         setTimeout(() => {
//             //改变组件的方法
//             this.setState({
//                 name: '小姐姐，我想'
//             });
//         }, 2000);
//         return <div className="fa fa-user">{this.state.name}
//             <p>{this.state.age}</p>
//             <button onClick={(e) => { this.handleClick(e) }}>喜加一</button>
//             <input type="text" onChange={(e) => { this.onValueChange(e) }} onFocus={(e) => { this.onFocusw(e) }} />
//         </div>;
//     }
// }

class LifeCiycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'Old state'
        }
        console.log('constructor');
    }
    // 组件将要加载
    componentWillMount() {
        console.log('componentWillMount,即将挂载');
    }
    // 组件加载完成
    componentDidMount() {
        console.log('componentWillMount,挂载完成,渲染完成');
    }
    // 将要接收父组件props
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps,将要接收父组件props');
    }
    // 判断子组件是否应该更新
    shouldComponentUpdate() {
        //默认return true
        console.log('shouldComponentUpdate,子组件是否应该更新');
        return true;
    }
    // 组件将要更新
    componentWillUpdate() {
        console.log('componentWillUpdate,组件将要更新');
    }
    // 组建更新完成
    componentDidUpdate() {
        console.log('componentDidUpdate,组件更新完成');
    }
    // 组件将要销毁
    componentWillUnmount() {
        console.log('componentWillUnmount,组件将要销毁')
    }
    // 处理点击事件
    handleClick() {
        this.setState({
            data: 'New state'
        })
    }
    // 渲染
    render() {
        console.log('render');
        return (
            <div>
                <div>{this.state.data}</div>
                <button onClick={() => { this.handleClick() }}>更新组件</button>
            </div>
        );
    }
}

class Child extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick() {
        console.log(this.props.color)
        this.props.changeColor('#' + this.RndNum(6));
        this.props.changeChildColor('#' + this.RndNum(6));
    }
    //取随机数
    RndNum(n) {
        var rnd = "";
        for (var i = 0; i < n; i++)
            rnd += Math.floor(Math.random() * 10);
        return rnd;
    }
    render() {
        return (<div style={{ color: this.props.color }}>
            <h1>我每天都练功，我天下无敌</h1>
            <button onClick={(e) => { this.handleClick(e) }}>修改父元素背景颜色</button>
        </div>);
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bgColor: 'red',
            childColor: '#fff'
        }
    }
    onBgColorChange(color) {
        this.setState({
            bgColor: color
        });
    }
    onChildColorChange(color) {
        this.setState({
            childColor: color
        });
    }
    render() {
        return (
            <div style={{ background: this.state.bgColor }}>
                {/* <Title>
                    <span style={{ background: this.state.bgColor }}>我每天都练功，我天下无敌</span>
                </Title> */}
                {/* <ES6Component /> */}
                <Child
                    color={this.state.childColor}
                    bgColor={this.state.bgColor}
                    changeChildColor={(color) => this.onChildColorChange(color)}
                    changeColor={(color) => this.onBgColorChange(color)} />
                <Child
                    color={this.state.childColor}
                    bgColor={this.state.bgColor}
                    changeChildColor={(color) => this.onChildColorChange(color)}
                    changeColor={(color) => this.onBgColorChange(color)} />
            </div>
        );
    }
}
ReactDOM.render(
    <div>
        <App />
        <LifeCiycle />
    </div>,
    document.getElementById('app')
);


