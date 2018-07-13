import React from 'react'
import { Layout, Menu, Icon} from 'antd'
import { withRouter } from 'react-router-dom'
import styleClass from './app-container.styl'

const { Header, Sider, Content} = Layout

@withRouter
export default class AppContainer extends React.Component {
    state = {
        collapsed: false
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    changePage = ({ item, key, keyPath }) => {
        const {history} = this.props
        // console.log(item, key, keyPath)
        history.push(key)
    }
    render () {
        return (
            <Layout>
                <Sider
                    style={{zIndex: 10}}
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    width={256}
                    className={styleClass.sider}
                >
                    <div className={styleClass.title}>
                        <div className={styleClass.logo} />
                        {
                            this.state.collapsed ?
                                null :
                                <div className={styleClass['title-word']}>配置中心</div>
                        }
                    </div>
                    <Menu
                        theme={"dark"}
                        mode={"inline"}
                        defaultSelectedKeys={['1']}
                        onClick={this.changePage}
                    >
                        <Menu.SubMenu title={
                            <span>
                                <Icon type={'dashboard'}/>
                                <span>基本信息</span>
                            </span>
                        }>
                            <Menu.Item key={'baseInfo'}>
                                <Icon type={'info-circle-o'}/>
                                <span>基本信息挑选</span>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu title={ <span>
                                <Icon type={'profile'}/>
                                <span>应用信息</span>
                            </span>}>
                            <Menu.Item key={'readerCenter'}>
                                <Icon type={'user'}/>
                                <span>读者中心</span>
                            </Menu.Item>
                            <Menu.Item key={'opac'}>
                                <Icon type={'video-camera'}/>
                                <span>图书检索</span>
                            </Menu.Item>
                            <Menu.Item key={'bookDetail'}>
                                <Icon type={'upload'}/>
                                <span>图书详情</span>
                            </Menu.Item>
                            <Menu.Item key={'bookRecommend'}>
                                <Icon type={'mail'}/>
                                <span>图书荐购</span>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding:0}} className={styleClass.header}>
                        <Icon
                            className={styleClass.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{margin: '24px 24px 0', minHeight: 280, paddingBottom: '58px'}}>
                        <div style={{margin: '-24px -24px 0'}}>
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
