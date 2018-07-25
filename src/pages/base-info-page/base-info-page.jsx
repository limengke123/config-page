import React, {Fragment} from 'react'
import {List, Spin} from 'antd'
import AppCard from '../../components/app-card'
import PageHeader from '../../components/page-header'
import PageContent from '../../components/page-content'
import {getLogo} from '../../localConfig/logo'
import {axios} from '../../util'


class BaseInfo extends React.Component {
    state = {
        apps: {},
        isLoading: true,
    }

    walkRules = (rules) => {
        if (!rules) return
        let obj = {}
        rules.forEach(rule => {
            if (!rule.fields) throw new Error(`检查 name = ${rule.name} 的 rules 下是否缺少了 fields 字段`)
            obj[rule.fields] = rule.defaultValue
        })
        return obj
    }

    walkPage = (page, obj) => {
        if (!page) return
        if (!page.children) throw new Error('page-config 中，每一个 page 对象下面一定要有 children 属性')
        page.children.forEach(child => {
            if (!child.fields) throw new Error(`检查name = ${child.name} 下的 children 中是否少了fields字段！`)
            obj[child.fields] = this.walkRules(child.rules)
            if (child.page) {
                // 如果有 page 子页面， 需要递归了
                if (!child.page.key) throw new Error(`检查name = ${child.name} fields = ${child.fields} 下的 page 是否缺少了 key 字段`)
                obj[child.fields][child.page.key] = {}
                this.walkPage(child.page, obj[child.fields][child.page.key])
            }
        })
    }

    /**
     * @summary 从事先存在 window.config 拿到默认值
     * @param {string} appName - 需要获取的应用名称
     * @return {object}
     * */
    getDefaultConfig = (appName) => {
        const config = window.config
        let subConfig = {}
        let basicConfig = {}
        let app = config[appName]
        if (!app) throw new Error(`config-page: ${appName} 中找不到对应的字段，检查字段是否正确`)

        app.rules && app.rules.forEach(rule => basicConfig[rule.fields] = rule.defaultValue)

        this.walkPage(app, subConfig)

        return {
            subConfig,
            basicConfig
        }
    }

    /**
     * @summary 对比请求回来的数据以及和默认配置的应用，找出还没有初始化过的数据，从默认配置中，提取出对应的配置，生成对应应用的默认配置，并保存起来
     * @returns {void}
     * */
    init = (data) => {
        const defaultKeys = Object.keys(window.config)
        const currentKeys = Object.keys(data)
        let hasChange = false
        const result = defaultKeys.reduce((accu, defaultKey) => {
            if (!~currentKeys.indexOf(defaultKey)) {
                hasChange = true
                accu[defaultKey] = this.getDefaultConfig(defaultKey)
            } else {
                accu[defaultKey] = data[defaultKey]
            }
            return accu
        }, {})
        if (hasChange) {
            let url = process.env.REACT_APP_IS_NODE ? '/api/saveConfig' : '/cfg/lmk/operate.php?operate=edit'
            axios.post(url, {
                appName: '',
                value: result
            }).then(resp => {
                    if (resp.data) {
                        const data = resp.data && resp.data.data
                        this.setState({
                            apps: data,
                            isLoading: false
                        })
                    }
                })
        } else {
            this.setState({
                isLoading: false
            })
        }
    }

    componentDidMount () {
        console.log('base-info-page did mounted')
        let url = process.env.REACT_APP_IS_NODE ? '/api/getConfig' : '/cfg/lmk/operate.php?operate=read'
        axios.get(url)
            .then(resp => {
                if (resp.data) {
                    const data = resp.data && resp.data.data
                    this.setState({
                        apps: data,
                    })
                    this.init(data)
                }
            })
    }

    handleShow = (type, show) => {
        let basicConfig = {}
        if (this.state.apps[type] && !this.state.apps[type]['basicConfig']) {
            basicConfig = this.state.apps[type]['basicConfig']
        }
        this.setState({
            apps: {
                ...this.state.apps,
                [type]: {
                    ...this.state.apps[type],
                    basicConfig: {
                        ...basicConfig,
                        show: show
                    }
                }
            }
        })
    }

    render () {
        const {apps} = this.state
        let stateData = Object.keys(apps).map(key => ({
            ...apps[key],
            type: key,
            show: (apps[key] && apps[key]['basicConfig'] && apps[key]['basicConfig']['show']) || false
        }))
        let data = Object.keys(window.config).map((key, index) => ({
            show: stateData.filter(app => app.type === key)[0] ? stateData.filter(app => app.type === key)[0].show : false,
            logoSrc: getLogo(index),
            title: window.config[key].name,
            description: window.config[key].description || '请根据需求设置 APP 对应具体配置。',
            type: key,
            handleShow: this.handleShow
        }))
        return (
            <Fragment>
                <Spin tip={'Loading...'} size={'large'} spinning={this.state.isLoading}>
                    <PageHeader>
                        <h1>App应用</h1>
                        <p style={{marginBottom: 16}}>从如下 App 应用中挑选需要使用的应用，并设置 APP 对应具体配置。</p>
                    </PageHeader>
                    <PageContent>
                        <List
                            grid={{gutter: 24, xs:1, md:2, xl: 3, xxl: 4}}
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <AppCard data={item}/>
                                </List.Item>
                            )}
                        />
                    </PageContent>
                </Spin>
            </Fragment>
        )
    }
}

export default BaseInfo
