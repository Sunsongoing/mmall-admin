import React from 'react';
import { Link ,withRouter} from 'react-router-dom';
import MUtil from 'util/currency.jsx';
import User from 'service/user-service.jsx';

const _util = new MUtil();
const _user = new User();
class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: _util.getStorage('userInfo').username || ''
        }
    }
    //退出登录
    onLogout() {
        _user.logout().then((res) => {
            _util.removeStorage('userInfo');
            // 退出登录后跳转到登录页
            this.props.history.push('/login');
        }, (err) => {
            _util.errorTips(err);
        });
    }
    render() {
       return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>HAPPYE</b>MMALL</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;" aria-expanded="false">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username
                                    ?
                                    <span>欢迎，{this.state.username}</span>
                                    :
                                    <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            {/* <li className="divider"></li> 线*/}
                            <li>
                                <a onClick={() => { this.onLogout() }}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
       );
    }
}
// withRouter 可以包装任何自定义组件，将react-router 的 history，location，match 三个对象传入
// 无需一级级的传递react-router
export default withRouter(TopNav);