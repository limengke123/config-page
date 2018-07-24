import React, {Fragment} from 'react'
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import AppContainer from '../containers/app-container'
import BaseInfoPage from '../pages/base-info-page/base-info-page'
import AppPage from '../components/app-page'

const basename = process.env.REACT_APP_IS_NODE
    ? process.env.REACT_APP_BASE_NAME
        ? process.env.REACT_APP_BASE_NAME
        : '/config'
    : '/'
// const basename = '/config'



const BaseInfoCompose = ({match}) => (
    <Route path={`${match.url}/`} component={BaseInfoPage} exact/>
)


const AppRouteCompose = ({match, app}) => {
    let routes = []
    let temp = []
    let separator = '_'
    /**
     * 递归参数,拿到路由相关配置
     * e.g
     * bookRecommend
     * bookRecommend/baseInfo_bkRecommend
     * */
    const run = (page, fields) => {
        if (!page) return
        temp.push(fields ? `${fields}${separator}${page.key}` : page.key)
        if (page.children) {
            page.children.forEach(child => run(child.page, child.fields))
        }
        routes.push({
            path: temp.join('/'),
            type: page.key
        })
        temp.pop()
    }
    run(app)

    return (
        <Fragment>
            {/*<Route path={`${match.url}`} render={() => (*/}
                {/*<AppPage type={app.key}/>*/}
            {/*)}/>*/}
            {
                routes.map(route => <Route key={route.path} exact path={`/${route.path}`} render={() => <AppPage type={route.path}/>}/>)
            }
        </Fragment>
    )
}


export const CustomRouter = () => {
    const apps = Object.keys(window.config)
    return (
        <BrowserRouter basename={basename}>
            <Switch>
                <AppContainer>
                    <Route path={'/'} exact render={() => (
                        <Redirect to={'/baseInfo'}/>
                    )} />
                    <Route path={'/baseInfo'} component={BaseInfoCompose}/>
                    {
                        /**
                         * 遍历传入的pageConfig 生成对应路由
                         * */
                        // apps.map(app => (
                        //     <Route key={app} path={`/${app}`} render={() => (
                        //         <AppPage type={app}/>
                        //     )}/>
                        // ))
                        /**
                         * 需要增加子路由了
                         * */
                        apps.map(app => (
                            <Route key={app} path={`/${app}`} render={props => (
                                <AppRouteCompose {...props} app={window.config[app]}/>
                            )}/>
                        ))
                    }
                </AppContainer>
            </Switch>
        </BrowserRouter>
    )
}
