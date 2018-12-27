
import React from 'react';
import FileUpload from './file-upload.jsx';
import MUtil from 'util/currency.jsx';

const _util = new MUtil();

class FileUploader extends React.Component {

    render() {
        /*set properties*/
        const options = {
            // 上传文件的接口
            baseUrl: '/manage/product/upload',
            // 传给后端的文件名
            fileFieldName: 'upload_file',
            // 选择文件自动提交
            chooseAndUpload: true,
            uploadSuccess: (res) => {
                if (status === 10) {
                    _util.doLogin();
                } else {
                    this.props.onSuccess(res.data);
                }
            },
            uploadError: (err) => {
                this.props.onError(err.message || "上传图片出错");
            }
            // param: {
            //     fid: 0
            // }
        }
        return (
            <FileUpload options={options}>
                <button className="btn btn-xs btn-default" ref="chooseAndUpload">选择图片</button>
                {/* <button ref="chooseBtn">选择</button> */}
                {/* <button ref="uploadBtn">上传</button> */}
            </FileUpload>
        )
    }
}

export default FileUploader;