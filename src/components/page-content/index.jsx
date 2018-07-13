import React from 'react'
import style from './index.styl'

export default class PageContent extends React.Component {
    render () {
        return (
            <div className={style["page-content"]}>
                {this.props.children}
            </div>
        )
    }
}
