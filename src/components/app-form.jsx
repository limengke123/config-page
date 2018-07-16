import React from 'react'
import {Form, Input, Select, Switch, Radio, InputNumber, DatePicker, } from 'antd'
import FormCard from './form-card'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const ruleToChildren = (rule) => {
    let subChildren
    let fieldsConfig = Object.create(null)
    if (rule.type === 'input') {
        subChildren = <Input/>
        if (rule.isRequired) {
            fieldsConfig.rules = []
            fieldsConfig.rules.push({
                required: true,
                message: "输入必选项"
            })
        }
    } else if (rule.type === 'text') {
        subChildren = <span className="ant-form-text">{rule.defaultValue}</span>
    } else if (rule.type === 'input-number') {
        subChildren = <InputNumber min={rule.min || 0} max={rule.max || 10}/>
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
            <Select mode="multiple" placeholder="Please select favourite colors">
                {
                    rule.selectValue.map(item => (
                        <Option key={item.value} value={item.value}>{item.displayValue}</Option>
                    ))
                }
            </Select>
        )
    } else if (rule.type === 'switch') {
        subChildren = <Switch defaultChecked={rule.defaultValue}/>
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

export default Form.create({
    onFieldsChange(props, changeFields) {
        props.onChange(changeFields)
    },
    mapPropsToFields(props) {
        let obj = Object.create(null)
        window.config[props.type].children.forEach(subConfig => {
            let tempObj = obj[subConfig.fields] = {}
            subConfig.rules.forEach(rule => {
                tempObj[rule.fields] = Form.createFormField({
                    value: props[subConfig.fields][rule.fields]
                })
            })
        })
        return obj
    },
    onValuesChange(_, values) {
    }
})(AppForm)
