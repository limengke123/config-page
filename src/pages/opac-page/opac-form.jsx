import React, {Fragment} from 'react'
import {Form, Input} from 'antd'
import FormCard from '../../components/form-card'
const FormItem = Form.Item

class BookDetailForm extends React.Component {
    render () {
        const {getFieldDecorator } = this.props.form
        return (
            <Fragment>
                <Form>
                    <FormCard title={'用户名'}>
                        <FormItem label={'username'}>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'username is required'}]
                            })(<Input />)}
                        </FormItem>
                    </FormCard>
                    <FormCard title={'密码'}>
                        <FormItem label={'password'}>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'password is required'}]
                            })(<Input />)}
                        </FormItem>
                    </FormCard>
                </Form>
            </Fragment>
        )
    }
}

const WrappedBookDetailForm = Form.create({
    onFieldsChange (props, changeFields) {
        props.onChange(changeFields)
    },
    mapPropsToFields (props) {
        return {
            username: Form.createFormField({
                value: props.username,
            }),
            password: Form.createFormField({
                value: props.password
            }),
        }
    },
    onValuesChange (_, values) {
    }
})(BookDetailForm)

export default WrappedBookDetailForm
