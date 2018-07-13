import React from 'react'
import style from './index.styl'

export default class PageHeader extends React.Component {
    render () {
        return (
            <div className={style["page-header"]}>
                {this.props.children}
            </div>
        )
    }
}
