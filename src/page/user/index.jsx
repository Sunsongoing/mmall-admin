import React from 'react';
import { Link } from 'react-router-dom';

import MUtil from 'util/currency.jsx';
import User from 'service/user-service.jsx';


const _util = new MUtil();
const _user = new User();

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1
        }
    }
    componentDidMount() {
        this.loadUserList();
    }
    loadUserList() {
        _user.getUserList(this.state.pageNum).then((res) => {
            this.setState(res);
        }, (err) => {
            this.setState({
                list: []
            })
            _util.errorTips(err);
        });
    }
    // 当页数发生变化的时候
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        });
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表" />
                <TableList tableHeads={['ID', '用户名', '邮箱', '电话', '注册时间']}>
                    {
                        this.state.list.map((u, index) => {
                            return (
                                <tr key={'user' + index}>
                                    <td>{u.id}</td>
                                    <td>{u.username}</td>
                                    <td>{u.email}</td>
                                    <td>{u.phone}</td>
                                    <td>{new Date(u.createTime).toLocaleString()}</td>
                                </tr>);
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total}
                    onChange={(pageNum) => {
                        this.onPageNumChange(pageNum);
                    }} />
            </div>
        );
    }
}

export default UserList;