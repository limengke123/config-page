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
    componentDidMount () {
        let url = process.env.REACT_APP_IS_NODE ? '/api/getConfig' : '/cfg/lmk/operate.php?operate=read'
        axios.get(url)
            .then(resp => {
                if (resp.data ) {
                    this.setState({
                        apps: resp.data && resp.data.data,
                        isLoading: false
                    })
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
            show: apps[key]['basicConfig']['show']
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
