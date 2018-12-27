import React from 'react';
import { Link } from 'react-router-dom';

import MUtil from 'util/currency.jsx';
import Product from 'service/product-service.jsx';


const _util = new MUtil();
const _product = new Product();

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            parentCategroyId: this.props.match.params.categoryId || 0
        }
    }
    componentDidMount() {
        this.loadCategroyList();
    }
    /* 
     查看子品类时触发UI更新
     prevProps 上一个状态的props
     prevState  更新前的state
     */
    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        if (oldPath !== newPath) {
            this.setState({
                parentCategroyId: newId
            }, () => {
                this.loadCategroyList();
            });
        }

    }
    // 加载品类列表
    loadCategroyList() {
        _product.getCategoryList(this.state.parentCategroyId).then((res) => {
            this.setState({
                list: res
            });
        }, (err) => {
            this.setState({
                list: []
            })
            _util.errorTips(err);
        });
    }
    // 更新品类名称
    onUpdateName(categoryId, categoryName) {
        let newName = window.prompt('请输入新的品类名称', categoryName);
        if (newName) {
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName: newName
            }).then((res) => {
                _util.successTips(res);
                this.loadCategroyList();
            }, (err) => {
                _util.errorTips(err);
            });
        }
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>父品类ID:{this.state.parentCategroyId}</p>
                    </div>
                </div>
                <TableList tableHeads={['品类ID', '品类名称', '操作']}>
                    {
                        this.state.list.map((category, index) => {
                            return (
                                <tr key={'category' + index}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <a className="opear" onClick={(e) => { this.onUpdateName(category.id, category.name) }}>修改名称</a>
                                        {
                                            category.parentId === 0 ? <Link to={`/product-category/index/${category.id}`}>查看子品类</Link> : null
                                        }
                                    </td>
                                </tr>);
                        })
                    }
                </TableList>
            </div>
        );
    }
}

export default CategoryList;