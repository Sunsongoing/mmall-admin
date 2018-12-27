import MUtil from 'util/currency.jsx';

const _util = new MUtil();

class Product {
    // 获取商品列表
    getProductList(listParam) {
        let url = '',
            data = {};
        if (listParam.listType === 'list') {
            url = _util.getServerUrl('/manage/product/list');
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType === 'searchType') {
            url = _util.getServerUrl('/manage/product/search');
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.keyword;
        }
        return _util.request({
            type: 'post',
            data: data,
            url: url
        });
    }
    // 获取商品详情
    getProduct(productId) {
        return _util.request({
            type: 'post',
            url: _util.getServerUrl('/manage/product/detail'),
            data: {
                productId: productId || 0
            }
        });
    }
    // 修改商品状态
    setSaleStatus(produtInfo) {
        return _util.request({
            type: 'post',
            data: produtInfo,
            url: _util.getServerUrl('/manage/product/set_sale_status'),
        });
    }
    // 检查保存商品表单的数据
    checkProduct(product) {
        let result = {
            status: true,
            msg: "验证通过"
        }
        if (typeof product.name !== 'string'
            || product.name.length === 0) {
            return {
                status: false,
                msg: '商品名不能为空'
            }
        }
        if (typeof product.subtitle !== 'string'
            || product.subtitle.length === 0) {
            return {
                status: false,
                msg: '商品描述不能为空'
            }
        }
        if (typeof product.price !== 'number'
            || !(product.price >= 0)) {
            return {
                status: false,
                msg: '请输入正确的商品价格'
            }
        }
        if (typeof product.stock !== 'number'
            || !(product.stock >= 0)) {
            return {
                status: false,
                msg: '请输入正确的库存数量'
            }
        }
        if (typeof product.categoryId !== 'number'
            || !(product.categoryId > 0)) {
            return {
                status: false,
                msg: '请输入选择商品品类'
            }
        }
        return result;
    }
    // 新建商品
    saveProduct(product) {
        return _util.request({
            type: 'post',
            data: product,
            url: _util.getServerUrl('/manage/product/product_save'),
        });
    }
    //==================== 商品品类相关================
    //根据父品类ID 获取商品品类列表，默认categoryId是0（根节点）
    getCategoryList(parentCategoryId) {
        return _util.request({
            type: 'get',
            data: {
                categoryId: parentCategoryId
            },
            url: _util.getServerUrl('/manage/category/get_category'),
        });
    }
    // 修改品类名称
    updateCategoryName(categoryInfo) {
        return _util.request({
            type: 'post',
            data: categoryInfo,
            url: _util.getServerUrl('/manage/category/set_category_name')
        });
    }
    // 添加品类
    saveCategory(category) {
        return _util.request({
            type: 'post',
            data: category,
            url: _util.getServerUrl('/manage/category/add_category')
        });
    }
}

export default Product;