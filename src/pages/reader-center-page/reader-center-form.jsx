import React, {Fragment} from 'react'
import {Form, TreeSelect, Input} from 'antd';
import FormCard from '../../components/form-card'

const FormItem = Form.Item;

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const treeData = [{
    label: '个人信息',
    value: 'infos',
    key: 'infos',
    // children: [{
    //     label: 'Child Node1',
    //     value: '0-0-0',
    //     key: '0-0-0',
    // }],
},
    {
        label: '我的借阅',
        value: 'borrow',
        key: 'borrow',
        children: [{
            label: '当前借阅',
            value: 'currentBorrow',
            key: 'currentBorrow',
        }, {
            label: '借阅历史',
            value: 'borrowHistory',
            key: 'borrowHistory',
        }],
    }, {
        label: '我的预约',
        value: 'reservation',
        key: 'reservation',
        children: [{
            label: '当前预约',
            value: 'currentReserve',
            key: 'currentReserve',
        }, {
            label: '预约历史',
            value: 'reserveHistory',
            key: 'reserveHistory',
        }],
    }, {
        label: '我的收藏',
        value: 'collected',
        key: 'collected',
        children: [{
            label: '图书收藏',
            value: 'collectionBook',
            key: 'collectionBook',
        }, {
            label: '书架收藏',
            value: 'collectionBookShelf',
            key: 'collectionBookShelf',
        }, {
            label: '书架层收藏',
            value: 'collectionSingleShelf',
            key: 'collectionSingleShelf',
        }, {
            label: '书单收藏',
            value: 'collectionBookList',
            key: 'collectionBookList',
        }],
    }, {
        label: '我的关注',
        value: 'attention',
        key: 'attention',
    }
];

class ReaderCenterForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const tProps = {
            treeData,
            // value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
                width: 300,
            },
        };
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return (
            <Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <FormCard title={'基本配置'}>
                        <FormItem
                            {...formItemLayout}
                            label="页面显示项"
                        >
                            {getFieldDecorator('baseInfoConfig.showPage', {})(
                                <TreeSelect {...tProps} />
                            )}
                        </FormItem>
                    </FormCard>
                    <FormCard title={'个人信息'}>
                        <FormItem
                            {...formItemLayout}
                            label="账号"
                        >
                            {getFieldDecorator('userInfoConfig.username', {})(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="测试下拉框"
                        >
                            {getFieldDecorator('userInfoConfig.username1', {})(
                                <Input />
                            )}
                        </FormItem>
                    </FormCard>
                    <FormCard title={'我的借阅'}>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                        >
                            {getFieldDecorator('myBorrowConfig.password', {})(
                                <Input />
                            )}
                        </FormItem>
                    </FormCard>
                    <FormCard title={'我的预约'}>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                        >
                            {getFieldDecorator('myBorrowConfig.password', {})(
                                <Input />
                            )}
                        </FormItem>
                    </FormCard>
                    <FormCard title={'我的收藏'}>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                        >
                            {getFieldDecorator('myBorrowConfig.password', {})(
                                <Input />
                            )}
                        </FormItem>
                    </FormCard>
                    <FormCard title={'我的关注'}>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                        >
                            {getFieldDecorator('myBorrowConfig.password', {})(
                                <Input />
                            )}
                        </FormItem>
                    </FormCard>
                </Form>
            </Fragment>
        );
    }
}

const WrappedReaderCenterForm = Form.create({
    onFieldsChange(props, changeFields) {
        props.onChange(changeFields)
    },
    mapPropsToFields(props) {
        return {
            baseInfoConfig: {
                showPage: Form.createFormField({
                    value: props.baseInfoConfig.showPage
                }),
            },
            userInfoConfig: {
                username: Form.createFormField({
                    value: props.userInfoConfig.username
                }),
                username1: Form.createFormField({
                    value: props.userInfoConfig.username1 || '临时'
                }),
            },
            myBorrowConfig: {
                password: Form.createFormField({
                    value: props.myBorrowConfig.password
                })
            }
        }
    },
    onValuesChange(_, values) {
    }
})(ReaderCenterForm);

export default WrappedReaderCenterForm
