import React from 'react'
import {Form, Input, Select, Switch, Radio, InputNumber, DatePicker, } from 'antd'
import moment from "moment"
import FormCard from './form-card'
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
        subChildren = <Input/>
    } else if (rule.type === 'text') {
        subChildren = <span className="ant-form-text">{rule.defaultValue}</span>
    } else if (rule.type === 'input-number') {
        /**
         * 数字输入框的默认值
         * min 0
         * max 10
         * */
        const defaultMin = 0
        const defaultMax = 10
        subChildren = <InputNumber min={rule.min || defaultMin} max={rule.max || defaultMax}/>
    } else if (rule.type === 'select') {
        subChildren = (
            <Select>
                {
                    rule.selectValue.map(item => (
                        <Option key={item.value} value={item.value}>{item.displayValue}</Option>
                    ))
                }
            </Select>
        )
    } else if (rule.type === 'select-multiple') {
        subChildren = (
            <Select mode="multiple">
                {
                    rule.selectValue.map(item => (
                        <Option key={item.value} value={item.value}>{item.displayValue}</Option>
                    ))
                }
            </Select>
        )
    } else if (rule.type === 'switch') {
        subChildren = <Switch/>
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
                    rule.selectValue.map(item => (
                        <Radio key={item.value} value={item.value}>{item.displayValue}</Radio>
                    ))
                }
            </RadioGroup>
        )
    } else if (rule.type === 'radio-button') {
        subChildren = (
            <RadioGroup>
                {
                    rule.selectValue.map(item => (
                        <RadioButton key={item.value} value={item.value}>{item.displayValue}</RadioButton>
                        // <RadioButton key={item.value} value={item.value}>{item.displayValue}</RadioButton>
                    ))
                }
            </RadioGroup>
        )
    } else if (rule.type === 'date-picker') {
        subChildren = (
            <DatePicker />
        )
    }

    return {
        subChildren,
        fieldsConfig
    }
}

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
                    window.config[this.props.type].children.map(subConfig =>
                        <FormCard title={subConfig.name} key={subConfig.name}>
                            {
                                subConfig.rules.map(rule => {
                                        const {subChildren, fieldsConfig} = ruleToChildren(rule)
                                        return (
                                            <FormItem {...formItemLayout} label={rule.name} key={rule.name}>
                                                {getFieldDecorator(`${subConfig.fields}.${rule.fields}`, fieldsConfig)(subChildren)}
                                            </FormItem>
                                        )
                                    }
                                )
                            }
                        </FormCard>
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
        const outerKey = Object.keys(changeFields)[0]
        if (!outerKey) {
            return
        }
        const key = Object.keys(changeFields[outerKey])[0]
        const changeInfo = changeFields[outerKey][key]
        if (changeInfo.validating === false && !changeInfo.errors) {
            props.onChange(changeFields)
        }
    },
    mapPropsToFields(props) {
        let obj = Object.create(null)
        window.config[props.type].children.forEach(subConfig => {
            let tempObj = obj[subConfig.fields] = {}
            subConfig.rules.forEach(rule => {
                tempObj[rule.fields] = Form.createFormField({
                    // value: props.data[subConfig.fields][rule.fields]
                    value: processObj1(props.data[subConfig.fields][rule.fields])
                })
            })
        })
        return obj
    },
    onValuesChange(_, values) {
    }
})(AppForm)
