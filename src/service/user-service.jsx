import MUtil from 'util/currency.jsx';

const _util = new MUtil();

class User {
    // 登录
    login(loginInfo) {
        return _util.request({
            type: 'post',
            url:_util.getServerUrl('/manage/user/login'),
            data: loginInfo
        });
    }
    // 校验登录接口数据
    checkLoginInfo(loginInfo) {
        let username = $.trim(loginInfo.username);
        let password = $.trim(loginInfo.password);
        // 判断用户名是否为空
        if (typeof username !== 'string'
            || username.length === 0) {
            return {
                status: false,
                msg: '用户名不能为空'
            }
        }
        // 判断密码是否为空
        if (typeof password !== 'string'
            || password.length === 0) {
            return {
                status: false,
                msg: '密码不能为空'
            }
        }
        return {
            status: true,
            msg: '非空验证通过'
        }
    }
    // 退出登录
    logout() {
        return _util.request({
            type: 'post',
            url:_util.getServerUrl('/user/logout'),
        });
    }
    // 获取用户列表
    getUserList(pageNum) {
        return _util.request({
            type: 'post',
            url:_util.getServerUrl('/manage/user/list'),
            data: {
                pageNum: pageNum
            }
        });
    }
}

export default User;