import React from 'react'
import {message} from 'antd'
import PageHeader from '../../components/page-header'
import PageContent from '../../components/page-content'
import BookRecommendForm from './book-recommend-form'
import ToolBar from '../../components/tool-bar'
import {axios, processData, processTimeData, processObj, deepMerge, deepClone} from '../../util'

const type = 'bookRecommend'

export default class BookRecommendPage extends React.Component {

    state = {
        fields: {
            ...processData(window.config[type])
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
        axios.get(`/api/getConfig?appName=${type}`).then(resp => {
            const fields = deepClone(this.state.fields)
            if (resp.data) {
                this.setState({
                    fields: deepMerge(fields, processObj(resp.data))
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
            [type]: fields
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
                    <h1>图书荐购</h1>
                    <p style={{marginBottom: 16}}>从如下 App 应用中挑选需要使用的应用，并设置 APP 对应具体配置。</p>
                </PageHeader>
                <PageContent>
                    <BookRecommendForm onChange={this.handleFormChange} {...this.state.fields}/>
                    <ToolBar onClick={this.handleClick}/>
                </PageContent>
            </div>
        )
    }
}
