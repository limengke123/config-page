import React from 'react'
import {Upload, Icon, Modal} from 'antd'

export default class UploadForm extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        // fileList: [{
        //     uid: -1,
        //     name: 'test.png',
        //     status: 'done',
        //     url: '/images/head_1.png',
        //     // url: '/images/head_1.jpg',
        //     // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // }],
        // fileList: []
        // 初始化 app-page 还没请求,所以这里赋值的只是合并的初始的 config-page 里的 defaultValue
        fileList: this.props.fileList
    };

    handleCancel = () => this.setState({ previewVisible: false })

    componentWillReceiveProps (nextProps) {
        this.setState({
            fileList: nextProps.fileList
        })
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({ file, fileList, event }) => {
        console.log(file, fileList)
        if (file.response) {
            console.log(file, fileList)
            this.props.onChange([{
                url: file.response.path,
                uid: ~Math.random() * 100 // 一个负随机整数
            }])
        }
        this.setState({ fileList })
    }

    render () {
        const { previewVisible, previewImage, fileList} = this.state
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <div className="clearfix">
                <Upload
                    action="/api/upload"
                    // action="//jsonplaceholder.typicode.com/posts/"
                    name={this.props.name || 'file'}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}
