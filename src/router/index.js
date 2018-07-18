import React from 'react'
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import AppContainer from '../containers/app-container'
import BaseInfoPage from '../pages/base-info-page/base-info-page'
import AppPage from '../components/app-page'

const basename = '/config'


const BaseInfoCompose = ({match}) => (
    <Route path={`${match.url}/`} component={BaseInfoPage} exact/>
)

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
                        apps.map(app => (
                            <Route key={app} path={`/${app}`} render={() => (
                                <AppPage type={app}/>
                            )}/>
                        ))
                    }
                </AppContainer>
            </Switch>
        </BrowserRouter>
    )
}
