import React from 'react';

import MUtil from 'util/currency.jsx';
import Product from 'service/product-service.jsx';
import PageTitle from 'component/page-title/index.jsx';
import FormInput from './form-input.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader from 'util/file-upload/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import './save.scss';

const _util = new MUtil();
const _product = new Product();


class PorductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            subtitle: '',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: '',
            stock: '',
            detail: '',
            status: 1 //商品状态 1--在售
        }
    }
    componentDidMount() {
        this.loadProduct();
    }
    // 加载商品详情
    loadProduct() {
        let productId = this.state.id;
        // 有id的时候，表示是编辑功能，需要表单回填
        if (productId) {
            _product.getProduct(productId).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                res.defaultDetail = res.detail;
                this.setState(res);
            }, (err) => {
                _util.errorTips(err);
            });
        }
    }
    // 品类选择器的变化
    onCategoryChange(categoryId, parentCategoryId) {
        this.setState({
            categoryId: categoryId,
            parentCategoryId: parentCategoryId
        });
    }
    // 上传图片成功
    onUploadSuccess(res) {
        let img = this.state.subImages;
        img.push(res);
        this.setState({
            subImages: img
        });
    }
    // 上传图片失败
    onUploadError(err) {
        _util.errorTips(err);
    }
    //  删除图片
    onImgDelete(e) {
        let index = parseInt(e.target.getAttribute('index')),
            imgs = this.state.subImages;
        // 删除对应下标的图片
        imgs.splice(index, 1);
        this.setState({
            subImages: imgs
        })
    }
    // 富文本编辑器的变化
    onDetailValueChange(value) {
        this.setState({
            detail: value
        });
    }
    // 输入框值发生改变时,---名称，描述，库存，价格
    onValueChange(e) {
        let value = e.target.value.trim(),
            name = e.target.name;
        this.setState({
            [name]: value
        });
    }
    // 将subimage转换成与后台接口对应的字符串
    getSubImagesString() {
        return this.state.subImages.map((image) => { return image.uri }).join(",");
    }
    //  提交表单
    onSubmit(e) {
        let product = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            categoryId: parseInt(this.state.categoryId),
            subImages: this.getSubImagesString(),
            detail: this.state.detail,
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            status: this.state.status
        },
            productCheckResult = _product.checkProduct(product);
        // 修改需要将id传递到后台
        if (this.state.id) {
            product.id = this.state.id;
        }
        // 表单验证成功
        if (productCheckResult.status) {
            _product.saveProduct(product).then((res) => {
                _util.successTips(res);
                this.props.history.push('/product/index');
            }, (err) => {
                _util.errorTips(err);
            });
        }
        // 表单验证失败
        else {
            _util.errorTips(productCheckResult.msg);
        }
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? "编辑商品" : "添加商品"} />
                <div className="form-horizontal">

                    <FormInput type="normal" labelName="商品名称" width="col-md-5"
                        onValueChange={(e) => { this.onValueChange(e) }}
                        name="name"
                        value={this.state.name}
                        placeholder="商品名称" />
                    <FormInput type="normal" labelName="商品描述" width="col-md-5"
                        onValueChange={(e) => { this.onValueChange(e) }}
                        name="subtitle"
                        value={this.state.subtitle}
                        placeholder="商品描述" />
                    <FormInput type="addon-suffix" labelName="商品价格" width="col-md-3"
                        onValueChange={(e) => { this.onValueChange(e) }}
                        name="price"
                        value={this.state.price}
                        placeholder="价格" addonSuffix="元" />
                    <FormInput type="addon-suffix" labelName="商品库存" width="col-md-3"
                        onValueChange={(e) => { this.onValueChange(e) }}
                        name="stock"
                        value={this.state.stock}
                        placeholder="库存" addonSuffix="件" />

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品分类</label>
                        <CategorySelector
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={(categoryId, parentCategoryId) => { this.onCategoryChange(categoryId, parentCategoryId) }} />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length > 0 ? this.state.subImages.map((img, index) => {
                                    return <div className="img-con" key={index}>
                                        <img className="img" src={img.url} />
                                        <i className="fa fa-close" index={index} onClick={(e) => { this.onImgDelete(e) }}></i>
                                    </div>
                                }) : <div>请上传图片</div>
                            }
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUploader onSuccess={(res) => { this.onUploadSuccess(res) }}
                                onError={(err) => { this.onUploadError(err) }} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <RichEditor
                                defaultDetail={this.state.defaultDetail}
                                onValueChange={(value) => {
                                    this.onDetailValueChange(value)
                                }} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button className="btn btn-primary"
                                onClick={(e) => { this.onSubmit(e) }}>提交</button>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}


export default PorductSave;

