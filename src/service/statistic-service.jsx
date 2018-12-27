import MUtil from 'util/currency.jsx';

const _util = new MUtil();

class Statistic {
    // 首页数据统计
    getHomeCount() {
        return _util.request({
            url: _util.getServerUrl('/manage/statistic/base_count')
        });
    }
}

export default Statistic;


