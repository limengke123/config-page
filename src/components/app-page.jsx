import React from 'react'
import {message} from 'antd'
import PageHeader from './page-header'
import PageContent from './page-content'
import AppForm from './app-form'
import ToolBar from './tool-bar'
import {axios, processData, processTimeData, processObj, deepMerge, deepClone} from '../util'

export default class AppPage extends React.Component {
    state = {
        fields: {
            ...processData(window.config[this.props.type])
        }
    }
    handleFormChange = (changeFields) => {
        const outerKey = Object.keys(changeFields)[0]
        const innerKey = Object.keys(changeFields[outerKey])[0]
        this.setState({
            fields: {
                ...this.state.fields,
                [outerKey]: {
                    ...this.state.fields[outerKey],
                    [innerKey]: changeFields[outerKey][innerKey].value
                }
            }
        })
    }
    componentDidMount () {
        axios.get(`/api/getConfig?appName=${this.props.type}`).then(resp => {
            const fields = deepClone(this.state.fields)
            let data = deepMerge(fields, processObj(resp.data.subConfig))
            console.log(data)
            if (data) {
                this.setState({
                    fields: data
                })
            }
        })
    }
    handleClick = () => {
        let fields = {}
        Object.keys(this.state.fields).forEach(item => {
            fields[item] = {}
            Object.keys(this.state.fields[item]).forEach(_item => {
                fields[item][_item] = processTimeData(this.state.fields[item][_item])
            })
        })
        axios.post('/api/saveConfig', {
            type: 'subConfig',
            data: {
                [this.props.type]: fields
            }
        }).then(resp => {
            if (resp.data && resp.data.success === true) {
                message.success('保存成功')
            } else {
                message.error('保存失败')
            }
        })
    }

    render() {
        return (
            <div>
                <PageHeader>
                    <h1>{window.config[this.props.type].name}</h1>
                    <p style={{marginBottom: 16}}>{window.config[this.props.type].description || '请根据需求设置 APP 对应具体配置。'}</p>
                </PageHeader>
                <PageContent>
                    <AppForm onChange={this.handleFormChange} {...this.state.fields} type={this.props.type}/>
                    <ToolBar onClick={this.handleClick}/>
                </PageContent>
            </div>
        )
    }
}
