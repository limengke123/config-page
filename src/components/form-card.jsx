import React, {Fragment} from 'react'
import {Card} from 'antd'

export default class FormCard extends React.Component {
    render () {
        const {title, children} = this.props
        return (
            <Fragment>
                <Card title={title} style={{marginBottom: '24px'}}>
                    {children}
                </Card>
            </Fragment>
        )
    }
}
