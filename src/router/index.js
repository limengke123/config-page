import React from 'react'
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import AppContainer from '../containers/app-container'
import BaseInfoPage from '../pages/base-info-page/base-info-page'
import ReaderCenterPage from '../pages/reader-center-page/reader-center-page'
import OpacPage from '../pages/opac-page/opac-page'
import BookDetailPage from '../pages/book-detail-page/book-detail-page'
import BookRecommendPage from '../pages/book-recommend-page/book-recommend-page'


const BaseInfoCompose = ({match}) => (
    <Route path={`${match.url}/`} component={BaseInfoPage} exact/>
)

const ReaderCenterCompose = ({match}) => (
    <Route path={`${match.url}/`} component={ReaderCenterPage} exact/>
)

const OpacCompose = ({match}) => (
    <Route path={`${match.url}/`} component={OpacPage} exact/>
)

const BookDetailCompose = ({match}) => (
    <Route path={`${match.url}/`} component={BookDetailPage} exact/>
)

const BookRecommendCompose = ({match}) => (
    <Route path={`${match.url}/`} component={BookRecommendPage} exact/>
)

export const CustomRouter = () => (
    <BrowserRouter>
        <Switch>
            <AppContainer>
                <Route path={'/'} exact render={() => (
                    <Redirect to={'/baseInfo'}/>
                )} />
                <Route path={'/baseInfo'} component={BaseInfoCompose}/>
                <Route path={'/readerCenter'} component={ReaderCenterCompose}/>
                <Route path={'/opac'} component={OpacCompose}/>
                <Route path={'/bookDetail'} component={BookDetailCompose}/>
                <Route path={'/bookRecommend'} component={BookRecommendCompose}/>
            </AppContainer>
        </Switch>
    </BrowserRouter>
)
