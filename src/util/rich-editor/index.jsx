import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';

// 通用富文本编辑器
class RichEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.loadEditor();
    }
    componentWillReceiveProps(nextProps) {
        // 只有两次的值不一致时才修改值
        // 如果不做处理会一直触发onValueChange事件
        if (this.props.defaultDetail !== nextProps.defaultDetail) {
            this.simditor.setValue(nextProps.defaultDetail);
        }
    }
    loadEditor() {
        let element = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea: $(element),
            defaultValue: this.props.palceholder || '请输入内容',
            upload: {
                url: '/manage/product/rich_text_img_upload',
                defaultImage: '',
                // 跟后端字段一致
                fileKey: 'upload_file'
            }
        });
        this.bindEditorEvent();
    }
    // 初始化富文本编辑器的事件,将jquery 的事件暴露到外部
    bindEditorEvent() {
        this.simditor.on('valuechanged', (e) => {
            this.props.onValueChange(this.simditor.getValue());
        });
    }
    render() {
        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        );
    }
}

export default RichEditor;