import React, {Fragment} from 'react'
import {List} from 'antd'
import {connect} from 'react-redux'
import AppCard from '../../components/app-card'
import PageHeader from '../../components/page-header'
import PageContent from '../../components/page-content'
import {logoArr} from '../../localConfig'
import {fetchApps} from '../../actions/base-info'

const titleMap = {
    readerCenter: '读者中心',
    opac: '图书检索',
    bookDetail: '图书详情',
    bookRecommend: '图书荐购',
}

class BaseInfo extends React.Component {
    componentDidMount () {
        this.props.fetchApps()
    }
    render () {
        let data = this.props.apps
        data = data.map((item, index) => ({
            ...item,
            logoSrc: logoArr[index],
            title: titleMap[item.name]
        }))
        return (
            <Fragment>
                <PageHeader>
                    <h1>App应用</h1>
                    <p style={{marginBottom: 16}}>从如下 App 应用中挑选需要使用的应用，并设置 APP 对应具体配置。</p>
                </PageHeader>
                <PageContent>
                    <List
                        grid={{gutter: 24, xs: 1, sm: 2, md:4, lg: 4, xl: 6, xxl: 3}}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <AppCard data={item}/>
                            </List.Item>
                        )}
                    />
                </PageContent>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    apps: state.baseInfo.items
})

const mapDispatchToProps = dispatch => ({
    fetchApps: () => {
        dispatch(fetchApps())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseInfo)
