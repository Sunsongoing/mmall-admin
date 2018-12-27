import React from 'react';

class FormInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let normal =
            <div className="form-group">
                <label className="col-md-2 control-label">{this.props.labelName}</label>
                <div className={this.props.width}>
                    <input type="text"
                        value={this.props.value}
                        name={this.props.name} onChange={(e) => { this.props.onValueChange(e) }}
                        className="form-control" placeholder={this.props.placeholder} />
                </div>
            </div>;
        let addonSuffix =
            <div className="form-group">
                <label className="col-md-2 control-label">{this.props.labelName}</label>
                <div className={this.props.width}>
                    <div className="input-group">
                        <input type="number"
                            value={this.props.value}
                            name={this.props.name} onChange={(e) => { this.props.onValueChange(e) }}
                            className="form-control" placeholder={this.props.placeholder} />
                        <span className="input-group-addon">{this.props.addonSuffix}</span>
                    </div>
                </div>
            </div>;
        let body = '';
        switch (this.props.type) {
            case 'normal':
                body = normal;
                break;
            case 'addon-suffix':
                body = addonSuffix;
                break;
        }
        return (body);
    }
}
export default FormInput;