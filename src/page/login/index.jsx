
import React from "react";
import MUtil from "util/currency.jsx";
import User from "service/user-service.jsx";

const _util = new MUtil();
const _user = new User();

import "./index.scss";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _util.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount() {
        document.title = "登录 - MMALL ADMIN";
    }
    // 当输入框发生改变
    onInputChange(e) {
        // e.target 就是dom元素
        let inputName = e.target.name,
            inputValue = e.target.value;
        this.setState({
            [inputName]: inputValue
        });
    }
    // 回车提交
    onInputKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
    }
    // 用户提交表单
    onSubmit(e) {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        },
            checkResult = _user.checkLoginInfo(loginInfo);
        // 验证通过
        if (checkResult.status) {
            _user.login(loginInfo).then((res) => {
                _util.setStorage('userInfo',res);
                //跳回登录前页面
                this.props.history.push(this.state.redirect);
            }, (err) => {
                _util.errorTips(err);
            });
        }
        // 验证不通过
        else {
            _util.errorTips(checkResult.msg);
        }

    }
    render() {
        return (
            <div>
                <div id="bg"></div>
                <div className="col-md-4 col-md-offset-4">
                    {/* 向右偏移4个位置本身占4个位置=水平居中 */}
                    <div className="panel panel-default login-panel">
                        <div className="panel-heading">
                            欢迎登录 - MMALL管理系统
                    </div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <input name="username" type="text"
                                        className="form-control"
                                        placeholder="请输入用户名"
                                        onKeyUp={(e) => this.onInputKeyUp(e)}
                                        onChange={(e) => this.onInputChange(e)} />
                                </div>
                                <div className="form-group">
                                    <input name="password" type="password"
                                        className="form-control"
                                        placeholder="请输入密码"
                                        onKeyUp={(e) => this.onInputKeyUp(e)}
                                        onChange={(e) => this.onInputChange(e)} />
                                </div>
                                <button className="btn btn-lg btn-primary btn-block"
                                    onClick={(e) => this.onSubmit(e)}>登录</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;