import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Form, Input, Select, Switch, Radio, InputNumber, DatePicker, } from 'antd'
import moment from "moment"
import FormCard from './form-card'
import UploadForm from './upload-form'
import {walkData} from "../util"
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const ruleToChildren = (rule) => {
    let subChildren
    let fieldsConfig = {}
    if (rule.isRequired) {
        /**
         * 验证必选项
         * */
        fieldsConfig.rules = []
        fieldsConfig.rules.push({
            required: true,
            message: rule.requiredMessage || "输入必选项"
        })
    }
    if (rule.type === 'input') {
        subChildren = <Input {...rule.otherProps}/>
    } else if (rule.type === 'text') {
        subChildren = <span className="ant-form-text">{rule.defaultValue}</span>
    } else if (rule.type === 'input-number') {
        subChildren = <InputNumber {...rule.otherProps}/>
    } else if (rule.type === 'select') {
        subChildren = (
            <Select {...rule.otherProps}>
                {
                    rule.selectValue.map(item => {
                        const {displayValue, ...otherProps} = item
                        return (
                            <Option key={otherProps.value} {...otherProps}>{displayValue}</Option>
                        )
                    })
                }
            </Select>
        )
    } else if (rule.type === 'select-multiple') {
        subChildren = (
            <Select mode="multiple" {...rule.otherProps}>
                {
                    rule.selectValue.map(item => {
                        const {displayValue, ...otherProps} = item
                        return (
                            <Option key={otherProps.value} {...otherProps}>{displayValue}</Option>
                        )
                    })
                }
            </Select>
        )
    } else if (rule.type === 'switch') {
        subChildren = <Switch {...rule.otherProps}/>
        fieldsConfig.valuePropName = 'checked'
        /**
         * 用如下注释的方法也能实现
         * 总归还是用 valuePropName 更加好
         * */
        // subChildren = <Switch defaultChecked={rule.defaultValue}/>
    } else if (rule.type === 'radio-group') {
        subChildren = (
            <RadioGroup>
                {
                    rule.selectValue.map(item => {
                        const {displayValue, ...otherProps} = item
                        return (
                            <Radio key={otherProps.value} {...otherProps}>{displayValue}</Radio>
                        )
                    })
                }
            </RadioGroup>
        )
    } else if (rule.type === 'radio-button') {
        subChildren = (
            <RadioGroup>
                {
                    rule.selectValue.map(item => {
                        const {displayValue, ...otherProps} = item
                        return (
                            <RadioButton key={otherProps.value} {...otherProps}>{displayValue}</RadioButton>
                        )
                    })
                }
            </RadioGroup>
        )
    } else if (rule.type === 'date-picker') {
        subChildren = (
            <DatePicker {...rule.otherProps}/>
        )
    } else if (rule.type === 'upload') {
        subChildren = (
            <UploadForm/>
        )
    }

    return {
        subChildren,
        fieldsConfig
    }
}

@withRouter
class AppForm extends React.Component {

    componentDidMount() {
        /**
         * 子组件的 form 属性挂在到 window 上使用
         * 卸载组件时候 删除
         * */
        window.form = this.props.form
    }

    componentWillUnmount () {
        delete window.form
    }

    render () {
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
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                {
                    walkData(window.config, this.props.type).children.map(subConfig => {
                        /**
                         * 如果有 page 说明还有子页面
                         * title 右边加上详细设置
                         * 跳转进入
                         * */
                        let title = subConfig.name
                        if (subConfig.page) {
                            title = <div>
                                <span>{subConfig.name}</span>
                                <Link to={`${this.props.match.path}/${subConfig.fields}_${subConfig.page.key}`} replace={true} style={{float: 'right'}}>详细设置</Link>
                            </div>
                        }
                        return (
                            <FormCard title={title} key={subConfig.name}>
                                {
                                    subConfig.rules.map(rule => {
                                            const {subChildren, fieldsConfig} = ruleToChildren(rule)
                                            if (rule.type === 'upload') {
                                                return (
                                                    <FormItem {...formItemLayout} label={rule.name} key={rule.name}>
                                                        {subChildren}
                                                    </FormItem>
                                                )
                                            }
                                            return (
                                                <FormItem {...formItemLayout} label={rule.name} key={rule.name}>
                                                    {getFieldDecorator(`${subConfig.fields}.${rule.fields}`, fieldsConfig)(subChildren)}
                                                </FormItem>
                                            )
                                        }
                                    )
                                }
                            </FormCard>
                        )}
                    )
                }
            </Form>
        )
    }
}

const processObj1 = (str) => {
    /**
     * 处理时间格式成moment格式
     * 2018-12-5
     * */

    const reg = /\d{4}-\d{1,2}-\d{1,2}/g
    if (reg.test(str)) {
        return moment(str)
    } else {
        return str
    }
}

export default Form.create({
    onFieldsChange(props, changeFields) {
        /**
         * 这里的注释代码，能够检验输入的数据，并且用显示错误的方式提示，但是有点问题，所以注释了
         *
         * */
        // const outerKey = Object.keys(changeFields)[0]
        // if (!outerKey) {
        //     return
        // }
        // const key = Object.keys(changeFields[outerKey])[0]
        // const changeInfo = changeFields[outerKey][key]
        // if (changeInfo.validating === false && !changeInfo.errors) {
        //     props.onChange(changeFields)
        // }
        props.onChange(changeFields)
    },
    mapPropsToFields(props) {
        let obj = Object.create(null)
        walkData(window.config, props.type).children.forEach(subConfig => {
            let tempObj = obj[subConfig.fields] = {}
            subConfig.rules.forEach(rule => {
                tempObj[rule.fields] = Form.createFormField({
                    value: processObj1(props.data[subConfig.fields][rule.fields])
                })
            })
        })
        return obj
    },
    onValuesChange(_, values) {
    }
})(AppForm)
