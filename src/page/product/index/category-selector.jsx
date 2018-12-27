import React from 'react';

import MUtil from 'util/currency.jsx';
import Product from 'service/product-service.jsx';

const _util = new MUtil();
const _product = new Product();

import './category-selector.scss'

// 品类selector
class CategorySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        }
    }
    // 组件加载完成时加载一级分类
    componentDidMount() {
        this.loadFirstCategory();
    }
    componentWillReceiveProps(nextProps) {
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        // 如果数据没有发生变化，不做任何处理
        if (!categoryIdChange && !parentCategoryIdChange) {
            return;
        }
        // 假如只有一级品类
        if (nextProps.parentCategoryId === 0) {
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0
            });
        }
        // 有两级品类
        else {
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, () => {
                // 如果parentCategoryIdChange == true 加载二级品类
                parentCategoryIdChange && this.loadSecondCategory();
            });
        }
    }
    // 加载一级分类
    loadFirstCategory() {
        _product.getCategoryList().then((res) => {
            this.setState({
                firstCategoryList: res
            });
        }, (err) => {
            _util.errorTips(err);
        });
    }
    //  选择一级品类
    onFirstCategoryChange(e) {
        // 如果设置了只读，不处理事件
        if (this.props.readOnly) { return; }

        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId: newValue,
            // 清空上一次的二级分类
            secondCategoryId: 0,
            secondCategoryList: []
        }, () => {
            // 更新二级品类
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        });
    }
    //  选择二级品类
    onSecondCategoryChange(e) {
        // 如果设置了只读，不处理事件
        if (this.props.readOnly) { return; }
        
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId: newValue
        }, () => {
            // 将最后的categoryId传递给父组件
            this.onPropsCategoryChange();
        });
    }
    // 加载二级分类
    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then((res) => {
            this.setState({
                secondCategoryList: res
            });
        }, (err) => {
            _util.errorTips(err);
        });
    }
    // 传给父组件选中的categoryId
    onPropsCategoryChange() {
        let isFunction = typeof this.props.onCategoryChange === 'function';
        // 如果secondCategoryId不为0,表示有二级品类
        if (this.state.secondCategoryId) {
            // 传递二级分类id 和它的父id
            isFunction && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        }
        // 如果只有一级品类
        else {
            isFunction && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }
    render() {
        return (
            <div className="col-md-10">
                <select className="form-control cate-select"
                    value={this.state.firstCategoryId}
                    readOnly={this.props.readOnly}
                    onChange={(e) => { this.onFirstCategoryChange(e) }}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((category, index) => {
                            return <option value={category.id} key={index}>{category.name}</option>
                        })
                    }
                </select>
                {this.state.secondCategoryList.length ?
                    <select className="form-control cate-select"
                        value={this.state.secondCategoryId}
                        readOnly={this.props.readOnly}
                        onChange={(e) => { this.onSecondCategoryChange(e) }}>
                        <option value="">请选择二级分类</option>
                        {
                            this.state.secondCategoryList.map((category, index) => {
                                return <option value={category.id} key={index}>{category.name}</option>
                            })
                        }
                    </select> : null
                }
            </div>
        );
    }
}
export default CategorySelector;