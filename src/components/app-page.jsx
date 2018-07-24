import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {message, Breadcrumb} from 'antd'
import PageHeader from './page-header'
import PageContent from './page-content'
import AppForm from './app-form'
import ToolBar from './tool-bar'
import {axios, processData2, processTimeData, deepMerge, deepClone, getDeepObj, walkData, replaceSeparator} from '../util'

const routes = [
    {
        path: 'index',
        breadcrumbName: '首页'
    }, {
        path: 'first',
        breadcrumbName: '一级面包屑'
    }, {
        path: 'second',
        breadcrumbName: '当前页面'
}]

function itemRender (route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
}

@withRouter
export default class AppPage extends React.Component {
    state = {
        isValid: false,
        fields: {
            //...processData2(window.config[this.props.type]),
            // ...processData2(getDeepObj(window.config, this.props.type))
            ...processData2(walkData(window.config, this.props.type))
        },
    }
    changeFetchParams = (path) => {
        /**
         * 由于兼容原代码,需要对获取参数的请求做一个处理
         * */
        let _arr = path.split('/')
        _arr = _arr.reduce((accu, current) => {
            return accu.concat(current.split('_'))
        },[])
        _arr.splice(1, 0, "subConfig")
        return _arr.join('.')
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
        console.log(this.props.type)
        let url = process.env.REACT_APP_IS_NODE
            ? `/api/getConfig?appName=${this.changeFetchParams(this.props.type)}`
            : `/cfg/lmk/operate.php?operate=read&appName=${this.changeFetchParams(this.props.type)}`
        axios.get(url).then(resp => {
            const fields = deepClone(this.state.fields)
            if (!resp.data) resp.data = {}
            if (!resp.data.data) resp.data.data = {}
            let data = deepMerge(fields, resp.data.data)
            if (data) {
                this.setState({
                    fields: data
                })
            }
        })
    }
    handleClick = () => {
        window.form.validateFields((err, values) => {
            if (!err) {
                let fields = {}
                Object.keys(this.state.fields).forEach(item => {
                    fields[item] = {}
                    Object.keys(this.state.fields[item]).forEach(_item => {
                        fields[item][_item] = processTimeData(this.state.fields[item][_item])
                    })
                })
                let url = process.env.REACT_APP_IS_NODE
                    ? '/api/saveConfig'
                    : '/cfg/lmk/operate.php?operate=edit'
                axios.post(url, {
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
            } else {
                message.warn('请输入必选项')
            }
        })
    }

    render() {
        return (
            <div>
                <PageHeader>
                    <Breadcrumb itemRender={itemRender} routes={routes}/>
                    <h1>{walkData(window.config, this.props.type).name}</h1>
                    <p style={{marginBottom: 16}}>{walkData(window.config, this.props.type).description || '请根据需求设置 APP 对应具体配置。'}</p>
                </PageHeader>
                <PageContent>
                    <AppForm onChange={this.handleFormChange} data={this.state.fields} type={this.props.type}/>
                    <ToolBar onClick={this.handleClick}/>
                </PageContent>
            </div>
        )
    }
}
