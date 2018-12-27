import MUtil from 'util/currency.jsx';

const _util = new MUtil();

class Order {
    // 获取商品列表
    getOrderList(listParam) {
        let url = '',
            data = {};
        if (listParam.listType === 'list') {
            url = '/manage/order/list';
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType === 'searchType') {
            url = '/manage/order/search';
            data.pageNum = listParam.pageNum;
            data.orderNo = listParam.orderNo;
        }
        return _util.request({
            type: 'post',
            data: data,
            url: url
        });
    }
    // 获取订单详情
    getOrder(orderNo) {
        return _util.request({
            type: 'post',
            data: {
                orderNo: orderNo
            },
            url: "/manage/order/detail"
        });
    }
    // 订单发货
    sendGoods(orderNo) {
        return _util.request({
            type: 'post',
            data: {
                orderNo: orderNo
            },
            url: "/manage/order/send_goods"
        });
    }

}

export default Order;