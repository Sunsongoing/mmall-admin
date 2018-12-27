import React from 'react';
import { Link } from 'react-router-dom';
import MUtil from 'util/currency.jsx';
import Order from 'service/order-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import ListSearch from './index-list-search.jsx';
import Pagination from 'util/pagination/index.jsx';

const _util = new MUtil();
const _order = new Order();

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'  // list / search
        }
    }
    componentDidMount() {
        //组建加载完成时加载数据
        this.loadOrderList();
    }
    //加载订单列表
    loadOrderList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // 如果是通过搜索来查询商品列表，需要传入搜索类型和关键词
        if (this.state.listType === 'searchType') {
            listParam.orderNo = this.state.orderNumber;
        }

        _order.getOrderList(listParam).then((res) => {
            this.setState(res);
        }, (err) => {
            this.setState({ list: [] });
            _util.errTips(err);
        });
    }
    // 搜索
    onSearch(orderNumber) {
        let listType = orderNumber === '' ? 'list' : 'searchType';
        this.setState({
            listType: listType,
            pageNum: 1,
            orderNumber: orderNumber
        }, () => {
            this.loadOrderList();
        });
    }
    // 当页数发生变化的时候
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadOrderList();
        });
    }

    render() {
        let tableHeads = ['订单号', '收件人', '订单状态',
            '订单总价', '创建时间', '操作'];
        return (
            <div id="page-wrapper">
                <PageTitle title="订单列表" />
                <ListSearch onSearch={(orderNumber) => { this.onSearch(orderNumber) }} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((order, index) => {
                            return (
                                <tr key={'order' + index}>
                                    <td>
                                        <Link className="opear" to={`/order/detail/${order.orderNo}`}>
                                            {order.orderNo}
                                        </Link>
                                    </td>
                                    <td>{order.receiverName}</td>
                                    <td>{order.statusDesc}</td>
                                    <td>￥{order.payment}</td>
                                    <td>{order.createTime}</td>
                                    <td>
                                        <Link className="opear" to={`/order/detail/${order.orderNo}`}>详情&nbsp;</Link>
                                    </td>
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

export default OrderList;