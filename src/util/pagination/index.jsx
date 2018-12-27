import React from 'react';
import RcPagenation from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

class Pagenation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    {/* ...this.props  解构函数 */}
                    <RcPagenation {...this.props}
                        hideOnSinglePage
                        showQuickJumper />
                </div>
            </div>
        );
    }
}

export default Pagenation;