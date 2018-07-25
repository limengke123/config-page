import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {Breadcrumb} from 'antd'
import {walkData} from "../../util";

@withRouter
class Bread extends React.Component {
    handleRoute = () => {
        const {pathname} = this.props.location
        let routes = pathname.split('/').filter(Boolean)
        let pre = ''
        routes = routes.map(route => {
            const breadcrumbName = walkData(window.config, pre + route).name
            pre = pre + route + '/'
            return {
                path: route,
                breadcrumbName: breadcrumbName
            }
        })
        routes.unshift({
            path: '',
            breadcrumbName: '首页'
        })
        return routes
    }
    render () {
        const Item = Breadcrumb.Item
        const routes = this.handleRoute()
        return (
            <Breadcrumb>
                {
                    routes.map((route, index, array) => {
                        if (index === array.length - 1) {
                            // 最后一个节点特殊处理
                            return (
                                <Item key={route.path}><span>{route.breadcrumbName}</span></Item>
                            )
                        } else {
                            return (
                                <Item key={route.path}><Link to={`/${route.path}`}>{route.breadcrumbName}</Link></Item>
                            )
                        }
                    })
                }
            </Breadcrumb>
        )
    }
}

export default Bread
