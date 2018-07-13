import React from 'react'
import {Button} from 'antd'
import style from './index.styl'

export default class ToolBar extends React.Component {
    render () {
        const {onClick} = this.props
        return (
            <div className={style.toolbar}>
                <div style={{float: 'right'}}>
                    <Button type={'primary'} onClick={onClick}>提交</Button>
                </div>
            </div>
        )
    }
}

