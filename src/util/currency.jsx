

class MUtil {
    //统一的网络请求
    request(param) {
        var _this = this;
        return new Promise((resovle, reject) => {
            $.ajax({
                type: param.type || 'post',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success(res) {
                    // 数据请求成功
                    if (0 === res.status) {
                        typeof resovle === 'function' && resovle(res.data, res.msg);
                    }
                    // 需要登录
                    else if (10 === res.status) {
                        _this.doLogin();
                    }
                    // 数据请求失败
                    else {
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                }, error(err) {
                    typeof reject === 'function' && reject(err.statusText);
                }
            })
        });
    }
    // 跳转登录
    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    //获取服务器地址
    getServerUrl(path) {
        return "/mmall" + path;
    }
    // 获取url参数
    getUrlParam() {
        // param=123&param1=222
        let queryString = window.location.search.split('?')[1] || '';
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let result = queryString.match(reg);
        return result ? decodeURIComponent(reulst[2]) : null;
    }
    // 错误提示
    errorTips(err) {
        alert(err || '出错了');
    }
    // 成功提示
    successTips(msg) {
        alert(msg || '操作成功');
    }
    // 本地存储
    setStorage(name, data) {
        let dataType = typeof data;
        // json 对象
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型
        else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
            window.localStorage.setItem(name, data);
        }
        else {
            alert('该类型不支持本地存储');
        }
    }
    // 取本地存储
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data);
        } else {
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name) {
        window.localStorage.removeItem(name);
    }
}
export default MUtil;