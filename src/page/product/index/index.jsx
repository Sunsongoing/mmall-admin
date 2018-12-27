import React from 'react';
import { Link } from 'react-router-dom';

import MUtil from 'util/currency.jsx';
import Product from 'service/product-service.jsx';

import './index.scss';

const _util = new MUtil();
const _product = new Product();

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import ListSearch from './index-list-search.jsx';
import Pagination from 'util/pagination/index.jsx';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'   // list /searchType
        }
    }
    componentDidMount() {
        this.loadProductList();
    }
    // 加载商品列表
    loadProductList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // 如果是通过搜索来查询商品列表，需要传入搜索类型和关键词
        if (this.state.listType === 'searchType') {
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }

        _product.getProductList(listParam).then((res) => {
            this.setState(res);
        }, (err) => {
            this.setState({
                list: []
            })
            _util.errorTips(err);
        });
    }
    // 搜索
    onSearch(searchType, searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'searchType';
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadProductList();
        });
    }
    // 当页数发生变化的时候
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadProductList();
        });
    }
    // 改变商品状态 上架 / 下架
    onSetProductStatus(e, productId, currentStatus) {
        let newStatus = currentStatus === 1 ? 2 : 1,
            confirmTips = currentStatus === 1 ?
                '确定要下架该商品吗?' : '确定要上架该商品吗';
        if (window.confirm(confirmTips)) {
            _product.setSaleStatus({
                productId: productId,
                status: newStatus
            }).then((res) => {
                _util.successTips(res);
                this.loadProductList();
            }, (err) => {
                _util.errorTips(err);
            });
        }
    }
    render() {
        let tableHeads = [
            { name: '商品ID', width: '10%' },
            { name: '商品信息', width: '50%' },
            { name: '价格', width: '10%' },
            { name: '状态', width: '15%' },
            { name: '操作', width: '15%' },
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType, searchKeyword) => { this.onSearch(searchType, searchKeyword) }} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={'product' + index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>￥{product.price}</td>
                                    <td>
                                        <p>
                                            {product.status === 1 ? "在售" : "已下架"}
                                        </p>
                                        <button onClick={(e) => { this.onSetProductStatus(e, product.id, product.status) }}
                                            className="btn btn-xs btn-warning">
                                            {product.status === 1 ? "下架" : "上架"}
                                        </button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={`/product/detail/${product.id}`}>详情&nbsp;</Link>
                                        <Link className="opear" to={`/product/save/${product.id}`}>&nbsp;编辑</Link>
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

export default ProductList;